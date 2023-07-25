import { Stack, Text } from '@chakra-ui/react';
import {
  BubbleDataPoint,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { useContext, useState } from 'react';

import { Bubble } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)


import { DiscoveryContext } from '../../../Contexts/discoveryContext';

import { FaSync } from 'react-icons/fa';



export type TabTypesOfResourcesProps = {};


export const TabTypesOfResources = ({ }: TabTypesOfResourcesProps) => {




  // const { oers, setOERs } = props;

  // const [graph, setGraph] = useState<EncoreConceptMap | null>();
  //const API = useMemo(() => new APIV2(undefined), []);

  const { filtered, setFiltered } = useContext(DiscoveryContext);
  // const { byResourceType, setByResourceType } = useContext(DiscoveryContext);

  const [previousContent, setPreviousContent] = useState('');
  const [isActiveRefresh, setIsActiveRefresh] = useState(false);
  const [isActiveBubble, setIsActiveBubble] = useState(false);
  const resourceTypes: any[] = [];

  //retrieve resourse types
  filtered?.forEach((oer: { media_type: any[]; }) => oer.media_type?.map((item: any) => resourceTypes.push(item.name)));


  const transformedObject = resourceTypes.reduce((result, element) => {
    result[element] = (result[element] || 0) + 1;
    return result;
  }, {});




  const newData = Object.entries(transformedObject).map(([name, size], index) => ({
    id: index + 1,
    name: name,
    size: Number(size as string),
  }));




  const handleReloadClick = () => {
    setIsActiveRefresh(false);
    setIsActiveBubble(false);
    setFiltered(previousContent);
  };


  const onClickBubble = (event: any, elements: any) => {
    setIsActiveRefresh(true);
    setIsActiveBubble(true);
    const resources: any[] = [];
    setPreviousContent(filtered);
    if (elements.length > 0) {
      const item = chartData.datasets[elements[0].datasetIndex].data[elements[0].index];
      const type = item.type
      // here we filter the selected OERs by type
      filtered?.forEach((oer: { media_type: any[]; }) => oer.media_type?.map((item: any) => {
        if (item.name === type) {
          resources.push(oer);
        }
      }));

    }
    setFiltered(resources);

  };


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
    data: [{ x: Math.random() * 10, y: Math.random() * 10, r: item.size, type: item.name }],
    backgroundColor: getRandomColor(), // Set a color for each dataset
  }));

  const chartData = {
    datasets: datasets,
  };


  interface ExtendedBubbleDataPoint extends BubbleDataPoint {
    type: string;
  }

  const chartOptions: ChartOptions<'bubble'> = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 10, // Adjust the padding value to increase or decrease the space
        },
      },
      tooltip: {

        callbacks: {
          label: (context: any) => {
            const item = context.dataset.data[context.dataIndex] as ExtendedBubbleDataPoint;
            return `${item.type}`;
          },
        },
      },

    },
    onClick: isActiveBubble ? undefined : onClickBubble,

  };



  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Bubble Chart shows the types of resources available for the searched keywords.
          Click on a circle to filter resources according to the selected types.
        </Text>

      </Stack>
      <button onClick={handleReloadClick} disabled={!isActiveRefresh}>
        <FaSync />
        Refresh
      </button>

      <Stack spacing={0}>

        <Bubble data={chartData} options={chartOptions} />

      </Stack>
    </>
  );
};
