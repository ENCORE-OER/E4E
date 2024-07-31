import {
  Box,
  Flex,
  Heading,
  HStack,
  ModalHeader,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { IconBookmarkCheck } from '../../../../public/Icons/svgToIcons/iconBookmarkCheck';
import {
  ColorCollectionProps,
  ExerciseInfoModalProps,
} from '../../../../types/encoreElements';
import TagGenAI from '../../../Tags/TagsOer/TagGenAI';
import TagsDomain from '../../../Tags/TagsOer/TagsDomain';
// import { HeaderCardInfoModalProps } from '../CardInfoModal/HeaderCardInfoModal';

// interface HeaderExerciseInfoModalProps extends ExerciseInfoModalProps {}

export default function HeaderExerciseInfoModal({
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  isGeneratedByAI,
  collectionsColor,
  title,
  authors,
  assessment_oer_type,
}: ExerciseInfoModalProps) {
  return (
    <ModalHeader>
      <HStack pb="5" pr="10">
        <TagsDomain
          showTagDigital={showTagDigital ? showTagDigital : false}
          showTagEntrepreneurial={
            showTagEntrepreneurial ? showTagEntrepreneurial : false
          }
          showTagGreen={showTagGreen ? showTagGreen : false}
          // showTagGenAI={isGeneratedByAI ? isGeneratedByAI : false}
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

      <Flex direction="row" align="center">
        <Box pr={1}>
          <Text variant="label_drawer">by</Text>
        </Box>
        <Flex>
          {!isGeneratedByAI ? (
            <Text variant="author_card" noOfLines={1}>
              {authors?.join(', ')}
            </Text>
          ) : (
            <TagGenAI />
          )}
        </Flex>
      </Flex>
    </ModalHeader>
  );
}
