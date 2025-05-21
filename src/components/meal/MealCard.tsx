
import { MealData } from "@/types/meal";

interface MealCardProps {
  meal: MealData;
}

const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div className="border border-accent-secondary/60 rounded-md p-4 mb-3 transition-all hover:shadow-md hover:shadow-accent-primary/30 bg-dark-secondary/20">
      <h4 className="font-medium mb-2 text-accent-primary">{meal.name}</h4>
      <div className="flex flex-wrap gap-2 text-sm mb-3">
        <span className="bg-dark-secondary text-accent-primary px-2 py-1 rounded">
          {meal.calories} cal
        </span>
        <span className="bg-dark-secondary text-accent-primary px-2 py-1 rounded">
          P: {meal.protein}g
        </span>
        <span className="bg-dark-secondary text-accent-primary px-2 py-1 rounded">
          C: {meal.carbs}g
        </span>
        <span className="bg-dark-secondary text-accent-primary px-2 py-1 rounded">
          F: {meal.fat}g
        </span>
      </div>
      <div className="text-sm">
        <h5 className="font-medium mb-1 text-accent-secondary">Ingredients:</h5>
        <ul className="list-disc pl-4 space-y-1 text-foreground">
          {meal.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealCard;
