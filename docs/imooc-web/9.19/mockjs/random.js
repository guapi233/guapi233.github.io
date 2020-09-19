const Mock = require("mockjs");

const friends = ["1", "2", "3", "4"];

let data = {
  email: Mock.Random.email(),
  image: Mock.Random.image("200x100"),
  name: Mock.Random.cname(),
  url: Mock.Random.url(),
  address: Mock.Random.city(),
  randomNum: Mock.Random.pick(friends),
};

console.log(JSON.stringify(data, null, 2));
