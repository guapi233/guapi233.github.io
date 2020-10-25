const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/testdb");

mongoose.connection.once("open", () => {
  console.log("mongodb has been opened...");
});

let Schema = mongoose.Schema;

// 创建 Schema
let stuSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: "female",
  },
});

// 通过 Schema 创建 Model
let stuModel = mongoose.model("student", stuSchema);

// // 插入数据
// stuModel.create({
//   name: "崔永杰",
//   age: 19,
// });

stuModel.update(
  { name: "崔永杰" },
  {
    $set: {
      age: 22,
    },
  },
  (err) => {
    console.log("??");
  }
);
