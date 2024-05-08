import { createContext, useContext, useState } from 'react';
import {
  GeneratedExerciseProps,
  OerData,
  Option,
  OptionsData,
  assignmentTypeOptions,
  targetLevelOptions,
} from '../types/encoreElements/index';

//context props
type CreateOERsContextProps = {
  // * controllo delle variabili dopo il click del bottone generate
  isGenerateButtonClicked: boolean;
  handleIsGenerateButtonClicked: (bool: boolean) => void;

  // * General variables
  bloomLevelExercise: Option | null;
  handleBloomLevelExercise: (selected: Option) => void;
  targetLevel: Option | null;
  handleTargetLevel: (selected: Option) => void;
  assignmentType: Option | null;
  handleAssignmentType: (selected: Option | number) => void;
  temperature: Option | null;
  handleTemperature: (selected: Option) => void;
  chosenTopic: string;
  handleChosenTopic: (selected: string) => void;
  macroSubject: string;
  handleMacroSubject: (selected: string) => void;
  learningObjective: string;
  handleLearningObjective: (selected: string) => void;

  // * variabili Fill Gaps
  distractorsFillGaps: number;
  handleDistractorsFillGaps: (selected: number | string) => void;
  easyDistractorsFillGaps: number;
  handleEasyDistractorsFillGaps: (selected: number | string) => void;
  blanks: number;
  handleBlanks: (selected: number | string) => void;

  // * variabili Open Question
  questionType: Option | null;
  handleQuestionType: (selected: Option) => void;

  // * variabili Multiple Choice
  distractorsMultipleChoice: number;
  handleDistractorsMultipleChoice: (selected: number | string) => void;
  easyDistractors: number;
  handleEasyDistractors: (selected: number | string) => void;
  correctAnswerQuiz: number;
  handleCorrectAnswerQuiz: (selected: number | string) => void;

  // * dati per il json
  // todo: metterle sul local storage e fare una funzione per resettarle
  typeOfExercisePanel: string | null;
  handleTypeOfExercisePanel: (selected: number) => void;
  chosenTargetLevel: number | null;
  //handleChosenTargetLevel: (selected: Option) => void;
  ChosenTemperature: number;
  //handleTemperature: (selected: Option) => void;
  distractors: number;
  handleDistractors: (selected: number) => void;
  questionCategory: string;
  handleQuestionCategory: (selected: Option) => void;
  sourceText: string; // material
  handleSourceText: (selected: string) => void;
  chosenTypeOfExercise: number;
  handleChosenTypeOfExercise: (selected: Option) => void;
  chosenTypeOfAssignment: number;
  //handleChosenType: (selected: Option) => void;
  data: OerData;
  handleData: () => void;
  title: string;
  handleTitle: (selected: string) => void;
  description: string;
  handleDescription: (selected: string) => void;
  question: string;
  handleQuestion: (selected: string) => void;
  options: OptionsData[];
  handleOptions: (option: OptionsData) => void;
  handleOptionsChange: (selected: OptionsData[]) => void;
  solution: string;
  handleSolution: (selected: string) => void;
  fillTemplate: string;
  handleFillTemplate: (selected: string) => void;
  fillTemplateWithGaps: string;
  handleFillTemplateWithGaps: (selected: string) => void;

  // * altro
  apiGeneratedExerciseData: GeneratedExerciseProps;
  handleGeneratedExerciseData: (
    Assignment: string,
    Plus: string,
    Solutions: string[],
    Distractors: string[],
    EasilyDiscardableDistractors: string[]
  ) => void;
};

export const CreateOERsContext = createContext<CreateOERsContextProps>(
  {} as CreateOERsContextProps
);
// Create a custom hook to use the context
export const useCreateOERsContext = () => useContext(CreateOERsContext);
// Create a provider to wrap the app and provide the context to all its children
export const CreateOERsProvider = ({ children }: any) => {
  // * General variables
  const [bloomLevelExercise, setBloomLevelExercise] = useState<Option | null>(
    null
  );
  const [targetLevel, setTargetLevel] = useState<Option | null>(null);
  const [assignmentType, setAssignmentType] = useState<Option | null>(null);
  const [temperature, setTemperature] = useState<Option | null>(null);
  const [chosenTopic, setChosenTopic] = useState<string>('');
  const [macroSubject, setMacroSubject] = useState<string>('');
  const [learningObjective, setLearningObjective] = useState<string>('');

  // * variabili per il Fill Gaps
  const [distractorsFillGaps, setDistractorsFillGaps] = useState<number>(0);
  const [easyDistractorsFillGaps, setEasyDistractorsFillGaps] =
    useState<number>(0);
  const [blanks, setBlanks] = useState<number>(1);

  // * variabili per l'Open Question
  const [questionType, setQuestionType] = useState<Option | null>(null);

  // * variabili per il Multiple Choice
  const [distractorsMultipleChoice, setDistractorsMultipleChoice] =
    useState<number>(1);
  const [easyDistractors, setEasyDistractors] = useState<number>(0);
  const [correctAnswerQuiz, setCorrectAnswerQuiz] = useState<number>(1);

  // * dati per il json
  const [chosenTargetLevel, setChosenTargetLevel] = useState<number | null>(
    null
  );
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [typeOfExercisePanel, setTypeOfExercisePanel] = useState<string | null>(
    'Open Question'
  );
  const [ChosenTemperature, setChosenTemperature] = useState<number>(0.2);
  const [distractors, setDistractors] = useState<number>(0);
  const [questionCategory, setQuestionCategory] = useState<string>('');
  const [sourceText, setSourceText] = useState<string>(''); // url or text. Used to generate the exercise (material)
  const [chosenTypeOfExercise, setChosenTypeOfExercise] = useState<number>(0);
  const [chosenTypeOfAssignment, setChosenTypeOfAssignment] =
    useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [options, setOptions] = useState<OptionsData[]>([]);
  const [fillTemplate, setFillTemplate] = useState<string>('');
  const [fillTemplateWithGaps, setFillTemplateWithGaps] = useState<string>('');
  const [data, setData] = useState({} as OerData);

  const [apiGeneratedExerciseData, setApiGeneratedExerciseData] =
    useState<GeneratedExerciseProps>({
      // language: '',
      // date: '',
      // temperature: 0,
      // words: {} as { [key: string]: boolean },
      // level: '',
      // text: '',
      // textWithGaps: '',
      // wordsAndAnswers: '',
      Assignment: '',
      Plus: '',
      Solutions: [],
      Distractors: [],
      EasilyDiscardableDistractors: [],
    });

  // * altro
  const [isGenerateButtonClicked, setIsGenerateButtonClicked] = useState(false);

  // * handle functions

  // * General
  const handleBloomLevelExercise = (selected: Option) => {
    setBloomLevelExercise(selected);
  };
  const handleTargetLevel = (selected: Option) => {
    setTargetLevel(selected);
    handleChosenTargetLevel(selected);
  };
  const handleTemperature = (selected: Option) => {
    setTemperature(selected);
    handleChoosenTemperature(selected);
  };
  const handleAssignmentType = (selected: Option | number) => {
    if (selected === 0 || selected === 1 || selected === 2) {
      setAssignmentType(assignmentTypeOptions[selected as number]);
    } else {
      setAssignmentType(selected as Option);
    }
    handleChosenTypeOfAssignment(selected); // here we set the exercise type as a number
  };
  const handleChosenTopic = (selected: string) => {
    setChosenTopic(selected);
  };
  const handleMacroSubject = (selected: string) => {
    setMacroSubject(selected);
  };
  const handleLearningObjective = (selected: string) => {
    setLearningObjective(selected);
  };

  // * Fill Gaps
  const handleDistractorsFillGaps = (number: number | string) => {
    setDistractorsFillGaps(number as number);
  };
  const handleEasyDistractorsFillGaps = (number: number | string) => {
    setEasyDistractorsFillGaps(number as number);
  };
  const handleBlanks = (number: number | string) => {
    setBlanks(number as number);
  };

  // * Open Question

  // Is used for segmented button in Question Panel
  const handleQuestionType = (selected: Option) => {
    setQuestionType(selected); // here we set the question type as a string
    handleChosenTypeOfExercise(selected); // here we set the question type as a number
  };

  // * Multiple Choice
  const handleDistractorsMultipleChoice = (number: number | string) => {
    setDistractorsMultipleChoice(number as number);
    handleDistractors(number as number);
  };
  const handleEasyDistractors = (number: number | string) => {
    setEasyDistractors(number as number);
  };
  const handleCorrectAnswerQuiz = (number: number | string) => {
    setCorrectAnswerQuiz(number as number);
    // To avoid to set the type of exercise if the user has already chosen it
    if (number === '1' && chosenTypeOfExercise !== 4) {
      // 4 = Single Choice
      handleChosenTypeOfExercise({ title: 'Single Choice' });
    } else if (Number(number) > 1 && chosenTypeOfExercise !== 5) {
      handleChosenTypeOfExercise({ title: 'Multiple Choice' });
    }
  };

  // * dati per il json
  const handleSourceText = (selected: string) => {
    setSourceText(selected);
  };
  const handleChosenTargetLevel = (selected: Option) => {
    switch (selected) {
      case targetLevelOptions[0]:
        setChosenTargetLevel(0);
        break;
      case targetLevelOptions[1]:
        setChosenTargetLevel(1);
        break;
      case targetLevelOptions[2]:
        setChosenTargetLevel(2);
        break;
      case targetLevelOptions[3]:
        setChosenTargetLevel(3);
        break;
      case targetLevelOptions[4]:
        setChosenTargetLevel(4);
        break;
      default:
        console.log('Error in chosen Target Level!');
        setChosenTargetLevel(null);
    }
  };
  // Si riferisce ai pannelli
  const handleTypeOfExercisePanel = (selected: number) => {
    switch (selected) {
      case 0:
        setTypeOfExercisePanel('Open Question'); // TODO: creare una variabili costante per il nome del pannello (OPEN_QUESTION = 'Open Question')
        if (questionType !== null) {
          // Update the type of exercise if the user has already chosen it when the user changes the panel
          handleChosenTypeOfExercise(questionType);
        }
        break;
      case 1:
        setTypeOfExercisePanel('Fill the Gaps'); // TODO: creare una variabili costante per il nome del pannello (FILL_THE_GAPS = 'Fill the Gaps')
        handleChosenTypeOfExercise({ title: 'Fill the Gaps' }); // Update the type of exercise when the user changes the panel
        break;
      case 2:
        setTypeOfExercisePanel('Multiple Choice'); // TODO: creare una variabili costante per il nome del pannello (MULTIPLE_CHOICE = 'Multiple Choice')
        if (correctAnswerQuiz == 1 && chosenTypeOfExercise !== 4) {
          // Update the type of exercise if the user has already chosen it when the user changes the panel
          handleChosenTypeOfExercise({ title: 'Single Choice' });
        } else if (correctAnswerQuiz > 1 && chosenTypeOfExercise !== 5) {
          handleChosenTypeOfExercise({ title: 'Multiple Choice' });
        }
        break;
      default:
        console.log('Error in chosen Exercise!');
    }
  };
  const handleChoosenTemperature = (selected: Option) => {
    switch (selected.title) {
      case 'Low':
        setChosenTemperature(0.2);
        break;
      case 'Medium':
        setChosenTemperature(0.6);
        break;
      case 'High':
        setChosenTemperature(0.9);
        break;
      default:
        setChosenTemperature(0.2);
    }
  };

  // Si riferisce ai diversi tipi di esercizi di Open Question
  const handleChosenTypeOfExercise = (selected: Option) => {
    switch (selected.title) {
      case 'Open': // TODO: creare una variabili costante per il nome del pannello (OPEN = 'Open')
        setChosenTypeOfExercise(0);
        //handleTypeOfExercisePanel(0);
        break;
      case 'Short Answer': //TODO: creare una variabili costante per il nome del pannello (SHORT_ANSWER = 'Short Answer')
        setChosenTypeOfExercise(1);
        //handleTypeOfExercisePanel(0);
        break;
      case 'True False': //TODO: creare una variabili costante per il nome del pannello (TRUE_FALSE = 'True False')
        setChosenTypeOfExercise(2);
        //handleTypeOfExercisePanel(0);
        break;
      case 'Fill the Gaps': //TODO: creare una variabili costante per il nome del pannello (FILL_THE_GAPS = 'Fill the Gaps')
        setChosenTypeOfExercise(3);
        //handleTypeOfExercisePanel(1);
        break;
      case 'Single Choice': //TODO: creare una variabili costante per il nome del pannello (SINGLE_CHOICE = 'Single Choice')
        setChosenTypeOfExercise(4);
        //handleTypeOfExercisePanel(2);
        break;
      case 'Multiple Choice': //TODO: creare una variabili costante per il nome del pannello (MULTIPLE_CHOICE = 'Multiple Choice')
        setChosenTypeOfExercise(5);
        //handleTypeOfExercisePanel(2);
        break;
      default:
        setChosenTypeOfExercise(0);
    }
  };
  const handleChosenTypeOfAssignment = (selected: Option | number) => {
    switch (selected) {
      case { title: 'Theoretical' } || 0:
        setChosenTypeOfAssignment(0);
        break;
      case { title: 'Code' } || 1:
        setChosenTypeOfAssignment(1);
        break;
      case { title: 'Practical' } || 2: // problem resolution
        setChosenTypeOfAssignment(2);
        break;
      default:
        setChosenTypeOfAssignment(0);
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
  const handleOptions = (option: OptionsData) => {
    console.log('options', options);
    const updatedOptions = [...options];
    const index = options.findIndex(([text]) => text === option[0]);

    // Se l'opzione esiste, la sostituiamo con quella nuova
    if (index !== -1) {
      updatedOptions[index] = option;
    } else {
      // Altrimenti, aggiungiamo l'opzione all'array
      updatedOptions.push(option);
    }

    // Chiamiamo handleOptionsChange con l'array aggiornato
    handleOptionsChange(updatedOptions);
  };
  const handleOptionsChange = (newOptions: OptionsData[]) => {
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

  const handleGeneratedExerciseData = (
    Assignment: string,
    Plus: string,
    Solutions: string[],
    Distractors: string[],
    EasilyDiscardableDistractors: string[]
  ) => {
    setApiGeneratedExerciseData({
      Assignment: Assignment,
      Plus: Plus,
      Solutions: Solutions,
      Distractors: Distractors,
      EasilyDiscardableDistractors: EasilyDiscardableDistractors,
    });
  };

  // const handleStringBoolToString = (array: OptionsData[]) => {
  //   // Utilizziamo il metodo map per trasformare ogni elemento dell'array in una stringa
  //   const stringsArray = array.map((item) => item[0]);
  //   return stringsArray;
  // };

  const handleData = () => {
    //todo modificare quando ci sarà il nuovo json
    const temp: OerData = {
      title: title,
      description: description,
      publication_date: new Date().toISOString().substring(0, 10),
      source: sourceText,
      language: 'English',
      learning_objective: learningObjective,
      topic: chosenTopic,
      assessment_oer: true,
      added_externally: true,
      generated_by_ai: true,
      exercise_values: {
        assessment_oer_type: 'Exercise',
        temperature: ChosenTemperature,
        type_of_assignment: assignmentType?.title || '',
        target_level: chosenTargetLevel || 0,
        question: question,
        solution: solution,
        number_of_correct_answer: correctAnswerQuiz,
        number_of_distractors: distractors,
        number_of_easy_distractors: easyDistractors,
        coding_starter_code: '',
        coding_test_cases: [],
        fill_template: fillTemplate,
        fill_template_with_gaps: fillTemplateWithGaps,
        options: options,
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
  const handleIsGenerateButtonClicked = (bool: boolean) => {
    setIsGenerateButtonClicked(bool);
  };

  return (
    <CreateOERsContext.Provider
      value={{
        // * altre variabili
        isGenerateButtonClicked,
        handleIsGenerateButtonClicked,
        apiGeneratedExerciseData,
        handleGeneratedExerciseData,
        // * General variables and handle functions
        bloomLevelExercise,
        handleBloomLevelExercise,
        targetLevel,
        handleTargetLevel,
        temperature,
        handleTemperature,
        assignmentType,
        handleAssignmentType,
        chosenTopic,
        handleChosenTopic,
        macroSubject,
        handleMacroSubject,
        learningObjective,
        handleLearningObjective,
        // * variabili e handle functions Fill Gaps
        distractorsFillGaps,
        handleDistractorsFillGaps,
        easyDistractorsFillGaps,
        handleEasyDistractorsFillGaps,
        blanks,
        handleBlanks,
        // * variabili e handle functions Open Question
        questionType,
        handleQuestionType, // open question, short answer, true false
        // * variabili e handle functions Multiple Choice
        distractorsMultipleChoice,
        handleDistractorsMultipleChoice,
        easyDistractors,
        handleEasyDistractors,
        correctAnswerQuiz,
        handleCorrectAnswerQuiz,
        // * variabili e handle functions per il json
        chosenTargetLevel,
        //handleChosenTargetLevel,
        typeOfExercisePanel,
        handleTypeOfExercisePanel,
        ChosenTemperature,
        //handleTemperature,
        distractors,
        handleDistractors,
        questionCategory,
        handleQuestionCategory,
        sourceText, // material
        handleSourceText,
        chosenTypeOfExercise, // 0 = Open, 1 = Short Answer, 2 = True False, 3 = Fill the Gaps, 4 = Single Choice, 5 = Multiple Choice
        handleChosenTypeOfExercise,
        chosenTypeOfAssignment, // 0 = Theoretical, 1 = Code, 2 = Practical
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
