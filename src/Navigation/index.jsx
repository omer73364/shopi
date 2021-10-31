import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import ProfileScreen from '../Screens/Profile';
import MyTabBar from '../Components/TabBar';
import ProductsScreen from '../Screens/Products';
import ProductDetailsScreen from '../Screens/ProductDetails';
import CartScreen from '../Screens/Cart'
import ChangeSettingScreen from '../Screens/ChangeSetting';
import OnboardScreen from '../Screens/Onboard';
import LoginScreen from '../Screens/Login';
import SignupScreen from '../Screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const Nav = ({onboardDone,loggedUser}) => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header:()=>null
        })}
        initialRouteName={!onboardDone ? "Onboard" : loggedUser ? "HomeScreen" : "Login"}
      >
        {!onboardDone && <Stack.Screen name="Onboard" component={OnboardScreen}/>}
        {
          loggedUser ?
          <>
            <Stack.Screen name="HomeScreen" component={MainTabs}/>
            <Stack.Screen name="Products" component={ProductsScreen}/>
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/>
            <Stack.Screen name="ChangeSetting" component={ChangeSettingScreen}/>
          </> :
          <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}


function MainTabs() {
  return (
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
            header:()=>null,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={ProductsScreen}/>
        <Tab.Screen name="Saved" component={ProductsScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
  );
}

export default Nav