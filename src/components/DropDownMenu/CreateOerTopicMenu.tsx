import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { TopicData } from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';

type CreateOerTopicMenuProps = {
  data: TopicData | undefined;
  title: string;
  onTopicSelect: (index: number) => void; // Funzione di callback per notificare il genitore sull'indice del topic selezionato
};

export default function CreateOerTopicMenu({
  data, // use this to populate the menu
  title,
  onTopicSelect,
}: CreateOerTopicMenuProps) {
  const hydrated = useHasHydrated();

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topic: string, index: number) => {
    setSelectedTopic(topic);
    onTopicSelect(index);
    //console.log('Selected topic index: ', index);
  };

  return (
    <>
      <Menu isLazy>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          width="auto"
          transition="all 0.2s"
          borderRadius="lg"
          borderWidth="1px"
          _expanded={{ bg: 'yellow.400' }}
        >
          {selectedTopic || title}
        </MenuButton>
        <MenuList width="auto" maxH={'350px'} overflowY={'auto'}>
          {hydrated &&
            data?.MainTopics.slice(
              0,
              data.Language !== 'English'
                ? data.MainTopics.length / 2
                : undefined
            ).map((topicItem, index) => (
              <MenuItem
                key={index}
                onClick={() => handleTopicSelect(topicItem.Topic, index)}
              >
                <Text>{topicItem.Topic}</Text>
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </>
  );
}
