import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../MenuContext';
import * as ImagePicker from 'expo-image-picker';


export default function AddMenuScreen() {

    const { menu, addItem, removeItem } = useMenu();
    const [dish, setDish] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState<string | number | null>(null);
    const [selectedPreImage, setSelectedPreImage] = useState<number | null>(null);

    const [showModal, setShowModal] = useState(false);

    const preImages = [
        require('../assets/pizza.jpg'),
    ];

    const handleAdd = () => {
        if (dish && description && price && course && image) {
            addItem({
                id: Date.now(),
                name: dish,
                description: description,
                price: parseFloat(price),
                course,
                image: image,
            });
            setDish('');
            setDescription('');
            setPrice('');
            setCourse('');
            setImage(null);
        } else alert("Please fill in all the details.")
    };
    {
        preImages.map((img, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setSelectedPreImage(index);
                    setImage(img);
                    alert('Image has been added successfully!');
                    setShowModal(false);
                }
                }
            >
                <Image
                    source={img}
                    style={[
                        styles.preImage,
                        selectedPreImage === index && { borderWidth: 3, borderColor: '#2196f3' },
                    ]
                    }
                />
            </TouchableOpacity>
        ))
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.image} />
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

                    <View>
                        <View style={styles.imageButtons}>
                            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                                <Text style={styles.buttonText2}>Choose from Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageButton} onPress={() => setShowModal(true)}>
                                <Text style={styles.buttonText2}>Choose from Pre-Images</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageCenter}>

                        {image && (
                            <Image
                                source={typeof image === 'string' ? { uri: image } : image}
                                style={styles.previewImage}
                            />
                        )}
                        </View>

                    </View>

                    <TouchableOpacity onPress={handleAdd} style={styles.button} activeOpacity={0.6} >
                        <Text style={styles.buttonText}>Add Dish</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.subtitle}>Current Menu </Text>

                <FlatList scrollEnabled={false} data={menu} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.pricing}>R{item.price.toFixed(2)}</Text>

                                <Text>{item.description}</Text>
                                <Text>Course: {item.course}</Text>

                                <TouchableOpacity onPress={() => removeItem(item.id)}>
                                    <Text style={styles.bin}>🗑 Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <View>

                                {item.image && (
                                    <Image
                                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                )}

                            </View>
                        </View>

                    </View>
                )}
                    ListEmptyComponent={<Text style={styles.noText}>No dishes added yet.</Text>}
                />
            </ScrollView>



            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose an Image</Text>

                        <ScrollView contentContainerStyle={styles.imageGrid}>
                            {preImages.map((img, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedPreImage(index);
                                        setImage(img); // store the require() directly
                                        setShowModal(false);
                                    }}
                                >
                                    <Image
                                        source={img}
                                        style={[
                                            styles.preImage,
                                            selectedPreImage === index && { borderWidth: 3, borderColor: '#2196f3' },
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}

                        </ScrollView>

                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtn}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({

    imageButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    imageButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, flex: 1, marginHorizontal: 5, alignItems: 'center' },

    previewImage: { width: 105, height: 105, borderRadius: 10, marginVertical: 5},
    imageCenter: {alignItems:'center'},
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
    preImage: { width: 100, height: 100, borderRadius: 10, margin: 5 },
    closeBtn: { backgroundColor: '#f44336', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        alignItems: 'center'
    },

    bin: {
        color: 'red',
        marginTop: 5,
        fontSize: 15,
        textAlign: 'left'
    },

    image: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginBottom: -15
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 80
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 14
    },

    header: {
        fontSize: 24,
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

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2196f3',
        paddingBottom: 10
    },

    mainContent: {
        fontSize: 18,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        borderBlockColor: '#000000ff',
        borderWidth: 1
    },

    subtitle: {
        fontSize: 20,
        marginVertical: 10,
        textDecorationLine: 'underline',
    },

    input: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#000000ff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000000ff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    pricing: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 2,

    },

    name: {
        fontWeight: 'bold',
        fontSize: 20,
        verticalAlign: 'top',
    },

    picker: {
        backgroundColor: '#f1f2f4',
        height: 50,
        width: '100%',
    },

    button: {
        backgroundColor: '#49b24d',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },

    buttonText2: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },

    card: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderBlockColor: '#000000ff'
    },

    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },

    noText: {
        textAlign: 'center',
    }

});
