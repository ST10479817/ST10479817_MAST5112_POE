import React from 'react';
import {View, Image, ScrollView, Text, FlatList} from 'react-native';
import { useMenu } from '../MenuContext';


export default function HomeScreen() {
    const {menu} = useMenu();
    const totalItems = menu.length;

    return(
        <View>
            <View>
                <Text></Text>
            </View>
            <ScrollView>
                <Text>Total Menu Items: {totalItems}</Text>

                <FlatList data={menu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>R{item.price.toFixed(2)}</Text>
                        <Text>{item.course}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No dishes added yet.</Text>}
            />
            </ScrollView>


        </View>

    );

}