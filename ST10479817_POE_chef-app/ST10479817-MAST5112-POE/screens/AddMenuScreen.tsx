import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, FlatList,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../MenuContext';


export default function AddMenuScreen() {

    const {menu, addItem, removeItem} = useMenu();
    const [dish, setDish] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [course, setCourse] = useState('');

    const handleAdd = () => {
        if (dish && description && price && course) {
            addItem({
                id: Date.now(),
                name: dish,
                description: description,
                price: parseFloat(price),
                course,
            });
            setDish('');
            setDescription('');
            setPrice('');
            setCourse('');
        } else alert("Please fill in all fields.")
    };
    return(
        <View>
            <View>
                <Text>Add A New Dish</Text>
            </View>

            <View>
                <Text>Filter by Course</Text>

                <TextInput placeholder="Dish Name" value={dish} onChangeText={setDish} />
                <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
                <TextInput placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />
                
                <Picker selectedValue={course} onValueChange={setCourse} >
                    <Picker.Item label="Select a Course" value="" />
                    <Picker.Item label="Starters" value="Starters" />
                    <Picker.Item label="Mains" value="Mains" />
                    <Picker.Item label="Desserts" value="Desserts" />

                </Picker>

                <TouchableOpacity onPress={handleAdd}>
                    <Text>Add Dish</Text>
                </TouchableOpacity>

            </View>
            
            <FlatList data={menu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>R{item.price}</Text>
                    <Text>{item.course}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text>🗑 Delete</Text>
                    </TouchableOpacity>
                </View>
            )} />

        </View>

    );
}