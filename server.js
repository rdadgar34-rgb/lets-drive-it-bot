1. Upload this folder (zipped) to Render → New Web Service → Connect manually.
2. In Render → Environment Variables, set:
   BOT_TOKEN = your Telegram bot token
   CHAT_ID = 168591928
   MIN_PRICE = 30
   UBER_ACCESS_TOKEN = (keep or replace when real token arrives)
3. Deploy → it will check every 15 minutes and send trips above €30.
4. Change min price anytime with /setprice 40 in Telegram.
