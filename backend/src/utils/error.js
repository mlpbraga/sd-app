/* eslint-disable no-console */
const e = {
  throwErro(err, msg) {
    if (err) {
      console.log('\33[95m> ' + msg + ' :: \33[0m');
      throw err;
    }
  }
}

module.exports = e;