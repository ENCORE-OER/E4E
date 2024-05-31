import { MainTopicProps } from '.';

export type RespAnalyzedMaterialProps = {
  Language: string;
  MacroSubject: string;
  Title: string;
  PerceivedDifficulty: number;
  MainTopics: MainTopicProps[];
};
