import { SegmentedControl } from '@mantine/core';
import React from 'react'

const MNSegmentControlComponent = ({dataSource,formKey,form,isDisabled=false}) => {
  return (
          <SegmentedControl disabled={isDisabled}
                    fullWidth size='xs'
                    onChange={(e) => form.setFieldValue(formKey, e)}
                    key={form.key(formKey)}
                    {...form.getInputProps(formKey)}
                    data={dataSource}
      />
  )
}

export default MNSegmentControlComponent;