import { Button, Flex } from "@chakra-ui/react";
import CustomTable from "./CustomTable";


const titleColumns = ['Nb', 'Type', 'Activity', 'Description', 'Content', 'Action']

const data = [
    {
        number: 1,
        type: <Button variant="solid">Type</Button>,
        activity: "Activity A",
        description: "Description A",
        content: <Button variant="solid">Add Content</Button>,
        action: <Button variant="solid">Action</Button>,
    },
    {
        number: 2,
        type: <Button variant="solid">Type</Button>,
        activity: "Activity A",
        description: "Description A",
        content: <Button variant="solid">Add Content</Button>,
        action: <Button variant="solid">Action</Button>,
    },
    {
        number: 3,
        type: <Button variant="solid">Type</Button>,
        activity: "Activity A",
        description: "Description A",
        content: <Button variant="solid">Add Content</Button>,
        action: <Button variant="solid">Action</Button>,
    },
    {
        number: 4,
        type: <Button variant="solid">Type</Button>,
        activity: "Activity A",
        description: "Description A",
        content: <Button variant="solid">Add Content</Button>,
        action: <Button variant="solid">Action</Button>,
    },
    // Add more data as needed
];

export default function TableLearningPath() {
    return (
        <Flex direction="column" align="center" justify="center">
            <CustomTable data={data} titles={titleColumns} />
        </Flex>
    );
}