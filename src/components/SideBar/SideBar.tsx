import {
  Box,
  BoxProps,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { IconBookmarkCheckCustom } from '../../public/Icons/svgToIcons/iconBookmarkCheckCustom';
//import { IconBookmarkCheck } from '../../public/Icons/svgToIcons/iconBookmarkCheck';
import { IconDashboard } from '../../public/Icons/svgToIcons/iconDashboard';
import { IconPathEdit } from '../../public/Icons/svgToIcons/iconPatheEdit';
import { IconTelescope } from '../../public/Icons/svgToIcons/iconTelescope';

import { useState } from 'react';
import { IconType } from 'react-icons';
import SideBarNavItem from '../NavItems/SideBarNavItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: IconDashboard, link: '/' },
  { name: 'Discover', icon: IconTelescope, link: '/discover' },
  { name: 'Your resources', icon: IconBookmarkCheckCustom, link: '/resources' },
  { name: 'Design', icon: IconPathEdit, link: '/design' },
];

export default function Sidebar({
  pagePath,
}: {
  children?: ReactNode;
  pagePath: string;
}) {
  const { onClose } = useDisclosure();
  //const [selectIndex, setSelectIndex] = useState(-1); // -1 indica nessun elemento selezionato
  const [selectedLink, setSelectedLink] = useState<string>('');
  const setIsSelected = (link: string) => {
    setSelectedLink(link);
  };

  // permette di aggiornare il link di riferimento ogni volta che cambiamo pagina richiamando la funzione setSelectedLink()
  useEffect(() => {
    setSelectedLink(pagePath);
  }, [pagePath]); // l'array [pagePath] indica che bisogna richiamare la funzione solo quando cambia la variabile pagePath. Altrimenti lo farebbe ad ogni render della pagina per qualsiasi modifica

  return (
    <Box>
      <SidebarContent
        onClose={() => onClose}
        display={{
          // specify how to display the sidebar for different screen sizes
          base: 'flex', // 'base' the smallest screen size (half window)
          md: 'flex', // 'md' the largest screen size (medium size window). This should be cover all the other screen sizes.
          flexDirection: 'column',
        }}
        selectedLink={selectedLink}
        setIsSelected={setIsSelected}
      />
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose?: () => void;
  selectedLink: string;
  setIsSelected: (link: string) => void;
}

const SidebarContent = ({
  selectedLink: selectedLink,
  setIsSelected,
  ...rest
}: SidebarProps) => {
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      py="5px"
      bg="white"
      borderRight="0.5px"
      borderRightColor="secondary"
      borderRightStyle="solid"
      //justifyContent="center"
      //w={{ base: 'flex', md: 'auto' }}
      width={isSmallerScreen ? '50px' : '200px'}
      height="100vh"
      pos="fixed"
      zIndex="sticky"
      //position="sticky"
      pt="60px"
      left="0"
      {...rest}
    >
      {LinkItems.map((link: LinkItemProps, index: number) => (
        <SideBarNavItem
          key={index}
          link={link}
          selectedLink={selectedLink}
          setIsSelected={setIsSelected}
          isSmallerScreen={isSmallerScreen}
        >
          {isSmallerScreen ? '' : link.name}
        </SideBarNavItem>
      ))}
    </Box>
  );
};
