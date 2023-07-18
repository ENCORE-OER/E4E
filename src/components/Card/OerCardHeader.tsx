import {
  Box,
  Button,
  CardHeader,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
//import { Dispatch, SetStateAction } from 'react';
import { BsBookmark } from 'react-icons/bs';
import TagsDomain from '../Tags/TagsDomain';

type OerCardHeaderProps = {
  ptCardHeader?: string;
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  title: string;
  authors: string[];
  //isSaved?: boolean;
  //setIsSaved?: Dispatch<SetStateAction<boolean>>;
};

export default function OerCardHeader({
  authors,
  ptCardHeader,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  title,
}: OerCardHeaderProps) {
  return (
    <CardHeader pb="0" pt={ptCardHeader || '1.5'}>
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
                e.preventDefault();
                //setIsSaved(!isSaved);
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
  );
}
