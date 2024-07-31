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
import TagGenAI from '../../Tags/TagsOer/TagGenAI';
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
  isAddContentModal?: boolean; // Used for the AddContent Modal to show the resources page
  handleCheckboxClick?: () => void;
  isChecked?: boolean;
  isDisabled?: boolean;
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
  isAddContentModal,
  handleCheckboxClick,
  isChecked,
  isDisabled,
}: OerCardHeaderProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (handleCheckboxClick) {
      handleCheckboxClick();
    }
  };

  return (
    <CardHeader pb="0" pt={ptCardHeader || '1.5'}>
      <Flex justify="left" direction="column">
        <HStack w="100%">
          <TagsDomain
            showTagDigital={showTagDigital}
            showTagEntrepreneurial={showTagEntrepreneurial}
            showTagGreen={showTagGreen}
          // showTagGenAI={isGeneratedByAI}
          />
          <Spacer />
          {!isAddContentModal ? (
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
                e.stopPropagation();
                //setIsSaved(!isSaved);
                // addCollection(idCollection, nameCollection);
                // addResource(idCollection, idOer);
              }}
            >
              {/*<BsBookmark fill={collection_color} color={collection_color} size={25} />*/}
              <IconBookmarkCheck
                colorBookMark={collection_color}
                size="25px"
                isCheck={checkBookmark}
              />
            </Button>
          ) : (
            <Button
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                position: 'sticky',
              }}
              w="fit-content"
              p={0}
              variant="ghost"
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                // handleCheckboxChange(e);
                console.log('Button 1');
              }}
            >
              <Checkbox
                as="button"
                colorScheme="yellow"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCheckboxChange(e);
                }}
                isChecked={isChecked}
                isDisabled={isDisabled}
              />
            </Button>
          )}
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
        <Flex direction="row" align="center">
          <Box pr={1}>
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
          <Flex>
            {!isGeneratedByAI ?
              <Text variant="author_card" noOfLines={1}>
                {authors.join(', ')}
              </Text> :
              <TagGenAI />}
          </Flex>
        </Flex>
      </Flex>
    </CardHeader>
  );
}
