import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

export default function ManualQuiz() {
    const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const question = questions[currentQuestion];

  const value =
  answers[question.id] ??
  (question.type === "checkbox" ? [] : "");

  const setValue = (newValue) => {
    setAnswers({
      ...answers,
      [question.id]: newValue,
    });
  };

  const nextQuestion = () => {

  if (currentQuestion < questions.length - 1) {

    setCurrentQuestion(currentQuestion + 1);

  } else {

    navigate("/summary", {
      state: {
        answers
      }
    });

  }

};
  const previousQuestion = () => {

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-xl">

        <ProgressBar
          current={currentQuestion + 1}
          total={questions.length}
        />

        <QuestionCard
question={question}
value={value}
setValue={setValue}
answers={answers}
/>

        <div className="flex justify-between mt-8">

          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-lg bg-gray-300 disabled:opacity-50"
          >
            Back
          </button>

          <button
            onClick={nextQuestion}
            className="px-6 py-3 rounded-lg bg-black text-white"
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );
}