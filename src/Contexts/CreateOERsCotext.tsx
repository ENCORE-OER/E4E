import { createContext, useContext, useState } from 'react';
//import { useLocalStorage } from 'usehooks-ts';
import { Option } from '../types/encoreElements/index';
//import { useHasHydrated } from '../utils/utils';

//context props
type CreateOERsContextProps = {
  isGenerateButtonClicked: boolean;
  handleIsGenerateButtonClicked: (bool: boolean) => void;
  targetLevelOptions: Option[];
  // difficultLevelOptions: Option[];
  lengthOptions: Option[];
  questionTypeOptions: Option[];
  questionCategoryOptions: Option[];
  exerciseTypeOptions: Option[];
  targetLevelFillGaps: Option | null;
  targetLevelOpenQuestion: Option | null;
  targetLevelMultipleChoice: Option | null;
  handleSetTargetLevelFillGaps: (selected: Option) => void;
  handleSetTargetLevelOpenQuestion: (selected: Option) => void;
  handleSetTargetLevelMultipleChoice: (selected: Option) => void;
  // difficultLevel: Option;
  // handleSetDifficultLevel: (selected: Option) => void;
  questionType: Option | null;
  handleSetQuestionType: (selected: Option) => void;
  exerciseType: Option | null;
  handleSetExerciseType: (selected: Option) => void;
  questionCategoryOpenQuestion: Option | null;
  handleSetQuestionCategoryOpenQuestion: (selected: Option) => void;
  questionCategoryMultipleChoice: Option | null;
  handleSetQuestionCategoryMultipleChoice: (selected: Option) => void;
  length: Option | null;
  handleSetLength: (selected: Option) => void;
  distractorsFillGaps: number;
  handleSetDistractorsFillGaps: (selected: number | string) => void;
  distractorsMultipleChoice: number;
  handleSetDistractorsMultipleChoice: (selected: number | string) => void;
  easyDistractors: number;
  handleSetEasyDistractors: (selected: number | string) => void;
  blanks: number;
  handleSetBlanks: (selected: number | string) => void;
  correctAnswer: number;
  handleSetCorrectAnswer: (selected: number | string) => void;
  handleResetOptions: () => void;
};

export const CreateOERsContext = createContext<CreateOERsContextProps>(
  {} as CreateOERsContextProps
);

// Create a custom hook to use the context
export const useCreateOERsContext = () => useContext(CreateOERsContext);

// Create a provider to wrap the app and provide the context to all its children
export const CreateOERsProvider = ({ children }: any) => {
  //const hydrated = useHasHydrated();

  const targetLevelOptions: Option[] = [
    { title: 'Primary' },
    { title: 'Middle School' },
    { title: 'High School' },
    { title: 'Academic' },
    { title: 'Professional' },
  ];
  // const difficultLevelOptions: Option[] = [
  //     { title: 'Easy' },
  //     { title: 'Medium' },
  //     { title: 'Hard' },
  // ];
  const lengthOptions: Option[] = [
    { title: 'Short', description: '(~150 words)' },
    { title: 'Medium', description: '(~250 words)' },
    { title: 'Long', description: '(~350 words)' },
  ];
  const questionTypeOptions: Option[] = [
    { title: 'Open' },
    { title: 'Short Answer' },
    { title: 'True False' },
  ];
  const questionCategoryOptions: Option[] = [
    { title: 'Factual Knowledge' },
    { title: 'Understanding of Concepts' },
    { title: 'Application of Skills' },
    { title: 'Analysys And Evaluation' },
  ];
  const exerciseTypeOptions: Option[] = [
    { title: 'Theoretical' },
    { title: 'Pratical' },
  ];

  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState(false);

  // *stesse identiche variabili che ci sono sotto ma salvate nel local storage (chace), rimangono anche se si refresha la pagina
  /*const [targetLevelFillGaps, setTargetLevelFillGaps] =
    useLocalStorage<Option | null>('targetLevelFillGaps', null);
  const [targetLevelOpenQuestion, setTargetLevelOpenQuestion] =
    useLocalStorage<Option | null>('targetLevelOpenQuestion', null);
  const [targetLevelMultipleChoice, setTargetLevelMultipleChoice] =
    useLocalStorage<Option | null>('targetLevelMultipleChoice', null);
  // const [difficultLevel, setDifficultLevel] = useLocalStorage<Option>('difficultLevel', {
  //     title: '',
  // });
  const [length, setLength] = useLocalStorage<Option | null>('lenght', null);
  const [questionType, setQuestionType] = useLocalStorage<Option | null>(
    'questionType',
    null
  );
  const [questionCategoryOpenQuestion, setQuestionCategoryOpenQuestion] =
    useLocalStorage<Option | null>('questionCategoryOpenQuestion', null);
  const [questionCategoryMultipleChoice, setQuestionCategoryMultipleChoice] =
    useLocalStorage<Option | null>('questionCategoryMultipleChoice', null);
  const [exerciseType, setExerciseType] = useLocalStorage<Option | null>(
    'exerciseType',
    null
  );

  const [distractorsFillGaps, setDistractorsFillGaps] = useLocalStorage<number>(
    'distractorsFillGaps',
    0
  );
  const [distractorsMultipleChoice, setDistractorsMultipleChoice] =
    useLocalStorage<number>('distractorsMultipleChoice', 0);
  const [easyDistractors, setEasyDistractors] = useLocalStorage<number>(
    'easyDistractors',
    0
  );
  const [blanks, setBlanks] = useLocalStorage<number>('blanks', 1);
  const [correctAnswer, setCorrectAnswer] = useLocalStorage<number>(
    'correctAnswer',
    1
  );*/

  // *stesse identiche variabili che ci sono sopra ma salvate nello useState, si resettano se  si refresha la pagina
  const [targetLevelFillGaps, setTargetLevelFillGaps] = useState<Option | null>(
    null
  );
  const [targetLevelOpenQuestion, setTargetLevelOpenQuestion] =
    useState<Option | null>(null);
  const [targetLevelMultipleChoice, setTargetLevelMultipleChoice] =
    useState<Option | null>(null);
  const [length, setLength] = useState<Option | null>(null);
  const [questionType, setQuestionType] = useState<Option | null>(null);
  const [questionCategoryOpenQuestion, setQuestionCategoryOpenQuestion] =
    useState<Option | null>(null);
  const [questionCategoryMultipleChoice, setQuestionCategoryMultipleChoice] =
    useState<Option | null>(null);
  const [exerciseType, setExerciseType] = useState<Option | null>(null);

  const [distractorsFillGaps, setDistractorsFillGaps] = useState<number>(0);
  const [distractorsMultipleChoice, setDistractorsMultipleChoice] =
    useState<number>(0);
  const [easyDistractors, setEasyDistractors] = useState<number>(0);
  const [blanks, setBlanks] = useState<number>(1);
  const [correctAnswer, setCorrectAnswer] = useState<number>(1);

  const handleIsGenerateButtonClicked = (bool: boolean) => {
    setIsGenerateButtonClicked(bool);
  };

  const handleSetTargetLevelFillGaps = (selected: Option) => {
    setTargetLevelFillGaps(selected);
  };
  const handleSetTargetLevelOpenQuestion = (selected: Option) => {
    setTargetLevelOpenQuestion(selected);
  };
  const handleSetTargetLevelMultipleChoice = (selected: Option) => {
    setTargetLevelMultipleChoice(selected);
  };
  // const handleSetDifficultLevel = (selected: Option) => {
  //     setDifficultLevel(selected);
  // }
  const handleSetQuestionType = (selected: Option) => {
    setQuestionType(selected);
  };
  const handleSetExerciseType = (selected: Option) => {
    setExerciseType(selected);
  };
  const handleSetQuestionCategoryOpenQuestion = (selected: Option) => {
    setQuestionCategoryOpenQuestion(selected);
  };
  const handleSetQuestionCategoryMultipleChoice = (selected: Option) => {
    setQuestionCategoryMultipleChoice(selected);
  };
  const handleSetLength = (selected: Option) => {
    setLength(selected);
  };
  const handleSetDistractorsFillGaps = (number: number | string) => {
    setDistractorsFillGaps(number as number);
  };
  const handleSetDistractorsMultipleChoice = (number: number | string) => {
    setDistractorsMultipleChoice(number as number);
  };
  const handleSetEasyDistractors = (number: number | string) => {
    setEasyDistractors(number as number);
  };
  const handleSetBlanks = (number: number | string) => {
    setBlanks(number as number);
  };
  const handleSetCorrectAnswer = (number: number | string) => {
    setCorrectAnswer(number as number);
  };

  const handleResetOptions = () => {
    setTargetLevelFillGaps(null);
    setTargetLevelOpenQuestion(null);
    setTargetLevelMultipleChoice(null);
    // setDifficultLevel({ title: '' });
    setQuestionType({ title: '' });
    setExerciseType({ title: '' });
    setQuestionCategoryOpenQuestion({ title: '' });
    setQuestionCategoryMultipleChoice({ title: '' });
    setLength({ title: '' });
    setDistractorsFillGaps(0);
    setDistractorsMultipleChoice(0);
    setBlanks(1);
    setEasyDistractors(0);
    setCorrectAnswer(1);
  };

  return (
    <CreateOERsContext.Provider
      value={{
        isGenerateButtonClicked,
        handleIsGenerateButtonClicked,
        targetLevelOptions,
        // difficultLevelOptions,
        lengthOptions,
        questionTypeOptions,
        questionCategoryOptions,
        exerciseTypeOptions,
        targetLevelFillGaps,
        targetLevelOpenQuestion,
        targetLevelMultipleChoice,
        handleSetTargetLevelFillGaps,
        handleSetTargetLevelOpenQuestion,
        handleSetTargetLevelMultipleChoice,
        // difficultLevel,
        //handleSetDifficultLevel,
        questionType,
        handleSetQuestionType,
        exerciseType,
        handleSetExerciseType,
        questionCategoryMultipleChoice,
        handleSetQuestionCategoryMultipleChoice,
        questionCategoryOpenQuestion,
        handleSetQuestionCategoryOpenQuestion,
        length,
        handleSetLength,
        distractorsFillGaps,
        handleSetDistractorsFillGaps,
        distractorsMultipleChoice,
        handleSetDistractorsMultipleChoice,
        easyDistractors,
        handleSetEasyDistractors,
        blanks,
        handleSetBlanks,
        correctAnswer,
        handleSetCorrectAnswer,
        handleResetOptions,
      }}
    >
      {children}
    </CreateOERsContext.Provider>
  );
};
