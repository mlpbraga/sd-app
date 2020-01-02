const User = require('./index');

const userDao = {
  async readUser(id) {
    return await User.findById(id);
  },
  async readAll() {
    const users = await User.find({});
    return users;
  },
  async updateUser(id, update) {
    return await User.updateOne({ _id:id }, update);
  },
  async deleteUser(id) {
    return await User.deleteOne({ _id: id });
  }
};

module.exports = userDao;