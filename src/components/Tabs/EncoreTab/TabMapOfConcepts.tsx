import { Stack, Text } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import 'reactflow/dist/style.css';
import { APIV2 } from '../../../data/api';



import { select } from 'd3';
import ReactWordcloud, { Callbacks, Word } from 'react-wordcloud';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { OerConceptInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';



export type TabMapOfConceptsProps = {};

export const TabMapOfConcepts = ({ }: TabMapOfConceptsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const hydrated = useHasHydrated();
  const [words, setWords] = useState<Word[]>([]);
  const { filtered, setFiltered } = useContext(DiscoveryContext);

  const [selectedWord, setSelectedWord] = useState<string | null>();




  useEffect(() => {

    const fetchData = async () => {
      try {
        const oers_ids: number[] = [];
        filtered.forEach((oer: { id: number }) => oers_ids.push(oer.id));
        const respAPI = await API.getConceptsWords(oers_ids);

        const resultArray = Object.entries(respAPI).map(([text, value]) => ({ text, value }));

        const wordArray = resultArray.map(({ text, value }) => ({
          text: String(text),
          value: Number(value),
        }));

        setWords(wordArray);
      } catch (err) {
        alert('ERROR EXTRACTING THE CONCEPTS:' + err);
      }
    };

    if (filtered.length > 0) {
      fetchData();
    }
  }, [API, filtered]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    colors: ["#25044a", "#2a0554", "#491f78", "#5d3887"],
    enableTooltip: true,
    deterministic: true,
    fontFamily: "nunito",
    fontSizes: [15, 70],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };



  const callbacks: Callbacks = {
    onWordClick: (word: Word, event: any) => {
      const element = event.target;
      const text = select(element).text();

      setSelectedWord(text);
      console.log("selected word: " + selectedWord);

      // Filter the `filtered` array based on the selected word
      const newFilteredObjects = filtered.filter((oer: { concepts: OerConceptInfo[] }) => {
        return oer.concepts.some((concept) => concept.label === text);
      });

      // Update the main DiscoveryContext with the new filtered OERs
      setFiltered(newFilteredObjects);

    },
    getWordTooltip: function (word: Word): void {
      console.log("word selected " + word);
    },
  };


  return (

    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Map of concepts shows which concepts are related to the keywords
          searched. Click on a concept word to visualize resources addressing
          the concept.
        </Text>
      </Stack>
      <br />
      <br />
      {
        filtered.length > 0 && hydrated && (
          <div>
            <div style={{ height: 600, width: 800 }}>
              <ReactWordcloud options={options} words={words} callbacks={callbacks} />
            </div>
          </div>

        )
      }
    </>

  );
};



