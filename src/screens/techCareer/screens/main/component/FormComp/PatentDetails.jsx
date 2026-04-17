import { Button, Fieldset, Group, Select, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
// import { randomId } from '@mantine/hooks'
import { Plus, Trash } from 'lucide-react';

const PatentDetailsComponent = ({form,md_patent,isDisabled=false}) => {
  return (
    <div className='rounded-sm p-5'>
                        {
                            form.getValues().patentDetails.map((item,index)=>{
                                  return <Fieldset className='text-xs font-PoppinsMedium mb-5 px-5' legend={`Candidate Books Details`}>
                                                                                                                 
                                                                                                                    <div className='grid grid-cols-12  gap-5 mb-2'>
                                                                                                                            {!isDisabled && <div className='col-span-12 flex justify-end'>
                                                                                                                                <Group>
                                                                                                                                                    {
                                                                                                                                                        index > 0 &&  <Button color="red" size='xs'
                                                                                                                                                    
                                                                                                                                                        onClick={() => form.removeListItem('patentDetails', index)}>
                                                                                                                                                            <Trash size="1rem" />&nbsp;Delete
                                                                                                                                                        </Button>
                                                                                                                                                    }
                                                                            
                                                                                                                                                    {
                                                                                                                                                        index == (form.getValues().patentDetails.length - 1) &&  <Button size="xs"  variant='outline' 
                                                                                                                                                        
                                                                                                                                                        onClick={() =>{
                                                                                                                                                            form.insertListItem('patentDetails',  {
                                                                                                                                                                patentId: 0,
                                                                                                                                                                candidateId: 0,
                                                                                                                                                                title: "",
                                                                                                                                                                patentNumber: "",
                                                                                                                                                                filingDate: "",
                                                                                                                                                                grantDate: "",
                                                                                                                                                                status: "",
                                                                                                                                                                url: "",
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
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Title: </h5>    
                                                                                                                                      <TextInput size='xs' disabled={isDisabled} 
                                                                                                                                        hideControls={true} 
                                                                                                                                        key={`patentDetails.${index}.title`}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.title`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-3 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Patent No.: </h5>    
                                                                                                                                     <TextInput  size='xs'  disabled={isDisabled}
                                                                                                                                        hideControls
                                                                                                                                        key={`patentDetails.${index}.patentNumber`}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.patentNumber`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Filing Date: </h5>    
                                                                                                                                      <DateInput  size='xs' disabled={isDisabled}
                                                                                                                                        key={`patentDetails.${index}.filingDate`}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.filingDate`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                            <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Grant Date: </h5>    
                                                                                                                                      <DateInput  size='xs' disabled={isDisabled}
                                                                                                                                        key={form.key(`patentDetails.${index}.grantDate`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.grantDate`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                
                                                                                                                    </div>
                                                                                                                     <div className='grid grid-cols-12  gap-5 mb-2'>
                                                                                                                             <div className='col-span-3 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Status: </h5>    
                                                                                                                                     <Select size="xs" disabled={isDisabled}
                                                                                                                                        searchable
                                                                                                                                        nothingFoundMessage="Nothing found..."
                                                                                                                                        checkIconPosition="right"
                                                                                                                                        data={md_patent?.map(el => {return {value:el.patentStatusName,label:el.patentStatusName}})}
                                                                                                                                        key={form.key(`patentDetails.${index}.status`)}
                                                                                                                                        placeholder="Select Status"
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.status`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-3 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>URL: </h5>    
                                                                                                                                     <TextInput  size='xs'  disabled={isDisabled}
                                                                                                                                        hideControls
                                                                                                                                        key={`patentDetails.${index}.url`}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.url`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-6 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Remarks: </h5>    
                                                                                                                                                      <Textarea disabled={isDisabled}
                                                                                                                                                        // label="Note"
                                                                                                                                                        size='xs'
                                                                                                                                                        style={{ flex: 1 }}
                                                                                                                                                        placeholder="Enter Remarks"
                                                                                                                                                        key={`patentDetails.${index}.remarks`}
                                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.remarks`)}
                                                                                                                                                        />
                                                                                                                            </div>
                                                                                                                          
                                
                                                                                                                    </div>
                                                                                                                     {/* <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Written As: </h5>    
                                                                                                                                      <NumberInput  size='xs'
                                                                                                                                        hideControls={true}
                                                                                                                                        key={form.key(`patentDetails.${index}.writtenAs`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.writtenAs`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Publisher: </h5>    
                                                                                                                                      <TextInput size='xs'
                                                                                                                                        hideControls={true} 
                                                                                                                                        key={form.key(`patentDetails.${index}.publisher`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.publisher`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Year Of Publication: </h5>    
                                                                                                                                     <NumberInput  size='xs' 
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`patentDetails.${index}.yearOfPublication`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.yearOfPublication`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                
                                                                                                                    </div>
                                                                                                                      <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Edition: </h5>    
                                                                                                                                      <TextInput  size='xs'
                                                                                                                                        hideControls={true}
                                                                                                                                        key={form.key(`patentDetails.${index}.edition`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.edition`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Pages: </h5>    
                                                                                                                                      <TextInput size='xs'
                                                                                                                                        hideControls={true} 
                                                                                                                                        key={form.key(`patentDetails.${index}.pages`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.pages`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>URL (DOI): </h5>    
                                                                                                                                     <TextInput  size='xs' 
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`patentDetails.${index}.doIorURL`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.doIorURL`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                
                                                                                                                    </div>
                                                                                                                     <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Edition: </h5>    
                                                                                                                                      <TextInput  size='xs'
                                                                                                                                        hideControls={true}
                                                                                                                                        key={form.key(`patentDetails.${index}.edition`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.edition`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Pages: </h5>    
                                                                                                                                      <TextInput size='xs'
                                                                                                                                        hideControls={true} 
                                                                                                                                        key={form.key(`patentDetails.${index}.pages`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.pages`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>URL (DOI): </h5>    
                                                                                                                                     <TextInput  size='xs' 
                                                                                                                                        hideControls
                                                                                                                                        key={form.key(`patentDetails.${index}.doIorURL`)}
                                                                                                                                        placeholder=""
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.doIorURL`)}
                                                                                                                                        /> 
                                                                                                                            </div>
                                
                                                                                                                    </div>
                                                                                                                    <Divider className='my-2'/>
                                                                                                                    <div className='grid grid-cols-12 gap-5'>
                                                                                                                           <div className='col-span-4 flex justify-between items-center gap-5'> 
                                                                                                                                   <FileInput
                                                                                                                                    clearable size='xs'
                                                                                                                                    withAsterisk
                                                                                                                                    className='text-[9px] font-PoppinsMedium'
                                                                                                                                    description={'(Please upload .jpg, .png, .jpeg format only upto 2mb.)'}
                                                                                                                                    key={form.key('otherInformation.proofDocumentPath')}
                                                                                                                                    {...form.getInputProps('otherInformation.proofDocumentPath')}
                                                                                                                                    label="Upload Photo" 
                                                                                                                                    placeholder="Upload Photo" 
                                                                                                                                    />     
                                                                                                                            </div>    
                                                                                                                            <div className='col-span-8 flex justify-between items-center gap-5 '> 
                                                                                                                                       <Textarea
                                                                                                                                       label="Note"
                                                                                                                                        size='xs'
                                                                                                                                        style={{ flex: 1 }}
                                                                                                                                        placeholder="Enter Note"
                                                                                                                                        key={form.key(`patentDetails.${index}.note`)}
                                                                                                                                        {...form.getInputProps(`patentDetails.${index}.note`)}
                                                                                                                                        />
                                                                                                                            </div>      
                                                                                                                    </div> */}
                                                                                                            </Fieldset>
                                
                            })
                        }

    </div>
  )
}

export default PatentDetailsComponent
