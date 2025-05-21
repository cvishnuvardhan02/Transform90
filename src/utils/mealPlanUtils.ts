
import { MealData } from "../types/meal";

// Generate meal plans based on diet preference
export const getMealPlan = (dietPreference: string) => {
  // These would typically come from a database or API
  const meals: { [key: string]: { [key: string]: MealData[] } } = {
    "vegan": {
      breakfast: [
        {
          name: "Protein-Packed Oatmeal Bowl",
          calories: 450,
          protein: 20,
          carbs: 65,
          fat: 12,
          ingredients: [
            "1 cup rolled oats",
            "1 scoop plant-based protein powder",
            "1 tbsp chia seeds",
            "1 banana",
            "1 tbsp almond butter",
            "Cinnamon to taste",
          ],
        },
        {
          name: "Tofu Scramble with Vegetables",
          calories: 380,
          protein: 22,
          carbs: 30,
          fat: 15,
          ingredients: [
            "200g firm tofu",
            "1 bell pepper",
            "1/2 onion",
            "1 cup spinach",
            "2 tbsp nutritional yeast",
            "Turmeric and spices",
            "1 slice whole grain toast",
          ],
        },
      ],
      lunch: [
        {
          name: "Quinoa Veggie Bowl",
          calories: 550,
          protein: 18,
          carbs: 70,
          fat: 20,
          ingredients: [
            "1 cup cooked quinoa",
            "1 cup roasted vegetables",
            "1/2 cup black beans",
            "1/4 avocado",
            "2 tbsp tahini dressing",
          ],
        },
      ],
      dinner: [
        {
          name: "Lentil and Vegetable Curry",
          calories: 480,
          protein: 24,
          carbs: 60,
          fat: 14,
          ingredients: [
            "1 cup cooked lentils",
            "Mixed vegetables (broccoli, carrots, peas)",
            "1/2 cup coconut milk",
            "Curry spices",
            "1/2 cup brown rice",
          ],
        },
      ],
      snacks: [
        {
          name: "Vegan Protein Shake",
          calories: 200,
          protein: 25,
          carbs: 10,
          fat: 3,
          ingredients: [
            "1 scoop vegan protein powder",
            "1 cup almond milk",
            "1/2 banana",
            "Ice cubes",
          ],
        },
        {
          name: "Edamame",
          calories: 180,
          protein: 17,
          carbs: 15,
          fat: 8,
          ingredients: [
            "1 cup edamame beans (shelled)",
            "Sea salt to taste",
          ],
        }
      ]
    },
    "vegetarian": {
      breakfast: [
        {
          name: "Greek Yogurt Parfait",
          calories: 420,
          protein: 25,
          carbs: 50,
          fat: 14,
          ingredients: [
            "1 cup Greek yogurt",
            "1/3 cup granola",
            "1 tbsp honey",
            "1 cup mixed berries",
            "1 tbsp mixed seeds",
          ],
        },
        {
          name: "Cottage Cheese with Fruit",
          calories: 350,
          protein: 28,
          carbs: 30,
          fat: 10,
          ingredients: [
            "1 cup cottage cheese",
            "1/2 cup pineapple chunks",
            "1/2 cup mixed berries",
            "1 tbsp honey",
            "1 tbsp walnuts",
          ],
        },
      ],
      lunch: [
        {
          name: "Mediterranean Salad with Falafel",
          calories: 520,
          protein: 22,
          carbs: 55,
          fat: 24,
          ingredients: [
            "4 falafel patties",
            "2 cups mixed greens",
            "50g feta cheese",
            "1/2 cup cherry tomatoes",
            "1/4 cucumber",
            "Olive oil and lemon dressing",
          ],
        },
      ],
      dinner: [
        {
          name: "Mushroom and Spinach Risotto",
          calories: 490,
          protein: 18,
          carbs: 65,
          fat: 16,
          ingredients: [
            "1 cup arborio rice",
            "2 cups mushrooms",
            "1 cup spinach",
            "30g parmesan cheese",
            "1 tbsp butter",
            "Vegetable broth",
          ],
        },
      ],
      snacks: [
        {
          name: "Whey Protein Shake",
          calories: 180,
          protein: 25,
          carbs: 6,
          fat: 3,
          ingredients: [
            "1 scoop whey protein powder",
            "1 cup milk",
            "Ice cubes",
          ],
        },
        {
          name: "Trail Mix with Nuts and Dried Fruit",
          calories: 220,
          protein: 8,
          carbs: 18,
          fat: 14,
          ingredients: [
            "1/4 cup mixed nuts",
            "2 tbsp dried cranberries",
            "1 tbsp dark chocolate pieces",
          ],
        }
      ]
    },
    "eggetarian": {
      breakfast: [
        {
          name: "Spinach and Egg Breakfast Wrap",
          calories: 390,
          protein: 26,
          carbs: 32,
          fat: 18,
          ingredients: [
            "2 eggs",
            "1 whole wheat tortilla",
            "1 cup spinach",
            "30g feta cheese",
            "1 tbsp olive oil",
          ],
        },
        {
          name: "Egg and Avocado Toast",
          calories: 380,
          protein: 18,
          carbs: 30,
          fat: 22,
          ingredients: [
            "2 eggs (poached or fried)",
            "2 slices whole grain bread",
            "1/2 avocado",
            "Cherry tomatoes",
            "Salt and pepper",
          ],
        },
      ],
      lunch: [
        {
          name: "Egg and Roasted Vegetable Bowl",
          calories: 470,
          protein: 24,
          carbs: 50,
          fat: 18,
          ingredients: [
            "2 hard-boiled eggs",
            "1 cup brown rice",
            "2 cups roasted vegetables",
            "1 tbsp olive oil",
            "Herbs and spices",
          ],
        },
      ],
      dinner: [
        {
          name: "Shakshuka with Whole Grain Bread",
          calories: 450,
          protein: 22,
          carbs: 40,
          fat: 20,
          ingredients: [
            "2 eggs",
            "2 cups tomato sauce with vegetables",
            "Spices (cumin, paprika)",
            "2 slices whole grain bread",
            "1 tbsp olive oil",
          ],
        },
      ],
      snacks: [
        {
          name: "Whey Protein Shake",
          calories: 180,
          protein: 25,
          carbs: 6,
          fat: 3,
          ingredients: [
            "1 scoop whey protein powder",
            "1 cup milk",
            "Ice cubes",
          ],
        },
        {
          name: "Hard-boiled Egg with Veggie Sticks",
          calories: 170,
          protein: 13,
          carbs: 5,
          fat: 10,
          ingredients: [
            "2 hard-boiled eggs",
            "Carrot and celery sticks",
            "2 tbsp hummus",
          ],
        }
      ]
    },
    "non-vegetarian": {
      breakfast: [
        {
          name: "Turkey and Egg Breakfast Bowl",
          calories: 420,
          protein: 35,
          carbs: 30,
          fat: 16,
          ingredients: [
            "100g lean ground turkey",
            "2 eggs",
            "1/2 cup sweet potatoes",
            "1 cup spinach",
            "1 tbsp olive oil",
            "Herbs and spices",
          ],
        },
        {
          name: "Protein Smoothie Bowl",
          calories: 400,
          protein: 30,
          carbs: 45,
          fat: 10,
          ingredients: [
            "1 scoop whey protein",
            "1 banana",
            "1 cup mixed berries",
            "1 cup almond milk",
            "1 tbsp nut butter",
            "1/4 cup granola topping",
          ],
        },
      ],
      lunch: [
        {
          name: "Grilled Chicken and Quinoa Salad",
          calories: 520,
          protein: 40,
          carbs: 45,
          fat: 18,
          ingredients: [
            "150g grilled chicken breast",
            "1 cup cooked quinoa",
            "2 cups mixed greens",
            "1/4 avocado",
            "Cherry tomatoes",
            "Lemon and olive oil dressing",
          ],
        },
      ],
      dinner: [
        {
          name: "Baked Salmon with Vegetables",
          calories: 490,
          protein: 38,
          carbs: 30,
          fat: 24,
          ingredients: [
            "150g salmon fillet",
            "1 cup roasted Brussels sprouts",
            "1/2 cup sweet potato",
            "1 tbsp olive oil",
            "Lemon and herbs",
          ],
        },
      ],
      snacks: [
        {
          name: "Whey Protein Shake",
          calories: 180,
          protein: 25,
          carbs: 6,
          fat: 3,
          ingredients: [
            "1 scoop whey protein powder",
            "1 cup milk",
            "Ice cubes",
          ],
        },
        {
          name: "Beef Jerky with Nuts",
          calories: 240,
          protein: 20,
          carbs: 6,
          fat: 16,
          ingredients: [
            "30g beef jerky",
            "15g mixed nuts",
          ],
        }
      ]
    },
  };

  return meals[dietPreference] || meals["non-vegetarian"];
};

// Calculate protein totals from the meal plan
export const calculateProteinTotal = (mealPlan: {
  [key: string]: MealData[];
} | undefined): number => {
  if (!mealPlan) return 0;
  
  let total = 0;
  if (mealPlan.breakfast) {
    total += mealPlan.breakfast[0]?.protein || 0;
  }
  if (mealPlan.lunch) {
    total += mealPlan.lunch[0]?.protein || 0;
  }
  if (mealPlan.dinner) {
    total += mealPlan.dinner[0]?.protein || 0;
  }
  if (mealPlan.snacks) {
    total += mealPlan.snacks[0]?.protein || 0;
    total += mealPlan.snacks[1]?.protein || 0;
  }
  
  return total;
};
