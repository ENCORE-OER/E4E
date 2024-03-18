import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { OerData, Option, OptionsData } from '../types/encoreElements/index';
// import { OerData } from '../types/encoreElements/oer/CreateOERsElement/OerData';
// import { useHasHydrated } from '../utils/utils';

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
  exercise: string | null;
  handleExercise: (selected: number) => void;
  chosenTargetLevel: number | null;
  //handleChosenTargetLevel: (selected: Option) => void;
  temperature: number;
  //handleTemperature: (selected: Option) => void;
  distractors: number;
  handleDistractors: (selected: number) => void;
  questionCategory: string;
  handleQuestionCategory: (selected: Option) => void;
  sourceText: string;
  handleSourceText: (selected: string) => void;
  chosenLenght: number;
  //handleChosenLenght: (selected: Option) => void;
  chosenCategory: number;
  //handleChosenCategory: (selected: Option) => void;
  chosenType: number | boolean;
  //handleChosenType: (selected: Option) => void;
  data: OerData;
  handleData: () => void;
  title: string;
  handleTitle: (selected: string) => void;
  description: string;
  handleDescription: (selected: string) => void;
  question: string;
  handleQuestion: (selected: string) => void;
  options: OptionsData;
  handleOptions: (selected: string, isChecked: boolean) => void;
  handleOptionsChange: (selected: { [key: string]: boolean }) => void;
  solution: string;
  handleSolution: (selected: string) => void;
  fillTemplate: string;
  handleFillTemplate: (selected: string) => void;
  fillTemplateWithGaps: string;
  handleFillTemplateWithGaps: (selected: string) => void;

  // * altro
  maxValue: number; //numero per definire il numero massimo di gaps
  // apiKey: string;
  // handleApiKey: (selected: string) => void;
  apiOpenQuestionData: {
    language: string;
    date: string;
    level: string;
    type_of_question: string;
    category: string;
    temperature: number;
    question: string;
    correctAnswer: string;
  };
  handleTextToJSONOpenQuestion: (text: string) => void;
  apiFillGapsData: {
    language: string;
    date: string;
    temperature: number;
    words: { [key: string]: boolean };
    level: string;
    text: string;
    textWithGaps: string;
    wordsAndAnswers: string;
  };
  handleTextToJSONFillGaps: (text: string) => void;
  apiMultipleChiocesData: {
    language: string;
    date: string;
    level: string;
    temperature: number;
    nedd: number;
    n_o_d: number;
    category: string;
    question: string;
    correctAnswer: string;
    answers: { [key: string]: boolean };
    solution: string;
  };
  handleTextToJSONMultipleChoice: (text: string) => void;
};

export const CreateOERsContext = createContext<CreateOERsContextProps>(
  {} as CreateOERsContextProps
);

// Create a custom hook to use the context
export const useCreateOERsContext = () => useContext(CreateOERsContext);

// Create a provider to wrap the app and provide the context to all its children
export const CreateOERsProvider = ({ children }: any) => {
  //const hydrated = useHasHydrated();
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
    useState<number>(1);
  const [easyDistractors, setEasyDistractors] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(1);
  const [temperatureMultipleChoice, setTemperatureMultipleChoice] =
    useState<Option | null>(null);

  // * dati per il json
  const [chosenTargetLevel, setChosenTargetLevel] = useState<number | null>(
    null
  );
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [exercise, setExercise] = useLocalStorage<string | null>(
    'Fill the gaps',
    null
  );
  const [temperature, setTemperature] = useState<number>(0.2);
  const [distractors, setDistractors] = useState<number>(0);
  const [questionCategory, setQuestionCategory] = useState<string>('');
  const [sourceText, setSourceText] = useState<string>('');
  const [chosenLenght, setChosenLenght] = useState<number>(150);
  const [chosenCategory, setChosenCategory] = useState<number>(0);
  const [chosenType, setChosenType] = useState<number | boolean>(0);
  const [question, setQuestion] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [options, setOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [fillTemplate, setFillTemplate] = useState<string>('');
  const [fillTemplateWithGaps, setFillTemplateWithGaps] = useState<string>('');
  const [data, setData] = useState({} as OerData);
  const [apiOpenQuestionData, setApiOpenQuestionData] = useState({
    language: '',
    date: '',
    level: '',
    type_of_question: '',
    category: '',
    temperature: 0,
    question: '',
    correctAnswer: '',
  });
  const [apiFillGapsData, setApiFillGapsData] = useState({
    language: '',
    date: '',
    temperature: 0,
    words: {} as { [key: string]: boolean },
    level: '',
    text: '',
    textWithGaps: '',
    wordsAndAnswers: '',
  });
  const [apiMultipleChiocesData, setApiMultipleChiocesData] = useState({
    language: '',
    date: '',
    level: '',
    temperature: 0,
    nedd: 0,
    n_o_d: 0,
    category: '',
    question: '',
    correctAnswer: '',
    answers: {},
    solution: '',
  });

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
  // const [apiKey, setApiKey] = useState('');

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
    handleChosenTargetLevel(selected);
  };
  const handleLength = (selected: Option) => {
    setLength(selected);

    handleMaxValue(selected);

    handleChosenLenght(selected);
  };
  const handleDistractorsFillGaps = (number: number | string) => {
    setDistractorsFillGaps(number as number);
  };
  const handleBlanks = (number: number | string) => {
    setBlanks(number as number);
  };
  const handleTemperatureFillGaps = (selected: Option) => {
    setTemperatureFillGaps(selected);
    handleTemperature(selected);
  };

  // * Open Question
  const handleTargetLevelOpenQuestion = (selected: Option) => {
    setTargetLevelOpenQuestion(selected);
    handleChosenTargetLevel(selected);
  };
  const handleQuestionType = (selected: Option) => {
    setQuestionType(selected);
    handleChosenType(selected);
  };
  const handleQuestionCategoryOpenQuestion = (selected: Option) => {
    setQuestionCategoryOpenQuestion(selected);
    handleChosenCategory(selected);
  };
  const handleTemperatureOpenQuestion = (selected: Option) => {
    setTemperatureOpenQuestion(selected);
    handleTemperature(selected);
  };

  // * Multiple Choice
  const handleTargetLevelMultipleChoice = (selected: Option) => {
    setTargetLevelMultipleChoice(selected);
    handleChosenTargetLevel(selected);
  };
  const handleExerciseType = (selected: Option) => {
    setExerciseType(selected);
    handleChosenType(selected);
  };
  const handleQuestionCategoryMultipleChoice = (selected: Option) => {
    setQuestionCategoryMultipleChoice(selected);
    handleChosenCategory(selected);
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
    handleTemperature(selected);
  };

  // * dati per il json
  const handleSourceText = (selected: string) => {
    setSourceText(selected);
  };
  const handleChosenTargetLevel = (selected: Option) => {
    switch (selected.title) {
      case 'Primary':
        setChosenTargetLevel(0);
        break;
      case 'Middle School':
        setChosenTargetLevel(1);
        break;
      case 'High School':
        setChosenTargetLevel(2);
        break;
      case 'Academic':
        setChosenTargetLevel(3);
        break;
      case 'Professional':
        setChosenTargetLevel(4);
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
      case 2:
        setExercise('Multiple Choice');
        break;
      default:
        console.log('error in chosen Exercise');
    }
  };
  const handleTemperature = (selected: Option) => {
    switch (selected.title) {
      case 'Low':
        setTemperature(0.2);
        break;
      case 'Medium':
        setTemperature(0.6);
        break;
      case 'High':
        setTemperature(0.9);
        break;
      default:
        setTemperature(0.2);
    }
  };
  const handleChosenLenght = (selected: Option) => {
    switch (selected.title) {
      case 'Short':
        setChosenLenght(150);
        break;
      case 'Medium':
        setChosenLenght(250);
        break;
      case 'Long':
        setChosenLenght(350);
        break;
      default:
        setChosenLenght(150);
    }
  };
  const handleChosenCategory = (selected: Option) => {
    switch (selected.title) {
      case 'Factual Knowledge':
        setChosenCategory(0);
        break;
      case 'Understanding of Concepts':
        setChosenCategory(1);
        break;
      case 'Application of Skills':
        setChosenCategory(2);
        break;
      case 'Analysys And Evaluation':
        setChosenCategory(3);
        break;
      default:
        setChosenCategory(0);
    }
  };
  const handleChosenType = (selected: Option) => {
    switch (selected.title) {
      case 'Pratical':
        setChosenType(true);
        break;
      case 'Theoretical':
        setChosenType(false);
        break;
      case 'Open':
        setChosenType(0);
        break;
      case 'Short Answer':
        setChosenType(1);
        break;
      case 'True False':
        setChosenType(2);
        break;
      default:
        setChosenType(0);
    }
  };
  const handleDistractors = (selected: number) => {
    setDistractors(selected);
  };
  const handleQuestionCategory = (selected: Option) => {
    setQuestionCategory(selected.title);
  };
  const handleQuestion = (selected: string) => {
    setQuestion(selected);
  };
  const handleOptions = (answer: string, isChecked: boolean) => {
    setOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions, [answer]: isChecked };
      return updatedOptions;
    });
  };
  const handleOptionsChange = (newOptions: { [key: string]: boolean }) => {
    setOptions(newOptions);
  };
  const handleSolution = (newSolution: string) => {
    setSolution(newSolution);
  };
  const handleFillTemplate = (selected: string) => {
    setFillTemplate(selected);
  };
  const handleFillTemplateWithGaps = (selected: string) => {
    setFillTemplateWithGaps(selected);
  };

  const handleTextToJSONOpenQuestion = (text: string) => {
    const languageMatch = text.match(/Language: ([^\n]*)(?=\n)/);
    const dateMatch = text.match(/Date: ([^\n]*)(?=\n)/);
    const levelMatch = text.match(/Level: (.+?)(?=\s\d|\b|$)/);
    const typeOfQuestionMatch = text.match(
      /Type of question: (.+?)(?=\s\d|\b|$)/
    );
    const categoryMatch = text.match(/Category: (.+?)(?=\s\d|\b|$)/);
    const temperatureMatch = text.match(/Temperature: (.+?)(?=\s|$)/);
    const questionMatch = text.match(/Question: (.+?)(?=\n8\.\))/);
    const correctAnswerMatch = text.match(/CorrectAnswer: (.+?)(?:\n|$)/);

    const newApiData = {
      language: languageMatch ? languageMatch[1] : '',
      date: dateMatch ? dateMatch[1] : '',
      level: levelMatch ? levelMatch[1] : '',
      type_of_question: typeOfQuestionMatch ? typeOfQuestionMatch[1] : '',
      category: categoryMatch ? categoryMatch[1] : '',
      temperature: temperatureMatch ? parseFloat(temperatureMatch[1]) : 0,
      question: questionMatch ? questionMatch[1] : '',
      correctAnswer: correctAnswerMatch ? correctAnswerMatch[1] : '',
    };

    setApiOpenQuestionData(newApiData);
  };
  const handleTextToJSONFillGaps = (text: string) => {
    const languageMatch = text.match(/Language: ([^\n]*)(?=\n)/);
    const dateMatch = text.match(/Date: ([^\n]*)(?=\n)/);
    const temperatureMatch = text.match(/Temperature: ([^\n]*)(?=\n)/);
    const wordsMatch = text.match(/Words:\n([\s\S]*?)(?=\n[A-Z]|$)/);
    const levelMatch = text.match(/Level: ([^\n]*)(?=\n)/);
    const textMatch = text.match(/Text: ([^\n]*)(?=\n)/);
    const textWithGapsMatch = text.match(/TextWithGaps: ([^\n]*)(?=\n)/);
    const wordsAndAnswersMatch = text.match(/Words:\n([\s\S]*?)(?=\n[A-Z]|$)/);

    const wordsArray = wordsMatch ? wordsMatch[1].split('\n') : [];
    const wordsObject = {} as { [key: string]: boolean };
    wordsArray.forEach((line) => {
      const wordsInLine = line.trim().split(/\s+/);
      wordsInLine.forEach((word) => {
        const cleanedWord = word.replace(/^\(A\)/, '').trim(); // Rimuove (A) dalla parola
        if (cleanedWord !== '') {
          wordsObject[cleanedWord] = false;
        }
      });
    });

    setApiFillGapsData({
      language: languageMatch ? languageMatch[1] : '',
      date: dateMatch ? dateMatch[1] : '',
      temperature: temperatureMatch ? parseFloat(temperatureMatch[1]) : 0,
      words: wordsObject,
      level: levelMatch ? levelMatch[1] : '',
      text: textMatch ? textMatch[1] : '',
      textWithGaps: textWithGapsMatch ? textWithGapsMatch[1] : '',
      wordsAndAnswers: wordsAndAnswersMatch ? wordsAndAnswersMatch[1] : '',
    });
  };

  //todo togliere le (A)
  const handleTextToJSONMultipleChoice = (text: string) => {
    const languageMatch = text.match(/Language: ([^\n]*)(?=\n)/);
    const dateMatch = text.match(/Date: ([^\n]*)(?=\n)/);
    const levelMatch = text.match(/Level: ([^\n]*)(?=\n)/);
    const temperatureMatch = text.match(/Temperature: ([^\n]*)(?=\n)/);
    const neddMatch = text.match(/Nedd: ([^\n]*)(?=\n)/);
    const n_o_dMatch = text.match(/N_o_d: ([^\n]*)(?=\n)/);
    const categoryMatch = text.match(/Category:(.+?)(?=\s\d|\b|$)/);
    const questionMatch = text.match(
      /Question: ((?:[^\n]|\n(?!CorrectAnswerIndex|\d{1,2}\.\)))+)/
    );
    const correctAnswerMatch = text.match(/CorrectAnswerIndex: ([^\n]*)(?=\n)/);
    const answersMatch = text.match(/Answers:\n([\s\S]*?)(?=\n[A-Z]|$)/);
    const solutionMatch = text.match(
      /Solution: ((?:[^\n]|\n(?!.*\d{1,2}\.\)))+)/
    );

    if (correctAnswerMatch !== null) {
      const correctAnswerIndex = correctAnswerMatch
        ? parseInt(correctAnswerMatch[1])
        : -1;
      const answersArray = answersMatch ? answersMatch[1].split('\n') : [];
      const answersObject = {} as { [key: string]: boolean };
      answersArray.forEach((line, index) => {
        const answer = line.trim();
        if (answer !== '') {
          answersObject[answer] = index === correctAnswerIndex;
        }
      });

      setApiMultipleChiocesData({
        language: languageMatch ? languageMatch[1] : '',
        date: dateMatch ? dateMatch[1] : '',
        level: levelMatch ? levelMatch[1] : '',
        temperature: temperatureMatch ? parseFloat(temperatureMatch[1]) : 0,
        nedd: neddMatch ? parseInt(neddMatch[1]) : 0,
        n_o_d: n_o_dMatch ? parseInt(n_o_dMatch[1]) : 0,
        category: categoryMatch ? categoryMatch[1].trim() : '',
        question: questionMatch ? questionMatch[1].trim() : '',
        correctAnswer: correctAnswerMatch ? correctAnswerMatch[1] : '',
        answers: answersObject,
        solution: solutionMatch ? solutionMatch[1].trim() : '',
      });
    } else {
      console.log('error in correctAnswerIndexMatch');
    }
  };

  const handleData = () => {
    const temp: OerData = {
      title: title,
      description: description,
      publication_date: new Date().toISOString(),
      language: 'English',
      generated_by_ai: true,
      assessment_oer: true,
      assessment_oer_type: exercise || '',
      source: sourceText,
      level:
        targetLevelFillGaps?.title ||
        targetLevelOpenQuestion?.title ||
        targetLevelMultipleChoice?.title ||
        '',
      temperature: temperature,
      exercise_value: {
        question: question || null,
        fill_template: fillTemplate || null,
        fill_template_with_gaps: fillTemplateWithGaps || null,
        category:
          questionCategoryMultipleChoice?.title ||
          questionCategoryOpenQuestion?.title ||
          null,
        type: exerciseType?.title || questionType?.title || null,
        number_of_correct_answer: correctAnswer || null,
        number_of_easy_distractors: easyDistractors || null,
        number_of_distractors: distractors || null,
        number_of_words: chosenLenght || null,
        options: options || null,
        solution: solution || null,
      },
    };
    setData(temp);
  };

  const handleTitle = (selected: string) => {
    setTitle(selected);
  };

  const handleDescription = (selected: string) => {
    setDescription(selected);
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

  // const handleApiKey = (selected: string) => {
  //   setApiKey(selected);
  // };

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
        // apiKey,
        // handleApiKey,
        apiOpenQuestionData,
        handleTextToJSONOpenQuestion,
        apiFillGapsData,
        handleTextToJSONFillGaps,
        apiMultipleChiocesData,
        handleTextToJSONMultipleChoice,
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
        //handleChosenTargetLevel,
        exercise,
        handleExercise,
        temperature,
        //handleTemperature,
        distractors,
        handleDistractors,
        questionCategory,
        handleQuestionCategory,
        sourceText,
        handleSourceText,
        chosenLenght,
        //handleChosenLenght,
        chosenCategory,
        //handleChosenCategory,
        chosenType,
        //handleChosenType,
        data,
        handleData,
        title,
        handleTitle,
        description,
        handleDescription,
        question,
        handleQuestion,
        options,
        handleOptions,
        handleOptionsChange,
        solution,
        handleSolution,
        fillTemplate,
        handleFillTemplate,
        fillTemplateWithGaps,
        handleFillTemplateWithGaps,
      }}
    >
      {children}
    </CreateOERsContext.Provider>
  );
};
