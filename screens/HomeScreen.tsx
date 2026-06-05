import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import MenuItemCard from '../components/MenuItemCard';
import { MenuItem } from '../types/MenuItem';
import { calculateAveragePriceByCourse } from '../utils/menuUtils';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  menuItems: MenuItem[];
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, menuItems }) => {
  const avgByCourse = calculateAveragePriceByCourse(menuItems);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1b1b1b" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Christoffel's Menu</Text>
        <Text style={styles.headerSubtitle}>Private Culinary Experiences</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsHeading}>Menu Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{menuItems.length}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {avgByCourse.Starters > 0
                ? `R ${avgByCourse.Starters.toFixed(2)}`
                : '—'}
            </Text>
            <Text style={styles.statLabel}>Avg Starters</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {avgByCourse.Mains > 0
                ? `R ${avgByCourse.Mains.toFixed(2)}`
                : '—'}
            </Text>
            <Text style={styles.statLabel}>Avg Mains</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {avgByCourse.Dessert > 0
                ? `R ${avgByCourse.Dessert.toFixed(2)}`
                : '—'}
            </Text>
            <Text style={styles.statLabel}>Avg Dessert</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.navBtn, styles.manageBtn]}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Text style={styles.navBtnText}>＋ Manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, styles.filterBtn]}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.navBtnText}>🔍 Filter Menu</Text>
        </TouchableOpacity>
      </View>

      {menuItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🍽️</Text>
          <Text style={styles.emptyText}>No menu items yet</Text>
          <Text style={styles.emptySubText}>
            Tap "Manage Menu" to start adding dishes
          </Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
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
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    color: '#f5c842',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statsContainer: {
    backgroundColor: '#fff',
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statsHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  statsRow: { flexDirection: 'row' },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#fafaf8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statValue: { fontSize: 13, fontWeight: '800', color: '#1b1b1b' },
  statLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
    textAlign: 'center',
  },
  buttonRow: { flexDirection: 'row', padding: 14, gap: 10 },
  navBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  manageBtn: { backgroundColor: '#1b1b1b' },
  filterBtn: { backgroundColor: '#4a7c59' },
  navBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  listContent: { paddingBottom: 30, paddingTop: 4 },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#444' },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default HomeScreen;