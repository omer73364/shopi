import create from 'zustand'
import { ToastAndroid } from 'react-native'

const useStore = create(set => ({
    routeName:'Home',
    setRoute: (v) => {
        set(state => ({ routeName: v }))
    },
    Toast: v =>{
        ToastAndroid.showWithGravityAndOffset(v,ToastAndroid.SHORT,ToastAndroid.BOTTOM,ToastAndroid.CENTER,260)
    }
}))


export { useStore }