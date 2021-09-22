import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-rn'
import colors from '../styles/Colors'
import Text from './Text'
import {height, width} from '../styles/Styles'

const VerticalCard = (props) => {

    const {
        onPress = () => alert(item.id),
        item = {
            id:'0',
            img: require('../assets/imgs/1.jpg'),
            name: 'Name',
            price: "0",
            saved: false
        },
        lastItem = false,
        horizontalMode = false,
        save = () => alert('s')
    } = props

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={horizontalMode ? tailwind(`ml-2 ${lastItem ? 'mr-4' : ''}`) : tailwind(`m-1 ${lastItem ? 'mr-5' : ''}`)}>
            <View style={[tailwind(`p-2 bg-white rounded-xl w-48 ${horizontalMode ? 'h-72' : 'h-60'}`),{elevation:0.1},!horizontalMode && {width:(width/2)-16}]}>
                <Image source={item.img} resizeMode="cover" style={tailwind('w-full flex-1 rounded-xl')}/>
                <View style={tailwind('mt-2 relative w-full h-14')}>
                    <Text text={item.name} style={{...tailwind('text-lg font-bold'),color:colors.black}}/>
                    <Text text={`$${item.price}`} style={{...tailwind('text-base text-left'),color:colors.gray}}/>
                    <View style={[tailwind('w-8 h-8 absolute bottom-2 right-0 rounded-full items-center justify-center'),{elevation:5,backgroundColor:'#f35f41'}]}>
                        <Pressable 
                            onPress={()=>save(item.id)}
                            style={tailwind('w-full h-full items-center justify-center')}
                            android_ripple={{color:'#d74629',borderless:true}}
                        >
                            <Ionicons name={item.saved ? 'heart' : "heart-outline"} size={20} color="#fff"/>
                        </Pressable> 
                    </View>
                </View>
            </View>
         </TouchableOpacity>
    )
}

export default React.memo(VerticalCard)