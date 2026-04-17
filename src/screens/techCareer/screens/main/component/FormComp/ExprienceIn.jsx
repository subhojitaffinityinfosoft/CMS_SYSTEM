import MSegregratorComponent from '../MSegregrator'
import { ActionIcon, Box, Button, Fieldset, FileInput, SegmentedControl, Select, Table, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { ArrowUpRight, Plus, Trash } from 'lucide-react';
import { randomId } from '@mantine/hooks';
import MNNumberInputComponent from '../ux/MNNumberInput';
import MNTextInputComponent from '../ux/MNTextInput';
import MNDatePickerInputComponent from '../ux/MNDatePickerInput';
import MNSelectComponent from '../ux/MNSelect';
import { useState } from 'react';
import { FILE_UPLOAD } from '@/model/Api';
import CallApi from '@/services/dbIntr';

const ExprienceInComponent = ({form,hasAcademic,md_jobnature,md_country,md_position,isDisabled=false}) => {
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
    <div className='rounded-sm p-5 space-y-5'>
    {
                form?.getValues()?.exprience.map((el, index) => {
                    return  <Fieldset legend={`Exprience Details`}  key={index} bg={index % 2 == 0 ? '' : 'bg-primary'}>
                        <div className={`grid grid-cols-12 gap-2`}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent isDisabled={isDisabled}
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`exprience.${index}.employerName`}
                                        // withAsterik={index == 0}
                                        label={'Employer Name'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`exprience.${index}.employerType`}
                                        // withAsterik={index == 0}
                                        label={'Employer Type'}
                                    /> */}
                                    <Select
                                        size='xs'
                                        label="Employer Type"
                                        disabled={isDisabled}
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_jobnature?.map(el => {return {value:el.jobNatureName,label:el.jobNatureName}})}
                                        key={form.key(`exprience.${index}.employerType`)}
                                        placeholder="Select Employer Type"
                                        {...form.getInputProps(`exprience.${index}.employerType`)}
                                    /> 
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                        <MNTextInputComponent isDisabled={isDisabled}
                                           size={'xs'}
                                           label={'Designation'} 
                                           form={form}
                                        //    withAsterisk={index == 0}

                                           formKey={`exprience.${index}.designation`}
                                           hideControls={true}
                                    />
                                </div>
                                 <div className='md:col-span-3 col-span-6'>
                                        <MNTextInputComponent isDisabled={isDisabled}
                                           size={'xs'}
                                           label={'Department'} 
                                           form={form}
                                        //    withAsterisk={index == 0}

                                           formKey={`exprience.${index}.department`}
                                           hideControls={true}
                                    />
                                </div>
                                {/* <div className='md:col-span-3 col-span-6'>
                                      <MNSelectComponent
                                        formKey={`exprience.${index}.country`}
                                        label="Country" isDisabled={isDisabled}
                                        form={form} size={'xs'}
                                        withAsterik={false}
                                        dataSource={md_country?.map(el => {return {value:el.countryName,label:el.countryName}})}
                                    />
                                </div> */}
                                  <div className='md:col-span-3 col-span-12'>
                                    <MNDatePickerInputComponent
                                            withAsterik={false} isDisabled={isDisabled}
                                            clearable={!isDisabled} size={'xs'}
                                            label="From Date"
                                            form={form}
                                            formKey={`exprience.${index}.fromDate`}
                                    />
                                </div>
                                 <div className='md:col-span-3 col-span-12'>
                                    <MNDatePickerInputComponent
                                            isDisabled={isDisabled}
                                            clearable={!isDisabled} size={'xs'}
                                            label="End Date"
                                            form={form}
                                            formKey={`exprience.${index}.toDate`}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={"Duration Months"}
                                        hideControls={true}
                                        // withAsterisk={index == 0}
                                         isDisabled={isDisabled}
                                        form={form}
                                        formKey={`exprience.${index}.durationMonths`}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <h5 className='font-PoppinsMedium text-[13px]'>Whether it is current</h5>
                                    <SegmentedControl disabled={isDisabled}
                                        onChange={(e) => form.setFieldValue(`exprience.${index}.isCurrent`, e)}
                                        key={form.key(`exprience.${index}.isCurrent`)}
                                        {...form.getInputProps(`exprience.${index}.isCurrent`)}
                                        data={[
                                            { label: 'Yes', value: 'Y' },
                                            { label: 'No', value: 'N' },
                                        ]}
                                    />
                                </div>
                                <div className="md:col-span-3 col-span-6">
                                    <MNTextInputComponent  isDisabled={isDisabled}
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`exprience.${index}.responsibilities`}
                                        withAsterik={index == 0}
                                        label={'Responsibilities'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                        {!isDisabled ? <FileInput size='xs'
                                            label="Upload Exprience Certificate"
                                            placeholder="Pick file"
                                            accept="image/*"
                                            value={el.experienceProofPath}
                                            onChange={(file) => {
                                                form.setFieldValue(`exprience.${index}.experienceProofPath`, file);
                                            }}
                                            error={form?.errors?.exprience?.[index]?.experienceProofPath}
                                        /> : <Box className='flex items-start justify-end h-full flex-col'>
                                            <p className='text-xs font-PoppinsMedium'>Uploaded Exprience Certificate</p>
                                            {
                                                el.experienceProofPath ? <Button loading={loader_photo && selectedIndex == index} size='xs' fw={'normal'} color={'red'} onClick={() => {
                                                                                viewFileinotherTab(el.experienceProofPath,index)
                                                }}>
                                                    <span className='text-xs font-PoppinsRegular'>View</span>
                                                    <ArrowUpRight size={15}/>
                                                </Button> : <p className='text-xs font-PoppinsMedium text-primary'>File Not Available</p>
                                            }
                                        </Box>}
                                </div>
                                   {!isDisabled && <div className='md:col-span-3 col-span-6 flex items-end justify-end space-x-2'>
                                        {
                                            index > 0 && <Button size='xs' color="red"

                                                onClick={() => form?.removeListItem('exprience', index)}>
                                                <Trash size=".8rem" />&nbsp;Delete
                                            </Button>
                                        }

                                    {
                                        index == (form?.getValues().exprience.length - 1) && <Button  variant='outline'

                                            onClick={() => {
                                                form?.insertListItem('exprience',   {
                                                    experienceId: 0,
                                                    candidateId: 0,
                                                    employerName: "",
                                                    employerType: "",
                                                    designation: "",
                                                    department: "",
                                                    fromDate:null,
                                                    toDate:null,
                                                    durationMonths: 0,
                                                    isCurrent: 'N',
                                                    responsibilities: "",
                                                    experienceProofPath: null
                                                })
                                            }} 
                                            size={"xs"}
                                            radius={'sm'} aria-label="Has disabled styles but still interactive">
                                            <Plus size={'.8rem'}/>&nbsp;Add
                                        </Button>
                                    }

                                </div>}
                            </div>
                        </div>
                    </div>
                    </Fieldset>
                })
            }

        </div>
  )
}

export default ExprienceInComponent
