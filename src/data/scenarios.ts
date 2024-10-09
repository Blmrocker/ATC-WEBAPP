export interface Interaction {
  atc: string;
  correctResponse: string;
  hints: string[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  interactions: Interaction[];
}

export const scenarios: Scenario[] = [
  {
    id: 'taxi-instructions',
    name: 'Taxi Instructions',
    description: 'Practice responding to taxi instructions from ATC.',
    difficulty: 'beginner',
    interactions: [
      {
        atc: "Cessna 123AB, taxi to runway 27 via taxiway Alpha, hold short of runway 27.",
        correctResponse: "Taxi to runway 27 via taxiway Alpha, hold short of runway 27, Cessna 123AB.",
        hints: [
          "Always read back the full instruction",
          "Include your call sign at the end of the response",
          "Confirm holding short of the runway"
        ]
      },
      {
        atc: "Cessna 123AB, cross runway 18, continue taxi to runway 27.",
        correctResponse: "Cross runway 18, continue taxi to runway 27, Cessna 123AB.",
        hints: [
          "Acknowledge crossing the runway",
          "Confirm continuing to runway 27",
          "Include your call sign"
        ]
      }
    ]
  },
  // Add more scenarios here
];