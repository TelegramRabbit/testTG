const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Вставьте ваш Telegram API токен
const TELEGRAM_API_TOKEN = '7809293668:AAH-cut9N7YyWUQeESZDpNX3yGkMK2CyWK8';
// Список id пользователей, которым нужно отправлять сообщения
const USER_IDS = [123456789, 987654321];  // Укажите Telegram ID ваших пользователей

app.use(bodyParser.urlencoded({ extended: true }));

// Отправка сообщения через Telegram API
function sendMessageToUsers(message) {
  USER_IDS.forEach(userId => {
    const url = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`;
    const data = {
      chat_id: userId,
      text: message
    };

    axios.post(url, data)
      .then(response => {
        console.log(`Сообщение отправлено пользователю ${userId}`);
      })
      .catch(error => {
        console.error(`Ошибка при отправке сообщения пользователю ${userId}:`, error.message);
      });
  });
}

// Главная страница с формой
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Рассылка сообщений</title></head>
      <body>
        <h1>Отправить сообщение пользователям Telegram</h1>
        <form action="/send_message" method="post">
          <textarea name="message" rows="4" cols="50" placeholder="Введите сообщение"></textarea><br><br>
          <input type="submit" value="Отправить">
        </form>
      </body>
    </html>
  `);
});

// Обработка формы
app.post('/send_message', (req, res) => {
  const message = req.body.message;
  sendMessageToUsers(message);
  res.send('Сообщение отправлено всем пользователям!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
