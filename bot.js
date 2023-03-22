const axios = require("axios");
const TELEGRAM_BOT_TOKEN = "6003245940:AAF8g34Kd8rO0VaGfCUFGQKr3VobDYdPtpM";
const TELEGRAM_CHAT_ID = "149579515";
const coinId = "ramses-exchange";

setInterval(() => {
  getPrices();
}, 60000);
function getPrices() {
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`
    )
    .then((res) => {
      if (res.data[0].current_price > 0.1) {
        const message = `Liza got some money! ${res.data[0].current_price}`;
        axios.post(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }
        );
      }
      return res;
    });
}