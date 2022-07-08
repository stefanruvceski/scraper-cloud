import mongoose from "mongoose";

import { app } from "./app";
import { ScraperCreatedListener } from "./events/listeners/scraper-created-listener";
import { ScrapingFinishedListener } from "./events/listeners/scraping-finished-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    new ScraperCreatedListener(natsWrapper.client).listen();
    new ScrapingFinishedListener(natsWrapper.client).listen();
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Scraping Listening!");
  });
};

start();
