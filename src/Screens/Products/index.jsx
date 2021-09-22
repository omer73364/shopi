import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import IconButton from '../../Components/IconButton';
import tailwind from 'tailwind-rn';
import { Ionicons } from '@expo/vector-icons';
import ProductSlider from '../../Components/ProductSlider';
import { useStore } from '../../Store';

const { width, height } = Dimensions.get('screen')

function ProductsScreen({ navigation, route }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  const setRoute = useStore(state=>state.setRoute)

  const [products,setProducts] = useState([
    {
      id:'0',
      name: 'Name 1',
      img: require('../../assets/imgs/3.jpg'),
      price: "12",
      saved: true
    },
    {
      id:'1',
      name: 'Name 2',
      img: require('../../assets/imgs/4.jpg'),
      price: "20",
      saved: true
    },
    {
      id:'2',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
      price: "39",
      saved: true
    },
    {
      id:'3',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "440",
      saved: true
    },
    {
      id:'4',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "20",
      saved: true
    },
    {
      id:'5',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
      price: "39",
      saved: true
    },
    {
      id:'6',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "440",
      saved: true
    },
    {
      id:'7',
      name: 'Name 2',
      img: require('../../assets/imgs/4.jpg'),
      price: "20",
      saved: true
    },
    {
      id:'8',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
      price: "39",
      saved: true
    },
    {
      id:'9',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "440",
      saved: true
    },
    {
      id:'10',
      name: 'Name 2',
      img: require('../../assets/imgs/4.jpg'),
      price: "20",
      saved: true
    },
    {
      id:'11',
      name: 'Name 3',
      img: require('../../assets/imgs/3.jpg'),
      price: "39",
      saved: true
    },
    {
      id:'12',
      name: 'Name 4',
      img: require('../../assets/imgs/4.jpg'),
      price: "440",
      saved: true
    },
  ])

  const [loading,setLoading] = useState(true)
  
  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('Products')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation,route.params.title])

  return (
    <View style={styles.screen}>

      <View style={[tailwind('w-full flex-row px-4 border-b pb-3 items-center justify-between'),{borderColor: colors.gray+'4f'}]}>
        
        <IconButton>
          <Ionicons name="ios-menu" size={18} color={colors.black}/>
        </IconButton>
      
        {/* <Text>Shopi</Text> */}

        <IconButton>
          <Ionicons name="ios-search" size={18} color={colors.black}/>
        </IconButton>
      
      </View>
    
      {
        loading ?
        <ActivityIndicator size={32} color={colors.primary} style={[tailwind('items-center justify-center'),{height:height-200}]}/>
        :
        <ProductSlider title={route.params.title} products={products} vertical/>
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

export default ProductsScreen
