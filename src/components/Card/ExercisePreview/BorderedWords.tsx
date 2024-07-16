import React from 'react';
import { Box, Wrap, WrapItem } from '@chakra-ui/react';

type BorderedWordsProps = {
    words: string[];
    color?: string;
    };

const BorderedWords = ({ words, color }: BorderedWordsProps) => {
  return (
    <Wrap spacing="10px">
        {words.map((word, index) => (
        <WrapItem key={index}>
            <Box 
            border={`1px solid ${color}`} 
            borderRadius="xl" 
            padding="5px 10px"
            >
            {word}
            </Box>
        </WrapItem>
        ))}
    </Wrap>
  );
};

export default BorderedWords;