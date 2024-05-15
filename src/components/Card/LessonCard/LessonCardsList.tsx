import { Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LessonCard from ".";
import { useLearningPathDesignContext } from "../../../Contexts/LearningPathDesignContext";
import { LessonCardProps, PassFailConditionsProps } from "../../../types/encoreElements";
import { useHasHydrated } from "../../../utils/utils";
import AddPassFailConditionModal from "../../Modals/LearningPathModals/AddPassFailConditionModal";

type LessonCardsListProps = {
    isSmallerScreen?: boolean;
}

export default function LessonCardsList({
    isSmallerScreen
}: LessonCardsListProps) {

    const hydrated = useHasHydrated();

    const {
        lessonCards,
        setLessonCards,
    } = useLearningPathDesignContext();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [condition, setCondition] = useState<string>('');
    const [isPass, setIsPass] = useState<boolean>(true);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);


    const updatePassFailConditions = (index: number, newCondition: PassFailConditionsProps) => {
        console.log("Index: ", index);
        setLessonCards((prevLessonCards) =>
            prevLessonCards.map((card: LessonCardProps, idx: number) => {
                if (idx === index) {
                    return {
                        ...card,
                        lesson: {
                            ...card.lesson,
                            passFailConditions: [...(card.lesson?.passFailConditions), newCondition]
                        }
                    };
                }

                return card;
            })
        );
    };

    const handleAddCondition = (index: number, newCondition: PassFailConditionsProps) => {

        updatePassFailConditions(index, newCondition);

        // setPassFailConditions((prevConditions: PassFailConditionsProps[]) => [
        //     ...prevConditions,
        //     { condition, isPass }
        // ]);
        onClose();
    };

    // const removePassFailCondition = (indexCard: number, conditionIndex: number) => {
    //     setLessonCards((prevLessonCards) =>
    //         prevLessonCards.map((card, idx) => {
    //             if (idx === indexCard) {
    //                 return {
    //                     ...card,
    //                     passFailConditions: card.lesson.passFailConditions?.filter((_, i) => i !== conditionIndex) || []   // '_' represents the current element of the array, but is not used. The use of '_' is a convention to indicate that this parameter is not needed.
    //                 };
    //             }
    //             return card;
    //         })
    //     );
    // };



    const handleOpenModal = (index: number) => {
        //setPassFailConditions((prevConditions: PassFailConditionsProps[]) => [...prevConditions, { condition: 'condition', isPass: true }]);
        setSelectedCardIndex(index);
        setCondition('');
        setIsPass(true);
        onOpen();
    }

    useEffect(() => {
        console.log("Sto settando")
        setLessonCards([
            {
                lesson: {
                    lessonTitle: 'Lesson title',
                    activityDescription: 'Activity description',
                    activityType: 'Activity Type',
                    lessonType: 'Lesson Type',
                    passFailConditions: []
                }
            },
            {
                lesson: {
                    lessonTitle: 'Lesson title',
                    activityDescription: 'Activity description',
                    activityType: 'Activity Type',
                    lessonType: 'Lesson Type',
                    passFailConditions: [],
                }
            }
        ])
    }, [])

    useEffect(() => {
        console.log(lessonCards);
    }, [lessonCards])

    useEffect(() => {
        console.log(selectedCardIndex);
    }, [selectedCardIndex])

    return (
        <>
            <Flex direction='column' w="100%" gap={3}>
                {hydrated && lessonCards.length > 0 && lessonCards.map((lessonCard: LessonCardProps, indexCard: number) => (
                    <LessonCard
                        key={indexCard}
                        indexCard={indexCard}
                        lesson={lessonCard.lesson}
                        isSmallerScreen={isSmallerScreen}
                        handleOpenModal={() => { handleOpenModal(indexCard) }}
                    />
                ))}
            </Flex>
            <AddPassFailConditionModal
                // handleOpenModal={() => { if (selectedCardIndex) handleOpenModal(selectedCardIndex) }}
                indexCard={selectedCardIndex}
                handleAddCondition={handleAddCondition}
                condition={condition}
                isOpen={isOpen}
                isPass={isPass}
                onClose={onClose}
                setCondition={setCondition}
                setIsPass={setIsPass}
            />

        </>
    );
}