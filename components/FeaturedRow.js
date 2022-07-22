import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'
const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = React.useState([])
    React.useEffect(() => {
        sanityClient.fetch(
            `
            *[_type == "featured" && _id==$id] { 
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                        type->{
                             name
                        }
                }
            }[0]
            `, {id }
        ).then((data) => {
            setRestaurants(data.restaurants)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
        }
        )
    }, [id])


    return (
        <View>
            <View className='mt-4 flex-row items-center justify-between px-4'>
                <Text className='font-bold text-lg'>{title}</Text>
                <AntDesign className='' name="arrowright" size={20} color="#00bcd4" />
            </View>
            <Text className='text-gray-400 text-sm px-4'>{description}</Text>

            <FlatList
                data={restaurants}
                renderItem={({ item }) => <RestaurantCard item={item} />}
                keyExtractor={item => item._id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className='mx-4 mt-4'
            />
        </View>
    )
}

export default FeaturedRow