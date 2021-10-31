import React from "react"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { AsyncStorage, Image, View } from "react-native"
import colors from "../styles/Colors"
import IconButton from "./IconButton"
import tailwind from "tailwind-rn"
import { useNavigation } from "@react-navigation/core"
import { useStore } from "../Store"
import logo from '../assets/icons/logo.png'


const HeadBar = (props) => {

    const navigation = useNavigation()
    const newInCart = useStore(state=>state.newInCart)
    const setNewInCart = useStore(state=>state.setNewInCart)
    const Toast = useStore(state=>state.Toast)
    const setRefresh = useStore(state=>state.setRefresh)

    const shopi = () => {
        Toast('Welcome to Shopi')
    }

    const logoutHandler = () => {
        AsyncStorage.removeItem('loggedUser').then(()=>{
            Toast('Good bye :)')
            setRefresh()
        })
    }

    return (
        <View style={[tailwind('w-full flex-row px-4 pb-3 items-center justify-between'),{borderColor: colors.gray+'4f',borderBottomWidth:!props.noBorder ? 0.2 : 0}]}>
            
            {
                props.back 
                ?
                    <IconButton onPress={()=>navigation.goBack()}>
                        <Entypo name="chevron-left" size={18} color={colors.black}/>
                    </IconButton> // back buttom
                :
                    <IconButton onPress={shopi}>
                        <Image source={logo} style={tailwind('w-6 h-6')} resizeMode="contain"/>
                    </IconButton> // shopi logo
            }
            
            {
                !props.noCart ?
                <IconButton onPress={()=>{navigation.navigate('Cart');setNewInCart(false)}}>
                    {
                        newInCart
                        ?   <View 
                                style={[
                                    tailwind('w-2 h-2 rounded-full absolute top-2 right-3 items-center justify-center'),
                                    {backgroundColor:colors.primary}
                                ]}
                            /> // circle shows when there are new items in cart
                        :   null
                    }
                    <Ionicons name="ios-cart" size={18} color={colors.black}/>
                </IconButton> : null
            }

            {
                props.logout ?
                <IconButton onPress={logoutHandler}>
                    <Ionicons name="ios-log-out" size={18} color={colors.black}/>
                </IconButton> : null
            }

        </View>
    )
}

export default HeadBar