import React, { useEffect, useState } from 'react'
import { schemas } from './zodSchema';
import { initialValues } from './initialValues';
import { useForm, zodResolver } from '@mantine/form';
import MStepperComp from '../component/MStepper';
import stepperList from '@/assets/json/NewFacultyPositionStepper.json';
import { Button, Card, Group, SegmentedControl, Select, useMantineTheme } from '@mantine/core';
import { MoveLeft , MoveRight  } from 'lucide-react';
import PersonalInfoComponent from '../component/FormComp/PersonalInfo';
import AcademicProfessionalQualificationComponent from '../component/FormComp/AcademicProfessionalQualification';
import ExprienceInComponent from '../component/FormComp/ExprienceIn';
import PeerRecognitionAwardsComponent from '../component/FormComp/PeerRecognitionAwards';
import OtherInformationComponent from '../component/FormComp/OtherInformation';
import CompletedComponent from '../component/FormComp/Completed';
import { CarrerCallApi } from '@/services/dbIntr';
import { AREA, CAMPUS, CITY, COUNTRY, DEPARTMENT, DIVISION, EDUCATION_MODE, JOB_NATURE, POSITION, REGION, STATE } from '@/model/Api';

const filterObjectWithKeyString = (
    object,
    _key
) => {
    let newObject = {};

    for (const key in object) {
        if (
            Object.prototype.hasOwnProperty.call(object, key) &&
            _key.filter(el => key.includes(el)).length > 0
        ) {
            newObject[key] = object[key];
        }
    }

    return newObject;
};
const NonAcademicPositionsScreen = () => {
    const theme = useMantineTheme();
    const [md_country,setCountry] = useState([]);
    const [md_city,setCity] = useState([]);
    const [md_position,setPosition] = useState([]);
    const [md_department,setDepartment] = useState([]);
    const [md_area,setArea] = useState([]);
    const [md_state,setState] = useState([]);
    const [md_educationMode,setEducationMode] = useState([]);
    const [md_division,setDivision] = useState([])
    const [md_region,setRegion] = useState([]);
    const [md_jobnature,setJobNature] = useState([]);
    const [md_campus,setCampus] = useState([])

    const [md_stepper_list, setStepper] = useState(stepperList.filter(el => el.isVisible.includes('N')));
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 12 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: initialValues,
        validate: (values) => {
            let resolver = zodResolver(schemas)(values);
            if (active === 0) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation"]);
            }
            else if (active === 1) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation"]);
            }
            else if (active == 2) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation", "academicProfessionalQualification"]);
            }
            else if (active == 5) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation", "academicProfessionalQualification", "otherInformation"]);
            }
            else {
                resolver = null
            }
            return resolver;
        }
    })

    useEffect(()=>{
        console.log(active);
        console.log(md_stepper_list);
        if(active == 0){
            fetchCity();
            fetchCountry();
            fetchState();
            fetchRegion();
        }
        else if(active == 1){
            fetchPosition();
            fetchArea();
            fetchDepartment();
        }
        else if(active == 2){
            fetchEducationMode();
            fetchDivision();
        }
        else if(active == 3){
            fetchJobNature();
        }
        else if(active == 5){
            fetchCampus();
        }
  },[active])


  const fetchCampus = async () =>{
            if(md_campus.length == 0){
                const campusResponse = await CarrerCallApi(0,CAMPUS.getAll,null);
                if(campusResponse?.request.status == 200){
                    if(campusResponse?.data.isValid){
                        setCampus(campusResponse.data.list);
                    }
                }
            }
    }
  const fetchJobNature = async () =>{
        if(md_jobnature.length == 0){
            const jobnature_response = await CarrerCallApi(0,JOB_NATURE.getAll,null);
            if(jobnature_response.request.status == 200){
                if(jobnature_response?.data.isValid){
                    setJobNature(jobnature_response?.data.list);
                }       
            }
        } 
    }


  const fetchPosition = async() =>{
    if(md_position.length == 0){
        const position_response = await CarrerCallApi(0,POSITION.getAll,null);
        if(position_response?.request.status == 200){
            if(position_response?.data.isValid){
                setPosition(position_response?.data.list);
            }
        }
    }
   }

   const fetchDepartment = async() =>{
    if(md_department.length == 0){
        const department_response = await CarrerCallApi(0,DEPARTMENT.getAll,null);
        if(department_response?.request.status == 200){
            if(department_response?.data.isValid){
                setDepartment(department_response?.data.list);
            }
        }
    }
   }

   
   const fetchEducationMode = async () =>{
    if(md_educationMode.length == 0){
        const educationmode_response = await CarrerCallApi(0,EDUCATION_MODE.getAll,null);
        if(educationmode_response.request.status == 200){
            if(educationmode_response?.data.isValid){
                setEducationMode(educationmode_response?.data.list);
            }       
        }
    }
   }

   const fetchDivision = async() =>{
    if(md_division.length == 0){
        const division_response = await CarrerCallApi(0,DIVISION.getAll,null);
        if(division_response.request.status == 200){
            if(division_response?.data.isValid){
                setDivision(division_response?.data.list);
            }       
        }
    }
    }

  const fetchState = async() =>{
    if(md_state.length == 0){
        const state_response = await CarrerCallApi(0,STATE.getAll,null);
        if(state_response?.request.status == 200){
            if(state_response?.data.isValid){
                setState(state_response?.data.list);
            }
        }
    }
   }

   const fetchArea = async() =>{
    if(md_area.length == 0){
        const area_response = await CarrerCallApi(0,AREA.getAll,null);
        if(area_response.request.status == 200){
            if(area_response?.data.isValid){
                setArea(area_response?.data.list);
            }       
        }
    }
    }

   const fetchCountry = async () =>{
        if(md_country.length == 0){
            const country_response = await CarrerCallApi(0,COUNTRY.getAll,null);
            if(country_response?.request.status == 200){
                if(country_response?.data.isValid){
                    setCountry(country_response?.data.list);
                }
            }
        }
    }

    const fetchRegion = async () =>{
        if(md_region.length == 0){
            const region_response = await CarrerCallApi(0,REGION.getAll,null);
            if(region_response.request.status == 200){
                if(region_response?.data.isValid){
                    setRegion(region_response?.data.list);
                }       
            }
        }
    }

    
    const fetchCity = async () =>{
        if(md_city.length == 0){
            const city_response = await CarrerCallApi(0,CITY.getAll,null);
            if(city_response?.request.status == 200){
                if(city_response?.data.isValid){
                    setCity(city_response?.data.list);
                }
            }
        }
    }

    return (
        <div className='container mx-auto'>
            <form onSubmit={form.onSubmit((values) => {
                nextStep()
                if (active == 11) {
                    console.log(values)
                }
            })}>

                <div className='grid grid-cols-12 gap-3 my-2'>
                    <div className='md:col-span-3 col-span-12 h-full'>
                        <Card my={20} radius="sm" shadow='xs' withBorder className='h-[calc(100%_-_1.25rem)]'>
                            <Card.Section className='p-2'>
                                <MStepperComp
                                    active={active}
                                    setActive={setActive}
                                    stepperLists={md_stepper_list}
                                    orientation={'vertical'}
                                />
                            </Card.Section>
                        </Card>
                    </div>
                    <div className={`md:col-span-9 col-span-12 h-full`}>
                    <h2 my={20} className='underline my-5 text-xl font-semibold underline-offset-8 text-red-500'>
                                {
                                    md_stepper_list[active]?.label
                                }
                            </h2>
                            <Card mb={20} radius="sm" shadow='xs' className={active == 12 ? 'h-[calc(100%_-_1.25rem)] flex items-center justify-center' : ''}>
                                
                                <Card.Section p={0}>
                                    {/* Application Information */}
                                    {
                                        active == 1 &&    <div className='container mx-auto  p-5'>
                                                            <div className='grid grid-cols-12 gap-6'>
                                                                <div className='col-span-5'>
                                                                    <Select
                                                                        withAsterisk
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        key={form.key('applicationInformation.departmentId')}
                                                                        label="Department"
                                                                        placeholder="Select Department"
                                                                        data={md_department?.map(el => {return {value:el.departmentId.toString(),label:el.departmentName}})}
                                                                        {...form.getInputProps('applicationInformation.departmentId')}
                                                                    />
                                                                </div>
                                                                <div className='col-span-5'>
                                                                    <Select
                                                                        withAsterisk
                                                                        key={form.key('applicationInformation.positionId')}
                                                                        label="Position"
                                                                        placeholder="Select Position"
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        data={md_position?.map(el => {return {value:el.positionId.toString(),label:el.positionName}})}
                                                                        {...form.getInputProps('applicationInformation.positionId')}
                                                                    />
                                                                </div>
                                                                <div className='col-span-2'>
                                                                    <h5 className='font-medium text-[14px]'>Nature Of Job<span className='text-red-600'>*</span></h5>
                                                                    <SegmentedControl
                                                                        onChange={(e) => form.setFieldValue('applicationInformation.natureOfJobId', e)}
                                                                        key={form.key('applicationInformation.natureOfJobId')}
                                                                        {...form.getInputProps('applicationInformation.natureOfJobId')}
                                                                        data={[
                                                                            { label: 'Full-Time', value: 'Full-Time' }
                                                                        ]}
                                                                    />
                                                                </div>
                                                                <div className='col-span-3'>
                                                                    <Select
                                                                        withAsterisk
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        key={form.key('applicationInformation.preferredLocationId_1')}
                                                                        label="Preferred Location 1"
                                                                        placeholder="Select Preferred Location 1"
                                                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                                                        {...form.getInputProps('applicationInformation.preferredLocationId_1')}
                                                                    />
                                                                </div>
                                                                <div className='col-span-3'>
                                                                    <Select
                                                                        withAsterisk
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        key={form.key('applicationInformation.preferredLocationId_2')}
                                                                        label="Preferred Location 2"
                                                                        placeholder="Select Preferred Location 2"
                                                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                                                        {...form.getInputProps('applicationInformation.preferredLocationId_2')}
                                                                    />
                                                                </div>
                                                                <div className='col-span-3'>
                                                                    <Select
                                                                        withAsterisk
                                                                        searchable
                                                                        nothingFoundMessage="Nothing found..."
                                                                        checkIconPosition="right"
                                                                        key={form.key('applicationInformation.preferredLocationId_3')}
                                                                        label="Preferred Location 3"
                                                                        placeholder="Select Preferred Location 3"
                                                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                                                        {...form.getInputProps('applicationInformation.preferredLocationId_3')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                    }
                                    {/* End */}
                                    {/* Personal Information */}
                                    {
                                        active == 0 && <PersonalInfoComponent  md_state={md_state} 
                                        md_country={md_country} 
                                        md_city={md_city} 
                                        form={form}
                                        md_region={md_region}  />
                                    }
                                    {/* End */}

                                    {/* Academic / Professional Qualification  AcademicProfessionalQualificationComponent*/}
                                    {
                                        active == 2 && <AcademicProfessionalQualificationComponent
                                        md_country={md_country} 
                                        md_educationMode={md_educationMode}
                                        md_division={md_division}
                                        md_area={md_area}
                                        form={form} />
                                    }
                                    {/* End */}

                                    {/* Exprience In */}
                                    {
                                        active == 3 && <ExprienceInComponent 
                                        md_jobnature={md_jobnature}
                                        md_country={md_country}
                                        md_position={md_position}
                                        hasAcademic={false} form={form} />
                                    }
                                    {/* End */}

                                    {/* Peer Recognition / Awards */}
                                    {
                                        active == 4 && <PeerRecognitionAwardsComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Other Information */}
                                    {
                                        active == 5 && <OtherInformationComponent md_campus={md_campus} form={form} />
                                    }
                                    {/* End */}

                                    {/* On Completion */}
                                    {
                                        active == 6 && <CompletedComponent />
                                    }
                                    {/* End */}
                                    {active < 6 && <Group justify="end" mt="xs" mb='xl' px={'xl'}>
                                            {active > 0 &&<Button variant="default" onClick={prevStep}>
                                                <MoveLeft />     
                                                Back</Button>}
                                        <Button type="submit" bg={theme.colors.red[6]}>Next
                                            <MoveRight  />
                                        </Button>
                                    </Group>}
                                </Card.Section>
                            </Card>



                        </div>
                </div>
            </form>
        </div>

    )
}

export default NonAcademicPositionsScreen
