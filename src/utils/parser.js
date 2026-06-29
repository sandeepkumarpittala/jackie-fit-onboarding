// Clean speech text
export function cleanAnswer(text) {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

// ---------------- HEIGHT ----------------

export function parseHeight(text) {
  text = cleanAnswer(text);

  const map = {
    "4 foot 10": `4'10"`,
    "4 foot 11": `4'11"`,

    "5 foot": `5'0"`,
    "5 foot 0": `5'0"`,

    "5 foot 1": `5'1"`,
    "5 foot 2": `5'2"`,
    "5 foot 3": `5'3"`,
    "5 foot 4": `5'4"`,
    "5 foot 5": `5'5"`,
    "5 foot 6": `5'6"`,
    "5 foot 7": `5'7"`,
    "5 foot 8": `5'8"`,
    "5 foot 9": `5'9"`,

    "5 foot 10": `5'10"`,
    "5 foot 11": `5'11"`,

    "6 foot": `6'0"`,
    "6 foot 0": `6'0"`,

    "6 foot 1": `6'1"`,
    "6 foot 2": `6'2"`
  };

  return map[text] || text;
}

// ---------------- NUMBERS ----------------
export function parseNumber(text) {

  text = cleanAnswer(text);

  const words = {
    "twenty four":24,
    "twenty five":25,
    "twenty six":26,
    "twenty seven":27,
    "twenty eight":28,
    "twenty nine":29,
    "thirty":30,
    "thirty one":31,
    "thirty two":32,
    "thirty three":33,
    "thirty four":34,
    "thirty five":35,
    "thirty six":36,
    "thirty seven":37,
    "thirty eight":38,
    "thirty nine":39,
    "forty":40,
    "forty one":41,
    "forty two":42,
    "forty three":43,
    "forty four":44,
    "forty five":45,
    "forty six":46,
    "forty seven":47,
    "forty eight":48,
    "forty nine":49,
    "fifty":50,
    "fifty one":51,
    "fifty two":52
  };

  for (const key in words) {
    if (text.includes(key)) {
      return String(words[key]);
    }
  }

  const match = text.match(/\d+/);

  if (match) return match[0];

  return "";
}

// ---------------- RADIO ----------------

export function parseRadio(text, options) {

  text = cleanAnswer(text);

  // Waist fit
  if (text.includes("slightly")) return "Slightly Relaxed";
  if (text.includes("snug")) return "Snug";
  if (text.includes("relaxed")) return "Relaxed";

  // Rise
  if (text.includes("high")) return "High Rise";
  if (text.includes("mid")) return "Mid Rise";
  if (text.includes("middle")) return "Mid Rise";
  if (text.includes("low")) return "Low Rise";

  // Thigh fit
  if (text.includes("fitted")) return "Fitted";
  if (text.includes("loose")) return "Loose";

  // Exact option fallback
  for (const option of options) {
    if (text.includes(option.toLowerCase())) {
      return option;
    }
  }

  return "";
}

// ---------------- BRANDS ----------------

export function parseBrands(text, brands) {

  text = cleanAnswer(text);

  const selected = [];

  brands.forEach((brand) => {

    if (text.includes(brand.toLowerCase())) {

      selected.push(brand);

    }

  });

  return selected;
}

// ---------------- PROCESS ----------------

export function processAnswer(question, transcript) {

  switch (question.type) {

    case "select":

      if (question.id === 1) {
        return parseHeight(transcript);
      }

      return parseNumber(transcript);

    case "number":

      return parseNumber(transcript);

    case "radio":

      return parseRadio(
        transcript,
        question.options
      );

    case "checkbox":

      return parseBrands(
        transcript,
        question.options
      );

    default:

      return transcript;

  }

}