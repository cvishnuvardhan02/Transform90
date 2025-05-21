
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Weight, Dumbbell, Activity } from "lucide-react";

interface BodyCompositionProps {
  userData: {
    gender: string;
    height: number;
    weight: number;
    bodyFat: number;
  };
}

const BodyComposition = ({ userData }: BodyCompositionProps) => {
  const { gender, height, weight, bodyFat } = userData;
  
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-500" };
    return { label: "Obese", color: "text-red-500" };
  };
  
  const getBodyFatCategory = (bf: number, gender: string) => {
    if (gender === "male") {
      if (bf < 6) return { label: "Essential fat", color: "text-purple-500" };
      if (bf < 14) return { label: "Athletic", color: "text-green-500" };
      if (bf < 18) return { label: "Fit", color: "text-blue-500" };
      if (bf < 25) return { label: "Average", color: "text-yellow-500" };
      return { label: "Obese", color: "text-red-500" };
    } else {
      if (bf < 14) return { label: "Essential fat", color: "text-purple-500" };
      if (bf < 21) return { label: "Athletic", color: "text-green-500" };
      if (bf < 25) return { label: "Fit", color: "text-blue-500" };
      if (bf < 32) return { label: "Average", color: "text-yellow-500" };
      return { label: "Obese", color: "text-red-500" };
    }
  };
  
  const bmi = weight / Math.pow(height / 100, 2);
  const bmiCategory = getBmiCategory(bmi);
  const bodyFatCategory = getBodyFatCategory(bodyFat, gender);
  
  // Calculate ideal weight based on BMI of 22
  const idealWeight = Math.round(22 * Math.pow(height / 100, 2));
  
  // Calculate muscle mass (rough estimation)
  const muscleMass = Math.round(weight * (1 - bodyFat / 100) * 0.85);
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Body Composition</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-5 shadow-md flex flex-col">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Body Mass Index (BMI)</h3>
          </div>
          <div className="text-3xl font-bold mb-2">{bmi.toFixed(1)}</div>
          <div className={`text-sm ${bmiCategory.color} font-medium mb-4`}>
            {bmiCategory.label}
          </div>
          <Progress value={(bmi / 40) * 100} className="h-2" />
          <div className="mt-4 text-sm text-gray-600">
            Ideal weight range: {Math.round(18.5 * Math.pow(height / 100, 2))} - {Math.round(24.9 * Math.pow(height / 100, 2))} kg
          </div>
        </Card>
        
        <Card className="p-5 shadow-md flex flex-col">
          <div className="flex items-center mb-4">
            <div className="bg-orange-100 p-2 rounded-full mr-3">
              <Weight className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold">Body Fat Percentage</h3>
          </div>
          <div className="text-3xl font-bold mb-2">{bodyFat.toFixed(1)}%</div>
          <div className={`text-sm ${bodyFatCategory.color} font-medium mb-4`}>
            {bodyFatCategory.label}
          </div>
          <Progress value={(bodyFat / 40) * 100} className="h-2" />
          <div className="mt-4 text-sm text-gray-600">
            {gender === "male" ? "Healthy range: 10-20%" : "Healthy range: 18-28%"}
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 shadow-md flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <Dumbbell className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Estimated Muscle Mass</div>
            <div className="text-xl font-bold">{muscleMass} kg</div>
          </div>
        </Card>
        
        <Card className="p-5 shadow-md flex items-center">
          <div className="bg-red-100 p-2 rounded-full mr-4">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Ideal Body Weight</div>
            <div className="text-xl font-bold">{idealWeight} kg</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BodyComposition;
