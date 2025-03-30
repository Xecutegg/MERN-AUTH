export const WELCOME_TEMP = `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to One Dream Esports</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f5ff;
            margin: 0;
            padding: 40px 0;
            display: flex;
            justify-content: center;
            min-height: 100vh;
        }

        .container {
            width: 640px;
            background: #d9f2ff;
            border-radius: 32px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(25, 103, 210, 0.1);
            position: relative;
            overflow: hidden;
        }

        .container::before,
        .container::after {
            content: "";
            position: absolute;
            background: rgba(25, 103, 210, 0.08);
            border-radius: 50%;
        }

        .container::before {
            top: -120px;
            right: -120px;
            width: 300px;
            height: 300px;
        }

        .container::after {
            bottom: -80px;
            left: -80px;
            width: 200px;
            height: 200px;
        }

        .header {
            text-align: center;
            padding-bottom: 24px;
            margin-bottom: 32px;
            position: relative;
            z-index: 1;
        }

        .logo {
            height: 80px;
            width: 80px;
            border-radius: 50%;
            border: 3px solid #1967d2;
            padding: 4px;
            margin-bottom: 24px;
        }

        h1 {
            color: #1967d2;
            font-size: 26px;
            margin: 16px 0;
            letter-spacing: -0.5px;
        }

        .content {
            line-height: 1.6;
            color: #4a5568;
            position: relative;
            z-index: 1;
        }

        .important-note {
            background: #ebf4fa;
            padding: 20px;
            border-radius: 24px;
            margin: 28px 0;
            position: relative;
        }

.badge {
    background: #1e77ff;
    color: white;
    padding: 12px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.25s ease-out;
    text-decoration: none;
    display: inline-block;
    margin: 8px 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.badge:hover {
    background: #004ecb;
    box-shadow: 0 6px 15px rgba(0, 80, 200, 0.4);
    transform: translateY(-2px) scale(1.03);
    opacity: 0.95;
    cursor: pointer;
}


        .footer {
            text-align: center;
            margin-top: 32px;
            color: #718096;
            font-size: 14px;
            padding-top: 24px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://cdn.discordapp.com/attachments/981535980408426496/1353045084937125968/OneDreamLogoAnimated.gif?ex=67ea1c2e&is=67e8caae&hm=b61e57b91608d30d75416ebdf98fe4b10cadc09a72cc23aef28e5dfd386ae553&" class="logo" alt="One Dream Esports Logo">
            <h1>Welcome to One Dream Esports!</h1>
        </div>

        <div class="content">
            <p>Dear {{user}}</p>
            <p>We are thrilled to welcome you to <strong>One Dream Esports</strong>! Your journey in the world of BGMI esports begins now. We're excited to have you as part of our growing gaming community.</p>
            <p>Your registered email: <strong style="color: #1967d2;">{{email}}</strong></p>

            <div class="important-note">
                <strong style="color: #1967d2;">🚀 Get Started:</strong>
                <p>Explore upcoming tournaments, practice scrims, and engage with the best players in the industry. Check out our rulebook, join our Discord, and follow our socials to stay updated.</p>
                <a href="#" class="badge">Check Rulebook</a>
                <a href="mailto:support@onedreamesports.games" class="badge">Support Email</a>
                <a href="https://discord.gg/WVThZG7Q5X" class="badge">Discord</a>
                <a href="https://www.instagram.com/xecute.gg_/" class="badge">Instagram</a>
                <a href="https://youtube.com/@onedreamesports.?si=Cao6RwTtGB-6jedT" class="badge">YouTube</a>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                Need assistance? Contact our support team at<br>
                <strong style="color: #1967d2;">support@onedreamesports.games</strong>
            </p>
        </div>

        <div class="footer">
            <p>Organized by One Dream Esports<br>
                <small>Official Tournament Partner Of Krafton</small>
            </p>
        </div>
    </div>
</body>

</html>
`