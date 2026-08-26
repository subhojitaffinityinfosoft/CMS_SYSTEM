import { em, Stepper } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import classes from '../../screens/techCareer/screens/main/stepper.module.css';
import { Check, CheckCheck } from 'lucide-react';
const MStepperComp = ({stepperLists,active,setActive,orientation,setCareerStepId,errorStatus,stepId,preference}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  // console.log(errorStatus);
  // console.log(preference);
  return (
    <Stepper classNames={classes} active={active} onStepClick={setActive} 
    orientation={!isMobile ? orientation : 'horizontal'} 
    size='xs' 
    color='red' 
    breakpoint="xs">
        {
            stepperLists.map((el,index) => {
                return    <Stepper.Step label={el.label} key={el.id || el.empCareerStepId}
                color='green'
                completedIcon={<Check size={19} />}
                allowStepSelect={el.label.toLowerCase().includes('completed') ? (active == (stepperLists.length - 1)) : 
                  (errorStatus ? (preference < el.preference ? false : true) : preference >= el.preference)}
                >
                </Stepper.Step>
            })
        }
     </Stepper>
  )
}

export default MStepperComp