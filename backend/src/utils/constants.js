const constants = {
    ERROR_MESSAGE: {
        status: 'Bad Request',
        message: 'Não foi encontrado nenhum resultado para esse endpoint.',
        code: 404,
    },
    INSERT_MESSAGE: {
        status: 'Inserted',
        message: 'O objeto foi inserido com sucesso',
        code: 5,
    },
    UPDATE_MESSAGE: {
        status: 'Updated',
        message: 'O objeto foi altrerado com sucesso',
        code: 4,
    },
    DELETE_MESSAGE: {
        status: 'Deleted',
        message: 'O objeto foi removido com sucesso',
        code: 3,
    },
    USER_NOT_FOUND: {
        status: 'Not Found',
        message: 'Usuário não encontrado.',
        code: 1,
    },
    INVALID_PASSWORD: {
        status: 'Not Found',
        message: 'Senha incorreta.',
        code: 2,
    },
};

module.exports = constants;