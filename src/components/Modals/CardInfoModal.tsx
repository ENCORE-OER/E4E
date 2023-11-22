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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useCollectionsContext } from '../../Contexts/CollectionsContext/CollectionsContext';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconBookmarkCheck } from '../../public/Icons/svgToIcons/iconBookmarkCheck';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconLunchLinkOpen } from '../../public/Icons/svgToIcons/iconLunchLinkOpen';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import {
  CollectionProps,
  OerAudienceInfo,
  OerAuthorsInfo,
  OerConceptInfo,
  OerInCollectionProps,
  OerMediaTypeInfo,
  OerProps,
  OerSubjectInfo,
  OerUrlInfo
} from '../../types/encoreElements';
import TagConcept from '../Tags/TagConcept';
import TagResourceType from '../Tags/TagReourceType';
import TagsDomain from '../Tags/TagsDomain';
import CollectionModal from './CollectionModals';

type CardInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oer: OerProps | null;
};

export default function CardInfoModal({
  oer,
  isOpen,
  onClose,
}: CardInfoModalProps) {
  const [showTagDigital, setShowTagDigital] = useState<boolean>(false);
  const [showTagEntrepreneurial, setShowTagEntrepreneurial] =
    useState<boolean>(false);
  const [showTagGreen, setShowTagGreen] = useState<boolean>(false);
  const [authors, setAuthors] = useState<string[]>([]);
  const [linkOer, setLinkOer] = useState<string[]>();
  const [resourceType, setResourceType] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [publishers, setPublishers] = useState<string[]>([]);
  const [contributors, setContributors] = useState<string[]>([]);
  const [concepts, setConcepts] = useState<string[]>([]);
  const [isAddCollectionModalOpen, setAddCollectionModalOpen] =
    useState<boolean>(false);
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [coverage, setCoverage] = useState<string[]>([]);
  const [collectionsColor, setCollectionsColor] = useState<string[]>([]); // array of colors of the collections that has the oer selected
  const { collections } = useCollectionsContext();

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

        setSubjects(oer.subject?.map((sub: OerSubjectInfo) => sub.name) || []);

        setPublishers(oer.publisher?.map((pub: any) => pub.name) || []);
        setContributors(oer.contributor?.map((contr: any) => contr.name) || []);
        setConcepts(
          oer.concepts?.map((concept: OerConceptInfo) => concept.label) || []
        );
        setQualityScore(oer?.overall_score || 0);
        setLastUpdate(oer?.retrieval_date || '');
        setCoverage(
          oer.coverage?.map((audience: OerAudienceInfo) => audience.name) || []
        );
        const colors: string[] = [];
        collections?.map(async (collection: CollectionProps) => {
          collection.oers?.map((oer_item: OerInCollectionProps) => {
            if (oer_item.id === oer.id && collection.color) {
              colors.push(collection.color);
            }
          })
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

        console.log(JSON.stringify(oer));
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

            <TagsDomain
              showTagDigital={showTagDigital}
              showTagEntrepreneurial={showTagEntrepreneurial}
              showTagGreen={showTagGreen}
              mb="5"
            />
            {collectionsColor?.length &&
              collectionsColor?.map((collection_color: string, index: number) => {
                <IconBookmarkCheck
                  key={index}
                  colorBookMark={collection_color}
                  size="25px"
                />
              })
            }

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
                  {`${authors}`}
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
            <Flex w="100%" mb="5">
              <Box flex="1" display="flex">
                <Box>
                  <Text variant="label_drawer">Last Update</Text>
                  <HStack>
                    <IconCalendarCheck />
                    <Text>{lastUpdate}</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex" flex="1">
                <Box>
                  <Text variant="label_drawer">Used</Text>
                  <HStack>
                    <IconBezierCurve />
                    <Text>2</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex" flex="1">
                <Box>
                  <Text variant="label_drawer">Liked</Text>
                  <HStack>
                    <IconThumbsUp />
                    <Text>54</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex" flex="1">
                <Box>
                  <Text variant="label_drawer">Quality Score</Text>
                  <HStack>
                    <IconMedal />
                    <Text>{qualityScore}</Text>
                  </HStack>
                </Box>
              </Box>
            </Flex>
            <Flex justifyContent={'left'} mb="5" overflowWrap={'normal'}>
              <Box>
                <Text variant="label_drawer">Concepts covered</Text>
                <Flex gap={1} w="100%" flexWrap={'wrap'}>
                  <TagConcept concepts={concepts} />
                </Flex>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Disciplinary field</Text>
                <Text> {`${coverage}`}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'flex-start'} mb="5">
              <Box>
                <Text variant="label_drawer">Context</Text>
                <Text>{`${subjects}`}</Text>
              </Box>
            </Flex>
            <Flex justifyContent={'left'} mb="5">
              <Box flex="1">
                <Text variant="label_drawer">Publisher</Text>
                <Text>{publishers}</Text>
              </Box>
              <Box flex="1">
                <Text variant="label_drawer">Contributor</Text>
                <Text>{contributors}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Retrieved from</Text>
                <Text>{oer?.source}</Text>
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
        />
      )}
    </Flex>
  );
}
