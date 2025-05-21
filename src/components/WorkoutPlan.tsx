
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface WorkoutPlanProps {
  userData: {
    gender: string;
    goal: string;
    weight: number;  // Added weight for calorie calculations
  };
}

interface ExerciseData {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  caloriesBurned?: number; // Calories burned per minute
  duration?: number; // Duration in minutes
}

interface WorkoutData {
  day: string;
  title: string;
  type: string;
  exercises: ExerciseData[];
}

const WorkoutPlan = ({ userData }: WorkoutPlanProps) => {
  const [weekPhase, setWeekPhase] = useState("1-4");
  const { gender, goal, weight } = userData;
  
  // Calculate calories burned based on weight, duration and exercise intensity
  const calculateCaloriesBurned = (weight: number, exerciseName: string, duration: number) => {
    // MET (Metabolic Equivalent of Task) values for different exercises
    const metValues: Record<string, number> = {
      "Jumping Jacks": 8,
      "Bodyweight Squats": 5,
      "Push-ups": 8,
      "Mountain Climbers": 8,
      "Plank": 4,
      "Brisk Walking/Jogging": 7,
      "Lunges": 6,
      "Bicycle Crunches": 7,
      "Jumping Rope/High Knees": 10,
      "Glute Bridges": 4.5,
      "Plank to Push-up": 8,
      "Walking Lunges": 5.5,
      "Lateral Shuffles": 7,
      "Side Plank": 4.5,
      "Burpees": 10,
      "Dumbbell Rows": 6,
      "Dumbbell Shoulder Press": 5,
      "Tricep Dips": 5.5,
      "Calf Raises": 4,
      "Wall Sit": 5,
      "Superman Hold": 3,
      // Default value for unknown exercises
      "default": 5
    };
    
    const met = metValues[exerciseName] || metValues["default"];
    
    // Calories burned = MET × weight (kg) × duration (hours)
    // Convert duration from minutes to hours
    return Math.round((met * weight * (duration / 60)));
  };
  
  // Generate workout plans based on goal
  const getWorkoutPlan = (phase: string, userGoal: string) => {
    // These would typically come from a database or API
    const workouts: { [key: string]: { [key: string]: WorkoutData[] } } = {
      "lose-weight": {
        "1-4": [
          {
            day: "Monday",
            title: "Full Body HIIT",
            type: "Cardio + Strength",
            exercises: [
              {
                name: "Jumping Jacks",
                sets: 3,
                reps: "30 seconds",
                rest: "15 seconds",
                duration: 1.5  // 3 sets × 30 seconds
              },
              {
                name: "Bodyweight Squats",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "10-12 reps",
                rest: "30 seconds",
                duration: 2.5
              },
              {
                name: "Mountain Climbers",
                sets: 3,
                reps: "30 seconds",
                rest: "15 seconds",
                duration: 1.5
              },
              {
                name: "Plank",
                sets: 3,
                reps: "30-45 seconds",
                rest: "30 seconds",
                duration: 2
              },
            ],
          },
          {
            day: "Wednesday",
            title: "Cardio Endurance",
            type: "Cardio",
            exercises: [
              {
                name: "Brisk Walking/Jogging",
                sets: 1,
                reps: "30 minutes",
                rest: "None",
                notes: "Keep heart rate at 65-75% of max",
                duration: 30
              },
              {
                name: "Bodyweight Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "30 seconds",
                duration: 4
              },
              {
                name: "Bicycle Crunches",
                sets: 3,
                reps: "20 total",
                rest: "30 seconds",
                duration: 3
              },
            ],
          },
          {
            day: "Friday",
            title: "Circuit Training",
            type: "Full Body",
            exercises: [
              {
                name: "Jumping Rope/High Knees",
                sets: 3,
                reps: "1 minute",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Bodyweight Squats",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Modified Push-ups",
                sets: 3,
                reps: "10 reps",
                rest: "30 seconds",
                duration: 2.5
              },
              {
                name: "Glute Bridges",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Plank to Push-up",
                sets: 3,
                reps: "8 total",
                rest: "45 seconds",
                duration: 3
              },
            ],
          },
        ],
        "5-8": [
          {
            day: "Monday",
            title: "HIIT and Strength",
            type: "Cardio + Strength",
            exercises: [
              {
                name: "Burpees",
                sets: 4,
                reps: "30 seconds",
                rest: "15 seconds",
                duration: 2
              },
              {
                name: "Walking Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "30 seconds",
                duration: 4
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "12-15 reps",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Lateral Shuffles",
                sets: 3,
                reps: "30 seconds",
                rest: "15 seconds",
                duration: 1.5
              },
              {
                name: "Side Plank",
                sets: 3,
                reps: "30 seconds each side",
                rest: "30 seconds",
                duration: 3
              },
            ],
          },
        ],
        "9-12": [
          {
            day: "Monday",
            title: "Advanced HIIT Circuit",
            type: "Cardio + Strength",
            exercises: [
              {
                name: "Burpees",
                sets: 5,
                reps: "45 seconds",
                rest: "15 seconds",
                duration: 3.75
              },
              {
                name: "Jump Squats",
                sets: 4,
                reps: "15 reps",
                rest: "30 seconds",
                duration: 4
              },
              {
                name: "Push-up Variations",
                sets: 4,
                reps: "15 reps",
                rest: "30 seconds",
                duration: 4
              },
              {
                name: "Mountain Climbers",
                sets: 4,
                reps: "45 seconds",
                rest: "15 seconds",
                duration: 3
              },
              {
                name: "Plank Variations",
                sets: 4,
                reps: "45 seconds",
                rest: "30 seconds",
                duration: 3
              },
            ],
          },
        ],
      },
      "gain-muscle": {
        "1-4": [
          {
            day: "Monday",
            title: "Upper Body Focus",
            type: "Strength",
            exercises: [
              {
                name: "Push-ups",
                sets: 3,
                reps: "10-12 reps",
                rest: "60 seconds",
                duration: 3
              },
              {
                name: "Dumbbell Rows",
                sets: 3,
                reps: "12 reps each arm",
                rest: "60 seconds",
                notes: "Use water bottles if no dumbbells",
                duration: 4
              },
              {
                name: "Dumbbell Shoulder Press",
                sets: 3,
                reps: "10 reps",
                rest: "60 seconds",
                duration: 3
              },
              {
                name: "Tricep Dips",
                sets: 3,
                reps: "12 reps",
                rest: "60 seconds",
                duration: 3
              },
              {
                name: "Plank",
                sets: 3,
                reps: "45 seconds",
                rest: "30 seconds",
                duration: 2.25
              },
            ],
          },
          {
            day: "Wednesday",
            title: "Lower Body Focus",
            type: "Strength",
            exercises: [
              {
                name: "Bodyweight Squats",
                sets: 4,
                reps: "15 reps",
                rest: "60 seconds",
                duration: 4
              },
              {
                name: "Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "60 seconds",
                duration: 4
              },
              {
                name: "Glute Bridges",
                sets: 3,
                reps: "15 reps",
                rest: "45 seconds",
                duration: 3
              },
              {
                name: "Calf Raises",
                sets: 3,
                reps: "20 reps",
                rest: "30 seconds",
                duration: 3
              },
              {
                name: "Wall Sit",
                sets: 3,
                reps: "30-45 seconds",
                rest: "30 seconds",
                duration: 2
              },
            ],
          },
          {
            day: "Friday",
            title: "Full Body Workout",
            type: "Strength",
            exercises: [
              {
                name: "Bodyweight Squats",
                sets: 3,
                reps: "15 reps",
                rest: "45 seconds",
                duration: 3
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "As many as possible",
                rest: "45 seconds",
                duration: 3
              },
              {
                name: "Superman Hold",
                sets: 3,
                reps: "30 seconds",
                rest: "30 seconds",
                duration: 1.5
              },
              {
                name: "Mountain Climbers",
                sets: 3,
                reps: "30 seconds",
                rest: "30 seconds",
                duration: 1.5
              },
              {
                name: "Plank to Push-up",
                sets: 3,
                reps: "6-8 total",
                rest: "60 seconds",
                duration: 3
              },
            ],
          },
        ],
        "5-8": [
          {
            day: "Monday",
            title: "Progressive Upper Body",
            type: "Strength",
            exercises: [
              {
                name: "Push-up Variations",
                sets: 4,
                reps: "12-15 reps",
                rest: "60 seconds",
                duration: 4
              },
              {
                name: "Dumbbell Rows",
                sets: 4,
                reps: "12 reps each arm",
                rest: "60 seconds",
                duration: 5
              },
              {
                name: "Shoulder Press",
                sets: 4,
                reps: "12 reps",
                rest: "60 seconds",
                duration: 4
              },
              {
                name: "Tricep Exercises",
                sets: 3,
                reps: "15 reps",
                rest: "45 seconds",
                duration: 3
              },
            ],
          },
        ],
        "9-12": [
          {
            day: "Monday",
            title: "Advanced Upper Body",
            type: "Strength",
            exercises: [
              {
                name: "Push-up Variations",
                sets: 5,
                reps: "15 reps",
                rest: "60 seconds",
                duration: 5
              },
              {
                name: "Pull Exercises",
                sets: 5,
                reps: "12 reps",
                rest: "60 seconds",
                duration: 5
              },
              {
                name: "Shoulder Complex",
                sets: 4,
                reps: "12 reps",
                rest: "60 seconds",
                duration: 4
              },
              {
                name: "Arm Specialization",
                sets: 4,
                reps: "15 reps",
                rest: "45 seconds",
                duration: 4
              },
            ],
          },
        ],
      },
      // Add other goals here similarly
    };

    // Default to lose-weight if the goal doesn't have a specific plan
    return workouts[userGoal]?.[phase] || workouts["lose-weight"][phase];
  };

  const workoutPlan = getWorkoutPlan(weekPhase, goal);
  
  const phases = [
    { id: "1-4", label: "Weeks 1-4" },
    { id: "5-8", label: "Weeks 5-8" },
    { id: "9-12", label: "Weeks 9-12" },
  ];

  return (
    <div className="space-y-4">
      <Tabs value={weekPhase} onValueChange={setWeekPhase} className="animate-fade-in">
        <TabsList className="w-full">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="flex-1">
              {phase.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="animate-scale-in">
            {workoutPlan?.map((workout, index) => (
              <div key={index} className="border rounded-md p-4 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">{workout.day}: {workout.title}</h4>
                  <Badge variant="outline" className="bg-blue-100">{workout.type}</Badge>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {workout.exercises.map((exercise, idx) => {
                    // Calculate calories burned for this exercise
                    const caloriesBurned = calculateCaloriesBurned(weight, exercise.name, exercise.duration || 3);
                    
                    return (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-blue-100">
                        <AccordionTrigger className="hover:bg-blue-50 px-2 rounded-md">
                          <div className="flex justify-between items-center w-full pr-4">
                            <span>{exercise.name}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              ~{caloriesBurned} kcal
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2">
                          <div className="grid grid-cols-3 gap-2 text-sm mt-2 mb-2">
                            <div className="bg-blue-50 p-2 rounded">
                              <div className="font-medium text-blue-800">Sets</div>
                              <div>{exercise.sets}</div>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <div className="font-medium text-blue-800">Reps</div>
                              <div>{exercise.reps}</div>
                            </div>
                            <div className="bg-blue-50 p-2 rounded">
                              <div className="font-medium text-blue-800">Rest</div>
                              <div>{exercise.rest}</div>
                            </div>
                          </div>
                          {exercise.notes && (
                            <div className="text-sm italic mt-1 pl-2 border-l-2 border-blue-300">
                              {exercise.notes}
                            </div>
                          )}
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Est. Calories:</span> This exercise burns approximately {caloriesBurned} calories based on your weight of {weight}kg.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            ))}
            
            <div className="text-sm text-gray-500 mt-2 p-3 bg-gray-50 rounded-md">
              <p>Rest days: Tuesday, Thursday, Saturday, Sunday</p>
              <p className="mt-1">
                Always warm up for 5-10 minutes before each workout and cool down/stretch for 5-10 minutes after.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkoutPlan;
