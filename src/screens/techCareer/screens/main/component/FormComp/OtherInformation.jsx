import { ActionIcon, Divider, FileInput, NumberInput, SegmentedControl, Select, Table, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { randomId } from '@mantine/hooks'
import { Plus ,Trash } from 'lucide-react';
const OtherInformationComponent = ({form,md_campus}) => {
  return (
    <div className='p-3 rounded-sm'>
                                                    <div className='grid grid-cols-12 gap-3'>
                                                                    <div className='md:col-span-4 col-span-12'>
                                                                            <NumberInput
                                                                                label="Present / Last Drawn salary (monthly in INR)"
                                                                                hideControls
                                                                                key={form.key(`otherInformation.presentLastDrawnSalary`)}
                                                                                placeholder=""
                                                                                {...form.getInputProps(`otherInformation.presentLastDrawnSalary`)}
                                                                                /> 
                                                                    </div>
                                                                    <div className='md:col-span-4 col-span-12'>
                                                                            <NumberInput
                                                                                label="Notice period (in Days)"
                                                                                hideControls
                                                                                key={form.key(`otherInformation.noticePeriod`)}
                                                                                placeholder=""
                                                                                {...form.getInputProps(`otherInformation.noticePeriod`)}
                                                                                /> 
                                                                    </div>
                                                    </div>
                                                    <Divider my="sm" />
                                                    <div className='container mx-auto my-6 rounded-sm'>
                                                                <div className='grid grid-cols-12 gap-3'>
                                                                    <div className='md:col-span-2 col-span-12'>
                                                                    <h5 className='font-medium text-[12px] my-2'>Do You Know anyone in TechnoIndia ?</h5>
                                                                        <SegmentedControl
                                                                            onChange={(e) => form.setFieldValue('otherInformation.doYouKnowAnyoneInAmity.knowAnyone',e)}
                                                                            key={form.key('otherInformation.doYouKnowAnyoneInAmity.knowAnyone')}
                                                                            {...form.getInputProps('otherInformation.doYouKnowAnyoneInAmity.knowAnyone')}
                                                                            data={[
                                                                                { label: 'Yes', value: 'yes' },
                                                                                { label: 'No', value: 'no' },
                                                                            ]}
                                                                            />
                                                                    </div>
                                                                    <div className="md:col-span-10 col-span-12">
                                                                            <Table striped highlightOnHover withTableBorder withColumnBorders>
                                                                                <Table.Thead>
                                                                                    <Table.Tr>
                                                                                        <Table.Th colSpan={5}>
                                                                                            If Yes?
                                                                                        </Table.Th>
                                                                                    </Table.Tr>
                                                                                    <Table.Tr>
                                                                                        <Table.Th>Name</Table.Th>
                                                                                        <Table.Th>Designation</Table.Th>
                                                                                        <Table.Th>Department</Table.Th>
                                                                                        <Table.Th>Campus</Table.Th>
                                                                                        <Table.Th></Table.Th>
                                                                                    </Table.Tr>
                                                                                </Table.Thead>
                                                                                <Table.Tbody>
                                                                                            {
                                                                                                form.getValues().otherInformation.doYouKnowAnyoneInAmity.ifYes.map((item,index) =>{
                                                                                                    return <Table.Tr key={randomId()}>
                                                                                                        <Table.Td>
                                                                                                        <TextInput
                                                                                                                key={form.key(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.name`)}
                                                                                                                placeholder=""
                                                                                                                {...form.getInputProps(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.name`)}
                                                                                                            /> 
                                                                                                        </Table.Td>
                                                                                                        <Table.Td>
                                                                                                        <TextInput
                                                                                                                key={form.key(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.designation`)}
                                                                                                                placeholder=""
                                                                                                                {...form.getInputProps(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.designation`)}
                                                                                                            /> 
                                                                                                        </Table.Td>
                                                                                                        <Table.Td>
                                                                                                        <TextInput
                                                                                                                key={form.key(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.department`)}
                                                                                                                placeholder=""
                                                                                                                {...form.getInputProps(`otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.department`)}
                                                                                                            /> 
                                                                                                        </Table.Td>
                                                                                                        <Table.Td>
                                                                                                        <Select
                                                                                                            searchable
                                                                                                            nothingFoundMessage="Nothing found..."
                                                                                                            checkIconPosition="right"
                                                                                                            data={md_campus?.map(el => {return {value:el.campusId.toString(),label:el.campusName}})}
                                                                                                            key={form.key('otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.department')}
                                                                                                            placeholder="Select Campus"
                                                                                                            {...form.getInputProps('otherInformation.doYouKnowAnyoneInAmity.ifYes.${index}.department')}
                                                                                                            />
                                                                                                        </Table.Td>
                                                                                                        <Table.Td>
                                                                                                                {
                                                                                                                    index < (form.getValues().otherInformation.doYouKnowAnyoneInAmity.ifYes.length - 1) &&  <ActionIcon color="red"
                                                                                                                    onClick={() => form.removeListItem('otherInformation.doYouKnowAnyoneInAmity.ifYes', index)}>
                                                                                                                        <Trash size="1rem" />
                                                                                                                    </ActionIcon>
                                                                                                                }

                                                                                                                {
                                                                                                                    index == (form.getValues().otherInformation.doYouKnowAnyoneInAmity.ifYes.length - 1) &&  <ActionIcon size="lg"  variant='outline' 
                                                                                                                    
                                                                                                                    onClick={() =>{
                                                                                                                        form.insertListItem('otherInformation.doYouKnowAnyoneInAmity.ifYes', { 
                                                                                                                            name:'',
                                                                                                                            designation:'',
                                                                                                                            department:'',
                                                                                                                            campusId:''
                                                                                                                        })
                                                                                                                    }}
                                                                                                                    radius={'sm'}  aria-label="Has disabled styles but still interactive">
                                                                                                                            {/* <IconPlus /> */}
                                                                                                                            <Plus/>
                                                                                                                        </ActionIcon>
                                                                                                                }
                                                                                                            
                                                                                                            
                                                                                                        
                                                                                                            </Table.Td>
                                                                                                    </Table.Tr>
                                                                                                })
                                                                                            }
                                                                                    
                                                                                </Table.Tbody>
                                                                            </Table>    
                                                                    </div>
                                                                </div>    
                                                    </div>
                                                    <Divider my="sm" />
                                                    <div className='container mx-auto my-6 rounded-sm space-y-3'>
                            
                                                                <div className='grid grid-cols-12 gap-3'>
                                                                    <div className='md:col-span-4 col-span-12'>
                                                                    <h5 className='font-medium text-[12px] my-2'>Have you ever been interviewed in TechnoIndia earlier?</h5>
                                                                        <SegmentedControl
                                                                            onChange={(e) => form.setFieldValue('otherInformation.haveYouEverBeenInterviewedInAmityEarlier',e)}
                                                                            key={form.key('otherInformation.haveYouEverBeenInterviewedInAmityEarlier')}
                                                                            {...form.getInputProps('otherInformation.haveYouEverBeenInterviewedInAmityEarlier')}
                                                                            data={[
                                                                                { label: 'Yes', value: 'yes' },
                                                                                { label: 'No', value: 'no' }

                                                                            ]}
                                                                            />
                                                                    </div>
                                                                    <div className="md:col-span-6 col-span-8">
                                                                    <h5 className="font-medium text-[12px] my-2">Campus</h5>
                                                                    <Select
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        data={md_campus?.map(el => {return {value:el.campusId.toString(),label:el.campusName}})}
                                                                        label=""
                                                                        key={form.key('otherInformation.campusId')}
                                                                        placeholder="Select Campus"
                                                                        {...form.getInputProps('otherInformation.campusId')}
                                                                        />
                                                                    </div>
                                                                    <div className='md:col-span-2 col-span-4'>
                                                                        <h5 className='font-medium text-[12px] my-2'>Given offer to join?</h5>
                                                                        <SegmentedControl
                                                                            onChange={(e) => form.setFieldValue('otherInformation.givenOfferToJoin',e)}
                                                                            key={form.key('otherInformation.givenOfferToJoin')}
                                                                            {...form.getInputProps('otherInformation.givenOfferToJoin')}
                                                                            data={[
                                                                                { label: 'Yes', value: 'yes' },
                                                                                { label: 'No', value: 'no' },
                                                                            ]}
                                                                            />
                                                                    </div>
                                                                </div>    
                                                                <div className='grid grid-cols-12 gap-3'>
                                                                <div className='md:col-span-4 col-span-12'>
                                                                        <h5 className='font-medium text-[12px] my-2'>Joined?</h5>
                                                                        <SegmentedControl
                                                                            onChange={(e) => form.setFieldValue('otherInformation.joined',e)}
                                                                            key={form.key('otherInformation.joined')}
                                                                            {...form.getInputProps('otherInformation.joined')}
                                                                            data={[
                                                                                { label: 'Yes', value: 'yes' },
                                                                                { label: 'No', value: 'no' },
                                                                            ]}
                                                                            />
                                                                    </div>
                                                                    <div className='md:col-span-3 col-span-6'>
                                                                    <DateInput
                                                                        clearable
                                                                        valueFormat="DD/MM/YYYY"
                                                                        label="If Yes? Start Date"
                                                                        placeholder="Enter Start Date"
                                                                        key={form.key('otherInformation.ifYes.startDate')}
                                                                        {...form.getInputProps('otherInformation.ifYes.startDate')}
                                                                    />
                                                                    </div>
                                                                    <div className='md:col-span-3 col-span-6'>
                                                                    <DateInput
                                                                        clearable
                                                                        valueFormat="DD/MM/YYYY"
                                                                        label="End Date"
                                                                        placeholder="Enter End Date"
                                                                        key={form.key('otherInformation.ifYes.endDate')}
                                                                        {...form.getInputProps('otherInformation.ifYes.endDate')}
                                                                    />
                                                                    </div>
                                                                </div>
                                                    </div>
                                                    <Divider my="sm" />
                                                    <div className="grid grid-cols-12 gap-5">
                                                            <div className='col-span-7'>
                                                                    <div className='grid grid-rows-2 gap-2'>
                                                                            <div className='row-span-1'>
                                                                                    <h5 className='font-medium text-[12px] my-2'>Have you ever been punished during your service or convicted by a court of law?</h5>
                                                                                    <SegmentedControl
                                                                                        onChange={(e) => form.setFieldValue('otherInformation.haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw.punishedStatus',e)}
                                                                                        key={form.key('otherInformation.haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw.punishedStatus')}
                                                                                        {...form.getInputProps('otherInformation.haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw.punishedStatus')}
                                                                                        data={[
                                                                                            { label: 'Yes', value: 'yes' },
                                                                                            { label: 'No', value: 'no' },
                                                                                        ]}
                                                                                        /> 
                                                                            </div>  
                                                                            <div className='row-span-1'>
                                                                                    <Textarea
                                                                                    label="If Yes? Please Explain"
                                                                                    style={{ flex: 1 }}
                                                                                    placeholder=""
                                                                                    key={form.key(`otherInformation.haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw.explain`)}
                                                                                    {...form.getInputProps(`otherInformation.haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw.explain`)}
                                                                                    />       
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                            <div className='col-span-5'>
                                                                    <div className='grid grid-rows-2 gap-2'>
                                                                            <div className='row-span-1'>
                                                                                    <h5 className='font-medium text-[12px] my-2'>Do you have any case pending against you in court of law?</h5>
                                                                                    <SegmentedControl
                                                                                        onChange={(e) => form.setFieldValue('otherInformation.doYouHaveAnyCasePendingAgainstYouInCourtOfLaw.casePendingStatus',e)}
                                                                                        key={form.key('otherInformation.doYouHaveAnyCasePendingAgainstYouInCourtOfLaw.casePendingStatus')}
                                                                                        {...form.getInputProps('otherInformation.doYouHaveAnyCasePendingAgainstYouInCourtOfLaw.casePendingStatus')}
                                                                                        data={[
                                                                                            { label: 'Yes', value: 'yes' },
                                                                                            { label: 'No', value: 'no' },
                                                                                        ]}
                                                                                        /> 
                                                                            </div>  
                                                                            <div className='row-span-1'>
                                                                                    <Textarea
                                                                                    label="If Yes? Please Explain"
                                                                                    style={{ flex: 1 }}
                                                                                    placeholder=""
                                                                                    key={form.key(`otherInformation.doYouHaveAnyCasePendingAgainstYouInCourtOfLaw.explain`)}
                                                                                    {...form.getInputProps(`otherInformation.doYouHaveAnyCasePendingAgainstYouInCourtOfLaw.explain`)}
                                                                                    />       
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <Divider my="sm" />
                                                    <div className='grid grid-cols-12 gap-3'>
                                                                <div className='col-span-6'>
                                                                <FileInput 
                                                                clearable 
                                                                withAsterisk
                                                                description={'(Please upload .jpg, .png, .jpeg format only upto 2mb.)'}
                                                                key={form.key('otherInformation.photoUpload')}
                                                                {...form.getInputProps('otherInformation.photoUpload')}
                                                                label="Upload Photo" 
                                                                placeholder="Upload Photo" 
                                                                />         
                                                                    </div>  
                                                                    <div className='col-span-6'>
                                                                <FileInput 
                                                                clearable 
                                                                description={'(Please upload .docx, .doc, .pdf format only upto 2mb.)'}
                                                                key={form.key('otherInformation.resumeUpload')}
                                                                {...form.getInputProps('otherInformation.resumeUpload')}
                                                                label="Upload Resume" 
                                                                placeholder="Upload Resume" 
                                                                />         
                                                                    </div>                   
                                                    </div>                                        
                                            </div> 
  )
}

export default OtherInformationComponent
