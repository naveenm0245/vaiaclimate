"use client";

import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import useStore from "@/lib/zustand/store";

const ChatComponent = () => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const {fileName} = useStore();

  const submitQuestion = async () => {
    setIsLoading(true);
    console.log(question);

    const response = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ question : question, fileName : fileName }),
    });

    if (response.ok) {
      const data = await response.json();
      setAnswer(data.data.content);
      setIsLoading(false);
      console.log("Answered successfully");
    } else {
      setAnswer(response.statusText);
      setIsLoading(false);
      console.error("Got Error!");
    }
  };

  return (
    <div className="flex flex-col flex-1 space-y-4 min-w-[800px] bg-green- p-[2rem]">
      <Label htmlFor="message">Ask Question : </Label>
      <Textarea
        typeof="text"
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full"
      />
      <Button onClick={submitQuestion} className="max-w-fit px-4">
        Ask
      </Button>
      <div>
        {isLoading && (
          <div className="space-y-2">
            <Loader2 className="w-6 h-6 animate-spin transition-all" />
            <h1 className="text-lg text-neutral-600">
              Finding Answer in the Provided document...
            </h1>
          </div>
        )}
        {answer && <h1>{answer}</h1>}
      </div>
    </div>
  );
};

export default ChatComponent;
