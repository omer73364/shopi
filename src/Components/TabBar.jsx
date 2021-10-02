import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import colors from '../styles/Colors';
import { width } from '../styles/Styles';
import { useStore } from '../Store';

export default function MyTabBar({ state, descriptors, navigation }) {

    const routeName = useStore(state=>state.routeName)

    // Top small bar animation
    const fromLeft = [25,50,75,100]
    const activePosition = React.useRef(new Animated.Value((width*(((state.index < 4 ? fromLeft[state.index] : 120)-12.5)/100)-11))).current;
    const tabBarPosition = React.useRef(new Animated.Value(-56)).current;

    const setActivePosition = (value) => {
        Animated.timing(activePosition, {
            toValue: (width*((value-12.5)/100)-11),
            duration: 400,
            useNativeDriver:false
        }).start();
    };

    const setTabBarPosition = (value) => {
        Animated.timing(tabBarPosition, {
          toValue: value,
          duration: 400,
          useNativeDriver:false
        }).start();
    };

    const showTabBar = [
        'Home',
        'Cart',
        'Saved',
        'Products',
        'Profile'
    ]

    React.useEffect(()=>{
        setActivePosition((state.index < 4 ? fromLeft[state.index] : 120))
        setTabBarPosition((showTabBar.includes(routeName) ? -56 : 0))
    },[state,routeName])

    return (
        <View style={{height:0}}>
        <Animated.View style={[styles.tabBarContainer,{top: tabBarPosition}]}>
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

                        const params = {}

                        if(route.name === 'Saved'){
                            params.title = 'Saved'
                            params.showTabBar = true
                        }

                        if(route.name === 'Search'){
                            params.search = true
                            params.showTabBar = true
                            // params.title = 'Results'
                        }

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate(route.name, params);
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
                    else if (route.name === 'Search'){
                        iconName = 'ios-search';
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
                        <View key={index} style={{ flex: 1, borderRadius:50 }}>
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
        
        </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer:{ 
        flexDirection: 'row', 
        height:56,
        width:'100%',
        backgroundColor:'#fff',
        // borderTopRightRadius:14,
        // borderTopLeftRadius:14,
        overflow:'hidden',
        position:'relative',
        // top:-56
        // elevation:12,
        // borderTopWidth:1,
        // borderColor:colors.gray+'4f'
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