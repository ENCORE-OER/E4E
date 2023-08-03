import axiosCreate, { AxiosInstance, AxiosResponse } from 'axios';
import { EncoreConceptMap } from '../types/encore';

const axios = axiosCreate.create({
  baseURL: process.env.BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const axiosNoCookie = axiosCreate.create({
  baseURL: process.env.BACK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class APIV2 {
  axios: AxiosInstance;
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

  async getSkills(page = 1, allSkills: any[] = []): Promise<any[]> {
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
  async getSkillsByText(skill_text: string): Promise<any> {
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
    allSkills: any[] = []
  ): Promise<any[]> {
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

  async getConceptMapOersNLP(
    oers_ids: any[]
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(
      `${process.env.POLYGLOT_URL}/api/concepts/genGraphOers`,
      {
        oers_ids: oers_ids,
      }
    );
  }

  async getConceptMapOers(
    filteredOers: any
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(
      `${process.env.POLYGLOT_URL}/api/concepts/genGraphExt`,
      {
        oers: filteredOers,
      }
    );
  }

  async getConceptMapSkill(
    skill: string
  ): Promise<AxiosResponse<EncoreConceptMap>> {
    return this.axios.post(
      `${process.env.POLYGLOT_URL}/api/concepts/genGraphSkill`,
      {
        skill: skill,
      }
    );
  }

  async getAllSkills(): Promise<any[]> {
    try {
      return await this.getSkills();
    } catch (error) {
      throw error;
    }
  }

  async getSkillsLabel(): Promise<any[]> {
    try {
      const temp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/skills/labels/`
      );

      const recordsTotal = temp.data?.recordsTotal;
      const num_pages = Math.ceil(recordsTotal / 10);
      console.log('NUM PAGES: ' + num_pages);

      let updatedSkills: any[] = [];

      for (let i = 1; i < num_pages + 1; i++) {
        const resp = await axiosNoCookie.get(
          `https://encore-db.grial.eu/api/skills/labels/?page=${i}`
        );

        const labelsPage =
          resp.data?.data?.map((skill: any) => ({
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

  async getAllSkillsLabel(): Promise<any[]> {
    try {
      const resp = await this.getSkillsLabel();

      return resp;
    } catch (error) {
      throw error;
    }
  }

  async getOERs(page = 1, allOers: any[] = [], stop = 100): Promise<any[]> {
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

  async getOerById(id_oer: any): Promise<any> {
    try {
      const resp = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/oers/?id=${id_oer}`
      );

      /*const oer = resp.data?.data.map((item: any) => item);
      return oer;*/

      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  //API to retrieve the resources with multiple skills in AND
  //https://encore-db.grial.eu/api/boolean/oers/?and_skills=23304&and_skills=22529

  async getOersInAND(oers: string[]): Promise<any> {
    try {
      const transformedParams = oers.map((id) => `and_skills=${id}`).join('&');
      const apiUrl = `https://encore-db.grial.eu/api/boolean/oers/?${transformedParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  async getOersInOR(oers: string[]): Promise<any> {
    try {
      const transformedParams = oers.map((id) => `or_skills=${id}`).join('&');
      const apiUrl = `https://encore-db.grial.eu/api/boolean/oers/?${transformedParams}`;
      const resp = await axiosNoCookie.get(apiUrl);
      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }

  //API to retrieve the resources with multiple skills in OR
  //https://encore-db.grial.eu/api/boolean/oers/?or_skills=23304&or_skills=22529

  async getDigitalOer(): Promise<any> {
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

  async getOer(): Promise<any> {
    try {
      const resp_oer = await axios.get('http://localhost:3000/api/encore/oer');

      const oer = resp_oer.data;

      return oer;
    } catch (error) {
      throw error;
    }
  }

  async getOerDescription(): Promise<any> {
    try {
      const resp_oer = await axios.get('http://localhost:3000/api/encore/oer');

      const description = resp_oer.data?.description;

      return description;
    } catch (error) {
      throw error;
    }
  }

  

  async getMetrics(): Promise<any[]> {
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
    allDomains: any[] = [],
    stop = 10
  ): Promise<any[]> {
    try {
      const resp_dom = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/domains/?page=${page}`
      );

      const domainsPage =
        resp_dom.data?.data?.map((domain: any) => ({
          id: domain.id,
          name: domain.name,
        })) || [];
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
    allSubjects: any[] = [],
    stop = 10
  ): Promise<any[]> {
    try {
      const resp_sub = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/subjects/?page=${page}`
      );

      const subjectsPage =
        resp_sub.data?.data?.map((subject: any) => ({
          id: subject.id,
          name: subject.name,
        })) || [];
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
    allTypes: any[] = [],
    stop = 10
  ): Promise<any[]> {
    try {
      const resp_ResTypes = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/types/?page=${page}`
      );

      const resTypesPage =
        resp_ResTypes.data?.data?.map((resType: any) => ({
          id: resType.id,
          name: resType.name,
        })) || [];
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

  async getAudience(
    page = 1,
    allAudience: any[] = [],
    stop = 10
  ): Promise<any[]> {
    try {
      const resp_aud = await axiosNoCookie.get(
        `https://encore-db.grial.eu/api/coverage/?page=${page}`
      );

      const audiencePage =
        resp_aud.data?.data?.map((audience: any) => ({
          id: audience.id,
          name: audience.name,
        })) || [];
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

  async searhOERbySkillNoPages(skillIds: any[]): Promise<any[]> {
    try {
      const queryParams = new URLSearchParams();

      skillIds?.forEach((skillId: any) => {
        queryParams.append('skills', skillId);
      });

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

  async searchOers(
    //page = 1,fn
    skillIds: any[],
    domainIds: any[],
    subjectIds: any[],
    resourceTypeIds: any[],
    audienceIds: any[]

    // Implement oer[] type
  ): Promise<any[]> {
    const ID_ALL = 0;

    try {
      const queryParams = new URLSearchParams();

      skillIds?.forEach((skillId: any) => {
        queryParams.append('skills', skillId);
      });

      // LOGIC: if the 'All' checkbox is checked we don't consider it in the URL

      if (!domainIds?.includes(ID_ALL)) {
        domainIds?.forEach((domainId: any) => {
          queryParams.append('skill_domain', domainId);
        });
      }
      if (!subjectIds?.includes(ID_ALL)) {
        subjectIds?.forEach((subjectId: any) => {
          queryParams.append('subject', subjectId);
        });
      }
      if (!resourceTypeIds?.includes(ID_ALL)) {
        resourceTypeIds?.forEach((resourceTypeId: any) => {
          queryParams.append('media_type', resourceTypeId);
        });
      }
      if (!audienceIds?.includes(ID_ALL)) {
        audienceIds?.forEach((audienceId: any) => {
          queryParams.append('coverage', audienceId);
        });
      }

      const url = `https://encore-db.grial.eu/api/oers/?${queryParams}`;
      alert('url to search OERS: ' + url);

      const resp = await axiosNoCookie.get(url);

      return resp.data?.data;
    } catch (error) {
      throw error;
    }
  }
}
