import tomYumImg from './assets/tom-yum.jpg';
import greenCurryImg from './assets/green-curry.jpg';
import padThaiImg from './assets/pad-thai.jpg';
import mangoStickyRiceImg from './assets/mango-sticky-rice.jpg';

export const MENU_DATA = [
    // APPETIZERS
    {
        id: "pork-spring-roll",
        name: "Pork Spring Roll",
        category: "Appetizers",
        price: 6.82,
        description: "Filled with ground pork, cabbage, carrots, glass noodles, deep fried until crisp and served with sweet chili sauce.",
        tags: []
    },
    {
        id: "veggie-spring-roll",
        name: "Veggie Spring Roll",
        category: "Appetizers",
        price: 6.05,
        description: "Filled with cabbage, carrots, glass noodles, deep fried until crisp and served with sweet chili sauce.",
        tags: ["Vegetarian", "Vegan"]
    },
    {
        id: "golden-fried-tofu",
        name: "Golden Fried Tofu",
        category: "Appetizers",
        price: 6.93,
        description: "Fried tofu served with ground peanut on sweet chili sauce.",
        tags: ["Vegetarian", "Vegan"]
    },
    {
        id: "crispy-shrimp-wraps",
        name: "Crispy Shrimp Wraps",
        category: "Appetizers",
        price: 8.03,
        description: "Shrimp hand-wrapped in a delicate pastry sheet, served with sweet chili sauce.",
        tags: []
    },
    {
        id: "fried-calamari",
        name: "Fried Calamari",
        category: "Appetizers",
        price: 9.90,
        description: "Fried crispy calamari served with sweet chili sauce.",
        tags: []
    },
    {
        id: "chicken-satay",
        name: "Chicken Satay",
        category: "Appetizers",
        price: 11.00,
        description: "Grilled skewered chicken served with peanut sauce.",
        tags: []
    },
    {
        id: "thai-glazed-chicken-wings",
        name: "Thai Glazed Chicken Wings",
        category: "Appetizers",
        price: 12.21,
        description: "Deep fried marinated chicken wings and glazed it off with our homemade sauce.",
        tags: []
    },
    {
        id: "vegetable-dumplings",
        name: "Vegetable Dumplings",
        category: "Appetizers",
        price: 6.82,
        description: "Pan fried mixed vegetable dumpling served with garlic sweet soy sauce.",
        tags: []
    },
    {
        id: "pork-dumplings",
        name: "Pork Dumplings",
        category: "Appetizers",
        price: 6.82,
        description: "Pan fried pork dumpling served with garlic sweet soy sauce.",
        tags: []
    },
    {
        id: "shrimp-dumplings",
        name: "Shrimp Dumplings",
        category: "Appetizers",
        price: 7.92,
        description: "Steamed shrimp shumai dumpling served with garlic sweet soy sauce.",
        tags: []
    },
    {
        id: "chive-cakes",
        name: "Chive Cakes",
        category: "Appetizers",
        price: 8.03,
        description: "Deep fried vegetarian chives triangle cakes served with garlic sweet soy sauce.",
        tags: ["Vegetarian", "Vegan"]
    },
    {
        id: "chive-dumplings",
        name: "Chive Dumplings",
        category: "Appetizers",
        price: 8.03,
        description: "Pan fried vegetarian chive dumplings served with garlic sweet soy sauce.",
        tags: ["Vegetarian", "Vegan"]
    },
    {
        id: "coconut-butterfly-shrimp",
        name: "Coconut Butterfly Shrimp",
        category: "Appetizers",
        price: 7.59,
        description: "4 pieces of fried coconut butterfly shrimp.",
        tags: []
    },

    // SALADS
    {
        id: "laab-salad",
        name: "Laab Salad",
        category: "Salads",
        price: 13.75,
        description: "Your choice of ground meat (Chicken, Beef, or Pork), rice powder, lime, fish sauce, mint leaves, chili flakes, cilantro, scallion, and red onion.",
        tags: ["Mild"]
    },
    {
        id: "thai-papaya-salad",
        name: "Thai Papaya Salad",
        category: "Salads",
        price: 12.10,
        description: "Green papaya, carrots, peanuts, long bean, tomato, lime, fish sauce, Thai chili, palm sugar, and ground dried shrimp.",
        tags: ["Mild"]
    },
    {
        id: "thai-salad-peanut-sauce",
        name: "Thai Salad w/ Peanut Sauce",
        category: "Salads",
        price: 10.45,
        description: "Romaine lettuce, carrots, cucumber, tomatoes, boiled egg, fried tofu, green onions, and cilantro.",
        tags: []
    },

    // SOUPS
    {
        id: "tom-yum-soup",
        name: "Tom Yum Soup",
        category: "Soups",
        price: 5.83,
        description: "Lemongrass spicy and sour soup with red onion, mushrooms, galangal, basil, cilantro, scallions, and lime leaves.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "tom-kha-soup",
        name: "Tom Kha Soup",
        category: "Soups",
        price: 5.83,
        description: "Thai style coconut soup with mushrooms, galangal, onions, scallions, and lime leaves.",
        tags: [],
        hasAddons: true
    },

    // NOODLE SOUP
    {
        id: "tom-yum-noodle-soup",
        name: "Tom Yum Noodle Soup",
        category: "Noodle Soup",
        price: 17.93,
        description: "Premium rice noodles in large tom yum broth with boiled egg, bean sprouts, onion, mushrooms, galangal, basil, cilantro, scallions, and lime leaves.",
        tags: ["Mild"],
        hasAddons: true,
        image: tomYumImg
    },
    {
        id: "coconut-noodle-soup",
        name: "Coconut Noodle Soup",
        category: "Noodle Soup",
        price: 17.93,
        description: "Premium vermicelli white noodles in large coconut noodle broth, shrimp paste, boiled egg, bean sprouts, scallions, cilantro, carrot, napa cabbage, onion, and mushroom.",
        tags: [],
        hasAddons: true
    },
    {
        id: "curry-noodle-soup",
        name: "Curry Noodle Soup",
        category: "Noodle Soup",
        price: 17.05,
        description: "Premium rice noodle with a choice of your favorite curry.",
        tags: [],
        hasAddons: true
    },

    // CURRIES
    {
        id: "massaman-curry",
        name: "Massaman Curry",
        category: "Curries",
        price: 14.85,
        description: "Massaman curry paste, coconut milk, broccoli, carrot, napa, and onion.",
        tags: [],
        hasAddons: true
    },
    {
        id: "panang-curry",
        name: "Panang Curry",
        category: "Curries",
        price: 14.85,
        description: "Panang curry paste, coconut milk, broccoli, carrot, napa, bell peppers, and fresh basil.",
        tags: [],
        hasAddons: true
    },
    {
        id: "green-curry",
        name: "Green Curry",
        category: "Curries",
        price: 14.85,
        description: "Green curry paste, coconut milk, bamboo shoot, bell pepper, green pepper, green bean, eggplant, and fresh basil.",
        tags: ["Mild"],
        hasAddons: true,
        image: greenCurryImg
    },
    {
        id: "red-curry",
        name: "Red Curry",
        category: "Curries",
        price: 14.85,
        description: "Red curry paste, coconut milk, bamboo shoot, bell pepper, green pepper, green bean, eggplant, and fresh basil.",
        tags: ["Mild"],
        hasAddons: true
    },

    // SAUTÉED
    {
        id: "thai-ginger",
        name: "Thai Ginger",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, chopped fresh ginger, mushroom, carrots, onion, scallion, celery, and bell pepper.",
        tags: [],
        hasAddons: true
    },
    {
        id: "basil-sauteed",
        name: "Basil Sautéed",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, onion, bell pepper, green pepper, and string bean.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "eggplant-basil",
        name: "Eggplant Basil",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, onion, bell pepper, green pepper, eggplant, broccoli, and carrot.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "ground-meat-basil",
        name: "Ground Meat Basil",
        category: "Sautéed",
        price: 14.52,
        description: "Your choice of ground meat (Chicken, Beef, or Pork), garlic, onion, bell pepper, green pepper, string bean, with a fried egg on top.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "cashew-nut",
        name: "Cashew Nut",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, onion, carrots, broccoli, bell pepper, scallions, celery, mushroom, and cashew nuts.",
        tags: [],
        hasAddons: true
    },
    {
        id: "pad-prik-king",
        name: "Pad Prik King",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, green bean, carrots, bell pepper, green pepper, and snow peas.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "mixed-veg-sauteed",
        name: "Mixed Veggies Sautéed",
        category: "Sautéed",
        price: 14.52,
        description: "Garlic, napa, carrots, green beans, broccoli, and zucchini.",
        tags: [],
        hasAddons: true
    },

    // STIR FRIED NOODLE
    {
        id: "pad-thai",
        name: "Pad Thai",
        category: "Stir Fried Noodle",
        price: 14.52,
        description: "Thin noodle, egg, bean sprouts, peanut, scallion, red onion, and tofu.",
        tags: [],
        hasAddons: true,
        image: padThaiImg
    },
    {
        id: "drunken-noodle",
        name: "Drunken Noodle",
        category: "Stir Fried Noodle",
        price: 14.52,
        description: "Flat rice noodles, egg, onion, bell pepper, zucchini, napa, carrot, green bean, broccoli, basil, and tomato.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "pad-see-ew",
        name: "Pad See Ew",
        category: "Stir Fried Noodle",
        price: 14.52,
        description: "Flat rice noodles, egg, and Chinese broccoli.",
        tags: [],
        hasAddons: true
    },
    {
        id: "thai-street-noodle",
        name: "Thai Street Noodle",
        category: "Stir Fried Noodle",
        price: 14.52,
        description: "Wheat noodles, egg, carrots, cabbage, onion, scallion, cilantro, with a fried egg on top.",
        tags: [],
        hasAddons: true
    },
    {
        id: "pad-sukiyaki-noodle",
        name: "Pad Sukiyaki Noodle",
        category: "Stir Fried Noodle",
        price: 14.52,
        description: "Clear noodles, egg, Chinese broccoli, napa, and carrots.",
        tags: ["Mild"],
        hasAddons: true
    },

    // FRIED RICE
    {
        id: "thai-fried-rice",
        name: "Thai Fried Rice",
        category: "Fried Rice",
        price: 14.52,
        description: "Sautéed rice, egg, onions, tomatoes, Chinese broccoli, cilantro, and scallion.",
        tags: [],
        hasAddons: true
    },
    {
        id: "pineapple-fried-rice",
        name: "Pineapple Fried Rice",
        category: "Fried Rice",
        price: 14.52,
        description: "Sautéed rice, egg, onions, pineapples, raisins, cashew nuts, cilantro, and scallion.",
        tags: [],
        hasAddons: true
    },
    {
        id: "green-curry-fried-rice",
        name: "Green Curry Fried Rice",
        category: "Fried Rice",
        price: 14.52,
        description: "Sautéed rice, egg, onions, carrots, green beans, basil, bell pepper, and lemongrass leaves.",
        tags: ["Mild"],
        hasAddons: true
    },
    {
        id: "basil-fried-rice",
        name: "Basil Fried Rice",
        category: "Fried Rice",
        price: 14.52,
        description: "Sautéed rice, egg, chili bean paste, onions, snow peas, bell pepper, and lemongrass leaves.",
        tags: ["Mild"],
        hasAddons: true
    },

    // SIDE ORDERS
    {
        id: "thai-jasmine-rice",
        name: "Thai Jasmine Rice",
        category: "Side Orders",
        price: 2.20,
        description: "Steamed premium fragrant jasmine rice.",
        tags: []
    },
    {
        id: "steamed-rice-noodles",
        name: "Steamed Rice Noodles",
        category: "Side Orders",
        price: 3.30,
        description: "Steamed tender rice noodles.",
        tags: []
    },
    {
        id: "mixed-vegetables",
        name: "Mixed Vegetables",
        category: "Side Orders",
        price: 4.40,
        description: "Napa, carrot, green beans, broccoli, and zucchini.",
        tags: []
    },

    // DESSERTS
    {
        id: "mango-sticky-rice",
        name: "Mango Sticky Rice",
        category: "Desserts",
        price: 6.60,
        description: "Fresh sweet mango slices with warm steamed coconut sticky rice.",
        tags: ["Vegetarian", "Vegan"],
        image: mangoStickyRiceImg
    },
    {
        id: "banana-dumpling",
        name: "Banana Dumpling",
        category: "Desserts",
        price: 6.60,
        description: "2 pieces of steamed coconut sticky rice and banana wrapped in banana leaves.",
        tags: []
    },
    {
        id: "fried-chocolate-banana-wrap",
        name: "Fried Chocolate Banana Wrap",
        category: "Desserts",
        price: 6.60,
        description: "3 pieces with chocolate sauce and peanuts on top.",
        tags: []
    },

    // DRINKS
    {
        id: "thai-iced-tea",
        name: "Thai Iced Tea",
        category: "Drinks",
        price: 5.50,
        description: "Traditional sweet Thai tea served cold with creamy half-and-half milk.",
        tags: []
    },
    {
        id: "coconut-juice",
        name: "Coconut Juice",
        category: "Drinks",
        price: 3.85,
        description: "Chilled canned coconut juice (12oz).",
        tags: []
    },
    {
        id: "mango-juice",
        name: "Mango Juice",
        category: "Drinks",
        price: 3.85,
        description: "Chilled canned mango juice (12oz).",
        tags: []
    },
    {
        id: "coke",
        name: "Coke",
        category: "Drinks",
        price: 2.20,
        description: "Chilled canned Coca-Cola (12oz).",
        tags: []
    },
    {
        id: "diet-coke",
        name: "Diet Coke",
        category: "Drinks",
        price: 2.20,
        description: "Chilled canned Diet Coke (12oz).",
        tags: []
    },
    {
        id: "ginger-ale",
        name: "Ginger Ale",
        category: "Drinks",
        price: 2.20,
        description: "Chilled canned Ginger Ale (12oz).",
        tags: []
    },
    {
        id: "sprite",
        name: "Sprite",
        category: "Drinks",
        price: 2.20,
        description: "Chilled canned Sprite (12oz).",
        tags: []
    },
    {
        id: "bottled-water",
        name: "Bottled Water",
        category: "Drinks",
        price: 1.65,
        description: "Refreshing cold bottled spring water.",
        tags: []
    }
];
