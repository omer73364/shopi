import React from "react"
import { Pressable, View } from "react-native"
import tailwind from "tailwind-rn"
import colors from "../styles/Colors"


export default function IconButton(props){

    return (
        <View style={[tailwind('w-9 h-9 rounded-md bg-white items-center justify-center'),{elevation:0.3},props.style]}>
          <Pressable
            onPress={props.onPress}
            style={tailwind('w-full h-full items-center justify-center')}
            android_ripple={{color:colors.gray+'4f',borderless:true}}
          >
            { props.children }
          </Pressable>
        </View>
    )
}