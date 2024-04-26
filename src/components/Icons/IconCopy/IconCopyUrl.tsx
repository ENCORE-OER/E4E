import { Flex, Tooltip } from '@chakra-ui/react';
import IconCopy from './IconCopy';

type IconCopyUrlProps = {
    fontSize: string | number;
    url: string;
};

export default function IconCopyUrl({ url, fontSize }: IconCopyUrlProps) {
    return (
        <Tooltip
            aria-label={'Copy the OER url'}
            label={'Copy the OER url'}
            hasArrow
            placement="right"
            bg="gray.100"
            color="primary"
            fontSize={'sm'}
            p={1}
        >
            <Flex>
                <IconCopy fontSize={fontSize} url={url} />
            </Flex>
        </Tooltip>
    );
}
