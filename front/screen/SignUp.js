import React from 'react';
import styles from "../resources/styles"
import { KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RkTextInput, RkButton, RkText } from "react-native-ui-kitten";

const BASE_URL = 'http://ec2-18-191-184-225.us-east-2.compute.amazonaws.com:4513/api/';

class SignUp extends React.Component {

    username = '';
    email = '';
    senha = '';
    senha2 = '';

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    validaCadastro() {
        if (this.senha !== this.senha2 || this.username.length < 1 || this.senha.length < 3) {
            Alert.alert(
                'Campos inválidos',
                'Preencha corretamente os campos.',
                [
                    {text: 'Ok'}
                ],
                { cancelable: false }
            )
        } else {
            fetch(BASE_URL + 'users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password: this.senha,
                    nomeCompleto: 'fixo',
                    cpf: 'fixo',
                    tipoSanguineo: 'fixo',
                    dataNascimento: Date.now()
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    let userId = responseJson.data._id;
                    this.props.navigation.navigate('Feed', { userId: userId });
                })
                .catch( error => {
                    console.log(error)
                    Alert.alert(
                        'Erro',
                        'Ocorreu um erro no seu cadastro.',
                        [
                            {text: 'Ok'}
                        ],
                        { cancelable: false }
                    )
                }

                )


        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View
                    style={styles.containerLogin}>
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>
                        <RkText style={styles.signUp}>Cadastro</RkText>
                        <RkTextInput
                            style={styles.inputLogin}
                            rkType='bordered'
                            placeholder={'Nome de usuário'}
                            onChangeText={(nome) => {
                                this.username = nome
                            }}
                        />
                        <RkTextInput
                            style={styles.inputLogin}
                            rkType='bordered'
                            placeholder={'exemplo@email.com'}
                            textContentType={'emailAddress'}
                            onChangeText={(email) => {
                                this.email = email
                            }}
                        />
                        <RkTextInput style={styles.inputLogin}
                                       rkType='bordered'
                                       placeholder={'Senha'}
                                       textContentType={'password'}
                                       secureTextEntry
                                     onChangeText={(senha) => {
                                         this.senha = senha
                                     }}
                        />
                        <RkTextInput style={styles.inputLogin}
                                     rkType='bordered'
                                     placeholder={'Repita a senha'}
                                     textContentType={'password'}
                                     secureTextEntry
                                     onChangeText={(senha2) => {
                                         this.senha2 = senha2
                                     }}
                        />
                        <View style={{marginTop: 20, marginBottom: 10}}>
                            <RkButton style={styles.button}
                                      onPress={() => this.validaCadastro()}>
                                Finalizar
                            </RkButton>
                        </View>
                        <View style={styles.textRow}>
                            <RkText
                                rkType='primary3'>Já possui uma conta? </RkText>
                            <RkButton rkType='clear'>
                                <RkText rkType='header6' style={{textDecorationLine: 'underline'}}
                                        onPress={() => this.props.navigation.navigate('Welcome')}>
                                    Entrar
                                </RkText>
                            </RkButton>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default SignUp;