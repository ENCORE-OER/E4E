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
  OerInCollectionProps,
  PassFailConditionsProps,
  UploadedFilesProps,
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
import TagContent from '../../Tags/TagsAddContent/TagContent';
import TagLessonCompulsory from '../../Tags/TagsLesson/TagLessonCompulsory';
import TagLessonDuration from '../../Tags/TagsLesson/TagLessonDuration';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';
import LabelEmptyFieldTable from '../../Texts/LabelEmptyFieldTable';

export default function LessonCard({
  data,
  handleData,
  indexCard,
  isSmallerScreen,
  handleOpenModal,
  editLessonIndex,
  handleEditLesson,
  isEditLessonPlanClicked,
  optionsTypeOfAssignment,
  activityTypes,
  activityRef,
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

  const handleActivityTitleChange = (value: string) => {
    handleData((previousData: LessonProps[]) =>
      previousData.map((item: LessonProps, idx: number) =>
        idx === indexCard ? { ...item, activityTitle: value } : item
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
      (type: activityTypesObjectsProps) => type.lessonType === data.lessonType
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
      (type) =>
        type.lessonType === lessonType && type.activityType === activityType
    );
    return activity ? activity.icon : null;
  };

  const selectedActivityIcon = getActivityIcon(
    data.lessonType,
    data.activityType
  );

  // const [passFailConditions, setPassFailConditions] = useState<PassFailConditionsProps[]>([]);

  // useEffect(() => {
  //   if (editLessonIndex === indexCard) {
  //     handleActivityTypeChange(
  //       activityTypes.findIndex(
  //         (type) => type.activityType === data.activityType
  //       )
  //     );
  //   }
  // }, [
  //   editLessonIndex,
  //   indexCard,
  //   data.activityType,
  //   handleActivityTypeChange,
  //   activityTypes,
  // ]);


  useEffect(() => {
    if (editLessonIndex !== null) {
      const activityTypeIndex = activityTypes?.findIndex(
        (type) => type?.activityType === data.activityType
      );

      if (activityTypeIndex !== -1) {
        handleActivityTypeChange(activityTypeIndex);
      }
    }
  }, [editLessonIndex]);

  return (
    <>
      <Card
        display="flex"
        borderRadius={'10px'}
        border={'1px'}
        w="100%"
        ref={(el) => {
          activityRef(el);
        }}>
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
                  title={data.lessonType}
                  onChange={(selectedTypeIndex) =>
                    handleLessonTypeChange(selectedTypeIndex)
                  }
                />
              ) : (
                <TagLessonType labelTag={data.lessonType} />
              )}
              {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
                <CustomNumberInput
                  valueNumber={data.timeDuration ?? 0}
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
                <TagLessonDuration time={data.timeDuration} />
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
            {/* Activity Title */}
            <Flex p={3}>
              {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
                <Textarea
                  value={data?.activityTitle}
                  onChange={(e) => handleActivityTitleChange(e.target.value)}
                  placeholder="Title of the activity"
                // size="sm"
                // fontSize="small"
                />
              ) : (
                <ShowHideButton
                  showBox={showBox}
                  setShowBox={setShowBox}
                  showButtonName={`${indexCard + 1}. ${data?.activityTitle ?? 'Activity Title'
                    }`}
                  isUpDown={false}
                  fontWeight="bold"
                  color="primary"
                  border="none"
                  fontSize="x-large"
                />
              )}
              {/* Description */}
            </Flex>
            {isEditLessonPlanClicked || indexCard === editLessonIndex ? (
              <Textarea
                value={data.activityDescription}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Short summary of the activity"
              // fontSize="small"
              />
            ) : (
              <Text
                noOfLines={showBox ? undefined : 1}
                variant="description_card"
              >
                {data.activityDescription || (
                  <LabelEmptyFieldTable
                    label="Short summary of the activity"
                    fontSize="auto"
                  />
                )}
              </Text>
            )}
            {/* Pass/Fail Conditions */}
            <Flex direction="column" gap={0.5} pt={1}>
              {showBox &&
                hydrated &&
                data.passFailConditions?.length > 0 &&
                data.passFailConditions?.map(
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
            {/* Content Tags*/}
            <Flex direction="row" gap={1} pt={1} wrap="wrap">
              {hydrated &&
                data.content?.oers?.map(
                  (content: OerInCollectionProps, index: number) => (
                    // <Text
                    //   key={index}
                    //   whiteSpace="pre-wrap"
                    // >
                    //   {content.title}
                    // </Text>
                    <TagContent
                      key={index}
                      label={content.title}
                      bg={'#FFCC49'}
                    />
                  )
                )}
              {hydrated &&
                data.content?.uploadedFiles?.map(
                  (content: UploadedFilesProps, index: number) => (
                    // <Text
                    //     key={`file-${index}`}
                    //     whiteSpace="pre-wrap"
                    //     // as="link"
                    //     cursor="pointer"
                    //     onClick={(e) => {
                    //         e.preventDefault();
                    //         console.log('NAME', content);
                    //         window?.open(
                    //             content.urlFile,
                    //             '_blank'
                    //         );
                    //     }}
                    // >
                    //     {`${content?.fileName ?? ''};\n`}
                    // </Text>
                    <TagContent
                      key={index}
                      label={content?.fileName ?? ''}
                      bg={'yellow.100'}
                      handleClick={() => {
                        // console.log('NAME', content);
                        window?.open(content.urlFile, '_blank');
                      }}
                    />
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
                  title={data.activityType}
                  //selectedOption={row.activityType}
                  lessonType={data.lessonType}
                  onChange={(selectedTypeIndex) =>
                    handleActivityTypeChange(selectedTypeIndex)
                  }
                  size="md"
                  isDisabled={data.lessonType ? false : true}
                />
              ) : data.activityType ? (
                <Flex align="center" gap={2}>
                  <Text>{data.activityType}</Text>
                  {selectedActivityIcon && <Icon>{selectedActivityIcon}</Icon>}
                </Flex>
              ) : (
                <LabelEmptyFieldTable
                  fontSize="auto"
                  label="Type of Activity"
                />
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
                editIndex={editLessonIndex === indexCard || isEditLessonPlanClicked}
              />
              <AddContentButton
                onClick={handleAddContentClick}
              // nameButton={
              //   data.content.oers.length ||
              //     data.content.uploadedFiles.length > 0 ?
              //     "View Content" :
              //     "Add Content"
              // }
              />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
        activityIndex={indexCard}
      />
    </>
  );
}
