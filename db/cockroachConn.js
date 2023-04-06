import pg from "pg";
import dotenv from "dotenv"
dotenv.config({path: "./config/config.env"})
const { Client } = pg

const client = new Client(process.env.DATABASE_URL);

export const connectCockroach = async (callback) => {
  try {
    await client.connect();
    callback()
  } catch (err) {
    callback(err)
  } 
}

export const disconnectCockroach = async () => {
    console.log("disconnecting DB")
    client.end()
}