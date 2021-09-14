import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, I18nManager, } from 'react-native';
import Navigation from './src/Navigation'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import colors from './src/styles/Colors';
import { useStore } from './src/Store';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function App() {

  const route = useStore(state=>state.routeName)

  const fontsLoaded = true

  // let [fontsLoaded] = useFonts({
  //   'regular': require('./src/assets/fonts/'),
  //   'italic': require('./src/assets/fonts/Montserrat-Italic.ttf'),
  //   'bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
  //   'MontserratSemiBold': require('./src/assets/fonts/Montserrat-SemiBold.ttf'),
  // });

  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.secondary}/>
      {
        (!fontsLoaded) ? <AppLoading /> : <Navigation/>
      }
    </>
  );
}
