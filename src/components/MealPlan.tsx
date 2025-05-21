
import { useState } from "react";
import { UserData } from "@/types/meal";
import { getMealPlan, calculateProteinTotal } from "@/utils/mealPlanUtils";
import ProteinRecommendation from "./meal/ProteinRecommendation";
import PhaseTabs from "./meal/PhaseTabs";

interface MealPlanProps {
  userData: UserData;
}

const MealPlan = ({ userData }: MealPlanProps) => {
  const [weekPhase, setWeekPhase] = useState("1-4");
  const { dietPreference, weight } = userData;
  
  // Calculate recommended protein intake (1.5-2g per kg)
  const minProteinTarget = Math.round(weight * 1.5);
  const maxProteinTarget = Math.round(weight * 2);
  
  const mealPlan = getMealPlan(dietPreference);
  const proteinTotal = calculateProteinTotal(mealPlan);
  const isProteinSufficient = proteinTotal >= minProteinTarget;

  return (
    <div className="space-y-4 animate-fade-in">
      <ProteinRecommendation 
        minProteinTarget={minProteinTarget}
        maxProteinTarget={maxProteinTarget}
        proteinTotal={proteinTotal}
        isProteinSufficient={isProteinSufficient}
      />
      
      <PhaseTabs 
        weekPhase={weekPhase}
        setWeekPhase={setWeekPhase}
        mealPlan={mealPlan}
      />
    </div>
  );
};

export default MealPlan;
