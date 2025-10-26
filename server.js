import express from "express";
import fetch from "node-fetch";

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const MIN_PRICE = process.env.MIN_PRICE;
const UBER_ACCESS_TOKEN = process.env.UBER_ACCESS_TOKEN;

console.log("🚀 Let's Drive It bot started...");

async function checkTrips() {
  console.log("checking trips...");

  const fakeTrips = [
    { id: 1, price: 35 },
    { id: 2, price: 28 },
    { id: 3, price: 42 },
  ];

  const filteredTrips = fakeTrips.filter((trip) => trip.price > MIN_PRICE);

  for (const trip of filteredTrips) {
    const message = `🚗 Trip #${trip.id} = €${trip.price}`;
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(
      message
    )}`;
    await fetch(url);
  }
}

// هر ۳۰ ثانیه یک بار بررسی کن
setInterval(checkTrips, 30000);

// لازم است برای Render:
app.get("/", (req, res) => res.send("Bot is running..."));

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server is running on port", process.env.PORT || 3000);
});


