import discord
from discord.ext import commands
from flask import Flask, jsonify, request
import asyncio
from threading import Thread
from dotenv import load_dotenv
import os
from flask_cors import CORS
import requests

load_dotenv()

bot_token = os.getenv("BOT_TOKEN")
channel_id = os.getenv("CHANNEL_ID")
turnstile_secret_key = os.getenv("TURNSTILE_SECRET_KEY")

app = Flask(__name__)
CORS(app, origins=["https://cali-pro.vercel.app"])

intents = discord.Intents.default()
intents.message_content = True

bot = commands.Bot(command_prefix="!", intents=intents)


async def send_message_to_channel(channel_id, message_body):
    channel = bot.get_channel(int(channel_id))

    if channel is None:
        print(f"Channel with ID {channel_id} not found!")
        return

    try:
        await channel.send(message_body)
        print(f"Message sent to channel: {channel.name}")
    except Exception as e:
        print(f"Error sending message: {e}")


def verify_turnstile(token):
    if not token:
        return False

    try:
        response = requests.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": turnstile_secret_key,
                "response": token,
            },
            timeout=5
        )

        result = response.json()
        return result.get("success", False)

    except requests.RequestException as e:
        print(f"Turnstile verification error: {e}")
        return False


@app.route('/interest_form', methods=['POST'])
def trigger_discord_command():
    data = request.get_json()

    if not data:
        return jsonify({"message": "Invalid request"}), 400

    # Honeypot check
    # Real users should never fill this field.
    if data.get("website"):
        return jsonify({"message": "Spam detected"}), 400

    # Turnstile check
    turnstile_token = data.get("turnstileToken")

    if not verify_turnstile(turnstile_token):
        return jsonify({"message": "Turnstile verification failed"}), 400

    name = data.get("name")
    phone = data.get("phone")
    city = data.get("city")
    year = data.get("year")
    make = data.get("make")
    model = data.get("model")
    body = data.get("body")
    service = data.get("service")
    message = data.get("message")

    if not name or not phone or not city or not year or not make or not model or not body or not service:
        return jsonify({"message": "You have missing information"}), 400

    message_body = f"""
New Interest Form Submission:
Name: {name}
Phone: {phone}
City: {city}
Year: {year}
Make: {make}
Model: {model}
Body: {body}
Service Requested: {service}
Message: {message}
"""

    asyncio.run_coroutine_threadsafe(
        send_message_to_channel(channel_id, message_body),
        bot.loop
    )

    return jsonify({"status": "Form submitted successfully!"}), 200


def run_flask():
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, use_reloader=False, host="0.0.0.0", port=port)


async def main():
    flask_thread = Thread(target=run_flask)
    flask_thread.start()

    await bot.start(bot_token)


if __name__ == "__main__":
    asyncio.run(main())