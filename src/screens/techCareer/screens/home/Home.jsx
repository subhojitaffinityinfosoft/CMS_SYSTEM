import React from 'react';
import NavComponent from './nav/Nav'
import { Box, Button, Image} from '@mantine/core';
import classes from './HeroImageRight.module.css';
import {useEffect, useState} from 'react'
import {
    Badge,
    Group,
    Title,
    Text,
    Card,
    Container,
    useMantineTheme,
} from '@mantine/core';
import {MoveRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { FooterLinks } from './nav/Footer';
import { 
    useDisclosure,
    // useDisclosure, 
    useScrollIntoView } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CARRER_MAP, CATEGORY, UNITS } from '@/model/Api';
import { CarrerCallApi } from '@/services/dbIntr';
import { DcryptText, EncryptText } from '@/lib/Storage';
import uuid4 from 'uuid4';
import collegeImg from '@/assets/images/college.png';
import ajkalImg from '@/assets/images/ajkal.png';
import universityImg from '@/assets/images/university.png';
import schoolImg from '@/assets/images/school.png';
import hospitalImg from '@/assets/images/hospital.png';
import hotelImg from '@/assets/images/hotel.png';
import generalImg from '@/assets/images/general.png';
import SignUpComponent from '../Auth/SignUpComponent';


const filterObjectWithKeyString = (
    object,
    _key
) => {
    let newObject = {};
    for (const key in object) {
        if (
            Object.prototype.hasOwnProperty.call(object, key) &&
            key.includes(_key)
        ) {
            newObject[key] = object[key];
        }
    }

    return newObject;
};

const preLoginSignUpSchema = z.object({
    categoryId:z.number({
        required_error:'*please select category!!',
        invalid_type_error:'*please select category!!'
    }),
    unitId:z.number({
        required_error:'*please select unit!!',
        invalid_type_error:'*please select unit!!'
    }),
    careerApplyId:z.number({
        required_error:'*please select this field!!',
        invalid_type_error:'*please select this field!!'
    }),
    unitName:z.string().optional(),
    careerApplyName:z.string().optional(),

})

const signInSchema = z.object({
    mobile: z.number({
        required_error: '*Please provide mobile number',
        invalid_type_error: "*Please provide mobile number"
    }).refine((value) => {
        return value.toString().length == 10
    }, `*Mobile number must be 10 digits long`),
    pin: z.number({
        required_error: '*please provide OTP',
        invalid_type_error: "*Please provide OTP"
    }).refine((value) => {
        return value.toString().length == 5
    }, `*OTP must be 5 digits long`)
})
const HomeScreen = () => {

    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        validate: (values) => {
            let resolver = zodResolver(signInSchema)(values);

            if (step == 1) {
                resolver = filterObjectWithKeyString(resolver, 'mobile');
            }
            else if (step == 2) {
                resolver = filterObjectWithKeyString(resolver, 'pin')
            }
            return resolver;
        }
    })

    const { scrollIntoView, targetRef } = useScrollIntoView({offset: 60});

  
    const preLoginSignUp = useForm({
        // mode: 'uncontrolled',
        mode:'uncontrolled',
        initialValues:{
            categoryId:'',
            unitId:'',
            careerApplyId:'',
            unitName:'',
            careerApplyName:''
        },
        validate: (values) => {
            let resolver = zodResolver(preLoginSignUpSchema)(values);
            if (step_for_selection == 1) {
                resolver = filterObjectWithKeyString(resolver, 'categoryId');
            }
            else if (step_for_selection == 2) {
                resolver = filterObjectWithKeyString(resolver, 'unitId');
            }
            else {
                resolver = filterObjectWithKeyString(resolver, 'careerApplyId')
            }
            return resolver;
        }
    })
    const [searchParams] = useSearchParams();
    const [step_for_selection,setStepForSelection] = useState(1);
    const [applyFor, setApplyFor] = useState(null);
    const [step, setStep] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const [md_category,setCategory] = useState([]);
    const [md_unit,setUnit] = useState([]);
    const [md_career,setCareer] = useState([]);
   
    useEffect(() =>{
        if(!searchParams.get('u') || searchParams.get('u') == 'null' || searchParams.get('u') == 'undefined'){
            fetchCategory();

        }
    },[])

    useEffect(()=>{
            if(searchParams.get('u') && searchParams.get('u')!= 'null' && searchParams.get('u')!= 'undefined'){
                try{
                    const q = DcryptText(searchParams.get('u'));
                    if(q && q != 'ERR'){
                        const final_dt = JSON.parse(DcryptText(searchParams.get('u')))
                         if(final_dt?.unitId && final_dt?.categoryId && typeof(final_dt) == 'object'){
                            //     preLoginSignUp.setValues({
                            //     unitId:Number(DcryptText(final_dt?.unitId)),
                            //     categoryId:Number(DcryptText(final_dt?.categoryId)),
                            //     careerApplyId:''
                            // })   
                            preLoginSignUp.setFieldValue('unitId',Number(DcryptText(final_dt?.unitId)));
                            preLoginSignUp.setFieldValue('categoryId',Number(DcryptText(final_dt?.categoryId)));
                            preLoginSignUp.setFieldValue('careerApplyId','');

                            if(md_unit.length == 0){
                                // fetchCategoryWiseUnit(Number(DcryptText(final_dt?.categoryId)));
                                // fetchCategoryWiseUnit(0);

                            }
                            if(md_career.filter(el => el.unitId == final_dt?.unitId).length == 0){
                                fetchUnitWiseCareer(Number(DcryptText(final_dt?.unitId)));
                            }
                            setStepForSelection(3)
                        }
                    }
                    else{
                    //  console.log(q);
                    // Navigate to 404 page
                    //  navigate('/employee',{replace:'true'});
                    }
                }
                catch(err){
                        // console.log(err);
                        // Navigate to 404 page
                        // navigate('/employee',{replace:'true'});
                }
            }
            else{
                // console.log('not possible to dcrypt');
                // Navigate to 404 page
                // navigate('/employee',{replace:'true'});

            }

    },[searchParams])

    const fetchCategory = async() =>{
            const response = await CarrerCallApi(0,CATEGORY.getAll,null);
            if(response?.request.status == 200){
                    if(response.data.isValid){
                        const category = response.data.list.filter(el => {
                             const img = el.categoryId == 1 ? collegeImg : (el.categoryId == 7 ? universityImg : 
                                (el.categoryId == 2 ? schoolImg : (el.categoryId == 3 ? hospitalImg : (el.categoryId == 4 ? hotelImg : 
                                (el.categoryId == 5 ? generalImg : ajkalImg)))));
                             const description = el.categoryId == 1 ? 'Education is the most powerful weapon which you can use to change the world.' 
                                : (el.categoryId == 3 ? 'The power of community to create health is far greater than any physician, clinic or hospital' 
                                : (el.categoryId == 4 ? 'The great advantage of a hotel is that it is a refuge from home life.' 
                                : (el.categoryId == 6 ? 'The newspaper is a greater treasure to the people than uncounted millions of gold.' 
                                : (el.categoryId == 7 ? 'Study without desire spoils the memory, and it retains nothing that it takes in.' 
                                : (el.categoryId == 5 ? 'You must be the change you wish to see in the world. ' : 'Education is not the filling of a pail, but the lighting of a fire.')))))
                             el.image = img;
                             el.description = description;
                             return el;
                        })
                        setCategory(category);
                    }
            }
    }

    const fetchUnitWiseCareer = async(unitId) =>{
        const response = await CarrerCallApi(0,`${CARRER_MAP.get_all_details_by_unitid}/${Number(unitId)}`,null);
        if(response?.request.status == 200){
            if(response.data.isValid){
                 setCareer(response.data.list);
                preLoginSignUp.setFieldValue('unitName',response.data.list[0].unitName);
            }
        }
    }


    const fetchCategoryWiseUnit = async (categoryId) =>{
        if(categoryId > 0){
            const response = await CarrerCallApi(0,`${UNITS.getbycategoryid}/${Number(categoryId)}`,null);
            if(response?.request.status == 200){
                if(response.data.isValid){
                    //  const    
                    console.log(response.data.list)
                     setUnit(response.data.list.filter(el => el.isCareerApply));
                    //  setStepForSelection(prev => (prev + 1))
                }
            }
        }
        else{
            // setStepForSelection(prev => (prev + 1))
        }
               
    }   

    return (
        <div className='min-h-screen min-w-screen'>
            <div className={classes.root}>
            <NavComponent />

                <Container size="lg" className='flex items-center '>
                    <div className={classes.inner}>
                        <div className={`${classes.content}`}>
                            <Title 
                             variant="gradient"
                             gradient={{ from: '#831b99', to: '#fa5252' }}
                            className={`${classes.title} font-PoppinsMedium`}>
                          
                                <Text
                                    component="span"
                                    inherit
                                    variant="gradient"
                                    gradient={{ deg:45, from: '#831b99', to: '#fa5252' }}
                                > Expanding {' '}
                                    Horizons
                                    {' '}
                                Of Education
                                Research Through Innovation, Social Outreach &amp; Entrepreneurism
                                </Text>
                            </Title>

                            <Text 
                             component="h3"
                             inherit
                             my={20}
                             variant="gradient"
                             gradient={{ deg:90, from: '#831b99', to: '#fa5252' }}
                            className={`${classes.description} text-white mt-7`} >
                                Preparing Students for Success in an ever-changing World
                            </Text>

                            <Button
                              onClick={() => scrollIntoView()}  
                              variant="gradient"
                              gradient={{ deg:90,from: '#831b99', to: '#fa5252' }}
                                size="lg"
                                fw={'normal'}
                                
                                radius={3}
                            >
                               <span  className={`text-sm mx-2 font-PoppinsRegular`}>Get started</span>
                                <MoveRight />
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container size="lg" py="xl" >
                <Group justify="center">
                    <Badge variant="light"  size="lg" color={theme.colors.red[6]}>
                        Best Institute ever
                    </Badge>
                </Group>

                <Title order={2} className={classes.title_card} ta="center" mt="sm">
                    Career
                </Title>

                {/* <Text component='h3' w={'100%'} className={classes.description} ta="center" mt="md" mx={'auto'}>
                    Please fill in the below application form to apply for position at Techno India
                </Text> */}

                <h3 className='text-center my-5  text-muted-foreground text-xs'>
                Please fill in the below application form to apply for position at Techno India <b>{step_for_selection > 2 ? `for ${preLoginSignUp.getValues()?.unitName}` : ''}</b>
                </h3>
                <Box ref={targetRef}>
                    <form onSubmit={preLoginSignUp.onSubmit((values) => {
                                if(step_for_selection == 1){
                                    if(md_unit.filter(el => el.categoryId == values.categoryId).length == 0){
                                        preLoginSignUp.setFieldValue('unitId','')
                                        fetchCategoryWiseUnit(values.categoryId);
                                    }
                                    setStepForSelection(prev => (prev + 1))
                                }
                                else if(step_for_selection == 2){
                                    if(md_career.filter(el => el.unitId == values.unitId).length == 0){
                                        // preLoginSignUp.setValues({
                                        //     careerApplyId:''
                                        // });
                                        preLoginSignUp.setFieldValue('careerApplyId','')

                                        fetchUnitWiseCareer(values.unitId);
                                        const unitId = EncryptText(values.unitId.toString());
                                        const categoryId = EncryptText(values.categoryId.toString());
                                        const queryParams = {
                                            unitId:unitId,
                                            categoryId:categoryId
                                        };
                                        navigate(`/employee?u=${EncryptText(JSON.stringify(queryParams))}`,{replace:true})
                                    }
                                    setStepForSelection(prev => (prev + 1))
                                }
                                else if(step_for_selection == 3){
                                     open();   
                                }
                         })}>
                         <div className='grid grid-cols-12 gap-5'>
                            {/* {
                               step_for_selection == 1 && md_category.map(el =>{
                                        return <SelectionRadioDiv
                                                    key={el.categoryId}
                                                    name={el.categoryName}
                                                    id={el.categoryId}
                                        >
                                            <input type="radio" 
                                                className="peer sr-only" 
                                                checked={el.categoryId == preLoginSignUp?.getValues().categoryId}
                                                onChange={(e) =>{
                                                    // setFormData(el.categoryId)
                                                    preLoginSignUp.setValues({
                                                        categoryId:el.categoryId
                                                    })
                                                }}
                                                name="categoryId" />

                                        </SelectionRadioDiv>
                                })
                            } */}

{
                               step_for_selection == 1 && md_category.map(el =>{
                                        return <Category
                                                key={el.categoryId}
                                                category={el}
                                                onPress={() => {
                                                    // preLoginSignUp.setValues({
                                                    //     categoryId:el.categoryId
                                                    // });
                                                    preLoginSignUp.setFieldValue('categoryId',el.categoryId)

                                                if(md_unit.filter(item => item.categoryId == el.categoryId).length == 0){
                                                    preLoginSignUp.setFieldValue('unitId','');
                                                    fetchCategoryWiseUnit(el.categoryId);
                                                }
                                                    setStepForSelection(prev => (prev + 1))

                                                
                                                }}
                                        />
                                })
                            }

                            {/* {
                               step_for_selection == 2 && md_unit.map(el =>{
                                        return <SelectionRadioDiv
                                                    key={el.unitId}
                                                    name={el.unitName}
                                                    id={el.unitId}
                                        > 
                                        <input type="radio" 
                                        className="peer sr-only" 
                                        checked={el.unitId == preLoginSignUp?.getValues().unitId}
                                        onChange={(e) =>{
                                            // setFormData(el.unitId)
                                            preLoginSignUp.setValues({
                                                unitId:el.unitId
                                            })
                                        }}
                                        name="unitId" />

                                </SelectionRadioDiv>
                                })
                            } */}

                            

                            {
                                step_for_selection == 2 && md_unit.map(el =>{
                                     return <Features 
                                     unit_dtls={el} 
                                     title_key={"unitName"}
                                     description_key={'careerApplydesc'}
                                     key={el.unitId}
                                     onPress={() =>{
                                            // preLoginSignUp.setValues({
                                            //     unitId:el.unitId,
                                            //     unitName:el.unitName
                                            // });
                                            // preLoginSignUp.setFieldValue('unitId',el.unitId);
                                            // preLoginSignUp.setFieldValue('unitName',el.unitName);

                                            const unitId = EncryptText(el.unitId.toString());
                                            const categoryId = EncryptText(el.categoryId.toString());
                                            const queryParams = {
                                                unitId:unitId,
                                                categoryId:categoryId
                                            };

                                            navigate(`/employee?u=${EncryptText(JSON.stringify(queryParams))}`,{replace:true})
                                            setStepForSelection(prev => (prev + 1))

                                            // setStepForSelection(prev => (prev + 1))
                                     }}
                                     />
                                })
                            }

                            {/* {
                               step_for_selection == 3 && md_career.map(el =>{
                                        return <SelectionRadioDiv
                                                    key={el.careerApplyId}
                                                    name={el.careerApplyName}
                                                    id={el.careerApplyId}
                                        >

                                            <input type="radio" 
                                        className="peer sr-only" 
                                        checked={el.careerApplyId == preLoginSignUp?.getValues().careerApplyId}
                                        onChange={(e) =>{
                                            preLoginSignUp.setValues({
                                                careerApplyId:el.careerApplyId
                                            })
                                        }}
                                        name="careerApplyId" />
                                        </SelectionRadioDiv>
                                })
                            } */}
                            {
                                step_for_selection == 3 &&  md_career.map(el =>{
                                     return <Features 
                                     unit_dtls={el} 
                                     title_key={"careerApplyName"}
                                     key={el.careerApplyId}
                                     onPress={() =>{
                                            // preLoginSignUp.setValues({
                                            //     careerApplyId:el.careerApplyId,
                                            //     careerApplyName:el.careerApplyName
                                            // });
                                            preLoginSignUp.setFieldValue('careerApplyId',el.careerApplyId);
                                            preLoginSignUp.setFieldValue('careerApplyName',el.careerApplyName);
                                            open();
                                     }}
                                     />
                                })
                            }
                        </div> 
                        {
                                step_for_selection > 1 && <Box className='flex items-center justify-center'>
                                                <Button variant='transparent' onClick={() => {
                                                    if(step_for_selection == 3){
                                                        if(md_unit.length == 0){
                                                            fetchCategoryWiseUnit(Number(preLoginSignUp.getValues()?.categoryId))
                                                        }
                                                    }
                                                    else if(step_for_selection == 2){
                                                        if(md_category.length == 0){
                                                                fetchCategory();
                                                        }
                                                    }
                                                    setStepForSelection(prev => prev - 1)
                                                }}>
                                                    <ArrowLeft size={15}/> Back
                                                </Button>
                                </Box>
                            }
                    </form>  
                </Box>    

                 
            </Container>

            <SignUpComponent
                opened={opened}
                close={close}
            />
            <FooterLinks />

        </div>
    )
}

const Features = ({unit_dtls,onPress,title_key,description_key}) => (
    <div className='col-span-3'>
       
        <Card   shadow='lg'
                    key={uuid4()}  radius="md" 
                    className={`${classes.card} bg-gradient-to-t from-[#831b99] to-[#fa5252]`} 
                    padding="xs">
            <Text fz="xs" fw={500} className={`${classes.cardTitle} text-white truncate text-ellipsis w-50 text-[8px] font-PoppinsMedium`} mt="md" component='h4'>
                {unit_dtls[title_key]}
            </Text>
             <Text size="xs " lineClamp={2}  className='text-[10px] text-lef text-white'>
                {
                    unit_dtls[description_key] ? unit_dtls[description_key] : ' With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway'
                }
                           
                        </Text>
                        <Box className='flex items-center justify-end'>
                        <Button mt={'sm'} fw={'normal'} className='text-white hover:bg-transparent hover:text-gray-100'  variant="transparent" onClick={onPress}
                            >
                            {title_key == 'careerApplyName' ? 'Apply' : 'Next'} <ArrowRight size={15} />
                            </Button>
                        </Box>
           
        </Card>
        </div>
       
);
const Category = ({category,onPress}) => {
        return <div className='col-span-3 '>
                    <Card component='button' 
                    key={uuid4()}  radius="md" 
                    className={`${classes.card} h-full`} 
                    padding="xs">
                    {/* bg-gradient-to-r from-[#831b99] to-[#fa5252] */}
                    <Card.Section className='bg-gradient-to-r from-[#831b99] to-[#fa5252]'>
                        <Image
                        src={category.image}
                        height={50}
                        alt={category.categoryName}
                        />
                    </Card.Section>

                    <Group justify="space-between" mt="xs" mb="xs">
                            <Text fw={500} className='text-[14px] font-PoppinsMedium'
                              variant="gradient"
                              gradient={{ deg:90, from: '#831b99', to: '#fa5252' }}
                            >{category.categoryName}</Text>
                    </Group>

                    <Text size="xs" c="dimmed" className='text-[10px] text-left'>
                        {
                            category.description ? category.description : '  With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway'
                        }
                      
                    </Text>

                    <Box component='div' className='float-right w-full flex items-center justify-end'>
                                    <Button variant='transparent'  onClick={onPress}>
                                                Apply <ArrowRight size={12}/> 
                                    </Button>
                        </Box>
                       
                    </Card>
        </div>
}
export default HomeScreen
