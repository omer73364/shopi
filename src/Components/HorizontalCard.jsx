import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Animated, Image, Pressable, TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-rn'
import colors from '../styles/Colors'
import Text from './Text'
import { width } from '../styles/Styles'
import { useStore } from '../Store'

const HorizontalCard = (props) => {

    const removeFromCart = useStore(state=>state.removeFromCart)

    const cardPosition = React.useRef(new Animated.Value(0)).current;

    const setCardPosition = (value,duration) => {
        Animated.timing(cardPosition, {
            toValue: value,
            duration,
            useNativeDriver:false
        }).start();
    };

    const remove = ()=>{
        setCardPosition(-400,400);setTimeout(() => {
        setCardPosition(0,0)
            removeFromCart(index)
        }, 400)
    }

    const {
        item = {
            id:'0',
            img: require('../assets/imgs/1.png'),
            name: 'Name',
            price: "0",
            background:'#eee',
            saved: false
        },
        index,
        quantity,
        size,
        color
    } = props

    return (
        <Animated.View style={[tailwind(`p-2 flex-row items-stretch bg-white self-center rounded-xl h-36 mb-2`),{elevation:0.1,width:width-32,right:cardPosition}]}>
            <Image source={color.img || item.img} resizeMode="cover" style={[tailwind('w-28 h-32 mr-2 rounded-xl'),{backgroundColor:item.background}]}/>
            <View style={tailwind('mt-2 px-2 relative flex-1 h-14')}>
                <Text numberOfLines={1} text={item.name} style={{...tailwind('text-lg font-bold mb-2 mr-10'),color:colors.black}}/>
                <Text text={`Size:  ${size}`} style={{...tailwind('text-sm text-left'),color:colors.gray}}/>
                <Text text={`Quantity:  ${quantity}`} style={{...tailwind('text-sm text-left'),color:colors.gray}}/>
                <Text text={`Price:  $${item.price*quantity}`} style={{...tailwind('text-sm text-left font-bold mt-2'),color:colors.black}}/>
                <View style={[tailwind('w-8 h-8 absolute z-50 right-1.5 top-0 rounded-lg items-center justify-center'),{elevation:0.4,backgroundColor:colors.secondary}]}>
                    <Pressable 
                        onPress={remove}
                        style={tailwind('w-full h-full items-center justify-center')}
                        android_ripple={{color:colors.gray+'2f',borderless:true}}
                    >
                        <Ionicons name="trash" size={18} color={colors.gray+'4f'}/>
                    </Pressable> 
                </View>
            </View>
        </Animated.View>
    )
}

export default React.memo(HorizontalCard)