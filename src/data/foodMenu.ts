export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  serves: number;
  minOrder?: number;
};

export type MenuCategory = {
  [category: string]: MenuItem[];
};

export const MENU_DATA: MenuCategory = {
  "Starters": [
    { "name": "Gobi Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Mushroom Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Baby Corn Manchurian", "description": "Available in Chilli or Pepper style", "price": 200, "serves": 2 },
    { "name": "Paneer Manchurian", "description": "Available in Chilli or Pepper style", "price": 250, "serves": 2 }
  ],
  "Main Course": [
    { "name": "South Indian Meals", "description": "Includes Rice roti, Rice, Veg stir-fry, Payasam, Sambar, Chutney, Salad & Pickle", "price": 200, "serves": 1, "minOrder": 3 },
    { "name": "Chapathi", "description": "Soft whole wheat flatbread", "price": 30, "serves": 1 },
    { "name": "Mushroom Masala", "description": "Rich tomato-onion gravy with fresh mushrooms", "price": 200, "serves": 2 },
    { "name": "Paneer Masala", "description": "Cottage cheese in a creamy, spiced tomato gravy", "price": 250, "serves": 2 },
    { "name": "Veg Kurma", "description": "Mixed vegetables in a coconut-based curry", "price": 180, "serves": 2 },
    { "name": "Palak Paneer", "description": "Cottage cheese cubes in a smooth spinach gravy", "price": 250, "serves": 2 },
    { "name": "Dal Fry", "description": "Tempered yellow lentils with aromatic spices", "price": 150, "serves": 2 },
    { "name": "Aloo Gobi Masala", "description": "Potato and cauliflower cooked with Indian spices", "price": 150, "serves": 2 }
  ],
  "Rice Items": [
    { "name": "White Rice", "description": "Steamed sona masuri rice", "price": 100, "serves": 2 },
    { "name": "Tomato Rice", "description": "Tangy and spicy rice cooked with tomatoes", "price": 100, "serves": 2 },
    { "name": "Curd Rice", "description": "Cooling yogurt rice tempered with mustard and curry leaves", "price": 100, "serves": 2 },
    { "name": "Jeera Rice", "description": "Rice flavored with cumin seeds", "price": 100, "serves": 2 },
    { "name": "Lemon Rice", "description": "Zesty rice flavored with lemon and peanuts", "price": 100, "serves": 2 }
  ],
  "Noodles": [
    { "name": "Veg Noodles", "description": "Stir-fried noodles with crunchy vegetables", "price": 150, "serves": 2 }
  ]
};

export const CATEGORIES = Object.keys(MENU_DATA);
export const VENDOR_PHONE_NUMBER = "919482214882";

