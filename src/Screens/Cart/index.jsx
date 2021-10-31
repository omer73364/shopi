import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import Input from '../../Components/Input';
import tailwind from 'tailwind-rn';
import ProductSlider from '../../Components/ProductSlider';
import { useStore } from '../../Store';
import HeadBar from '../../Components/HeadBar';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../Components/Text';

const { width, height } = Dimensions.get('screen')

function CartScreen({ navigation, route }) {

  const setRoute = useStore(state=>state.setRoute)
  const cartData = useStore(state=>state.cartData)

  const [loading,setLoading] = useState(false)
  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('Cart')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <HeadBar noCart back/>

      {
        loading ?
        <ActivityIndicator size={32} color={colors.primary} style={[tailwind('items-center justify-center'),{height:height-200}]}/>
        :
        cartData.length ?
        <ProductSlider title={'Cart'} cart showTabBar={true} products={cartData} vertical/>
        :
        <View style={[tailwind('w-full flex-1 mt-12 pb-32 items-center justify-center')]}>
          <Ionicons name="ios-cart" size={72} color={colors.gray+'4f'}/>
          <Text text="Cart is empty" style={{color:colors.gray+'4f',fontSize:20,marginTop:16}}/>
        </View>
      }

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

export default CartScreen
