import {
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import { ColorCollectionProps } from '../../../../types/encoreElements';
import SaveResourceButton from '../../../Buttons/ResourceButtons/SaveResourceButton';
import ViewResourceButton from '../../../Buttons/ResourceButtons/ViewResourceButton';
import IconBookmarkCheckCollections from '../../../Icons/IconBookmarkCheck/IconBookmarkCheckCollections';
import IconCopyUrl from '../../../Icons/IconCopy/IconCopyUrl';
import TagsDomain from '../../../Tags/TagsOer/TagsDomain';

export interface HeaderCardInfoModalProps {
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  isGeneratedByAI: boolean;
  collectionsColor: (ColorCollectionProps | undefined)[] | undefined;
  title: string;
  linkOer?: string;
  authors: string;
  handleOpenAddCollectionModal?: () => void;
  handleViewResource?: () => void;
  isAddContentModal: boolean | undefined; // To know if is from "Add content modal"
}

export default function HeaderCardInfoModal({
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  isGeneratedByAI,
  collectionsColor,
  title,
  authors,
  linkOer,
  handleOpenAddCollectionModal,
  handleViewResource,
  isAddContentModal,
}: HeaderCardInfoModalProps) {
  return (
    <ModalHeader>
      <HStack pb="5" pr="10">
        <TagsDomain
          showTagDigital={showTagDigital}
          showTagEntrepreneurial={showTagEntrepreneurial}
          showTagGreen={showTagGreen}
          showTagGenAI={isGeneratedByAI}
        />
        {isAddContentModal && (
          <Checkbox
            colorScheme="yellow"
            onClick={(e) => {
              e.stopPropagation();
            }}
            // isDisabled={true}
          />
        )}
        {(!isAddContentModal || isAddContentModal === undefined) &&
          collectionsColor?.length &&
          collectionsColor?.map(
            (
              collection_color: ColorCollectionProps | undefined,
              index: number
            ) => (
              <IconBookmarkCheckCollections
                key={index}
                collectionColor={collection_color?.color}
                collectionName={collection_color?.name}
              />
            )
          )}
      </HStack>
      <Flex direction="row" gap="2" align="center" pb="5">
        <Heading size="md">{title}</Heading>
        {!isGeneratedByAI && (
          <IconCopyUrl fontSize="30px" url={linkOer ? linkOer : ''} />
        )}
      </Flex>
      <HStack pb="5">
        <SaveResourceButton
          handleOpenAddCollectionModal={handleOpenAddCollectionModal}
        />
        <ViewResourceButton
          handleViewResource={handleViewResource}
          isGeneratedByAI={isGeneratedByAI}
        />
      </HStack>

      <Flex>
        <Box pr={1}>
          <Text variant="label_drawer">by</Text>
        </Box>
        <Box>
          <Text color="grey" fontWeight="semibold" fontSize="sm">
            {authors} {/* Print the names with the commas*/}
          </Text>
        </Box>
      </Flex>
    </ModalHeader>
  );
}
