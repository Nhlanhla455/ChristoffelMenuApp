// Course type - only these three values are allowed
export type Course = 'Starters' | 'Mains' | 'Dessert';

// Interface defining the structure of a menu item
export interface MenuItem {
  id: string;        // Unique identifier for each item
  dishName: string;  // Name of the dish
  description: string; // Short description of the dish
  course: Course;    // Which course the dish belongs to
  price: number;     // Price in Rands
}

// Predefined list of courses the chef can choose from
export const COURSES: Course[] = ['Starters', 'Mains', 'Dessert'];