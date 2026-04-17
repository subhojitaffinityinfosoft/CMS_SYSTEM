import React, { useState } from 'react'
import MSegregratorComponent from '../MSegregrator'
import { Box, Button,Divider, FileInput} from '@mantine/core'
import { Plus, Trash } from 'lucide-react';
import MNSelectComponent from '../ux/MNSelect';
import MNTextInputComponent from '../ux/MNTextInput';
import MNNumberInputComponent from '../ux/MNNumberInput';
import CallApi from '@/services/dbIntr';

const AcademicProfessionalQualificationComponent = ({form,md_degree,isDisabled=false}) => {
    // //console.log(form?.getValues().academicProfessionalQualification.Mphil)
    const [loader_photo,setLoaderForPhoto] = useState(false);
    const viewFileinotherTab = async (fileName) => {
        try{
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
        }
    }
    return (
    <div className=' p-2'>
        <MSegregratorComponent title={'Post Graduate'}/>
        <div className='container'>
            {
                form?.getValues()?.academicProfessionalQualification?.map((el, index) => {
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'} 
                                        // withAsterik={index == 0}
                                        isDisabled={isDisabled}
                                        withAsterik={!isDisabled}
                                        form={form}
                                        formKey={`academicProfessionalQualification.${index}.degreeId`}
                                        defaultValue={form.getValues()?.academicProfessionalQualification[`${index}`].degreeId}
                                        label="Degree"
                                        dataSource={md_degree.map(el => {return {value:el.degreeId.toString(),label:el.degreeName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.${index}.discipline`}
                                        isDisabled={isDisabled}
                                        withAsterik={!isDisabled}
                                        label={'Discipline'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.${index}.specialization`}
                                        isDisabled={isDisabled}
                                        withAsterik={!isDisabled}
                                        label={'Specialization'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                        <MNTextInputComponent
                                           size={'xs'}
                                           label={'Institution'} 
                                           form={form}
                                        //    withAsterisk={index == 0}
                                            isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                           formKey={`academicProfessionalQualification.${index}.institution`}
                                           hideControls={true}
                                    />
                                </div>
                                 <div className='md:col-span-3 col-span-6'>
                                        <MNTextInputComponent
                                           size={'xs'}
                                           label={'Board/University'} 
                                           form={form}
                                          isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                           formKey={`academicProfessionalQualification.${index}.boardUniversity`}
                                           hideControls={true}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                           size={'xs'}
                                           label={'Country'} 
                                           form={form}
                                           isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                           formKey={`academicProfessionalQualification.${index}.country`}
                                           hideControls={true}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={"Year Of Passing"}
                                        hideControls={true}
                                        isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                        form={form}
                                        formKey={`academicProfessionalQualification.${index}.yearOfPassing`}
                                    />
                                </div>
                                <div className="md:col-span-3 col-span-6">
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.${index}.gradeOrPercent`}
                                                                           isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                        label={'Grade/Percentage'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.${index}.qualificationCode`}
                                           isDisabled={isDisabled}
                                            withAsterik={!isDisabled}
                                        label={'Qualification Code'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                        {!isDisabled ? <FileInput 
                                            label="Upload Certificate"
                                            placeholder="Pick file"
                                            accept="image/*" size='xs'
                                            value={el.certificateFilePath}
                                            onChange={(file) => {
                                                form.setFieldValue(`academicProfessionalQualification.${index}.certificateFilePath`, file);
                                            }}
                                            error={form?.errors?.academicProfessionalQualification?.[index]?.certificateFilePath}
                                        /> : <Box className='flex items-start justify-end h-full flex-col'>
                                            <p className='text-xs font-PoppinsMedium'>Uploaded Certificate</p>
                                            {
                                                el.certificateFilePath ? <Button loading={loader_photo} size='xs' fw={'normal'} color={'red'} onClick={() => {
                                                                                viewFileinotherTab(el.certificateFilePath)
                                                }}>
                                                    <span className='text-xs font-PoppinsRegular'>View Certificate</span>
                                                    <ArrowUpRight size={15}/>
                                                </Button> : <p className='text-xs font-PoppinsMedium text-primary'>File Not Available</p>
                                            }
                                        </Box>}
                                </div>
                               {!isDisabled &&  <div className='md:col-span- col-span-6 flex items-end justify-end'>
                                    {
                                        index < (form?.getValues().academicProfessionalQualification.length - 1 || !isDisabled) && <Button size='xs' color="red"

                                            onClick={() => form?.removeListItem('academicProfessionalQualification', index)}>
                                            <Trash size=".8rem" />&nbsp;Delete
                                        </Button>
                                    }

                                    {
                                        index == (form?.getValues().academicProfessionalQualification.length - 1) && <Button size="xs" variant='outline'

                                            onClick={() => {
                                                form?.insertListItem('academicProfessionalQualification',  {
                                                        candidateQualificationId: 0,
                                                        candidateId: 0,
                                                        degreeId: 0,
                                                        discipline: "",
                                                        specialization: "",
                                                        institution: "",
                                                        boardUniversity: "",
                                                        country: "",
                                                        yearOfPassing: 0,
                                                        gradeOrPercent: "",
                                                        qualificationCode: "",
                                                        certificateFilePath: null,
                                                        remarks: ""
                                                    })
                                            }}
                                            radius={'sm'} aria-label="Has disabled styles but still interactive">
                                            <Plus size={'.8rem'}/>&nbsp;Add
                                        </Button>
                                    }

                                </div>}
                            </div>
                        </div>
                        {index == (form?.getValues().academicProfessionalQualification.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>


    </div>
  )
}

export default AcademicProfessionalQualificationComponent
