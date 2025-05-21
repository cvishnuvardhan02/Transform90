
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Weight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface UserFormProps {
  onSubmit: (data: {
    gender: string;
    age: number;
    height: number;
    weight: number;
  }) => void;
}

// Constants for BMI calculation
const BMI_UNDERWEIGHT = 18.5;
const BMI_NORMAL_LOW = 18.5;
const BMI_NORMAL_HIGH = 24.9;
const BMI_OVERWEIGHT_LOW = 25;
const BMI_OVERWEIGHT_HIGH = 29.9;
const BMI_OBESE = 30;

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [error, setError] = useState("");
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiColor, setBmiColor] = useState("text-gray-500");
  
  // Animation timing
  const staggerDelay = 0.15;
  
  // Calculate BMI
  useEffect(() => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(Math.round(bmiValue * 10) / 10);
    
    // Set BMI category
    if (bmiValue < BMI_UNDERWEIGHT) {
      setBmiCategory("Underweight");
      setBmiColor("text-blue-500");
    } else if (bmiValue >= BMI_NORMAL_LOW && bmiValue <= BMI_NORMAL_HIGH) {
      setBmiCategory("Normal weight");
      setBmiColor("text-green-500");
    } else if (bmiValue >= BMI_OVERWEIGHT_LOW && bmiValue <= BMI_OVERWEIGHT_HIGH) {
      setBmiCategory("Overweight");
      setBmiColor("text-orange-500");
    } else if (bmiValue >= BMI_OBESE) {
      setBmiCategory("Obese");
      setBmiColor("text-red-500");
    }
  }, [height, weight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gender) {
      setError("Please select your gender");
      return;
    }
    
    onSubmit({ gender, age, height, weight });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <Weight className="mr-2" size={24} />
          Your Body Metrics
        </h2>
      </motion.div>
      
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: staggerDelay * 1 }}
        >
          <Label className="text-lg mb-2 block">Gender</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
            <div className="flex-1">
              <div className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${gender === "male" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`} onClick={() => setGender("male")}>
                <div className="text-4xl mb-2">👨</div>
                <div className="flex items-center justify-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all ${gender === "female" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`} onClick={() => setGender("female")}>
                <div className="text-4xl mb-2">👩</div>
                <div className="flex items-center justify-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </div>
            </div>
          </RadioGroup>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: staggerDelay * 2 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg"
        >
          <Label htmlFor="age" className="text-lg mb-2 block flex items-center">
            <span className="mr-2">Age:</span> 
            <span className="text-blue-700 font-bold text-xl">{age}</span> 
            <span className="text-sm text-blue-700 ml-1">years</span>
          </Label>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium w-8 text-right">18</span>
            <Slider
              id="age"
              value={[age]}
              min={18}
              max={80}
              step={1}
              onValueChange={(value) => setAge(value[0])}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8">80</span>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: staggerDelay * 3 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg"
          >
            <Label htmlFor="height" className="text-lg mb-2 block flex items-center">
              <span className="mr-2">Height:</span> 
              <span className="text-blue-700 font-bold text-xl">{height}</span> 
              <span className="text-sm text-blue-700 ml-1">cm</span>
            </Label>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-8 text-right">140</span>
              <Slider
                id="height"
                value={[height]}
                min={140}
                max={220}
                step={1}
                onValueChange={(value) => setHeight(value[0])}
                className="flex-1"
              />
              <span className="text-sm font-medium w-8">220</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: staggerDelay * 4 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg"
          >
            <Label htmlFor="weight" className="text-lg mb-2 block flex items-center">
              <span className="mr-2">Weight:</span> 
              <span className="text-blue-700 font-bold text-xl">{weight}</span> 
              <span className="text-sm text-blue-700 ml-1">kg</span>
            </Label>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-8 text-right">40</span>
              <Slider
                id="weight"
                value={[weight]}
                min={40}
                max={160}
                step={1}
                onValueChange={(value) => setWeight(value[0])}
                className="flex-1"
              />
              <span className="text-sm font-medium w-8">160</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: staggerDelay * 5 }}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">Your BMI</p>
              <p className={`text-2xl font-bold ${bmiColor}`}>{bmi}</p>
            </div>
            <div>
              <p className="text-gray-600">Category</p>
              <p className={`font-medium ${bmiColor}`}>{bmiCategory}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"></div>
            </div>
            <div className="relative h-6">
              <div className="absolute text-xs" style={{ left: `${Math.min(Math.max((bmi - 15) * 100 / 25, 0), 100)}%`, transform: 'translateX(-50%)' }}>
                <div className={`w-2 h-2 rounded-full ${bmiColor} mx-auto mb-1`}></div>
                <span className="font-medium whitespace-nowrap">{bmi}</span>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay * 6 }}
        className="pt-4"
      >
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </form>
  );
};

export default UserForm;
