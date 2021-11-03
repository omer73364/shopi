import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator, Image, Pressable, KeyboardAvoidingView, ScrollView, AsyncStorage } from 'react-native';
import colors from '../../styles/Colors';
import Input from '../../Components/Input';
import tailwind from 'tailwind-rn';
import { useStore } from '../../Store';
import Text from '../../Components/Text';
import logo from '../../assets/icons/logo.png'

const { width, height } = Dimensions.get('screen')

function LoginScreen({ navigation, route }) {

  const setRoute = useStore(state=>state.setRoute)
  const setRefresh = useStore(state=>state.setRefresh)
  const Toast = useStore(state=>state.Toast)

  const [username,setUsername] = useState('omer@omer.com')
  const [password,setPassword] = useState('12345678abcdef')
  const [loading,setLoading] = useState(false)

  const loginHandler = () => {
    const user = {
      username,
      password,
      name:'omer anwar omer'
    }

    AsyncStorage.setItem('loggedUser',JSON.stringify(user)).then(()=>{
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        Toast('Welcome Omer')
        setRefresh()
      }, 600);
    })
  }
  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('Login')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow:1,backgroundColor:colors.secondary}}>
      
      <View style={styles.screen}>
        
        <Image source={logo} style={tailwind('h-28 w-28')} resizeMode="contain"/>
        <Text text="Welcome to Shopi" style={{color:colors.black,fontSize:20,marginTop:16}}/>
          <Text text="login to your account" style={{color:colors.gray,fontSize:14,marginTop:12}}/>
        
        <View style={tailwind('mt-6')}>
  
          <Input
            placeholder="username or email"
            defaultValue={username}
            type="email-address"
            disabled
            inputStyle={{backgroundColor:colors.gray+'21'}}
          />
  
          <Input
            placeholder="password"
            defaultValue={password}
            hidden
            disabled
            inputStyle={{backgroundColor:colors.gray+'21'}}
          />

          <View style={[tailwind('h-10 rounded-lg items-center justify-center'),{backgroundColor:colors.primary,elevation:0.6}]}>
            <Pressable onPress={loginHandler} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
              {
                loading ?
                  <ActivityIndicator size={24} color={'#fff'}/>
                :
                  <Text text="Login" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
              }
            </Pressable>
          </View>
        </View>

        <View style={tailwind('flex-row items-center mt-3')}>
          <Text text="Doesn't have an account?" style={{color:colors.black,fontSize:14}}/>
          <Text onPress={()=>navigation.navigate('Signup')} text={"Signup"} style={{marginLeft:6,color:colors.primary,fontSize:14}}/>
        </View>
          
        <View style={tailwind('h-6')}/>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
    width, 
    // height,
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:colors.secondary,
    paddingHorizontal:24,
    paddingTop:100
  }
})

export default LoginScreen
