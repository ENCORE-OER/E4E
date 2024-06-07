import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Icon,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  activityTypesObjectsProps,
  LessonCardProps,
  LessonProps,
  PassFailConditionsProps,
} from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import AddPassFailConditionsButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddPassFailConditionsButton';
import EditButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/EditButtonLessonCard';
import RegenerateButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/RegenerateButtonLessonCard';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButtons/UnderlinedButton';
import ShowHideButton from '../../Buttons/ShowHideButton';
import ActivityTypeDropDownMenu from '../../DropDownMenu/ActivityTypeDropDownMenu';
import LessonDropDownMenu from '../../DropDownMenu/LessonDropDownMenu';
import AddContentModal from '../../Modals/LearningPathModals/AddContentModal';
import CustomNumberInput from '../../NumberInput/CustomNumberInput';
import TagLessonCompulsory from '../../Tags/TagsLesson/TagLessonCompulsory';
import TagLessonDuration from '../../Tags/TagsLesson/TagLessonDuration';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';
import LabelEmptyFieldTable from '../../Texts/LabelEmptyFieldTable';

export default function LessonCard({
  lesson,
  handleData,
  indexCard,
  isSmallerScreen,
  handleOpenModal,
  editLessonIndex,
  handleEditLesson,
  isEditLessonPlanClicked,
  optionsTypeOfAssignment,
  activityTypes,
}: LessonCardProps) {
  const hydrated = useHasHydrated();

  // Show Generate Learning Objectives area
  const [showBox, setShowBox] = useState<boolean>(false); // used to show the Activity

  // Handle "Add Content Modal"
  const [isAddContentModalOpen, setIsAddContentModalOpen] =
    useState<boolean>(false);

  const handleAddContentClick = () => {
    setIsAddContentModalOpen(true);
  };

  const handleCloseAddContentModal = () => {
    setIsAddContentModalOpen(false);
  };

  const handleLessonTypeChange = (selectedTypeIndex: number) => {
    handleData((previousLessons: LessonProps[]) =>
      previousLessons.map((item: LessonProps, idx: number) =>
        idx === indexCard
          ? {
            ...item,
            lessonType: optionsTypeOfAssignment[selectedTypeIndex].name,
          }
          : item
      )
    );
  };

  const handleTimeDurationChange = (value: string) => {
    handleData((prevLessons: LessonProps[]) =>
      prevLessons.map((item: LessonProps, idx: number) =>
        idx === indexCard
          ? { ...item, timeDuration: parseInt(value, 10) || 0 }
          : item
      )
    );
  };

  const handleDescriptionChange = (value: string) => {
    handleData((previousData: LessonProps[]) =>
      previousData.map((item: LessonProps, idx: number) =>
        idx === indexCard ? { ...item, activityDescription: value } : item
      )
    );
  };

  const handleActivityTypeChange = (selectedTypeIndex: number) => {
    const filteredActivityTypes = activityTypes.filter(
      (type: activityTypesObjectsProps) => type.lessonType === lesson.lessonType
    );

    const selectedActivityType =
      filteredActivityTypes[selectedTypeIndex]?.activityType;

    handleData((prevLessons: LessonProps[]) =>
      prevLessons.map((item, idx) =>
        idx === indexCard
          ? {
            ...item,
            activityType: selectedActivityType,
          }
          : item
      )
    );
  };

  const getActivityIcon = (lessonType: string, activityType: string) => {
    const activity = activityTypes.find(
      (type) => type.lessonType === lessonType && type.activityType === activityType
    );
    return activity ? activity.icon : null;
  };

  const selectedActivityIcon = getActivityIcon(lesson.lessonType, lesson.activityType);

  // const [passFailConditions, setPassFailConditions] = useState<PassFailConditionsProps[]>([]);

  useEffect(() => {
    if (editLessonIndex === indexCard) {
      handleActivityTypeChange(activityTypes.findIndex((type) => type.activityType === lesson.activityType));
    }
  }, [editLessonIndex, indexCard, lesson.activityType, handleActivityTypeChange, activityTypes]);

  return (
    <>
      <Card display="flex" borderRadius={'10px'} border={'1px'} w="100%">
        <CardHeader pb={0}>
          <Flex w="100%" direction="row">
            <Flex
              flex="1"
              justify="flex-start"
              direction="row"
              align="center"
              gap={2}
            >
              {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
                <LessonDropDownMenu
                  options={optionsTypeOfAssignment}
                  title={lesson.lessonType}
                  onChange={(selectedTypeIndex) =>
                    handleLessonTypeChange(selectedTypeIndex)
                  }
                />
              ) : (
                <TagLessonType labelTag={lesson.lessonType} />
              )}
              {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
                <CustomNumberInput
                  valueNumber={lesson.timeDuration ?? 0}
                  handleChangeValue={(value: string) =>
                    handleTimeDurationChange(value)
                  }
                  steppers={true}
                  // fontSize="small"
                  size="sm"
                  minW="75px"
                  maxW="100px"
                />
              ) : (
                <TagLessonDuration time={lesson.timeDuration} />
              )}
              <TagLessonCompulsory isChecked={true} isDisabled={true} />
            </Flex>

            <Flex
              // flex="1"
              justify="flex-end"
              direction="row"
              align="center"
              gap={5}
            >
              <EditButtonLessonCard
                handleEditClick={() => handleEditLesson(indexCard)}
                isEditClicked={
                  editLessonIndex === indexCard || isEditLessonPlanClicked
                }
              // isDisabled={true}
              />
              <RegenerateButtonLessonCard
                isDisabled={true}
                handleRegenerateClick={() => console.log('regenerate')}
              />
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody justifyContent="flex-start" display="flex" w="100%" py={0}>
          <Flex w="100%" direction="column">
            <Flex p={3}>
              <ShowHideButton
                showBox={showBox}
                setShowBox={setShowBox}
                showButtonName={`${indexCard + 1}. ${lesson.lessonTitle}`}
                isUpDown={false}
                fontWeight="bold"
                color="primary"
                border="none"
                fontSize="x-large"
              />
            </Flex>
            {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
              <Textarea
                value={lesson.activityDescription}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Short summary of the activity"
              // fontSize="small"
              />
            ) : (
              <Text
                noOfLines={showBox ? undefined : 1}
                variant="description_card"
              >
                {lesson.activityDescription || (
                  <LabelEmptyFieldTable
                    label="Short summary of the activity"
                    fontSize="auto"
                  />
                )}
              </Text>
            )}
            <Flex direction="column" gap={0.5} pt={1}>
              {showBox &&
                hydrated &&
                lesson.passFailConditions?.length > 0 &&
                lesson.passFailConditions?.map(
                  (
                    condition: PassFailConditionsProps,
                    indexCondition: number
                  ) => (
                    <Flex
                      direction="row"
                      gap={3}
                      align="center"
                      key={indexCondition}
                    >
                      <Flex
                        direction="row"
                        gap={1}
                        py={1}
                        px={3}
                        bg={condition.isPass ? 'green.100' : 'red.100'}
                        borderRadius={10}
                        w="50%"
                      >
                        <Text fontWeight={'bold'}>
                          {condition.isPass ? 'If pass: ' : 'If fail: '}
                        </Text>
                        <Text>{condition.condition}</Text>
                      </Flex>
                      <UnderlinedButton
                        handleClick={() => {
                          handleOpenModal !== undefined &&
                            indexCard !== undefined &&
                            handleOpenModal(indexCard, indexCondition);
                        }}
                        nameButton="Change"
                        fontWeight="normal"
                      />
                    </Flex>
                  )
                )}
            </Flex>
          </Flex>
        </CardBody>

        <CardFooter>
          <Flex direction="row" w="100%" align="center">
            <Flex
              direction="row"
              gap={1}
              flex="1"
              justify="flex-start"
              align="center"
            >
              <Text fontWeight="bold">Activity type: </Text>
              {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
                <ActivityTypeDropDownMenu
                  activityTypes={activityTypes}
                  title={lesson.activityType}
                  //selectedOption={row.activityType}
                  lessonType={lesson.lessonType}
                  onChange={(selectedTypeIndex) =>
                    handleActivityTypeChange(selectedTypeIndex)
                  }
                  size="md"
                />
              ) : (
                lesson.activityType ?
                  <Flex align="center" gap={2}>
                    <Text>{lesson.activityType}</Text>
                    {selectedActivityIcon && <Icon>{selectedActivityIcon}</Icon>}
                  </Flex> :
                  <LabelEmptyFieldTable fontSize="auto" label="Type of Activity" />
              )}
            </Flex>

            <Flex
              direction="row"
              gap={3}
              flex="1"
              justify="flex-end"
              align="center"
            >
              <AddPassFailConditionsButton
                handleOpenModal={() => {
                  handleOpenModal !== undefined &&
                    indexCard !== undefined &&
                    handleOpenModal(indexCard, null);
                }}
                isSmallerScreen={isSmallerScreen}
              />
              <AddContentButton onClick={handleAddContentClick} />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
      />
    </>
  );
}
