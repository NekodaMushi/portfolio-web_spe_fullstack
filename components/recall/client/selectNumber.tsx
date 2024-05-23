"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumQuestions } from "@/types/quiz";

type SelectNumberProps = {
  value: NumQuestions;
  onValueChange: (value: NumQuestions) => void;
  quizReady: { [key: string]: boolean };
};

export function SelectDataType({
  value,
  onValueChange,
  quizReady,
}: SelectNumberProps) {
  const [selectedValue, setSelectedValue] = React.useState<NumQuestions | "">(
    "",
  );

  const handleValueChange = (value: NumQuestions) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <Select value={selectedValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="Number of questions" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Size</SelectLabel>
          <SelectItem
            value="quizDataTest"
            className={quizReady["quizDataTest"] ? "text-green-500" : ""}
          >
            Test
          </SelectItem>
          <SelectItem
            value="quizDataShort"
            className={quizReady["quizDataShort"] ? "text-green-500" : ""}
          >
            Short
          </SelectItem>
          <SelectItem
            value="quizDataMedium"
            className={quizReady["quizDataMedium"] ? "text-green-500" : ""}
          >
            Medium
          </SelectItem>
          <SelectItem
            value="quizDataLarge"
            className={quizReady["quizDataLarge"] ? "text-green-500" : ""}
          >
            Large
          </SelectItem>
          <SelectItem
            value="quizDataExam"
            className={quizReady["quizDataExam"] ? "text-green-500" : ""}
          >
            Exam
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
