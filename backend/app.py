import os
import asyncio
import threading
import discord
from discord.ext import commands
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()  # must be before os.getenv()

app = Flask(__name__)
CORS(app)

DISCORD_TOKEN = os.getenv("DISCORD_TOKEN") or os.getenv("BOT_TOKEN")
CHANNEL_ID = os.getenv("CHANNEL_ID")
TURNSTILE_SECRET_KEY = os.getenv("TURNSTILE_SECRET_KEY")

if not CHANNEL_ID:
    raise RuntimeError("Missing CHANNEL_ID environment variable")

CHANNEL_ID = int(CHANNEL_ID)

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

bot_loop = None
bot_ready = threading.Event()


@bot.event
async def on_ready():
    global bot_loop
    bot_loop = asyncio.get_running_loop()
    bot_ready.set()
    print(f"Logged in as {bot.user}")


async def send_to_discord(data):
    channel = bot.get_channel(CHANNEL_ID)

    if channel is None:
        channel = await bot.fetch_channel(CHANNEL_ID)

    discord_message = f"""
**New Interest Form Submission**

**Name:** {data.get("name")}
**Phone:** {data.get("phone")}
**City:** {data.get("city")}

**Vehicle:** {data.get("year")} {data.get("make")} {data.get("model")}
**Body:** {data.get("body")}
**Service:** {data.get("service")}

**Message:**
{data.get("message") or "No message provided"}
"""

    await channel.send(discord_message)


def run_bot():
    try:
        asyncio.run(bot.start(DISCORD_TOKEN))
    except Exception as e:
        print("Discord bot failed to start:", e)


if DISCORD_TOKEN:
    threading.Thread(target=run_bot, daemon=True).start()
else:
    print("Discord bot not started: missing DISCORD_TOKEN or BOT_TOKEN")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend is running"}), 200


@app.route("/interest_form", methods=["POST"])
def interest_form():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid or missing JSON body"}), 400

    # Honeypot spam check
    if data.get("website"):
        return jsonify({"error": "Spam detected"}), 400

    turnstile_token = data.get("cf-turnstile-response")

    if not turnstile_token:
        return jsonify({"error": "Missing Turnstile token"}), 400

    if not TURNSTILE_SECRET_KEY:
        return jsonify({"error": "Turnstile is not configured on the server"}), 500

    try:
        verify_response = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": TURNSTILE_SECRET_KEY,
                "response": turnstile_token,
            },
            timeout=10,
        )

        turnstile_result = verify_response.json()
        print("Turnstile result:", turnstile_result)

    except Exception as e:
        print("Turnstile verification error:", e)
        return jsonify({"error": "Could not verify Turnstile token"}), 500

    if not turnstile_result.get("success"):
        return jsonify({
            "error": "Turnstile verification failed",
            "details": turnstile_result
        }), 403

    required_fields = [
        "name",
        "phone",
        "city",
        "year",
        "make",
        "model",
        "body",
        "service",
    ]

    missing_fields = [field for field in required_fields if not data.get(field)]

    if missing_fields:
        return jsonify({
            "error": "You have missing information",
            "missing_fields": missing_fields
        }), 400

    if not DISCORD_TOKEN:
        return jsonify({"error": "Discord is not configured on the server"}), 500

    if not bot_ready.is_set() or bot_loop is None:
        return jsonify({"error": "Discord bot is not ready yet"}), 503

    try:
        future = asyncio.run_coroutine_threadsafe(
            send_to_discord(data),
            bot_loop
        )

        # Wait briefly so you know whether Discord send failed
        future.result(timeout=10)

    except Exception as e:
        print("Error sending Discord message:", e)
        return jsonify({"error": "Failed to send message to Discord"}), 500

    return jsonify({"status": "Message sent to Discord"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
