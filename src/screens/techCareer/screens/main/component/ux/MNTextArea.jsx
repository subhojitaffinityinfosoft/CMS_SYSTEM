
import { Textarea } from '@mantine/core'
import React from 'react'
const MNTextAreaComponent = ({formKey,form,label,withAsterisk,size}) => {
  return (
    <Textarea
        size={size}
        radius="xs"
        label={label}
        withAsterisk={withAsterisk}
        placeholder={`Enter ${label}`}
        key={form.key(formKey)}
        {...form.getInputProps(formKey)}
        />

  )
}

export default MNTextAreaComponent