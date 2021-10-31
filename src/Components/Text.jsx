import React from 'react'
import { Text } from 'react-native'
import { fonts } from '../styles/Styles'

export default (props) => {

    const {
        onPress, 
        text = '' ,
        weight = 'regular', 
        style = {},
    } = props

    return (
        <Text onPress={onPress} style={[{fontFamily:fonts[weight]},style]} {...props}>
            { text }
        </Text>
    )
}