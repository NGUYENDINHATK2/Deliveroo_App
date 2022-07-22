import { View, Text,ScrollView,FlatList } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import {useNavigation} from '@react-navigation/native'
import sanityClient from '../sanity'
const Categories = () => {
    const navigation = useNavigation()
    const [categories, setCategories] = React.useState([])
    React.useEffect(() => {
        sanityClient.fetch(
            `
            *[_type == "category"] 

            `
        ).then((data) => {
            setCategories(data)
        })
    }, [])
  return (
   <FlatList
        data={categories}
        renderItem={({item}) => <CategoryCard item={item} />}
        keyExtractor={item => item._id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}  
        className='mx-3 mt-2'
   />
  )
}

export default Categories;