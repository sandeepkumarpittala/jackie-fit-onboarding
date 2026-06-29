import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../data/questions";

import ProgressBar from "../components/ProgressBar";
import AIHeader from "../components/AIHeader";
import VoiceMic from "../components/VoiceMic";
import StatusCard from "../components/StatusCard";
import AnswerBubble from "../components/AnswerBubble";

import { speak } from "../utils/speech";
import useSpeech from "../hooks/useSpeech";
import { processAnswer } from "../utils/parser";

export default function VoiceQuiz() {

  const navigate = useNavigate();

  const { listen, listening } = useSpeech();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState({});

  const [status, setStatus] = useState("Starting Jackie AI...");

  const [lastAnswer, setLastAnswer] = useState("");

  const started = useRef(false);

  const [brandQueue, setBrandQueue] = useState([]);

  const [brandSizes, setBrandSizes] = useState({});

  const question = questions[currentQuestion];

 useEffect(() => {

  if (started.current) return;

  started.current = true;

  startQuiz();

}, []);
  

  async function startQuiz() {

  await speak("Welcome to Jackie Jeans.");
  await new Promise(resolve => setTimeout(resolve, 600));

  await speak("I am your AI Fit Assistant.");
  await new Promise(resolve => setTimeout(resolve, 600));

  await speak("Let's find your perfect fit.");
  await new Promise(resolve => setTimeout(resolve, 600));

  await speak(questions[0].question);
  await new Promise(resolve => setTimeout(resolve, 600));

  setStatus("Press the microphone to answer.");

}

  async function startListening() {

  const q = questions[currentQuestion];

  try {

    setStatus("Listening...");

    const transcript = await listen();

    await handleAnswer(q, transcript);

  }

  catch {

    setStatus("Please try again");

    await speak("Sorry, I didn't catch that.");

  }

}


  async function handleAnswer(question, transcript) {

  let value = transcript;
if (!transcript || transcript.trim() === "") {
  await speak("I didn't hear your answer. Please try again.");
  return;
}
  if (
    question.optional &&
    transcript.toLowerCase().includes("skip")
  ) {
    value = "";
  } else {
    value = processAnswer(question, transcript);
    if (
  value === "" ||
  value === null ||
  (Array.isArray(value) && value.length === 0)
) {
  await speak("Sorry, I didn't understand. Please answer again.");
  return;
}
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

  // ----------- BRAND FLOW -----------

   {

  setBrandQueue(value);

  if (value.length === 0) {
if (question.type === "checkbox")
    updatedAnswers[9] = {};

    setAnswers(updatedAnswers);

    await speak("Okay.");

    return await nextQuestion(updatedAnswers);

  }

  await askBrandSizes(value, updatedAnswers);

  return;

}

  await speak(`I heard ${value}.`);
await new Promise(resolve => setTimeout(resolve, 600));

await nextQuestion(updatedAnswers);

}

async function askBrandSizes(
  brands,
  currentAnswers
) {

  const sizes = {};

  for (const brand of brands) {

    setStatus("Speaking...");

    await speak(
  `What size did you buy in ${brand}? Please say the full size, for example, thirty two inches.`
);
    await new Promise(resolve => setTimeout(resolve, 600));

    setStatus("Listening...");

    try {

      const transcript = await listen();

console.log("Brand size transcript:", transcript);
alert(transcript);

const size = processAnswer(
  {
    type: "number",
  },
  transcript
);

console.log("Parsed size:", size);
alert("Parsed size: " + size);

sizes[brand] = size;

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

answersRef.current = finalAnswers;

setBrandSizes(sizes);
setAnswers(finalAnswers);
console.log("Sizes:", sizes);
console.log("Final Answers:", finalAnswers);

await speak("Perfect. I've saved your sizes.");

await nextQuestion(finalAnswers);

}

async function nextQuestion(updatedAnswers) {

  if (currentQuestion >= questions.length - 1) {

    navigate("/summary", {
      state: {
        answers: updatedAnswers,
      },
    });

    return;

  }

  const next = currentQuestion + 1;

  setCurrentQuestion(next);

  setStatus("Speaking...");

  await speak(questions[next].question);
  await new Promise(resolve => setTimeout(resolve, 600));

  setStatus("Press the microphone to answer.");

}
return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

<div className="w-full max-w-xl">

<AIHeader />

<ProgressBar

current={currentQuestion + 1}

total={questions.length}

/>

<div className="bg-white rounded-3xl shadow-xl mt-6 p-8">

<div className="text-center">

<p className="text-gray-500 text-sm">

Question {currentQuestion + 1} of {questions.length}

</p>

<h2 className="text-3xl font-bold mt-3">

{question.question}

</h2>

{question.optional && (

<p className="text-green-600 mt-2">

Optional — You may say "Skip"

</p>

)}

</div>

<div className="mt-10">

<VoiceMic
  listening={listening}
  onClick={startListening}
/>

</div>

<StatusCard

status={status}

/>

<AnswerBubble

answer={lastAnswer}

/>

{brandQueue.length > 0 && currentQuestion >= 8 && (

<div className="mt-8 bg-gray-50 rounded-xl p-5">

<h3 className="font-semibold mb-4">

Selected Brands

</h3>

<div className="flex flex-wrap gap-2">

{brandQueue.map((brand)=>(

<span

key={brand}

className="bg-black text-white px-3 py-2 rounded-full text-sm"

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