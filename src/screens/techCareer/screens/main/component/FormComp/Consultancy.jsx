import { Button, Fieldset, Group, NumberInput, Table, Textarea } from '@mantine/core';
// import { randomId } from '@mantine/hooks';
import { Plus, Trash } from 'lucide-react';
import React from 'react'

const ConsultancyComponent = ({form,isDisabled}) => {
  return (
    <div className='rounded-sm p-5'>

                                                     {
                            form.getValues().consultancy.map((item,index)=>{
                                  return <Fieldset className='text-xs font-PoppinsMedium mb-5 px-5' key={index} legend={`Candidate Books Details`}>
                                                                                                                 
                                                                                                                    <div className='grid grid-cols-12  gap-5 mb-2'>
                                                                                                                            {!isDisabled && <div className='col-span-12 flex justify-end'>
                                                                                                                                <Group>
                                                                                                                                                    {
                                                                                                                                                        index > 0 &&  <Button color="red" size='xs'
                                                                                                                                                    
                                                                                                                                                        onClick={() => form.removeListItem('consultancy', index)}>
                                                                                                                                                            <Trash size="1rem" />&nbsp;Delete
                                                                                                                                                        </Button>
                                                                                                                                                    }
                                                                            
                                                                                                                                                    {
                                                                                                                                                        index == (form.getValues().consultancy.length - 1) &&  <Button size="xs"  variant='outline' 
                                                                                                                                                        
                                                                                                                                                        onClick={() =>{
                                                                                                                                                            form.insertListItem('consultancy',  {
                                                                                                                                                                    consultancyId: 0,
                                                                                                                                                                    candidateId: 0,
                                                                                                                                                                    completedAssignments: 0,
                                                                                                                                                                    completedAmount: 0,
                                                                                                                                                                    ongoingAssignments: 0,
                                                                                                                                                                    ongoingAmount: 0,
                                                                                                                                                                    remarks: ""
                                                                                                                                                                })
                                                                                                                                                        }}
                                                                                                                                                        radius={'sm'}  aria-label="Has disabled styles but still interactive">
                                                                                                                                                                <Plus />&nbsp;Add
                                                                                                                                                            </Button>
                                                                                                                                                    }
                                                                                                                                </Group>
                                                                                                                            </div>}
                                                                                                                           
                                                                                                                           
                                                                                                                             <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Completed Assignments (No.): </h5>    
                                                                                                                                      <NumberInput size='xs' disabled={isDisabled}
                                                                                                                                        hideControls={true} 
                                                                                                                                        key={form.key(`consultancy.${index}.completedAssignments`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`consultancy.${index}.completedAssignments`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-3 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Completed Amount: </h5>    
                                                                                                                                     <NumberInput  size='xs' disabled={isDisabled} 
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`consultancy.${index}.completedAmount`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`consultancy.${index}.completedAmount`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Ongoing Assignments (No.): </h5>    
                                                                                                                                       <NumberInput  size='xs'  disabled={isDisabled}
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`consultancy.${index}.ongoingAssignments`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`consultancy.${index}.ongoingAssignments`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                            <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Ongoing Amount: </h5>    
                                                                                                                                        <NumberInput  size='xs' disabled={isDisabled}
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`consultancy.${index}.ongoingAmount`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`consultancy.${index}.ongoingAmount`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                
                                                                                                                    </div>
                                                                                                                     <div className='grid grid-cols-12  gap-5 mb-2'>
                                                                                                                             <div className='col-span-12 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Remarks: </h5>    
                                                                                                                                                        <Textarea disabled={isDisabled}
                                                                                                                                                            // label="Note"
                                                                                                                                                            size='xs'
                                                                                                                                                            style={{ flex: 1 }}
                                                                                                                                                            placeholder="Enter Note"
                                                                                                                                                            key={form.key(`consultancy.${index}.remarks`)}
                                                                                                                                                            {...form.getInputProps(`consultancy.${index}.remarks`)}
                                                                                                                                                            />
                                                                                                                            </div>
                                                                                                                    </div>
                                                                                                            </Fieldset>
                                
                            })
                        }


    </div>
  )
}

export default ConsultancyComponent
