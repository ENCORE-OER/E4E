import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import LessonCard from '.';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import {
  LessonCardProps,
  LessonProps,
  PassFailConditionsProps,
} from '../../../types/encoreElements';
import { reorderActivitiesAndFiles } from '../../../utils/indexedDB';
import { useHasHydrated } from '../../../utils/utils';
import IconDrag from '../../Icons/IconDrag/IconDrag';
import AddPassFailConditionModal from '../../Modals/LearningPathModals/AddPassFailConditionModal';

type LessonCardsListProps = {
  isSmallerScreen?: boolean;
};

export default function LessonCardsList({
  isSmallerScreen,
}: LessonCardsListProps) {
  const hydrated = useHasHydrated();

  const {
    lessonCards,
    setLessonCards,
    lessonActivities,
    setLessonActivities,
    isEditLessonPlanClicked,
    editActivityLessonIndex,
    handleEditActivityLesson,
    optionsTypeOfAssignment,
    activityTypes,
    scrollToIndex,
    setScrollToIndex,
    bloomLevelIndex,
  } = useLearningPathDesignContext();

  const activityRefs = useRef<(null | HTMLDivElement)[]>([]);

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
          const updatedConditions = [...(card.data?.passFailConditions || [])];
          // Check if the index of the condition is passed by parameter, that means i'm changing his value
          if (selectedConditionIndex !== null) {
            updatedConditions[selectedConditionIndex] = newCondition;
            // Else i'm adding a new condition
          } else {
            updatedConditions.push(newCondition);
          }
          return {
            ...card,
            data: {
              ...card.data,
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
        lessonCards[indexCard].data.passFailConditions[conditionIndex];
      setCondition(conditionToEdit.condition);
      setIsPass(conditionToEdit.isPass);
    } else {
      setCondition('');
      setIsPass(true);
    }
    onOpen();
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(lessonActivities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLessonActivities(items);

    await reorderActivitiesAndFiles(result);
  };

  // // Function to convert a LessonProps object to LessonCardProps
  // const convertLessonToCard = (lesson: LessonProps, indexCard?: number): LessonCardProps => {
  //   return {
  //     lesson: lesson,
  //     indexCard: indexCard,
  //     // Other properties if needed
  //   };
  // };

  // // Function to fill an array of LessonCardProps from an array of LessonProps
  // const convertLessonsToCards = (lessons: LessonProps[]): LessonCardProps[] => {
  //   return lessons.map((lesson, index) => convertLessonToCard(lesson, index));
  // };

  // useEffect(() => {
  //   console.log('Sto settando');
  //   const newLessonCards = convertLessonsToCards(lessonActivities);
  //   setLessonCards(newLessonCards);
  // }, [lessonActivities]);

  // useEffect(() => {
  //   console.log(lessonCards);
  // }, [lessonCards]);

  // useEffect(() => {
  //   console.log(selectedCardIndex);
  // }, [selectedCardIndex]);

  useEffect(() => {
    if (
      scrollToIndex !== null &&
      activityRefs !== null &&
      activityRefs?.current[scrollToIndex]
    ) {
      activityRefs?.current[scrollToIndex]?.scrollIntoView({
        behavior: 'auto',
      });
      setScrollToIndex(null);
    }
  }, [scrollToIndex]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <Flex
              direction="column"
              w={isSmallerScreen ? '100%' : '90%'}
              gap={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {hydrated &&
                lessonActivities.length > 0 &&
                lessonActivities.map(
                  (lessonActivity: LessonProps, indexCard: number) => (
                    <Draggable
                      key={indexCard}
                      draggableId={`draggable-${indexCard}`}
                      index={indexCard}
                    >
                      {(provided: DraggableProvided) => (
                        <Flex
                          direction="row"
                          align="center"
                          gap={2}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {isEditLessonPlanClicked && (
                            <Flex
                              justify="center"
                              px={1}
                              {...provided.dragHandleProps}
                            >
                              <IconDrag />
                            </Flex>
                          )}
                          {hydrated && (
                            <LessonCard
                              key={indexCard}
                              indexCard={indexCard}
                              data={lessonActivity}
                              handleData={setLessonActivities}
                              isSmallerScreen={isSmallerScreen}
                              handleOpenModal={handleOpenModal}
                              editLessonIndex={editActivityLessonIndex}
                              handleEditLesson={handleEditActivityLesson}
                              isEditLessonPlanClicked={isEditLessonPlanClicked}
                              optionsTypeOfAssignment={optionsTypeOfAssignment}
                              activityTypes={activityTypes[bloomLevelIndex]}
                              activityRef={(el) =>
                                (activityRefs.current[indexCard] = el)
                              }
                            />
                          )}
                        </Flex>
                      )}
                    </Draggable>
                  )
                )}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>

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
