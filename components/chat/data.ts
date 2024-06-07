
export type Payment = {
  id: string;
  trialnumber: number;
  status: "pending" | "processing" | "success" | "failed";
  quiz: string;
};
// dummy data
export const data: Payment[] = [
  {
    id: "m5gr84i9",
    trialnumber: 3,
    status: "success",
    quiz: "130. O(log n)",

  },
  {
    id: "3u1reuv4",
    trialnumber: 13,
    status: "success",
    quiz: "119. Optional: How Javascript Works",
  },
  {
    id: "derv1ws0",
    trialnumber: 5,
    status: "processing",
    quiz: "91. Hash Tables Review",
  },
  {
    id: "5kma53ae",
    trialnumber: 2,
    status: "success",
    quiz: "84. Solution: Implement A Hash Table",
  },
  {
    id: "bhqecj4p",
    trialnumber: 9,
    status: "failed",
    quiz: "Building the Story Section",
  },
];

