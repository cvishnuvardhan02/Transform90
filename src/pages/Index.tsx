import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import UserForm from "@/components/UserForm";
import BodyComposition from "@/components/BodyComposition";
import GoalSelection from "@/components/GoalSelection";
import DietPreference from "@/components/DietPreference";
import MealPlan from "@/components/MealPlan";
import WorkoutPlan from "@/components/WorkoutPlan";
import ResultsSummary from "@/components/ResultsSummary";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";

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
  
  // Navigate to a specific step if data is available
  const navigateToStep = (targetStep: number) => {
    // Check if user has necessary data to access this step
    if (targetStep === 1) {
      setStep(1);
      return;
    }
    
    if (targetStep === 2) {
      if (userData.gender) {
        setStep(2);
      }
      return;
    }
    
    if (targetStep === 3) {
      if (userData.gender && userData.goal) {
        setStep(3);
      } else if (userData.gender) {
        setStep(2);
      }
      return;
    }
    
    if (targetStep === 4) {
      if (userData.gender && userData.goal && userData.dietPreference) {
        setStep(4);
      } else if (userData.gender && userData.goal) {
        setStep(3);
      } else if (userData.gender) {
        setStep(2);
      }
      return;
    }
  };
  
  // Get step name
  const getStepName = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Body Metrics";
      case 2:
        return "Body Composition & Goals";
      case 3:
        return "Diet Preference";
      case 4:
        return "Your 90-Day Plan";
      default:
        return "Unknown Step";
    }
  };
  
  // Check if a navigation step is accessible
  const isStepAccessible = (targetStep: number) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return !!userData.gender;
    if (targetStep === 3) return !!userData.gender && !!userData.goal;
    if (targetStep === 4) return !!userData.gender && !!userData.goal && !!userData.dietPreference;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Transform<span className="text-indigo-600">90</span></h1>
          <p className="text-xl text-blue-700">Your 90-day body transformation journey</p>
        </header>

        <div className="fixed top-4 right-4 z-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-white bg-opacity-90 shadow-lg">
                  <Menu className="mr-2" size={18} />
                  Navigate
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[220px] p-2">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <Button
                        key={stepNum}
                        variant={step === stepNum ? "default" : "ghost"}
                        className={`w-full justify-start mb-1 ${!isStepAccessible(stepNum) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => isStepAccessible(stepNum) && navigateToStep(stepNum)}
                        disabled={!isStepAccessible(stepNum)}
                      >
                        {stepNum}. {getStepName(stepNum)}
                      </Button>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2 relative">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className="flex flex-col items-center z-10"
                onClick={() => isStepAccessible(num) && navigateToStep(num)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 transform hover:scale-110 cursor-pointer
                    ${step >= num 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" 
                      : "bg-gray-200 text-gray-500"} 
                    ${!isStepAccessible(num) && "opacity-50 cursor-not-allowed hover:scale-100"}`}
                >
                  {num}
                </div>
                <span className="text-xs mt-1 text-gray-700 font-medium">
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
            <div className="absolute left-0 right-0 h-1 bg-gray-200 -z-10 top-5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                style={{width: `${((step - 1) / 3) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>

        <Card className="p-6 shadow-xl border-0 overflow-hidden relative bg-white bg-opacity-95 backdrop-blur-sm">
          <div className="animate-fade-in">
            {step === 1 && <UserForm onSubmit={handleUserDataSubmit} />}
            
            {step === 2 && (
              <>
                <BodyComposition userData={userData} />
                <GoalSelection onSelect={handleGoalSelect} />
                <div className="flex mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </>
            )}
            
            {step === 3 && (
              <>
                <DietPreference onSelect={handleDietSelect} />
                <div className="flex mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(2)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </>
            )}
            
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
                  <Button 
                    onClick={() => setStep(3)} 
                    variant="outline" 
                    className="mr-4 flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={resetForm} variant="outline" className="mr-4">
                    Start Over
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all">
                    Download Plan
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
