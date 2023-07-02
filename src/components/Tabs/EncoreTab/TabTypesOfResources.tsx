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

import { useMemo, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { APIV2 } from '../../../data/api';
import { EncoreConceptMap } from '../../../types/encore';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)


export type TabTypesOfResourcesProps = {
  oers?: any[];
  searchCallBack: (domainIds: String[]) => Promise<void>;
};


export const TabTypesOfResources = (props: TabTypesOfResourcesProps) => {


  const { oers, searchCallBack } = props;

  const [graph, setGraph] = useState<EncoreConceptMap | null>();
  const API = useMemo(() => new APIV2(undefined), []);


  const resourceTypes: any[] = [];


  //retrieve resourse types
  oers?.forEach(oer => oer.media_type.map((item: any) => resourceTypes.push(item.name)));


  const transformedObject = resourceTypes.reduce((result, element) => {
    result[element] = (result[element] || 0) + 1;
    return result;
  }, {});




  const newData = Object.entries(transformedObject).map(([name, size], index) => ({
    id: index + 1,
    name: name,
    size: Number(size as string),
  }));




  const onClickDiagram = async (selection: any) => {
    if (!selection) return;
    const domainIds = [...selection.sets].map((set) => set.domainId);
    await searchCallBack(domainIds);
  }


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
        position: 'right',
        align: 'center',

      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const item = context.dataset.data[context.dataIndex] as ExtendedBubbleDataPoint;
            return `${item.type} - ${item.r}`;
          },
        },
      },

    },

  };


  const chartContainerStyle = {
    marginBottom: '120px', // Add desired spacing value
  };


  return (
    <>
      <Stack spacing={0}>
        <Text color="primary">
          The Bubble Chart shows the types of resources available for the searched keywords.
          Click on a circle to filter resources according to the selected types.
        </Text>

      </Stack>


      <Bubble data={chartData} options={chartOptions} />



    </>
  );
};
