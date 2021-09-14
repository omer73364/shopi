import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import MyTabBar from '../Components/TabBar';
import SavedScreen from '../Screens/Saved';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={({ route }) => ({
            header:()=>null,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Cart" component={HomeScreen}/>
        <Tab.Screen name="Saved" component={SavedScreen}/>
        <Tab.Screen name="Profile" component={HomeScreen}/>
        <Tab.Screen name="sd" component={SavedScreen}/>
        <Tab.Screen name="ds" component={SavedScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}