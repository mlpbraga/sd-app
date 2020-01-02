import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
import Welcome from './screen/Welcome'
import DashboardStackNavigator from './screen/Dashboard'
import SignUp from "./screen/SignUp";
import FlashMessage from "react-native-flash-message";

class App extends React.Component{
  render() {
    return (
        <AppContainer>
          <FlashMessage position="bottom" />
        </AppContainer>
          )
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: Welcome},
  SignUp: {screen: SignUp},
  Dashboard: {screen: AppDrawerNavigator}
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;

