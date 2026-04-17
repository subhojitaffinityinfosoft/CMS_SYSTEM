import React from 'react'
import { Select } from '@mantine/core'
const MNSelectComponent = ({dataSource,withAsterik,form,label,formKey,defaultValue,size,isDisabled}) => {    
  return (
          <Select
                size={size}
                searchable
                nothingFoundMessage="Nothing found..."
                checkIconPosition="right"
                clearable
                disabled={isDisabled}
                withAsterisk={withAsterik}
                defaultValue={defaultValue}
                key={form?.key(`${formKey}`)}
                label={label}
                onChange={form.onChange}
                onBlur={form.onBlur}
                placeholder={label ? `Select ${label}` : '--select--'}
                data={dataSource}
                {...form?.getInputProps(`${formKey}`)}
            /> 
  )
}

export default MNSelectComponent