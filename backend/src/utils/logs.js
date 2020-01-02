/* eslint-disable max-len */
/* eslint-disable no-console */
const moment = require('moment-timezone');

const logger = {
  log(msg) {
    const data = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${data}][   LOG   ] ${msg}`);
  },
  warning(msg) {
    const data = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    console.log(`\x1b[93m[${data}][   WRN   ] ${msg}\x1b[0m`);
  },
  ok(msg) {
    const data = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    console.log(`\x1b[92m[${data}][   OK    ] ${msg}\x1b[0m`);
  },
  error(msg) {
    const data = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    console.log(`\x1b[91m[${data}][   ERR   ] ${msg}\x1b[0m`);
  },
  request(req) {
    const {
      context,
      url,
      method,
    } = req;
    const data = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');    
    console.log(`[${data}][   REQ   ] ${method} /${context}${url}`);
  },
};

module.exports = logger;
