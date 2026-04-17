import { em, Stepper } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import classes from '../stepper.module.css';
const MStepperComp = ({stepperLists,active,setActive,orientation}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)
  return (
    <Stepper classNames={classes} active={active} onStepClick={setActive} 
    orientation={!isMobile ? orientation : 'horizontal'} size='xs' color='red' breakpoint="xs">
        {
            stepperLists.map((el,index) => {
                return    <Stepper.Step label={el.label} key={el.id}
                description={el.description} 
                allowStepSelect={active > (index + 1)}>
                </Stepper.Step>
            })
        }
     </Stepper>
  )
}

export default MStepperComp

