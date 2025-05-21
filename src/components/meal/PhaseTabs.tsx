
import { MealData } from "@/types/meal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion } from "@/components/ui/accordion";
import MealCategory from "./MealCategory";
import { ReactNode } from "react";

interface PhaseTabsProps {
  weekPhase: string;
  setWeekPhase: (phase: string) => void;
  mealPlan: { [key: string]: MealData[] } | undefined;
  children?: ReactNode;
}

const PhaseTabs = ({ weekPhase, setWeekPhase, mealPlan, children }: PhaseTabsProps) => {
  const phases = [
    { id: "1-4", label: "Weeks 1-4" },
    { id: "5-8", label: "Weeks 5-8" },
    { id: "9-12", label: "Weeks 9-12" },
  ];

  return (
    <Tabs value={weekPhase} onValueChange={setWeekPhase} className="w-full">
      <TabsList className="w-full">
        {phases.map((phase) => (
          <TabsTrigger key={phase.id} value={phase.id} className="flex-1">
            {phase.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {phases.map((phase) => (
        <TabsContent key={phase.id} value={phase.id} className="animate-scale-in">
          {children}
          <Accordion type="single" collapsible>
            <MealCategory title="Breakfast" value="breakfast" meals={mealPlan?.breakfast} />
            <MealCategory title="Lunch" value="lunch" meals={mealPlan?.lunch} />
            <MealCategory title="Dinner" value="dinner" meals={mealPlan?.dinner} />
            <MealCategory title="Snacks & Supplements" value="snacks" meals={mealPlan?.snacks} />
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PhaseTabs;
