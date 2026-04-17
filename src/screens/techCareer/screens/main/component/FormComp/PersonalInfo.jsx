import React, { useRef, useState } from 'react'
import MSegregratorComponent from '../MSegregrator'
import MNNumberInputComponent from '../ux/MNNumberInput';
import MNSelectComponent from '../ux/MNSelect';
import MNTextInputComponent from '../ux/MNTextInput';
import MNSegmentControlComponent from '../ux/MNSegmentControl';
import MNDatePickerInputComponent from '../ux/MNDatePickerInput';
import { Button, FileInput, Text } from '@mantine/core';
import JoditEditor from 'jodit-react';
import { ArrowUpRight } from 'lucide-react';
import CallApi from '@/services/dbIntr';
import { FILE_UPLOAD } from '@/model/Api';
const PersonalInfoComponent = ({ form, md_country = [], md_city = [], md_state = [], md_region = [], md_gender = [], md_maritialStatus = [], isDisabled = false }) => {
    const editor = useRef(null);
    // console.log(form.getValues()?.personalInformation?.genderId)
    const [loader_photo, setLoaderForPhoto] = useState(false);
    const [loader_resume, setLoaderForResume] = useState(false);
    const viewFileinotherTab = async (key) => {
        try {
            if (key == 'photoPath') {
                setLoaderForPhoto(true);
            }
            else {
                setLoaderForResume(true);
            }
            // console.log(form.getValues()?.personalInformation[key])
            const res = await CallApi(0, `${FILE_UPLOAD.download}/${form.getValues()?.personalInformation[key]}`);
            if (res?.request?.status == 200) {
                if (res?.data?.isValid) {
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
        catch (err) {
            console.log(err.message);
        }
        finally {
            if (key == 'photoPath') {
                setLoaderForPhoto(false);
            }
            else {
                setLoaderForResume(false);
            }
        }
    }
    return (
        <div className=' p-5 space-y-2 rounded-sm'>
            {/* <MSegregratorComponent title={'Personal Information'}/> */}
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-4 col-span-6'>
                    <MNTextInputComponent isDisabled={isDisabled}
                        label={'Full Name'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.fullName'}
                        withAsterik={!isDisabled}
                    />
                </div>
                <div className='md:col-span-4 col-span-12'>
                    <MNTextInputComponent
                        type="email" isDisabled={true}
                        label={'Email'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.email'}
                        withAsterik={!isDisabled}
                    />
                </div>
                <div className='md:col-span-4 col-span-12'>
                    <MNNumberInputComponent
                        minLength={10} isDisabled={isDisabled}
                        maxLength={10}
                        withAsterik={!isDisabled}
                        label="Mobile"
                        hideControls={true}
                        form={form} size={'xs'}
                        formKey={'personalInformation.mobile'}
                    />
                </div>
                {/* <div className='md:col-span-4 col-span-6'>
                                                    <MNTextInputComponent
                                                        label={'Last Name'}
                                                        form={form} size={'xs'}
                                                        formKey={'personalInformation.lastName'}
                                                        withAsterik={true}
                                                    />
                                                </div>
                                                <div className='md:col-span-4 col-span-12'>
                                                    <MNDatePickerInputComponent
                                                          withAsterik={true}
                                                         clearable={!isDisabled}
                                                         label="Date Of Birth"
                                                         form={form} size={'xs'}
                                                         formKey={'personalInformation.dob'}
                                                    />
                                                </div> */}
            </div>
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-4 col-span-12'>
                    {/* <h5 className='font-medium text-[14px]'>Gender<span className='text-red-600'>*</span></h5> */}
                    <MNSelectComponent isDisabled={isDisabled} withAsterik={!isDisabled}
                        formKey={'personalInformation.genderId'}
                        label="Gender"
                        value={form.getValues()?.personalInformation?.genderId}
                        form={form} size={'xs'}

                        dataSource={md_gender?.map(el => { return { value: el.genderId.toString(), label: el.genderName } })}
                    />
                </div>
                <div className='md:col-span-4 col-span-12'>
                    <MNDatePickerInputComponent
                        clearable={!isDisabled} isDisabled={isDisabled} withAsterik={!isDisabled}
                        label="Date Of Birth"
                        form={form} size={'xs'}
                        formKey={'personalInformation.dateOfBirth'}
                    />
                </div>

            </div>
            <MSegregratorComponent title={'Current Residence'} />
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent
                        formKey={'personalInformation.currentResidenceCountryId'}
                        label="Country" isDisabled={isDisabled}
                        defaultValue={form.getValues()?.personalInformation?.currentResidenceCountryId}
                        form={form} size={'xs'}
                        withAsterik={false}
                        dataSource={md_country?.map(el => { return { value: el.countryId.toString(), label: el.countryName } })}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent isDisabled={isDisabled}
                        formKey={'personalInformation.currentResidenceStateId'}
                        label="State"
                        defaultValue={form.getValues()?.personalInformation?.currentResidenceStateId}
                        form={form} size={'xs'}
                        withAsterik={false}
                        dataSource={md_state?.map(el => { return { value: el.stateId.toString(), label: el.stateName } })}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent
                        formKey={'personalInformation.currentResidenceCity'}
                        label="City" isDisabled={isDisabled}
                        form={form} size={'xs'}
                        defaultValue={form.getValues()?.personalInformation?.currentResidenceCity}
                        withAsterik={false}
                        dataSource={md_city?.map(el => { return { value: el.cityId.toString(), label: el.cityName } })}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent
                        formKey={'personalInformation.regionId'}
                        label="Religion" isDisabled={isDisabled}
                        form={form} size={'xs'}
                        defaultValue={form.getValues()?.personalInformation?.regionId}
                        withAsterik={false}
                        dataSource={md_region?.map(el => { return { value: el.regionId.toString(), label: el.regionName } })}
                    />

                </div>
            </div>
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-3 col-span-12 space-y-1'>
                    <MNSelectComponent isDisabled={isDisabled}
                        formKey={'personalInformation.maritialStatusId'}
                        label="Maritial Status"
                        value={form.getValues()?.personalInformation?.maritialStatusId}
                        form={form} size={'xs'}
                        withAsterik={false}
                        dataSource={md_maritialStatus?.map(el => { return { value: el.maritialStatusId.toString(), label: el.maritialStatusName } })}
                    />
                </div>

            </div>
            <MSegregratorComponent title={'Native Place'} />

            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent
                        formKey={'personalInformation.nativeCountryId'}
                        label="Country" isDisabled={isDisabled}
                        form={form} size={'xs'}
                        defaultValue={form.getValues()?.personalInformation?.nativeCountryId}
                        withAsterik={false}
                        dataSource={md_country?.map(el => { return { value: el.countryId.toString(), label: el.countryName } })}
                    />

                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNSelectComponent
                        formKey={'personalInformation.nativeStateId'}
                        label="State" isDisabled={isDisabled}
                        form={form} size={'xs'}
                        defaultValue={form.getValues()?.personalInformation?.nativeStateId}
                        withAsterik={false}
                        dataSource={md_state?.map(el => { return { value: el.stateId.toString(), label: el.stateName } })}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'City'} isDisabled={isDisabled}
                        form={form} size={'xs'}
                        formKey={'personalInformation.nativeCity'}
                        withAsterik={false}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        minLength={12}
                        maxLength={12}
                        type="text" isDisabled={isDisabled}
                        label={'Aadhaar'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.aadhaarCard'}
                        withAsterik={false}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        minLength={10}
                        maxLength={10}
                        type="text"
                        label={'PAN'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.panCard'}
                        withAsterik={false} isDisabled={isDisabled}
                    />

                </div>
            </div>
            <MSegregratorComponent title={'Other Information'} />
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Linked In URL'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.linkedInURL'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Personal Website'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.personalWebsite'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Current Employer'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.currentEmployer'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Current Designation'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.currentDesignation'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Current Department'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.currentDept'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNTextInputComponent
                        label={'Current Government Inst. Flag'}
                        form={form} size={'xs'}
                        formKey={'personalInformation.currentGovtInstFlag'}
                        withAsterik={false} isDisabled={isDisabled}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNDatePickerInputComponent
                        withAsterik={!isDisabled}
                        isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Current Start Date"
                        form={form} size={'xs'}
                        formKey={'personalInformation.currentStartDate'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false}
                        isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Current CTC"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.currentCTC'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={!isDisabled}
                        isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Expected CTC"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.expectedCTC'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Notice Perios Days"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.noticePeriodDays'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Teaching Experience Year"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.totalTeachingExperienceYears'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Industry Experience Year"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.totalIndustryExperienceYears'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Reasearch Experience Year"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.totalResearchExperienceYears'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <h5 className='font-medium text-[14px]'>Phd Awarded</h5>
                    <MNSegmentControlComponent isDisabled={isDisabled}
                        dataSource={[
                            {
                                "label": "Yes",
                                "value": "Y"
                            },
                            {
                                "label": "No",
                                "value": "N"
                            }
                        ]}
                        form={form} size={'xs'}
                        formKey={'personalInformation.phdAwarded'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Phd Topic"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.phdTopic'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Number Of Phd Guided"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.numberOfPhdGuided'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNNumberInputComponent
                        withAsterik={false} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Number Of Phd Guiding"
                        form={form} size={'xs'}
                        hideControls={true}
                        formKey={'personalInformation.numberOfPhdGuiding'}
                    />
                </div>
                <div className='md:col-span-3 col-span-6'>
                    <MNDatePickerInputComponent
                        withAsterik={!isDisabled} isDisabled={isDisabled}
                        clearable={!isDisabled}
                        label="Applied Date"
                        form={form} size={'xs'}
                        formKey={'personalInformation.appliedDate'}
                    />
                </div>
            </div>
            <MSegregratorComponent title={'Document Uploads'} />
            <div className='grid grid-cols-12 gap-3'>
                <div className='md:col-span-12 col-span-12'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h5 className='font-medium text-[14px]'>{!isDisabled ? 'Upload' : 'View your'} Photo {!isDisabled && <span className='text-destructive'>*</span>}</h5>
                            {!isDisabled && <Text className='text-[10px] font-PoppinsMedium text-card-foreground/50'>
                                (Allowed formats: JPG, JPEG, PNG)
                            </Text>}

                        </div>
                        {!isDisabled ? <FileInput
                            placeholder="Pick file"
                            accept="image/*"
                            value={form.values.personalInformation.photoPath}
                            {...form.getInputProps("personalInformation.photoPath")}
                        /> : <Button loading={loader_photo} size='xs' fw={'normal'} color={'red'} onClick={() => {
                            viewFileinotherTab('photoPath')
                        }}>
                            <span className='text-xs font-PoppinsRegular'>View Photo</span>
                            <ArrowUpRight size={15} />
                        </Button>}
                    </div>

                </div>
                <div className='md:col-span-12 col-span-12'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h5 className='font-medium text-[14px]'>{!isDisabled ? 'Upload' : 'View your'} Resume {!isDisabled && <span className='text-destructive'>*</span>}</h5>
                            {!isDisabled && <Text className='text-[10px] font-PoppinsMedium text-card-foreground/50'>
                                (Allowed formats: pdf • Max size: 5 MB)
                            </Text>}
                        </div>
                        {!isDisabled ? <FileInput
                            placeholder="Pick file"
                            accept="application/pdf"
                            {...form.getInputProps("personalInformation.resumePath")}
                            value={form.values.personalInformation.resumePath}
                        /> : <Button loading={loader_resume} size='xs' fw={'normal'} color={'red'} onClick={() => {
                            viewFileinotherTab('resumePath')
                        }}>
                            <span className='text-xs font-PoppinsRegular'>View Resume</span>
                            <ArrowUpRight size={15} />
                        </Button>}
                    </div>

                </div>

                <div className='md:col-span-12 col-span-12 space-y-2'>
                    <h5 className='font-medium text-[14px]'>Resume In Text</h5>
                    <JoditEditor
                        ref={editor}
                        value={form?.value?.personalInformation.resumeInText}
                        config={{
                            disabled: isDisabled,
                            readonly: isDisabled,
                            placeholder: "Enter description...",
                            height: 300,
                        }}
                        onBlur={(newContent) => form.setFieldValue('personalInformation.resumeInText', newContent)} // ✅ use onBlur
                        onChange={() => { }} // prevent excessive re-renders
                    />
                </div>
            </div>


        </div>
    )
}

export default PersonalInfoComponent
