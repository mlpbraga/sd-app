import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Detail from './Detail'
import Icon from '@expo/vector-icons/Ionicons';
import styles from '../resources/styles'


class Settings extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Go To Detail Screen"
                    onPress={() => this.props.navigation.navigate('Detail')}
                />
            </View>
        );
    }
}

const SettingsStack = createStackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions:({navigation})=>{
            return{
                headerTitle: 'Settings',
                headerLeft: <Icon name="md-menu" size={30} style={{paddingLeft: 10}}
                                  onPress={() => navigation.openDrawer()}/>
            }
        }
    }
});

export default SettingsStack;