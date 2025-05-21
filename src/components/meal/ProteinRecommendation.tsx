
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProteinRecommendationProps {
  minProteinTarget: number;
  maxProteinTarget: number;
  proteinTotal: number;
  isProteinSufficient: boolean;
}

const ProteinRecommendation = ({
  minProteinTarget,
  maxProteinTarget,
  proteinTotal,
  isProteinSufficient
}: ProteinRecommendationProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium text-blue-900">Daily Protein Target</h3>
          <p className="text-sm text-blue-700">{minProteinTarget}-{maxProteinTarget}g protein per day</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">
            Current plan provides: <span className={`font-bold ${isProteinSufficient ? 'text-green-600' : 'text-amber-600'}`}>{proteinTotal}g</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Info size={18} className="text-blue-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  {isProteinSufficient 
                    ? "Your meal plan meets the protein requirements" 
                    : "Consider adding the recommended protein shake to meet your daily requirements"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {!isProteinSufficient && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800 animate-pulse">
          <p className="font-medium">Protein Recommendation</p>
          <p>Add 1-2 protein shakes daily to reach your protein target of {minProteinTarget}-{maxProteinTarget}g.</p>
        </div>
      )}
    </div>
  );
};

export default ProteinRecommendation;
