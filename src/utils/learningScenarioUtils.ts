import axios from 'axios';
import {
  ArrayProps,
  LessonProps,
  ObjectLearningObjectiveProps,
  OerInCollectionProps,
  Option,
  SkillItemProps,
  UploadedFilesProps,
} from '../types/encoreElements';

// const {
//   idLearningScenario,
//   selectedEducatorExperience,
//   selectedContext,
//   selectedGroupDimension,
//   selectedLearnerExperience,
//   bloomLevels,
//   bloomLevelIndex,
//   selectedSkillConceptTags,
//   learningTextContext,
//   selectedOptions, // verbsBloomLevel
//   lessonActivities,
//   macroSubject,
//   titleLearningPath,
//   learningObjectiveObjects,
//   handleIdLearningScenario,
// } = useLearningPathDesignContext();

interface OERBodyParam {
  id_oer: number;
  title: string;
}

interface FileBodyParam {
  name: string;
  file: string;
}

interface LessonPlanContent {
  OERs: OERBodyParam[];
  Files: FileBodyParam[];
}

interface LessonPlan {
  ActivityTitle: string;
  TypeOfAssignment: string;
  TypeOfActivity: string;
  Time: number;
  Description: string;
  Topic: string;
  Content: LessonPlanContent;
  Compulsory: boolean;
  Conditions: {
    Pass: string[];
    Fail: string[];
  };
}

interface Graph {
  Nodes: any[];
  Edges: any[];
}

interface BodyParams {
  Context: {
    EducatorExperience: string;
    EducationContext: string;
    Dimension: string;
    LearnerExperience: string;
  };
  Objective: {
    BloomLevel: {
      name: string;
      verbs: string[];
    };
    SkillsConcepts: number[];
    LearningContext: string;
    TextLearningObjectives: string[];
  };
  Path: {
    TitleLearningPath: string;
    MacroSubject: string;
    LessonPlan: LessonPlan[];
    Graph: Graph;
  };
}

// Convert a File in a base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertFilesToBase64 = async (files: UploadedFilesProps[]) => {
  return await Promise.all(
    files.map(async (file: UploadedFilesProps) => ({
      name: file.fileName ?? file.fileUploaded.name ?? '',
      file: await fileToBase64(file.fileUploaded),
    }))
  );
};

export const createLessonPlans = async (lessonActivities: LessonProps[]) => {
  const lessonPlans: LessonPlan[] = await Promise.all(
    lessonActivities.map(async (activity: LessonProps) => {
      const files = await convertFilesToBase64(activity.content.uploadedFiles);

      return {
        ActivityTitle: activity.activityTitle ?? '',
        TypeOfAssignment: activity.lessonType ?? '',
        TypeOfActivity: activity.activityType ?? '',
        Time: activity.timeDuration ?? 0,
        Description: activity.activityDescription ?? '',
        Topic: activity.topic ?? '',
        Content: {
          OERs:
            activity.content.oers.map((oer: OerInCollectionProps) => ({
              id_oer: oer.id,
              title: oer.title,
            })) ?? [],
          Files: files,
        },
        Compulsory: activity.compulsory ?? true,
        Conditions: {
          Pass: [],
          Fail: [],
        },
      };
    })
  );

  return lessonPlans;
};

export const createBodyParams = async (
  educatorExperience: string,
  educationContext: string,
  dimension: string,
  learnerExperience: string,
  nameBloomLevel: string,
  verbsBloomLevel: string[],
  skillsConcepts: number[],
  learningContext: string,
  textLearningObjectives: string[],
  titleLearningPath: string,
  macroSubject: string,
  lessonActivities: LessonProps[],
  graphNodes: any[],
  graphEdges: any[]
) => {
  const lessonPlans = await createLessonPlans(lessonActivities);

  const bodyParams: BodyParams = {
    Context: {
      EducatorExperience: educatorExperience,
      EducationContext: educationContext,
      Dimension: dimension,
      LearnerExperience: learnerExperience,
    },
    Objective: {
      BloomLevel: {
        name: nameBloomLevel,
        verbs: verbsBloomLevel,
      },
      SkillsConcepts: skillsConcepts,
      LearningContext: learningContext,
      TextLearningObjectives: textLearningObjectives,
    },
    Path: {
      TitleLearningPath: titleLearningPath,
      MacroSubject: macroSubject,
      LessonPlan: lessonPlans,
      Graph: {
        Nodes: graphNodes,
        Edges: graphEdges,
      },
    },
  };

  return bodyParams;
};

// TODO: Should be a good choise update or save even if one does not click "Save" before changing tab or page? A good idead shoud be to show a message before?
// Save learningScenario on the DB
export const saveUpdateLearningScenario = async (
  idScenario: string,
  educatorExperience: string,
  educationContext: string,
  dimension: string,
  learnerExperience: string,
  nameBloomLevel: string,
  verbsBloomLevel: string[],
  skillsConcepts: number[],
  learningContext: string,
  textLearningObjectives: string[],
  title_learning_path: string,
  macroSubject: string,
  lessonActivities: LessonProps[],
  graphNodes: any[],
  graphEdges: any[],
  handleIdLearningScenario: (id: string) => void
): Promise<void> => {
  // Create body for the API call
  const bodyParams = await createBodyParams(
    educatorExperience,
    educationContext,
    dimension,
    learnerExperience,
    nameBloomLevel,
    verbsBloomLevel,
    skillsConcepts,
    learningContext,
    textLearningObjectives,
    title_learning_path,
    macroSubject,
    lessonActivities,
    graphNodes,
    graphEdges
  );

  // Save for the first time this learning path
  if (idScenario === '') {
    console.log('SAVING ON DB...');
    const url = '../api/encore/learningScenario/saveLearningPath';

    try {
      const resp = await axios.post(url, bodyParams);
      console.log('ID LEARNING PATH: ', resp?.data?._id);
      handleIdLearningScenario(resp?.data?._id ?? '');
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('UPDATING ON DB...');

    const url = `../api/encore/learningScenario/updateLearningScenario/${idScenario}`;

    try {
      const resp = await axios.put(url, bodyParams);
      console.log(resp?.data);
    } catch (error) {
      console.error(error);
    }
  }
};

export const handleSaveLearningScenarioClick = async (
  idLearningScenario: string,
  selectedEducatorExperience: Option | null,
  selectedContext: Option | null,
  selectedGroupDimension: Option | null,
  selectedLearnerExperience: Option | null,
  bloomLevels: ArrayProps[],
  bloomLevelIndex: number,
  selectedOptions: string[], // verbsBloomLevel
  selectedSkillConceptTags: SkillItemProps[],
  learningTextContext: string,
  learningObjectiveObjects: ObjectLearningObjectiveProps[],
  titleLearningPath: string,
  macroSubject: string,
  lessonActivities: LessonProps[],
  handleIdLearningScenario: (id: string) => void
) => {
  console.log('BUTTON SAVE CLICKED.');
  try {
    await saveUpdateLearningScenario(
      idLearningScenario ?? '',
      selectedEducatorExperience?.title ?? '',
      selectedContext?.title ?? '',
      selectedGroupDimension?.title ?? '',
      selectedLearnerExperience?.title ?? '',
      bloomLevels[bloomLevelIndex]?.name ?? '',
      selectedOptions ?? [], // verbsBloomLevel
      selectedSkillConceptTags.map((item: SkillItemProps) => item.id) ?? [],
      learningTextContext ?? '',
      learningObjectiveObjects.map(
        (lo: ObjectLearningObjectiveProps) => lo.learningObjective
      ) ?? [],
      titleLearningPath ?? '',
      macroSubject ?? '',
      lessonActivities ?? [],
      [],
      [],
      handleIdLearningScenario
    );
  } catch (error) {
    console.error(error);
  }
};
