import { Box, Flex, ModalBody, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { ColorCollectionProps, ToggleLikeFunction } from "../../../../types/encoreElements";
import { useHasHydrated } from "../../../../utils/utils";
import GridMetadataOer from "../../../Grids/GridMetadataOer";
import TagConcept from "../../../Tags/TagConcept";
import TagResourceType from "../../../Tags/TagReourceType";

interface BodyCardInfoModalProps {
    description: string;
    assessment_oer_type: string | null;
    resourceType: string[];
    concepts: string[];
    collectionsColor: (ColorCollectionProps | undefined)[];
    lastUpdate: string;
    times_used: number;
    total_likes: number;
    qualityScore: number;
    coverage: string[];
    subjects: string[];
    publishers: string;
    contributors: string;
    source_roer: string[];
    source: string;
    oer: any;
    likedOers: number[];
    toggleLikeOER: ToggleLikeFunction;
    setUpdateLikeOER: Dispatch<SetStateAction<boolean>>;

}

export default function BodyCardInfoModal({
    description,
    assessment_oer_type,
    resourceType,
    concepts,
    collectionsColor,
    lastUpdate,
    times_used,
    total_likes,
    qualityScore,
    coverage,
    subjects,
    publishers,
    contributors,
    source_roer,
    source,
    oer,
    likedOers,
    toggleLikeOER,
    setUpdateLikeOER,
}: BodyCardInfoModalProps) {
    const hydrated = useHasHydrated();
    return (
        <ModalBody>
            <Text pb="5">{description}</Text>
            <Flex
                gap={1}
                w="100%"
                pb="5"
                justifyContent={'flex-start'}
                flexWrap={'wrap'}
                flex="1"
            >
                <TagResourceType
                    resourceType={
                        assessment_oer_type
                            ? [assessment_oer_type]
                            : resourceType || []
                    }
                />
            </Flex>

            <Flex justifyContent={'left'} pb="5" overflowWrap={'normal'}>
                <Box>
                    <Text variant="label_drawer">Concepts covered</Text>
                    <Flex gap={1} w="100%" flexWrap={'wrap'}>
                        <TagConcept concepts={concepts} />
                    </Flex>
                </Box>
            </Flex>
            {collectionsColor?.length > 0 && (
                <Text pb={1} variant="label">
                    {' '}
                    Click on the like button to let us know if you enjoyed the OER
                </Text>
            )}
            {hydrated && (
                <GridMetadataOer
                    gap={3}
                    lastUpdate={lastUpdate}
                    used={times_used}
                    likes={total_likes}
                    qualityScore={qualityScore}
                    isCardInfoModal={true}
                    // setLikeOER={() => setLikeOER(oer?.id)}
                    // reduceLikeOER={() => reduceLikeOER(oer?.id)}
                    // getLikes={() => getLikes(oer?.id)}
                    toggleLikeOER={() => toggleLikeOER(oer?.id)}
                    setUpdateLikeOER={setUpdateLikeOER}
                    isOERSaved={collectionsColor.length > 0}
                    isOERLiked={
                        oer?.id === undefined ? false : likedOers?.includes(oer?.id)
                    }
                />
            )}
            <Flex justifyContent={'left'} pb="5">
                <Box>
                    <Text variant="label_drawer">Disciplinary field</Text>
                    <Text>
                        {' '}
                        {coverage && coverage.length > 0
                            ? coverage.join(', ')
                            : oer?.level}
                    </Text>
                </Box>
            </Flex>

            <Flex justifyContent={'flex-start'} pb="5">
                <Box>
                    <Text variant="label_drawer">Context</Text>
                    <Text>{subjects.join(', ')}</Text>
                </Box>
            </Flex>
            <Flex justifyContent={'left'} pb="5">
                <Box flex="1">
                    <Text variant="label_drawer">Publisher</Text>
                    <Text>{publishers}</Text>
                </Box>
                <Box flex="1">
                    <Text variant="label_drawer">Contributor</Text>
                    <Text>{contributors}</Text>
                </Box>
            </Flex>

            {source_roer && source_roer.length > 0 && (
                <Flex justifyContent={'left'} pb="5">
                    <Box>
                        <Text variant="label_drawer">Retrieved from</Text>
                        <Text>{source_roer.join(', ')}</Text>
                    </Box>
                </Flex>
            )}

            {source && (
                <Flex justifyContent={'left'} pb="5">
                    <Box>
                        <Text variant="label_drawer">OER Source</Text>
                        <Text>{source}</Text>
                    </Box>
                </Flex>
            )}

            <Flex justifyContent={'left'} pb="5">
                <Box>
                    <Text variant="label_drawer">License</Text>
                    <Text>{oer?.rights}</Text>
                </Box>
            </Flex>
        </ModalBody>
    );
}