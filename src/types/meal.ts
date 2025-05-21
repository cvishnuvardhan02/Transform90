
export interface MealData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

export interface UserData {
  dietPreference: string;
  calorieIntake: number;
  proteinIntake: number;
  carbIntake: number;
  fatIntake: number;
  weight: number;
}
