import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-rn'
import colors from '../styles/Colors'
import Text from './Text'
import { width } from '../styles/Styles'
import { useNavigation } from '@react-navigation/core'
import { useStore } from '../Store'

const VerticalCard = (props) => {

    const navigation = useNavigation()
    const savedData = useStore(state=>state.savedData)
    const addToSaved = useStore(state=>state.addToSaved)
    const removeFromSaved = useStore(state=>state.removeFromSaved)

    const {
        onPress = () => navigation.navigate('ProductDetails', {product: item}),
        item = {
            id:'0',
            img: require('../assets/imgs/1.png'),
            name: 'Name',
            price: "0",
            background:'#eee',
        },
        lastItem = false,
        horizontalMode = false,
        save = () => {
            savedData.includes(item) ? removeFromSaved(item) : addToSaved(item)
        }
    } = props

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={horizontalMode ? tailwind(`ml-2 ${lastItem ? 'mr-4' : ''}`) : tailwind(`m-1 ${lastItem ? 'mr-5' : ''}`)}>
            <View style={[tailwind(`p-2 bg-white rounded-xl w-48 ${horizontalMode ? 'h-72' : 'h-60'}`),{elevation:0.1},!horizontalMode && {width:(width/2)-16}]}>
                <Image source={item.img} resizeMode="cover" style={[tailwind('w-full flex-1 rounded-xl'),{backgroundColor:item.background}]}/>
                <View style={tailwind('mt-2 px-2 relative w-full h-14')}>
                    <Text text={item.name.length > (horizontalMode ? 12 : 10) ? item.name.slice(0,(horizontalMode ? 12 : 10)) + '..' : item.name} style={{...tailwind('text-lg font-bold'),color:colors.black}}/>
                    <Text text={`$${item.price}`} style={{...tailwind('text-base text-left'),color:colors.gray}}/>
                    <View style={[tailwind('w-8 h-8 absolute bottom-2 right-0 rounded-full items-center justify-center'),{elevation:5,backgroundColor:'#f35f41'}]}>
                        <Pressable 
                            onPress={()=>save(item.id)}
                            style={tailwind('w-full h-full items-center justify-center')}
                            android_ripple={{color:'#d74629',borderless:true}}
                        >
                            <Ionicons name={savedData.includes(item) ? 'heart' : "heart-outline"} size={20} color="#fff"/>
                        </Pressable> 
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(VerticalCard)