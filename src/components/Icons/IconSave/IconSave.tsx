import { Icon, IconProps } from '@chakra-ui/react';
import { FaSave } from 'react-icons/fa';

// interface IconSaveProps extends IconProps {

// }

export default function IconSave({ ...rest }: IconProps) {
    return <Icon {...rest} as={FaSave} fontSize="x-large" fontWeight="bold" />;
}
