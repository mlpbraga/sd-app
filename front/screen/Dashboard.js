import React from 'react'
import {Text, View} from "react-native";
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import Icon from '@expo/vector-icons/Ionicons';
import styles from "../resources/styles";
import FeedStack from "./Feed";
import ProfileStack from "./Profile";
import SettingsStack from "./Settings";

class DashboardScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>DashBoardScreen</Text>
            </View>
        );
    }
}

const DashboardTabNavigator = createStackNavigator({
    FeedStack,
    ProfileStack,
    SettingsStack
},{
    navigationOptions:({navigation})=>{
        const {routeName} = navigation.state.routes[navigation.state.index]
        return{
            header: null,
            headerTitle: routeName
        }
    }
});

const DashboardStackNavigator = createStackNavigator({
    FeedStack: FeedStack,
    ProfileStack: ProfileStack,
    SettingsStack: SettingsStack
},{
    defaultNavigationOptions:({navigation})=>{
        const {routeName} = navigation.state.routes[navigation.state.index];
        return{
            header: null,
            headerTitle: routeName,
            headerLeft: <Icon name="md-menu" size={30} style={{paddingLeft: 10}}
                              onPress={() => navigation.openDrawer()}/>
        }
    }
});

export default DashboardStackNavigator;