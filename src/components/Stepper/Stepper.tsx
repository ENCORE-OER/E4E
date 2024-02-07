//import { Link } from 'react-router-dom';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react';

const steps = [
  {
    title: 'Educational Scenario',
    description: 'Descrive your educational scenario',
    path: '/plan/index',
  },
  {
    title: 'Learning Objective',
    description: 'Identify the learning objective',
    path: '/plan/LearningObjective',
  },
  {
    title: 'Learning Path',
    description: 'Design the learning path',
    path: '/plan/pathDesign',
  },
];

type LearningStepperProps = {
  activeStep: number;
  isSmallerScreen?: boolean;
};

function LearningStepper({
  activeStep,
  isSmallerScreen,
}: LearningStepperProps) {
  return (
    <Stepper
      minH={isSmallerScreen ? '220px' : '0px'}
      size="lg"
      colorScheme="yellow"
      index={activeStep}
      orientation={isSmallerScreen ? 'vertical' : 'horizontal'}
      gap="2"
    >
      {steps.map((step, index) => (
        <Step key={index} style={{ overflow: 'hidden' }}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          {/* <Box flexShrink="0">
            <Link to={index <= activeStep ? step.path : "/"} style={{ textDecoration: 'none', color: 'inherit' }}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Link>
          </Box> */}

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default LearningStepper;
