const { ORM } = require("katas");

const db = new ORM();
db.provider = db.providers.DYNAMODB;

db.addTable(process.env.DAYS_TABLE_NAME, "days", "id");

module.exports = db;
