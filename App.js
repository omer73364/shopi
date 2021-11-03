import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { I18nManager, AsyncStorage, } from 'react-native';
import Navigation from './src/Navigation'
import AppLoading from 'expo-app-loading';
import colors from './src/styles/Colors';
import { useStore } from './src/Store';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function App() {

  const [loading,setLoading] = useState(false)
  const [onboardDone,setOnboardDone] = React.useState(null)

  const loggedUser = useStore(state=>state.loggedUser)
  const setLoggedUser = useStore(state=>state.setLoggedUser)
  const refresh = useStore(state=>state.refresh)

  React.useEffect(()=>{
    setLoading(true)
    AsyncStorage.getItem('onboardDone').then(res=>{
      setOnboardDone(res)
      AsyncStorage.getItem('loggedUser').then(user=>{
        setLoggedUser(JSON.parse(user))
      })
      .finally(()=>{
        setTimeout(() => {
          setLoading(false)
        }, 400);
      })
    })
  },[refresh])

  // AsyncStorage.removeItem('onboardDone')
  // AsyncStorage.removeItem('loggedUser')

  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.secondary}/>
      {
        (loading) ? <AppLoading /> : <Navigation onboardDone={onboardDone} loggedUser={loggedUser}/>
      }
    </>
  );
}
