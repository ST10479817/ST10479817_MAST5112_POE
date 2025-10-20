import React, {useState} from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../MenuContext';



export default function FilterScreen() {
    const {menu} = useMenu();
    const [selectedCourse, setSelectedCourse] = useState('All');

    const filteredMenu = selectedCourse === 'All' ? menu : menu.filter(item => item.course === selectedCourse);

    return(
        <View>
            <View>
                <Text>Filter Menu</Text>
            </View>
            <View>
                <Text>Filter by Course</Text>

                <Picker selectedValue={selectedCourse} onValueChange={setSelectedCourse}>
                    <Picker.Item label='All Courses' value="All" />
                    <Picker.Item label='Starters' value="Starters" />
                    <Picker.Item label='Mains' value="Mains" />
                    <Picker.Item label='Desserts' value="Desserts" />

                </Picker>
            </View>

            <Text>{selectedCourse}</Text>
            <Text>Showing {filteredMenu.length} items</Text>

            <FlatList data={filteredMenu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>R{item.price.toFixed(2)}</Text>
                    <Text>{item.course}</Text>
                </View>
            )}
            ListEmptyComponent={<Text>No dishes has been found.</Text>}/>

        </View>

    );




}