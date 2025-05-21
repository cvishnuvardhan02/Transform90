
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MealPlanProps {
  userData: {
    dietPreference: string;
    calorieIntake: number;
    proteinIntake: number;
    carbIntake: number;
    fatIntake: number;
  };
}

interface MealData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

const MealPlan = ({ userData }: MealPlanProps) => {
  const [weekPhase, setWeekPhase] = useState("1-4");
  const { dietPreference } = userData;
  
  // Generate meal plans based on diet preference
  const getMealPlan = (phase: string) => {
    // These would typically come from a database or API
    // Simplified example with just breakfast options
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
            name: "Veggie and Cheese Omelette",
            calories: 350,
            protein: 24,
            carbs: 8,
            fat: 24,
            ingredients: [
              "3 eggs",
              "30g cheese",
              "1 cup mixed vegetables",
              "1 tsp olive oil",
              "Herbs and spices",
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
      },
    };

    return meals[dietPreference] || meals["non-vegetarian"];
  };

  const mealPlan = getMealPlan(weekPhase);
  
  const phases = [
    { id: "1-4", label: "Weeks 1-4" },
    { id: "5-8", label: "Weeks 5-8" },
    { id: "9-12", label: "Weeks 9-12" },
  ];

  return (
    <div className="space-y-4">
      <Tabs value={weekPhase} onValueChange={setWeekPhase}>
        <TabsList className="w-full">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="flex-1">
              {phase.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="breakfast">
                <AccordionTrigger>Breakfast</AccordionTrigger>
                <AccordionContent>
                  {mealPlan?.breakfast?.map((meal, index) => (
                    <div key={index} className="border rounded-md p-4 mb-3">
                      <h4 className="font-medium mb-2">{meal.name}</h4>
                      <div className="flex gap-3 text-sm mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {meal.calories} cal
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                          P: {meal.protein}g
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          C: {meal.carbs}g
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          F: {meal.fat}g
                        </span>
                      </div>
                      <div className="text-sm">
                        <h5 className="font-medium mb-1">Ingredients:</h5>
                        <ul className="list-disc pl-4 space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="lunch">
                <AccordionTrigger>Lunch</AccordionTrigger>
                <AccordionContent>
                  {mealPlan?.lunch?.map((meal, index) => (
                    <div key={index} className="border rounded-md p-4 mb-3">
                      <h4 className="font-medium mb-2">{meal.name}</h4>
                      <div className="flex gap-3 text-sm mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {meal.calories} cal
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                          P: {meal.protein}g
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          C: {meal.carbs}g
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          F: {meal.fat}g
                        </span>
                      </div>
                      <div className="text-sm">
                        <h5 className="font-medium mb-1">Ingredients:</h5>
                        <ul className="list-disc pl-4 space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dinner">
                <AccordionTrigger>Dinner</AccordionTrigger>
                <AccordionContent>
                  {mealPlan?.dinner?.map((meal, index) => (
                    <div key={index} className="border rounded-md p-4 mb-3">
                      <h4 className="font-medium mb-2">{meal.name}</h4>
                      <div className="flex gap-3 text-sm mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {meal.calories} cal
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                          P: {meal.protein}g
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          C: {meal.carbs}g
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          F: {meal.fat}g
                        </span>
                      </div>
                      <div className="text-sm">
                        <h5 className="font-medium mb-1">Ingredients:</h5>
                        <ul className="list-disc pl-4 space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MealPlan;
