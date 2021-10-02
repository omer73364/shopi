import React, { useState } from "react"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Animated, Image, Pressable, View } from "react-native"
import colors from "../styles/Colors"
import IconButton from "./IconButton"
import tailwind from "tailwind-rn"
import { useNavigation } from "@react-navigation/core"
import Text from "./Text"
import { width } from "../styles/Styles"


const HeadBar = (props) => {

    const navigation = useNavigation()

    const addPosition = React.useRef(new Animated.Value(-200)).current;
    const [opened,setOpened] = useState(false)

    const setAddPosition = (value) => {
        if(value === 56){
            setOpened(true)
        }
        else{
            setOpened(false)
        }
        Animated.timing(addPosition, {
            toValue: value,
            duration: 400,
            useNativeDriver:false
        }).start();
    };

    return (
        <>
        <View style={[tailwind('w-full flex-row px-4 pb-3 items-center justify-between'),{borderColor: colors.gray+'4f',borderBottomWidth:!props.noBorder ? 0.2 : 0}]}>
            
            {
                props.back 
                ?
                    <IconButton onPress={()=>navigation.goBack()}>
                        <Entypo name="chevron-left" size={18} color={colors.black}/>
                    </IconButton>
                :
                    <IconButton onPress={()=>setAddPosition(opened ? -200 : 56)}>
                        <Ionicons name={opened ? "ios-close" : "ios-menu"} size={18} color={colors.black}/>
                    </IconButton>
            }

            <IconButton>
                <Ionicons name="ios-cart" size={18} color={colors.black}/>
            </IconButton>
            
        </View>

        {/* Add Card */}
        <Animated.View style={[tailwind('h-32 rounded-t-3xl items-stretch px-4 py-2 justify-end bg-white absolute left-0'),{width,zIndex:99999,elevation:40.3,bottom:addPosition}]}>
        
            <View style={tailwind('flex-row my-1 justify-center px-10 items-center w-full')}>
                <Image source={require('../assets/imgs/profile.jpg')} resizeMode="cover" style={tailwind('w-10 h-10 rounded-full mr-2')}/>
                <Text text="Omer Anwar" style={tailwind('font-bold text-lg ml-2')}/>
            </View>

            <View style={[tailwind('w-full h-10 rounded-lg mt-4 items-center justify-center'),{backgroundColor:colors.primary,elevation:0.6}]}>
            <Pressable onPress={()=>{setAddPosition(-200)}} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
                <Ionicons name="ios-log-out" size={20} color='#fff'/>
                <Text text="Logout" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
            </Pressable>
            </View>

        </Animated.View>
    </>
    )
}

export default HeadBar