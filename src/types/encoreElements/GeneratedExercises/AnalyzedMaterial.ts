import { MainTopicProps } from '.';

export type AnalyzedMaterialProps = {
  Language: string;
  MacroSubject: string;
  Title: string;
  PerceivedDifficulty: string;
  MainTopics: MainTopicProps[];
};
