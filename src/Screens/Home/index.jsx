import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, ActivityIndicator, Animated } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn'
import Title from '../../Components/Title';
import ProductSlider from '../../Components/ProductSlider';
import CollectionSlider from '../../Components/CollectionSlider';
import { useStore } from '../../Store';
import { fakeCollections, FakeProducts } from '../../constants';
import HeadBar from '../../Components/HeadBar';

const { width, height } = Dimensions.get('screen')

function HomeScreen({ navigation }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  const [newArrival, setNewArrival] = useState([])
  const [collection, setCollection] = useState([])


  const slideCards = React.useRef(new Animated.Value(-160)).current;

  const setSlideCards = (value) => {
    Animated.timing(slideCards, {
        toValue: value,
        duration: 300,
        useNativeDriver:false
    }).start();
  };

  const setRoute = useStore(state=>state.setRoute)

  useEffect(()=>{
    setTimeout(() => {
      setNewArrival(FakeProducts['newarrival'])
      setSlideCards(0)
      setTimeout(() => {
        setCollection(fakeCollections)
      }, 300);
    }, 500);
    const unsubscribe = navigation.addListener('focus', () => {
      setRoute('Home')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <HeadBar/>

      <ScrollView style={tailwind('pt-2')} showsVerticalScrollIndicator={false}>
        
          <Title text="New Arrival" onPress={()=>navigate('Products',{title:'New Arrival'})}/>
          {
            !newArrival.length
            ? 
            <ActivityIndicator size={32} color={colors.primary} style={tailwind('items-center h-72 justify-center')}/>
            : 
            <Animated.View style={[tailwind('w-full relative'),{right:slideCards}]}>
              <ProductSlider products={newArrival}/>
            </Animated.View>
          }

            <View style={tailwind('h-4')}/>
          
          <Title text="Collections" seeAll={false}/>
          {
            !collection.length
            ? <ActivityIndicator size={32} color={colors.primary} style={tailwind('items-center h-40 justify-center')}/>
            : <CollectionSlider products={collection}/>
          }

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
    
  }
})

export default HomeScreen
