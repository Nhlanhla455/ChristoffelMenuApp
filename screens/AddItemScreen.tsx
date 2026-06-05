import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { MenuItem, Course, COURSES } from '../types/MenuItem';
import { generateId } from '../utils/menuUtils';
import MenuItemCard from '../components/MenuItemCard';

type AddItemScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddItem'>;
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (id: string) => void;
};

const AddItemScreen: React.FC<AddItemScreenProps> = ({
  navigation,
  menuItems,
  onAddItem,
  onRemoveItem,
}) => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('Starters');
  const [price, setPrice] = useState<string>('');

  const handleAdd = (): void => {
    if (!dishName.trim()) {
      Alert.alert('Missing Field', 'Please enter a dish name.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Missing Field', 'Please enter a description.');
      return;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price greater than 0.');
      return;
    }

    const newItem: MenuItem = {
      id: generateId(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: parseFloat(price),
    };

    onAddItem(newItem);
    setDishName('');
    setDescription('');
    setSelectedCourse('Starters');
    setPrice('');
    Alert.alert('Success! 🎉', `"${newItem.dishName}" has been added to the menu.`);
  };

  const handleRemove = (id: string): void => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onRemoveItem(id) },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1b1b1b" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Menu</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Add New Dish</Text>

          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="e.g. Grilled Salmon"
            placeholderTextColor="#bbb"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Pan-seared salmon with lemon butter sauce"
            placeholderTextColor="#bbb"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Select Course</Text>
          <View style={styles.courseRow}>
            {COURSES.map((course) => (
              <TouchableOpacity
                key={course}
                style={[
                  styles.courseBtn,
                  selectedCourse === course && styles.courseBtnActive,
                ]}
                onPress={() => setSelectedCourse(course)}
              >
                <Text
                  style={[
                    styles.courseBtnText,
                    selectedCourse === course && styles.courseBtnTextActive,
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="e.g. 185.00"
            placeholderTextColor="#bbb"
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>＋ Add to Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Current Menu</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{menuItems.length}</Text>
          </View>
        </View>

        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items added yet.</Text>
            <Text style={styles.emptySubText}>
              Use the form above to add your first dish.
            </Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              showRemove={true}
              onRemove={handleRemove}
            />
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  header: {
    backgroundColor: '#1b1b1b',
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c842',
  },
  backBtnText: { color: '#f5c842', fontSize: 14, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  scrollContent: { paddingBottom: 50 },
  formSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1b',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 6,
    marginTop: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1b1b1b',
    backgroundColor: '#fafafa',
  },
  multilineInput: { height: 90, textAlignVertical: 'top' },
  courseRow: { flexDirection: 'row', gap: 8 },
  courseBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  courseBtnActive: { backgroundColor: '#1b1b1b', borderColor: '#1b1b1b' },
  courseBtnText: { fontSize: 13, fontWeight: '600', color: '#777' },
  courseBtnTextActive: { color: '#f5c842' },
  addBtn: {
    backgroundColor: '#1b1b1b',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },
  addBtnText: { color: '#f5c842', fontSize: 16, fontWeight: '800' },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 10,
  },
  countBadge: {
    backgroundColor: '#1b1b1b',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  countBadgeText: { color: '#f5c842', fontWeight: '800', fontSize: 13 },
  emptyContainer: { alignItems: 'center', paddingVertical: 30 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#aaa' },
  emptySubText: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default AddItemScreen;