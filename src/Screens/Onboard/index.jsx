import React, { useCallback, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Image, Pressable, ActivityIndicator, Animated, ImageBackground, AsyncStorage } from 'react-native';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn';
import { useStore } from '../../Store';
import logo from '../../assets/icons/logo.png'
import photo1 from '../../assets/imgs/onboard1.jpg'
import photo2 from '../../assets/imgs/onboard3.jpg'
import photo3 from '../../assets/imgs/onboard2.jpg'
import Text from '../../Components/Text';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen')

var list = {};

function HomeScreen({ navigation }) {

  const setRefresh = useStore(state=>state.setRefresh)

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  const next = () => {
    if(visible === 3){
      AsyncStorage.setItem('onboardDone','true').then(()=>{
        navigate('Login')
        setRefresh()
      })
    }
    else{
      list({x:width*visible,y:0,animated:true})
    }
  }

  const slides = [
    {
      title:'Shopi',
      description:'Ea veniam exercitation eiusmod exercitation sunt exercitation commodo sit.',
      img: photo1,
    },
    {
      title:'Shopi 2',
      description:'Ea veniam exercitation eiusmod exercitation sunt exercitation commodo sit.',
      img: photo2,
    },
    {
      title:'Shopi 3',
      description:'Ea veniam exercitation eiusmod exercitation sunt exercitation commodo sit.',
      img: photo3,
    },
  ]

  const [visible,setVisible] = useState(1)

  const renderSlide = ({item}) => (
    <ImageBackground source={item.img} style={[tailwind('items-center justify-end'),{height,width}]}>

      <View style={[tailwind('absolute w-full h-full bg-opacity-20 top-0 left-0'),{backgroundColor:colors.primary+'1f'}]}/>
      {item.title === 'Shopi' && <Image source={logo} style={tailwind('h-28 w-28 absolute left-6 top-6')} resizeMode="contain"/>}
      <Text text={item.title} style={[tailwind('text-left w-full px-12 text-3xl font-bold'),{color:'#fff'}]}/>
      <Text text={item.description} style={tailwind('text-base text-left w-full px-12 text-white mt-2')}/>
      <View style={tailwind('h-24')}/>
    </ImageBackground>
  )
  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setVisible(viewableItems[0].index+1)
  }, []);

  const refTo = (e) => {
      list = e?.scrollTo
  }

  return (
    <View style={styles.screen}>

      <StatusBar backgroundColor='transparent'/>
      
      <FlatList
        data={slides}
        onLayout={e => !Object.keys(list)?.includes('scrollTo') ? refTo(e.currentTarget) : null} // to get scrollTo method and assign it to list variable
        renderItem={renderSlide}
        onViewableItemsChanged={_onViewableItemsChanged}
        keyExtractor={(_,i)=>i.toString()}
        pagingEnabled
        decelerationRate="fast"
        snapToStart
        horizontal
        legacyImplementation={false}
        showsHorizontalScrollIndicator={false}
      />

      {/* dots */}
      <View text={visible} style={tailwind('absolute bottom-4 bg-opacity-10 py-6 left-0 w-full flex-row items-center justify-center')}>
        {
          slides.map((_,index)=>
            <Pressable 
              onPress={()=>{list({x:width*index,y:0,animated:true})}}
              key={index}
              style={[
                tailwind('w-2.5 h-2.5 rounded-full mx-2'),
                {backgroundColor: visible === (index+1) ? colors.primary : colors.secondary}
              ]}
            />
          )
        }
      </View>
      
      {/* floating action button */}
      <Pressable 
        onPress={next} 
        text={visible} 
        style={[
          tailwind('absolute w-12 h-12 rounded-full bottom-6 right-6 items-center justify-center'),
          {backgroundColor:colors.primary}
        ]}
      >
        <AntDesign name={visible === 3 ? "check" : "arrowright"} color="#fff" size={20}/>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    width, 
    height,
    backgroundColor:colors.secondary,
    alignItems: 'center',
    
  }
})

export default HomeScreen
