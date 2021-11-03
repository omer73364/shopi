import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Pressable, Image, Animated, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import colors from '../../styles/Colors';
import tailwind from 'tailwind-rn'
import { Entypo, Ionicons } from '@expo/vector-icons';
import IconButton from '../../Components/IconButton';
import { useStore } from '../../Store';
import Text from '../../Components/Text';
import HeadBar from '../../Components/HeadBar';

const { width, height } = Dimensions.get('screen')

function ProductDetailsScreen({ navigation, route }) {

  const sizePosition = React.useRef(new Animated.Value(-160)).current;
  const colorsPosition = React.useRef(new Animated.Value(-220)).current;
  const imgPosition = React.useRef(new Animated.Value(-300)).current;
  const imgSize = React.useRef(new Animated.Value(0.90)).current;
  const addPosition = React.useRef(new Animated.Value(-220)).current;

  const setSizePosition = (value) => {
    Animated.timing(sizePosition, {
        toValue: value,
        duration: 400,
        useNativeDriver:false
    }).start();
  };

  const setColorsPosition = (value) => {
    Animated.timing(colorsPosition, {
        toValue: value,
        duration: 600,
        useNativeDriver:false
    }).start();
  };

  const setImgPosition = (value) => {
    Animated.timing(imgPosition, {
        toValue: value,
        duration: 600,
        useNativeDriver:false
    }).start();
  };


  const setImgSize = (value) => {
    Animated.timing(imgSize, {
        toValue: value,
        duration: 400,
        useNativeDriver:false
    }).start();
  };

  const setAddPosition = (value) => {
    Animated.timing(addPosition, {
        toValue: value,
        duration: 400,
        useNativeDriver:false
    }).start();
  };

  const changeColor = newColor => {
    if(newColor === color)
      return
    setImgPosition(-300)
    setTimeout(() => {
      setColor(newColor)
      setImgPosition(0)
    }, 600);
  }

  const setNewInCart = useStore(state=>state.setNewInCart)
  const addToCartMethod = useStore(state=>state.addToCart)
  const setRoute = useStore(state=>state.setRoute)
  const Toast = useStore(state=>state.Toast)

  const [color,setColor] = useState('')
  const [size,setSize] = useState('S')
  const [loading,setLoading] = useState(true)
  const [product,setProduct] = useState({})
  const [quantity,setQuantity] = useState(1)

  const incrementQuantity = () => {
    if(quantity<5){
      setQuantity(quantity+1)
    }
    else{
      Toast('Max quantity to buy is 5 pieces')
    }
  }

  const decrementQuantity = () => {
    if(quantity>1){
      setQuantity(quantity-1)
    }
  }

  const selectSize = (size,index) => {
    const sizes = [0.90,0.95, 1, 1.05, 1.1]
    setSize(size)
    setSizePosition(index*48)
    setImgSize(sizes[index])
  }

  const addToCart = () => {
      if((color && size)){
        //   do
        Toast('Added to cart');
        setAddPosition(-220)
        addToCartMethod({
          product,
          color,
          size,
          quantity
        })
        setNewInCart(true)
      }
      else {
        Toast('Select color and size')
      }
  }

  const renderColor = ({item}) => (
    <IconButton onPress={()=>changeColor(item)} style={[tailwind('p-1 w-10 h-10'),{backgroundColor: color?.color.includes('#fff') ? colors.gray+'4f': '#fff'}]}>
        <View style={[tailwind(`w-full h-full p-1.5 rounded-full items-center flex-row`),{backgroundColor:item?.color}]}>
            <View style={[tailwind(`w-full h-full rounded-full`),{backgroundColor:color.color === item?.color ? item?.color : '#fff'}]}/>  
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
    setColor(route.params.product.colors[0])
    setSizePosition(0)
    setColorsPosition(0)
    setImgPosition(0)
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
  <>
    <Pressable onPress={()=>setAddPosition(-220)} style={styles.screen}>

      <HeadBar back/>

      <View style={{flex:1,width:'100%',alignItems:'stretch',paddingHorizontal:16}}>
          <Text text={product.name} style={{fontSize:22,fontWeight:'bold',color:colors.black,textAlign:'center'}}/>
          <Text text="Sweater" style={{fontSize:14,color:colors.gray,textAlign:'center',marginTop:10}}/>

          <View style={tailwind('flex-1 mt-2 p-2')}>
            
            <View style={tailwind('flex-1 flex-row p-2')}>
            
                <View style={tailwind('flex-1 items-center justify-center')}>
                    <Animated.Image source={color.img} resizeMode="contain" style={[tailwind('flex-1 relative rounded'),{left:imgPosition,transform:[{scale:imgSize}]}]}/>
                </View>
                
                <View style={tailwind('w-12 ml-8 items-center justify-center')}>
                    <View style={[tailwind('w-12 relative rounded-full bg-white items-center'),{elevation:0.2}]}>
                        {
                            product?.sizes?.map((item,index)=>(
                                renderSize({item,index})
                            ))
                        }
                        <Animated.View style={[tailwind('absolute w-12 h-12 rounded-full'),{backgroundColor:colors.primary,zIndex:-1,top:sizePosition}]}/>
                    </View>
                </View>
            
            </View>

            <Animated.View style={[tailwind('w-10/12 h-16 mt-2 items-center self-center flex-row'),{right:colorsPosition}]}>
                <FlatList
                    data={product.colors}
                    keyExtractor={i=>i.color}
                    horizontal
                    contentContainerStyle={tailwind('justify-center w-full items-center')}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    ItemSeparatorComponent={()=><View style={tailwind('w-3')}/>}
                    renderItem={renderColor} 
                />
            </Animated.View>

          </View>

          <View style={tailwind('w-full h-16 mt-2 mb-4 p-2 items-center flex-row')}>
            <View style={tailwind('w-32')}>
                <Text text="Price" style={{fontSize:14,fontWeight:'bold',color:colors.gray,textAlign:'left'}}/>
                <Text text={`$${product.price}`} style={{fontSize:16,fontWeight:'bold',color:colors.black,textAlign:'left'}}/>
            </View>
            <View style={[tailwind('flex-1 rounded-lg items-center justify-center'),{backgroundColor:(color && size) ? colors.primary : colors.gray,elevation:0.6}]}>
                <Pressable onPress={()=>setAddPosition(0)} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
                    <View style={tailwind('w-8 h-8 rounded-full bg-white bg-opacity-20 items-center justify-center')}>
                      <Ionicons name="ios-cart" size={20} color='#fff'/>
                    </View>
                    <Text text="Add to cart" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
                </Pressable>
            </View>
          </View>

      </View>


    </Pressable>

    {/* Add Card */}
    <Animated.View style={[tailwind('h-52 rounded-t-3xl items-stretch px-4 py-2 justify-end bg-white absolute left-0'),{width,zIndex:99999,elevation:40.3,bottom:addPosition}]}>
      
      <View style={tailwind('flex-row my-2 justify-center px-10 items-center w-full')}>
        <Text text="Product:"/>
        <Text text={product.name} style={tailwind('ml-8 font-bold')}/>
      </View>
      
      <View style={tailwind('flex-row my-2 justify-center px-10 items-center w-full')}>
        <Text text="Color:" />
        <View style={[tailwind(`w-5 h-5 ml-3 rounded-full`),{backgroundColor:color.color,borderColor:colors.gray,borderWidth:color?.color?.includes('#fff')?1:0}]}/>
        <Text text="|" style={tailwind('mx-3')}/>
        <Text text="Size:"/>
        <Text text={size} style={tailwind('ml-3 font-bold')}/>
        <Text text="|" style={tailwind('mx-3')}/>
        <Text text="Price:"/>
        <Text text={'$'+(product.price*quantity)} style={tailwind('ml-3 font-bold')}/>
      </View>

      <View style={tailwind('flex-row mt-2 mb-1 justify-center px-10 items-center w-full')}>
        <Text text="Quantity:"/>
        <View style={tailwind('ml-8 flex-row items-center')}>

          <View style={[tailwind('w-7 h-7 rounded-lg items-center justify-center'),{backgroundColor:colors.primary}]}>
            <Pressable onPress={decrementQuantity} style={tailwind('flex-1 items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.3',borderless:true}}>
              <Entypo name="minus" size={12} color="#fff"/>
            </Pressable>
          </View>

          <Text text={quantity} style={tailwind('mx-6 font-bold')}/>

          <View style={[tailwind('w-7 h-7 rounded-lg items-center justify-center'),{backgroundColor:colors.primary}]}>
            <Pressable onPress={incrementQuantity} style={tailwind('flex-1 items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.3',borderless:true}}>
              <Entypo name="plus" size={12} color="#fff"/>
            </Pressable>
          </View>

        </View>
      </View>

      <View style={[tailwind('w-11/12 h-11 rounded-lg mt-4 mb-2 items-center self-center justify-center'),{backgroundColor:(color && size) ? colors.primary : colors.gray,elevation:0.6}]}>
        <Pressable onPress={addToCart} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
          <View style={tailwind('w-8 h-8 rounded-full bg-white bg-opacity-20 items-center justify-center')}>
            <Ionicons name="ios-cart" size={20} color='#fff'/>
          </View>
            <Text text="Add to cart" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
        </Pressable>
      </View>

    </Animated.View>
  </>
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
