<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Gmail Clone Application (Local)</h3>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The Gmail Clone Application is a simple email system that allows users to create accounts, send, and receive emails using a local SMTP server. This application is designed for local testing and development purposes.

Initially I have created 2 accounts testaccount@gmail.com and testaccount2@gmail.com and made a email communication between them.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Node.js and npm (Node Package Manager) installed
A local SMTP server for email testing

```

### Installing

A step by step series of examples that tell you how to get a development env running.

Install dependencies:

```
cd local-mail-app
npm install
```

Configure the local SMTP server:

```
Set up a local SMTP server like MailHog using Node Mailer and make sure it's running.
Update the SMTP server configuration in the application settings.
```

Start the application:

npm start

## 🎈 Usage <a name="usage"></a>

Open your web browser and access the application at http://localhost:5173.

Create 2 user accounts with a username and password.

Compose and send emails from one account to the other.

You can see the sent mail in the inbox of second user

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs + Vite](https://react+vite.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## 🎉 Contributing <a name = "Contributing"></a>

If you'd like to contribute to the project, please follow these steps:

- Fork the project.
- Create a new branch for your feature or fix.
- Commit your changes.
- Push to your fork and submit a pull request.

## ✍️ Authors <a name = "authors"></a>

- [@Sugi004](https://github.com/Sugi004) - Idea & Initial work

If you have any questions or need further assistance, feel free to contact me at sugishivam8@gmail.com.

Thank you for using the Gmail Clone Application!
