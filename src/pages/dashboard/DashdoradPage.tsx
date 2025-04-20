import { CalendarWidget } from "@/widgets/calendar";
import { BooksWidget } from "@/widgets/books";
import { MedsTrackerWidget } from "@/widgets/medications-tracker";
import { DailyTasksWidget } from "@/widgets/tasks";
import { HabitTrackerWidget } from "@/widgets/habits-tracker";
import { MealPlannerWidget } from "@/widgets/meal-planner";
import { CurrentDay } from "./ui/CurrentDay";
import { PomodoroWidget } from "./ui/PomadoroWidget";
import { AiWidget } from "@/widgets/ai-widget";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "./DashdoradPage.css";
import GridLayout, { type Layout } from "react-grid-layout";
import { useState } from "react";
import { CheckIcon, EditIcon, Trash2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PhotoWidget } from "@/widgets/photo-widget";
import { WeatherWidget } from "@/widgets/weather-widget";

type BlockType =
  | "current-day"
  | "meds-tracker"
  | "habit-tracker"
  | "meal-planner"
  | "calendar"
  | "ai"
  | "daily-tasks"
  | "books"
  | "pomodoro"
  | "photo"
  | "weather";

const ComponentByType: Record<BlockType, React.ElementType> = {
  "current-day": CurrentDay,
  "meds-tracker": MedsTrackerWidget,
  "habit-tracker": HabitTrackerWidget,
  "meal-planner": MealPlannerWidget,
  calendar: CalendarWidget,
  ai: AiWidget,
  "daily-tasks": DailyTasksWidget,
  books: BooksWidget,
  pomodoro: PomodoroWidget,
  photo: PhotoWidget,
  weather: WeatherWidget,
};

// const commonLayoutItem: Partial<Layout> = {
//   minW: 1,
//   minH: 1,
//   maxW: 2,
//   maxH: 2,
// };

export function DashdoradPage() {
  const [currentLayout, setCurrentLayout] = useState<Layout[]>(getInitialLayout);
  const [tmpLayout, setTmpLayout] = useState<Layout[] | null>(null);

  const [editable, setEditable] = useState(false);

  const saveLayout = () => {
    if (tmpLayout) {
      setEditable(false);
      localStorage.setItem("layout", JSON.stringify(tmpLayout));
      setCurrentLayout(tmpLayout);
      setTmpLayout(null);
    }
  };

  const onDelete = (type: BlockType) => {
    const newLayout = actualLayout.filter((item) => item.i !== type);
    setTmpLayout(newLayout);
  };

  const actualLayout = tmpLayout === null ? currentLayout : tmpLayout;

  return (
    <>
      <div className="fixed top-4 left-4 gap-2 rounded-full p-1 bg-card text-card-foreground flex flex-col border">
        {!editable && (
          <Button
            onClick={() => setEditable(true)}
            size="icon"
            className="rounded-full"
            variant="ghost"
          >
            <EditIcon />
          </Button>
        )}
        {editable && (
          <>
            <Button
              onClick={saveLayout}
              size="icon"
              className="rounded-full"
              disabled={tmpLayout === null}
            >
              <CheckIcon />
            </Button>
            <Button
              size="icon"
              className="rounded-full"
              variant="destructive"
              onClick={() => {
                setEditable(false);
                setTmpLayout(null);
              }}
            >
              <XIcon />
            </Button>
          </>
        )}
      </div>

      <GridLayout
        className={cn("w-full", editable && "select-none")}
        layout={actualLayout}
        cols={6}
        rowHeight={180}
        margin={[24, 24]}
        width={1200}
        isResizable={editable}
        isDraggable={editable}
        onLayoutChange={setTmpLayout}
        // draggableHandle=".drag-zone"
      >
        {actualLayout.map((block) => {
          const Component = ComponentByType[block.i as BlockType];
          return (
            <div
              key={block.i}
              className={cn("relative group", editable && "cursor-grab")}
            >
              {editable && (
                <Button
                  className="rounded-full absolute -left-2 -top-2 size-5 z-20 p-0! hidden group-hover:flex"
                  variant="destructive"
                  onClick={() => onDelete(block.i as BlockType)}
                >
                  <Trash2 className="size-2" />
                </Button>
              )}
              <Component
                className={cn("size-full", editable && "pointer-events-none")}
                w={block.w}
                h={block.h}
              />
            </div>
          );
        })}
      </GridLayout>
    </>
  );
}

const defaultLayout: Layout[] = [
  { w: 2, h: 1, x: 0, y: 0, i: "current-day" },
  { w: 2, h: 1, x: 4, y: 2, i: "meds-tracker" },
  { w: 1, h: 1, x: 2, y: 1, i: "habit-tracker" },
  { w: 2, h: 2, x: 4, y: 0, i: "meal-planner" },
  { w: 2, h: 3, x: 0, y: 1, i: "calendar" },
  { w: 3, h: 1, x: 2, y: 3, i: "ai", minH: 1, maxW: 3, minW: 2 },
  { w: 1, h: 1, x: 3, y: 1, i: "daily-tasks", maxH: 3, },
  { w: 2, h: 1, x: 2, y: 2, i: "books" },
  { w: 1, h: 1, x: 2, y: 0, i: "pomodoro" },
  { w: 1, h: 1, x: 3, y: 0, i: "photo" },
  { w: 1, h: 1, x: 5, y: 3, i: "weather" },
];

function getInitialLayout() {
  try {
    const layout = localStorage.getItem("layout");
    return layout ? JSON.parse(layout) : defaultLayout;
  } catch {
    return defaultLayout;
  }
}
