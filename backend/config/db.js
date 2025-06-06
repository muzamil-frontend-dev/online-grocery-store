import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `✅✅✅Application is connected with host: ${connect.connection.host}`
    );
  } catch (error) {
    console.log(`❌❌❌Error connecting database : ${error.message} `.bgRed);
    process.exit(1);
  }
};

export default ConnectDb;
