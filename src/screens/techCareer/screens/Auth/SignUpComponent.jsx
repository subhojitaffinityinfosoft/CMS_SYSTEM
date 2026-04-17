import { ActionIcon, Button, CloseButton, Modal, PasswordInput, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { Radio, Group } from '@mantine/core';
import { LogIn, RefreshCw} from 'lucide-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import MNTextInputComponent from '../main/component/ux/MNTextInput';
import MNDatePickerInputComponent from '../main/component/ux/MNDatePickerInput';
import MNNumberInputComponent from '../main/component/ux/MNNumberInput';
import SignUpSVG from '@/assets/signUp.png';
import captchaIMG from '@/assets/captcha.jpg';
import { useNavigate } from 'react-router-dom';
import { EncryptText, SetStorage } from '@/lib/Storage';
const signUpSchema = z.object({
    firstName: z.string({
        required_error: '*Please provide first name',
    }).min(1,{
        message:'*Please provide first name'
    }),
   lastName: z.string({
    required_error: '*Please provide last name',
    }).min(1,{
        message:'*Please provide last name'
    }),
    dob:z.date({
        invalid_type_error:'*Please provide dob'
    }),
    gender:z.enum(["Male", "Female"], {
        required_error: "*You must select gender",
    }),
    mobileNo:z.number({
        required_error:"*Please provide mobile no.",
        invalid_type_error: '*Please provide mobile no.',
    }).min(10,{
        message:"*Mobile number must be 10 digits", 
    }),
    emailId:z.string().min(1,{
        message:'*Please provide email'
    }).email({
        message:'*Please provide valid email'
    }),
    password:z.string().min(1,{
        message:'*Please provide password'
    }),
    confirmPassword:z.string().min(1,{
        message:'*Please provide password'
    }),
    captcha:z.string().min(1,{
        message:'*Please provide captcha'
    }),
    captchaToBeMatch:z.string().min(1,{
        message:'*Please provide captcha'
    })
    // email: z
    // .string()
    // .min(1, { message: "This field has to be filled." })
    // .email("This is not a valid email.")
    // .refine(async (e) => {
    //   const emails = await fetchEmails();
    //   return emails.includes(e);
    // }, "This email is not in our database")
    }).refine(e => e.password === e.confirmPassword,{
        message:"*Password don't match",
        path:['confirmPassword']
    }).refine(e => e.captchaToBeMatch === e.captcha,{
           message:"*Captcha don't match",
           path:['captcha']
    })
const SignUpComponent = ({opened,close}) => {

  const navigate = useNavigate();
  const signUpForm = useForm(
    {
        mode:'uncontrolled',
        validate:zodResolver(signUpSchema),
        initialValues:{
            firstName:'',
            lastName:'',
            dob:'',
            gender:'Male',
            mobileNo:'',
            emailId:'',
            password:'',
            confirmPassword:'',
            captcha:'',
            captchaToBeMatch:''
        },
        onValuesChange: (values) => {
            // console.log(values);
          },
  })  

  const submitForm = (value) =>{
         const encrypt_txt = EncryptText(JSON.stringify(value));
         if(encrypt_txt != 'ERR'){
            SetStorage(import.meta.env.VITE_CR_SUP,encrypt_txt);
            navigate('/employee/app/NewFacultyPosition');
         }
  }

  useEffect(()=>{
        signUpForm.reset();
      setTimeout(() => {
        createCaptcha();
      }, 500);
  },[opened])

  const createCaptcha = () => {
    try{
            //clear the contents of captcha div first 
            document.getElementById('captcha').innerHTML = "";
            var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
            var lengthOtp = 5;
            var captcha = [];
            for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
            }
            var canv = document.createElement("canvas");
            canv.id = "captcha";
            canv.width = 100;
            canv.height = 45;
            canv.style.backgroundImage=`url(${captchaIMG})`;
            canv.style.backgroundSize= 'cover';
            canv.style.textAlign='center'
            var ctx = canv.getContext("2d");
            ctx.font = "23px Noto Sans Warang Citi";
            ctx.strokeText(captcha.join(""), 0, 30);
            //storing captcha so that can validate you can save it somewhere else according to your specific requirements
            const code = captcha.join("");
            signUpForm.setFieldValue('captchaToBeMatch',code);
            document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    }
    catch(err){}
    
  }


  return (
    <Modal      opened={opened}
                onClose={close}
                title=""
                centered
                withCloseButton={false}
                 size="75%"
                 padding={0}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}

    >
          {/* bg-cover bg-center bg-no-repeat */}   
                <div className='grid grid-cols-12 gap-3  
                '>
                        <div className='hidden  md:col-span-6 
                        md:flex justify-between
                        bg-gradient-to-r from-[#831b99] to-[#fa5252]
                        flex-col'
                        >
                            <div className='w-full  flex items-center justify-center flex-col'>
                            <img src={SignUpSVG} height={300} width={300} className='m-auto'/>
                            <div className='p-5'>
                                <p className='m-0 font-PoppinsMedium text-xs text-white'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi placeat beatae magnam quam eligendi saepe officia harum architecto autem! Quibusdam repudiandae voluptates reprehenderit omnis excepturi ratione rem labore totam commodi, odit id.
                                </p> 
                            </div>
                            </div>
                        </div>
                        <div className='col-span-12 md:col-span-6 p-3'>
                        <form onSubmit={signUpForm.onSubmit(submitForm)}>
                            <Group justify='space-between' align='center' mb={4}>
                                <Text 
                                fw={500}
                                className='text-2xl font-PoppinsSemiBold '
                                >
                                        Create an account
                                </Text>  

                                <CloseButton onClick={() => {
                                    close(false)
                                }}/>
                            </Group>
                             
                            <div className='grid grid-cols-12 gap-3'>
                                    <div className='col-span-12 md:col-span-6'>
                                            <MNTextInputComponent
                                                withAsterik={true}
                                                form={signUpForm}
                                                formKey={'firstName'}
                                                label={'First Name'}
                                                type={'text'}
                                                
                                            />
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                    <MNTextInputComponent
                                                withAsterik={true}
                                                form={signUpForm}
                                                formKey={'lastName'}
                                                label={'Last Name'}
                                                type={'text'}
                                                
                                            />
                                    </div>
                            </div>
                            <div className='grid grid-cols-12 gap-3 my-5'>
                                    <div className='col-span-12 md:col-span-6'>
                                    <MNDatePickerInputComponent
                                        clearable={true}
                                        formKey={'dob'}
                                        form={signUpForm}
                                        label={'Date Of Birth'}
                                        withAsterisk={true}
                                    />
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                    <Radio.Group
                                            name="gender"
                                            label="Gender"
                                            withAsterisk
                                            key={signUpForm.key('gender')}
                                            {...signUpForm.getInputProps('gender')}
                                            >
                                            <Group mt="xs">
                                                <Radio value="Male" label="Male" />
                                                <Radio value="Female" label="Female" />
                                            </Group>
                                            </Radio.Group>
                                    </div>
                            </div>
                            <div className='grid grid-cols-12 gap-3'>
                                    <div className='col-span-12 md:col-span-6'>
                                    <MNNumberInputComponent
                                        minLength={10}
                                        maxLength={10}
                                        label={'Mobile Number'}
                                        formKey={'mobileNo'}
                                        hideControls={true}
                                        form={signUpForm}
                                    />
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                            <MNTextInputComponent
                                                withAsterik={true}
                                                form={signUpForm}
                                                formKey={'emailId'}
                                                label={'Email'}
                                                type={'text'}
                                            />
                                    </div>
                            </div>
                            <div className='grid grid-cols-12 gap-3 my-5'>
                                    <div className='col-span-12 md:col-span-6'>
                                    <PasswordInput
                                        withAsterisk
                                        label="Password"
                                        onBlur={signUpForm.onBlur}
                                        onChange={signUpForm.onChange}
                                        placeholder="***********"
                                        key={signUpForm.key('password')}
                                        {...signUpForm.getInputProps('password')}
                                    />
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                    <PasswordInput
                                        withAsterisk
                                        label="Confirm Password"
                                        onBlur={signUpForm.onBlur}
                                        onChange={signUpForm.onChange}
                                        placeholder="***********"
                                        key={signUpForm.key('confirmPassword')}
                                        {...signUpForm.getInputProps('confirmPassword')}
                                    /> 
                                    </div>
                            </div>
                            <div className='grid grid-cols-12 gap-3 my-5'>

                                <div className='col-span-12'>
                                 <MNTextInputComponent
                                                withAsterik={true}
                                                form={signUpForm}
                                                formKey={'captcha'}
                                                
                                                label={'Enter the text as shown in the image'}
                                                type={'text'}
                                    />
                                </div>
                                <div className='col-span-5'>
                                    <Group justify='space-between' className='pl-2 pr-3 rounded-sm'>
                                        <div id="captcha"></div>
                                            <ActionIcon variant='transparent' onClick={() => createCaptcha()} size={'xs'}>
                                                <RefreshCw/>
                                            </ActionIcon>
                                    </Group>
                                </div>
                                <div className='col-span-7 place-self-end'>
                                        <Button type='submit'
                                            size='sm'
                                            fw={100}
                                            variant="gradient"
                                            className='md:w-auto w-full'
                                            gradient={{ deg:90,from: '#831b99', to: '#fa5252' }}
                                            leftSection={<LogIn size={18} />}
                                        >
                                            SignUp
                                        </Button>
                                </div>
                            </div>
                            
                        </form> 
                    </div>
                </div>
    </Modal>
  )
}

export default SignUpComponent
