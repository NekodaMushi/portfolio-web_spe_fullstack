import { fetchChatCompletion } from "@/lib/openaiAPI";

export async function validateAndCorrectQuizContent(quizContent: string, numQuestions: string) {
  let requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Validate if the following JSON represents a multiple choice quiz with each question having one correct answer among four options AND ${numQuestions} questions. Correct answer format should be the key of the choice. Respond with 'TRUE' if it is valid, otherwise return the corrected JSON.`,
      },
      { role: "user", content: quizContent },
    ],
  };

  // console.log("Double AI Checking activated")
  let response = await fetchChatCompletion(requestData);
  let validationResponse = response.choices[0].message.content;

  if (validationResponse === "TRUE") {
    return quizContent;
  }

  console.log(`The validation returned ${validationResponse}`);
  return validationResponse;
}
