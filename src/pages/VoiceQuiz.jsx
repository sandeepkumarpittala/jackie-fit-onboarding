import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../data/questions";

import AIHeader from "../components/AIHeader";
import ProgressBar from "../components/ProgressBar";
import VoiceMic from "../components/VoiceMic";
import StatusCard from "../components/StatusCard";
import AnswerBubble from "../components/AnswerBubble";

import useSpeech from "../hooks/useSpeech";
import { speak } from "../utils/speech";
import { processAnswer } from "../utils/parser";

export default function VoiceQuiz() {

  const navigate = useNavigate();

  const { listen, listening } = useSpeech();

  const started = useRef(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [status, setStatus] = useState("Starting Jackie AI...");

  const [lastAnswer, setLastAnswer] = useState("");

  const [brandQueue, setBrandQueue] = useState([]);

  const question = questions[currentQuestion];

  useEffect(() => {

    if (started.current) return;

    started.current = true;

    startQuiz();

  }, []);

  async function startQuiz() {

    setStatus("Speaking...");

    await speak("Welcome to Jackie Jeans.");

    await speak("I am your personal AI Fit Assistant.");

    await speak("Let's find your perfect fit.");

    await speak(questions[0].question);

    setStatus("Press the microphone to answer.");

  }

  async function startListening() {

    try {

      setStatus("Listening...");

      const transcript = await listen();

      await handleAnswer(
        questions[currentQuestion],
        transcript
      );

    } catch {

      setStatus("Please try again");

      await speak(
        "Sorry, I didn't catch that."
      );

    }

  }

  async function handleAnswer(question, transcript) {

    if (!transcript || transcript.trim() === "") {

      await speak(
        "I didn't hear anything. Please answer again."
      );

      return;

    }

    let value;

    if (
      question.optional &&
      transcript.toLowerCase().includes("skip")
    ) {

      value = "";

    } else {

      value = processAnswer(
        question,
        transcript
      );

    }

    if (
      value === "" ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {

      await speak(
        "Sorry, I didn't understand. Please answer again."
      );

      return;

    }

    setLastAnswer(
      Array.isArray(value)
        ? value.join(", ")
        : value
    );

    const updatedAnswers = {

      ...answers,

      [question.id]: value,

    };

    setAnswers(updatedAnswers);

    if (question.type === "checkbox") {

      setBrandQueue(value);

      if (value.length === 0) {

        updatedAnswers[9] = {};

        setAnswers(updatedAnswers);

        await speak(
          "Okay. No previous brands selected."
        );

        return nextQuestion(updatedAnswers);

      }

      return askBrandSizes(
        value,
        updatedAnswers
      );

    }

    await speak("Got it.");

    return nextQuestion(updatedAnswers);

  }
    async function askBrandSizes(
    brands,
    currentAnswers
  ) {

    const sizes = {};

    for (const brand of brands) {

      setStatus("Speaking...");

      await speak(
        `What size did you buy in ${brand}?`
      );

      setStatus("Listening...");

      try {

        const transcript = await listen();

        const size = processAnswer(
          {
            type: "number",
          },
          transcript
        );

        if (!size) {

          await speak(
            "Sorry, I didn't understand the size. Please tell me again."
          );

          return askBrandSizes(
            brands,
            currentAnswers
          );

        }

        sizes[brand] = size;

        await speak(
          `Got it. ${brand} size ${size}.`
        );

      }

      catch {

        await speak(
          "Please tell me again."
        );

        return askBrandSizes(
          brands,
          currentAnswers
        );

      }

    }

    const finalAnswers = {

      ...currentAnswers,

      9: sizes,

    };

    setAnswers(finalAnswers);

    await speak(
      "Perfect. I've saved your brand sizes."
    );

    return nextQuestion(finalAnswers);

  }

  async function nextQuestion(updatedAnswers) {

  let next = currentQuestion + 1;

  // Skip the hidden brand-size question
  if (questions[next]?.type === "brandSize") {
    next++;
  }

  if (next >= questions.length) {

    navigate("/summary", {
      state: {
        answers: updatedAnswers,
      },
    });

    return;
  }

  setCurrentQuestion(next);

  setStatus("Speaking...");

  await speak(questions[next].question);

  if (questions[next].optional) {
    await speak(
      "This question is optional. You may also say skip."
    );
  }

  setStatus("Press the microphone to answer.");
}
    

    return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-gray-200 flex justify-center items-center p-6">

    <div className="w-full max-w-3xl">

      <AIHeader />

      <div className="bg-white rounded-[32px] shadow-2xl border border-gray-200 p-10">

        <div className="mb-8">

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>
              Question {currentQuestion + 1}
            </span>

            <span>
              {questions.length} Questions
            </span>
          </div>

          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
          />

        </div>

        <div className="text-center">

          <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full mb-6">

            🤖 Jackie AI

          </div>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight">

            {question.question}

          </h2>

          {question.optional && (

            <p className="mt-3 text-green-600 font-medium">

              Optional — You may say "Skip"

            </p>

          )}

        </div>

        <div className="my-12 flex justify-center">

          <VoiceMic
            listening={listening}
            onClick={startListening}
          />

        </div>

        <StatusCard status={status} />

        <div className="mt-6">

          <AnswerBubble answer={lastAnswer} />

        </div>

        {brandQueue.length > 0 && currentQuestion >= 7 && (

          <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-200 p-6">

            <h3 className="font-bold text-lg mb-4">

              Previous Denim Brands

            </h3>

            <div className="flex flex-wrap gap-3">

              {brandQueue.map((brand) => (

                <span
                  key={brand}
                  className="bg-black text-white rounded-full px-5 py-2 text-sm shadow"
                >
                  {brand}
                </span>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  </div>
);

}