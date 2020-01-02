const User = require('./index');
const _ = require('lodash');

const medicineDao = {
  async add(userId, obj) {
    const user = await User.findById(userId);
    user.paciente.exames.push(obj);
    await User.findByIdAndUpdate(userId, user)
    return user.paciente.exames;
  },
  async readAll(userId) {
    const users = await User.findById(userId);
    return users.paciente.exames;
  },
  async readExam(userId, medId) {
    const users = await User.findById(userId).select('paciente.exames');
    if (!('exames' in users.paciente)) users.paciente = [];
    const exame = users.paciente.exames;
    return _.filter(exame, { _id: medId })[0];
  },
  async deleteExam(userId, medId) {
    const users = await User.findById(userId);
    const exame = users.paciente.exames;
    users.paciente.exames =  _.filter(exame, item => item._id !== medId);
    await User.findByIdAndUpdate(userId, users);
  },
  async updateExam(userId, medId, update) {
    const users = await User.findById(userId);
    users.paciente.exames =  _.filter(
      users.paciente.exames,
      item => item._id !== medId,
    );
    users.paciente.exames.push(update);
    await User.findByIdAndUpdate(userId, users);
    return await this.readExam(userId, medId);
  },
 
};

module.exports = medicineDao;