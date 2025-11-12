import React, {useState} from 'react';
import {View, Image, Text, FlatList, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../MenuContext';



export default function FilterScreen() {
    const {menu} = useMenu();
    const [selectedCourse, setSelectedCourse] = useState('All');

    const filteredMenu = selectedCourse === 'All' ? menu : menu.filter(item => item.course === selectedCourse);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png') } style={styles.image} />
                <Text style={styles.heading}>Filter Menu</Text>
            </View>
            <View style={styles.mainContent}>
                <Text style={styles.title}>Filter by Course</Text>

                <View style={styles.pickerContainer}>
                    <Picker selectedValue={selectedCourse} onValueChange={setSelectedCourse} style={styles.picker}>
                        <Picker.Item label='All Courses' value="All" />
                        <Picker.Item label='Starters' value="Starters" />
                        <Picker.Item label='Mains' value="Mains" />
                        <Picker.Item label='Desserts' value="Desserts" />

                    </Picker>
                </View>
            </View>

            <View style={styles.rowHeading}>

            <Text style={styles.subtitle}>{selectedCourse}</Text>
            <Text style={styles.count}>Showing {filteredMenu.length} items</Text>

            </View>

            <FlatList data={filteredMenu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.pricing}>R{item.price.toFixed(2)}</Text>
                        <Text>{item.description}</Text>
                        <Text>Course: {item.course}</Text>
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
            ListEmptyComponent={<Text style={styles.noText}>No dishes has been found.</Text>}/>

        </View>

    );
}

const styles = StyleSheet.create({
    image: { width: 40, 
            height: 40, 
            marginRight: 10, 
            marginBottom: -15 
    },

    heading: { fontSize: 24, 
            fontWeight: 'bold', 
            color: '#fff', 
            textAlign: 'center', 
            marginTop: 14 
    },

    header: { fontSize: 24, 
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
        display: 'flex'
  },

    container: { flex: 1, 
                padding: 20, 
                backgroundColor: '#fff', 
                paddingTop: 80 
    },

    title: { fontSize: 22, 
            fontWeight: 'bold', 
            color: '#2196f3', 
            paddingBottom: 10  
    },

    subtitle: {  fontSize: 20, 
                fontWeight: 'bold', 
                textAlign: 'left', 
                marginBottom: 5,  
    },

    row: {flexDirection: 'row',      
          justifyContent: 'space-between',  
          
        },

    rowHeading: {flexDirection: 'row',      
                justifyContent: 'space-between',  
                alignItems: 'center', 
                paddingBottom: 15
        },

    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        alignItems: 'center'
    },

    pricing: {fontSize: 16, 
              fontWeight: 'bold', 
              marginTop: 5, 
              textAlign: 'left',
    },

    pickerContainer: { borderWidth: 1,
                        borderColor: '#000000ff',
                        borderRadius: 8,
                        overflow: 'hidden', 
                        marginBottom: 10
    
  },

    name: {fontWeight: 'bold', 
           fontSize: 20 
        },
  
    mainContent: { fontSize: 20, 
                    marginBottom: 10, 
                    padding: 10, 
                    borderRadius: 8,   
                    borderBlockColor: '#000000ff', 
                    borderWidth:  2
    },

    picker: { backgroundColor: '#f1f2f4', 
              height: 50,
              width: '100%',  
},

    count: { fontSize: 16,  
             textAlign: 'right' 
    },

    noText: {textAlign: 'center', 
             paddingTop: 20
    },

    card: { backgroundColor: '#f9f9f9', 
            borderWidth: 1, 
            borderRadius: 10, 
            padding: 10, 
            marginBottom: 10,   
            borderBlockColor: '#000000ff'  
    },
  
});
