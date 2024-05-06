import { Flex, Icon, IconProps, Image, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type LearningPathTabLabelProps = {
    name: string;
    spacing?: number;
    iconSrc?: string;
    iconTab?: IconType | (({ ...rest }: IconProps) => JSX.Element);
};

export default function LearningPathTabLabel(props: LearningPathTabLabelProps) {
    const { name, spacing, iconSrc, iconTab } = props;
    return (
        <Flex gap={spacing} justifyContent="center" alignItems="center">
            {iconSrc && <Image src={iconSrc} alt={name} w={30} />}
            {iconTab && <Icon as={iconTab} />}
            <Text>{name}</Text>
        </Flex>
    );
}