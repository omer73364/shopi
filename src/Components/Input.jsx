import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { fonts, } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/Colors';


const Input = (props) =>{
    const [ searchText,setSearchText ] = useState('')
    const searchHandler = () => props.onSearch && props.onSearch(searchText)

    return(
        <View style={[styles.container,props.inputStyle]}>

            <TextInput
                onChangeText={text => {setSearchText(text);props?.onInput && props.onInput(text)}}
                onSubmitEditing={searchHandler}
                style={styles.input} 
                placeholder={props.placeholder || "placeholder"} 
                placeholderTextColor={colors.gray+'6f'}
                defaultValue={props.searchText || props.defaultValue || searchText}
                secureTextEntry={props.hidden}
                keyboardType={props.type || 'default'}
                editable={!props.disabled}
            />
            
            { 
                props.search && 
                <TouchableOpacity
                    style={styles.search}
                    onPress={searchHandler}
                >
                   <Ionicons name="ios-search" size={18} color={colors.gray}/>
                </TouchableOpacity>
            }

        </View>
    )
}    


const styles = StyleSheet.create({

    container:{
        width:'100%',
        borderRadius:8,
        paddingHorizontal:12,
        paddingVertical:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:12,
        backgroundColor:'#fff',
    },
    
    input:{
        color:colors.secondary[900],
        fontSize:14,
        flex:1,
        textAlign:'left',
        fontFamily:fonts['regular'],
        marginRight:10
    },

});

export default Input
