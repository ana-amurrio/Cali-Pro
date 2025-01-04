import discord
import discord
from discord.ext import commands
from flask import Flask, jsonify, request
import asyncio
from threading import Thread
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()  

bot_token = os.getenv("BOT_TOKEN")
channel_id = os.getenv("CHANNEL_ID")

app = Flask(__name__)
CORS(app, origins=["https://cali-pro.vercel.app"])

intents = discord.Intents.default()
intents.message_content = True  

bot = commands.Bot(command_prefix="!", intents=intents)  

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')

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

@app.route('/interest_form', methods=['POST'])
def trigger_discord_command():
    name = request.json.get("name")
    phone = request.json.get("phone")
    city = request.json.get("city")
    year = request.json.get("year")
    make = request.json.get("make")
    model = request.json.get("model")
    body = request.json.get("body")
    service = request.json.get("service")
    message = request.json.get("message")

    if not name or not phone or not city or not year or not model or not body or not service:
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

    asyncio.run_coroutine_threadsafe(send_message_to_channel(channel_id, message_body), bot.loop)
    return jsonify({"status": "Command executed!"}), 200

def run_flask():
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 for local testing
    app.run(debug=False, use_reloader=False, host="0.0.0.0", port=port)

async def main():
    flask_thread = Thread(target=run_flask)
    flask_thread.start()

    await bot.start(bot_token)  



if __name__ == "__main__":
    asyncio.run(main())

