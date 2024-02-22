import { createContext, useContext, useState } from 'react';
//import { useLocalStorage } from 'usehooks-ts';
import { Option } from '../types/encoreElements/index';
//import { useHasHydrated } from '../utils/utils';

enum TargetLevel {
  Primary = 'Primary',
  MiddleSchool = 'Middle School',
  HighSchool = 'High School',
  Academic = 'Academic',
  Professional = 'Professional',
}

enum Temperature {
  Low = 0.2,
  Medium = 0.6,
  High = 0.9,
}

//context props
type CreateOERsContextProps = {
  // * difficoltà, da aggiungere forse in futuro
  // difficultLevelOptions: Option[];
  // difficultLevel: Option;
  // handleDifficultLevel: (selected: Option) => void;

  // * funzioni per il reset dei dati, per ora inutilizzata
  // handleResetOptions: () => void;

  // * controllo delle variabili dopo il click del bottone generate
  isGenerateButtonClicked: boolean;
  handleIsGenerateButtonClicked: (bool: boolean) => void;

  // * dati dentro i segmented buttons
  targetLevelOptions: Option[];
  lengthOptions: Option[];
  questionTypeOptions: Option[];
  questionCategoryOptions: Option[];
  exerciseTypeOptions: Option[];
  temperatureOptions: Option[];

  // * variabili Fill Gaps
  targetLevelFillGaps: Option | null;
  handleTargetLevelFillGaps: (selected: Option) => void;
  length: Option | null;
  handleLength: (selected: Option) => void;
  distractorsFillGaps: number;
  handleDistractorsFillGaps: (selected: number | string) => void;
  blanks: number;
  handleBlanks: (selected: number | string) => void;
  temperatureFillGaps: Option | null;
  handleTemperatureFillGaps: (selected: Option) => void;

  // * variabili Open Question
  targetLevelOpenQuestion: Option | null;
  handleTargetLevelOpenQuestion: (selected: Option) => void;
  questionType: Option | null;
  handleQuestionType: (selected: Option) => void;
  questionCategoryOpenQuestion: Option | null;
  handleQuestionCategoryOpenQuestion: (selected: Option) => void;
  temperatureOpenQuestion: Option | null;
  handleTemperatureOpenQuestion: (selected: Option) => void;

  // * variabili Multiple Choice
  targetLevelMultipleChoice: Option | null;
  handleTargetLevelMultipleChoice: (selected: Option) => void;
  exerciseType: Option | null;
  handleExerciseType: (selected: Option) => void;
  questionCategoryMultipleChoice: Option | null;
  handleQuestionCategoryMultipleChoice: (selected: Option) => void;
  distractorsMultipleChoice: number;
  handleDistractorsMultipleChoice: (selected: number | string) => void;
  easyDistractors: number;
  handleEasyDistractors: (selected: number | string) => void;
  correctAnswer: number;
  handleCorrectAnswer: (selected: number | string) => void;
  temperatureMultipleChoice: Option | null;
  handleTemperatureMultipleChoice: (selected: Option) => void;

  // * dati per il json
  // todo: metterle sul local storage e fare una funzione per resettarle
  exercise: string;
  handleExercise: (selected: number) => void;
  chosenTargetLevel: TargetLevel | null;
  handleChosenTargetLevel: (selected: Option) => void;
  temperature: Temperature;
  handleTemperature: (selected: Option) => void;
  distractors: number;
  handleDistractors: (selected: number) => void;
  questionCategory: string;
  handleQuestionCategory: (selected: Option) => void;
  //di questi c'è ne bisogno?
  // chosenLenght: number;
  // handleChosenLenght: (selected: Option) => void;
  // chosenBlanks: number;
  // handleChosenBlanks: (selected: number) => void;
  // chosenDistractorsEasy: number;
  // handleChosenDistractorsEasy: (selected: number) => void;
  // chosenCorrectAnswer: number;
  // handleChosenCorrectAnswer: (selected: number) => void;

  // * altro
  maxValue: number; //numero per definire il numero massimo di gaps
};

export const CreateOERsContext = createContext<CreateOERsContextProps>(
  {} as CreateOERsContextProps
);

// Create a custom hook to use the context
export const useCreateOERsContext = () => useContext(CreateOERsContext);

// Create a provider to wrap the app and provide the context to all its children
export const CreateOERsProvider = ({ children }: any) => {
  //const hydrated = useHasHydrated();

  // *stesse variabili ma salvate nel local storage, rimangono anche se si refresha la pagina
  /*
  const [targetLevelFillGaps, setTargetLevelFillGaps] =
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
  );
  */
  // * difficoltà, da aggiungere forse in futuro
  /*const difficultLevelOptions: Option[] = [
      { title: 'Easy' },
      { title: 'Medium' },
      { title: 'Hard' },
  ];*/

  // * dati per i segmented buttons
  const targetLevelOptions: Option[] = [
    { title: 'Primary' },
    { title: 'Middle School' },
    { title: 'High School' },
    { title: 'Academic' },
    { title: 'Professional' },
  ];
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
  const temperatureOptions: Option[] = [
    { title: 'Low' },
    { title: 'Medium' },
    { title: 'High' },
  ];

  // * variabili per il Fill Gaps
  const [targetLevelFillGaps, setTargetLevelFillGaps] = useState<Option | null>(
    null
  );
  const [length, setLength] = useState<Option | null>(null);
  const [distractorsFillGaps, setDistractorsFillGaps] = useState<number>(0);
  const [blanks, setBlanks] = useState<number>(1);
  const [temperatureFillGaps, setTemperatureFillGaps] = useState<Option | null>(
    null
  );

  // * variabili per l'Open Question
  const [targetLevelOpenQuestion, setTargetLevelOpenQuestion] =
    useState<Option | null>(null);
  const [questionType, setQuestionType] = useState<Option | null>(null);
  const [questionCategoryOpenQuestion, setQuestionCategoryOpenQuestion] =
    useState<Option | null>(null);
  const [temperatureOpenQuestion, setTemperatureOpenQuestion] =
    useState<Option | null>(null);

  // * variabili per il Multiple Choice
  const [targetLevelMultipleChoice, setTargetLevelMultipleChoice] =
    useState<Option | null>(null);
  const [questionCategoryMultipleChoice, setQuestionCategoryMultipleChoice] =
    useState<Option | null>(null);
  const [exerciseType, setExerciseType] = useState<Option | null>(null);
  const [distractorsMultipleChoice, setDistractorsMultipleChoice] =
    useState<number>(0);
  const [easyDistractors, setEasyDistractors] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(1);
  const [temperatureMultipleChoice, setTemperatureMultipleChoice] =
    useState<Option | null>(null);

  // * dati per il json
  const [chosenTargetLevel, setChosenTargetLevel] =
    useState<TargetLevel | null>(null);
  const [exercise, setExercise] = useState<string>('');
  const [temperature, setTemperature] = useState<Temperature>(
    Temperature.Medium
  );
  const [distractors, setDistractors] = useState<number>(0);
  const [questionCategory, setQuestionCategory] = useState<string>('');

  // * altro
  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState(false);

  const calculateMaxValue = (selected: Option) => {
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

  // * handle functions

  // * difficulty level e reset inutilizzati per ora
  // const handleDifficultLevel = (selected: Option) => {
  //     setDifficultLevel(selected);
  // }
  // const handleResetOptions = () => {
  //   setTargetLevelFillGaps(null);
  //   setTargetLevelOpenQuestion(null);
  //   setTargetLevelMultipleChoice(null);
  //   // setDifficultLevel({ title: '' });
  //   setQuestionType({ title: '' });
  //   setExerciseType({ title: '' });
  //   setQuestionCategoryOpenQuestion({ title: '' });
  //   setQuestionCategoryMultipleChoice({ title: '' });
  //   setLength({ title: '' });
  //   setDistractorsFillGaps(0);
  //   setDistractorsMultipleChoice(0);
  //   setBlanks(1);
  //   setEasyDistractors(0);
  //   setCorrectAnswer(1);
  // };

  // * Fill Gaps
  const handleTargetLevelFillGaps = (selected: Option) => {
    setTargetLevelFillGaps(selected);
  };
  const handleLength = (selected: Option) => {
    setLength(selected);

    handleMaxValue(selected);
  };
  const handleDistractorsFillGaps = (number: number | string) => {
    setDistractorsFillGaps(number as number);
  };
  const handleBlanks = (number: number | string) => {
    setBlanks(number as number);
  };
  const handleTemperatureFillGaps = (selected: Option) => {
    setTemperatureFillGaps(selected);
  };

  // * Open Question
  const handleTargetLevelOpenQuestion = (selected: Option) => {
    setTargetLevelOpenQuestion(selected);
  };
  const handleQuestionType = (selected: Option) => {
    setQuestionType(selected);
  };
  const handleQuestionCategoryOpenQuestion = (selected: Option) => {
    setQuestionCategoryOpenQuestion(selected);
  };
  const handleTemperatureOpenQuestion = (selected: Option) => {
    setTemperatureOpenQuestion(selected);
  };

  // * Multiple Choice
  const handleTargetLevelMultipleChoice = (selected: Option) => {
    setTargetLevelMultipleChoice(selected);
  };
  const handleExerciseType = (selected: Option) => {
    setExerciseType(selected);
  };
  const handleQuestionCategoryMultipleChoice = (selected: Option) => {
    setQuestionCategoryMultipleChoice(selected);
  };
  const handleDistractorsMultipleChoice = (number: number | string) => {
    setDistractorsMultipleChoice(number as number);
  };
  const handleEasyDistractors = (number: number | string) => {
    setEasyDistractors(number as number);
  };
  const handleCorrectAnswer = (number: number | string) => {
    setCorrectAnswer(number as number);
  };
  const handleTemperatureMultipleChoice = (selected: Option) => {
    setTemperatureMultipleChoice(selected);
  };

  // * dati per il json
  const handleChosenTargetLevel = (selected: Option) => {
    switch (selected.title) {
      case 'Primary':
        setChosenTargetLevel(TargetLevel.Primary);
        break;
      case 'Middle School':
        setChosenTargetLevel(TargetLevel.MiddleSchool);
        break;
      case 'High School':
        setChosenTargetLevel(TargetLevel.HighSchool);
        break;
      case 'Academic':
        setChosenTargetLevel(TargetLevel.Academic);
        break;
      case 'Professional':
        setChosenTargetLevel(TargetLevel.Professional);
        break;
      default:
        setChosenTargetLevel(null);
    }
  };
  const handleExercise = (selected: number) => {
    switch (selected) {
      case 0:
        setExercise('Fill the gaps');
        break;
      case 1:
        setExercise('Open Question');
        break;
      default:
        setExercise('Multiple Choice');
    }
  };
  const handleTemperature = (selected: Option) => {
    switch (selected.title) {
      case 'Low':
        setTemperature(Temperature.Low);
        break;
      case 'Medium':
        setTemperature(Temperature.Medium);
        break;
      case 'High':
        setTemperature(Temperature.High);
        break;
      default:
        setTemperature(Temperature.Medium);
    }
  };
  const handleDistractors = (selected: number) => {
    setDistractors(selected);
  };
  const handleQuestionCategory = (selected: Option) => {
    setQuestionCategory(selected.title);
  };

  // * altro
  const handleMaxValue = (selected: Option) => {
    // Calcola il nuovo valore massimo in base all'altro valore
    const nuovoMaxValue = calculateMaxValue(selected);
    // Aggiorna il valore massimo
    setMaxValue(nuovoMaxValue);
  };

  const handleIsGenerateButtonClicked = (bool: boolean) => {
    setIsGenerateButtonClicked(bool);
  };

  return (
    <CreateOERsContext.Provider
      value={{
        // * cose inutilizzate per ora
        //difficultLevelOptions,
        //difficultLevel,
        //handleDifficultLevel,
        //handleResetOptions,
        // * altre variabili
        isGenerateButtonClicked,
        handleIsGenerateButtonClicked,
        maxValue,
        // * dati per i segmented buttons
        targetLevelOptions,
        lengthOptions,
        questionTypeOptions,
        questionCategoryOptions,
        exerciseTypeOptions,
        temperatureOptions,
        // * variabili e handle functions Fill Gaps
        targetLevelFillGaps,
        handleTargetLevelFillGaps,
        length,
        handleLength,
        distractorsFillGaps,
        handleDistractorsFillGaps,
        blanks,
        handleBlanks,
        temperatureFillGaps,
        handleTemperatureFillGaps,
        // * variabili e handle functions Open Question
        targetLevelOpenQuestion,
        handleTargetLevelOpenQuestion,
        questionType,
        handleQuestionType,
        questionCategoryOpenQuestion,
        handleQuestionCategoryOpenQuestion,
        temperatureOpenQuestion,
        handleTemperatureOpenQuestion,
        // * variabili e handle functions Multiple Choice
        targetLevelMultipleChoice,
        handleTargetLevelMultipleChoice,
        exerciseType,
        handleExerciseType,
        questionCategoryMultipleChoice,
        handleQuestionCategoryMultipleChoice,
        distractorsMultipleChoice,
        handleDistractorsMultipleChoice,
        easyDistractors,
        handleEasyDistractors,
        correctAnswer,
        handleCorrectAnswer,
        temperatureMultipleChoice,
        handleTemperatureMultipleChoice,
        // * variabili e handle functions per il json
        chosenTargetLevel,
        handleChosenTargetLevel,
        exercise,
        handleExercise,
        temperature,
        handleTemperature,
        distractors,
        handleDistractors,
        questionCategory,
        handleQuestionCategory,
      }}
    >
      {children}
    </CreateOERsContext.Provider>
  );
};
