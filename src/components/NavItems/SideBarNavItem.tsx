/* NavItems for the SideBar */


import { ReactText } from 'react';
import { IconType } from 'react-icons';
import NavItem from './NavItem';


interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}

interface SideBarNavItemProps {
    link: LinkItemProps;
    selectedLink: string;
    setIsSelected: (value: string) => void;
    children: ReactText | string;
}


const SideBarNavItem = ({
    link,
    selectedLink,
    setIsSelected,
    children
}: SideBarNavItemProps) => {
    return (
        <NavItem
            key={link.name}
            icon={link.icon}
            link={link.link}
            isSelected={link.link === selectedLink}
            setIsSelected={() => setIsSelected(link.link)}
            gap={3}
            height="45px"
            width="196px"
            ml="1px"
            pl="20px"
            my="15px"
            align="center"
            //p="4"
            role="group"
            cursor="pointer"
            borderLeft="5px"
            borderLeftColor={(link.link === selectedLink) ? 'accent.900' : 'white'}
            borderLeftStyle={'solid'}
            _hover={{
                bg: 'white',
                color: 'accent.900',
            }}
            bg={(link.link === selectedLink) ? 'accent.200' : ''}
            color={'primary'}
        >
            {children}
        </NavItem>
    );
};

export default SideBarNavItem;
