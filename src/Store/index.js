import create from 'zustand'
import { ToastAndroid } from 'react-native'

const useStore = create(set => ({
    routeName:'Home',
    setRoute: (v) => {
        set(state => ({ routeName: v }))
    },
    loggedUser:null,
    setLoggedUser: (v) => {
        set(state => ({ loggedUser: v }))
    },
    refresh:false,
    setRefresh: () => {
        set(state => ({ refresh: !state.refresh }))
    },
    cartData:[],
    addToCart: (v) => {
        set(state => ({ cartData: [...state.cartData,v] }))
    },
    removeFromCart: (index) => {
        set(state => {
            const data = [...state.cartData]
            data.splice(index,1)
            return {
                cartData: data 
            }
        })
    },
    savedData:[],
    addToSaved: (v) => {
        set(state => ({ savedData: [...state.savedData,v] }))
    },
    removeFromSaved: (v) => {
        set(state => {
            const data = [...state.savedData]
            const index = state.savedData.indexOf(v)
            data.splice(index,1)
            return {
                savedData: data 
            }
        })
    },
    newInCart:false,
    setNewInCart: (v) => {
        set(state => ({ newInCart: v }))
    },
    Toast: v =>{
        ToastAndroid.showWithGravityAndOffset(v,ToastAndroid.SHORT,ToastAndroid.BOTTOM,ToastAndroid.CENTER,260)
    }
}))


export { useStore }