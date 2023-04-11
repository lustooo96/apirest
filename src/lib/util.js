const fs = require("fs");
const csv = require("csv-parser");
const { Readable } = require("stream");

const util = {};

util.importData = (buffer) => {
  const result = [];
  new Promise((resolve, reject) => {
    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on("data", (data) => result.push(data))
      .on("end", () => {
        resolve(result);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Validations
util.isValidCpf = function f(strCPF) {
  if (strCPF) {
    const CPF_BLACKLIST = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
      "12345678909",
    ];

    let sum;
    let rest;
    sum = 0;

    if (strCPF.length !== 11) return false;

    if (CPF_BLACKLIST.includes(strCPF)) return false;

    for (let i = 1; i <= 9; i += 1)
      sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;

    sum = 0;
    for (let i = 1; i <= 10; i += 1)
      sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(10, 11), 10)) return false;
  }
  return true;
};

util.isValidEmail = function f(strEmail) {
  let result = true;
  if (strEmail) {
    const emailRegEx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailFormatted = strEmail.trim();
    result = emailRegEx.test(emailFormatted);
  }
  return result;
};

module.exports = util;
