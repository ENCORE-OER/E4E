import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  LessonProps,
  TableLearningPathProps,
  activityTypesObjectsProps,
} from '../../../types/encoreElements';
import { reorderActivitiesAndFiles } from '../../../utils/indexedDB';
import { useHasHydrated } from '../../../utils/utils';
import EditDescriptionModal from '../../Modals/LearningPathModals/EditDescriptionModal';
import LearningPathTableRow from './LearningPathTableRow';

const CustomLearningPathTable = forwardRef<
  HTMLDivElement,
  TableLearningPathProps
>((props, ref) => {
  const {
    titles,
    data,
    handleData,
    isEditLessonPlanClicked,
    handleAddContentClick,
    activityTypes,
    optionsTypeOfAssignment,
    removeLessonActivity,
    editRowIndex,
    handleEditLesson, // handleSaveLesson
    isPrinting,
    loadUploadedFiles,
  } = props;
  const hydrated = useHasHydrated();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    handleData(items);

    await reorderActivitiesAndFiles(result);
  };

  const handleLessonTypeChange = (index: number, selectedTypeIndex: number) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index
        ? {
            ...item,
            lessonType: optionsTypeOfAssignment[selectedTypeIndex].name,
          }
        : item
    );
    handleData(updatedData);
  };

  const handleActivityTypeChange = (
    index: number, // index row
    selectedTypeIndex: number
  ) => {
    const filteredActivityTypes = activityTypes.filter(
      (type: activityTypesObjectsProps) =>
        type.lessonType === data[index].lessonType
    );

    const selectedActivityType =
      filteredActivityTypes[selectedTypeIndex]?.activityType;

    const updatedData = data.map((item, idx) =>
      idx === index
        ? {
            ...item,
            activityType: selectedActivityType,
          }
        : item
    );

    console.log(updatedData);
    handleData(updatedData);
  };

  const handleTimeDurationChange = (index: number, value: string) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, timeDuration: parseInt(value, 10) || 0 } : item
    );
    handleData(updatedData);
  };

  // Handle description
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedData = data.map((item: LessonProps, idx: number) =>
      idx === index ? { ...item, activityDescription: value } : item
    );
    handleData(updatedData);
  };

  const openDescriptionModal = (index: number, description: string) => {
    setCurrentEditIndex(index);
    setCurrentDescription(description);
    onOpen();
  };

  const saveDescription = () => {
    if (currentEditIndex !== null) {
      handleDescriptionChange(currentEditIndex, currentDescription);
      onClose();
    }
  };

  // useEffect(() => {
  //   if (editRowIndex !== null) {
  //     const activityTypeIndex = activityTypes?.findIndex(
  //       (type) => type?.activityType === data[editRowIndex]?.activityType
  //     );
  //     handleActivityTypeChange(editRowIndex, activityTypeIndex);
  //   }
  // }, [editRowIndex, activityTypes, data]);

  useEffect(() => {
    if (editRowIndex !== null) {
      const activityTypeIndex = activityTypes?.findIndex(
        (type) => type?.activityType === data[editRowIndex]?.activityType
      );

      if (activityTypeIndex !== -1) {
        handleActivityTypeChange(editRowIndex, activityTypeIndex);
      }
    }
  }, [editRowIndex]);

  useEffect(() => {
    console.log('DATA: ', data);
  }, [data]);

  return (
    <Flex ref={ref}>
      <TableContainer fontSize={'sm'} borderRadius="lg" borderStyle="solid">
        <Table borderWidth="1px" borderColor="primary">
          <Thead
            bg="primary"
            color="white"
            borderWidth="2px"
            borderColor="primary"
          >
            <Tr w="fit-content">
              {isEditLessonPlanClicked && <Th px={0}></Th>}
              {hydrated &&
                titles.map((title: string, index: number) => (
                  <Th
                    key={index}
                    borderWidth="2px"
                    borderColor="primary"
                    color="white"
                    textTransform="none"
                    px={0}
                    display={
                      isPrinting && title === 'Action' ? 'none' : 'table-cell'
                    }
                    // className={isPrinting && title === 'Action' ? 'hide-on-print' : ''}
                    // maxW={index === 4 ? "30%" : 'auto'}
                    cursor="default"
                  >
                    <Flex justify="center" p={0}>
                      {title}
                    </Flex>
                  </Th>
                ))}
            </Tr>
          </Thead>
          {data.length > 0 && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided: DroppableProvided) => (
                  <Tbody
                    bg="white"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {hydrated &&
                      data.map((row: LessonProps, indexRow: number) => (
                        <Draggable
                          key={`row-${indexRow}`}
                          draggableId={`draggable-${indexRow}`}
                          index={indexRow}
                        >
                          {(provided: DraggableProvided) =>
                            hydrated && (
                              <LearningPathTableRow
                                indexRow={indexRow}
                                row={row}
                                activityTypes={activityTypes}
                                editRowIndex={editRowIndex}
                                handleAddContentClick={handleAddContentClick}
                                handleEditLesson={handleEditLesson}
                                handleLessonTypeChange={handleLessonTypeChange}
                                isEditLessonPlanClicked={
                                  isEditLessonPlanClicked
                                }
                                isPrinting={isPrinting}
                                loadUploadedFiles={loadUploadedFiles}
                                optionsTypeOfAssignment={
                                  optionsTypeOfAssignment
                                }
                                providedDraggable={provided}
                                removeLessonActivity={removeLessonActivity}
                                handleActivityTypeChange={
                                  handleActivityTypeChange
                                }
                                handleTimeDurationChange={
                                  handleTimeDurationChange
                                }
                                openDescriptionModal={openDescriptionModal}
                              />
                            )
                          }
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Tbody>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Table>
      </TableContainer>
      <EditDescriptionModal
        isOpen={isOpen}
        onClose={onClose}
        currentDescription={currentDescription}
        handleCurrentDescription={setCurrentDescription}
        saveDescription={saveDescription}
      />
    </Flex>
  );
});

CustomLearningPathTable.displayName = 'CustomLearningPathTable';
export default CustomLearningPathTable;
