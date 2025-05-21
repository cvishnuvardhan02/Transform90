
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
    <AccordionItem value={value} className="border border-accent-secondary rounded-md mb-3 overflow-hidden">
      <AccordionTrigger className="px-4 py-3 hover:bg-dark-secondary/60 bg-dark-secondary/40 font-medium text-accent-primary">
        {title}
      </AccordionTrigger>
      <AccordionContent className="bg-dark-secondary/10">
        {meals.map((meal, index) => (
          <MealCard key={index} meal={meal} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default MealCategory;
