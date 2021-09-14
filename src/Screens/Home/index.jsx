import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn'
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../../Components/IconButton';

const { width, height } = Dimensions.get('screen')

function HomeScreen({ navigation }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  return (
    <View style={styles.screen}>

      <View style={tailwind('w-full flex-row px-4 items-center justify-between')}>
        
        <IconButton onPress={()=>navigate('sd')}>
          <Ionicons name="ios-menu" size={18} color={colors.black}/>
        </IconButton>
      
        <IconButton>
          <Ionicons name="ios-search" size={18} color={colors.black}/>
        </IconButton>
      
      </View>

      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
        

        
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
    
  }
})

export default HomeScreen
