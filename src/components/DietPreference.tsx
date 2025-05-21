
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DietPreferenceProps {
  onSelect: (preference: string) => void;
}

const DietPreference = ({ onSelect }: DietPreferenceProps) => {
  const preferences = [
    {
      id: "vegan",
      title: "Vegan",
      description: "Plant-based foods only, no animal products",
      icon: "🌱",
    },
    {
      id: "vegetarian",
      title: "Vegetarian",
      description: "Plant-based with dairy and eggs, no meat or fish",
      icon: "🥗",
    },
    {
      id: "eggetarian",
      title: "Eggetarian",
      description: "Vegetarian diet that includes eggs",
      icon: "🥚",
    },
    {
      id: "non-vegetarian",
      title: "Non-vegetarian",
      description: "Includes all food groups including meat and fish",
      icon: "🍗",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Select Your Diet Preference</h2>
      
      <p className="text-gray-600 mb-6">
        Choose your dietary preference to customize your nutrition plan.
        We'll create a meal plan that meets your caloric and protein needs while respecting your food choices.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {preferences.map((preference) => (
          <Card 
            key={preference.id}
            className="p-5 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-400"
            onClick={() => onSelect(preference.id)}
          >
            <div className="text-3xl mb-2">{preference.icon}</div>
            <h3 className="text-lg font-bold text-blue-900 mb-1">{preference.title}</h3>
            <p className="text-gray-600 text-sm">{preference.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DietPreference;
