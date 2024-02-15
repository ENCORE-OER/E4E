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
  handleTargetLevelFillGaps: (selected: Option) => void;
  handleTargetLevelOpenQuestion: (selected: Option) => void;
  handleTargetLevelMultipleChoice: (selected: Option) => void;
  // difficultLevel: Option;
  // handleDifficultLevel: (selected: Option) => void;
  questionType: Option | null;
  handleQuestionType: (selected: Option) => void;
  exerciseType: Option | null;
  handleExerciseType: (selected: Option) => void;
  questionCategoryOpenQuestion: Option | null;
  handleQuestionCategoryOpenQuestion: (selected: Option) => void;
  questionCategoryMultipleChoice: Option | null;
  handleQuestionCategoryMultipleChoice: (selected: Option) => void;
  length: Option | null;
  handleLength: (selected: Option) => void;
  distractorsFillGaps: number;
  handleDistractorsFillGaps: (selected: number | string) => void;
  distractorsMultipleChoice: number;
  handleDistractorsMultipleChoice: (selected: number | string) => void;
  easyDistractors: number;
  handleEasyDistractors: (selected: number | string) => void;
  blanks: number;
  handleBlanks: (selected: number | string) => void;
  correctAnswer: number;
  handleCorrectAnswer: (selected: number | string) => void;
  handleResetOptions: () => void;
  maxValue: number;
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

  const calculateMaxValue = (selected: Option) => {
    // console.log('length', length);
    // if (length === lengthOptions[0]) console.log('8');
    // if (length === lengthOptions[1]) console.log('10');
    // if (length === lengthOptions[2]) console.log('12');
    switch (selected) {
      case lengthOptions[0]:
        return 8;
      case lengthOptions[1]:
        return 10;
      case lengthOptions[2]:
        return 12;
      default:
        return 8;
    }
  };

  const [maxValue, setMaxValue] = useState(8);

  const handleMaxValue = (selected: Option) => {
    // Calcola il nuovo valore massimo in base all'altro valore
    const nuovoMaxValue = calculateMaxValue(selected);
    // Aggiorna il valore massimo
    setMaxValue(nuovoMaxValue);
  };

  // const [data, setData] = useState(null);

  const handleIsGenerateButtonClicked = (bool: boolean) => {
    setIsGenerateButtonClicked(bool);
  };

  const handleTargetLevelFillGaps = (selected: Option) => {
    setTargetLevelFillGaps(selected);
  };
  const handleTargetLevelOpenQuestion = (selected: Option) => {
    setTargetLevelOpenQuestion(selected);
  };
  const handleTargetLevelMultipleChoice = (selected: Option) => {
    setTargetLevelMultipleChoice(selected);
  };
  // const handleDifficultLevel = (selected: Option) => {
  //     setDifficultLevel(selected);
  // }
  const handleQuestionType = (selected: Option) => {
    setQuestionType(selected);
  };
  const handleExerciseType = (selected: Option) => {
    setExerciseType(selected);
  };
  const handleQuestionCategoryOpenQuestion = (selected: Option) => {
    setQuestionCategoryOpenQuestion(selected);
  };
  const handleQuestionCategoryMultipleChoice = (selected: Option) => {
    setQuestionCategoryMultipleChoice(selected);
  };
  const handleLength = (selected: Option) => {
    setLength(selected);
    // console.log('length nell handele', length);
    // console.log('selected nell handele', selected);
    handleMaxValue(selected);
  };
  const handleDistractorsFillGaps = (number: number | string) => {
    setDistractorsFillGaps(number as number);
  };
  const handleDistractorsMultipleChoice = (number: number | string) => {
    setDistractorsMultipleChoice(number as number);
  };
  const handleEasyDistractors = (number: number | string) => {
    setEasyDistractors(number as number);
  };
  const handleBlanks = (number: number | string) => {
    setBlanks(number as number);
  };
  const handleCorrectAnswer = (number: number | string) => {
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

  // todo: fatch call
  // useEffect(() => {
  //   //console.log('data', data);
  // }, [data]);

  // useEffect(() => {
  //   // Funzione asincrona per effettuare la chiamata API
  //   const fetchData = async () => {
  //     try {
  //       // Se stai usando fetch
  //       const response = await fetch('https://huggingface.co/spaces/polyglot-edu/generative-ai-for-ed');
  //       const result = await response.json();

  //       setData(result);
  //     } catch (error) {
  //       console.error('Errore durante la chiamata API:', error);
  //     }
  //   };
  //   fetchData(); // Chiamata API al caricamento del componente o in base a condizioni specifiche
  // }, []); // L'array vuoto come secondo argomento fa sì che useEffect si esegua solo al montaggio del componente

  // todo: write on database

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
        handleTargetLevelFillGaps,
        handleTargetLevelOpenQuestion,
        handleTargetLevelMultipleChoice,
        // difficultLevel,
        //handleDifficultLevel,
        questionType,
        handleQuestionType,
        exerciseType,
        handleExerciseType,
        questionCategoryMultipleChoice,
        handleQuestionCategoryMultipleChoice,
        questionCategoryOpenQuestion,
        handleQuestionCategoryOpenQuestion,
        length,
        handleLength,
        distractorsFillGaps,
        handleDistractorsFillGaps,
        distractorsMultipleChoice,
        handleDistractorsMultipleChoice,
        easyDistractors,
        handleEasyDistractors,
        blanks,
        handleBlanks,
        correctAnswer,
        handleCorrectAnswer,
        handleResetOptions,
        maxValue,
      }}
    >
      {children}
    </CreateOERsContext.Provider>
  );
};
