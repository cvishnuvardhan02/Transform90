
import { MealData } from "@/types/meal";

interface MealCardProps {
  meal: MealData;
}

const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div className="border rounded-md p-4 mb-3 transition-all hover:shadow-md">
      <h4 className="font-medium mb-2 text-blue-900">{meal.name}</h4>
      <div className="flex flex-wrap gap-2 text-sm mb-3">
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
  );
};

export default MealCard;
