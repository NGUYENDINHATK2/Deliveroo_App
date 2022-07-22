import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SafeViewAndroid from '../components/SafeViewAndroid'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Searchbar } from 'react-native-paper';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = React.useState([])
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    React.useEffect( ()   => {
        sanityClient.fetch(
            `
            *[_type == "featured"]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }
            `      
        ).then((data)=>{
            setFeaturedCategories(data)
        });
    }, [])


    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}  >
            <View style={styles.container} className=' bg-white pt-5'>
                {/* //! Header */}
                <View style={styles.HeaderViewContainer} className='flex-row pb-3 items-center mx-4 space-x-2 '>
                    <Image
                        className='h-7 w-7 bg-gray rounded-full p-4'
                        source={{ uri: 'https://nld.mediacdn.vn/291774122806476800/2021/6/20/2025995013531366728567334176149471602817372n-16241611406261896040643.jpg' }}
                    />
                    <View className="flex-1">
                        <Text className='font-bold text-gray-400 text-xs'>Deliver Now !</Text>
                        <Text className='font-bold text-xl'>Current Location <Entypo
                            name='chevron-thin-down'
                            size={20}
                            color='#00bcd4'
                        /> </Text>
                    </View>
                    <View>
                        <FontAwesome name='user-o' size={35} color='#00bcd4' />
                    </View>
                </View>
                {/* //! Search */}
                <View className='flex-row  items-center space-x-2 pb-2 mx-0 px-4'>
                    <View className='flex-row flex-1 bg-gray-100 p-2 space-x-2'>
                        <FontAwesome name='search' size={25} color='gray' />
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder='Search..'
                        />
                    </View>
                    <MaterialIcons name='bar-chart' size={30} color='#00bcd4' />
                </View>
                {/* //! endheaders */}
            </View>
            {/* //! Body */}
            <ScrollView className='bg-gray-100'
                contentContainerStyle={{ paddingBottom: 100 }}>
                <Categories />
                {/* //! FeaturedRow */}
                {
                    featuredCategories?.map(category => {
                        return (
                            <FeaturedRow 
                                key={category._id}
                                id={category._id}
                                title={category.name}
                                description={category.short_description}
                            />
                        )
                    }
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})