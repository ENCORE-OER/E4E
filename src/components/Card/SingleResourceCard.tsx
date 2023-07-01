import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import { IconBezierCurve } from '../../public/Icons/svgToIcons/iconBezierCurve';
import { IconCalendarCheck } from '../../public/Icons/svgToIcons/iconCalendarCheck';
import { IconMedal } from '../../public/Icons/svgToIcons/iconMedal';
import { IconThumbsUp } from '../../public/Icons/svgToIcons/iconThumbsUp';
import TagResourceType from '../Tags/TagReourceType';
import TagsDomain from '../Tags/TagsDomain';

type ReourceCardProps = {
  idOer: any;
  description: string;
  authors: string[];
  title: string;
  resourceType: any[];
  lastUpdate: any;
  domain: any[];
  //dataOer: any
};

export default function SingleResourceCard({
  idOer,
  description,
  authors,
  lastUpdate,
  resourceType,
  title,
  domain,
}: //dataOer
  ReourceCardProps) {
  const [showTagDigital, setShowTagDigital] = useState(false);
  const [showTagEntrepreneurial, setShowTagEntrepreneurial] = useState(false);
  const [showTagGreen, setShowTagGreen] = useState(false);
  //const { addResource, addCollection } = useCollectionsContext();
  const [isSaved, setIsSaved] = useState(false);

  // TRY CollectionsContext
  /*const idCollection = 1;
  const nameCollection = 'Food';
  const skills = ['ciao'];
  const concepts = ['prova'];
  const oer = { idOer, title, description, skills, concepts };*/
  //

  const digital = 'Digital';
  const entr = 'Entrepreneurship';
  const green = 'Green';

  useEffect(() => {
    try {
      for (let i = 0; i < domain?.length; i++) {
        if (domain[i] === digital) {
          setShowTagDigital(true);
        } else if (domain[i] === entr) {
          setShowTagEntrepreneurial(true);
        } else if (domain[i] === green) {
          setShowTagGreen(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [domain]); // Empty dependency array ensures the effect runs only once after initial render

  /*useEffect(() => {

    if (dataOerString) {
      try {
        const oer_json = JSON.parse(dataOerString);
        setDescription(oer_json.description);
        console.log(description);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [dataOerString]); */

  return (
    <>
      {/* Add key={oer.id} to Card element */}
      <Card
        h="190px"
        w="550px"
        px="20px"
        border="1px"
        key={idOer}
        borderColor="secondary"
        bg="white"
        mb="5"
      >
        <CardHeader pb="0" pt="1.5">
          <Flex justify="left" direction="column">
            <HStack w="100%">
              <TagsDomain
                showTagDigital={showTagDigital}
                showTagEntrepreneurial={showTagEntrepreneurial}
                showTagGreen={showTagGreen}
              />
              <Spacer />
              {
                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    position: 'sticky',
                  }}
                  variant="ghost"
                  onClick={(e) => {
                    console.log("pippo");
                    e.preventDefault();
                    setIsSaved(!isSaved);
                    /*addCollection(idCollection, nameCollection);
                    addResource(idCollection, idOer);*/
                  }}
                >
                  <BsBookmark size={25} />
                </Button>
              }
            </HStack>
            <Text noOfLines={1} variant="title_card">
              {title}
            </Text>
            <Flex>
              <Box mr={1}>
                <Text
                  fontSize="14px"
                  fontWeight="300"
                  letterSpacing="0em"
                  lineHeight="19px"
                  textAlign="left"
                  textColor="grey"
                >
                  by
                </Text>
              </Box>
              <Box>
                <Text variant="author_card">{`${authors}`}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody py="1.5">
          <Flex justifyContent="flex-start">
            <Text noOfLines={2} variant="description_card">
              {description}
            </Text>
          </Flex>
        </CardBody>
        <CardFooter pt="0">
          <Flex position="sticky">
            <TagResourceType resourceType={resourceType} />
          </Flex>
          <Flex w="100%" justifyContent="right" gap={3}>
            <Box display="flex" gap={1}>
              <IconCalendarCheck />
              <Text variant="label_dinamic_data_card">{lastUpdate}</Text>
            </Box>
            <Box display="flex" gap={1}>
              <IconBezierCurve />
              <Text variant="label_dinamic_data_card">2</Text>
            </Box>
            <Box display="flex" gap={1}>
              <IconThumbsUp />
              <Text variant="label_dinamic_data_card">54</Text>
            </Box>
            <Box display="flex" gap={1}>
              <IconMedal />
              <Text variant="label_dinamic_data_card">9</Text>
            </Box>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
