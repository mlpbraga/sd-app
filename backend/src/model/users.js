const usersFormatter = {
  formatPostResponse(param) {
    return {
      _id:  param._id,
      nomeCompleto: param.nomeCompleto,
      email: param.email,
      username: param.username,
      cpf: param.cpf,
      dataNascimento: param.dataNascimento,
    };
  },
  formatGetById(param) {
    return {
      _id: param._id,
      nomeCompleto: param.nomeCompleto,
      email: param.email,
      username: param.username,
      cpf: param.cpf,
      dataNascimento: param.dataNascimento,
      dispositivo: param.dispositivo,
      paciente: param.paciente,
    };
  },
  formatGet(param) {
    const response = [];
    param.forEach((item) => {
      response.push({
        _id: item._id,
        email: item.email,
        username: item.username,
        cpf: item.cpf,
        dataNascimento: item.dataNascimento,
        dispositivo: item.dispositivo,
        paciente: item.paciente,
      });
    });
    return response;
  },
}

module.exports = usersFormatter;