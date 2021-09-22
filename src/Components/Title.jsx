import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import tailwind from 'tailwind-rn'
import colors from '../styles/Colors'
import { width } from '../styles/Styles'
import Text from './Text'

export default (props) => {

    const {
        onPress, 
        text = '',
        seeAll = true
    } = props

    return (
        <View style={[tailwind('flex-row items-center justify-between px-4 my-2'),{width}]}>
            <Text text={text} style={{...tailwind('text-xl font-bold'),color:colors.black}}/>
            <TouchableOpacity onPress={onPress}>
                { seeAll && <Text text="See all" style={{...tailwind('text-sm'),color:colors.gray}}/>}
            </TouchableOpacity>
        </View>
    )
}