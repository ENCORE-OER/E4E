import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    useDisclosure,
    VStack
} from '@chakra-ui/react';


import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SingleResourceCard from '../components/Card/SingleResourceCard';
import DrawerCard from '../components/Drawers/DrawerCard';
import Navbar from '../components/NavBars/NavBarEncore';
import SideBar from '../components/SideBar/SideBar';
import { EncoreTab } from '../components/Tabs/EncoreTab';
import { APIV2 } from '../data/api';

type DiscoverPageProps = {
    accessToken: string | undefined;
};



const Discover = (props: DiscoverPageProps) => {
    const [searchValue, setSearchValue] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [page, setPage] = useState(true);
    const [respSearchOers, setRespSearchOers] = useState<any[]>([]);
    const [oerById, setOerById] = useState<any[]>([]);

    const [domain, setDomain] = useState<any[]>([]); // to save each type of domain of the resources
    const [dataSearching, setDataSearching] = useState<any[]>([]); // save the data found from searching

    const router = useRouter(); // router è un hook di next.js che fornisce l'oggetto della pagina corrente
    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);




    const searchOERs = async (skills: String | String[], andOption: String, orOption: String, domainIds?: String[], resourceTypeIds?: String[]) => {
        //here we search the OERS using the query parameters

        alert(JSON.stringify(skills));
        alert("and option prima della query: " + andOption);
        alert("or option prima della query: " + orOption);
        alert(skills.length);

        const isArray = Array.isArray(skills);

        const api = new APIV2(props.accessToken);



        //case 1 - only one skill
        if (!isArray) {
            alert("solo una skill da cercare");
            const oers = await api.searhOERbySkillNoPages(
                [skills],
                // domainIds ?? selectedDomain,
                // selectedSubject,
                // resourceTypeIds ?? selectedResourceTypes,
                // selectedAudience
            );
            setRespSearchOers(oers);
        }

        //case 2 - more than one skill we check if all skills must be used or at least one

        else if (andOption === "true") {
            alert("molte skills da cercare in AND");
            const oers = await api.searhOERbySkillNoPages(
                [skills],
                // domainIds ?? selectedDomain,
                // selectedSubject,
                // resourceTypeIds ?? selectedResourceTypes,
                // selectedAudience
            );
            setRespSearchOers(oers);

        }

        else if (orOption === "true") {
            alert("molte skills da cercare in OR");
            const oers = await api.searhOERbySkillNoPages(
                [skills],
                // domainIds ?? selectedDomain,
                // selectedSubject,
                // resourceTypeIds ?? selectedResourceTypes,
                // selectedAudience
            );
            setRespSearchOers(oers);
        }
        else if ((orOption === "false") && (andOption === "false")) {
            alert("molte skills con caso default - OR");
            const oers = await api.searhOERbySkillNoPages(
                [skills],
                // domainIds ?? selectedDomain,
                // selectedSubject,
                // resourceTypeIds ?? selectedResourceTypes,
                // selectedAudience
            );
            setRespSearchOers(oers);

        }

        /*
                else if ([skills].length == 0) {
                    alert("SKILLS NON INSERITA");
        
                    const oers = await api.getOERs();
        
                    const oersSkillsLabel = oers?.flatMap((oer: any) => {
                        if (oer.skills?.length > 0) {
                            return oer.skills?.map((skill: any) => ({
                                id_oer: oer.id,
                                skillLabel: skill.label,
                            }));
                        } else {
                            return {
                                id_oer: oer.id,
                                skillLabel: '',
                            };
                        }
                    });
        
                    const labels = oersSkillsLabel?.map((element: any) => element.skillLabel);
                    console.log('labels: ' + labels);
        
                    const filteredOers = oersSkillsLabel.filter((oer: any) =>
                        searchValue.includes(oer.skillLabel)
                    );
                    const formattedOers = filteredOers.map((oer: any) => ({
                        id_oer: oer.id_oer,
                        skillLabel: oer.skillLabel,
                    }));
        
        
                    setDataSearching(
                        filteredOers.map((oer) => oers.find((item) => item.id === oer.id_oer))
                    );
                    alert("OER TROVATE: " + oers.length);
        
                } else alert('Write Something!');
        */
        setIsLoading(false);
    };

    const searchCallback = async (domainIds: any[]) => {

    };



    const getDataOerById = async (id_oer: any) => {
        const api = new APIV2(props.accessToken);

        try {
            const oer = await api.getOerById(id_oer);
            return oer[0];
        } catch (error) {
            throw error;
        }
    };




    useEffect(() => {
        if (router.query.skills != undefined) {
            let skills = router.query.skills as String[];
            let andOption = router.query.andOption as String;
            let orOption = router.query.orOption as String;
            setIsLoading(true);

            searchOERs(skills, andOption, orOption);
        }
    }, [router.query]);


    return (
        <Flex w="100%" h="100%">
            <Navbar user={user} />
            <SideBar pagePath={router.pathname} />
            <>


                {(
                    <Flex ml="200px" h="100vh" pt="60px" w="full">
                        <Box flex="1" py="30px" px="30px" h="full" w="full">
                            <Flex
                                w="100%"
                                justifyContent="left"
                            //justify="space-between"
                            >
                                <Heading fontFamily="title">
                                    <Text>Discover</Text>
                                </Heading>
                            </Flex>







                            <HStack mb="5">
                                <Text fontWeight="light" color="grey">
                                    {`${respSearchOers.length} resources`}
                                </Text>
                            </HStack>

                            {isLoading && (
                                <div className="loading-spinner">
                                    <div className="spinner"></div>
                                    <p>Loading...</p>
                                </div>
                            )
                            }

                            {respSearchOers && (
                                <VStack>
                                    {respSearchOers?.map((oer: any) => (
                                        <Box
                                            key={oer.id}
                                            onClick={async (e: any) => {
                                                e.preventDefault();
                                                onOpen();

                                                setOerById(await getDataOerById(oer.id));
                                            }}
                                            as="button"
                                        >
                                            <SingleResourceCard
                                                idOer={oer.id}
                                                domain={
                                                    oer.skills?.flatMap((skill: any) =>
                                                        skill.domain?.map((domain: any) => domain.name)
                                                    ) || []
                                                }
                                                title={oer.title}
                                                authors={
                                                    oer.creator?.map((item: any) => item.full_name) || []
                                                }
                                                description={oer.description}
                                                lastUpdate={oer.retrieval_date}
                                                resourceType={
                                                    oer.media_type?.map((item: any) => item.name) || []
                                                }
                                            />
                                        </Box>
                                    ))}
                                </VStack>
                            )}
                        </Box>

                        <DrawerCard isOpen={isOpen} onClose={onClose} oer={oerById} />



                        <EncoreTab
                            oers={respSearchOers}
                            domains={domain}
                            searchCallBack={searchCallback}
                            flex="1" // "flex='1'" fill the rest of the page
                            py="30px"
                            px="30px"
                            w="full"
                            h="full"
                            backgroundColor="background"
                            borderLeft="0.5px"
                            borderLeftColor={'secondary'}
                            borderLeftStyle={'solid'}
                        />
                    </Flex>
                )}
            </>
        </Flex>
    );
};

export default Discover;


