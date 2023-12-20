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
//import { BsBookmark } from 'react-icons/bs';
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';
import TagsDomain from '../../Tags/TagsDomain';

type OerCardHeaderProps = {
  ptCardHeader?: string;
  showTagDigital: boolean;
  showTagEntrepreneurial: boolean;
  showTagGreen: boolean;
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
              {/*<BsBookmark fill={collection_color} color={collection_color} size={25} />*/}
              <IconBookmarkCheck
                colorBookMark={collection_color}
                size="25px"
                isCheck={checkBookmark}
              />
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
            <Text variant="author_card" noOfLines={1}>{authors.join(', ')}</Text>
          </Box>
        </Flex>
      </Flex>
    </CardHeader>
  );
}
