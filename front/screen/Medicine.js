import React from 'react'
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard, ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity, FlatList
} from "react-native";
import { CheckBox } from "react-native-elements";
import styles from '../resources/styles';
import { RkTextInput, RkButton, RkText } from "react-native-ui-kitten";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modalbox";
import TimePicker from 'react-native-simple-time-picker';
import FlashMessage, { showMessage } from "react-native-flash-message";

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const BASE_URL = 'http://ec2-18-191-184-225.us-east-2.compute.amazonaws.com:4513/api/';

export default class Medicine extends React.Component {

    nome = '';
    dosagem = '';
    composicao = '';
    slot = null;
    qtdInicial = null;
    alarmes = [];

    constructor(props) {
        super(props);

        this.state = {
            userId: props.navigation.getParam('userId', ''),
            item: props.navigation.getParam('item', ''),
            loading: true,
            checkedDays: [false, false, false, false, false, false, false],
            selectedDays: [],
            selected: undefined,
            selectedHours: 0,
            selectedMinutes: 0,
            alarmModalTitle: '',
            editAlarmMode: false,
            medicine: {
                _id: undefined,
                nome: '',
                dosagem: '',
                composicao: '',
                pilulas: {
                    quantidadeInicial: null,
                    horarioCerto: 0,
                    horarioErrado: 0,
                    esquecidas: 0
                },
                alarmes: [],
                slot: null
            },
        };
    }

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        let title = params.item ? 'Editar Medicação' : 'Nova Medicação';

        return {
            title: title
        };
    };

    componentDidMount() {
        this.carregaDados()
    }

    carregaDados() {
        if (this.state.item) {
            fetch(BASE_URL + 'medicines?userid=' + this.state.userId + '&medid=' + this.state.item._id,
                { method: 'GET' })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({medicine: responseJson}, () => {
                        this.nome = this.state.medicine.nome;
                        this.dosagem = this.state.medicine.dosagem;
                        this.composicao = this.state.medicine.composicao;
                        this.qtdInicial = this.state.medicine.pilulas.quantidadeInicial;
                        this.slot = this.state.medicine.slot;
                    });
                })
                .catch((error) => console.log(error))
                .finally(() => this.setState({loading: false}));
        } else {
            this.setState({loading: false})
        }
    }

    selecionaItem = (item) => {

        let horas = item.horas.toString().split(':');
        horas[1] = horas[1].replace('h', '');

        let arrayDias = [false, false, false, false, false, false, false];
        for (let i = 0; i < item.dias.length; i++) {
            arrayDias[item.dias[i] - 1] = true
        }

        this.setState(
            {selected: item, selectedHours: Number(horas[0]), selectedMinutes: Number(horas[1]), checkedDays: arrayDias },
            () => {
                this.openAlarmModal(true)
            })
    };

    onClose = () => {
        this.setState({selected: undefined})
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.itemListSm}
                    onPress={() => this.selecionaItem(item)}
                >
                    <FontAwesomeIcon
                    icon={ faClock }
                    style={styles.icon}
                    size={25}/>
                    <View style={styles.textItem}>
                        <Text style={{fontSize: 15}}>
                            {item.horas}, {this.getDays(item.dias)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        const { loading } = this.state;

        if (loading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            )
        } else {
            return (
                <View>
                    <TouchableWithoutFeedback acessible={false}
                                              onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <View style={styles.container}>
                                <KeyboardAvoidingView
                                    style={styles.containerMain}
                                    behavior={'padding'}>
                                    <RkText style={styles.text}>
                                        Nome do medicamento
                                    </RkText>
                                    <RkTextInput
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'name'}
                                        onChangeText={(nome) => {
                                            this.nome = nome
                                        }}
                                    >
                                        {this.state.medicine.nome}
                                    </RkTextInput>

                                    <RkText style={styles.text}>
                                        Dosagem (mg)
                                    </RkText>
                                    <RkTextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'number'}
                                        onChangeText={(dosagem) => {
                                            this.dosagem = dosagem
                                        }}
                                    >
                                        {this.state.medicine.dosagem}
                                    </RkTextInput>

                                    <RkText style={styles.text}>
                                        Quantidade de pílulas no frasco
                                    </RkText>
                                    <RkTextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'number'}
                                        onChangeText={(qtdInicial) => {
                                            this.qtdInicial = qtdInicial
                                        }}
                                    >
                                        {this.state.medicine.pilulas.quantidadeInicial}
                                    </RkTextInput>

                                    <RkText style={styles.text}>
                                        Duração do tratamento(dias)
                                    </RkText>
                                    <RkTextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'number'}
                                        // onChangeText={(duracao) => {
                                        //     this.setState({medicine : { duracao: duracao }});
                                        // }}
                                    />

                                    <RkText style={styles.text}>
                                        Slot de armazenamento
                                    </RkText>
                                    <RkTextInput
                                        keyboardType='numeric'
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'number'}
                                        onChangeText={(nSlot) => {
                                            this.slot = nSlot
                                        }}
                                    >
                                        {this.state.medicine.slot}
                                    </RkTextInput>

                                    <RkText style={styles.text}>
                                        Composição do medicamento
                                    </RkText>
                                    <RkTextInput
                                        style={styles.input}
                                        rkType='bordered'
                                        textContentType={'number'}
                                        onChangeText={(comp) => {
                                            this.composicao = comp
                                        }}
                                    >
                                        {this.state.medicine.composicao}
                                    </RkTextInput>

                                    {this.state.item
                                        ?
                                        <View style={styles.block}>
                                            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                                                <RkText style={styles.text}>
                                                    Lembretes
                                                </RkText>
                                                <FontAwesomeIcon
                                                    onPress={() => this.openAlarmModal(false)}
                                                    icon={ faPlusCircle }
                                                    color={ '#15885a' }
                                                    style={{marginLeft: 'auto', marginRight: 20}}
                                                    size={30}/>
                                            </View>
                                            <FlatList
                                                style={{alignSelf: 'stretch', marginHorizontal: 5}}
                                                keyExtractor={this.keyExtractor}
                                                data={this.alarmList()}
                                                renderItem={this.renderItem}
                                            />
                                        </View>
                                        :
                                        <View />

                                    }

                                    <View>
                                        {this.state.item
                                            ?
                                            <View style={{flexDirection: 'row'}}>
                                                <RkButton
                                                    onPress={() => this.removeMedicine()}
                                                    style={styles.buttonDanger}>
                                                    Remover
                                                </RkButton>
                                                <RkButton
                                                    onPress={() => this.updateMedicine()}
                                                    style={styles.button}>
                                                    Atualizar
                                                </RkButton>
                                            </View>
                                            :
                                            <RkButton
                                                style={styles.button}
                                                onPress={() => this.createMedicine()}
                                            >
                                                Finalizar
                                            </RkButton>
                                        }
                                    </View>
                                    <View>
                                        <FlashMessage
                                            ref="message"
                                            position="bottom"/>
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>

                    <Modal
                        style={styles.modal}
                        ref={'modal1'}
                        position={'center'}
                        swipeToClose={this.state.swipeToClose}
                        onClosed={this.onClose}
                        onOpened={this.onOpen}
                        onClosingState={this.onClosingState}>
                        <View style={styles.text}>
                            <Text style={{fontSize: 20, marginVertical: 10}}>
                                {this.state.alarmModalTitle}
                            </Text>
                        </View>
                        <TimePicker
                            selectedHours={this.state.selectedHours}
                            selectedMinutes={this.state.selectedMinutes}
                            onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox
                                title='Seg'
                                checked={this.state.checkedDays[0]}
                                onPress={() => this.updateCheckBox(0)}
                            />
                            <CheckBox
                                title='Ter'
                                checked={this.state.checkedDays[1]}
                                onPress={() => this.updateCheckBox(1)}
                            />
                            <CheckBox
                                title='Qua'
                                checked={this.state.checkedDays[2]}
                                onPress={() => this.updateCheckBox(2)}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <CheckBox
                                title='Qui'
                                checked={this.state.checkedDays[3]}
                                onPress={() => this.updateCheckBox(3)}
                            />
                            <CheckBox
                                title='Sex'
                                checked={this.state.checkedDays[4]}
                                onPress={() => this.updateCheckBox(4)}
                            />
                            <CheckBox
                                title='Sab'
                                checked={this.state.checkedDays[5]}
                                onPress={() => this.updateCheckBox(5)}
                            />
                        </View>
                        <CheckBox
                            title='Dom'
                            checked={this.state.checkedDays[6]}
                            onPress={() => this.updateCheckBox(6)}
                        />
                        <View>
                            {this.loading
                                ?
                                <View>
                                    <ActivityIndicator
                                        animating={true}
                                        style={styles.indicator}
                                        size="large"
                                    />
                                </View>
                                :

                                this.state.editAlarmMode
                                    ?
                                    <View style={{flexDirection: 'row'}}>
                                        <RkButton
                                            style={styles.buttonDanger}
                                            onPress={() => this.removeAlarm()}>
                                            Remover
                                        </RkButton>
                                        <RkButton
                                            style={styles.button}
                                            onPress={() => this.updateAlarm()}>
                                            Atualizar
                                        </RkButton>
                                    </View>
                                    :
                                    <RkButton
                                        style={styles.button}
                                        onPress={() => this.createAlarm()}>
                                        Adicionar
                                    </RkButton>

                            }
                        </View>
                    </Modal>
                </View>
            );
        }
    }

    removeAlarm() {
        let alarmId = this.state.selected._id;

        fetch(BASE_URL + 'alarms?userid=' + this.state.userId + '&medid=' + this.state.item._id + '&alarmid=' + alarmId,
            {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(responseJson => {
                this.carregaDados();

                if (responseJson.status === "Deleted") {
                    showMessage({
                        message: "Medicamento removido",
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Erro",
                        type: "error",
                    });
                }
            })
            .catch(error => console.error(error))
            .finally(this.refs.modal1.close())
    }

    updateAlarm() {
        let alarmId = this.state.selected._id;

        let horas = [this.state.selectedHours + ':' + this.state.selectedMinutes];
        let dias = [];

        this.state.checkedDays.forEach((day, index) => {
            if (day) {
                dias.push(index + 1);
            }
        });

        fetch(BASE_URL + 'alarms?userid=' + this.state.userId + '&medid=' + this.state.item._id + '&alarmid=' + alarmId,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alarm: {
                        dias,
                        horas
                    }
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.alarmes = responseJson.data[0].alarmes;
                this.carregaDados();

                if (responseJson.status === "Updated") {
                    showMessage({
                        message: "Lembrete atualizado com sucesso",
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Erro",
                        type: "error",
                    });
                }
            })
            .catch(error => console.error(error))
            .finally(this.refs.modal1.close())
    }

    createAlarm() {
        let horas = [this.state.selectedHours + ':' + this.state.selectedMinutes];
        let dias = [];

        this.state.checkedDays.forEach((day, index) => {
           if (day) {
               dias.push(index + 1);
           }
        });

        fetch(BASE_URL + 'alarms?userid=' + this.state.userId + '&medid=' + this.state.item._id,
            {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                alarm: {
                    dias,
                    horas
                }
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.alarmes = responseJson.data[0].alarmes;
                if (responseJson.status === "Inserted") {
                    showMessage({
                        message: "Lembrete adicionado com sucesso",
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Erro ao adicionar lembrete",
                        type: "error",
                    });
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                this.refs.modal1.close();
                this.carregaDados();
            });
    }

    removeMedicine() {
        fetch(BASE_URL + 'medicines?userid=' + this.state.userId + '&medid=' + this.state.item._id,
            {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === "Deleted") {
                    showMessage({
                        message: "Medicamento removido",
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Erro",
                        type: "error",
                    });
                }
            })
            .catch(error => console.error(error))
            .finally(this.props.navigation.goBack(null))
    }

    updateMedicine() {
        this.setState({ loading: true });
        console.log('alarmes: ', this.alarmes)
        fetch(BASE_URL + 'medicines?userid=' + this.state.userId + '&medid=' + this.state.item._id,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    medicine: {
                        nome: this.nome,
                        composicao: this.composicao,
                        dosagem: this.dosagem,
                        pilulas: {
                            quantidadeInicial: Number(this.qtdInicial)
                        },
                        alarmes: this.alarmes,
                        slot: this.slot
                    }
                }),
            })
            .then((response) => {
                response.json()
            })
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch(error => console.error(error))
            .finally(() => {
                this.setState({ loading: true });
                this.props.navigation.goBack(null);
            })
    }

    createMedicine() {
        fetch(BASE_URL + 'medicines?userid=' + this.state.userId,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    medicine: {
                        nome: this.nome,
                        composicao: this.composicao,
                        dosagem: this.dosagem,
                        pilulas: {
                            quantidadeInicial: Number(this.qtdInicial)
                        },
                        slot: Number(this.slot)
                    }
                }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.status === "Inserted") {
                    showMessage({
                        message: "Medicamento cadastrado com sucesso",
                        type: "success",
                    });
                } else {
                    showMessage({
                        message: "Erro ao cadastrar medicamento",
                        type: "error",
                    });
                }
            })
            .catch(error => console.error(error))
            .finally(this.props.navigation.goBack(null))
    }

    updateCheckBox(index) {
        let array = this.state.checkedDays;
        let value = !this.state.checkedDays[index];

        array[index] = value;

        this.setState({checkedDays: array});
    }

    alarmList() {
        return this.state.medicine ? this.state.medicine.alarmes : [];
    }

    openAlarmModal(editMode) {
        this.setState({editAlarmMode: editMode},
            () => {
                if (editMode) {
                    this.setState({
                            alarmModalTitle: 'Editar lembrete para ' + this.state.medicine.nome
                        },
                        () => this.refs.modal1.open());
                } else {
                    this.setState({
                            checkedDays: [0, 0, 0, 0, 0, 0, 0],
                            selectedHours: 0,
                            selectedMinutes: 0,
                            alarmModalTitle: 'Novo lembrete para ' + this.state.medicine.nome
                        },
                        () => this.refs.modal1.open());
                }
            });
    }


    getDays(days) {
        let strDays = '';
        for (let i = 0; i < days.length; i++) {
            strDays += daysOfWeek[days[i] - 1] + ', ';
        }
        strDays = strDays.substring(0, (strDays.length - 2));
        if (days.length === daysOfWeek.length) {
            strDays = 'Todos os dias'
        }
        return strDays
    }

}