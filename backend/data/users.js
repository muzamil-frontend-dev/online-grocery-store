import bcrypt from "bcryptjs";
const users = [
  {
    name: "Ahmad",
    email: "ahmad@yopmail.com",
    password: bcrypt.hashSync("Qwe123@", 10),
    isAdmin: true,
  },
  {
    name: "Arslan",
    email: "arslan@yopmail.com",
    password: bcrypt.hashSync("Qwe123@", 10),
  },
  {
    name: "Ayesha",
    email: "ayesha@yopmail.com",
    password: bcrypt.hashSync("Qwe123@", 10),
  },
];

export default users;
