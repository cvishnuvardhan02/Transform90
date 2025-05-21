
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GoalSelectionProps {
  onSelect: (goal: string) => void;
}

const GoalSelection = ({ onSelect }: GoalSelectionProps) => {
  const goals = [
    {
      id: "lose-weight",
      title: "Lose Weight",
      description: "Reduce body fat while maintaining muscle mass",
      icon: "🔻",
    },
    {
      id: "gain-muscle",
      title: "Gain Muscle",
      description: "Build strength and increase muscle size",
      icon: "💪",
    },
    {
      id: "lose-fat-gain-muscle",
      title: "Body Recomposition",
      description: "Simultaneously lose fat and gain muscle",
      icon: "⚖️",
    },
    {
      id: "gain-weight",
      title: "Gain Weight",
      description: "Increase body weight healthily",
      icon: "📈",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Choose Your Goal</h2>
      
      <p className="text-gray-600 mb-6">
        Select your primary goal for the next 90 days. Your nutrition and workout plan will be 
        customized based on this goal.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card 
            key={goal.id}
            className="p-5 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-400"
            onClick={() => onSelect(goal.id)}
          >
            <div className="text-3xl mb-2">{goal.icon}</div>
            <h3 className="text-lg font-bold text-blue-900 mb-1">{goal.title}</h3>
            <p className="text-gray-600 text-sm">{goal.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
