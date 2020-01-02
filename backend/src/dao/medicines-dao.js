const User = require('./index');
const _ = require('lodash');

const medicineDao = {
  async add(userId, obj) {
    const user = await User.findById(userId);
    user.paciente.medicamentos.push(obj);
    await User.findByIdAndUpdate(userId, user)
    return user.paciente.medicamentos;
  },
  async readAll(userId) {
    const users = await User.findById(userId);
    return users.paciente.medicamentos;
  },
  async readMedicine(userId, medId) {
    const users = await User.findById(userId);
    if (!('medicamentos' in users.paciente)) users.paciente = [];
    const medicamento = users.paciente.medicamentos;
    return _.filter(medicamento, { _id: medId })[0];
  },
  async deleteMedicine(userId, medId) {
    const users = await User.findById(userId);
    const medicamento = users.paciente.medicamentos;
    users.paciente.medicamentos =  _.filter(medicamento, item => item._id !== medId);
    await User.findByIdAndUpdate(userId, users);
  },
  async updateMedicine(userId, medId, update) {
    const users = await User.findById(userId);
    users.paciente.medicamentos =  _.filter(
      users.paciente.medicamentos,
      item => item._id !== medId,
    );
    users.paciente.medicamentos.push(update);
    await User.findByIdAndUpdate(userId, users);
    return await this.readMedicine(userId, medId);
  },
 
};

module.exports = medicineDao;