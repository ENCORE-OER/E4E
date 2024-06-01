import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import LessonCard from '.';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import {
  LessonCardProps,
  PassFailConditionsProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import AddPassFailConditionModal from '../../Modals/LearningPathModals/AddPassFailConditionModal';

type LessonCardsListProps = {
  isSmallerScreen?: boolean;
};

export default function LessonCardsList({
  isSmallerScreen,
}: LessonCardsListProps) {
  const hydrated = useHasHydrated();

  const { lessonCards, setLessonCards } = useLearningPathDesignContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [condition, setCondition] = useState<string>('');
  const [isPass, setIsPass] = useState<boolean>(true);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [selectedConditionIndex, setSelectedConditionIndex] = useState<
    number | null
  >(null);

  const updatePassFailConditions = (
    indexLesson: number,
    newCondition: PassFailConditionsProps
  ) => {
    console.log('Index: ', indexLesson);

    setLessonCards((prevLessonCards) =>
      prevLessonCards.map((card: LessonCardProps, idxCard: number) => {
        // Check i'm working on the right card
        if (idxCard === indexLesson) {
          const updatedConditions = [
            ...(card.lesson?.passFailConditions || []),
          ];
          // Check if the index of the condition is passed by parameter, that means i'm changing his value
          if (selectedConditionIndex !== null) {
            updatedConditions[selectedConditionIndex] = newCondition;
            // Else i'm adding a new condition
          } else {
            updatedConditions.push(newCondition);
          }
          return {
            ...card,
            lesson: {
              ...card.lesson,
              passFailConditions: updatedConditions,
            },
          };
        }
        return card;
      })
    );
  };

  const handleAddCondition = (
    index: number,
    newCondition: PassFailConditionsProps
  ) => {
    updatePassFailConditions(index, newCondition);
    onClose();
    setSelectedConditionIndex(null);
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

  const handleOpenModal = (
    indexCard: number,
    conditionIndex: number | null = null
  ) => {
    //setPassFailConditions((prevConditions: PassFailConditionsProps[]) => [...prevConditions, { condition: 'condition', isPass: true }]);
    setSelectedCardIndex(indexCard);
    setSelectedConditionIndex(conditionIndex);

    if (conditionIndex !== null) {
      const conditionToEdit =
        lessonCards[indexCard].lesson.passFailConditions[conditionIndex];
      setCondition(conditionToEdit.condition);
      setIsPass(conditionToEdit.isPass);
    } else {
      setCondition('');
      setIsPass(true);
    }
    onOpen();
  };

  useEffect(() => {
    console.log('Sto settando');
    setLessonCards([
      {
        lesson: {
          lessonTitle: 'Lesson title',
          lessonType: 'Lesson Type',
          activityDescription: 'Activity description',
          activityType: 'Activity Type',
          timeDuration: 20,
          passFailConditions: [],
        },
      },
      {
        lesson: {
          lessonTitle: 'Lesson title',
          lessonType: 'Lesson Type',
          activityDescription: 'Activity description',
          activityType: 'Activity Type',
          timeDuration: 30,
          passFailConditions: [],
        },
      },
    ]);
  }, []);

  useEffect(() => {
    console.log(lessonCards);
  }, [lessonCards]);

  useEffect(() => {
    console.log(selectedCardIndex);
  }, [selectedCardIndex]);

  return (
    <>
      <Flex direction="column" w="100%" gap={3}>
        {hydrated &&
          lessonCards.length > 0 &&
          lessonCards.map((lessonCard: LessonCardProps, indexCard: number) => (
            <LessonCard
              key={indexCard}
              indexCard={indexCard}
              lesson={lessonCard.lesson}
              isSmallerScreen={isSmallerScreen}
              handleOpenModal={handleOpenModal}
            />
          ))}
      </Flex>
      {selectedCardIndex !== null && (
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
      )}
      {/* <ChangePassFailConditionModal
                // handleOpenModal={() => { if (selectedCardIndex) handleOpenModal(selectedCardIndex) }}
                indexCard={selectedCardIndex}
                handleChangeCondition={handleChangeCondition}
                condition={condition}
                isOpen={isOpen}
                isPass={isPass}
                onClose={onClose}
                setCondition={setCondition}
                setIsPass={setIsPass}
            /> */}
    </>
  );
}
