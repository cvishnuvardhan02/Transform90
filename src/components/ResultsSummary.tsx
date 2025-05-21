
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultsSummaryProps {
  userData: {
    gender: string;
    age: number;
    height: number;
    weight: number;
    bodyFat: number;
    goal: string;
    dietPreference: string;
    calorieIntake: number;
    proteinIntake: number;
    carbIntake: number;
    fatIntake: number;
  };
}

const ResultsSummary = ({ userData }: ResultsSummaryProps) => {
  const {
    gender,
    age,
    height,
    weight,
    goal,
    dietPreference,
    calorieIntake,
    proteinIntake,
    carbIntake,
    fatIntake,
  } = userData;

  const goalMap: Record<string, string> = {
    "lose-weight": "Lose Weight",
    "gain-muscle": "Gain Muscle",
    "lose-fat-gain-muscle": "Body Recomposition",
    "gain-weight": "Gain Weight",
  };

  const dietMap: Record<string, string> = {
    "vegan": "Vegan",
    "vegetarian": "Vegetarian",
    "eggetarian": "Eggetarian",
    "non-vegetarian": "Non-vegetarian",
  };

  // Calculate macros percentages
  const proteinCalories = proteinIntake * 4;
  const carbCalories = carbIntake * 4;
  const fatCalories = fatIntake * 9;
  
  const proteinPercentage = Math.round((proteinCalories / calorieIntake) * 100);
  const carbPercentage = Math.round((carbCalories / calorieIntake) * 100);
  const fatPercentage = Math.round((fatCalories / calorieIntake) * 100);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Your 90-Day Transformation Plan</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-y-3">
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Gender</span>
            <span className="font-medium capitalize">{gender}</span>
          </div>
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Age</span>
            <span className="font-medium">{age} years</span>
          </div>
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Height</span>
            <span className="font-medium">{height} cm</span>
          </div>
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Weight</span>
            <span className="font-medium">{weight} kg</span>
          </div>
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Goal</span>
            <span className="font-medium">{goalMap[goal]}</span>
          </div>
          <div className="w-1/2 sm:w-1/4 flex flex-col">
            <span className="text-sm text-gray-500">Diet</span>
            <span className="font-medium">{dietMap[dietPreference]}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-blue-900">Daily Nutrition Targets</h3>
        
        <Card className="p-5">
          <div className="text-3xl font-bold text-blue-900 mb-4">
            {calorieIntake} <span className="text-lg font-normal text-gray-500">calories/day</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="font-medium">Protein</div>
                <div className="text-gray-500">{proteinIntake}g ({proteinPercentage}%)</div>
              </div>
              <Progress value={proteinPercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="font-medium">Carbohydrates</div>
                <div className="text-gray-500">{carbIntake}g ({carbPercentage}%)</div>
              </div>
              <Progress value={carbPercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="font-medium">Fat</div>
                <div className="text-gray-500">{fatIntake}g ({fatPercentage}%)</div>
              </div>
              <Progress value={fatPercentage} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsSummary;
