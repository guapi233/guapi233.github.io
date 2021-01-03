// const { add } = require("./index");
import { add } from "./index";
import axios from "axios";
jest.mock("axios");

test("测试加法", async () => {
  axios.get.mockResolvedValueOnce(3);
  // expect(10 < 5).toBe(true);
  await expect(axios.get("aa")).resolves.toBe(3);
});
