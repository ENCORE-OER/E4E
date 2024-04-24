import {
  Box,
  Button,
  CardHeader,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
//import { Dispatch, SetStateAction } from 'react';
//import { BsBookmark } from 'react-icons/bs';
import { FaCopy } from "react-icons/fa6";
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';
import TagsDomain from '../../Tags/TagsDomain';

type OerCardHeaderProps = {
  ptCardHeader?: string;
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
  isGeneratedByAI: boolean;
  title: string;
  authors: (string | null)[];
  collection_color?: string;
  checkBookmark?: boolean;
  //isSaved?: boolean;
  //setIsSaved?: Dispatch<SetStateAction<boolean>>;
};

export default function OerCardHeader({
  authors,
  ptCardHeader,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  isGeneratedByAI,
  title,
  collection_color,
  checkBookmark,
}: OerCardHeaderProps) {
  return (
    <CardHeader pb="0" pt={ptCardHeader || '1.5'}>
      <Flex justify="left" direction="column">
        <HStack w="100%">
          <TagsDomain
            showTagDigital={showTagDigital}
            showTagEntrepreneurial={showTagEntrepreneurial}
            showTagGreen={showTagGreen}
            showTagGenAI={isGeneratedByAI}
          />
          <Spacer />
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
            {/*<BsBookmark fill={collection_color} color={collection_color} size={25} />*/}
            <IconBookmarkCheck
              colorBookMark={collection_color}
              size="25px"
              isCheck={checkBookmark}
            />
          </Button>
        </HStack>
        <Flex direction={'row'} align='center' gap='2'>
          <Text noOfLines={1} variant="title_card">
            {title}
          </Text>
          {!isGeneratedByAI &&
            <Icon
              as={FaCopy}
              style={{
                //background: 'none',
                cursor: 'pointer',
                position: 'sticky',
                fontSize: '25px',
                padding: '2',
              }}
              size='sm'
              _hover={{
                background: 'gray.200',
                borderRadius: '7px'
              }}
            />}
          {/* <Button
            p='0'
            // style={{
            //   border: 'none',
            //   background: 'none',
            //   cursor: 'pointer',
            //   position: 'sticky',
            // }}
            variant="ghost"
            >
            
            <FaCopy size='15px' />
          </Button> */}
        </Flex>
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
            <Text variant="author_card" noOfLines={1}>
              {authors.join(', ')}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
  );
}
