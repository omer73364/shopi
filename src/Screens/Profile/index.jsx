import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Image, Pressable, TouchableOpacity, Animated, Linking } from 'react-native';
import tailwind from 'tailwind-rn';
import Constants from 'expo-constants';
import HeadBar from '../../Components/HeadBar';
import { useStore } from '../../Store';
import colors from '../../styles/Colors';
import { height, width } from '../../styles/Styles';
import profileImage from '../../assets/imgs/profile.jpg'
import myLogo from '../../assets/icons/mylogo.png'
import logo from '../../assets/icons/logo.png'
import Text from '../../Components/Text';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const SettingItem = ({ label, value, onPress = ()=>{} }) => (
    <View style={tailwind('w-full h-20 bg-white rounded-lg mt-2')}>
        <Pressable onPress={onPress} style={tailwind('flex-1 p-4')} android_ripple={{color:colors.gray+'4f',borderless:true}}>
            <Text text={label} style={[tailwind('text-left text-sm'),{color:colors.gray}]}/>
            <View style={tailwind('flex-row w-full pt-1')}>
                <Text text={value} style={[tailwind('flex-1 text-left text-base'),{color:colors.black}]}/>
                <Entypo name="chevron-right" size={18} color={colors.gray}/>
            </View>
        </Pressable>
    </View>
)


const ProfileScreen = ({ navigation }) => {

  const setRoute = useStore(state=>state.setRoute)
  const Toast = useStore(state=>state.Toast)

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImageOpacity = React.useRef(new Animated.Value(0)).current;

  const setPickImageOpacity = (value) => {
    Animated.timing(pickImageOpacity, {
        toValue: value,
        duration: 250,
        useNativeDriver:false
    }).start();
  };


  const changeSetting = (setting) => {
    navigation.navigate('ChangeSetting',{screen:setting})
  }


  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
        setLoading(true)
        setTimeout(() => {
          setPickImageOpacity(0)
          setTimeout(() => {
            setLoading(false)
          }, 250);
          setImage(null)
          Toast('Need backend to update profile!')
        }, 1000);
    }

    else{
      setPickImageOpacity(0)
    }

  }

  const imagePickerPressed = () => {
    setPickImageOpacity(1)
    setTimeout(() => {
      pickImage()
    }, 250);
  }

  const openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Toast("Can't open the URL!");
      }
    });
  }
    
  useEffect(()=>{

    // get permission
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
          return
        }
      }
    })()

    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('Profile')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <HeadBar back noCart logout/>

      <ScrollView showsVerticalScrollIndicator={false} style={tailwind('flex-1 w-full px-6')}>

        <TouchableOpacity
          style={styles.imgContainer}
          activeOpacity={1}
          onPress={imagePickerPressed}
          onPressIn={()=>setPickImageOpacity(1)}
          onPressOut={()=>setPickImageOpacity(0)}
        >
          <>
            <Image 
              style={tailwind('w-full h-full absolute')}
              source={
                image ? {uri:image} : profileImage
              }
              resizeMode="cover"
            />

            <Animated.View style={[tailwind('w-full h-full relative'),{opacity:pickImageOpacity}]}>
              <View style={tailwind('absolute top-0 left-0 w-full h-full items-center justify-center bg-black opacity-20')}/>
              <View style={tailwind('absolute top-0 left-0 w-full h-full items-center justify-center')}>
                {loading ? <ActivityIndicator size={28} color="#fff"/> : <Entypo name="camera" size={24} color="#fff" />}
              </View>
            </Animated.View>
          </>
        </TouchableOpacity>

        <SettingItem label="Full Name" value="Omer Anwar Omer" onPress={()=>changeSetting('name')}/>
        <SettingItem label="Email" value="omer@omer.com" onPress={()=>changeSetting('email')}/>
        <SettingItem label="Password" value="⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁" onPress={()=>changeSetting('password')}/>

        {/* <View style={tailwind('h-16')}/> */}
        
        <View style={tailwind('w-full bg-white rounded-lg mt-2')}>
          <Pressable onPress={()=>{}} style={tailwind('flex-1 p-4')}>
            
            <Text text={'About Shopi app'} style={[tailwind('text-left text-sm'),{color:colors.gray}]}/>
            
            <View style={tailwind('w-full items-center')}>
              
              {/* App */}
              <Image 
                style={tailwind('w-16 h-16 my-4')}
                source={logo}
                resizeMode="contain"
              />
              <Text text={'Shopi is an open source e-commerce app developed for practicing purpose using React Native, the UI is based on some shots from'} style={[tailwind('text-center px-2 text-sm'),{color:colors.black}]}>
                <Text onPress={()=>openLink('https://dribbble.com/shots/15960381-Clothing-E-commerce-App')} text={'dribbble'} style={[tailwind('text-center px-2 text-sm'),{color:colors.primary}]}/>
              </Text>
              
              <Text text={'\n_______________\n\n developed with love by:'} style={[tailwind('text-center px-2 text-sm'),{color:colors.black}]}/>
              
              {/* Developer */}
              <Image
                style={tailwind('w-24 h-24')}
                source={myLogo}
                resizeMode="contain"
              />
              
              <Text text={'OMER ANWAR'} style={[tailwind('text-center text-sm'),{color:colors.black}]}/>
            
            </View>
            
            {/* Links */}
            <View style={tailwind('flex-row w-full mt-7 mb-4 items-center justify-around')}>
            
              <TouchableOpacity onPress={()=>openLink('mailto:anwar733649039@gmail.com')}>
                <Ionicons name="ios-mail" size={20} color={colors.gray} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=>openLink('https://t.me/omer73364')}>
                <Entypo name="paper-plane" size={20} color={colors.gray} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=>openLink('https://linkedin.com/in/omer73364')}>
                <Ionicons name="ios-logo-linkedin" size={20} color={colors.gray} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=>openLink('https://github.com/omer73364')}>
                <Ionicons name="ios-logo-github" size={20} color={colors.gray} />
              </TouchableOpacity>
            
            </View>

          </Pressable>
        </View>

        <View style={tailwind('h-20')}/>


      </ScrollView>

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
  },
  imgContainer:{
    width:150,
    height:150,
    alignSelf:'center',
    marginTop:24,
    marginBottom:24,
    borderRadius:150,
    overflow:'hidden'
  }
})

export default ProfileScreen