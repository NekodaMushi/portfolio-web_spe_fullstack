import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SelectNumber } from "@/components/quiz/ui/selectNumber";
import { NumQuestions } from "@/types/quiz";

interface AlertProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  selectedNumber: NumQuestions;
  onAction?: (selectedNumber: NumQuestions) => void;
}

export const AlertRegenerate: React.FC<AlertProps> = ({
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  cancelText = "Cancel",
  actionText = "Continue",
  selectedNumber,
  onAction,
}) => {
  const [numQuestions, setNumQuestions] =
    useState<NumQuestions>(selectedNumber);

  const handleSelectNumber = (value: NumQuestions) => {
    setNumQuestions(value);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <SelectNumber
            value={numQuestions}
            onValueChange={handleSelectNumber}
          />
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => onAction && onAction(numQuestions)}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
