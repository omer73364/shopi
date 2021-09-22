import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import MyTabBar from '../Components/TabBar';
import ProductsScreen from '../Screens/Products';
import ProductDetailsScreen from '../Screens/ProductDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header:()=>null
      })}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
            header:()=>null,
        })}
      >
        <Tab.Screen name="Home" component={MainStack}/>
        <Tab.Screen name="Cart" component={HomeScreen}/>
        <Tab.Screen name="Saved" component={ProductsScreen}/>
        <Tab.Screen name="Profile" component={HomeScreen}/>
        <Tab.Screen name="Products" component={ProductsScreen}/>
        {/* <Tab.Screen name="ProductDetails" component={ProductDetailsScreen}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}