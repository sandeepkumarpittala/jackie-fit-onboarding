export function getQuestionText(question) {
  return question.question;
}

export function getStatus(listening, processing) {
  if (processing) return "Understanding your answer...";
  if (listening) return "Listening...";
  return "Tap the microphone to answer";
}