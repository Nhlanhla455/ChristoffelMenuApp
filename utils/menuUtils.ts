import { MenuItem, Course, COURSES } from '../types/MenuItem';

// Calculate the overall average price of all menu items
export function calculateAveragePrice(items: MenuItem[]): number {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return total / items.length;
}

// Calculate the average price separately for each course
export function calculateAveragePriceByCourse(
  items: MenuItem[]
): Record<Course, number> {
  const result: Record<Course, number> = {
    Starters: 0,
    Mains: 0,
    Dessert: 0,
  };

  // Loop through each course and calculate its average
  for (const course of COURSES) {
    const courseItems = items.filter((item) => item.course === course);
    if (courseItems.length > 0) {
      const total = courseItems.reduce((sum, item) => sum + item.price, 0);
      result[course] = total / courseItems.length;
    }
  }

  return result;
}

// Filter menu items by a specific course, or return all if 'All' is selected
export function filterByCourse(
  items: MenuItem[],
  course: Course | 'All'
): MenuItem[] {
  if (course === 'All') return items;
  return items.filter((item) => item.course === course);
}

// Generate a unique ID for each new menu item using timestamp and random string
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 7);
}