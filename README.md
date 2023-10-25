# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Gmail Clone Application (Local)
Overview
The Gmail Clone Application is a simple email system that allows users to create accounts, send, and receive emails using a local SMTP server. This application is designed for local testing and development purposes.

Initially I have created 2 accounts testaccount@gmail.com and testaccount2@gmail.com and made a email communication between them.

Features
User account creation
Send and receive emails locally
Local SMTP server for email communication
Star the mails
Open/View the received & sent mails
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm (Node Package Manager) installed
A local SMTP server for email testing

Install dependencies:

bash
Copy code
cd local-mail-app
npm install
Configure the local SMTP server:

Set up a local SMTP server like MailHog using Node Mailer and make sure it's running.
Update the SMTP server configuration in the application settings.
Start the application:

bash
Copy code
npm start
Usage
Open your web browser and access the application at http://localhost:5173.

Create 2 user accounts with a username and password.

Compose and send emails from one account to the other.

You can see the sent mail in the inbox of second user

Troubleshooting
If you encounter issues with the application or local SMTP server, please check the following:

Ensure the local SMTP server is running and properly configured.
Check the application's configuration, especially the SMTP server settings.
Review error messages in the application console for clues on what might be wrong.
Contributing
If you'd like to contribute to the project, please follow these steps:

Fork the project.
Create a new branch for your feature or fix.
Commit your changes.
Push to your fork and submit a pull request.

Contact
If you have any questions or need further assistance, feel free to contact me at sugishivam8@gmail.com.

Thank you for using the Gmail Clone Application!
