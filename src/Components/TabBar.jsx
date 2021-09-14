import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import colors from '../styles/Colors';
import { width } from '../styles/Styles';

export default function MyTabBar({ state, descriptors, navigation }) {

    // Top small bar animation
    const fromLeft = [25,50,75,100]
    const activePosition = React.useRef(new Animated.Value((width*(((state.index < 4 ? fromLeft[state.index] : 120)-12.5)/100)-11))).current;

    const setActivePosition = (value) => {
      Animated.timing(activePosition, {
        toValue: (width*((value-12.5)/100)-11),
        duration: 400,
        useNativeDriver:false
      }).start();
    };

    React.useEffect(()=>{
        setActivePosition((state.index < 4 ? fromLeft[state.index] : 120))
    },[state])

    return (
        <View style={styles.tabBarContainer}>
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    let iconName, size = 20;

                    if (route.name === 'Home'){
                        iconName = 'ios-home'
                    } 
                    else if (route.name === 'Cart'){
                        iconName = 'ios-cart';
                        size = 22
                    }
                    else if (route.name === 'Saved'){
                        iconName = 'ios-heart';
                    }
                    else if (route.name === 'Profile'){
                        iconName = 'ios-person';
                    }
                    else{
                        return
                    }

                    return (
                        <View key={index} style={{ flex: 1 }}>
                            <Pressable
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.tabBarIcon}
                                android_ripple={{borderless:true,color:colors.primary_light+'47'}}
                            >
                                <Ionicons name={iconName} size={size} color={isFocused ? colors.primary : colors.gray+'4f'} />
                            </Pressable>
                        </View>
                    );
                })
            }

            {/* small animated bar on top of icon */}
            <Animated.View style={[styles.animatedTopBar,{left: activePosition}]}/> 
        
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer:{ 
        flexDirection: 'row', 
        height:56,
        backgroundColor:'#fff'
    },
    tabBarIcon:{ 
        width:'100%', 
        height:'100%', 
        alignItems:'center',
        justifyContent:'center' 
    },
    animatedTopBar:{
        position:'absolute',
        width:22,
        height:3,
        borderRadius:10, 
        backgroundColor:colors.primary,
        top:0
    },
})