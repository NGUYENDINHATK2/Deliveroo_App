import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SafeViewAndroid from '../components/SafeViewAndroid'
import { useSelector, useDispatch } from 'react-redux';
import { selectBasket } from './../features/basketSlice';
const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector((state) => state.restaurant);
    const items = useSelector(selectBasket);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = React.useState([

    ]);
    const dispatch = useDispatch();
    React.useEffect(() => {
        const groupedItems = items.reduce((results,item) => {
            (results[item._id] = results[item._id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])
    console.log(groupedItemsInBasket);
    return (
        <View style={SafeViewAndroid.AndroidSafeArea}>
            <Text>BasketScreen</Text>
        </View>
    )
}

export default BasketScreen