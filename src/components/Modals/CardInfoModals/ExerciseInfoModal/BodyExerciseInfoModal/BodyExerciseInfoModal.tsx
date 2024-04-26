import { Flex, ModalBody, Text } from '@chakra-ui/react';
import { ExerciseInfoModalProps } from '../../../../../types/encoreElements';
import BodyFillGaps from './BodyFillGaps';
import BodyQuizOrQuestion from './BodyQuizOrQuestion';

// interface BodyExerciseInfoModalProps extends ExerciseInfoModalProps {}

export default function BodyExerciseInfoModal({
  fill_template,
  fill_template_with_gaps,
  n_o_w,
  n_o_d,
  options,
  question,
  question_response,
  n_o_ed,
  n_o_ca,
  type_of_question,
  type_of_exercise,
  category,
  coverage,
  source,
  language,
}: ExerciseInfoModalProps) {
  return (
    <ModalBody>
      {/* Fill the Gaps exercise */}
      {fill_template && fill_template_with_gaps && (
        <BodyFillGaps
          fill_template={fill_template}
          fill_template_with_gaps={fill_template_with_gaps}
          n_o_w={n_o_w}
          n_o_d={n_o_d}
          options={options}
        />
      )}
      {/* Quiz exercise or Open Question exercise */}
      {question && question_response && (
        <BodyQuizOrQuestion
          question={question}
          question_response={question_response}
          options={options}
          n_o_d={n_o_d}
          n_o_ed={n_o_ed}
          n_o_ca={n_o_ca}
          type_of_question={type_of_question}
          type_of_exercise={type_of_exercise}
          category={category}
        />
      )}
      {coverage && coverage.length > 0 && (
        <Flex justifyContent={'left'} pb="5" direction={'column'}>
          <Text variant="label_drawer">Disciplinary field</Text>
          <Text> {coverage.join(', ')}</Text>
        </Flex>
      )}
      {source && (
        <Flex justifyContent={'left'} pb="5" direction={'column'}>
          <Text variant="label_drawer">Source</Text>
          <Text>{source}</Text>
        </Flex>
      )}
      {language && (
        <Flex justifyContent={'left'} pb="5" direction={'column'}>
          <Text variant="label_drawer">Language</Text>
          <Text>{language}</Text>
        </Flex>
      )}
    </ModalBody>
  );
}
