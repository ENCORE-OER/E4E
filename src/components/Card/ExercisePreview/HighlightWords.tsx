import React from 'react';
import { Box } from '@chakra-ui/react';

type HighlightWordsProps = {
    text: string;
    words: string[];
    color?: string;
};


// Componente per evidenziare parole
const HighlightWords = ({ text, words, color }:HighlightWordsProps) => {
  // Funzione per suddividere il testo in parole e contornare le parole da evidenziare
  const getHighlightedText = () => {
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => 
      words.includes(part.toLowerCase()) ? (
        <Box 
          key={index} 
          as="span" 
          border={`1px solid ${color}`} 
          borderRadius="xl" 
          padding="2px 5px" 
          mx="1"
          display="inline-block"
        >
          {part}
        </Box>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <Box lineHeight="1.6">
      {getHighlightedText()}
    </Box>
  );
};

export default HighlightWords;