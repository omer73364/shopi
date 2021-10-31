import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Image, ImageBackground, Pressable, TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-rn'
import colors from '../styles/Colors'
import Text from './Text'

export default (props) => {

    const {
        onPress = () => alert(item.id),
        item = {
            id:'0',
            img: require('../assets/imgs/1.png'),
            name: 'Name',
            price: "0",
            saved: false
        },
        lastItem = false,
    } = props

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={tailwind(`ml-4 ${lastItem ? 'mr-4' : ''}`)}>
            <View style={[tailwind('p-0 overflow-hidden bg-white rounded-xl w-32 h-40'),{elevation:0.3}]}>
                <Image source={item.img} resizeMode="cover" style={tailwind('w-full flex-1 rounded-xl')}/>
                <ImageBackground source={item.img} blurRadius={40} style={tailwind('mt-2 w-full opacity-90 h-10 items-center justify-center absolute bottom-0 left-0')}>
                    <Text text={item.name} style={tailwind('font-bold text-white')}/>
                </ImageBackground>
            </View>
         </TouchableOpacity>
    )
}   