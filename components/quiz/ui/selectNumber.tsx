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

type NumQuestions = "2" | "5" | "10" | "20" | "30";

type SelectNumberProps = {
  value: NumQuestions;
  onValueChange: (value: NumQuestions) => void;
};

export function SelectNumber({ value, onValueChange }: SelectNumberProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Number of questions" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Number</SelectLabel>
          <SelectItem value="2">test</SelectItem>
          <SelectItem value="5">Short</SelectItem>
          <SelectItem value="10">Medium</SelectItem>
          <SelectItem value="20">Long</SelectItem>
          <SelectItem value="30">Extra-Long</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
