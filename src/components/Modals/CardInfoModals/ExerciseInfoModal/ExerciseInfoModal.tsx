import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { ExerciseInfoModalProps } from '../../../../types/encoreElements';
import BodyExerciseInfoModal from './BodyExerciseInfoModal/BodyExerciseInfoModal';
import HeaderExerciseInfoModal from './HeaderExerciseInfoModal';

export default function ExerciseInfoModal({
  isOpen,
  onClose,
  title,
  authors,
  coverage,
  fill_template,
  fill_template_with_gaps,
  options,
  question,
  question_response,
  n_o_w,
  n_o_d,
  n_o_ed,
  n_o_ca,
  source,
  language,
  type_of_exercise,
  type_of_question,
  category,
  showTagDigital,
  showTagEntrepreneurial,
  showTagGreen,
  isGeneratedByAI,
  collectionsColor,
  assessment_oer_type,
}: ExerciseInfoModalProps) {
  return (
    <Flex>
      <Modal
        isOpen={isOpen ? isOpen : false}
        onClose={
          onClose ||
          (() => {
            return;
          })
        }
        closeOnOverlayClick={true}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent overflow="auto">
          <ModalCloseButton />
          <HeaderExerciseInfoModal
            showTagDigital={showTagDigital}
            showTagEntrepreneurial={showTagEntrepreneurial}
            showTagGreen={showTagGreen}
            isGeneratedByAI={isGeneratedByAI}
            collectionsColor={collectionsColor}
            title={title}
            authors={authors}
            assessment_oer_type={assessment_oer_type}
          />
          <BodyExerciseInfoModal
            fill_template={fill_template}
            fill_template_with_gaps={fill_template_with_gaps}
            n_o_w={n_o_w}
            n_o_d={n_o_d}
            options={options}
            question={question}
            question_response={question_response}
            n_o_ed={n_o_ed}
            n_o_ca={n_o_ca}
            type_of_question={type_of_question}
            type_of_exercise={type_of_exercise}
            category={category}
            coverage={coverage}
            source={source}
            language={language}
          />
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
