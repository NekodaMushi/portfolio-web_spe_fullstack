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
};

export function SelectDataType({ value, onValueChange }: SelectNumberProps) {
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
          <SelectItem value="quizDataTest">Test</SelectItem>
          <SelectItem value="quizDataShort">Short</SelectItem>
          <SelectItem value="quizDataMedium">Medium</SelectItem>
          <SelectItem value="quizDataLarge">Large</SelectItem>
          <SelectItem value="quizDataExam">Exam</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
