import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

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

// Handle /start command
app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  const msg = req.body.message;
  if (msg?.text === "/start") {
    const text = "✅ Bot is running and ready to send trip updates!";
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${msg.chat.id}&text=${encodeURIComponent(
      text
    )}`;
    await fetch(url);
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("Bot is running..."));

setInterval(checkTrips, 30000);

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server is running on port", process.env.PORT || 3000);
});






