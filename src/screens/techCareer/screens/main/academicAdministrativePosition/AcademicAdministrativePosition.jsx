import React, { useEffect, useState } from 'react'
import { schemas } from '../schema/zodSchema';
import { initialValues } from '../schema/initialValues';
import { useForm, zodResolver } from '@mantine/form';
import MStepperComp from '../component/MStepper';
import stepperList from '@/assets/json/NewFacultyPositionStepper.json';
import { Button, Card, Group, useMantineTheme } from '@mantine/core';
import { MoveRight } from 'lucide-react';
import ApplicationInfoForResearchAndAccademicPositionComponent from '../component/FormComp/ApplicationInfoForResearchAndAccademicPosition';
import PersonalInfoComponent from '../component/FormComp/PersonalInfo';
import AcademicProfessionalQualificationComponent from '../component/FormComp/AcademicProfessionalQualification';
import QualifiedInComponent from '../component/FormComp/QualifiedIn';
import ExprienceInComponent from '../component/FormComp/ExprienceIn';
import FellowShipComponent from '../component/FormComp/FellowShip';
import ResearchWorkComponent from '../component/FormComp/ResearchWork';
import BookAuthoredCoAuthoredCoEditedComponent from '../component/FormComp/BookAuthoredCoAuthoredCoEdited';
import PatentDetailsComponent from '../component/FormComp/PatentDetails';
import ConsultancyComponent from '../component/FormComp/Consultancy';
import PeerRecognitionAwardsComponent from '../component/FormComp/PeerRecognitionAwards';
import OtherInformationComponent from '../component/FormComp/OtherInformation';
import CompletedComponent from '../component/FormComp/Completed';
import { AREA, CITY, COUNTRY, DIVISION, EDUCATION_MODE, FELLOWSHIP_STATUS, JOB_NATURE, PATENT_STATUS, POSITION, REGION, STATE, WRITTENT } from '@/model/Api';
import { CarrerCallApi } from '@/services/dbIntr';

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

const AcademicAdministrativePositionScreen = () => {
    const theme = useMantineTheme();
    const [md_campus,setCampus] = useState([])
    const [md_position,setPosition] = useState([]);
    const [md_country,setCountry] = useState([]);
    const [md_city,setCity] = useState([]);
    const [md_state,setState] = useState([]);
    const [md_region,setRegion] = useState([]);
    const [md_area,setArea] = useState([]);
    const [md_educationMode,setEducationMode] = useState([]);
    const [md_division,setDivision] = useState([])
    const [md_jobnature,setJobNature] = useState([]);
    const [md_fellowship,setFellowShip] = useState([]);
    const [md_written,setWriiten] = useState([]);
    const [md_patent,setPatent] = useState([]);

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 12 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const form = useForm({
    mode: 'uncontrolled',
    initialValues:initialValues,
    validate:(values)=>{
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
        else if (active == 11) {
            resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation", "academicProfessionalQualification", "otherInformation"]);
        }
        else if (active >= 3 && active <= 10) {
            resolver = null
        }
        return resolver;
    }
  })  

//   useEffect(() =>{
//         console.log(form.errors)
//   },[form.errors])
  useEffect(()=>{
        if(active == 0){
            fetchCity();
            fetchCountry();
            fetchState();
            fetchRegion();
        }
        else if(active == 1){
            fetchPosition();
            fetchArea();
        }
        else if(active == 2){
            fetchEducationMode();
            fetchDivision();
        }
        else if(active == 4){
            fetchJobNature();
        }
        else if(active == 5){
            fetchFellowShipStatus()
        }
        else if(active == 7){
            fetchWritten();
        }
        else if(active == 8){
            fetchPatent();    
        }
        else if(active == 11){
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
  
  const fetchPatent = async() =>{
    if(md_patent.length == 0){
        const patent_response = await CarrerCallApi(0,PATENT_STATUS.getAll,null);
        if(patent_response.request.status == 200){
            if(patent_response?.data.isValid){
                setPatent(patent_response?.data.list);
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

    const fetchWritten = async () =>{
        if(md_written.length == 0){
            const written_response = await CarrerCallApi(0,WRITTENT.getAll,null);
            if(written_response.request.status == 200){
                if(written_response?.data.isValid){
                    setWriiten(written_response?.data.list);
                }       
            }
        }
    }

    const fetchFellowShipStatus = async () =>{
        if(md_fellowship.length == 0){
            const fellowship_response = await CarrerCallApi(0,FELLOWSHIP_STATUS.getAll,null);
            if(fellowship_response?.request.status == 200){
                if(fellowship_response?.data.isValid){
                    setFellowShip(fellowship_response?.data.list);
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


  return (
    <div className='container mx-auto'>
                <form onSubmit={form.onSubmit((values) => {
                    nextStep()
                    if(active == 11){
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
                                        stepperLists={stepperList}
                                        orientation={'vertical'}
                                    />
                                </Card.Section>
                            </Card>
                        </div>
                        <div className={`md:col-span-9 col-span-12`}>
                        <h2 my={20} className='underline my-5 text-xl font-semibold underline-offset-8 text-red-500'>
                                {
                                    stepperList.filter(el => el.id == (active + 1))[0]?.label
                                }
                            </h2>
                            <Card my={20} radius="sm" shadow='xs' className={active == 12 ? 'h-[calc(100%_-_1.25rem)] flex items-center justify-center' : ''}>
                                <Card.Section p={0}>
                                    {/* Application Information */}
                                    {
                                        active == 1 && <ApplicationInfoForResearchAndAccademicPositionComponent 
                                        form={form} md_position={md_position}
                                        md_area={md_area}
                                        
                                        />
                                    }
                                    {/* End */}
                                    {/* Personal Information */}
                                    {
                                        active == 0 && <PersonalInfoComponent 
                                        md_state={md_state} 
                                        md_country={md_country} 
                                        md_city={md_city} 
                                        form={form}
                                        md_region={md_region} 
                                        />
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

                                    {/* Qualified In */}
                                    {
                                        active == 3 && <QualifiedInComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Exprience In */}
                                    {
                                        active == 4 && <ExprienceInComponent 
                                        hasAcademic={true} 
                                        form={form} 
                                        md_jobnature={md_jobnature}
                                        md_country={md_country}
                                        md_position={md_position}
                                        />
                                    }
                                    {/* End */}

                                    {/* Fellow Ship */}
                                    {
                                        active == 5 && <FellowShipComponent 
                                        md_fellowship={md_fellowship}
                                        form={form} />
                                    }
                                    {/* End */}
                                    {/* Research Work */}
                                    {
                                        active == 6 && <ResearchWorkComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Books Authored/co-authored/ edited/co-edited (in last three years) */}

                                    {
                                        active == 7 && <BookAuthoredCoAuthoredCoEditedComponent 
                                        md_written={md_written}
                                        form={form} />
                                    }
                                    {/* End */}
                                    {/* Patent Details */}
                                    {
                                        active == 8 && <PatentDetailsComponent 
                                        md_patent={md_patent}
                                        form={form} />
                                    }
                                    {/* End */}
                                    {/*Consultancy (in last three years)*/}
                                    {
                                        active == 9 && <ConsultancyComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Peer Recognition / Awards */}
                                    {
                                        active == 10 && <PeerRecognitionAwardsComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Other Information */}
                                    {
                                        active == 11 && <OtherInformationComponent md_campus={md_campus} form={form} />
                                    }
                                    {/* End */}

                                    {/* On Completion */}
                                    {
                                        active == 12 && <CompletedComponent />
                                    }
                                    {/* End */}
                                    {active < 12 && <Group justify="end" mt="xs" mb='xl' px={'xl'}>
                                            {active > 0 &&<Button variant="default" onClick={prevStep}>Back</Button>}
                                        <Button type="submit" bg={theme.colors.red[6]}>Next
                                            <MoveRight />
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

export default AcademicAdministrativePositionScreen
