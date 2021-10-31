import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Animated, Pressable, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native'

const ListItem = React.memo((props) => {

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={()=>props.onSelect(props.label)} 
            style={[styles.listItem,props.lastItem && {marginBottom:6}]}
        >
            <Text>{props.label}</Text>
        </TouchableOpacity>
    )
})

const Dropdown = (props) => {

    const {
        items = ['Mongo','Banana','Watermelon','Apple','Orange','Lemon'],
        onSelect = (v) => {return v},
        wrapperStyle = {},
    } = props

    const height = React.useRef(new Animated.Value(0)).current;
    
    const setHeight = (value) => {
        Animated.timing(height, {
            toValue: value,
            duration: 400,
            useNativeDriver:false
        }).start();
    };

    const [open,setOpen] = useState(false)
    const [selected,setSelected] = useState('')

    const toggleMenu = () => {
        setHeight(open ? 0 : items.length ? 120 : 60)
        setOpen(!open)
    }

    const selectItem = (item) => {
        setSelected(item)
        toggleMenu()
        onSelect(item)
    }

    const renderItem = ({item,index}) => (
        <ListItem 
            key={index} 
            label={item} 
            onSelect={selectItem} 
            lastItem={index === (items.length-1)}
        />
    )

    return (
        <View style={wrapperStyle}>
            <Pressable 
                onPress={toggleMenu}
                style={styles.select}
            >
                <Text style={{width:'100%',color: selected ? '#161616' : '#ababab',flex:1}}>
                    {selected || "select an item.."}
                </Text>
                <Entypo 
                    name={open ? "chevron-up" : "chevron-down"}
                    color='#ababab'
                    size={16}
                />
            </Pressable>

            <Animated.View style={[styles.menu,{height:height}]}>
                {
                    items.length ?
                    <FlatList
                        data={items}
                        keyExtractor={(_,i)=>String(i)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                    : <Text style={styles.empty}>No Items</Text>
                }
            </Animated.View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    select:{
        width:'100%',
        height:40,
        backgroundColor:'#fff',
        borderRadius:8,
        paddingHorizontal:12,
        paddingVertical:2,
        alignItems:'center',
        flexDirection:'row',
        position:'relative'
    },
    menu:{
        backgroundColor:'#fff',
        borderRadius:8,
        marginBottom:12,
        paddingHorizontal:8,
        // paddingTop:6,
        overflow:'hidden',
        marginTop:4,
        zIndex:-2,
    },
    listItem:{
        width:'100%',
        height:40,
        paddingHorizontal:12,
        borderRadius:8,
        marginTop:6,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#eeeeee4f'
    },
    empty:{
        width:'100%',
        color:'#ababab',
        flex:1,
        textAlign:'center',
        paddingVertical:20,
    }
})

export default Dropdown