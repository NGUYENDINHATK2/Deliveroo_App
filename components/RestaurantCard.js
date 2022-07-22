import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import {urlFor} from '../sanity'
import { useNavigation } from '@react-navigation/native'
const RestaurantCard = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity className='bg-white shadow mr-3' 
            onPress={() => navigation.navigate('Restaurant', { item })}
        >
            <Image
                source={{ uri: urlFor(item.image).url() }}
                className='h-36 w-64 rounded-sm'
                resizeMode='cover'
            />
            <View className='px-3 pb-4'>
                <Text className='font-bold text-lg pt-2'>{item.name}</Text>
                <View className='flex-row items-center space-x-2'>
                    <AntDesign name="star" size={20} color="green" />
                    <Text className='test-xs text-gray-500'>
                        <Text className='text-green-500'>{item.rating}</Text> - {item.type?.name}
                    </Text>
                </View>

                <View className='flex-row items-center space-x-2 my-1'>
                    <Entypo name="location" size={22} color="gray" />
                    <Text className='text-gray-500 text-sm'> Nearby - {item.address}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard