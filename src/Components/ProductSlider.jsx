import React from 'react'
import { View, FlatList, Pressable, } from 'react-native';
import Title from './Title';
import VerticalCard from './VerticalCard';
import { useNavigation } from '@react-navigation/native'
import HorizontalCard from './HorizontalCard';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import tailwind from 'tailwind-rn';
import colors from '../styles/Colors';
import { useStore } from '../Store';
import { width } from '../styles/Styles';


const ProductSlider = (props) => {

    const Toast = useStore(state=>state.Toast)

    const renderItem = ({item,index}) => {
        return (
            <VerticalCard 
                item={item}
                horizontalMode={!props.vertical}
                lastItem={index === props.products.length-1}
            />
        )
    }

    const renderCartItem = ({item,index}) => {
        return (
            <HorizontalCard 
                item={item.product}
                size={item.size}
                color={item.color}
                quantity={item.quantity}
                index={index}
            />
        )
    }

    const listTitle = () => {
        if(!props.title){
            return <View style={{height:12}}/>
        }
        return (
            <View style={{paddingVertical:12}}>
                <Title text={props.title} seeAll={false}/>
            </View>
        )
    }

    const renderCheckoutButton = ()=>
        <View style={[tailwind('h-11 rounded-lg mt-4 mb-4 items-center self-center justify-center'),{backgroundColor:colors.primary,elevation:0.6,width:width-32}]}>
            <Pressable onPress={()=>Toast('No payment method in the app!')} style={tailwind('w-full h-full flex-row items-center justify-center')} android_ripple={{color:'rgba(0,0,0,0.1)',borderless:true}}>
                <View style={tailwind('w-8 h-8 rounded-full bg-white bg-opacity-20 items-center justify-center')}>
                    <Ionicons name="ios-card" size={20} color='#fff'/>
                </View>
                <Text text="Check out" style={{fontSize:16,fontWeight:'bold',color:'#fff',textAlign:'left',marginLeft:10}}/>
            </Pressable>
        </View>

    if(props.cart){
        return (
            <FlatList
                ListHeaderComponent={listTitle}
                decelerationRate={0.95}
                nestedScrollEnabled = {false}
                data={props.products}
                keyExtractor={(_,i)=>String(i)}
                renderItem={renderCartItem}
                ListFooterComponent={renderCheckoutButton}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
            />
        )
    }

    if(props.vertical){
        return (
            <FlatList
                // decelerationRate='fast'
                ListHeaderComponent={listTitle}
                numColumns={2}
                decelerationRate={0.95}
                nestedScrollEnabled = {false}
                data={props.products}
                style={[{paddingHorizontal:8},props.style]}
                keyExtractor={(_,i)=>String(i)}
                renderItem={renderItem}
                ListFooterComponent={()=><View style={{height:props.showTabBar ? 64 : 20}}/>}
                showsVerticalScrollIndicator={false}
                legacyImplementation={false}
            />
        )
    }

    return (
        <FlatList
            decelerationRate='normal'
            nestedScrollEnabled = {false}
            data={props.products}
            style={[{marginTop:8,paddingHorizontal:8},props.style]}
            keyExtractor={i=>(i.id)}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default ProductSlider