const formatRes = (res, success, code, msg, data) => {
  res.status(code).send({ success, msg, data });
};

module.exports = formatRes;
