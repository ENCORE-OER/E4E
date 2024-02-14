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
    targetLevel: Option;
    handleSetTargetLevel: (selected: Option) => void;
    // difficultLevel: Option;
    // handleSetDifficultLevel: (selected: Option) => void;
    questionType: Option;
    handleSetQuestionType: (selected: Option) => void;
    exerciseType: Option;
    handleSetExerciseType: (selected: Option) => void;
    questionCategory: Option;
    handleSetQuestionCategory: (selected: Option) => void;
    length: Option;
    handleSetLength: (selected: Option) => void;
    distractors: number;
    handleSetDistractors: (selected: number | string) => void;
    easyDistractors: number;
    handleSetEasyDistractors: (selected: number | string) => void;
    blanks: number;
    handleSetBlanks: (selected: number | string) => void;
    correctAnswer: number;
    handleSetCorrectAnswer: (selected: number | string) => void;
    handleResetOptions: () => void;
};

export const CreateOERsContext =
    createContext<CreateOERsContextProps>(
        {} as CreateOERsContextProps
    );

// Create a custom hook to use the context
export const useCreateOERsContext = () =>
    useContext(CreateOERsContext);

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
    const [targetLevel, setTargetLevel] = useLocalStorage<Option>('targetLevel', {
        title: '',
    });
    // const [difficultLevel, setDifficultLevel] = useLocalStorage<Option>('difficultLevel', {
    //     title: '',
    // });
    const [length, setLength] = useLocalStorage<Option>('lenght', {
        title: '',
    });
    const [questionType, setQuestionType] = useLocalStorage<Option>('questionType', {
        title: '',
    });
    const [questionCategory, setQuestionCategory] = useLocalStorage<Option>('questionCategory', {
        title: '',
    });
    const [exerciseType, setExerciseType] = useLocalStorage<Option>('exerciseType', {
        title: '',
    });

    const [distractors, setDistractors] = useLocalStorage<number>('distractors', 0);
    const [easyDistractors, setEasyDistractors] = useLocalStorage<number>('easyDistractors', 0);
    const [blanks, setBlanks] = useLocalStorage<number>('blanks', 1);
    const [correctAnswer, setCorrectAnswer] = useLocalStorage<number>('correctAnswer', 1);

    const handleSetTargetLevel = (selected: Option) => {
        setTargetLevel(selected);
    }
    // const handleSetDifficultLevel = (selected: Option) => {
    //     setDifficultLevel(selected);
    // }
    const handleSetQuestionType = (selected: Option) => {
        setQuestionType(selected);
    }
    const handleSetExerciseType = (selected: Option) => {
        setExerciseType(selected);
    }
    const handleSetQuestionCategory = (selected: Option) => {
        setQuestionCategory(selected);
    }
    const handleSetLength = (selected: Option) => {
        setLength(selected);
    }
    const handleSetDistractors = (number: number | string) => {
        setDistractors(number as number);
    }
    const handleSetEasyDistractors = (number: number | string) => {
        setEasyDistractors(number as number);
    }
    const handleSetBlanks = (number: number | string) => {
        setBlanks(number as number);
    }
    const handleSetCorrectAnswer = (number: number | string) => {
        setCorrectAnswer(number as number);
    }

    const handleResetOptions = () => {
        setTargetLevel({ title: '' });
        // setDifficultLevel({ title: '' });
        setQuestionType({ title: '' });
        setExerciseType({ title: '' });
        setQuestionCategory({ title: '' });
        setLength({ title: '' });
        setDistractors(0);
        setBlanks(1);
        setEasyDistractors(0);
    }

    return (
        <CreateOERsContext.Provider
            value={{
                targetLevelOptions,
                // difficultLevelOptions,
                lengthOptions,
                questionTypeOptions,
                questionCategoryOptions,
                exerciseTypeOptions,
                targetLevel,
                handleSetTargetLevel,
                // difficultLevel,
                //handleSetDifficultLevel,
                questionType,
                handleSetQuestionType,
                exerciseType,
                handleSetExerciseType,
                questionCategory,
                handleSetQuestionCategory,
                length,
                handleSetLength,
                distractors,
                handleSetDistractors,
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
