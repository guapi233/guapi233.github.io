const Mock = require("mockjs");

let data = Mock.mock({
  "list|1-10": [
    {
      "id|+1": 1,
      name: "@cname",
    },
  ],
});

console.log(JSON.stringify(data, null, 2));
