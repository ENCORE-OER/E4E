import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Icon,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';
import AddContentButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/AddContentButton';
import EditButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/EditButtonLessonCard';
import RegenerateButtonLessonCard from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/RegenerateButtonLessonCard';
import UnderlinedButton from '../../Buttons/ButtonsDesignPage/UnderlinedButton';
import ShowHideButton from '../../Buttons/ShowHideButton';
import IconBookOpen from '../../Icons/IconBookOpen/IconBookOpen';
import IconPlus from '../../Icons/IconPlus/IconPlus';
import TagLessonCompulsory from '../../Tags/TagsLesson/TagLessonCompulsory';
import TagLessonDuration from '../../Tags/TagsLesson/TagLessonDuration';
import TagLessonType from '../../Tags/TagsLesson/TagLessonType';

type LessonCardProps = {
    lessonTitle: string;
    lessonType: string; // Specifies if learning, assessment or other
    activityType: string; // Specifies if Frontal Lecture, Group Discussion, Single-choice quix, etc...
    indexCard: number; // Specifies the order of the lessons
    activityDescription: string;
};

export default function LessonCard({
    lessonTitle,
    activityType,
    lessonType,
    indexCard,
    activityDescription,
}: LessonCardProps) {
    // Show Generate Learning Objectives area
    const [showBox, setShowBox] = useState(false); // used to show the Activity

    return (
        <Card display="flex" borderRadius={'10px'} border={'1px'}>
            <CardHeader pb={0}>
                <Flex w="100%" direction="row">
                    <Flex flex="1" justify="flex-start" direction="row" align="center">
                        <TagLessonType labelTag={lessonType} />
                        <TagLessonDuration time={30} />
                        <TagLessonCompulsory isChecked={true} />
                    </Flex>

                    <Flex
                        flex="1"
                        justify="flex-end"
                        direction="row"
                        align="center"
                        gap={5}
                    >
                        <EditButtonLessonCard
                            handleEditClick={() => console.log('edit')}
                            isEditClicked={false}
                        />
                        <RegenerateButtonLessonCard
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
                            showButtonName={`${indexCard}. ${lessonTitle}`}
                            isUpDown={false}
                            fontWeight="bold"
                            color="primary"
                            border="none"
                            fontSize="x-large"
                        />
                    </Flex>
                    <Text noOfLines={showBox ? undefined : 1} variant="description_card">
                        {activityDescription}
                    </Text>
                </Flex>
            </CardBody>

            <CardFooter>
                <Flex direction={'row'} w='100%' align='center'>
                    <Flex direction="row" gap={1} flex='1' justify='flex-start'>
                        <Text fontWeight="bold">Activity type: </Text>
                        <Text>{activityType}</Text>
                        <Icon as={IconBookOpen} />
                    </Flex>

                    <Flex direction="row" gap={3} flex='1' justify='flex-end'>
                        <UnderlinedButton
                            handleClick={() => console.log('Add condition')}
                            nameButton='Add pass and fail conditions'
                            rightIcon={<IconPlus />}
                            color="grey"
                            fontWeight="normal"
                        />
                        <AddContentButton />
                    </Flex>
                </Flex>
            </CardFooter>
        </Card>
    );
}
