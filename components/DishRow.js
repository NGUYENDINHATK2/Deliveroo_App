import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectBasket, selectBasketItemsWithId, removeFromBasket } from '../features/basketSlice'
const DishRow = ({ dish }) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const items = useSelector(state => selectBasketItemsWithId(state, dish._id))
  const dispatch = useDispatch()
  const addItemToBasket = () => {
    dispatch(addToBasket(dish))
  }
  const removeItemFromBasket = () => {
    if (!items.length > 0) {
      return
    }
    const _id = dish._id
    dispatch(removeFromBasket({ _id }))
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"
          }`}>
        <View className='flex-row'>
          <View className='flex-1'>
            <Text className='text-lg mb-1'>{dish.name}</Text>
            <Text className='text-gray-400'>{dish.short_description}</Text>
            <Text className='text-gray-400 mt-2'>
              <Currency quantity={dish.price} currency='VND' />
            </Text>
          </View>
          <View>
            <Image
              className='h-20 w-20 bg-gray-300 p-4 '
              source={{ uri: urlFor(dish.image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {
        isPressed && (
          <View className='bg-white px-4'>
            <View className='flex-row space-x-2 items-center pb-3'>
              <TouchableOpacity
                disabled={!items.length}
                onPress={removeItemFromBasket} >
                <AntDesign name="minuscircle" size={25} color={
                  !items.length ? 'gray' : '#00bcd4'
                } />
              </TouchableOpacity>
              <Text className='text-gray-500 text-sm'>{items.length}</Text>
              <TouchableOpacity onPress={addItemToBasket}>
                <AntDesign name="pluscircle" size={25} color="#00bcd4" />
              </TouchableOpacity>
            </View>
          </View>
        )}
    </>
  )
}

export default DishRow