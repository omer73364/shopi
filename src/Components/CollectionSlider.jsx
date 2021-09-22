import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { View, FlatList, } from 'react-native';
import CollectionCard from './CollectionCard';


const CollectionSlider = (props) => {

    const navigation = useNavigation()

    const renderItem = ({item,index}) => {
        return (
            <CollectionCard 
                onPress={()=>navigation.navigate('Products',{title:item.name})}
                item={item} 
                lastItem={index === props.products.length-1}
            />
        )
    }

    return (
        <FlatList
            decelerationRate='normal'
            nestedScrollEnabled = {false}
            data={props.products}
            style={[{marginTop:8},props.style]}
            keyExtractor={i=>(i.id)}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default CollectionSlider