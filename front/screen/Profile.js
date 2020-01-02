import React from 'react';
import {Button, View} from "react-native";
import styles from "../resources/styles";
import Detail from './Detail'
import Icon from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation';

class Profile extends React.Component{
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

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions:({navigation})=>{
            return{
                headerTitle: 'Profile',
                headerLeft: <Icon name="md-menu" size={30} style={{paddingLeft: 10}}
                                  onPress={() => navigation.openDrawer()}/>
            }
        }
    }
});

export default ProfileStack;