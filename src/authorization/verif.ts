import { ConfigService } from "@nestjs/config"

const verifyHtml = ()=>{
  const config = new ConfigService()
  const BASE_URL = config.get('LOGIN_URL_FOR_MAIL_VERIFY')
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verified</title>
      <style>
        body {
          background: #e6ffed;
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #2e7d32;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          color: #333;
          margin-bottom: 30px;
        }
        a.button {
          text-decoration: none;
          background-color: #2e7d32;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        a.button:hover {
          background-color: #1b5e20;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✅ Your email has been successfully verified!</h1>
        <p>Thank you for verifying your email address.</p>
        <a class="button" href="${String(BASE_URL)}">Continue</a>
      </div>
    </body>
    </html>
  `

}
export default verifyHtml