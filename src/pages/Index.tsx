
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserForm from "@/components/UserForm";
import BodyComposition from "@/components/BodyComposition";
import GoalSelection from "@/components/GoalSelection";
import DietPreference from "@/components/DietPreference";
import MealPlan from "@/components/MealPlan";
import WorkoutPlan from "@/components/WorkoutPlan";
import ResultsSummary from "@/components/ResultsSummary";

const Index = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    gender: "",
    age: 30,
    height: 170,
    weight: 70,
    bodyFat: 0,
    goal: "",
    dietPreference: "",
    calorieIntake: 0,
    proteinIntake: 0,
    carbIntake: 0,
    fatIntake: 0,
  });

  const calculateBodyFat = (gender: string, height: number, weight: number) => {
    // This is a simplified BMI-based estimation
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (gender === "male") {
      return Math.min(Math.max((1.2 * bmi) + (0.23 * 30) - 16.2, 5), 40);
    } else {
      return Math.min(Math.max((1.2 * bmi) + (0.23 * 30) - 5.4, 12), 45);
    }
  };

  const calculateCalories = (gender: string, height: number, weight: number, age: number, goal: string) => {
    // Harris-Benedict equation for BMR
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    // Activity multiplier (assuming moderate activity)
    const activityMultiplier = 1.55;
    let tdee = bmr * activityMultiplier;
    
    // Adjust based on goal
    switch (goal) {
      case "lose-weight":
        return Math.round(tdee - 500);
      case "gain-muscle":
        return Math.round(tdee + 300);
      case "lose-fat-gain-muscle":
        return Math.round(tdee);
      case "gain-weight":
        return Math.round(tdee + 500);
      default:
        return Math.round(tdee);
    }
  };

  const calculateMacros = (calories: number, goal: string) => {
    let proteinPerKg, fatPercent, carbPercent;
    
    switch (goal) {
      case "lose-weight":
        proteinPerKg = 2.2; // Higher protein for preserving muscle during weight loss
        fatPercent = 0.25;
        carbPercent = 0.40;
        break;
      case "gain-muscle":
        proteinPerKg = 2.0;
        fatPercent = 0.25;
        carbPercent = 0.45;
        break;
      case "lose-fat-gain-muscle":
        proteinPerKg = 2.2;
        fatPercent = 0.25;
        carbPercent = 0.40;
        break;
      case "gain-weight":
        proteinPerKg = 1.8;
        fatPercent = 0.25;
        carbPercent = 0.55;
        break;
      default:
        proteinPerKg = 1.6;
        fatPercent = 0.30;
        carbPercent = 0.40;
    }
    
    const proteinGrams = Math.round(userData.weight * proteinPerKg);
    const proteinCals = proteinGrams * 4;
    
    const fatCals = calories * fatPercent;
    const fatGrams = Math.round(fatCals / 9);
    
    const carbCals = calories * carbPercent;
    const carbGrams = Math.round(carbCals / 4);
    
    return {
      proteinIntake: proteinGrams,
      carbIntake: carbGrams,
      fatIntake: fatGrams
    };
  };

  const handleUserDataSubmit = (data: any) => {
    const bodyFat = calculateBodyFat(data.gender, data.height, data.weight);
    setUserData({...userData, ...data, bodyFat});
    setStep(2);
  };

  const handleGoalSelect = (goal: string) => {
    const calories = calculateCalories(userData.gender, userData.height, userData.weight, userData.age, goal);
    const macros = calculateMacros(calories, goal);
    
    setUserData({
      ...userData, 
      goal,
      calorieIntake: calories,
      ...macros
    });
    setStep(3);
  };

  const handleDietSelect = (dietPreference: string) => {
    setUserData({...userData, dietPreference});
    setStep(4);
  };

  const resetForm = () => {
    setUserData({
      gender: "",
      age: 30,
      height: 170,
      weight: 70,
      bodyFat: 0,
      goal: "",
      dietPreference: "",
      calorieIntake: 0,
      proteinIntake: 0,
      carbIntake: 0,
      fatIntake: 0,
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Transform90</h1>
          <p className="text-xl text-blue-700">Your 90-day body transformation journey</p>
        </header>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold 
                    ${step >= num ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {num}
                </div>
                <span className="text-xs mt-1 text-gray-500">
                  {num === 1
                    ? "Metrics"
                    : num === 2
                    ? "Goals"
                    : num === 3
                    ? "Diet"
                    : "Plan"}
                </span>
              </div>
            ))}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 -z-10">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{width: `${((step - 1) / 3) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>

        <Card className="p-6 shadow-xl">
          {step === 1 && <UserForm onSubmit={handleUserDataSubmit} />}
          
          {step === 2 && (
            <>
              <BodyComposition userData={userData} />
              <GoalSelection onSelect={handleGoalSelect} />
            </>
          )}
          
          {step === 3 && <DietPreference onSelect={handleDietSelect} />}
          
          {step === 4 && (
            <>
              <ResultsSummary userData={userData} />
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-900">Your 90-Day Meal Plan</h3>
                  <MealPlan userData={userData} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-900">Your 90-Day Workout Plan</h3>
                  <WorkoutPlan userData={userData} />
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button onClick={resetForm} variant="outline" className="mr-4">
                  Start Over
                </Button>
                <Button>Download Plan</Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
