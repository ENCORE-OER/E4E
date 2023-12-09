/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Tag, Text } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import 'reactflow/dist/style.css';
import { DiscoveryContext } from '../../../Contexts/discoveryContext';
import { APIV2 } from '../../../data/api';
import { OerConceptInfo } from '../../../types/encoreElements';
import { useHasHydrated } from '../../../utils/utils';

export type TabMapOfConceptsProps = {};

type Tag = {
  value: string;
  count: number;
};

export const TabMapOfConcepts = ({ }: TabMapOfConceptsProps) => {
  const API = useMemo(() => new APIV2(undefined), []);
  const hydrated = useHasHydrated();
  const [tags, setTags] = useState<Tag[]>([]);
  const { filtered, setFiltered } = useContext(DiscoveryContext);

  const getBackgroundColor = (value: number) => {
    // Define a color mapping based on the size of the tag value
    const colorMap = {
      small: '#e9e6ed',
      medium: '#d3cddb',
      large: '#beb4c9',
    };

    // Determine the size category based on the value length
    let sizeCategory: string;
    if (value < 5) {
      sizeCategory = 'small';
    } else if (value < 10) {
      sizeCategory = 'medium';
    } else {
      sizeCategory = 'large';
    }

    // Get the background color from the color mapping
    return colorMap[sizeCategory as keyof typeof colorMap];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* const options: any = {
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
 */

  const handleContainerClick = (event: any) => {
    if (event.target === event.currentTarget) {
      // Handle click on the white space
      // Reload the current page
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oers_ids: number[] = [];
        filtered?.forEach((oer: { id: number }) => {
          //console.log(oer.id);
          oers_ids.push(oer.id);
        });
        const respAPI = await API.getConceptsWords(oers_ids);

        //console.log(respAPI)

        const resultArray = Object.entries(respAPI).map(([text, value]) => ({
          text,
          value,
        }));

        /*resultArray.map((item: any) => {
          console.log(item.text);
        })*/

        const tagsArray = resultArray
          .map(({ text, value }) => ({
            value: String(text),
            count: Number(value),
          }))
          // Filter out the concepts that appear less than N times
          .filter((tag) => tag.count > 1);  // 6 is the minimum number of times a concept should appear in the OERs to be considered relevant

        tagsArray.map((item: any) => {
          console.log(item.value);
        });

        setTags(tagsArray);
      } catch (err) {
        alert('ERROR EXTRACTING THE CONCEPTS:' + err);
      }
    };

    if (filtered.length > 0) {
      fetchData();
    }
  }, [API, filtered]);

  /*useEffect(() => {
    console.log('tags', tags);
  }, [tags]);*/

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
      {filtered.length > 0 && hydrated && (
        <div>
          <div
            style={{ minHeight: 600, minWidth: 'fill' }}
            onClick={handleContainerClick}
          >
            <TagCloud
              tags={tags}
              minSize={12}
              maxSize={30}
              colorOptions={{ luminosity: 'light' }}
              onClick={(tag: Tag) => {
                // Filter the `filtered` array based on the selected word
                const newFilteredObjects = filtered.filter(
                  (oer: { concepts: OerConceptInfo[] }) => {
                    return oer.concepts.some(
                      (concept) => concept.label === tag.value
                    );
                  }
                );

                // Update the main DiscoveryContext with the new filtered OERs
                setFiltered(newFilteredObjects);
                // Handle tag click event here
              }}
              renderer={(tag: Tag, size: number) => (
                <span
                  style={{
                    fontSize: size,
                    padding: '4px 8px',
                    margin: 4,
                    backgroundColor: getBackgroundColor(tag.count),
                    color: '#51366e',
                    borderRadius: '4px',
                    display: 'inline-block',
                    cursor: 'pointer',
                  }}
                >
                  {tag.value}
                </span>
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};
