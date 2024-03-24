# Whistleblower Platform

![Whistleblower](image-2.png)

## Introduction

Welcome to Whistleblower Platform! Our decentralized platform is designed to empower whistleblowers by providing a secure and private environment for reporting misconduct. With a strong emphasis on user anonymity, individuals can submit reports without compromising their identities. Our goal is to foster transparency, accountability, and integrity within organizations while uncovering hidden truths.

## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [Typescript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Aceternity ui](https://ui.aceternity.com/) - UI Components
- [Mongoose](https://mongoosejs.com/) - ORM
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) – Hosting

## 👨‍💻 Getting Started

### Prerequisites

Here's what you need to be able to run WhistleBlower:

- Node.js
- MongoDB Database - connection string
- POLYGON_TESTNET_URL or RPC_PROVIDER 

#### First Clone the repository

```shell
git clone https://github.com/Gourav-21/Polygon-WhistleBlower.git

```

### Set up the contract

#### 1. Deploy the smart contract on the Polygon testnet

go to the node folder Polygon-WhistleBlower

```shell
cd Polygon-WhistleBlower
```

#### 2. Install npm dependencies

```shell
npm install
```

#### 3. change the url and accounts in hardhat.config.js

```shell
url:"YOUR_POLYGON_TESTNET_URL"
accounts:["YOUR_PRIVATE_KEY"]
```

#### 4. run

```shell
npx hardhat ignition deploy ./ignition/modules/Posts.ts --network matic
```

#### 4. copy the `contract address` from terminal

### Set up the frontend

#### 1. go to the next-frontend folder

```shell
cd  cd ../next-frontend/
```

or if you are in the WhistleBlower folder

```
cd next-frontend
```

#### 2. Install npm dependencies

```shell
npm install
```

#### 3. Copy the environment variables to `.env.local` and change the values

```shell
cp .env.example .env.local
```

The following environment variables must be set:

- `NEXT_PUBLIC_CONTRACT_ADDRESS` - The contract address of the WhistleBlower smart contract

- `NEXT_PUBLIC_RPC_PROVIDER` - The api of your rpc provider

- `MONGODB_URI` - The connection string for the MongoDB database

Replace the contract address and contract hash with the one you copied from the terminal
and create a [MongoDB database](https://www.mongodb.com/) and copy the connection string

#### 4. Run the dev server

```shell
npm run dev
```

#### 5. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Usage Guidelines:

- Users can navigate to the platform's frontend to view whistleblower posts anonymously.
- To submit a whistleblower report, users doesnt need to create an account.
- So, users can submit a report providing details of the misconduct without revealing their identity.
- Other users can interact with the posts by liking, commenting, and sharing.
- The platform ensures the privacy and security of whistleblowers by encrypting and storing data using Secret smart contracts.

### Additional Information:

- MongoDB is used to store additional details such as post metadata like likes, and comments.
- The frontend is developed using Next.js, providing a seamless user experience.
- Smart contracts are deployed on the Secret Network for privacy and security.
- The platform encourages collaboration and contributions by being open source.

### Demo Video:

https://www.youtube.com/watch?v=gEg9Jlg3IJ4&feature=youtu.be

[![Whistleblower](WhistleBlower.gif)](https://www.youtube.com/watch?v=gEg9Jlg3IJ4)
