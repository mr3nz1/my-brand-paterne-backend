import mongoose, { ConnectOptions, MongooseOptions } from "mongoose";

async function connectDB(url: string) {
  const options: MongooseOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    autoCreate: true,
  };
  return mongoose.connect(url, options);
}

export default connectDB;
