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

export function SelectNumber({ value, onValueChange }: SelectNumberProps) {
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
          <SelectItem value="1">test</SelectItem>
          <SelectItem value="5">Short</SelectItem>
          <SelectItem value="10">Medium</SelectItem>
          <SelectItem value="20">Large</SelectItem>
          <SelectItem value="30">Exam</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
