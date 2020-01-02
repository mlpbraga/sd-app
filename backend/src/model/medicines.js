const medicinesFormatter = {
  formatPostRequest(param) {
    return {
      _id: param._id,
      nome: param.nome,
      dosagem: param.dosagem,
      composicao: param.composicao,
      pilulas: {
        esquecidas: 0,
        horarioCerto: 0,
        horarioErrado: 0,
        quantidadeInicial: param.pilulas.quantidadeInicial,
        restantes: param.pilulas.quantidadeInicial,
      },
      alarmes: [],
    }
  },
  formatOne(param) {
    return {
      _id: param._id,
      nome: param.nome,
      dosagem: param.dosagem,
      composicao: param.composicao,
      pilulas: {
        quantidadeInicial: param.pilulas.quantidadeInicial,
        restantes: param.pilulas.restantes,
        esquecidas: 0,
        horarioCerto: 0,
        horarioErrado: 0,
      },
      alarmes: param.alarmes,
      slot: param.slot,
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
module.exports = medicinesFormatter;