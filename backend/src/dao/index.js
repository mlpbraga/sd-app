const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nomeCompleto: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  tipoSanguineo: String,
  dispositivo: {
    _id: String,
    posicaoAlarme: Number,
    statusAlarme: Number,
    statusDispositivo: Boolean,
  },
  paciente: {
    type: {
      exames: {
        type: [
          {
            dataRealizacao: Date,
            medicoSolicitante: String,
            nome: String,
            observacoes: String,
            resultado: String,
          },
        ],
      },
      medicamentos: {
        type:
          [{
            _id: String,
            nome: String,
            composicao: String,
            dosagem: String,
            alarmes: {
              type: [
                {
                  _id: String,
                  dias: [Number],
                  horario: String,
                },
              ],
            },
            slot: String,
            pilulas: {
              type: {
                esquecidas: Number,
                horarioCerto: Number,
                horarioErrado: Number,
                quantidadeInicial: Number,
                restantes: Number,
              }
            }
          }
        ],
      }
    }
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
