import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
// import { ModeToggle } from "./themes/theme-toogle";
// import { ColorToggle } from "./themes/color-toogle";

const Box = () => {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">Next Testing</h1>
        <Card className="mt-12 w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Card Title</span>
              <div>{/* <ModeToggle /> */}</div>
            </CardTitle>

            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button>Start</Button>
            <Button variant="secondary">Restart</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Box;
