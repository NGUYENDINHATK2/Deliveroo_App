import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'
const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation()
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  const { item } = route.params
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setRestaurant(item))
  }, [])

  return (
    <>
      <BasketIcon />
      <ScrollView className='bg-white'>
        <View className='relative'>
          <Image source={{ uri: urlFor(item.image).url() }}
            className='w-full h-56 bg-gray-300 p-4'
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className='absolute top-10 left-5 bg-white p-1 rounded-full items-center '>
            <Ionicons name="arrow-back" size={20} color="#00bcd4" />
          </TouchableOpacity>
        </View>
        <View className='bg-white'> 
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{item.name}</Text>
            <View className='flex-row space-x-2 my-1 '>
              <View className='flex-row items-center space-x-2'>
                <AntDesign name="star" size={20} color="green" />
                <Text className='text-gray-500 text-sm'> {item.rating} - {item.type.name}</Text>
              </View>
              <View className='flex-row items-center space-x-2'>
                <Entypo name="location" size={20} color="gray" />
                <Text className='text-gray-500 text-sm'> {item.address}</Text>
              </View>
            </View>
            <Text className='text-gray-500 text-sm'> {item.short_description}</Text>
          </View>
          <TouchableOpacity className='flex-row p-4 space-x-2 items-center border-y border-gray-200 '>
            <AntDesign name="questioncircleo" size={20} color="gray" />
            <Text className='font-bold flex-1'> Have a food allergy ?</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#00bcd4" />
          </TouchableOpacity>
        </View>
        <View className='pb-32'>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
          {/* //! DishRow */}
          {item.dishes.map((dish, index) => {
            return (
              <DishRow
                key={index}
                dish={dish}
              />
            )
          })}
        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen;