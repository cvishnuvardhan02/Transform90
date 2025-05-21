
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
  };
}

interface ExerciseData {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface WorkoutData {
  day: string;
  title: string;
  type: string;
  exercises: ExerciseData[];
}

const WorkoutPlan = ({ userData }: WorkoutPlanProps) => {
  const [weekPhase, setWeekPhase] = useState("1-4");
  const { gender, goal } = userData;
  
  // Generate workout plans based on goal
  const getWorkoutPlan = (phase: string, userGoal: string) => {
    // These would typically come from a database or API
    // Simplified example
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
              },
              {
                name: "Bodyweight Squats",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "10-12 reps",
                rest: "30 seconds",
              },
              {
                name: "Mountain Climbers",
                sets: 3,
                reps: "30 seconds",
                rest: "15 seconds",
              },
              {
                name: "Plank",
                sets: 3,
                reps: "30-45 seconds",
                rest: "30 seconds",
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
              },
              {
                name: "Bodyweight Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "30 seconds",
              },
              {
                name: "Bicycle Crunches",
                sets: 3,
                reps: "20 total",
                rest: "30 seconds",
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
              },
              {
                name: "Bodyweight Squats",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
              },
              {
                name: "Modified Push-ups",
                sets: 3,
                reps: "10 reps",
                rest: "30 seconds",
              },
              {
                name: "Glute Bridges",
                sets: 3,
                reps: "15 reps",
                rest: "30 seconds",
              },
              {
                name: "Plank to Push-up",
                sets: 3,
                reps: "8 total",
                rest: "45 seconds",
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
              },
              {
                name: "Walking Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "30 seconds",
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "12-15 reps",
                rest: "30 seconds",
              },
              {
                name: "Lateral Shuffles",
                sets: 3,
                reps: "30 seconds",
                rest: "15 seconds",
              },
              {
                name: "Side Plank",
                sets: 3,
                reps: "30 seconds each side",
                rest: "30 seconds",
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
              },
              {
                name: "Dumbbell Rows",
                sets: 3,
                reps: "12 reps each arm",
                rest: "60 seconds",
                notes: "Use water bottles if no dumbbells",
              },
              {
                name: "Dumbbell Shoulder Press",
                sets: 3,
                reps: "10 reps",
                rest: "60 seconds",
              },
              {
                name: "Tricep Dips",
                sets: 3,
                reps: "12 reps",
                rest: "60 seconds",
              },
              {
                name: "Plank",
                sets: 3,
                reps: "45 seconds",
                rest: "30 seconds",
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
              },
              {
                name: "Lunges",
                sets: 3,
                reps: "12 each leg",
                rest: "60 seconds",
              },
              {
                name: "Glute Bridges",
                sets: 3,
                reps: "15 reps",
                rest: "45 seconds",
              },
              {
                name: "Calf Raises",
                sets: 3,
                reps: "20 reps",
                rest: "30 seconds",
              },
              {
                name: "Wall Sit",
                sets: 3,
                reps: "30-45 seconds",
                rest: "30 seconds",
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
              },
              {
                name: "Push-ups",
                sets: 3,
                reps: "As many as possible",
                rest: "45 seconds",
              },
              {
                name: "Superman Hold",
                sets: 3,
                reps: "30 seconds",
                rest: "30 seconds",
              },
              {
                name: "Mountain Climbers",
                sets: 3,
                reps: "30 seconds",
                rest: "30 seconds",
              },
              {
                name: "Plank to Push-up",
                sets: 3,
                reps: "6-8 total",
                rest: "60 seconds",
              },
            ],
          },
        ],
      },
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
      <Tabs value={weekPhase} onValueChange={setWeekPhase}>
        <TabsList className="w-full">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="flex-1">
              {phase.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id}>
            {workoutPlan?.map((workout, index) => (
              <div key={index} className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">{workout.day}: {workout.title}</h4>
                  <Badge variant="outline">{workout.type}</Badge>
                </div>
                
                <div className="space-y-3">
                  {workout.exercises.map((exercise, idx) => (
                    <div key={idx} className="border-t pt-3">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="flex gap-3 text-sm mt-1 text-gray-600">
                        <div>{exercise.sets} sets</div>
                        <div>{exercise.reps}</div>
                        <div>{exercise.rest} rest</div>
                      </div>
                      {exercise.notes && (
                        <div className="text-sm italic mt-1">{exercise.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="text-sm text-gray-500 mt-2">
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
