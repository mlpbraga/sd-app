const teste = {
    "usuario": {
      "username": "luisabraga",
      "senha": "minhasenha123",
      "nomeCompleto": "Maria Luísa Pereira Braga",
      "eMail": "mluisapbraga@gmail.com",
      "dataNascimento": "10-10-1997",
      "paciente": {
        "cuidador": {
          "nome": null,
          "id": null,
        },
        "tipoSanguineo": "O+",
        "exames": [
          {
            "nome": "Hemograma",
            "medicoSolicitante": "Daniela Toppe",
            "dataRealizacao": "21-04-2019",
            "resultados": "umbase64deumpdf",
            "observacoes": "O resultado deu tudo normal aparentemente."
          }
        ],
        "MEDICAMENTOS": [
          {
            "nome": "Melatonina  ",
            "dosagem": "25mg",
            "composicao": "Hormônio-Melatonina",
            "pilulas": {
              "restantes": 60,
              "esquecidas": 0,
              "horarioCerto": 10,
              "horarioErrado": 2
            },
            "alarme": {
              "horarios": ["21:00"],
              "diasDaSemana": ["segunda", "terca", "sexta"]
            }
          }
        ]
      }
    }
  }
  
  class alarmsFormatter {
    static format(param) {
      // this.data = {
      //   username: param.username,
      //   senha: param.senha
      // };
  
      this.data = teste;
  
      return this.data;
    }
  }
  
  module.exports = alarmsFormatter;