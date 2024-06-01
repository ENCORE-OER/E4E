import { Text } from "@chakra-ui/react"

type LabelEmptyFieldTableProps = {
    label: string
}

export default function LabelEmptyFieldTable({ label }: LabelEmptyFieldTableProps) {
    return (
        <Text
            fontWeight="light"
            fontSize="small"
            color={"gray.400"}
        >
            {label}
        </Text>
    )
}