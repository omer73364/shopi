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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header:()=>null
        })}
      >
        <Stack.Screen name="HomeScreen" component={MainTabs}/>
        <Stack.Screen name="Products" component={ProductsScreen}/>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}/>
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
        <Tab.Screen name="Profile" component={HomeScreen}/>
      </Tab.Navigator>
  );
}

export default App