import ContentDisplay from "@/components/dev/DisplayAPI";

export default function Basic() {
  return (
    <div>
      <h1>API will be display bellow:</h1>
      <ContentDisplay apiRoute="/api/recall/quiz/all" method="GET" />
    </div>
  );
}
