import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { IconBookmarkCheck } from '../../public/Icons/svgToIcons/iconBookmarkCheck';
import { IconLunchLinkOpen } from '../../public/Icons/svgToIcons/iconLunchLinkOpen';
import {
  CollectionProps,
  OerAudienceInfo,
  OerAuthorsInfo,
  OerConceptInfo,
  OerInCollectionProps,
  OerMediaTypeInfo,
  OerProps,
  OerSourceRoerInfo,
  OerSubjectInfo,
  OerUrlInfo,
} from '../../types/encoreElements';
import { OerFreeSearchProps } from '../../types/encoreElements/oer/OerFreeSearch';
import GridMetadataOer from '../Grids/GridMetadataOer';
import TagConcept from '../Tags/TagConcept';
import TagResourceType from '../Tags/TagReourceType';
import TagsDomain from '../Tags/TagsDomain';
import CollectionModal from './CollectionModals';

type CardInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oer: OerProps | OerFreeSearchProps | null | undefined;
};

type ColorCollectionProps = {
  name: string;
  color: string | undefined;
};

export default function CardInfoModal({
  oer,
  isOpen,
  onClose,
}: CardInfoModalProps) {
  const { addCollection, addResource, collections } = useCollectionsContext();

  const [showTagDigital, setShowTagDigital] = useState<boolean>(false);
  const [showTagEntrepreneurial, setShowTagEntrepreneurial] =
    useState<boolean>(false);
  const [showTagGreen, setShowTagGreen] = useState<boolean>(false);
  const [authors, setAuthors] = useState<(string | null)[]>([]);
  const [linkOer, setLinkOer] = useState<string[]>();
  const [resourceType, setResourceType] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<(string | null)[]>([]);
  const [contributors, setContributors] = useState<(string | null)[]>([]);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [isAddCollectionModalOpen, setAddCollectionModalOpen] =
    useState<boolean>(false);
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [times_used, setTimes_used] = useState<number>(0);
  const [total_likes, setTotal_likes] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [coverage, setCoverage] = useState<string[]>([]);
  const [source_roer, setSource_roer] = useState<string[]>([]);
  const [collectionsColor, setCollectionsColor] = useState<
    (ColorCollectionProps | undefined)[]
  >([]); // array of colors of the collections that has the oer selected

  //const { isOpen, onOpen, onClose } = useDisclosure();

  //const digital = 'Digital';
  //const entr = 'Entrepreneurship';
  //const green = 'Green';

  const handleViewResource = () => {
    if (linkOer) {
      window?.open(linkOer[0], '_blank');
    }
  };

  const handleOpenAddCollectionModal = () => {
    setAddCollectionModalOpen(true);
    console.log(isAddCollectionModalOpen);
  };

  const handleCloseCollectionModal = () => {
    setAddCollectionModalOpen(false);
  };

  useEffect(() => {
    try {
      /*setShowTagDigital(false);
            setShowTagEntrepreneurial(false);
            setShowTagGreen(false);
            const domain = oer?.skills?.flatMap((skill: any) =>
                skill?.domain?.map((item: any) => item.name)
            );
            
            if (domain?.includes(digital)) {
                setShowTagDigital(true);
            }
            if (domain?.includes(entr)) {
                setShowTagEntrepreneurial(true);
            }
            if (domain?.includes(green)) {
                setShowTagGreen(true);
            }*/
      if (oer) {
        setShowTagDigital(oer?.digital_domain || false);
        setShowTagEntrepreneurial(oer?.entrepreneurship_domain || false);
        setShowTagGreen(oer?.green_domain || false);

        setTitle(oer?.title || '');

        const temp_auth = oer.creator?.map(
          (creator_name: OerAuthorsInfo) => creator_name.full_name
        );

        setAuthors(temp_auth?.length !== 0 ? temp_auth : ['Unknown']);

        setLinkOer(oer.oer_url.map((item: OerUrlInfo) => item.url) || []);

        setDescription(oer?.description || '');

        setResourceType(
          oer.media_type?.flatMap(
            (resType: OerMediaTypeInfo) => resType.name
          ) || []
        );

        setSubjects(
          oer.subject?.map((sub: OerSubjectInfo) => sub.name) || ['Unknown']
        );

        setPublishers(
          oer.publisher?.map((pub: OerAuthorsInfo) => pub.full_name) || [
            'Unknown',
          ]
        );
        setContributors(
          oer.contributor?.map((contr: OerAuthorsInfo) => contr.full_name) || [
            'Unknown',
          ]
        );
        setConcepts(
          oer.concepts?.map((concept: OerConceptInfo) => concept.label) || []
        );
        setQualityScore(oer?.overall_score || 0);
        setTimes_used(oer?.times_used || 0);
        setTotal_likes(oer?.total_likes || 0);
        setLastUpdate(oer?.retrieval_date || 'Unknown');
        setCoverage(
          oer.coverage?.map((audience: OerAudienceInfo) => audience.name) || [
            'Unknown',
          ]
        );
        setSource_roer(
          oer?.source_roer?.map((item: OerSourceRoerInfo) => item.name) || []
        );

        // set the color of the collections that has the oer selected
        const colors: ColorCollectionProps[] = [];
        collections?.map((collection: CollectionProps) => {
          collection.oers?.map((oer_item: OerInCollectionProps) => {
            if (oer_item.id === oer.id && collection.color !== undefined) {
              //setCollectionsColor((prev: (string | undefined)[]) => [...prev, collection.color]);
              colors.push({ name: collection.name, color: collection.color });
            }
          });
        });

        setCollectionsColor(colors);

        /*Promise.all(
          collections?.map(async (collection: CollectionProps) => {
            if (collection.oers?.includes(oer)) {
              return collection.color;
            }
          }) || []
        ).then((colors) => {
          if (!colors.includes(undefined))
            setCollectionsColor(colors);
        });*/
      }
    } catch (error) {
      console.error(error);
    }
  }, [oer, collections]);

  /* useEffect(() => {
     console.log('authors: ' + authors);
     console.log('linkOer: ' + linkOer);
     console.log('resourceType: ' + resourceType);
     console.log('subjects: ' + subjects);
     console.log('publishers: ' + publishers);
     console.log('contributors: ' + contributors);
     console.log('concepts: ' + concepts);
   }, [concepts]);*/

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
            <Heading size="md" mb="5">
              {title}
            </Heading>
            <HStack mb="5">
              <Button
                leftIcon={<IconBookmarkCheck />}
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenAddCollectionModal();
                }}
              >
                Save Resource
              </Button>
              <Button
                leftIcon={<IconLunchLinkOpen />}
                variant="primary"
                onClick={handleViewResource}
              >
                View Resource
              </Button>
            </HStack>

            <Flex>
              <Box mr={1}>
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
            <Text mb="5">{description}</Text>
            <Flex
              gap={1}
              w="100%"
              mb="5"
              justifyContent={'flex-start'}
              flexWrap={'wrap'}
              flex="1"
            >
              <TagResourceType resourceType={resourceType} />
            </Flex>

            <Flex justifyContent={'left'} mb="5" overflowWrap={'normal'}>
              <Box>
                <Text variant="label_drawer">Concepts covered</Text>
                <Flex gap={1} w="100%" flexWrap={'wrap'}>
                  <TagConcept concepts={concepts} />
                </Flex>
              </Box>
            </Flex>
            <GridMetadataOer
              gap={3}
              lastUpdate={lastUpdate}
              used={times_used}
              likes={total_likes}
              qualityScore={qualityScore}
              isCardInfoModal={true}
            />
            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Disciplinary field</Text>
                <Text> {coverage.join(', ')}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'flex-start'} mb="5">
              <Box>
                <Text variant="label_drawer">Context</Text>
                <Text>{subjects.join(', ')}</Text>
              </Box>
            </Flex>
            <Flex justifyContent={'left'} mb="5">
              <Box flex="1">
                <Text variant="label_drawer">Publisher</Text>
                <Text>{publishers}</Text>
              </Box>
              <Box flex="1">
                <Text variant="label_drawer">Contributor</Text>
                <Text>{contributors.join(', ')}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Retrieved from</Text>
                <Text>{source_roer.join(', ')}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">License</Text>
                <Text>{oer?.rights}</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isAddCollectionModalOpen && (
        <CollectionModal
          isOpen={isOpen}
          onClose={handleCloseCollectionModal}
          oerToSave={oer}
          isNewCollection={false}
          isFromFolderButton={false}
          maxLength={30}
          collections={collections}
          addResource={addResource}
          addCollection={addCollection}
        />
      )}
    </Flex>
  );
}
