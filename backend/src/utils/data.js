const data = [
  {
  'dataNascimento': '19/11/1997',
  'dispositivo': [{
    '_id': 'disp0001',
    'posicaoAlarme': 2,
    'SSID': 'wifi-zone-ufam-1',
    'senha': '',
    'statusAlarme': 0,
    'statusDispositivo': false,
  }],
  'email': 'joaoalb09@gmail.com',
  'nomeCompleto': 'João Alberto Jr',
  'paciente': {
    'tipoSanguineo': 'A+',
    'exame': {
      'dataRealização': '03/03/2019',
      'medicoSolicitante': 'Henrique Wildes',
      'nome': 'Hemograma Completo',
      'observacoes': 'Nenhuma',
      'resultado': 'Tudo normal',
    },
    'medicamento': {
      'alarmes': [{
        'dias': [0, 0, 1, 0, 0, 0, 0],
        'horario': ['12:00'],
      }],
      'composicao': 'melatonina',
      'dosagem': 25,
      'nome': 'Melatonina',
      'pilulas': {
        'esquecidas': 0,
        'horarioCerto': 0,
        'horarioErrado': 0,
        'quantidadeInicial': 30,
        'restante': 0,
      }
    },
  },
  'senha': '1234',
  'username': 'joaoalb',
},
{
  'dataNascimento': '21/07/1996',
  'dispositivo': [{
    '_id': 'disp0001',
    'posicaoAlarme': 2,
    'SSID': 'wifi-zone-ufam-1',
    'senha': '',
    'statusAlarme': 0,
    'statusDispositivo': false,
  }],
  'email': 'alealoi@gmail.com',
  'nomeCompleto': 'Luiz Alexandre Ale Aloi',
  'paciente': {
    'tipoSanguineo': 'O+',
    'exame': {
      'dataRealização': '03/03/2019',
      'medicoSolicitante': 'Henrique Wildes',
      'nome': 'Hemograma Completo',
      'observacoes': 'Nenhuma',
      'resultado': 'Tudo normal',
    },
    'medicamento': {
      'alarmes': [{
        'dias': [0, 0, 1, 0, 0, 0, 0],
        'horario': ['12:00'],
      }],
      'composicao': 'melatonina',
      'dosagem': 25,
      'nome': 'Melatonina',
      'pilulas': {
        'esquecidas': 0,
        'horarioCerto': 0,
        'horarioErrado': 0,
        'quantidadeInicial': 30,
        'restante': 0,
      }
    },
  },
  'senha': '1234',
  'username': 'alealoi',
}
];

module.exports = data;