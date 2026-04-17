import { NumberInput } from '@mantine/core'
import React from 'react'

const MNNumberInputComponent = ({withAsterik,form,label,formKey,type,minLength,maxLength,hideControls,size,isDisabled}) => {
  return (
          <NumberInput
          minLength={minLength}
          maxLength={maxLength}
          withAsterisk={withAsterik}
          label={label}
          hideControls={hideControls}
          onBlur={form.onBlur}
          onChange={form.onChange}
          placeholder={`Enter ${label}`}
          key={form.key(formKey)}
          {...form.getInputProps(formKey)}
          size={size}
          disabled={isDisabled}
      />  
  )
}

export default MNNumberInputComponent