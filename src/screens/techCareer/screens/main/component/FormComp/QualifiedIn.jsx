import { NumberInput, SegmentedControl } from '@mantine/core'
import React from 'react'

const QualifiedInComponent = ({ form,isDisabled=false }) => {
    return (
        <div className='rounded-sm px-5 py-5'>
            <div className='grid grid-cols-12 gap-x-20 gap-y-5 '>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>Gate Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.gateQualified', e)}
                                key={form.key('qualifiedexams.gateQualified')}
                                {...form.getInputProps('qualifiedexams.gateQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                             <h5 className='font-PoppinsMedium text-[13px]'>Gate Qualified Year</h5>
                            <NumberInput
                                disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                // label="Gate Qualified Year"
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.gateYear')}
                                {...form.getInputProps('qualifiedexams.gateYear')}
                            />
                        </div>
                         <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>UGC Net Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.ugcnetQualified', e)}
                                key={form.key('qualifiedexams.ugcnetQualified')}
                                {...form.getInputProps('qualifiedexams.ugcnetQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                         <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>UGC Net Year</h5>
                            <NumberInput disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                label=""
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.ugcnetYear')}
                                {...form.getInputProps('qualifiedexams.ugcnetYear')}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>UGC JRF Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.ugcjrfQualified', e)}
                                key={form.key('qualifiedexams.ugcjrfQualified')}
                                {...form.getInputProps('qualifiedexams.ugcjrfQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                              <h5 className='font-PoppinsMedium text-[13px]'>UGC JRF Year</h5>
                            <NumberInput disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                label=""
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.ugcjrfYear')}
                                {...form.getInputProps('qualifiedexams.ugcjrfYear')}
                            />

                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>URC CSIR Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.ugccsirQualified', e)}
                                key={form.key('qualifiedexams.ugccsirQualified')}
                                {...form.getInputProps('qualifiedexams.ugccsirQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                             <h5 className='font-PoppinsMedium text-[13px]'>URC CSIR Qualified Year</h5>
                            <NumberInput disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                label=""
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.ugccsirYear')}
                                {...form.getInputProps('qualifiedexams.ugccsirYear')}
                            />

                        </div>  
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>ICMR Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.icmrQualified', e)}
                                key={form.key('qualifiedexams.icmrQualified')}
                                {...form.getInputProps('qualifiedexams.icmrQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>ICMR Qualified Year</h5>
                            <NumberInput disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                label=""
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.icmrYear')}
                                {...form.getInputProps('qualifiedexams.icmrYear')}
                            />

                        </div>   
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>ICAR Qualified</h5>
                            <SegmentedControl disabled={isDisabled}
                                onChange={(e) => form.setFieldValue('qualifiedexams.icarQualified', e)}
                                key={form.key('qualifiedexams.icarQualified')}
                                {...form.getInputProps('qualifiedexams.icarQualified')}
                                data={[
                                    { label: 'Yes', value: 'Y' },
                                    { label: 'No', value: 'N' },
                                ]}
                            />
                        </div>
                        <div className='col-span-12 md:col-span-6 flex items-center justify-between'>
                            <h5 className='font-PoppinsMedium text-[13px]'>ICAR Qualified Year</h5>
                            <NumberInput disabled={isDisabled}
                                hideControls
                                minLength={4}
                                maxLength={4}
                                label=""
                                placeholder="Enter Year"
                                key={form.key('qualifiedexams.icarYear')}
                                {...form.getInputProps('qualifiedexams.icarYear')}
                            />

                        </div> 
            </div>
        </div>
    )
}

export default QualifiedInComponent
