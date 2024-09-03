import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import users from "./data/users.js";
import User from "./models/user.js";
import Promotion from "./models/promotion.js";
import promotions from "./data/promotions.js";

dotenv.config();

const importData = async () => {
  try {
    ConnectDb();
    await User.deleteMany();
    await Promotion.deleteMany();

    await User.insertMany(users);
    await Promotion.insertMany(promotions);

    console.log(`✅✅✅ Data imported successfully.`);
    process.exit(0);
  } catch (error) {
    console.log(`❌❌❌Unable to import data : ${error.message} `.bgRed);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    ConnectDb();
    await User.deleteMany();
    await Promotion.deleteMany();
    console.log(`✅✅✅ Data deleted successfully.`);
    process.exit(0);
  } catch (error) {
    console.log(`❌❌❌Unable to delete data : ${error.message} `.bgRed);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  deleteData();
} else {
  importData();
}
