import { Stack, Text } from '@chakra-ui/react';

import { useContext, useState } from 'react';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

import { Doughnut } from 'react-chartjs-2';

import { DiscoveryContext } from '../../../Contexts/discoveryContext';

import { OerMediaTypeInfo, OerProps } from '../../../types/encoreElements';

import { useHasHydrated } from '../../../utils/utils';

export type TabTypesOfResourcesProps = {};

export const TabTypesOfResources = ({ }: TabTypesOfResourcesProps) => {
  const { filtered, setFiltered } = useContext(DiscoveryContext);
  const [previousContent, setPreviousContent] = useState<OerProps[]>([]);
  const hydrated = useHasHydrated();

  const resourceTypes: any[] = [];

  //retrieve resourse types
  filtered?.forEach(
    (oer: { media_type: OerMediaTypeInfo[] }) =>
      oer.media_type?.map((item: OerMediaTypeInfo) =>
        resourceTypes.push(item.name)
      )
  );

  const transformedObject = resourceTypes.reduce((result, element) => {
    result[element] = (result[element] || 0) + 1;
    return result;
  }, {});

  const newData = Object.entries(transformedObject).map(
    ([name, size], index) => ({
      id: index + 1,
      name: name,
      size: Number(size as string),
    })
  );

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Sort newData array by size in descending order
  newData.sort((a, b) => b.size - a.size);

  // Create an array of datasets
  const datasets = newData.map((item) => ({
    label: `${item.name} (Size: ${item.size})`, // Add the size value to the label
    data: [
      {
        r: item.size,
        type: item.name,
      },
    ],
    backgroundColor: getRandomColor(), // Set a color for each dataset
  }));

  const jsonData = {
    datasets: datasets,
  };

  // Transform the JSON data into a format suitable for a pie chart
  const transformedData = jsonData.datasets.flatMap((dataset) =>
    dataset.data.map((item) => ({
      label: item.type,
      value: item.r,
      backgroundColor: dataset.backgroundColor,
    }))
  );

  const data = {
    labels: transformedData.map((item) => item.label),
    datasets: [
      {
        data: transformedData.map((item) => item.value),
        backgroundColor: transformedData.map((item) => item.backgroundColor),
      },
    ],
  };

  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);

  const handleSliceClick = (event: any, elements: any) => {
    if (elements.length > 0 && elements[0].index !== undefined) {
      const clickedIndex = elements[0].index;
      console.log('Clicked Index:', clickedIndex);

      if (clickedIndex >= 0 && clickedIndex < transformedData.length) {
        const clickedSliceLabel = transformedData[clickedIndex].label;
        console.log('Clicked Slice Label:', clickedSliceLabel);

        if (selectedSlice === clickedIndex) {
          setSelectedSlice(null);
          setFiltered(previousContent);
        } else if (selectedSlice !== null) {
          setSelectedSlice(null);
          setFiltered(previousContent);
        } else {
          setSelectedSlice(clickedIndex);
          updateOers(clickedSliceLabel);
        }
      } else {
        console.log('Invalid Clicked Index:' + clickedIndex);
      }
    }
  };

  const filterData = () => {
    if (selectedSlice !== null && transformedData[selectedSlice]) {
      const { label, value } = transformedData[selectedSlice];
      return {
        labels: [label],
        datasets: [
          {
            data: [value],
            backgroundColor: data.datasets[0].backgroundColor,
          },
        ],
      };
    } else {
      return {
        labels: data.labels,
        datasets: [
          {
            data: data.datasets[0].data,
            backgroundColor: data.datasets[0].backgroundColor,
          },
        ],
      };
    }
  };

  const filteredDataObject = filterData();

  const updateOers = (label: string) => {
    const resources: any[] = [];
    setPreviousContent(filtered);
    filtered?.forEach(
      (oer: { media_type: OerMediaTypeInfo[] }) =>
        oer.media_type?.map((item: any) => {
          if (item.name === label) {
            resources.push(oer);
          }
        })
    );
    setFiltered(resources);
  };

  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Pie Chart shows the types of resources available for the searched
          keywords. Click on a portion to filter resources according to the
          selected types.
        </Text>
      </Stack>

      {filtered.length > 0 && hydrated && (
        <Stack spacing={0}>
          <Doughnut
            data={filteredDataObject}
            options={{ onClick: handleSliceClick }}
          />
        </Stack>
      )}
    </>
  );
};
