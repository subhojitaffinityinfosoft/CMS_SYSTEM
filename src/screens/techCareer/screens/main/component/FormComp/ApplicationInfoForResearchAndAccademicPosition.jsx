import { SegmentedControl, Select } from '@mantine/core'
import React from 'react'

const ApplicationInfoForResearchAndAccademicPositionComponent = ({ form,md_position,md_area }) => {
    return (
        <div className='container mx-auto  p-5'>
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-4'>
                    <Select
                        searchable
                        nothingFoundMessage="Nothing found..."
                        checkIconPosition="right"
                        withAsterisk
                        key={form.key('applicationInformation.positionId')}
                        label="Position"
                        placeholder="Select Position"
                        data={md_position?.map(el => {return {value:el.positionId.toString(),label:el.positionName}})}
                        {...form.getInputProps('applicationInformation.positionId')}
                    />
                </div>
                <div className='col-span-4'>
                    <Select
                         searchable
                         nothingFoundMessage="Nothing found..."
                         checkIconPosition="right"
                         withAsterisk
                        key={form.key('applicationInformation.subjectOrAreaOrInstitueId')}
                        label="Subject Or (Area/Institute)"
                        placeholder="Select Subject Or (Area/Institute)"
                        data={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                        {...form.getInputProps('applicationInformation.subjectOrAreaOrInstitueId')}
                    />
                </div>
                <div className='col-span-4'>
                    <h5 className='font-medium text-[14px]'>Nature Of Job<span className='text-red-600'>*</span></h5>
                    <SegmentedControl
                        
                        onChange={(e) => form.setFieldValue('applicationInformation.natureOfJobId', e)}
                        key={form.key('applicationInformation.natureOfJobId')}
                        {...form.getInputProps('applicationInformation.natureOfJobId')}
                        data={[
                            { label: 'Full-Time', value: 'Full-Time' },
                            { label: 'Part-Time', value: 'Part-Time' },
                        ]}
                    />
                </div>
                <div className='col-span-4'>
                    <Select
                         searchable
                         nothingFoundMessage="Nothing found..."
                         checkIconPosition="right"
                         withAsterisk
                        key={form.key('applicationInformation.preferredLocationId_1')}
                        label="Preferred Location 1"
                        placeholder="Select Preferred Location 1"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        {...form.getInputProps('applicationInformation.preferredLocationId_1')}
                    />
                </div>
                <div className='col-span-4'>
                    <Select
                         searchable
                         nothingFoundMessage="Nothing found..."
                         checkIconPosition="right"
                         withAsterisk
                        key={form.key('applicationInformation.preferredLocationId_2')}
                        label="Preferred Location 2"
                        placeholder="Select Preferred Location 2"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        {...form.getInputProps('applicationInformation.preferredLocationId_2')}
                    />
                </div>
                <div className='col-span-4'>
                    <Select
                         searchable
                         nothingFoundMessage="Nothing found..."
                         checkIconPosition="right"
                         withAsterisk
                        key={form.key('applicationInformation.preferredLocationId_3')}
                        label="Preferred Location 3"
                        placeholder="Select Preferred Location 3"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        {...form.getInputProps('applicationInformation.preferredLocationId_3')}
                    />
                </div>
            </div>
        </div>
    )
}

export default ApplicationInfoForResearchAndAccademicPositionComponent
