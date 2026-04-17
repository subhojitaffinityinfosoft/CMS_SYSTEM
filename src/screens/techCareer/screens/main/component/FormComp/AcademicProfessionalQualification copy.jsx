import React from 'react'
import MSegregratorComponent from '../MSegregrator'
import { NumberInput, Select, TextInput ,ActionIcon,SegmentedControl,Divider} from '@mantine/core'
import { Plus, Trash } from 'lucide-react';
import MNSelectComponent from '../ux/MNSelect';
import MNTextInputComponent from '../ux/MNTextInput';
import MNNumberInputComponent from '../ux/MNNumberInput';

const AcademicProfessionalQualificationComponent = ({form,md_country,md_educationMode,md_division,md_area}) => {
    // //console.log(form?.getValues().academicProfessionalQualification.Mphil)
    return (
    <div className=' p-2'>
    <MSegregratorComponent title={'Higher Secondary'}/>
    <div className='grid grid-cols-12 gap-3'>
        <div className='md:col-span-3 col-span-6'>
            <MNSelectComponent
                withAsterik={true}
                size={'xs'}
                form={form}
                defaultValue={form.getValues()?.academicProfessionalQualification?.higherSecondary?.countryId}
                formKey={'academicProfessionalQualification.higherSecondary.countryId'}
                label="Country"
                dataSource={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
            />
        </div>
        <div className='md:col-span-3 col-span-6'>
            <MNSelectComponent
                size={'xs'}
                withAsterik={true}
                form={form}
                defaultValue={form.getValues()?.academicProfessionalQualification?.higherSecondary?.educationModeId}
                formKey={'academicProfessionalQualification.higherSecondary.educationModeId'}
                label="Education Mode"
                dataSource={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
            />
        </div>
        <div className='md:col-span-3 col-span-6'>
            <MNTextInputComponent
                size={'xs'}
                form={form}
                
                formKey={'academicProfessionalQualification.higherSecondary.schoolName'}
                label={'School'}
                type={'text'}
                withAsterik={true}
            />
        </div>
        <div className='md:col-span-3 col-span-6'>
            <MNTextInputComponent
                size={'xs'}
                form={form}
                formKey={'academicProfessionalQualification.higherSecondary.boardName'}
                label={'Board'}
                type={'text'}
                withAsterik={true}
            />
        </div>
    </div>
    <div className='grid grid-cols-12 gap-3 my-2'>

        <div className='md:col-span-3 col-span-6'>
            <MNNumberInputComponent
                size={'xs'}
                label={'Passing Year'}
                formKey={'academicProfessionalQualification.higherSecondary.passingYear'}
                form={form}
                minLength={4}
                maxLength={4}
                hideControls={true}
            />
        </div>

        <div className='md:col-span-3 col-span-6'>
            <MNSelectComponent
                size={'xs'}
                form={form}
                defaultValue={form.getValues()?.academicProfessionalQualification.higherSecondary.divisionId}

                formKey={'academicProfessionalQualification.higherSecondary.divisionId'}
                label={'Division'}
                withAsterisk={true}
                dataSource={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
            />
        </div>
        <div className='md:col-span-3 col-span-12'>
            <MNNumberInputComponent
                size={'xs'}
                label={'% aggregate marks'}
                withAsterisk={true}
                hideControls={true}
                formKey={'academicProfessionalQualification.higherSecondary.aggregrateMarks'}
                form={form}
            />
        </div>

    </div>
    <div>
        <MSegregratorComponent title={'Graduate'}/>
        <div className='container'>
            {
                form?.getValues().academicProfessionalQualification.graduate.map((el, index) => {
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                     <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.graduate[`${index}`].countryId}
                                        formKey={`academicProfessionalQualification.graduate.${index}.countryId`}
                                        label="Country"
                                        dataSource={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.graduate[`${index}`].educationModeId}
                                        formKey={`academicProfessionalQualification.graduate.${index}.educationModeId`}
                                        label="Education Mode"
                                        dataSource={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        formKey={`academicProfessionalQualification.graduate.${index}.universityStateName`}
                                        label={'University/Institute'}
                                        type={'text'}
                                        withAsterik={index == 0}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        formKey={`academicProfessionalQualification.graduate.${index}.collegeName`}
                                        label={'College'}
                                        type={'text'}
                                        withAsterik={index == 0}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={'Graduation Year'}
                                        formKey={`academicProfessionalQualification.graduate.${index}.graduationYear`}
                                        form={form}
                                        hideControls={true}
                                        withAsterisk={index == 0}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.graduate[`${index}`].areaId}

                                        formKey={`academicProfessionalQualification.graduate.${index}.areaId`}
                                        label="Area"
                                        dataSource={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                    />
                                </div>
                                <div className="md:col-span-3 col-span-6">
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.graduate.${index}.courseName`}
                                        withAsterik={index == 0}
                                        label={'Course Name'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.graduate[`${index}`].divisionId}
                                        formKey={`academicProfessionalQualification.graduate.${index}.divisionId`}
                                        label="Division"
                                        dataSource={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={'% aggregate marks'}
                                        withAsterisk={index == 0}
                                        hideControls={true}
                                        formKey={`academicProfessionalQualification.graduate.${index}.aggregrateMarks`}
                                        form={form}
                                    />
                                </div>
                                <div className='md:col-span-9 col-span-6 flex items-end justify-end'>
                                            {
                                                index < (form?.getValues().academicProfessionalQualification.graduate.length - 1) && <ActionIcon color="red"

                                                    onClick={() => form?.removeListItem('academicProfessionalQualification.graduate', index)}>
                                                    <Trash size="1rem" />
                                                </ActionIcon>
                                            }

                                            {
                                                index == (form?.getValues().academicProfessionalQualification.graduate.length - 1) && <ActionIcon size="md" variant='outline'

                                                    onClick={() => {
                                                        form?.insertListItem('academicProfessionalQualification.graduate', {
                                                            countryId: '',
                                                            educationModeId: '',
                                                            universityStateName: '',
                                                            collegeName: '',
                                                            graduationYear: '',
                                                            areaId: '',
                                                            courseName: '',
                                                            divisionId: '',
                                                            aggregrateMarks: ''
                                                        })
                                                    }}
                                                    radius={'sm'} aria-label="Has disabled styles but still interactive">
                                                    <Plus />
                                                </ActionIcon>
                                            }

                                        </div>
                            </div>
                        </div>
                        {index == (form?.getValues().academicProfessionalQualification.graduate.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>
        <MSegregratorComponent title={'Post Graduate'}/>

        <div className='container'>
            {
                form?.getValues().academicProfessionalQualification.postGraduate.map((el, index) => {
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.countryId`}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.postGraduate[`${index}`].countryId}
                                        label="Country"
                                        dataSource={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        withAsterik={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.postGraduate[`${index}`].educationModeId}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.educationModeId`}
                                        label="Education Mode"
                                        dataSource={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.universityStateName`}
                                        withAsterik={index == 0}
                                        label={'University/Institute'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.collegeName`}
                                        withAsterik={index == 0}
                                        label={'College Name'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                           label={'Graduation Year'} 
                                           form={form}
                                           withAsterisk={index == 0}
                                           formKey={`academicProfessionalQualification.postGraduate.${index}.graduationYear`}
                                           hideControls={true}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        label={"Area"}
                                        withAsterisk={index == 0}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.postGraduate[`${index}`].areaId}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.areaId`}
                                        dataSource={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                    />
                                </div>
                                <div className="md:col-span-3 col-span-6">
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.courseName`}
                                        withAsterik={index == 0}
                                        label={'College Name'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.postGraduate[`${index}`].divisionId}
                                        label={"Division"}
                                        withAsterisk={index == 0}
                                        form={form}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.divisionId`}
                                        dataSource={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={"% Aggregate Marks"}
                                        hideControls={true}
                                        withAsterisk={index == 0}
                                        form={form}
                                        formKey={`academicProfessionalQualification.postGraduate.${index}.aggregrateMarks`}
                                    />
                                </div>
                                <div className='md:col-span-9 col-span-6 flex items-end justify-end'>
                                    {
                                        index < (form?.getValues().academicProfessionalQualification.postGraduate.length - 1) && <ActionIcon color="red"

                                            onClick={() => form?.removeListItem('academicProfessionalQualification.postGraduate', index)}>
                                            <Trash size="1rem" />
                                        </ActionIcon>
                                    }

                                    {
                                        index == (form?.getValues().academicProfessionalQualification.postGraduate.length - 1) && <ActionIcon size="md" variant='outline'

                                            onClick={() => {
                                                form?.insertListItem('academicProfessionalQualification.postGraduate', {
                                                    countryId: '',
                                                    educationModeId: '',
                                                    universityStateName: '',
                                                    collegeName: '',
                                                    graduationYear: '',
                                                    areaId: '',
                                                    courseName: '',
                                                    divisionId: '',
                                                    aggregrateMarks: ''

                                                })
                                            }}
                                            radius={'sm'} aria-label="Has disabled styles but still interactive">
                                            <Plus />
                                        </ActionIcon>
                                    }

                                </div>
                            </div>
                        </div>
                        {index == (form?.getValues().academicProfessionalQualification.postGraduate.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>
        <MSegregratorComponent title={'M Phil'}/>

        <div className='container'>
            {
                form?.getValues().academicProfessionalQualification.Mphil.map((el, index) => {
                    //console.log(el);
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.Mphil[`${index}`].countryId}
                                        label={"Country"}
                                        withAsterisk={false}
                                        form={form}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.countryId`}
                                        dataSource={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNSelectComponent
                                        size={'xs'}
                                        label={"Education Mode"}
                                        withAsterisk={false}
                                        form={form}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.Mphil[`${index}`].educationModeId}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.educationModeId`}
                                        dataSource={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.universityStateName`}
                                        withAsterik={false}
                                        label={'University/Institute'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNTextInputComponent
                                        size={'xs'}
                                        form={form}
                                        type={'text'}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.collegeName`}
                                        withAsterik={false}
                                        label={'College'}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <MNNumberInputComponent
                                        size={'xs'}
                                        withAsterik={false}
                                        label={'Graduation Year'}
                                        hideControls={true}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.graduationYear`}
                                        form={form}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <Select
                                        size='xs'
                                        label={"Area"}
                                        key={form?.key(`academicProfessionalQualification.MPhil.${index}.areaId`)}
                                        placeholder="Select Area"
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.MPhil.${index}.areaId`)}
                                    /> */}

                                    <MNSelectComponent
                                        size={'xs'}
                                        label={'Area'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.Mphil[`${index}`].areaId}
                                        dataSource={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                        withAsterik={false}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.areaId`}
                                        form={form}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-12'>
                                    {/* <Select
                                        size='xs'
                                        label={"Division"}
                                        key={form?.key(`academicProfessionalQualification.MPhil.${index}.divisionId`)}
                                        placeholder="Select Division"
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.MPhil.${index}.divisionId`)}
                                    /> */}
                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.Mphil[`${index}`].divisionId}
                                        label={'Division'}
                                        dataSource={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
                                        withAsterik={false}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.divisionId`}
                                        form={form}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <NumberInput
                                        size='xs'
                                        label={"% Aggregate Marks"}
                                        hideControls
                                        key={form?.key(`academicProfessionalQualification.MPhil.${index}.aggregrateMarks`)}
                                        placeholder="Enter Marks in %"
                                        {...form?.getInputProps(`academicProfessionalQualification.MPhil.${index}.aggregrateMarks`)}
                                    /> */}

                                    <MNNumberInputComponent
                                        size={'xs'}
                                        label={"% Aggregate Marks"}
                                        hideControls={true}
                                        withAsterik={false}
                                        formKey={`academicProfessionalQualification.MPhil.${index}.aggregrateMarks`}
                                        form={form}
                                    />
                                </div>
                                <div className='md:col-span-12 col-span-6 flex items-end justify-end'>
                                    {
                                        index < (form?.getValues().academicProfessionalQualification.Mphil.length - 1) && <ActionIcon
                                            
                                        color="red"

                                            onClick={() => form?.removeListItem('academicProfessionalQualification.Mphil', index)}>
                                            <Trash size="1rem" />
                                        </ActionIcon>
                                    }

                                    {
                                        index == (form?.getValues().academicProfessionalQualification.Mphil.length - 1) && <ActionIcon size="md" variant='outline'

                                            onClick={() => {
                                                form?.insertListItem('academicProfessionalQualification.Mphil', {
                                                    countryId: '',
                                                    educationModeId: '',
                                                    universityStateName: '',
                                                    collegeName: '',
                                                    graduationYear: '',
                                                    areaId: '',
                                                    divisionId: '',
                                                    aggregrateMarks: ''
                                                })
                                            }}
                                            radius={'sm'} aria-label="Has disabled styles but still interactive">
                                            <Plus />
                                        </ActionIcon>
                                    }

                                </div>
                            </div>
                        </div>
                     
                        {index == (form?.getValues().academicProfessionalQualification.Mphil.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>
        <MSegregratorComponent title={'Ph.D'}/>

        <div className='container'>
            {
                form?.getValues().academicProfessionalQualification.phD.map((el, index) => {
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <Select
                                        size='xs'
                                        label={"Status"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.statusId`)}
                                        placeholder="Select Status"
                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.statusId`)}
                                    /> */}
                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.phD[`${index}`].statusId}

                                        dataSource={['React', 'Angular', 'Vue', 'Svelte']}
                                        formKey={`academicProfessionalQualification.phD.${index}.statusId`}
                                        form={form}
                                        label={'Status'}
                                        withAsterik={false}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <Select
                                        size='xs'
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        label={"Country"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.countryId`)}
                                        placeholder="Select Country"
                                        data={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.countryId`)}
                                    /> */}

                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.phD[`${index}`].countryId}

                                        dataSource={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                        formKey={`academicProfessionalQualification.phD.${index}.countryId`}
                                        form={form}
                                        label={'Country'}
                                        withAsterik={false}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <Select
                                        size='xs'
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        label={"Education Mode"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.educationModeId`)}
                                        placeholder="Select Education Mode"
                                        data={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.educationModeId`)}
                                    /> */}
                                    <MNSelectComponent
                                        size={'xs'}
                                        defaultValue={form.getValues()?.academicProfessionalQualification.phD[`${index}`].educationModeId}
                                        dataSource={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                        formKey={`academicProfessionalQualification.phD.${index}.educationModeId`}
                                        form={form}
                                        label={'Education Mode'}
                                        withAsterik={false}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <TextInput
                                        size='xs'
                                        label={"University/Institute"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.universityStateName`)}
                                        placeholder="Enter University/Institute"
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.universityStateName`)}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-6'>
                                    <TextInput
                                        size='xs'
                                        label={"College Name"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.collegeName`)}
                                        placeholder="Enter College"
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.collegeName`)}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-6'>
                                    <NumberInput
                                        size='xs'
                                        label={"Completion Year"}
                                        hideControls
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.completionYear`)}
                                        placeholder="Enter Completion Year"
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.completionYear`)}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-12'>
                                    {/* <TextInput
                                        size='xs'
                                        label={"Area"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.area`)}
                                        placeholder="Enter Area"
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.area`)}
                                    /> */}
                                    <Select
                                        size='xs'
                                        value={form.getValues()?.academicProfessionalQualification.phD[`${index}`].areaId ?? ''}
                                        label={"Area"}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.areaId`)}
                                        placeholder="Select Area"
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.areaId`)}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-12 space-y-2'>
                                    <h5 className='text-[12px] font-medium'>
                                        If pursuing,teaching experience during PhD
                                    </h5>
                                    <SegmentedControl
                                        h={38}
                                        onChange={(e) => form?.setFieldValue(`academicProfessionalQualification.phD.${index}.hasTeachingExprience`, e)}
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.hasTeachingExprience`)}
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.hasTeachingExprience`)}
                                        data={[
                                            { label: 'Yes', value: 'yes' },
                                            { label: 'No', value: 'no' },
                                        ]}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-8'>
                                    <NumberInput
                                        size='xs'
                                        label={"Anticipated Completion Year"}
                                        hideControls
                                        key={form?.key(`academicProfessionalQualification.phD.${index}.anticipatedCompletionYear`)}
                                        placeholder="Enter Anticipated Completion Year"
                                        {...form?.getInputProps(`academicProfessionalQualification.phD.${index}.anticipatedCompletionYear`)}
                                    />
                                </div>
                                <div className='md:col-span-4 col-span-4 flex items-end justify-end'>
                                        {
                                            index < (form?.getValues().academicProfessionalQualification.phD.length - 1) && <ActionIcon color="red"

                                                onClick={() => form?.removeListItem('academicProfessionalQualification.phD', index)}>
                                                <Trash size="1rem" />
                                            </ActionIcon>
                                        }

                                        {
                                            index == (form?.getValues().academicProfessionalQualification.phD.length - 1) && <ActionIcon size="md" variant='outline'

                                                onClick={() => {
                                                    form?.insertListItem('academicProfessionalQualification.phD', {
                                                        statusId: '',
                                                        countryId: '',
                                                        educationModeId: '',
                                                        universityStateName: '',
                                                        collegeName: '',
                                                        completionYear: '',
                                                        areaId: '',
                                                        hasTeachingExprience: 'no',
                                                        anticipatedCompletionYear: ''

                                                    })
                                                }}
                                                radius={'sm'} aria-label="Has disabled styles but still interactive">
                                                <Plus />
                                            </ActionIcon>
                                        }

                                    </div>
                            </div>
                        </div>
                        {index == (form?.getValues().academicProfessionalQualification.phD.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>
        <MSegregratorComponent  title={'Post Doctoral'}/>
        <div className='container'>
            {
                form?.getValues().academicProfessionalQualification.postDoctoral.map((el, index) => {
                    return <div className={`grid grid-cols-12 gap-2 min-w-screen`} key={index}>
                        <div className='col-span-12'>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className='md:col-span-3 col-span-6'>
                                    <Select
                                        size='xs'
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        label={"Country"}
                                        value={form.getValues()?.academicProfessionalQualification.postDoctoral[`${index}`].countryId ?? ''}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.countryId`)}
                                        placeholder="Select Country"
                                        data={md_country.map(el => {return {value:el.countryId.toString(),label:el.countryName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.countryId`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <Select
                                        size='xs'
                                        searchable
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        label={"Education Mode"}
                                        value={form.getValues()?.academicProfessionalQualification.postDoctoral[`${index}`].educationModeId ?? ''}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.educationModeId`)}
                                        placeholder="Select Education Mode"
                                        data={md_educationMode.map(el => {return {value:el.educationModeId.toString(),label:el.educationModeName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.educationModeId`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <TextInput
                                        size='xs'
                                        label={"University/Institute"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.universityStateName`)}
                                        placeholder="Enter University/Institute"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.universityStateName`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <TextInput
                                        size='xs'
                                        label={"College Name"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.collegeName`)}
                                        placeholder="Enter College"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.collegeName`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <NumberInput
                                        size='xs'
                                        label={"Year"}
                                        hideControls
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.year`)}
                                        placeholder="Enter Year"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.year`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    {/* <TextInput
                                        size='xs'
                                        label={"Area"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.area`)}
                                        placeholder="Enter Area"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.area`)}
                                    /> */}
                                     <Select
                                        size='xs'
                                        label={"Area"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.areaId`)}
                                        placeholder="Select Area"
                                        searchable
                                        value={form.getValues()?.academicProfessionalQualification.postDoctoral[`${index}`].areaId ?? ''}
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_area?.map(el => {return {value:el.areaId.toString(),label:el.areaName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.areaId`)}
                                    />
                                </div>
                                <div className="md:col-span-3 col-span-6">
                                    <TextInput
                                        size='xs'
                                        label={"Course Name"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.courseName`)}
                                        placeholder="Enter Course Name"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.courseName`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <Select
                                        size='xs'
                                        label={"Division"}
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.divisionId`)}
                                        placeholder="Select Division"
                                        searchable
                                        value={form.getValues()?.academicProfessionalQualification.postDoctoral[`${index}`].divisionId ?? ''}
                                        nothingFoundMessage="Nothing found..."
                                        checkIconPosition="right"
                                        data={md_division.map(el => {return {value:el.divisionId.toString(),label:el.divisionName}})}
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.divisionId`)}
                                    />
                                </div>
                                <div className='md:col-span-3 col-span-6'>
                                    <NumberInput
                                        size='xs'
                                        label={"% Aggregate Marks"}
                                        hideControls
                                        key={form?.key(`academicProfessionalQualification.postDoctoral.${index}.aggregrateMarks`)}
                                        placeholder="Enter Marks in %"
                                        {...form?.getInputProps(`academicProfessionalQualification.postDoctoral.${index}.aggregrateMarks`)}
                                    />
                                </div>
                                <div className='md:col-span-9 col-span-6 flex items-end justify-end'>
                                        {
                                            index < (form?.getValues().academicProfessionalQualification.postDoctoral.length - 1) && <ActionIcon color="red"

                                                onClick={() => form?.removeListItem('academicProfessionalQualification.postDoctoral', index)}>
                                                <Trash size="1rem" />
                                            </ActionIcon>
                                        }

                                        {
                                            index == (form?.getValues().academicProfessionalQualification.postDoctoral.length - 1) && <ActionIcon size="md" variant='outline'

                                                onClick={() => {
                                                    form?.insertListItem('academicProfessionalQualification.postDoctoral', {
                                                        countryId: '',
                                                        educationModeId: '',
                                                        universityStateName: '',
                                                        collegeName: '',
                                                        year: '',
                                                        areaId: '',
                                                        courseName: '',
                                                        divisionId: '',
                                                        aggregrateMarks: ''

                                                    })
                                                }}
                                                radius={'sm'} aria-label="Has disabled styles but still interactive">
                                                <Plus />
                                            </ActionIcon>
                                        }

                                    </div>
                            </div>
                        </div>
                        {index == (form?.getValues().academicProfessionalQualification.postDoctoral.length - 1) ? '' : <Divider my="md" />}
                    </div>
                })
            }
        </div>

    </div>

</div>
  )
}

export default AcademicProfessionalQualificationComponent
