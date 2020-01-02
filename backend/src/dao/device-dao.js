const User = require('./index');
const medicineDao = require('./medicines-dao');
const alarmDao = require('./alarm-dao');
const uuidv1 = require('uuid/v1');

const deviceDao = {
  async readDevice(id) {
    const user = await User.findById(id);
    return user.dispositivo;
  },
  async createDevice(id) {
    const user = await User.findById(id);
    user.dispositivo = {
      _id: uuidv1(),
      posicaoAlarme: 0,
      statusAlarme: 0,
      statusDispositivo: false,
    };
    await User.findByIdAndUpdate(id, user);
    return user.dispositivo;
  },
  async checkNowAlarms(id) {
    const alarmes = [];
    const medicines = await medicineDao.readAll(id);
    for (let index = 0; index < medicines.length; index++) {
      let aux = await alarmDao.readAllByMedicine(id, medicines[index]._id);
      aux.forEach(alarm => {

        alarmes.push({
          ...alarm,
          slot: medicines[index].slot
        });
      });
    }
    return alarmes;
  }
};

module.exports = deviceDao;