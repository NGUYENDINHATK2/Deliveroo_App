import { View, Text,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {urlFor} from '../sanity'
const CategoryCard = ({item}) => {
  return (
    <TouchableOpacity  className='mr-2 relative' 
    onPress={item.action}
    >
        <Image  source={{ uri: urlFor(item.image).url() }} 
            className="h-20 w-20 rounded"
        />
      <Text className='absolute bottom-1 left-1 text-white font-bold '>{item.name}</Text> 
    </TouchableOpacity>
  )
}

export default CategoryCard