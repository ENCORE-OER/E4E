import React from 'react';
import { Box } from '@chakra-ui/react';

type HighlightWordsProps = {
  text: string;
  words: string[];
  color?: string;
};

// Componente per evidenziare parole
const HighlightWords = ({ text = '', words, color }: HighlightWordsProps) => {
  // Funzione per "escapare" i caratteri speciali
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  // Ordina le parole/frasi per lunghezza decrescente per gestire correttamente le frasi prima delle parole singole
  const sortedWords = words
    .map(escapeRegExp)
    .sort((a, b) => b.length - a.length);
  // Crea una espressione regolare che cattura tutte le parole/frasi da evidenziare
  const regex = new RegExp(`(${sortedWords.join('|')})`, 'gi');

  // Suddivide il testo utilizzando l'espressione regolare e mappa le parti per evidenziarle
  const getHighlightedText = () => {
    const parts = text.split(regex).filter((part) => part !== undefined);
    return parts.map((part, index) =>
      sortedWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
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

  return <Box lineHeight="1.6">{getHighlightedText()}</Box>;
};

export default HighlightWords;
