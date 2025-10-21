import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native';
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png') } style={styles.image} />
                <Text style={styles.heading}>Add A New Dish</Text>
            </View>
            <ScrollView>

            <View style={styles.mainContent}>
                <Text style={styles.title}>Enter Dish Details</Text>

                <TextInput placeholder="Dish Name" value={dish} onChangeText={setDish} style={styles.input} />
                <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
                <TextInput placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} style={styles.input} />
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={course} onValueChange={setCourse} style={styles.picker}>
                        <Picker.Item label="Select a Course" value="" />
                        <Picker.Item label="Starters" value="Starters" />
                        <Picker.Item label="Mains" value="Mains" />
                        <Picker.Item label="Desserts" value="Desserts" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={handleAdd} style={styles.button} activeOpacity={0.6} >
                    <Text style={styles.buttonText}>Add Dish</Text>
                </TouchableOpacity>

            </View>

            <Text style={styles.subtitle}>Current Menu </Text>
            
            <FlatList scrollEnabled={false} data={menu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.pricing}>R{item.price.toFixed(2)}</Text>
                    </View>
                    <Text>{item.description}</Text>
                    <Text>Course: {item.course}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.bin}>🗑 Delete</Text>
                    </TouchableOpacity>
                </View>
            )} 
            ListEmptyComponent={<Text style={styles.noText}>No dishes added yet.</Text>}
            />
            </ScrollView>

        </View>

    );
}
const styles = StyleSheet.create({
    bin:{color: 'red', 
        marginTop: 5, 
        textAlign: 'right' 
        },
    
    image:{width: 40, 
            height: 40, 
            marginRight: 10, 
            marginBottom: -15 
            },

    container: {flex: 1, 
                padding: 20, 
                backgroundColor: '#fff', 
                paddingTop: 80 
                },

    heading: {fontSize: 24, 
                fontWeight: 'bold', 
                color: '#fff', 
                textAlign: 'center', 
                marginTop: 14 
            },

    header: {fontSize: 24, 
            fontWeight: 'bold', 
            color: '#fff', 
            marginBottom: 10, 
            backgroundColor: '#2196f3', 
            padding: 10, 
            flexDirection: 'row', 
            alignItems: 'center', 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            },

    title: {fontSize: 22, 
            fontWeight: 'bold', 
            color: '#2196f3', 
            paddingBottom: 10 
            },

    mainContent: {fontSize: 18, 
                  marginBottom: 10, 
                  padding: 10, 
                  borderRadius: 8,   
                  borderBlockColor: '#000000ff', 
                  borderWidth:  1
                },

    subtitle: {fontSize: 20, 
               marginVertical: 10,  
               textDecorationLine: 'underline',
            },

    input: {overflow: 'hidden', 
            borderWidth: 1, 
            borderColor: '#000000ff', 
            borderRadius: 8, 
            padding: 10, 
            marginBottom: 10
        },

    pickerContainer: {borderWidth: 1,
                      borderColor: '#000000ff',
                      borderRadius: 8,
                      overflow: 'hidden',
                      marginBottom: 10
                    },

    row: {flexDirection: 'row',      
          justifyContent: 'space-between',  
          alignItems: 'center', 
        },

    pricing: {fontSize: 15,
              fontWeight: 'bold', 
              marginTop: 5, 
              textAlign: 'right',
            },

    name: {fontWeight: 'bold', 
           fontSize: 18 
        },

    picker: {backgroundColor: '#f1f2f4', 
             height: 50,
             width: '100%', 
            },

    button: {backgroundColor: '#49b24d', 
            padding: 10, 
            borderRadius: 8, 
            alignItems: 'center' 
            },

    buttonText: { color: '#fff', 
                    fontWeight: 'bold', 
                    fontSize: 20
                },

    card: {borderWidth: 1, 
            borderRadius: 10, 
            padding: 10, 
            marginBottom: 10,   
            borderBlockColor: '#000000ff' 
            },

    cardTitle: {fontWeight: 'bold', 
                fontSize: 16 
            },
    
    noText: {textAlign: 'center', 
    }
    
});
