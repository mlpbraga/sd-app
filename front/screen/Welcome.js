import React from 'react';
import {KeyboardAvoidingView, View, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import styles from "../resources/styles";
import {RkTextInput, RkButton, RkText } from "react-native-ui-kitten";
import FlashMessage from "react-native-flash-message";

const BASE_URL = 'http://ec2-18-191-184-225.us-east-2.compute.amazonaws.com:4513/api/';

class Welcome extends React.Component{

    username = '';
    senha = '';

    validaUsuario() {

        fetch(BASE_URL + 'login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: this.username,
                senha: this.senha
            })
        })
            .then((response) => response.json())
            .then((responseJson) =>
            {
                if (responseJson.message) {
                    this.refs.message.showMessage({
                        message: responseJson.message,
                        type: "danger"
                    });
                    return
                }

                let userId = responseJson._id;
                this.props.navigation.navigate('Feed', { userId: userId })
            })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View
                    style={styles.containerLogin}
                >
                    <KeyboardAvoidingView behavior='padding' style={styles.container}>
                        <Image source={require('../resources/img/medicine-withe-128.png')}/>
                        <RkText style={styles.welcome}>MedHelper</RkText>
                        <RkTextInput style={styles.inputLogin}
                                     rkType='bordered'
                                     placeholder={'Nome de usuário'}
                                     textContentType={'name'}
                                     onChangeText={(nome) => {
                                         this.username = nome
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
                        <View style={{marginTop: 20, marginBottom: 10}}>
                            <RkButton style={styles.button}
                                      onPress={() => this.validaUsuario()}>
                                Entrar
                            </RkButton>
                        </View>
                        <View>
                            <View style={styles.textRow}>
                                <RkText rkType='primary3'>Não possui uma conta? </RkText>
                                <RkButton rkType='clear'>
                                    <RkText rkType='header6' style={{textDecorationLine: 'underline'}}
                                            onPress={() => this.props.navigation.navigate('SignUp')}>
                                        Cadastre-se
                                    </RkText>
                                </RkButton>
                            </View>
                        </View>
                        <FlashMessage
                            ref="message"
                            position="bottom"/>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default Welcome;
