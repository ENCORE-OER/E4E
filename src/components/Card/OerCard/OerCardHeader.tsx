import {
  Box,
  Button,
  CardHeader,
  Checkbox,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
//import { Dispatch, SetStateAction } from 'react';
//import { BsBookmark } from 'react-icons/bs';
import { IconBookmarkCheck } from '../../../public/Icons/svgToIcons/iconBookmarkCheck';
import IconCopyUrl from '../../Icons/IconCopy/IconCopyUrl';
import TagsDomain from '../../Tags/TagsOer/TagsDomain';

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
  linkOer: string[];
  isAddContentModal?: boolean;  // Used for the AddContent Modal to show the resources page
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
  linkOer,
  isAddContentModal
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
            {!isAddContentModal ?
              <IconBookmarkCheck
                colorBookMark={collection_color}
                size="25px"
                isCheck={checkBookmark}
              /> :
              <Checkbox colorScheme='yellow' onClick={(e) => { e.stopPropagation() }} />
            }
          </Button>
        </HStack>
        <Flex direction={'row'} align="center" gap="2">
          <Text noOfLines={1} variant="title_card">
            {title}
          </Text>
          {!isGeneratedByAI && (
            <IconCopyUrl fontSize="25px" url={linkOer ? linkOer[0] : ''} />
          )}
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
