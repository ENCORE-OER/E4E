import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';
import {
  ColorCollectionProps,
  ExerciseInfoModalProps,
} from '../../../types/encoreElements';
import TagsDomain from '../../Tags/TagsDomain';

export default function ExerciseInfoModal({
  isOpen,
  onClose,
  title,
  authors,
  coverage,
  fill_template,
  fill_template_with_gaps,
  options,
  question,
  question_response,
  n_o_w,
  n_o_d,
  n_o_ed,
  n_o_ca,
  source,
  language,
  type_of_exercise,
  type_of_question,
  category,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  isGeneratedByAI,
  collectionsColor,
  assessment_oer_type,
}: ExerciseInfoModalProps) {
  return (
    <Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent overflow="auto">
          <ModalCloseButton />
          <ModalHeader>
            <HStack pb="5" pr="10">
              <TagsDomain
                showTagDigital={showTagDigital}
                showTagEntrepreneurial={showTagEntrepreneurial}
                showTagGreen={showTagGreen}
                showTagGenAI={isGeneratedByAI}
              />
              {collectionsColor?.length &&
                collectionsColor?.map(
                  (
                    collection_color: ColorCollectionProps | undefined,
                    index: number
                  ) => (
                    <Tooltip
                      key={index}
                      aria-label={collection_color?.name}
                      label={collection_color?.name}
                      hasArrow
                      placement="bottom"
                      bg="gray.200"
                      color="primary"
                      fontSize={'md'}
                      p={2}
                    >
                      <span>
                        <IconBookmarkCheck
                          //key={index}
                          colorBookMark={collection_color?.color}
                          size="25px"
                        />
                      </span>
                    </Tooltip>
                  )
                )}
            </HStack>
            <Heading size="lg" pb="5">
              {/* Specify the type of exercise (Fill the Gaps, Open Question, Multiple Choice) */}
              {assessment_oer_type} Exercise
            </Heading>
            <Heading size="md" pb="5">
              {title}
            </Heading>

            <Flex>
              <Box pr={1}>
                <Text variant="label_drawer">by</Text>
              </Box>
              <Box>
                <Text color="grey" fontWeight="semibold" fontSize="sm">
                  {authors.join(', ')} {/* Print the names with the commas*/}
                </Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {/* Fill the Gaps exercise */}
            {fill_template && fill_template_with_gaps && (
              <Flex
                justifyContent={'left'}
                overflowWrap={'normal'}
                direction="column"
              >
                <Text variant="label_drawer">Original text</Text>
                <Text pb="5">{fill_template}</Text>
                <Text variant="label_drawer">Text with gaps</Text>
                <Text pb="5">{fill_template_with_gaps}</Text>
                {options && options.length > 0 && (
                  <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                  >
                    <Text variant="label_drawer">Distractors</Text>
                    <UnorderedList>
                      {options?.map((option: string, index: number) => (
                        <ListItem key={index}>{option}</ListItem>
                      ))}
                    </UnorderedList>
                    {/* Check if "option" is the right field */}
                  </Flex>
                )}
                <Text variant="label_drawer">Number of words</Text>
                <Text pb="5">{n_o_w}</Text>
                <Text variant="label_drawer">Number of Distractors</Text>
                <Text pb="5">{n_o_d}</Text>
              </Flex>
            )}
            {/* Multiple Choice exercise or Open Question exercise */}
            {question && question_response && (
              <Flex
                justifyContent={'left'}
                overflowWrap={'normal'}
                direction="column"
              >
                <Text variant="label_drawer">Question</Text>
                <Text pb="5">{question}</Text>
                <Text variant="label_drawer">Solution</Text>
                <Text pb="5">{question_response}</Text>
                {options && options.length > 0 && (
                  <Flex
                    justifyContent={'left'}
                    overflowWrap={'normal'}
                    direction="column"
                  >
                    <Flex
                      justifyContent={'left'}
                      pb="5"
                      overflowWrap={'normal'}
                      direction="column"
                    >
                      <Text variant="label_drawer">Options</Text>
                      {/* <Text pb="5">{options?.join(', ')}</Text>
                                        {options?.map((option) =>
                                            <Text>{option}</Text>
                                        )} */}
                      <UnorderedList>
                        {options?.map((option: string, index: number) => (
                          <ListItem key={index}>{option}</ListItem>
                        ))}
                      </UnorderedList>
                    </Flex>
                    <Text variant="label_drawer">Number of Distractors</Text>
                    <Text pb="5">{n_o_d}</Text>
                    <Text variant="label_drawer">
                      Number of Easy Distractors
                    </Text>
                    <Text pb="5">{n_o_ed}</Text>
                    <Text variant="label_drawer">
                      Number of Correct Answers
                    </Text>
                    <Text pb="5">{n_o_ca}</Text>
                  </Flex>
                )}
                {type_of_question && (
                  <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                  >
                    <Text variant="label_drawer">Type of Question</Text>
                    <Text>{type_of_question}</Text>
                  </Flex>
                )}
                {type_of_exercise && (
                  <Flex
                    justifyContent={'left'}
                    pb="5"
                    overflowWrap={'normal'}
                    direction="column"
                  >
                    <Text variant="label_drawer">Type of Exercise</Text>
                    <Text>{type_of_exercise}</Text>
                  </Flex>
                )}
                <Text variant="label_drawer">Category</Text>
                <Text pb="5">{category}</Text>
              </Flex>
            )}
            {coverage && coverage.length > 0 && (
              <Flex justifyContent={'left'} pb="5" direction={'column'}>
                <Text variant="label_drawer">Disciplinary field</Text>
                <Text> {coverage.join(', ')}</Text>
              </Flex>
            )}
            {source && (
              <Flex justifyContent={'left'} pb="5" direction={'column'}>
                <Text variant="label_drawer">Source</Text>
                <Text>{source}</Text>
              </Flex>
            )}
            {language && (
              <Flex justifyContent={'left'} pb="5" direction={'column'}>
                <Text variant="label_drawer">Language</Text>
                <Text>{language}</Text>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
