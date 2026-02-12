const express = require("express");
const app = express();
const PORT = 3000;

function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>OTP Generator</title>
        <style>
          body {
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f2f2f2;
          }
          .box {
            background: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          button {
            padding: 10px 20px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background: #0056b3;
          }
          h2 {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>OTP Generator</h1>
          <button onclick="generate()">Generate OTP</button>
          <h2 id="otp"></h2>
        </div>

        <script>
          async function generate() {
            const res = await fetch('/otp');
            const data = await res.json();
            document.getElementById('otp').innerText = data.otp;
          }
        </script>
      </body>
    </html>
  `);
});

app.get("/otp", (req, res) => {
  res.json({ otp: generateOTP() });
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
