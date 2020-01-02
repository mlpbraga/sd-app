const User = require('./index');
const medicineDao = require('../dao/medicines-dao');
const _ = require('lodash');

const alarmDao = {
  async add(userId, medId, obj) {
    const user = await User.findById(userId);
    const medicine = await medicineDao.readMedicine(userId, medId);
    if (!('alarmes' in medicine)) medicine.alarmes = [];
    medicine.alarmes.push(obj);
    user.paciente.medicamentos = _.filter(
      user.paciente.medicamentos,
      item => item._id !== medId,
    );
    user.paciente.medicamentos.push(medicine);
    await User.findByIdAndUpdate(userId, user);
    return user.paciente.medicamentos;
  },
  async readAllByMedicine(userId, medId) {
    const medicine = await medicineDao.readMedicine(userId, medId);
    if (!('alarmes' in medicine)) medicine.alarmes = [];
    return medicine.alarmes;
  },
  async readAlarm(userId, medId, alarmId) {
    const alarms = await this.readAllByMedicine(userId, medId);
    return _.filter(alarms, { _id:  alarmId})[0];
  },
  async updateAlarm(userId, medId, alarmId, update) {
    const user = await User.findById(userId);
    const medicine = await medicineDao.readMedicine(userId, medId);

    if (!('alarmes' in medicine)) medicine.alarmes = [];    
    medicine.alarmes = _.filter(
      medicine.alarmes,
      item => item._id !== alarmId,
    )
    medicine.alarmes.push(update);

    user.paciente.medicamentos = _.filter(
      user.paciente.medicamentos,
      item => item._id !== medId,
    );

    user.paciente.medicamentos.push(medicine);

    await User.findByIdAndUpdate(userId, user);
    return user.paciente.medicamentos;
  },
  async deleteAlarm(userId, medId, alarmId) {
    const user = await User.findById(userId);
    const medicine = await medicineDao.readMedicine(userId, medId);

    if (!('alarmes' in medicine)) medicine.alarmes = [];

    medicine.alarmes = _.filter(
      medicine.alarmes,
      item => item._id !== alarmId,
    );

    user.paciente.medicamentos = _.filter(
      user.paciente.medicamentos,
      item => item._id !== medId,
    )

    user.paciente.medicamentos.push(medicine);
    await User.findByIdAndUpdate(userId, user);
    return user.paciente.medicamentos;
  },
};

module.exports = alarmDao;