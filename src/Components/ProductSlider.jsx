import React from 'react'
import { View, FlatList, } from 'react-native';
import Title from './Title';
import VerticalCard from './VerticalCard';
import { useNavigation } from '@react-navigation/native'


const ProductSlider = (props) => {

    const navigation = useNavigation()

    const renderItem = ({item,index}) => {

        const pressHandler = () => {
            navigation.navigate('ProductDetails', {product: item})
        }

        return (
            <VerticalCard 
                save={props.save}
                item={item}
                onPress={pressHandler}
                horizontalMode={!props.vertical}
                lastItem={index === props.products.length-1}
            />
        )
    }

    const listTitle = () => {
        return (
            <View style={{paddingTop:12}}>
                <Title text={props.title} seeAll={false}/>
            </View>
        )
    }

    if(props.vertical){
        return(
            <FlatList
                ListHeaderComponent={listTitle}
                numColumns={2}
                decelerationRate='normal'
                nestedScrollEnabled = {false}
                data={props.products}
                style={[{paddingHorizontal:8},props.style]}
                keyExtractor={(_,i)=>String(i)}
                renderItem={renderItem}
                ListFooterComponent={()=><View style={{height:64}}/>}
                showsVerticalScrollIndicator={false}
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