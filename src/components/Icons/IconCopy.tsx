import { Icon, IconProps } from "@chakra-ui/react";
import { FaCopy } from 'react-icons/fa6';

interface IconCopyProps extends IconProps {
    size: string | number
}

export default function IconCopy({
    size,
    ...rest
}: IconCopyProps) {
    return (
        <Icon
            {...rest}
            as={FaCopy}
            style={{
                //background: 'none',
                cursor: 'pointer',
                position: 'sticky',
                fontSize: size,
                padding: '2',
            }}
            _hover={{
                background: 'gray.200',
                borderRadius: '7px',
            }}
        />)
}