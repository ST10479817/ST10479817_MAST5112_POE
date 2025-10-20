import React from 'react';
import {View, Image, Text, FlatList, StyleSheet} from 'react-native';
import { useMenu } from '../MenuContext';


export default function HomeScreen() {

    const {menu} = useMenu();
    const totalItems = menu.length;

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png') } style={styles.image} />
                <Text style={styles.heading}>Christoffel's Menu</Text>
            </View>
                <Text style={styles.count}>Total Menu Items: {totalItems}</Text>

                <FlatList data={menu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.pricing}>R{item.price.toFixed(2)}</Text>
                        </View>
                        <Text>Course: {item.course}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noText}>No dishes added yet.</Text>}
            />
        </View>

    );
}

// Stylesheet Container 
const styles = StyleSheet.create({
    image: {width: 40, 
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
    row: {flexDirection: 'row',      
          justifyContent: 'space-between',  
          alignItems: 'center', 
        },
            
    header: {fontSize: 24, 
             fontWeight: 'bold', 
             color: '#fff', 
             backgroundColor: '#2196f3', 
             padding: 10, 
             flexDirection: 'row', 
             alignItems: 'center', 
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
            },

    count: {fontSize: 18, 
            marginBottom: 20, 
            padding: 10, 
            borderRadius: 8, 
            flexDirection: 'row', 
            alignItems: 'center', 
            borderBlockColor: '#000', 
            borderWidth:  2
        },

    card: {backgroundColor: '#f9f9f9', 
           padding: 15, 
           borderRadius: 10, 
           marginBottom: 10,
           borderBlockColor: '#000', 
           borderWidth:  1.5,
        },
    
    pricing: {fontSize: 15, fontWeight: 'bold', marginTop: 5, textAlign: 'right',

    },

    name: {fontWeight: 'bold', 
           fontSize: 18 
        },

    noText: {textAlign: 'center', 

    }
});
