import { useRef, useState } from "react";

export default function useSpeech() {
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const listen = () => {
    return new Promise((resolve, reject) => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject("Speech Recognition not supported");
        return;
      }

      // Cancel any previous recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }

      const recognition = new SpeechRecognition();

      recognitionRef.current = recognition;

      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      let finished = false;

      setListening(true);

      recognition.onresult = (event) => {
        if (finished) return;

        finished = true;

        setListening(false);

        const transcript =
          event.results[0][0].transcript;

        recognition.stop();

        resolve(transcript);
      };

      recognition.onerror = (event) => {
        if (finished) return;

        finished = true;

        setListening(false);

        reject(event.error);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();

      setTimeout(() => {
        if (!finished) {
          finished = true;

          try {
            recognition.abort();
          } catch {}

          setListening(false);

          reject("timeout");
        }
      }, 7000);
    });
  };

  const cancel = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    setListening(false);
  };

  return {
    listening,
    listen,
    cancel,
  };
}