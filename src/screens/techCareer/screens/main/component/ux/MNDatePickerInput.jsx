import React from 'react'
import { DateInput } from '@mantine/dates';
const MNDatePickerInputComponent = ({formKey,form,label,clearable,withAsterisk,size,isDisabled}) => {
  // console.log(withAsterisk);
  return (
          <DateInput
                    withAsterisk={withAsterisk ? withAsterisk : false}
                    size={size} 
                    clearable={clearable}
                    valueFormat="DD/MM/YYYY"
                    label={label}
                    disabled={isDisabled}
                    placeholder={`Enter ${label}`}
                    key={form.key(formKey)}
                    {...form.getInputProps(formKey)}
      />
  )
}

export default MNDatePickerInputComponent