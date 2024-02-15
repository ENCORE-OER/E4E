import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Option } from '../types/encoreElements/index';
//import { useHasHydrated } from '../utils/utils';

//context props
type CreateOERsContextProps = {
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
  questionType: Option;
  handleSetQuestionType: (selected: Option) => void;
  exerciseType: Option;
  handleSetExerciseType: (selected: Option) => void;
  questionCategoryOpenQuestion: Option;
  handleSetQuestionCategoryOpenQuestion: (selected: Option) => void;
  questionCategoryMultipleChoice: Option;
  handleSetQuestionCategoryMultipleChoice: (selected: Option) => void;
  length: Option;
  handleSetLength: (selected: Option) => void;
  distractorsFillGaps: number;
  handleSetDistractorsFillGaps: (selected: number | string) => void;
  distractorsMultipleChioce: number;
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
  const [targetLevelFillGaps, setTargetLevelFillGaps] = useLocalStorage<Option | null>('targetLevelFillGaps', null);
  const [targetLevelOpenQuestion, setTargetLevelOpenQuestion] = useLocalStorage<Option | null>('targetLevelOpenQuestion',null);
  const [targetLevelMultipleChoice, setTargetLevelMultipleChoice] = useLocalStorage<Option | null>('targetLevelMultipleChoice',null);
  // const [difficultLevel, setDifficultLevel] = useLocalStorage<Option>('difficultLevel', {
  //     title: '',
  // });
  const [length, setLength] = useLocalStorage<Option>('lenght', {
    title: '',
  });
  const [questionType, setQuestionType] = useLocalStorage<Option>(
    'questionType',
    {
      title: '',
    }
  );
  const [questionCategoryOpenQuestion, setQuestionCategoryOpenQuestion] = useLocalStorage<Option>(
    'questionCategoryOpenQuestion',
    {
      title: '',
    }
  );
  const [questionCategoryMultipleChoice, setQuestionCategoryMultipleChoice] = useLocalStorage<Option>(
    'questionCategoryMultipleChoice',
    {
      title: '',
    }
  );
  const [exerciseType, setExerciseType] = useLocalStorage<Option>(
    'exerciseType',
    {
      title: '',
    }
  );

  const [distractorsFillGaps, setDistractorsFillGaps] = useLocalStorage<number>(
    'distractorsFillGaps',
    0
  );
  const [distractorsMultipleChioce, setDistractorsMultipleChoice] = useLocalStorage<number>(
    'distractorsMultipleChoice',
    0
  );
  const [easyDistractors, setEasyDistractors] = useLocalStorage<number>(
    'easyDistractors',
    0
  );
  const [blanks, setBlanks] = useLocalStorage<number>('blanks', 1);
  const [correctAnswer, setCorrectAnswer] = useLocalStorage<number>(
    'correctAnswer',
    1
  );

  const handleSetTargetLevelFillGaps = (selected: Option) => {
    setTargetLevelFillGaps(selected);
  };
  const handleSetTargetLevelOpenQuestion = (selected: Option) => {
    setTargetLevelOpenQuestion(selected);
  }
  const handleSetTargetLevelMultipleChoice = (selected: Option) => {
    setTargetLevelMultipleChoice(selected);
  }
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
        distractorsMultipleChioce,
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
