export enum TypeOfActivityEnum {
  Open = 0,
  short_answer_question = 1,
  true_or_false = 2,
  fill_in_the_blanks = 3, // information_search
  single_choice = 4, // multiple_choice
  multiple_choice = 5, // multiple_select
  essay = 6,
  knowledge_exposition = 7,

  debate = 8,
  brainstorming = 9,
  group_discussion = 10,
  simulation = 11,
  inquiry_based_learning = 12,

  non_written_material_analysis = 13,
  non_written_material_production = 14,
  case_study_analysis = 15,
  project_based_learning = 16,
  problem_solving_activity = 17,
}

// The list of activities that are used in this API is the complete TypeOfExercise enum:
// 'open_question' (open question exercise that expects a free-form elaborated answer),
// 'short_answer_question' (open question exercise that expects a short exact answer),
// 'true_or_false' (true or false question, it may or may not require an explanation),
// 'information_search' (fill in the blanks exercise),
// 'multiple_choice' (multiple choice question with one correct answer),
// 'multiple_select' (multiple choice question with multiple correct answers),
// 'essay' (open ended assignment that expects a full essay as answer),
// 'knoledge_exposition' (presentation or dissertation of a specific topic),

// 'debate' (oral debate between groups of students),
// 'brainstorming' (group activity to generate ideas or solutions about a specifc topic),
// 'group_discussion' (group activity to discuss a specific topic),
// 'simulation' (role-playing activity to simulate a situation about a specific topic),
// 'inquiry_based_learning' (activity where students explore a topic through inquiry and research),

// 'non_written_material_analysis' (analysis of non-written material such as images, videos, or audio),
// 'non_written_material_production' (production of non-written material such as images, videos, or audio),
// 'case_study_analysis' (analysis of a specific case study),
// 'project_based_learning' (activity where students work on a project to develope a real-world project),
// 'problem_solving_activity' (activity where students solve a specific problem)
