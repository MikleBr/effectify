import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tabs } from "@radix-ui/react-tabs";
import { ArrowUp } from "lucide-react";

type AiWidgetProps = { className?: string };

export function AiWidget({ className }: AiWidgetProps) {
  return (
    <Card className={className}>
      {/* <CardHeader>
        <CardTitle>AI Agent</CardTitle>
      </CardHeader> */}
      <CardContent className="overflow-y-auto flex flex-col h-full">
          <div className="grow">
            <Textarea className="shadow-none border-0 outline-none resize-none" placeholder="Ask anything" />
          </div>
          <div className="flex justify-between">
            <Tabs defaultValue="space" className="space-y-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="space">Space</TabsTrigger>
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="icon">
              <ArrowUp />
            </Button>
          </div>
      </CardContent>
    </Card>
  );
}
