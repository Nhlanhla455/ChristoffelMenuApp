import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../types/MenuItem';

interface MenuItemCardProps {
  item: MenuItem;
  onRemove?: (id: string) => void;
  showRemove?: boolean;
}

const courseColors: Record<string, string> = {
  Starters: '#e8f5e9',
  Mains: '#fff3e0',
  Dessert: '#fce4ec',
};

const courseBadgeColors: Record<string, string> = {
  Starters: '#2e7d32',
  Mains: '#e65100',
  Dessert: '#880e4f',
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onRemove,
  showRemove = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: courseColors[item.course] || '#f5f5f5' },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <View
          style={[
            styles.courseBadge,
            { backgroundColor: courseBadgeColors[item.course] || '#333' },
          ]}
        >
          <Text style={styles.courseText}>{item.course}</Text>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
        {showRemove && onRemove && (
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  courseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  courseText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 21,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  removeBtn: {
    backgroundColor: '#c62828',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default MenuItemCard;
