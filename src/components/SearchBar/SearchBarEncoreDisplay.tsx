import { Flex, SpaceProps, SpacerProps, Tag, TagLabel } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect } from 'react';

type SearchBarEncoreDisplayProps = {
  inputValue: string[];
  setInputValue?: Dispatch<SetStateAction<string[]>>;
  px?: SpaceProps['px'];
  py?: SpaceProps['py'];
  pb?: SpacerProps['pb'];
};

export default function SearchBarEncoreDisplay({
  inputValue,
  // setInputValue,
  px, // padding orizzontale
  py, // padding verticale
  pb, // padding inferiore
}: SearchBarEncoreDisplayProps) {
  useEffect(() => {
    console.log('INPUT VALUE: ' + inputValue);
  }, [inputValue]);

  return (
    <Flex align="center" px={px} py={py} pb={pb} gap="4px" wrap="wrap">
      {inputValue.map((value, index) => (
        <Tag
          size="md"
          key={index}
          borderRadius="full"
          variant="solid"
          colorScheme="teal"
        >
          <TagLabel>{value}</TagLabel>
          {/* <TagCloseButton
                        onClick={() => {
                            setInputValue((prev) => prev.filter((v) => v !== value));
                        }}
                    /> */}
        </Tag>
      ))}
    </Flex>
  );
}
