import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import Input from '../../Components/Input';
import tailwind from 'tailwind-rn';
import ProductSlider from '../../Components/ProductSlider';
import { useStore } from '../../Store';
import { FakeProducts } from '../../constants';
import HeadBar from '../../Components/HeadBar';
import { Ionicons } from '@expo/vector-icons';
import Text from '../../Components/Text';

const { width, height } = Dimensions.get('screen')

function ProductsScreen({ navigation, route }) {

  const SavedProducts = useStore(state=>state.savedData)
  const setRoute = useStore(state=>state.setRoute)

  const Toast = useStore(state=>state.Toast)

  const [products,setProducts] = useState([])

  const [loading,setLoading] = useState(false)
  
  const getProducts = () => {
    
    setProducts(route.params.title === 'Saved' ? SavedProducts : FakeProducts[route.params.title.replace(' ','').toLowerCase()])
    
    if(route.params.title !== 'Saved'){
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 600);
    }
    
  }
  useEffect(()=>{
    if(!route.params.search)
      getProducts()
      
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('Products')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation,route.params.title,SavedProducts])

  return (
    <View style={styles.screen}>

      <HeadBar noBorder={route.params.search} back/>

      {
        route.params.search ?
        <View style={[tailwind('w-full px-4 items-center justify-center mt-2'),{borderColor:colors.gray+'4f',borderBottomWidth:0.2}]}>
          <Input
            placeholder="Find what you want"
            search={true}
            inputStyle={tailwind('rounded-lg px-4')}
            onSearch={(text)=>Toast(`Need backend to search for ${text}`)} 
          />
        </View> : null
      }
    
      {
        loading ?
        <ActivityIndicator size={32} color={colors.primary} style={[tailwind('items-center justify-center'),{height:height-200}]}/>
        :
        products.length ?
          <ProductSlider title={route.params.title} showTabBar={route.params.showTabBar}  products={products} vertical/> 
        : 
        route.params.search ?
          <View style={[tailwind('w-full flex-1 pb-32 mt-12 items-center justify-center')]}>
            <Ionicons name="ios-search-outline" size={72} color={colors.gray+'4f'}/>
            <Text text="Search for something.." style={{color:colors.gray+'4f',fontSize:20,marginTop:20}}/>
          </View>
        : 
          <View style={[tailwind('w-full flex-1 pb-32 mt-12 items-center justify-center')]}>
            <Ionicons name={route.params.title === 'Saved' ? "ios-heart-dislike" : 'ios-shirt'} size={72} color={colors.gray+'4f'}/>
            <Text text="No Items" style={{color:colors.gray+'4f',fontSize:20,marginTop:20}}/>
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

export default ProductsScreen
