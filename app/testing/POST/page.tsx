import ContentDisplay from "@/components/dev/DisplayAPI";

export default function Basic() {
  return (
    <div>
      <h1>API will be display bellow:</h1>
      <ContentDisplay apiRoute="/api/ai/quiz/generating" method="POST" />
    </div>
  );
}
