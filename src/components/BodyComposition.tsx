
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Weight, Dumbbell, Activity } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
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
  
  // Get body type for visualization
  const getBodyType = () => {
    if (bmi < 18.5) return "slim";
    if (bmi < 25) return "fit";
    if (bmi < 30) return "overweight";
    return "obese";
  };
  
  const bodyType = getBodyType();
  
  return (
    <div className="mb-8 transition-opacity duration-700 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Body Composition</h2>
      
      <div className="mb-8">
        <Card className="p-5 shadow-lg rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative">
                {gender === "male" ? (
                  <svg viewBox="0 0 100 200" width="120" height="240" className="transform transition-all duration-500 hover:scale-105">
                    {/* Male silhouette with different shapes based on body type */}
                    {bodyType === "slim" && (
                      <g>
                        <circle cx="50" cy="30" r="20" fill="#a3c2ff" />
                        <rect x="40" y="50" width="20" height="60" rx="5" fill="#a3c2ff" />
                        <rect x="38" y="110" width="10" height="70" rx="3" fill="#a3c2ff" />
                        <rect x="52" y="110" width="10" height="70" rx="3" fill="#a3c2ff" />
                        <path d="M40,50 Q50,60 60,50" stroke="#7e9edb" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "fit" && (
                      <g>
                        <circle cx="50" cy="30" r="20" fill="#68d391" />
                        <path d="M35,50 L65,50 L60,110 L40,110 Z" fill="#68d391" />
                        <rect x="38" y="110" width="10" height="70" rx="3" fill="#68d391" />
                        <rect x="52" y="110" width="10" height="70" rx="3" fill="#68d391" />
                        <path d="M40,60 Q50,65 60,60" stroke="#3d9970" fill="none" strokeWidth="2" />
                        <path d="M35,75 Q50,80 65,75" stroke="#3d9970" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "overweight" && (
                      <g>
                        <circle cx="50" cy="30" r="22" fill="#fbd38d" />
                        <path d="M28,55 Q50,65 72,55 L70,110 Q50,120 30,110 Z" fill="#fbd38d" />
                        <rect x="38" y="110" width="10" height="70" rx="3" fill="#fbd38d" />
                        <rect x="52" y="110" width="10" height="70" rx="3" fill="#fbd38d" />
                        <path d="M35,75 Q50,85 65,75" stroke="#ed8936" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "obese" && (
                      <g>
                        <circle cx="50" cy="30" r="24" fill="#fed7d7" />
                        <path d="M25,60 Q50,75 75,60 L72,115 Q50,125 28,115 Z" fill="#fed7d7" />
                        <rect x="36" y="115" width="12" height="65" rx="4" fill="#fed7d7" />
                        <rect x="52" y="115" width="12" height="65" rx="4" fill="#fed7d7" />
                        <path d="M35,80 Q50,90 65,80" stroke="#e53e3e" fill="none" strokeWidth="2" />
                      </g>
                    )}
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 200" width="120" height="240" className="transform transition-all duration-500 hover:scale-105">
                    {/* Female silhouette with different shapes based on body type */}
                    {bodyType === "slim" && (
                      <g>
                        <circle cx="50" cy="25" r="18" fill="#ffc0cb" />
                        <path d="M38,43 L62,43 L58,105 Q50,110 42,105 Z" fill="#ffc0cb" />
                        <rect x="42" y="105" width="8" height="75" rx="4" fill="#ffc0cb" />
                        <rect x="50" y="105" width="8" height="75" rx="4" fill="#ffc0cb" />
                        <path d="M38,60 Q50,65 62,60" stroke="#e887a5" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "fit" && (
                      <g>
                        <circle cx="50" cy="25" r="18" fill="#68d391" />
                        <path d="M35,43 L65,43 L62,105 Q50,112 38,105 Z" fill="#68d391" />
                        <rect x="40" y="105" width="9" height="75" rx="4" fill="#68d391" />
                        <rect x="51" y="105" width="9" height="75" rx="4" fill="#68d391" />
                        <path d="M35,58 Q50,65 65,58" stroke="#3d9970" fill="none" strokeWidth="2" />
                        <path d="M38,75 Q50,85 62,75" stroke="#3d9970" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "overweight" && (
                      <g>
                        <circle cx="50" cy="25" r="20" fill="#fbd38d" />
                        <path d="M30,48 Q50,58 70,48 L68,110 Q50,118 32,110 Z" fill="#fbd38d" />
                        <rect x="40" y="110" width="9" height="70" rx="4" fill="#fbd38d" />
                        <rect x="51" y="110" width="9" height="70" rx="4" fill="#fbd38d" />
                        <path d="M35,65 Q50,75 65,65" stroke="#ed8936" fill="none" strokeWidth="2" />
                        <path d="M35,85 Q50,95 65,85" stroke="#ed8936" fill="none" strokeWidth="2" />
                      </g>
                    )}
                    {bodyType === "obese" && (
                      <g>
                        <circle cx="50" cy="25" r="22" fill="#fed7d7" />
                        <path d="M25,50 Q50,65 75,50 L72,115 Q50,125 28,115 Z" fill="#fed7d7" />
                        <rect x="38" y="115" width="10" height="65" rx="4" fill="#fed7d7" />
                        <rect x="52" y="115" width="10" height="65" rx="4" fill="#fed7d7" />
                        <path d="M35,70 Q50,80 65,70" stroke="#e53e3e" fill="none" strokeWidth="2" />
                        <path d="M35,90 Q50,105 65,90" stroke="#e53e3e" fill="none" strokeWidth="2" />
                      </g>
                    )}
                  </svg>
                )}
                <div className="absolute bottom-0 left-0 right-0 text-center font-medium text-gray-600">
                  {bmiCategory.label} Body Type
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <p className="text-gray-600 mb-3">
                Based on your metrics, you have a <span className={`font-bold ${bmiCategory.color}`}>{bmiCategory.label.toLowerCase()}</span> body 
                type with a <span className={`font-bold ${bodyFatCategory.color}`}>{bodyFatCategory.label.toLowerCase()}</span> body fat percentage.
                {bmi > 25 ? 
                  " Your body stores excess fat primarily in the mid-section." : 
                  bmi < 18.5 ? 
                  " You may benefit from increasing muscle mass and healthy weight." : 
                  " Your body composition is within healthy parameters."}
              </p>
              
              <div className="w-full bg-blue-100 rounded-full h-3 mb-4">
                <div 
                  className={`${bmi < 18.5 ? 'bg-blue-500' : bmi < 25 ? 'bg-green-500' : bmi < 30 ? 'bg-yellow-500' : 'bg-red-500'} h-3 rounded-full`} 
                  style={{ width: `${Math.min(((bmi) / 40) * 100, 100)}%`, transition: "width 1s ease-in-out" }}
                ></div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-5 shadow-md flex flex-col transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
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
        
        <Card className="p-5 shadow-md flex flex-col transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
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
        <Card className="p-5 shadow-md flex items-center transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <Dumbbell className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Estimated Muscle Mass</div>
            <div className="text-xl font-bold">{muscleMass} kg</div>
          </div>
        </Card>
        
        <Card className="p-5 shadow-md flex items-center transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
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
