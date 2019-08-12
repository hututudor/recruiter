const uuid = require("uuid/v4");
const {
  res: { success, error }
} = require("katas");
const Joi = require('joi');

const schema = Joi.object().keys({
  type: Joi.string().min(3).required(),
  owner: Joi.string().min(3).required(),
  date: Joi.string().required(),
  location: Joi.string().required()
});

const getAll = async ({ event, db }) => {
  const res = await db.table('days').all();

  return success(res);
};

const add = async ({ event, body, db }) => {
  const { error: err } = schema.validate(body);

  if(err) {
    return error(401, { error: err.details[0].message });
  }

  const res = await db.table('days').create({
    id: uuid(),
    type: body.type,
    owner: body.owner,
    date: body.date,
    location: body.location
  });

  return success(res);
};

module.exports = {
  getAll,
  add
};