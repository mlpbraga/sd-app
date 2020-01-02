const examsFormatter = {
  formatOne(param) {
    return {
      _id: param._id,
      nome: param.nome,
      medicoSolicitante: param.medicoSolicitante,
      dataRealizacao: param.dataRealizacao,
      observacoes: param.observacoes,
      resultado: param.resultado,
    }
  },
  formatAll(param) {
    const response = []
    param.forEach(element => {
      response.push(this.formatOne(element));
    });
    return response;
  }
}
module.exports = examsFormatter;