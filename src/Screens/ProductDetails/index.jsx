import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Pressable, Image, Animated, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn'
import { Entypo, Ionicons } from '@expo/vector-icons';
import IconButton from '../../Components/IconButton';
import { useStore } from '../../Store';
import Text from '../../Components/Text';

const { width, height } = Dimensions.get('screen')

function ProductDetailsScreen({ navigation, route }) {

  const navigate = (route,params) => {
    navigation.navigate(route,params)
  }

  const sizePosition = React.useRef(new Animated.Value(0)).current;

  const setSizePosition = (value) => {
        Animated.timing(sizePosition, {
            toValue: value,
            duration: 400,
            useNativeDriver:false
        }).start();
    };

  const setRoute = useStore(state=>state.setRoute)
  const Toast = useStore(state=>state.Toast)

  const [color,setColor] = useState('')
  const [size,setSize] = useState('S')
  const [loading,setLoading] = useState(true)
  const [product,setProduct] = useState({})

  const selectSize = (size,index) => {
    setSize(size)
    setSizePosition(index*48)
  }

  const addToCart = () => {
      if((color && size)){
        //   do
      }
      else {
        Toast('Select color and size')
      }
  }

  const allColors = ['#000','#080','#055']
  const allSizes = ['S','M','L','XL']

  const renderColor = ({item}) => (
    <IconButton onPress={()=>setColor(item)} style={tailwind('p-1 w-10 h-10')}>
        <View style={[tailwind(`w-full h-full p-1.5 rounded-full items-center flex-row`),{backgroundColor:item}]}>
            <View style={[tailwind(`w-full h-full rounded-full`),{backgroundColor:color === item ? item : '#fff'}]}/>  
        </View>
    </IconButton>
  )

  const renderSize = ({item,index}) => (
    <TouchableOpacity onPress={()=>selectSize(item,index)} key={item} style={[tailwind('w-12 h-12 rounded-full items-center justify-center')]}>
        <Text text={item} style={[styles.size,{color:size === item ? '#fff' : colors.black}]}/>
    </TouchableOpacity>
  )

  useEffect(()=>{
    setProduct(route.params.product)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
    const unsubscribe = navigation.addListener('focus', () => {
        setRoute('ProductDetails')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.screen}>

      <View style={tailwind('w-full flex-row px-4 pb-3 items-center justify-between')}>
        
        <IconButton onPress={()=>navigation.goBack()}>
          <Entypo name="chevron-left" size={18} color={colors.black}/>
        </IconButton>
      
        {/* <Text>Shopi</Text> */}

        <IconButton>
          <Ionicons name="ios-cart" size={18} color={colors.black}/>
        </IconButton>
      
      </View>

      <View style={{flex:1,width:'100%',alignItems:'stretch',paddingHorizontal:16}}>
          <Text text={product.name} style={{fontSize:22,fontWeight:'bold',color:colors.black,textAlign:'center'}}/>
          <Text text="Sweater" style={{fontSize:14,color:colors.gray,textAlign:'center',marginTop:10}}/>

          <View style={tailwind('flex-1 mt-2 p-2')}>
            
            <View style={tailwind('flex-1 flex-row p-2')}>
            
                <View style={tailwind('flex-1 items-center justify-center')}>
                    <Image source={product.img} resizeMode="contain" style={tailwind('flex-1 self-stretch rounded')}/>
                </View>
                
                <View style={tailwind('w-16 items-center justify-center')}>
                    <View style={[tailwind('w-12 relative rounded-full bg-white items-center'),{elevation:0.2}]}>
                        {
                            allSizes.map((item,index)=>(
                                renderSize({item,index})
                            ))
                        }
                        <Animated.View style={[tailwind('absolute w-12 h-12 rounded-full'),{backgroundColor:colors.primary,zIndex:-1,top:sizePosition}]}/>
                    </View>
                </View>
            
            </View>

            <View style={tailwind('w-10/12 h-16 mt-2 items-center self-center flex-row')}>
                <FlatList
                    data={allColors}
                    keyExtractor={i=>i}
                    horizontal
                    contentContainerStyle={tailwind('justify-center w-full items-center')}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    ItemSeparatorComponent={()=><View style={tailwind('w-3')}/>}
                    renderItem={renderColor} 
                />
            </View>

          </View>

          <View style={tailwind('w-full h-16 mt-2 mb-4 p-2 items-center flex-row')}>
            <View style={tailwind('w-32')}>
                <Text text="Price" style={{fontSize:14,fontWeight:'bold',color:colors.gray,textAlign:'left'}}/>
                <Text text={`$${product.price}`} style={{fontSize:16,fontWeight:'bold',color:colors.black,textAlign:'left'}}/>
            </View>
            <View style={[tailwind('flex-1 rounded-lg items-center justify-center'),{backgroundColor:(color && size) ? colors.primary : colors.gray,elevation:0.6}]}>
                <Pressable onPress={addToCart} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
                    <Ionicons name="ios-cart" size={20} color='#fff'/>
                    <Text text="Add to cart" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
                </Pressable>
            </View>
          </View>

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
    paddingTop:Constants.statusBarHeight+18,
    
  },
  size:{
    fontSize:16,
    fontWeight:'bold',
    // color:colors.black,
    textAlign:'center',
    flex:1,
    textAlignVertical:'center'
}
})

export default ProductDetailsScreen
