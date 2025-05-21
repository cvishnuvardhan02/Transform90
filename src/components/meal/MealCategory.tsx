
import { MealData } from "@/types/meal";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MealCard from "./MealCard";

interface MealCategoryProps {
  title: string;
  value: string;
  meals?: MealData[];
}

const MealCategory = ({ title, value, meals = [] }: MealCategoryProps) => {
  return (
    <AccordionItem value={value} className="border border-blue-100 rounded-md mb-3 overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:bg-blue-50 bg-blue-100/50 font-medium">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        {meals.map((meal, index) => (
          <MealCard key={index} meal={meal} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default MealCategory;
