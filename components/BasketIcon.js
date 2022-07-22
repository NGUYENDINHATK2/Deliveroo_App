import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBasket, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from 'react-currency-formatter'
const BasketIcon = () => {


  const item = useSelector(selectBasket)

  const navigation = useNavigation()
  const basketTotal = useSelector(selectBasketTotal)
  if(item.length === 0) return null;

  return (

    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className='mx-5 bg-cyan-400 p-4 rounded-lg flex-row items-center space-x-2'>
        <Text className='text-white  font-extrabold text-lg bg-cyan-500 py-1 px-3'>{item.length}</Text>
        <Text className='text-white font-extrabold flex-1 text-lg '>View Basket</Text>
        <Text className='text-lg  text-white font-extrabold'>
          <Currency quantity={basketTotal} currency='VND' />
        </Text>
      </TouchableOpacity>
    </View>

  )
}

export default BasketIcon