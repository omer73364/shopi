import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import tailwind from 'tailwind-rn';
import { height } from '../styles/Styles';


export default function(props) {

  const {children,isModalVisible,setModalVisible} = props


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if(!isModalVisible){
    return null
  }
  return (
    <View style={tailwind('h-full w-full absolute top-0 left-0 z-10 items-center justify-center')}>
      <Pressable onPress={toggleModal} style={tailwind('h-full w-full absolute top-0 left-0 z-10 items-center justify-center bg-black bg-opacity-30')}/>
      <View style={[tailwind('w-11/12 bg-white rounded-lg z-20 items-center justify-center'),{elevation:2,height:height - 140}]}>
        { children }
      </View>
    </View>
  );
}