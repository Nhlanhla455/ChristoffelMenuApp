import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { MenuItem, Course, COURSES } from '../types/MenuItem';
import { filterByCourse } from '../utils/menuUtils';
import MenuItemCard from '../components/MenuItemCard';

type FilterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Filter'>;
  menuItems: MenuItem[];
};

type FilterOption = Course | 'All';

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, menuItems }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const filteredItems = filterByCourse(menuItems, activeFilter);
  const filterOptions: FilterOption[] = ['All', ...COURSES];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b1b1b" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter by Course</Text>
      </View>

      <View style={styles.filterWrapper}>
        <Text style={styles.filterLabel}>SELECT A COURSE</Text>
        <View style={styles.filterContainer}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.filterBtn,
                activeFilter === option && styles.filterBtnActive,
              ]}
              onPress={() => setActiveFilter(option)}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  activeFilter === option && styles.filterBtnTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.resultText}>
          {filteredItems.length}{' '}
          {filteredItems.length === 1 ? 'dish' : 'dishes'} found
          {activeFilter !== 'All'
            ? ` in ${activeFilter}`
            : ' across all courses'}
        </Text>
      </View>

      {filteredItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyText}>No dishes in {activeFilter}</Text>
          <Text style={styles.emptySubText}>
            Add some {activeFilter.toLowerCase()} from the Manage Menu screen.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} showRemove={false} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
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
  filterWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 10,
  },
  filterContainer: { flexDirection: 'row', gap: 8 },
  filterBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  filterBtnActive: {
    backgroundColor: '#4a7c59',
    borderColor: '#4a7c59',
  },
  filterBtnText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filterBtnTextActive: { color: '#fff', fontWeight: '700' },
  resultRow: { paddingHorizontal: 20, paddingVertical: 12 },
  resultText: { fontSize: 13, color: '#888', fontStyle: 'italic' },
  listContent: { paddingBottom: 30 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyIcon: { fontSize: 50, marginBottom: 14 },
  emptyText: { fontSize: 18, fontWeight: '700', color: '#555' },
  emptySubText: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default FilterScreen;