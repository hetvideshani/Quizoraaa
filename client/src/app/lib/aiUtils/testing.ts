import { generateAgentQuiz } from "./generateQuiz";

try {
  const result = await generateAgentQuiz({
    userId: "b11413ca-d282-40f1-884f-c63d571d0b3e",
    prompt: "Basics of javascript",
    pdfFile: null,
    quiz_details: {
      totalQuestions: 10,
      difficulty: "easy",
      includeExplanations: true,
      language: "en",
      questionTypes: ["mcq", "true-false"],
    },
  });
  console.log(result);
} catch (err) {
  console.error("Quiz Generation Failed:", err);
}
