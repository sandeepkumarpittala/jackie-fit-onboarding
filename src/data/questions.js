export const questions = [
  {
    id: 1,
    question: "What is your height?",
    type: "select",
    options: [
      "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"",
      "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"",
      "5'8\"", "5'9\"", "5'10\"", "5'11\"",
      "6'0\"", "6'1\"", "6'2\""
    ]
  },

  {
    id: 2,
    question: "What is your weight? (Optional)",
    type: "number",
    optional: true
  },

  {
    id: 3,
    question: "Waist measurement",
    type: "select",
    options: Array.from({ length: 29 }, (_, i) => `${24 + i}"`)
  },

  {
    id: 4,
    question: "Hip measurement",
    type: "select",
    options: Array.from({ length: 29 }, (_, i) => `${32 + i}"`)
  },

  {
    id: 5,
    question: "How do you like jeans to fit at the waist?",
    type: "radio",
    options: [
      "Snug",
      "Slightly Relaxed",
      "Relaxed"
    ]
  },

  {
    id: 6,
    question: "Where should the waistband sit?",
    type: "radio",
    options: [
      "High Rise",
      "Mid Rise",
      "Low Rise"
    ]
  },

  {
    id: 7,
    question: "How should jeans fit through the thighs?",
    type: "radio",
    options: [
      "Fitted",
      "Relaxed",
      "Loose"
    ]
  },

  {
    id: 8,
    question: "Which denim brands have you bought before?",
    type: "checkbox",
    options: [
  "Levi's",
  "Wrangler",
  "Lee",
  "Pepe Jeans",
  "Diesel",
  "Calvin Klein",
  "H&M",
  "Zara",
  "GAP",
  "Jack & Jones",
  "American Eagle",
  "Flying Machine",
  "Tommy Hilfiger",
  "Uniqlo",
  "Mango",
  "True Religion",
  "Guess",
  "U.S. Polo",
  "Roadster",
  "Spykar"
]
  },

  {
    id: 9,
    question: "What size did you buy in those brands?",
    type: "brandSize"
  },

  {
    id: 10,
    question: "Biggest fit frustration?",
    type: "radio",
    options: [
      "Waist Gap",
      "Hip Tightness",
      "Wrong Length",
      "Thigh Fit",
      "Rise",
      "Other"
    ]
  }
];