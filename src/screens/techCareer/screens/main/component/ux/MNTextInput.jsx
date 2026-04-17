import React from 'react'
import { TextInput } from '@mantine/core'
const MNTextInputComponent = ({withAsterik,form,label,formKey,type,minLength,maxLength,isDisabled,size}) => {
  return (
          <TextInput
                    type={type ? type : 'text'}
                    withAsterisk={withAsterik}
                    label={label}
                    size={size}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={label ? `Enter ${label}` : ''}
                    key={form.key(formKey)}
                    {...form.getInputProps(formKey)}
                    disabled={isDisabled}
                    className=' disabled:text-card-foreground'
          />
  )
}

export default MNTextInputComponent