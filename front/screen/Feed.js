import React from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Medicine from './Medicine'
import Icon from '@expo/vector-icons/Ionicons';
import styles from '../resources/styles'
import { RkButton, RkText } from "react-native-ui-kitten";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faCapsules, faClock, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modalbox";
import FlashMessage, { showMessage } from "react-native-flash-message";

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

const BASE_URL = 'http://ec2-18-191-184-225.us-east-2.compute.amazonaws.com:4513/api/';

class Feed extends React.Component{
    static navigationOptions = {
        title: 'Minhas Medicações'
    };

    subs = undefined;

    constructor(props) {
        super(props);
        this.state = {
            userId: props.navigation.getParam('userId', ''),
            loading: true,
            medicines: [],
            selected: ''
        };
    }

    componentWillMount() {
        this.subs = this.props.navigation.addListener("didFocus", () => {
            this.getMedicines()
        });
    }

    componentWillUnmount() {
        this.subs.remove();
    }

    getMedicines() {
        fetch(BASE_URL + 'medicines?userid=' + this.state.userId,
            { method: 'GET' })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({medicines: responseJson});
                // showMessage({
                //     message: "Simple message",
                //     type: "info",
                // });
            })
            .catch((error) => console.log(error))
            .finally(this.setState({loading: false}))
    }

    openMedicine = (item) => {
        this.refs.modal1.close();
        this.props.navigation.navigate('Medicine', {
            userId: this.state.userId,
            item: item
        })
    };

    selecionaItem = (item) => {
        this.setState(
            {selected: item},
            () => this.refs.modal1.open()
            );
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.itemList}
                    onPress={() => this.selecionaItem(item)}
                >
                    <FontAwesomeIcon
                        icon={ faCapsules }
                        style={styles.icon}
                        transform={{ rotate: -90 }}
                        size={30}/>
                    <View style={styles.textItem}>
                        <Text style={styles.listItemName}>
                            {item.nome}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    renderAlarmItem = ({ item }) => {
        return (
            <View>
                <View
                    style={styles.itemListSm}
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
                </View>

            </View>
        )
    };

    render() {
        const { loading, medicines } = this.state;

        if (loading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            )
        } else {
            if (medicines.length > 0) {
                return (
                    <View style={{flex: 1}}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={medicines}
                            renderItem={this.renderItem}
                        />

                        {this.displayModal()}

                        <View>
                            <FlashMessage
                                ref="message"
                                position="bottom"/>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View>
                        <View style={styles.blockCenter}>
                            <Text style={{fontStyle: 'italic'}}>
                                Você não possui medicamentos cadastrados
                            </Text>
                        </View>
                    </View>
                )
            }

        }
    }


    displayModal() {
        if (this.state.selected) {
            return (
                <Modal
                    style={styles.modal}
                    ref={'modal1'}
                    position={'center'}
                    backButtonClose={true}
                    swipeToClose={this.state.swipeToClose}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}
                    onClosingState={this.onClosingState}>
                    <View style={styles.text}>
                        <Text style={{fontSize: 20, marginVertical: 10}}>
                            {this.state.selected.nome}
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <View style={{flexDirection: 'row', paddingVertical: 10}}>
                            <RkText style={styles.text}>
                                Lembretes
                            </RkText>
                        </View>
                        {this.state.selected.alarmes.length === 0
                            ?
                            <View style={styles.blockCenter}>
                                <Text style={{fontStyle: 'italic'}}>
                                    Você não possui alarmes definidos
                                </Text>
                            </View>
                            :
                            <View/>
                        }
                        <FlatList
                            style={{alignSelf: 'stretch', marginHorizontal: 5}}
                            keyExtractor={this.keyExtractor}
                            data={this.state.selected.alarmes}
                            renderItem={this.renderAlarmItem}
                        />
                    </View>

                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                        <RkText style={{marginLeft: 20}}>
                            Pílulas restantes:
                        </RkText>
                        <RkText style={{marginLeft: 'auto', marginRight: 20}}>
                            {this.state.selected.pilulas.restantes}
                        </RkText>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                        <RkText style={{marginLeft: 20}}>
                            Pílulas tomadas no horário definido:
                        </RkText>
                        <RkText style={{marginLeft: 'auto', marginRight: 20}}>
                            {this.state.selected.pilulas.horarioCerto}
                        </RkText>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                        <RkText style={{marginLeft: 20}}>
                            Pílulas tomadas fora do horário definido:
                        </RkText>
                        <RkText style={{marginLeft: 'auto', marginRight: 20}}>
                            {this.state.selected.pilulas.horarioErrado}
                        </RkText>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                        <RkText style={{marginLeft: 20}}>
                            Pílulas esquecidas:
                        </RkText>
                        <RkText style={{marginLeft: 'auto', marginRight: 20}}>
                            {this.state.selected.pilulas.esquecidas}
                        </RkText>
                    </View>

                    <RkButton
                        style={styles.button}
                        onPress={() => this.openMedicine(this.state.selected)}>
                        Editar
                    </RkButton>
                </Modal>
            )
        }
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

const FeedStack = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions:({navigation})=>{
            return{
                headerTitle: 'Minhas Medicações',
                headerLeft: <Icon name="md-menu" size={30} style={{paddingLeft: 15, color: '#FFF'}}
                                  onPress={() => navigation.openDrawer()}/>,
                headerRight: <Icon name="md-add" size={30} style={{paddingRight: 15, color: '#FFF'}}
                                   onPress={() => navigation.navigate('Medicine', {item:undefined, userId: navigation.getParam('userId', '')})}/>,
            }
        }
    },
    Medicine: {
        screen: Medicine
    }
},{
    defaultNavigationOptions: {
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: '#2ECC71'
        },
        headerTintColor: '#FFF'
    }
});

export default FeedStack
