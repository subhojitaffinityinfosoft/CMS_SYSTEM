import { Fieldset, Group, NumberInput, Table, TextInput } from '@mantine/core';
import React from 'react'
import MSegregratorComponent from '../MSegregrator';
// import { randomId } from '@mantine/hooks';

const ResearchWorkComponent = ({form,isDisabled=false}) => {
  return (
    <div className='p-5 rounded-sm space-y-4'>
                                            <div className='grid grid-cols-12 gap-3'>
                                                <div className='md:col-span-3 col-span-12'>
                                                <TextInput disabled={isDisabled}
                                                    size='xs'
                                                    label="Your orcid Id"
                                                    placeholder="Enter orcid Id"
                                                    key={form.key('researchWork.orcidId')}
                                                    {...form.getInputProps('researchWork.orcidId')}
                                                />                   
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                <NumberInput  disabled={isDisabled}
                                                    size='xs'
                                                    hideControls
                                                    label="h-Index as per SCOPUS"
                                                    placeholder="Enter h-Index as per SCOPUS"
                                                    key={form.key('researchWork.hIndexScopus')}
                                                    {...form.getInputProps('researchWork.hIndexScopus')}
                                                />                   
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                <NumberInput  disabled={isDisabled}
                                                    size='xs'
                                                    hideControls
                                                    label="h-Index as per Web of science"
                                                    placeholder="Enter h-Index as per Web of science"
                                                    key={form.key('researchWork.hIndexWebOfScience')}
                                                    {...form.getInputProps('researchWork.hIndexWebOfScience')}
                                                />                   
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                <NumberInput  disabled={isDisabled}
                                                    size='xs'
                                                    hideControls
                                                    label="Cumulative Impact Factor"
                                                    placeholder="Enter h-Index as per Web of science"
                                                    key={form.key('researchWork.cumulativeImpactFactor')}
                                                    {...form.getInputProps('researchWork.cumulativeImpactFactor')}
                                                />                   
                                                </div>
                                            </div>    
                                        
                                            <MSegregratorComponent title={'No of Publications'}/>
                                                    <div className='grid grid-rows-2 gap-5'>
                                                         <div className='row-span-1'>
                                                            <Fieldset legend="Research Papers Published (Total)">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Total Research Papers Published</h5>
                                                                                        <NumberInput hideControls={true}  disabled={isDisabled}
                                                                                            size='xs'
                                                                                            // label="Total Research Papers Published"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_Total')}
                                                                                            {...form.getInputProps('researchWork.pub_Total')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As per UGC Care List</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="As per UGC Care List"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_UGC')}
                                                                                            {...form.getInputProps('researchWork.pub_UGC')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>SCI</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="SCI"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_SCI')}
                                                                                            {...form.getInputProps('researchWork.pub_SCI')}
                                                                                        />
                                                                                </div>
                                                                               
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Web of Science</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Web of Science"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_WebOfScience')}
                                                                                            {...form.getInputProps('researchWork.pub_WebOfScience')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Google Scholar</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Google Scholar"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_GoogleScholar')}
                                                                                            {...form.getInputProps('researchWork.pub_GoogleScholar')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Scopus</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Scopus"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub_Scopus')}
                                                                                            {...form.getInputProps('researchWork.pub_Scopus')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                        </div>
                                                         <div className='row-span-1'>
                                                             <Fieldset legend="Research Papers Published in last three years">
                                                                        <div className='grid grid-cols-12  gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Total Research Papers Published in last three years</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label=""
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_Total')}
                                                                                            {...form.getInputProps('researchWork.pub3_Total')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As per UGC Care List</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="As per UGC Care List"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_UGC')}
                                                                                            {...form.getInputProps('researchWork.pub3_UGC')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>SCI</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="SCI"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_SCI')}
                                                                                            {...form.getInputProps('researchWork.pub3_SCI')}
                                                                                        />
                                                                                </div>
                                                                               
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Web of Science</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Web of Science"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_WebOfScience')}
                                                                                            {...form.getInputProps('researchWork.pub3_WebOfScience')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Google Scholar</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Google Scholar"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_GoogleScholar')}
                                                                                            {...form.getInputProps('researchWork.pub3_GoogleScholar')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Scopus</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            // label="Scopus"
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.pub3_Scopus')}
                                                                                            {...form.getInputProps('researchWork.pub3_Scopus')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                         </div>
                                                    </div>
                                               
                                            <div className='grid grid-cols-12 gap-2'>
                                                        <div className='col-span-12'>
                                                                {/* <Group className='flex items-center justify-between'> */}
                                                                    {/* <h5 className='text-sm font-medium'>Number of citations (in last three years)</h5> */}
                                                                    <NumberInput disabled={isDisabled}
                                                                        size='xs'
                                                                        label="Number of citations (in last three years)"
                                                                        placeholder="" hideControls
                                                                        key={form.key('researchWork.citationsLast3Years')}
                                                                        {...form.getInputProps('researchWork.citationsLast3Years')}
                                                                    />
                                                                {/* </Group> */}
                                                        </div>
                                            </div>   
                                            <MSegregratorComponent title={'No. of Funded Projects (in last three years)'}/>
                                           
                                            <div className='grid grid-cols-12 gap-5'>
                                                     <div className='col-span-6'>
                                                                <Fieldset legend="Completed">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>No. Of Projects</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.fundedProjects_Completed_Count')}
                                                                                            {...form.getInputProps('researchWork.fundedProjects_Completed_Count')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Amount (In INR)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.fundedProjects_Completed_Amount')}
                                                                                            {...form.getInputProps('researchWork.fundedProjects_Completed_Amount')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                                       <div className='col-span-6'>
                                                                <Fieldset legend="OnGoing">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>No. Of Projects</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.fundedProjects_Ongoing_Count')}
                                                                                            {...form.getInputProps('researchWork.fundedProjects_Ongoing_Count')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Amount (In INR)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.fundedProjects_Ongoing_Amount')}
                                                                                            {...form.getInputProps('researchWork.fundedProjects_Ongoing_Amount')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                            </div>
                                            <MSegregratorComponent title={'No. of conferences, seminars, workshops, training programmes (in last three years)'}/>
                                             <div className='grid grid-cols-12 gap-5'>
                                                     <div className='col-span-4'>
                                                                <Fieldset legend="Presented At	">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Total(no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Presented_Total')}
                                                                                            {...form.getInputProps('researchWork.conf_Presented_Total')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>National (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Presented_National')}
                                                                                            {...form.getInputProps('researchWork.conf_Presented_National')}
                                                                                        />
                                                                                </div>
                                                                                 <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>International (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Presented_International')}
                                                                                            {...form.getInputProps('researchWork.conf_Presented_International')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                                      <div className='col-span-4'>
                                                                <Fieldset legend="Attended">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Total(no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Attended_Total')}
                                                                                            {...form.getInputProps('researchWork.conf_Attended_Total')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>National (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Attended_National')}
                                                                                            {...form.getInputProps('researchWork.conf_Attended_National')}
                                                                                        />
                                                                                </div>
                                                                                 <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>International (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Attended_International')}
                                                                                            {...form.getInputProps('researchWork.conf_Attended_International')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                                        <div className='col-span-4'>
                                                                <Fieldset legend="Organized">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Total(no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Organized_Total')}
                                                                                            {...form.getInputProps('researchWork.conf_Organized_Total')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>National (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Organized_National')}
                                                                                            {...form.getInputProps('researchWork.conf_Organized_National')}
                                                                                        />
                                                                                </div>
                                                                                 <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>International (no.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.conf_Organized_International')}
                                                                                            {...form.getInputProps('researchWork.conf_Organized_International')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                            </div>
                                            {/* <Table striped highlightOnHover withColumnBorders withTableBorder>
                                                                <Table.Thead>
                                                                    <Table.Tr>
                                                                        <Table.Th></Table.Th>
                                                                        <Table.Th>Total (no.)</Table.Th>
                                                                        <Table.Th>National (no.)</Table.Th>
                                                                        <Table.Th>International (no.)</Table.Th>
                                                                    </Table.Tr>
                                                                </Table.Thead> 
                                                                <Table.Tbody>
                                                                            {
                                                                                form.getValues().researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.map((item,index) =>{
                                                                                    const keys = Object.keys(item);
                                                                                    return <Table.Tr key={index}>
                                                                                        <Table.Td>
                                                                                            {
                                                                                                keys == 'presentedAt' ? 'Presented At' : (keys == 'attended' ? 'Attended' : 'Organized')
                                                                                            }
                                                                                        </Table.Td>
                                                                                        <Table.Td>
                                                                                        <NumberInput disabled={isDisabled}
                                                                                            size='xs'
                                                                                                hideControls
                                                                                                placeholder=""
                                                                                                key={form.key(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.totalNo`)}
                                                                                                {...form.getInputProps(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.totalNo`)}
                                                                                            />
                                                                                        </Table.Td>
                                                                                        <Table.Td>
                                                                                        <NumberInput disabled={isDisabled}
                                                                                            size='xs'
                                                                                                hideControls
                                                                                                placeholder=""
                                                                                                key={form.key(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.nationalNo`)}
                                                                                                {...form.getInputProps(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.nationalNo`)}
                                                                                            />
                                                                                        </Table.Td>
                                                                                        <Table.Td>
                                                                                        <NumberInput disabled={isDisabled}
                                                                                            size='xs'
                                                                                                hideControls
                                                                                                placeholder=""
                                                                                                key={form.key(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.internationalNo`)}
                                                                                                {...form.getInputProps(`researchWork.noOfConferencesSeminarsWorkshopsTrainingProgrammers.${index}.${keys}.internationalNo`)}
                                                                                            />
                                                                                        </Table.Td>
                                                                                    </Table.Tr>
                                                                                })
                                                                            }
                                                                </Table.Tbody>
                                            </Table>  */}
                                            <MSegregratorComponent title={'Research Guidance (in last three years)'}/>
                                               <div className='grid grid-cols-12 gap-5'>
                                                     <div className='md:col-span-6 col-span-12'>
                                                                <Fieldset legend="Successfully Completed">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Independent M Phil. Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Completed_MPhil_Independent')}
                                                                                            {...form.getInputProps('researchWork.rG_Completed_MPhil_Independent')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Independent PhD Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Completed_PhD_Independent')}
                                                                                            {...form.getInputProps('researchWork.rG_Completed_PhD_Independent')}
                                                                                        />
                                                                                </div>
                                                                                 <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As Co-supervisor M Phil. Equivalent (No.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Completed_MPhil_CoSupervisor')}
                                                                                            {...form.getInputProps('researchWork.rG_Completed_MPhil_CoSupervisor')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As Co-supervisor  PhD Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Completed_PhD_CoSupervisor')}
                                                                                            {...form.getInputProps('researchWork.rG_Completed_PhD_CoSupervisor')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                                      <div className='md:col-span-6 col-span-12'>
                                                                       <Fieldset legend="Under Supervision">
                                                                        <div className='grid grid-cols-12 gap-2'>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Independent M Phil. Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Under_MPhil_Independent')}
                                                                                            {...form.getInputProps('researchWork.rG_Under_MPhil_Independent')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>Independent PhD Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Under_PhD_Independent')}
                                                                                            {...form.getInputProps('researchWork.rG_Under_PhD_Independent')}
                                                                                        />
                                                                                </div>
                                                                                 <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As Co-supervisor M Phil. Equivalent (No.)</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Under_MPhil_CoSupervisor')}
                                                                                            {...form.getInputProps('researchWork.rG_Under_MPhil_CoSupervisor')}
                                                                                        />
                                                                                </div>
                                                                                <div className='col-span-12 flex justify-between items-center'> 
                                                                                        <h5 className='text-[11px] text-card-foreground/80 font-PoppinsMedium'>As Co-supervisor PhD Equivalent (No.)	</h5>
                                                                                        <NumberInput disabled={isDisabled} hideControls={true}
                                                                                            size='xs'
                                                                                            placeholder=""
                                                                                            key={form.key('researchWork.rG_Under_PhD_CoSupervisor')}
                                                                                            {...form.getInputProps('researchWork.rG_Under_PhD_CoSupervisor')}
                                                                                        />
                                                                                </div>
                                                                        </div> 
                                                            </Fieldset>
                                                     </div>
                                            </div>
                                                    {/* {
                                                            form.getValues().researchWork.researchGuidance.map((item,index) =>{
                                                                        const keys = Object.keys(item);
                                                                    return <Table key={randomId()}  striped highlightOnHover withRowBorders withColumnBorders withTableBorder>
                                                                            <Table.Thead>
                                                                                <Table.Tr>
                                                                                    <Table.Th colSpan={3}>
                                                                                        <h5 
                                                                                        >
                                                                                            {
                                                                                                keys == 'successfullyCompleted' ? 'Successsfully Completed' : 'Under Supervision'
                                                                                            }
                                                                                        </h5>
                                                                                        
                                                                                    </Table.Th>
                                                                                </Table.Tr>
                                                                                <Table.Tr>
                                                                                        <Table.Th></Table.Th>
                                                                                        <Table.Th>M Phil. Equivalent (No.)</Table.Th>
                                                                                        <Table.Th>PhD Equivalent (No.)</Table.Th>
                                                                                </Table.Tr> 
                                                                            </Table.Thead>
                                                                            <Table.Tbody>
                                                                                    {
                                                                                        item[keys].map((el,i) =>{
                                                                                            const inner_keys = Object.keys(el);
                                                                                            return <Table.Tr key={i}>
                                                                                                <Table.Td>
                                                                                                    {
                                                                                                        inner_keys=='Independent' ? inner_keys : 'As Co-supervisor'
                                                                                                    }
                                                                                                </Table.Td>  
                                                                                                <Table.Td>
                                                                                                <NumberInput disabled={isDisabled}
                                                                                                    size='xs'
                                                                                                    hideControls
                                                                                                    placeholder=""
                                                                                                    key={form.key(`researchWork.researchGuidance.${index}.${keys}.${i}.${inner_keys}.MPhilEquivalentNo`)}
                                                                                                    {...form.getInputProps(`researchWork.researchGuidance.${index}.${keys}.${i}.${inner_keys}.PhDEquivalentNo`)}
                                                                                                />
                                                                                                </Table.Td> 
                                                                                                <Table.Td>
                                                                                                <NumberInput disabled={isDisabled}
                                                                                                    size='xs'
                                                                                                    hideControls
                                                                                                    placeholder=""
                                                                                                    key={form.key(`researchWork.researchGuidance.${index}.${keys}.${i}.${inner_keys}.PhDEquivalentNo`)}
                                                                                                    {...form.getInputProps(`researchWork.researchGuidance.${index}.${keys}.${i}.${inner_keys}.PhDEquivalentNo`)}
                                                                                                />
                                                                                                </Table.Td> 
                                                                                            </Table.Tr>
                                                                                        })
                                                                                    }           
                                                                            </Table.Tbody>
                                                                    </Table>    
                                                            
                                                                })

                                                    }          */}
                                                </div> 
  )
}

export default ResearchWorkComponent
