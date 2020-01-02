
function agora() {
  const data = new Date();
  return {
      dia: data.getDay(),
      mes: data.getMonth(),
      ano: data.getFullYear(),
      hora: data.getHours()-4 > 0 ? `${data.getHours()-4}` : `${24 + data.getHours()-4}`,
      minuto: data.getMinutes() >  10 ? `${data.getMinutes()}` : `0${data.getMinutes()}`,
      
  }
}

module.exports = {
  agora,
}