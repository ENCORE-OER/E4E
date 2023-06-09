import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { RefObject, useEffect, useRef, useState } from 'react';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconBookmarkCheck } from '../../public/Icons/svgToIcons/iconBookmarkCheck';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconLunchLinkOpen } from '../../public/Icons/svgToIcons/iconLunchLinkOpen';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import AddCollectionModal from '../Modals/AddCollectionModal';
import TagConcept from '../Tags/TagConcept';
import TagResourceType from '../Tags/TagReourceType';
import TagsDomain from '../Tags/TagsDomain';

type DrawerCardProps = {
  isOpen: boolean;
  onClose: () => void;
  oer: any;
  drawerRef?: RefObject<HTMLDivElement>;
};

export default function DrawerCard({ isOpen, onClose, oer }: DrawerCardProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  //const [domainOer, setDomainOer] = useState<any[]>([]);
  const [showTagDigital, setShowTagDigital] = useState(false);
  const [showTagEntrepreneurial, setShowTagEntrepreneurial] = useState(false);
  const [showTagGreen, setShowTagGreen] = useState(false);
  const [authors, setAuthors] = useState<any[]>([]);
  const [linkOer, setLinkOer] = useState<any>();
  const [resourceType, setResourceType] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [contributors, setContributors] = useState<any[]>([]);

  //const { collections, addCollection } = useCollectionsContext();
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const digital = 'Digital';
  const entr = 'Entrepreneurship';
  const green = 'Green';

  const handleViewResource = () => {
    if (linkOer) {
      window?.open(linkOer, '_blank');
    }
  };

  const [isAddCollectionModalOpen, setAddCollectionModalOpen] =
    useState<boolean>(false);

  const handleOpenAddCollectionModal = () => {
    setAddCollectionModalOpen(true);
    console.log(isAddCollectionModalOpen);
  };

  const handleCloseCollectionModal = () => {
    setAddCollectionModalOpen(false);
  };


  useEffect(() => {
    try {
      const domain = oer?.skills?.flatMap((skill: any) =>
        skill?.domain?.map((item: any) => item.name)
      );
      setShowTagDigital(false);
      setShowTagEntrepreneurial(false);
      setShowTagGreen(false);
      if (domain?.includes(digital)) {
        setShowTagDigital(true);
      }
      if (domain?.includes(entr)) {
        setShowTagEntrepreneurial(true);
      }
      if (domain?.includes(green)) {
        setShowTagGreen(true);
      }


      const temp_auth = oer.creator?.map(
        (creator_name: any) => creator_name.full_name
      );

      setAuthors(temp_auth?.length !== 0 ? temp_auth : ['Unknown']);

      setLinkOer(oer.oer_url?.map((url: any) => url.url) || []);

      setResourceType(
        oer.media_type?.flatMap((resType: any) => resType.name) || []
      );

      setSubjects(oer.subject?.map((item: any) => item.name) || []);

      setPublishers(oer.publisher?.map((item: any) => item.name) || []);
      setContributors(oer.contributor?.map((item: any) => item.name) || []);

      console.log(JSON.stringify(oer));



      console.log(authors);
      console.log(linkOer);
      console.log(resourceType);
      console.log(subjects);
      console.log(publishers);
      console.log(contributors);
    } catch (error) {
      console.error(error);
    }
  }, [oer]);

  /*useEffect(() => {
    setShowTagDigital(false);
    setShowTagEntrepreneurial(false);
    setShowTagGreen(false);
    if (domainOer?.includes(digital)) {
      setShowTagDigital(true);
    }
    if (domainOer?.includes(entr)) {
      setShowTagEntrepreneurial(true);
    }
    if (domainOer?.includes(green)) {
      setShowTagGreen(true);
    }
  }, [domainOer]);*/

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
        key={oer.id}
      //container={drawerRef.current}
      //getContainer={drawerRef.current}
      >
        <DrawerContent mx="auto">
          <DrawerCloseButton />
          <DrawerHeader>
            <TagsDomain
              showTagDigital={showTagDigital}
              showTagEntrepreneurial={showTagEntrepreneurial}
              showTagGreen={showTagGreen}
              mb="5"
            />
            <Heading size="md" mb="5">
              {oer.title}
            </Heading>
            <HStack mb="5">
              <Button
                leftIcon={<IconBookmarkCheck />}
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenAddCollectionModal();
                }}
              /*onClick={(e) => {
                e.preventDefault();
                const id = Math.random();
                addCollection(id, 'Drink');
                console.log('id collection: ' + id);
                //onOpen();
              }}*/
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
          </DrawerHeader>
          <DrawerBody>
            <Text mb="5">{oer.description}</Text>
            <HStack gap={0.5} mb="5">
              <TagResourceType resourceType={resourceType} />
            </HStack>
            <Flex w="100%" gap="100px" mb="5">
              <Box display="flex">
                <Box>
                  <Text variant="label_drawer">Last Update</Text>
                  <HStack>
                    <IconCalendarCheck />
                    <Text>{oer.retrieval_date}</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex">
                <Box>
                  <Text variant="label_drawer">Used</Text>
                  <HStack>
                    <IconBezierCurve />
                    <Text>2</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex">
                <Box>
                  <Text variant="label_drawer">Liked</Text>
                  <HStack>
                    <IconThumbsUp />
                    <Text>54</Text>
                  </HStack>
                </Box>
              </Box>
              <Box display="flex">
                <Box>
                  <Text variant="label_drawer">Liked</Text>
                  <HStack>
                    <IconMedal />
                    <Text>9</Text>
                  </HStack>
                </Box>
              </Box>
            </Flex>
            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Concepts covered</Text>
                <HStack>
                  <TagConcept concepts={['Food']} />
                </HStack>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Disciplinary field</Text>
                <Text> Sciences</Text>
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
                <Text>{`${publishers}`}</Text>
              </Box>
              <Box flex="1">
                <Text variant="label_drawer">Contributor</Text>
                <Text>{`${contributors}`}</Text>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">Retrieved from</Text>
                <Text></Text>
              </Box>
            </Flex>

            <Flex justifyContent={'left'} mb="5">
              <Box>
                <Text variant="label_drawer">License</Text>
                <Text>{oer.rights}</Text>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {isAddCollectionModalOpen && (
        <AddCollectionModal
          isOpen={isOpen}
          onClose={handleCloseCollectionModal}
          oerToSave={oer}
        />
      )}
    </>
  );
}
