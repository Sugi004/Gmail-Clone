const isString = (value) => {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : "";
};

const isBoolean = (value) => {
  return typeof value === "boolean" && value === true ? true : false;
};

const isArray = (value) => {
  return typeof value === "object" && value instanceof Array ? value : [];
};

const isNumber = (value) => {
  return typeof value === "number" && value % 1 === 0 ? value : 0;
};

const isObject = (value) => {
  return typeof value === "object" &&
    !(value instanceof Array) &&
    value !== null
    ? value
    : {};
};

const isTitleCase = (value) => {
  return value
    .toLowerCase()
    .split(" ")
    .map((e) => {
      return e[0].toUpperCase() + e.slice(1);
    })
    .join(" ");
};
module.exports = {
  isString,
  isBoolean,
  isArray,
  isNumber,
  isObject,
  isTitleCase
};
