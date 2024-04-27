export type TopicData = {
  Language: string;
  MacroSubject: string;
  Title: string;
  PerceivedDifficulty: number;
  MainTopics: [
    {
      Topic: string;
      Type: number;
      Description: string;
    },
  ];
};
