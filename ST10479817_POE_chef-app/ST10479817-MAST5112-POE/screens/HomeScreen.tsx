import React from 'react';
import {View, Image, Text, FlatList, StyleSheet} from 'react-native';
import { useMenu } from '../MenuContext';


export default function HomeScreen() {

    const {menu} = useMenu();
    const totalItems = menu.length;
    

    // Calculating the Average Prices of each Course by Using a For Loop
    const calculateAverage = (course: string) => {
        let total = 0;
        let count = 0;

        for (let i = 0; i < menu.length; i++) {
            if (menu[i].course === course) {
                total += menu[i].price;
                count++;
            }
        }
        return count > 0 ? total / count : 0;
    };

    const avgStarters = calculateAverage('Starters');
    const avgMains = calculateAverage('Mains');
    const avgDesserts = calculateAverage('Desserts');

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png') } style={styles.image} />
                <Text style={styles.heading}>Christoffel's Menu</Text>
            </View>
                <Text style={styles.count}>Total Menu Items: {totalItems}</Text>

                <View style={styles.averageContainer}>
                    <Text style={styles.averageHeader}> Average Price by Course</Text>
                    <View style={styles.averageRow}>
                        <Text>Starters:</Text>
                        <Text>R{avgStarters ? avgStarters.toFixed(2) : '0.00'}</Text>
                    </View>
                    <View style={styles.averageRow}>
                        <Text>Mains:</Text>
                        <Text>R{avgMains ? avgMains.toFixed(2) : '0.00'}</Text>
                    </View>
                    <View style={styles.averageRow}>
                        <Text>Desserts:</Text>
                        <Text>R{avgDesserts ? avgDesserts.toFixed(2) : '0.00'}</Text>
                    </View>
                </View>

                <FlatList data={menu} keyExtractor={item => item.id.toString()} renderItem={({item}) =>(
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
                ListEmptyComponent={<Text style={styles.noText}>No dishes added yet.</Text>}
                />
        </View>

    );
}

// Stylesheet Container 
const styles = StyleSheet.create({

    averageContainer: {borderRadius: 8,
                        marginBottom: 1,  
                        borderBlockColor: '#000', 
                        borderWidth:  2,
                        padding: 15
            },

    averageHeader: {fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 5,
                   },
            
    averageRow: {flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 3,
                },

    
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
            marginBottom: 10, 
            padding: 10, 
            borderRadius: 8, 
            flexDirection: 'row', 
            alignItems: 'center', 
            borderBlockColor: '#000', 
            borderWidth:  2
        },

    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        alignItems: 'center'
    },

    card: {backgroundColor: '#f9f9f9', 
           padding: 10, 
           borderRadius: 10, 
           marginBottom: 10,
           borderBlockColor: '#000', 
           borderWidth:  1.5,
        },
    
    pricing: {fontSize: 16, 
            fontWeight: 'bold', 
            marginTop: 5, 
            textAlign: 'left',
            },

    name: {fontWeight: 'bold', 
           fontSize: 20 
        },

    noText: {textAlign: 'center', 
    }
});
