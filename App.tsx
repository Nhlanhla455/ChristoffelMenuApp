import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import FilterScreen from './screens/FilterScreen';
import { MenuItem } from './types/MenuItem';

// Define all the screens available in the app
export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // Global state - all menu items are stored here in an array
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Add a new item to the menu array
  const handleAddItem = (item: MenuItem): void => {
    setMenuItems((prev) => [...prev, item]);
  };

  // Remove an item from the menu array by its unique ID
  const handleRemoveItem = (id: string): void => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Home Screen - displays the full menu and stats */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              menuItems={menuItems}
            />
          )}
        </Stack.Screen>

        {/* Add Item Screen - add new dishes and remove existing ones */}
        <Stack.Screen name="AddItem">
          {(props) => (
            <AddItemScreen
              {...props}
              menuItems={menuItems}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          )}
        </Stack.Screen>

        {/* Filter Screen - filter menu items by course */}
        <Stack.Screen name="Filter">
          {(props) => (
            <FilterScreen
              {...props}
              menuItems={menuItems}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}