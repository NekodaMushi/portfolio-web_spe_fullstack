import Spinner from "@/components/ui/spinner";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="p-20">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How to generate a Quiz?</AccordionTrigger>
          <AccordionContent>
            Please go to the github to get the chrome extension needed. Then
            download your first transcript, after that select the length you
            want and click on generate, only one more step is to click on start.
            Enjoy !
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I redo the same script?</AccordionTrigger>
          <AccordionContent>
            Yes. Once you completed your first transcript you will be directed
            to recall page, which allow you to review all your quizzes, you only
            have to click on Load then select the already created length.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How the recall page operates?</AccordionTrigger>
          <AccordionContent>
            <p>
              In recall, at the bottom part you have access to all your
              completed quiz.
              <p>
                In the top part, you see the result of the recall algorithm :
              </p>
            </p>
            <p>
              - You can click on Learning to check all the quiz in the learning
              phase or transition phase - the phase right before entering the
              review phase - those quizzes will only be displayed if you haven't
              done them already today
            </p>
            <p>
              - You can click on Review to check all the quiz in the review
              phase, here the recall algorithm will calculate for you the
              optimal time for your next repetition, so you only see them if
              they are due today.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            I'm tired of this quiz. Can I get another quiz on the same content?
          </AccordionTrigger>
          <AccordionContent>
            Yes. In recall, you just have to select the desired length then
            click on the circular arrow icon on the top right corner, then
            confirm re-generate.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
