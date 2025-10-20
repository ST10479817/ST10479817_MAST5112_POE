import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddMenuScreen from './screens/AddMenuScreen';
import FilterScreen from './screens/FilterScreen';
import { Ionicons } from '@expo/vector-icons';
import { MenuProvider } from './MenuContext';

const Tab= createBottomTabNavigator();

export default function App() {
  return(
    <MenuProvider>
    
    <NavigationContainer>
      
      <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false, 
        tabBarIcon: ({ color, size}) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Add Menu') iconName = 'add-circle';
        else if (route.name === 'Filter') iconName = 'filter';
        return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Add Menu" component={AddMenuScreen}/>
      <Tab.Screen name="Filter" component={FilterScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
}