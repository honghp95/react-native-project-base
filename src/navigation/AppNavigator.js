/**
 * Created by Hong HP on 2/24/20.
 */
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import RouteKey from './RouteKey'
import {useSelector} from 'react-redux'
import LoginScreen from '../Components/AuthComponent/LoginScreen'
import SplashScreen from '../Components/SplashScreen'
import {navigationRef} from './NavigationService'
import HomeScreen from '../Components/HomeComponent/HomeScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import CustomTabBar from './CustomTabBar'
import AuthComponent from '../Components/AuthComponent'
import WebViewScreen from '../Components/WebViewScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const defaultStackConfig = {
  headerShown: false,
  lazy: true,
}

function AuthStackNavigation() {
  return (
    <Stack.Navigator screenOptions={defaultStackConfig}>
      <Stack.Screen name={RouteKey.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={RouteKey.SignUpScreen} component={AuthComponent.SignUpScreen} />
    </Stack.Navigator>
  )
}

function HomeStackNavigation() {
  return (
    <Stack.Navigator screenOptions={defaultStackConfig}>
      <Stack.Screen name={RouteKey.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  )
}

function MainTabNavigation() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={defaultStackConfig}>
      <Tab.Screen name={RouteKey.HomeScreen} component={HomeScreen} />
    </Tab.Navigator>
  )
}

function AccountStackNavigation() {
  return (
    <Stack.Navigator screenOptions={defaultStackConfig}>
      <Stack.Screen name={RouteKey.WebViewScreen} component={WebViewScreen} />
    </Stack.Navigator>
  )
}

function MainStackNavigation() {
  return (
    <Stack.Navigator screenOptions={defaultStackConfig}>
      <Stack.Screen name={RouteKey.MainTabNavigation} component={MainTabNavigation} />
      <Stack.Screen name={RouteKey.AccountStackNavigation} component={AccountStackNavigation} />
      <Stack.Screen name={RouteKey.HomeStackNavigation} component={HomeStackNavigation} />
      <Stack.Screen name={RouteKey.AuthStack} component={AuthStackNavigation} />
    </Stack.Navigator>
  )
}

function AppNavigation(props) {
  const appStack = useSelector(state => state.app.appStack)

  function renderStack() {
    switch (appStack) {
      case RouteKey.SplashScreen:
        return <SplashScreen />
      case RouteKey.MainStack:
        return <MainStackNavigation />
      case RouteKey.AuthStack:
        return <AuthStackNavigation />
      default:
        return <AuthStackNavigation />
    }
  }

  return <NavigationContainer ref={navigationRef}>{renderStack()}</NavigationContainer>
}

export default AppNavigation
