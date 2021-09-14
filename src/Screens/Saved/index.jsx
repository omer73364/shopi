import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';

const { width, height } = Dimensions.get('screen')

function SavedScreen({ navigation }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  return (
    <View style={styles.screen}>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}} showsVerticalScrollIndicator={false}>
        
        <Text onPress={()=>navigate('Home')} style={{textAlign:'center'}}>saved</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    width, 
    height,
    backgroundColor:colors.secondary,
    alignItems: 'center',
    paddingTop:Constants.statusBarHeight,
    
  }
})

export default SavedScreen
