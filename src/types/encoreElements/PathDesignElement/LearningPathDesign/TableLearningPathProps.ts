export interface TableLearningPathProps {
  titles: string[]; // title of the columns
  data: {
    number: number;
    type: JSX.Element;
    activity: string;
    time: string;
    description: string;
    content: JSX.Element;
    action: JSX.Element;
  }[];
}
