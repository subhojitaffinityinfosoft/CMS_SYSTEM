import { ActionIcon, Box, Button, Divider, Fieldset, FileInput, Group, NumberInput, Select, Table, Textarea, TextInput } from '@mantine/core'
// import { randomId } from '@mantine/hooks'
import { Trash,Plus, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import MNSelectComponent from '../ux/MNSelect';
import { FILE_UPLOAD } from '@/model/Api';
import CallApi from '@/services/dbIntr';

const BookAuthoredCoAuthoredCoEditedComponent = ({form,md_written,isDisabled=false}) => {
      const [loader_photo,setLoaderForPhoto] = useState(false);
    const [selectedIndex,setSelectedIndex] = useState('');
    const viewFileinotherTab = async (fileName,index) => {
        try{
            setSelectedIndex(index);
            setLoaderForPhoto(true);
                // console.log(form.getValues()?.personalInformation[key])
               const res = await CallApi(0,`${FILE_UPLOAD.download}/${fileName}`);
               if(res?.request?.status == 200){
                    if(res?.data?.isValid){
                        let mimeType = res?.data?.data?.contentType;
                        const base64 = `data:${res?.data?.data?.contentType};base64,${res?.data?.data?.base64String}`
                        const cleaned = base64.replace(/^data:.*;base64,/, "");
                        const byteCharacters = atob(cleaned);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: mimeType });
                        const blobUrl = URL.createObjectURL(blob);
                        window.open(blobUrl, "_blank");    
                    }
               } 
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            setLoaderForPhoto(false);
            setSelectedIndex('');
        }
    }
  return (
    <div className='rounded-sm p-2'>
                                                <Table >
                                                      
                                                                    {
                                                                        form.getValues()?.booksAuthoredCoAuthoredEditedCoEdited?.map((item,index)=>{
                                                                            return <Fieldset className='text-xs font-PoppinsMedium mb-5' legend={`Candidate Books Details`}>
                                                                                 
                                                                                    <div className='grid grid-cols-12  gap-5 mb-2'>
                                                                                            {!isDisabled && <div className='col-span-12 flex justify-end'>
                                                                                                <Group>
                                                                                                                    {
                                                                                                                        index > 0 &&  <Button color="red" size='xs'
                                                                                                                    
                                                                                                                        onClick={() => form.removeListItem('booksAuthoredCoAuthoredEditedCoEdited', index)}>
                                                                                                                            <Trash size="1rem" />&nbsp;Delete
                                                                                                                        </Button>
                                                                                                                    }
                                            
                                                                                                                    {
                                                                                                                        index == (form.getValues().booksAuthoredCoAuthoredEditedCoEdited.length - 1) &&  <Button size="xs"  variant='outline' 
                                                                                                                        
                                                                                                                        onClick={() =>{
                                                                                                                            form.insertListItem('booksAuthoredCoAuthoredEditedCoEdited', {
                                                                                                                                bookId: 0,
                                                                                                                                candidateId: 0,
                                                                                                                                srNo: 0,
                                                                                                                                title: "",
                                                                                                                                isbn: "",
                                                                                                                                writtenAs: "",
                                                                                                                                publisher: "",
                                                                                                                                yearOfPublication: 0,
                                                                                                                                edition: "",
                                                                                                                                pages: "",
                                                                                                                                doIorURL: "",
                                                                                                                                proofDocumentPath: null,
                                                                                                                                notes: ""
                                                                                                                            })
                                                                                                                        }}
                                                                                                                        radius={'sm'}  aria-label="Has disabled styles but still interactive">
                                                                                                                                <Plus />&nbsp;Add
                                                                                                                            </Button>
                                                                                                                    }
                                                                                                </Group>
                                                                                            </div>}
                                                                                           
                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>SR No: </h5>    
                                                                                                      <NumberInput  size='xs' disabled={isDisabled}
                                                                                                        hideControls={true}
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.srNo`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.srNo`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Title: </h5>    
                                                                                                      <TextInput size='xs' disabled={isDisabled}
                                                                                                        hideControls={true} 
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.title`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.title`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>ISBN: </h5>    
                                                                                                     <TextInput  size='xs' 
                                                                                                        hideControls disabled={isDisabled}
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.isbn`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.isbn`)}
                                                                                                        /> 
                                                                                            </div>

                                                                                    </div>
                                                                                     <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Written As: </h5>  
                                                                                                        <MNSelectComponent isDisabled={isDisabled}
                                                                                                            formKey={`booksAuthoredCoAuthoredEditedCoEdited.${index}.writtenAs`}
                                                                                                            form={form} size={'xs'}
                                                                                                            withAsterik={false}
                                                                                                            dataSource={md_written?.map(el => {return {value:el.writtenName,label:el.writtenName}})}
                                                                                                        />
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Publisher: </h5>    
                                                                                                      <TextInput size='xs' disabled={isDisabled}
                                                                                                        hideControls={true} 
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.publisher`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.publisher`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Year Of Publication: </h5>    
                                                                                                     <NumberInput  size='xs' disabled={isDisabled}
                                                                                                        hideControls
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.yearOfPublication`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.yearOfPublication`)}
                                                                                                        /> 
                                                                                            </div>

                                                                                    </div>
                                                                                      {/* <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Edition: </h5>    
                                                                                                      <TextInput  size='xs'
                                                                                                        hideControls={true}
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.edition`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.edition`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Pages: </h5>    
                                                                                                      <TextInput size='xs'
                                                                                                        hideControls={true} 
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.pages`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.pages`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>URL (DOI): </h5>    
                                                                                                     <TextInput  size='xs' 
                                                                                                        hideControls
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.doIorURL`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.doIorURL`)}
                                                                                                        /> 
                                                                                            </div>

                                                                                    </div> */}
                                                                                     <div className='grid grid-cols-12 gap-5 mb-2'>
                                                                                            <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Edition: </h5>    
                                                                                                      <TextInput  size='xs' disabled={isDisabled}
                                                                                                        hideControls={true}
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.edition`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.edition`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>Pages: </h5>    
                                                                                                      <TextInput size='xs' disabled={isDisabled}
                                                                                                        hideControls={true} 
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.pages`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.pages`)}
                                                                                                        /> 
                                                                                            </div>
                                                                                             <div className='col-span-4 flex justify-between items-center  gap-5'>
                                                                                                      <h5 className='font-PoppinsMedium text-[9px]'>URL (DOI): </h5>    
                                                                                                     <TextInput  size='xs'  disabled={isDisabled}
                                                                                                        hideControls
                                                                                                        key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.doIorURL`)}
                                                                                                        placeholder=""
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.doIorURL`)}
                                                                                                        /> 
                                                                                            </div>

                                                                                    </div>
                                                                                    <Divider className='my-2'/>
                                                                                    <div className='grid grid-cols-12 gap-5'>
                                                                                           <div className='col-span-12 flex justify-between items-center gap-5'>
                                                                                                {!isDisabled && <div>
                                                                                                      <h5 className='font-PoppinsMedium text-[11px]'>Upload Document</h5>   
                                                                                                      <h5 className='font-PoppinsMedium text-card-foreground/50 text-[9px]'>(Please upload .jpg, .png, .jpeg format only upto 2mb.)</h5>   
                                                                                                </div> }  
                                                                                                   {!isDisabled ? <FileInput
                                                                                                    clearable size='xs'
                                                                                                    withAsterisk={false}
                                                                                                    className='text-[9px] font-PoppinsMedium'
                                                                                                    key={`booksAuthoredCoAuthoredEditedCoEdited.${index}.proofDocumentPath`}
                                                                                                    {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.proofDocumentPath`)}
                                                                                                    placeholder="Upload Photo" 
                                                                                                    /> : <Box className='flex items-center  justify-between w-full h-full flex-row'>
                                                                                                        <p className='text-xs font-PoppinsMedium'>Uploaded Proof Document</p>
                                                                                                      {
                                                                                                          item.proofDocumentPath ? <Button loading={loader_photo && selectedIndex == index} size='xs' fw={'normal'} color={'red'} onClick={() => {
                                                                                                                                          viewFileinotherTab(item.proofDocumentPath,index)
                                                                                                          }}>
                                                                                                              <span className='text-xs font-PoppinsRegular'>View</span>
                                                                                                              <ArrowUpRight size={15}/>
                                                                                                          </Button> : <p className='text-xs font-PoppinsMedium text-primary'>File Not Available</p>
                                                                                                      }
                                                                                                  </Box>}    
                                                                                            </div>    
                                                                                            <div className='col-span-12 flex justify-between items-center gap-5 '> 
                                                                                                       <Textarea
                                                                                                       label="Note" disabled={isDisabled}
                                                                                                        size='xs'
                                                                                                        style={{ flex: 1 }}
                                                                                                        placeholder="Enter Note"
                                                                                                        key={`booksAuthoredCoAuthoredEditedCoEdited.${index}.notes`}
                                                                                                        {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.notes`)}
                                                                                                        />
                                                                                            </div>      
                                                                                    </div>
                                                                            </Fieldset>
                                                                        })
                                                                    }
                                                        </Table>
                                                    </div>
  )
}

export default BookAuthoredCoAuthoredCoEditedComponent
{/* <Select
                                                                                  searchable
                                                                                  nothingFoundMessage="Nothing found..."
                                                                                  checkIconPosition="right"
                                                                                  data={md_written?.map(el => {return {value:el.writtenId.toString(),label:el.writtenName}})}
                                                                                    key={form.key(`booksAuthoredCoAuthoredEditedCoEdited.${index}.writtenAs`)}
                                                                                    placeholder="Select Written As"
                                                                                    {...form.getInputProps(`booksAuthoredCoAuthoredEditedCoEdited.${index}.writtenAs`)}
                                                                                    />  */}