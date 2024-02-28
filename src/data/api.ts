import axiosCreate, { AxiosInstance, AxiosResponse } from 'axios';
import { v4 } from 'uuid';
import { EncoreConceptMap } from '../types/encore';
import {
  LearningScenarioProps,
  MetricsOers,
  OerAudienceInfo,
  OerConceptInfo,
  OerDomainInfo,
  OerFreeSearchProps,
  OerMediaTypeInfo,
  OerProps,
  OerSkillInfo,
  OerSubjectInfo,
  OersDBProps,
  RespDataProps,
} from '../types/encoreElements';
import { PolyglotFlow, PolyglotFlowInfo } from '../types/polyglot/PolyglotFlow';

const axios = axiosCreate.create({
  baseURL: process.env.BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const axiosNoCookie = axiosCreate.create({
  baseURL: process.env.BACK_URL, //TODO change to the encore URL
  headers: {
    'Content-Type': 'application/json',
  },
});

type Tag = {
  value: string;
  count: number;
};

export class APIV2 {
  axios: AxiosInstance;
  //axiosNoCookie: AxiosInstance;
  redirect401: boolean;
  redirect401URL?: string;
  error401: boolean;

  constructor(access_token: string | undefined) {
    this.redirect401 = false;
    this.error401 = true;
    this.axios = axiosCreate.create({
      baseURL: process.env.BACK_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: access_token ? 'Bearer ' + access_token : '',
      },
    });
  }

  setRedirect401(check: boolean, redirect_url?: string) {
    this.redirect401 = check;
    this.redirect401URL = redirect_url;
    return this;
  }

  disable401() {
    this.error401 = false;
    return this;
  }

  async getSkills(
    page = 1,
    allSkills: OerSkillInfo[] = []
  ): Promise<OerSkillInfo[]> {
    try {
      const respSkills = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/skills/?page=${page}`
      );
      const skills = respSkills.data?.data || [];
      const updatedSkills = [...allSkills, ...skills]; // to create a new array combining two other array

      if (skills.length === 10) {
        return this.getSkills(page + 1, updatedSkills);
      }

      return updatedSkills;
    } catch (error) {
      throw error;
    }
  }

  // API to retrieve the Skills from a free text - even partial written text in the search bar
  //without pagination
  async getSkillsByText(skill_text: string): Promise<OerSkillInfo[]> {
    try {
      const resp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/skills/label_search/?search=${skill_text}`
      );
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  // API to retrieve the Skills from a free text - even partial written text in the search bar
  //with pagination
  async getSkillsByTextWithPages(
    page = 1,
    skill_text: string,
    allSkills: OerSkillInfo[] = []
  ): Promise<OerSkillInfo[]> {
    try {
      const respSkills = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/skills/label_search/?page=${page}&search=${skill_text}`
      );
      const skills = respSkills.data?.data || [];
      const updatedSkills = [...allSkills, ...skills]; // to create a new array combining two other array

      if (skills.length === 10) {
        return this.getSkills(page + 1, updatedSkills);
      }

      return updatedSkills;
    } catch (error) {
      throw error;
    }
  }

  // TODO: move this api to Server side
  async getConceptMapOersNLP(
    oers_ids: number[]
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(
      `${process.env.CONCEPT_URL}/api/concept/genMapOers`,
      {
        oers_ids: oers_ids,
      }
    );
  }

  // TODO: move this api to Server side
  async getConceptMapOers(
    filteredOers: OerProps
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(`${process.env.CONCEPT_URL}/api/concept/genMapExt`, {
      oers: filteredOers,
    });
  }

  // TODO: move this api to Server side
  async getConceptMapSkill(
    skill: string
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(
      `${process.env.CONCEPT_URL}/api/concept/genMapSkill`,
      {
        skill: skill,
      }
    );
  }

  async getAllSkills(): Promise<OerSkillInfo[]> {
    try {
      return await this.getSkills();
    } catch (error) {
      throw error;
    }
  }

  async getSkillsLabel(): Promise<{ id: number; label: string }[]> {
    try {
      const temp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/skills/labels/`
      );

      const recordsTotal = temp.data?.recordsTotal;
      const num_pages = Math.ceil(recordsTotal / 10);
      console.log('NUM PAGES: ' + num_pages);

      let updatedSkills: { id: number; label: string }[] = [];

      for (let i = 1; i < num_pages + 1; i++) {
        const resp = await axiosNoCookie.get(
          `https://encore-db.grial.eu/api/skills/labels/?page=${i}`
        );

        const labelsPage =
          resp.data?.data?.map((skill: OerSkillInfo) => ({
            id: skill.id,
            label: skill.label,
          })) || [];
        updatedSkills = [...updatedSkills, ...labelsPage];
      }

      return updatedSkills;
    } catch (error) {
      throw error;
    }
  }

  async getAllSkillsLabel(): Promise<{ id: number; label: string }[]> {
    try {
      const resp = await this.getSkillsLabel();

      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getOERs(
    page = 1,
    allOers: OerProps[] = [],
    stop = 100
  ): Promise<OerProps[]> {
    try {
      const respOers = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/oers/?page=${page}`
      );

      const oers = respOers.data?.data || [];
      const updatedOers = [...allOers, ...oers]; // to create a new array combining two other array

      if (stop > 0) {
        console.log('PAGINA DI OERS: ' + page);
        return this.getOERs(page + 1, updatedOers, stop - 1);
      }

      return updatedOers;
    } catch (error) {
      throw error;
    }
  }

  // ?? here introduce the API to retrieve the concepts occurriences from the set of OERs

  // https://encore-db.grial.eu/api/oer_concept_count/?oer_ids=101866&oer_ids=109505&oer_ids=97314&oer_ids=84058

  async getConceptsWords(oers: number[]): Promise<Tag[]> {
    try {
      const transformedParams = oers.map((id) => `oer_ids=${id}`).join('&');
      const apiUrl = `https://encore-db.grial.eu/api/oer_concept_count/?${transformedParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  async getOerById(id_oer: number, signal?: AbortSignal): Promise<OerProps[]> {
    try {
      const config: any = {
        singal: signal,
      };

      const resp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/oers/?id=${id_oer}`,
        config
      );

      /*const oer = resp.data?.data.map((item: any) => item);
      return oer;*/

      return resp.data?.data ?? [];
    } catch (error) {
      throw error;
    }
  }

  //API to retrieve the resources with multiple skills in AND
  //https://encore-db.grial.eu/api/boolean/oers/?and_skills=23304&and_skills=22529
  // Without pagination
  //https://encore-db.grial.eu/api/no_pagination/boolean/oers/?and_skills=23304&and_skills=22529

  async getOersInAND(oers: string[]): Promise<OerProps[]> {
    try {
      const transformedParams = oers.map((id) => `and_skills=${id}`).join('&');
      const apiUrl = `https://encore-db.grial.eu/api/no_pagination/boolean/oers/?${transformedParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  async getOersInOR(oers: string[]): Promise<OerProps[]> {
    try {
      const transformedParams = oers.map((id) => `or_skills=${id}`).join('&');
      const apiUrl = `https://encore-db.grial.eu/api/no_pagination/boolean/oers/?${transformedParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  async getDigitalOer(): Promise<OerProps> {
    try {
      const resp_oer = await axios.get(
        ' https://encore-db.grial.eu/api/oers/?green={false}&digital={true}&entrepreneurhip={false}'
      );

      const oer = resp_oer.data;

      return oer;
    } catch (error) {
      throw error;
    }
  }

  async getOer(): Promise<OerProps> {
    try {
      const resp_oer = await axios.get('http://localhost:3000/api/encore/oer');

      const oer = resp_oer.data;

      return oer;
    } catch (error) {
      throw error;
    }
  }

  async getOerDescription(): Promise<string> {
    try {
      const resp_oer = await axios.get('http://localhost:3000/api/encore/oer');

      const description = resp_oer.data?.description;

      return description;
    } catch (error) {
      throw error;
    }
  }

  async getMetrics(): Promise<MetricsOers[]> {
    try {
      const resp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/metrics/oers/`
      );

      const metrics = resp.data?.data?.metrics;
      // console.log(JSON.stringify(metrics));

      return metrics;
    } catch (error) {
      throw error;
    }
  }

  async getDomains(
    page = 1,
    allDomains: OerDomainInfo[] = [],
    stop = 10
  ): Promise<OerDomainInfo[]> {
    try {
      const resp_dom = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/domains/?page=${page}`
      );

      const domainsPage =
        resp_dom.data?.data?.map((domain: OerDomainInfo) => domain) || [];
      const updatedDomains = [...allDomains, ...domainsPage];

      if (domainsPage.length === 10) {
        if (stop > 0) {
          return await this.getDomains(page + 1, updatedDomains, stop - 1);
        }
      }

      return updatedDomains;
    } catch (error) {
      throw error;
    }
  }

  async getSubjects(
    page = 1,
    allSubjects: OerSubjectInfo[] = [],
    stop = 10
  ): Promise<OerSubjectInfo[]> {
    try {
      const resp_sub = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/subjects/?page=${page}`
      );

      const subjectsPage =
        resp_sub.data?.data?.map((subject: OerSubjectInfo) => subject) || [];
      const updatedSubjects = [...allSubjects, ...subjectsPage];

      if (subjectsPage.length === 10) {
        if (stop > 0) {
          return await this.getSubjects(page + 1, updatedSubjects, stop - 1);
        }
      }
      return updatedSubjects;
    } catch (error) {
      throw error;
    }
  }

  async getResourceTypes(
    page = 1,
    allTypes: OerMediaTypeInfo[] = [],
    stop = 10
  ): Promise<OerMediaTypeInfo[]> {
    try {
      const resp_ResTypes = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/types/?page=${page}`
      );

      const resTypesPage =
        resp_ResTypes.data?.data?.map((resType: OerMediaTypeInfo) => resType) ||
        [];
      const updatedResTypes = [...allTypes, ...resTypesPage];

      if (resTypesPage.length === 10) {
        if (stop > 0) {
          return await this.getResourceTypes(
            page + 1,
            updatedResTypes,
            stop - 1
          );
        }
      }
      return updatedResTypes;
    } catch (error) {
      throw error;
    }
  }

  async createNewFlow(
    flow: Partial<PolyglotFlowInfo>
  ): Promise<AxiosResponse<PolyglotFlow>> {
    return this.axios.post<{}, AxiosResponse, {}>(
      `${process.env.POLYGLOT_URL}/api/flows`,
      {
        _id: v4(),
        title: 'Untitled',
        description: 'Description',
        tags: [],
        nodes: [],
        edges: [],
        ...flow,
      }
    );
  }

  async updateFlow(flow: Partial<PolyglotFlow>) {
    return this.axios.put<PolyglotFlow>(
      `${process.env.POLYGLOT_URL}/api/flows/${flow._id}`,
      flow
    );
  }

  async getAudience(
    page = 1,
    allAudience: OerAudienceInfo[] = [],
    stop = 10
  ): Promise<OerAudienceInfo[]> {
    try {
      const resp_aud = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/coverage/?page=${page}`
      );

      const audiencePage =
        resp_aud.data?.data?.map((audience: OerAudienceInfo) => audience) || [];
      const updatedAudience = [...allAudience, ...audiencePage];

      if (audiencePage.length === 10) {
        if (stop > 0) {
          return await this.getAudience(page + 1, updatedAudience, stop - 1);
        }
      }
      return updatedAudience;
    } catch (error) {
      throw error;
    }
  }

  async searchOERbySkillNoPages(
    //skillIds?: string[],
    //keywords?: string[],
    domainIds?: string[],
    resourceTypeIds?: string[],
    audienceIds?: string[]
  ): Promise<OerProps[]> {
    try {
      const queryParams = new URLSearchParams();
      const ID_ALL = '0';

      /*skillIds?.forEach((skillId: string) => {
        queryParams.append('skills', skillId);
      });*/

      /*keywords?.forEach((keyword: string) => {
        queryParams.append('keywords', keyword);
      });*/

      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: string) => {
          queryParams.append('skill_domain', domainId);
        });
      }

      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append('coverage', audienceId);
        });
      }

      // `https://encore-db.grial.eu/api/no_pagination/boolean/oers/
      //  https://encore-db.grial.eu/api/no_pagination/oers/ API with no pagination

      const temp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/no_pagination/oers/?${queryParams}`
      );

      // const recordsTotal = temp.data?.recordsTotal;
      const oers = temp.data?.data || [];

      // const num_pages = Math.ceil(recordsTotal / 10);
      /*

    for (let i = 1; i < num_pages + 1; i++) {
      const url =  `https://encore-db.grial.eu/api/oers/?page=${i}&${queryParams}`;
      const resp = await axiosNoCookie.get(url);

      const oers = resp.data?.data || [];
      updatedOERs = [...updatedOERs, ...oers]; // to create a new array combining two other array
    }
    */

      return oers;
    } catch (error) {
      throw error;
    }
  }

  async searchOERs(
    page: number,
    //skillIds: string[],
    domainIds: string[],
    resourceTypeIds: string[],
    audienceIds: string[],
    order_by?: string,
    order_asc?: string,
    operator?: string
  ): Promise<RespDataProps> {
    const ID_ALL = '0';

    try {
      const queryParams = new URLSearchParams();

      /*skillIds?.forEach((skillId: any) => {
        queryParams.append('skills', skillId);
      });*/

      if (page > 0) {
        queryParams.append('page', page.toString());
      }

      // LOGIC: if the 'All' checkbox is checked we don't consider it in the URL

      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: string) => {
          queryParams.append('skill_domain', domainId);
        });
      }
      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append('coverage', audienceId);
        });
      }
      if (order_by !== undefined) {
        queryParams.append('order_by', order_by);
      }
      if (order_asc !== undefined) {
        queryParams.append('order_asc', order_asc);
      }
      if (operator !== undefined) {
        queryParams.append('operator', operator);
      }

      const url = `https://encore-db.grial.eu/api/oers/?${queryParams}`;
      //alert('url to search OERS: ' + url);

      const resp = await axiosNoCookie.get(url);

      return resp?.data || []; // return 'resp?.data' to be able to access to field 'recordsFiltered'
      //return updatedOERs;
    } catch (error) {
      throw error;
    }
  }

  async searchOERsNoKeywords(
    page: number,
    //domainIds?: string[],   // at the moment the filterig by domain is not implemented by the API
    resourceTypeIds?: string[],
    audienceIds?: string[],
    order_by?: string,
    order_asc?: string,
    operator?: string,
    concepts?: string[]
  ): Promise<RespDataProps> {
    try {
      const queryParams = new URLSearchParams();
      const ID_ALL = '0';

      /*skillIds?.forEach((skillId: any) => {
        queryParams.append('skills', skillId);
      });*/

      if (page > 0) {
        queryParams.append('page', page.toString());
      }

      // LOGIC: if the 'All' checkbox is checked we don't consider it in the URL

      // if (!domainIds?.includes(ID_ALL)) {
      //   domainIds?.forEach((domainId: string) => {
      //     queryParams.append(
      //       `${operator ? operator : 'and'}_skill_domain`,
      //       domainId
      //     );
      //   });
      // }
      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append(
            `${operator ? operator : 'and'}_media_type`,
            resourceTypeId
          );
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append(
            `${operator ? operator : 'and'}_coverage`,
            audienceId
          );
        });
      }
      if (order_by !== undefined) {
        queryParams.append(
          'order_by',
          order_by === 'search_rank' ? 'title' : order_by // 'search_rank' is not a field for this API
        );
      }
      if (order_asc !== undefined) {
        queryParams.append('order_asc', order_asc);
      }
      // concepts?.forEach((concept: string) => {
      //   queryParams.append(`${operator ? operator : 'and'}_concepts`, concept);
      // });
      concepts?.forEach((concept: string) => {
        queryParams.append('concepts', concept);
      });

      //const url = `https://encore-db.grial.eu/api/no_pagination/boolean/oers/?${queryParams}`;
      const url = `https://encore-db.grial.eu/api/boolean/oers/?${queryParams}`;

      const resp = await axiosNoCookie.get(url);

      return resp?.data || []; // return 'resp?.data' to be able to access to field 'recordsFiltered'
      //return updatedOERs;
    } catch (error) {
      throw error;
    }
  }

  // This has pagination (10 items per page)
  async freeSearchOers(
    page: number,
    keywords: string[],
    domainIds?: string[],
    resourceTypeIds?: string[],
    audienceIds?: string[],
    order_by?: string,
    order_asc?: string,
    operator?: string,
    concepts?: string[]
  ): Promise<RespDataProps> {
    try {
      /*const pageParams = page ? `page=${page.toString()}&` : '';
      const queryParams = keywords
        .map((keyword) => `keywords=${keyword}`)
        .join('&');*/

      const queryParams = new URLSearchParams();
      const ID_ALL = '0';

      if (page > 0) {
        queryParams.append('page', page.toString());
      }
      const queryParamsKeywords = keywords?.join(',');
      queryParams.append('keywords', queryParamsKeywords);

      // ------------------------------------------
      // LOGIC: if the 'All' checkbox is checked we don't consider it in the URL
      // domainIds, resourceTypeIds, audienceIds added to try to guarantee advanced search without selected keywords (only with filters)
      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: string) => {
          queryParams.append('skill_domain', domainId);
        });
      }

      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append('coverage', audienceId);
        });
      }
      if (order_by !== undefined) {
        queryParams.append('order_by', order_by);
      }
      if (order_asc !== undefined) {
        queryParams.append('order_asc', order_asc);
      }

      if (operator !== undefined) {
        queryParams.append('operator', operator);
      }

      concepts?.forEach((concept: string) => {
        queryParams.append('concepts', concept);
      });

      // ------------------------------------------

      // /api/free-search/oers/ has search rank functionality, which performs complex operations on a huge set (not filtered) of OERs.
      //const apiUrl = `https://encore-db.grial.eu/api/free-search/oers/?${queryParams}`;

      // /api/free-search-keywords/oers/ has no search rank functionality, but it has "contains keywords" condition.
      // This API check if the exact keywords appear in the title, description, skill or concepts of the OER.
      const apiUrlNoSearchRank = `https://encore-db.grial.eu/api/free-search-keywords/oers/?${queryParams}`;
      const resp = await axiosNoCookie.get(apiUrlNoSearchRank);

      return resp?.data || []; // return 'resp?.data' to be able to access to field 'recordsFiltered'
    } catch (error) {
      throw error;
    }
  }

  // free-search without pagination
  async freeSearchOersNoPagination(
    keywords: string[],
    domainIds?: string[],
    resourceTypeIds?: string[],
    audienceIds?: string[],
    order_by?: string,
    order_asc?: string,
    operator?: string,
    concepts?: string[]
  ): Promise<OerFreeSearchProps[]> {
    try {
      /*const pageParams = page ? `page=${page.toString()}&` : '';
      const queryParams = keywords
        .map((keyword) => `keywords=${keyword}`)
        .join('&');*/

      const queryParams = new URLSearchParams();
      const ID_ALL = '0';

      const queryParamsKeywords = keywords.join(',');
      queryParams.append('keywords', queryParamsKeywords);

      // ------------------------------------------
      // domainIds, resourceTypeIds, audienceIds added to try to guarantee advanced search without selected keywords (only with filters)
      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: string) => {
          queryParams.append('skill_domain', domainId);
        });
      }

      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append('coverage', audienceId);
        });
      }

      if (order_by !== undefined) {
        queryParams.append('order_by', order_by);
      }

      if (order_asc !== undefined) {
        queryParams.append('order_asc', order_asc);
      }

      if (order_asc !== undefined) {
        queryParams.append('order_asc', order_asc);
      }

      if (operator !== undefined) {
        queryParams.append('operator', operator);
      }

      concepts?.forEach((concept: string) => {
        queryParams.append('concepts', concept);
      });

      // ------------------------------------------

      const apiUrl = `https://encore-db.grial.eu/api/no_pagination/free-search/oers/?${queryParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp?.data || [];
    } catch (error) {
      throw error;
    }
  }

  // return the list of concepts involved in the filtered queryset.
  async getConceptsFreeSearch(
    keywords?: string[],
    domainIds?: string[],
    resourceTypeIds?: string[],
    audienceIds?: string[],
    operator?: string,
    concepts?: string[]
  ): Promise<OerConceptInfo[]> {
    try {
      /*const pageParams = page ? `page=${page.toString()}&` : '';
      const queryParams = keywords
        .map((keyword) => `keywords=${keyword}`)
        .join('&');*/

      const queryParams = new URLSearchParams();
      const ID_ALL = '0';

      if (keywords !== undefined && keywords.length > 0) {
        const queryParamsKeywords = keywords.join(',');
        queryParams.append('keywords', queryParamsKeywords);
      }

      // ------------------------------------------
      // domainIds, resourceTypeIds, audienceIds added to try to guarantee advanced search without selected keywords (only with filters)
      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: string) => {
          queryParams.append('skill_domain', domainId);
        });
      }

      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: string) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: string) => {
          queryParams.append('coverage', audienceId);
        });
      }
      if (operator !== undefined) {
        queryParams.append('operator', operator);
      }
      concepts?.forEach((conceptId: string) => {
        queryParams.append('concepts', conceptId);
      });

      // ------------------------------------------
      // These API returns the list of concepts involved in the filtered queryset.
      // They use the same sintax of '/api/free-search/oers/?'
      // '/api/no_pagination/free-search/oer-concepts/? '
      // '/api/free-search/oer-concepts/?'

      // At the moment we use the API without pagination, beacuse we want to retrieve all the concepts involved in the filtered queryset, not only the first 10 concepts.

      const apiUrl = `https://encore-db.grial.eu/api/no_pagination/free-search/oer-concepts/?${queryParams}`;
      const resp = await axiosNoCookie.get(apiUrl);

      return resp.data?.data || [];
    } catch (error) {
      throw error;
    }
  }

  // =====================================================
  // API ENCORE

  // ----------------------- Keywords -----------------------

  // TODO: move this api to Server side
  // API to save keyword used by the user in the search bar
  async saveKeyword(keyword: string) {
    try {
      const resp = await axiosNoCookie.post(
        'https://encore-api.polyglot-edu.com/api/saveKeyword',
        {
          keyword: keyword,
        }
      );
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }

  // API to retrieve all keywords saved in the database
  async getAllKeywords(): Promise<string[]> {
    try {
      const apiUrl = 'https://encore-api.polyglot-edu.com/api/getAllKeywords';
      const resp = await axiosNoCookie.get(apiUrl);

      return resp.data?.keywords || [];
    } catch (error) {
      throw error;
    }
  }

  // TODO: move this api to Server side
  // API to delete all keywords saved in the database
  async deleteAllKeywords() {
    try {
      const resp = await axiosNoCookie.post(
        'https://encore-api.polyglot-edu.com/api/deleteAllKeywords'
      );

      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  }

  // ----------------------- OERs -----------------------

  // TODO: move this api to Server side
  // API to save OER saved by users in a collection
  // we could save a OER multiple times: this allows us to count how many times a OER has been saved
  async saveOER(idOER: number, title: string, description: string) {
    try {
      const resp = await axiosNoCookie.post(
        'https://encore-api.polyglot-edu.com/api/saveOER',
        {
          id: idOER.toString(),
          title: title,
          description: description,
        }
      );

      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  // API to update the count of an OER by its ID. If the count reaches 0, the OER is removed from the database.
  async updateCount(idOER: number) {
    try {
      const resp = await axiosNoCookie.put(
        `https://encore-api.polyglot-edu.com/api/updateCount/${idOER}`
      );
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  // API to retrieve all saved OERs from the database.
  async getAllOERs(): Promise<OersDBProps[]> {
    try {
      const apiUrl = 'https://encore-api.polyglot-edu.com/api/getAllOERs';
      const resp = await axiosNoCookie.get(apiUrl);

      //const oers = resp.data?.oers?.forEach((oer: any) => Number(oer.id)) || [];

      return resp.data?.oers || [];
    } catch (error) {
      throw error;
    }
  }

  // API to retrieve OERs with the maximum count from the database.
  async getMaxCountOERs(): Promise<OersDBProps[]> {
    try {
      const apiUrl = 'https://encore-api.polyglot-edu.com/api/getMaxCountOERs';
      const resp = await axiosNoCookie.get(apiUrl);

      const oers = resp.data?.oers || [];

      return oers;
    } catch (error) {
      throw error;
    }
  }

  // API to retrieve the count of an OER by its ID.
  async getCount(idOER: number): Promise<number> {
    try {
      const apiUrl = `https://encore-api.polyglot-edu.com/api/getCount/${idOER}`;
      const resp = await axiosNoCookie.get(apiUrl);

      // if (resp.status === 404 || resp.status === 500) {
      //   const count = 0;
      //   return count;
      // }

      const count = resp.data?.count;

      return count;
    } catch (error) {
      console.log('error in getCount: ' + error);
      return 0;
    }
  }

  // TODO: move this api to Server side
  // API to increment the like count of an OER by its ID.
  async setLikeOER(idOER: number) {
    try {
      const resp = await axiosNoCookie.post(
        `https://encore-api.polyglot-edu.com/api/likeOER/${idOER.toString()}`
      );
      console.log(resp?.data);
    } catch (error) {
      console.error(error);
    }
  }

  // API to reduce the likes count of an OER by one.
  async reduceLikeOER(idOER: number) {
    try {
      const resp = await axiosNoCookie.put(
        `https://encore-api.polyglot-edu.com/api/reduceLike/${idOER}`
      );
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  // API to retrieve the likes count of an OER by its ID.
  async getLikes(idOER: number): Promise<number> {
    try {
      const apiUrl = `https://encore-api.polyglot-edu.com/api/getLikes/${idOER}`;
      const resp = await axiosNoCookie.get(apiUrl);

      const likes = resp.data?.likes ?? 0;

      return likes;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // ----------------------- Learning Scenario -----------------------

  // TODO: move this api to Server side
  // API to save a learning scenario to the database
  async saveLearningScenario(
    // objectiveId: number,
    experienced: string,
    educationContext: string,
    dimension: string,
    learnerExperience: string,
    nameBloomLevel: string,
    verbsBloomLevel: string[],
    skills: number[],
    learningContext: string,
    textLearningObjective: string
    //nodes?: any[],
    //edges?: any[]
  ): Promise<LearningScenarioProps | undefined> {
    try {
      const resp = await axiosNoCookie.post(
        'https://encore-api.polyglot-edu.com/api/saveLearningScenario',
        {
          Context: {
            EducatorExperience: experienced,
            EducationContext: educationContext,
            Dimension: dimension,
            LearnerExperience: learnerExperience,
          },
          Objective: {
            //id: objectiveId,
            BloomLevel: {
              name: nameBloomLevel,
              verbs: verbsBloomLevel,
            },
            Skills: skills,
            LearningContext: learningContext,
            textLearningObjective: textLearningObjective,
          },
          Path: {
            Nodes: [],
            Edges: [],
          },
        }
      );

      console.log(resp.data);
      return resp?.data?.learningScenario;
    } catch (error) {
      console.error(error);
    }
  }

  // TODO: move this api to Server side
  // API to update the learning objective of a learning scenario in the database
  async updateLearningScenario(
    idLearningScenario: string,
    nameBloomLevel: string,
    verbsBloomLevel: string[],
    skills: number[],
    learningContext: string,
    textLearningObjective: string
  ) {
    try {
      const resp = await axiosNoCookie.put(
        `https://encore-api.polyglot-edu.com/api/updateLearningObjective/${idLearningScenario}`,
        {
          BloomLevel: {
            name: nameBloomLevel,
            verbs: verbsBloomLevel,
          },
          Skills: skills,
          LearningContext: learningContext,
          textLearningObjective: textLearningObjective,
        }
      );

      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }

  // API to retrieve all learning scenarios from the database
  async getAllLearningScenarios(): Promise<LearningScenarioProps[]> {
    try {
      const resp = await axiosNoCookie.get(
        'https://encore-api.polyglot-edu.com/api/getAllLearningScenarios'
      );

      console.log(resp.data);
      return resp.data?.learningScenarios || [];
    } catch (error) {
      throw error;
    }
  }
}
