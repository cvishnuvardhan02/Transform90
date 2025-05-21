
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface UserFormProps {
  onSubmit: (data: {
    gender: string;
    age: number;
    height: number;
    weight: number;
  }) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [error, setError] = useState("");

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
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Your Body Metrics</h2>
      
      <div className="space-y-4">
        <div>
          <Label className="text-lg mb-2 block">Gender</Label>
          <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <div>
          <Label htmlFor="age" className="text-lg mb-2 block">
            Age: {age} years
          </Label>
          <div className="flex items-center gap-4">
            <span className="text-sm">18</span>
            <Slider
              id="age"
              value={[age]}
              min={18}
              max={80}
              step={1}
              onValueChange={(value) => setAge(value[0])}
              className="flex-1"
            />
            <span className="text-sm">80</span>
          </div>
        </div>
        
        <div>
          <Label htmlFor="height" className="text-lg mb-2 block">
            Height: {height} cm
          </Label>
          <div className="flex items-center gap-4">
            <span className="text-sm">140</span>
            <Slider
              id="height"
              value={[height]}
              min={140}
              max={220}
              step={1}
              onValueChange={(value) => setHeight(value[0])}
              className="flex-1"
            />
            <span className="text-sm">220</span>
          </div>
        </div>
        
        <div>
          <Label htmlFor="weight" className="text-lg mb-2 block">
            Weight: {weight} kg
          </Label>
          <div className="flex items-center gap-4">
            <span className="text-sm">40</span>
            <Slider
              id="weight"
              value={[weight]}
              min={40}
              max={160}
              step={1}
              onValueChange={(value) => setWeight(value[0])}
              className="flex-1"
            />
            <span className="text-sm">160</span>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Continue
      </Button>
    </form>
  );
};

export default UserForm;
