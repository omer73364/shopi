
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Image, Pressable, KeyboardAvoidingView } from 'react-native';
import tailwind from 'tailwind-rn';
import Constants from 'expo-constants';
import HeadBar from '../../Components/HeadBar';
import { useStore } from '../../Store';
import colors from '../../styles/Colors';
import { height, width } from '../../styles/Styles';
import profileImage from '../../assets/imgs/profile.jpg'
import Text from '../../Components/Text';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Input from '../../Components/Input';

const SettingItem = ({ label, value }) => (
    <View style={tailwind('w-full h-20 bg-white rounded-lg mt-2')}>
        <Pressable style={tailwind('flex-1 p-4')} android_ripple={{color:colors.gray+'4f',borderless:true}}>
            <Text text={label} style={[tailwind('text-left text-sm'),{color:colors.gray}]}/>
            <View style={tailwind('flex-row w-full pt-1')}>
                <Text text={value} style={[tailwind('flex-1 text-left text-base'),{color:colors.black}]}/>
                <Entypo name="chevron-right" size={18} color={colors.gray}/>
            </View>
        </Pressable>
    </View>
)


const ChangeSettingScreen = ({ navigation, route }) => {

  const setRoute = useStore(state=>state.setRoute)
  const Toast = useStore(state=>state.Toast)
  const screen = route.params?.screen

  const [text,setText] = useState('')
  const saveChanges = () => Toast('Need backend integration to save!')

  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('ChangeSetting')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <HeadBar back noCart/>

      <KeyboardAvoidingView behavior="padding" style={tailwind('flex-1 w-full px-6 py-4')}>

          <Text text={`Change your ${screen}`} style={[tailwind('text-left'),{color:colors.gray}]}/>

          <View style={[tailwind('w-full items-center justify-center mt-2')]}>
            <Input
              placeholder={`Enter your new ${screen}`}
              inputStyle={tailwind('rounded-lg px-4')}
              onSearch={(text)=>setText(text)}
              type={screen === 'email' ? 'email-address' : null}
              hidden={screen === 'password'}
            />
          </View>
          {/* <SettingItem label="Full Name" value="Omer Anwar Omer"/> */}

          <View style={tailwind('flex-1 items-center justify-end')}>
            <View style={[tailwind('h-10 rounded-lg mt-4 mb-4 items-center self-center justify-center'),{backgroundColor:colors.primary,elevation:0.6,width:width-32}]}>
                <Pressable onPress={saveChanges} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
                    <Text text="Save Changes" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
                </Pressable>
            </View>
          </View>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    width, 
    height,
    backgroundColor:colors.secondary,
    alignItems: 'center',
    paddingTop:Constants.statusBarHeight+18,
  }
})

export default ChangeSettingScreen