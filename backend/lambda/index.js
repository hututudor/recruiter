const routes = require("./routes");
const db = require("./db");
const { Kata } = require("katas");

// @ts-ignore
exports.handler = async e => {
  // Log every request
  console.log("request:", JSON.stringify(e, undefined, 2));

  return await Kata(e, routes, db);
};
