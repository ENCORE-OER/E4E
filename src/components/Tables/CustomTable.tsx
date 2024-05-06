import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { TableLearningPathProps } from "../../types/encoreElements";

export default function CustomTable({ titles, data }: TableLearningPathProps) {

    return (
        <TableContainer fontSize={'sm'} borderRadius='md' borderStyle='solid'>
            <Table borderWidth="1px" borderColor="primary">
                <Thead bg="primary" color="white" borderWidth="2px" borderColor="primary">
                    <Tr>
                        {titles.map((title: string, index: number) =>
                            <Th
                                key={index}
                                borderWidth="2px"
                                borderColor="primary"
                                color="white"
                                textTransform="none"
                            >
                                {title}
                            </Th>
                        )}
                    </Tr>
                </Thead>
                <Tbody bg='white'>
                    {data.map((row, index: number) => (
                        <Tr key={index} borderWidth="1px" borderColor="primary">
                            <Td borderWidth="2px" borderColor="primary">{row.number}</Td>
                            <Td borderWidth="2px" borderColor="primary">{row.type}</Td>
                            <Td borderWidth="2px" borderColor="primary">{row.activity}</Td>
                            <Td borderWidth="2px" borderColor="primary">{row.description}</Td>
                            <Td borderWidth="2px" borderColor="primary">{row.content}</Td>
                            <Td borderWidth="2px" borderColor="primary">{row.action}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}