import { Button, Modal, PasswordInput, Text, Group,Anchor, CloseButton } from '@mantine/core'
import React from 'react'
import LoginBck from '@/assets/login.png';
import z from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import MNTextInputComponent from '../main/component/ux/MNTextInput';
import { LogIn } from 'lucide-react';
const signInSchema = z.object({
        emailId: z.string({
            required_error: '*Please provide email',
        }).min(1,{
            message:'*Please provide email'
        }).email({
            message:'*Please provide valid email'
        }),
        password: z.string({
            required_error: '*Please provide password',
            }).min(1,{
                message:'*Please provide password'
            })
    });
const onSubmit = (values) =>{
            console.log(values);
}
const SignInComponent = ({ opened, close }) => {
    const signInForm = useForm(
        {
            mode:'uncontrolled',
            validate:zodResolver(signInSchema),
            initialValues:{
                emailId:'',
                password:'',
            },
            onValuesChange: (values) => {
                console.log(values);
              },
      })  
    return (
        <Modal opened={opened}
            onClose={close}
            title=""
            centered
            withCloseButton={false}
            size="60%"
            padding={0}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}

        >

            <div className='grid grid-cols-12 gap-3'>
                <div className='hidden  md:col-span-6 
                        md:flex justify-between
                        bg-gradient-to-r from-[#831b99] to-[#fa5252]
                        flex-col'
                >
                    <div className='w-full  flex items-center justify-center flex-col'>
                        <img src={LoginBck} height={300} width={300} className='m-auto' />
                        <div className='p-5'>
                            <p className='m-0 font-PoppinsMedium text-xs text-white'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi placeat beatae magnam quam eligendi saepe officia harum architecto autem! Quibusdam repudiandae voluptates reprehenderit omnis excepturi ratione rem labore totam commodi, odit id.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-span-6 p-1 flex justify-center items-center flex-col relative'>
                        <div className='absolute w-full top-0 p-5 bg-white'>
                        <Group justify="space-between">
                            <Text
                                fw={500}
                                className='text-2xl  font-PoppinsSemiBold '
                                >
                                        Welcome Back!!
                                </Text>   
                                <CloseButton   onClick={() => close(false)}/>
                        </Group>
                        </div>
                      
                        <form onSubmit={signInForm.onSubmit(onSubmit)}>
                            <Text
                                    fw={500}
                                    className='text-xs mb-3 font-PoppinsMedium' c="gray"
                                    >
                                            Sign in to continue
                                    </Text>   
                            <div className='grid grid-cols-12 gap-3'>
                                    <div className='col-span-12 md:col-span-12'>
                                            <MNTextInputComponent
                                                withAsterik={true}
                                                form={signInForm}
                                                formKey={'emailId'}
                                                label={'Email'}
                                                type={'email'}
                                                
                                            />
                                    </div>

                                    <div className='col-span-12 md:col-span-12'>
                                            <PasswordInput
                                                placeholder="*******"
                                                withAsterisk
                                                key={signInForm.key('password')}
                                                {...signInForm.getInputProps('password')}
                                                label={'Password'}

                                            />
                                    </div>

                                        <div className='col-span-12 md:col-span-8 flex items-center '>
                                        <Anchor href="http://http://192.168.0.100:5173/employee" target="_blank" fw={200} 
                                        className='text-xs underline'>
                                            Forgot password
                                            </Anchor>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                        <Button type='submit'
                                        size='sm'
                                        fw={100}

                                        variant="gradient"
                                        className='md:w-auto w-full'
                                        gradient={{ deg:90,from: '#831b99', to: '#fa5252' }}
                                        leftSection={<LogIn size={18} />}
                                        >
                                        Login
                                        </Button>
                                        </div>
                            </div>
                        </form>
                </div>
            </div>

        </Modal>
    )
}

export default SignInComponent
