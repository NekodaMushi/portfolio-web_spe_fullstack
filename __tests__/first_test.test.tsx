import { render, screen } from "@testing-library/react";
import Recall from "@/app/learn/recall/page";
import "@testing-library/jest-dom";

it("should have a text with a bird in it", () => {
  render(<Recall />);

  const myElem = screen.getByText(/Mouette/i);

  expect(myElem).toBeInTheDocument();
});
