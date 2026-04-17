// import React from 'react'
import {
    Group,
    Button,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
  } from '@mantine/core';
  import classes from './HeaderMegaMenu.module.css';
//   import { MantineLogo } from '@mantinex/mantine-logo';
// import {Logo} from './'
import Logo from '@/assets/logo.png'
  import { useDisclosure } from '@mantine/hooks';
  import {
    Bell,
    Code,
    Book,
    // ChartPie,
    Fingerprint,
    Coins ,
    LogIn,
  } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SignUpComponent from '../../Auth/SignUpComponent';
import SignInComponent from '../../Auth/SignInComponent';
import { useState } from 'react';
  const mockdata = [
    {
      icon: Code,
      title: 'Open source',
      description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
      icon: Coins ,
      title: 'Free for everyone',
      description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
      icon: Fingerprint,
      title: 'Security',
      description: 'The shell’s rounded shape and the grooves on its.',
    },
    // {
    //   icon: ChartPie,
    //   title: 'Analytics',
    //   description: 'This Pokémon uses its flying ability to quickly chase',
    // },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Combusken battles with the intensely hot flames it spews',
    },
  ];
const NavComponent = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [color,setColor] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [opened_login,setLoginModalVisibility] = useState(false);  
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, handlers] = useDisclosure(false, {
      onOpen: () => console.log('Opened'),
      onClose: () => console.log('Closed'),
    });

    const changeColor = () =>{
        setColor(window.scrollY >= 90)
    }

    window.addEventListener('scroll', ()=> {changeColor()})

    const theme = useMantineTheme();
    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
            </ThemeIcon>
            <div>
              <Text size="sm" fw={500}>
                {item.title}
              </Text>
              <Text size="xs" c="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      ));
    return (
        <Box pb={5} pt={5} className={`fixed min-w-full top-0 start-0 z-50 container mx-auto ${color ? 'bg-white shadow-md delay-100 duration-700 transition-all ease-in-out' : 'bg-neutral-50/5 shadow-none delay-75 duration-150 transition-all'} `}>
        <header className={`${classes.header}`}>
          <Group justify="space-between" h="100%">
            {/* <Logo size={30} /> */}
            <Box className='flex items-center justify-between space-x-2'>
                <img src={Logo} height={60} width={60}/>
                <Text 
                 component="h6"
                 inherit
                 my={20}
                 size={'xs'}
                 variant="gradient"
                 gradient={{ deg:90, from: '#831b99', to: '#fa5252' }}
                
                >Welcome To TechnoIndia</Text>
            </Box>
  
            <Group h="100%" gap={0} visibleFrom="sm">
                    {!location.pathname.includes('app') && <><Button
                           variant="white"
                         size="compact-xl"
                          fw={'normal'}
                          radius={3}
                          className='mx-3'
                          onClick={() => setLoginModalVisibility(prev => !prev)}
                      >
                            <span  className={`text-xs mx-2 font-PoppinsRegular`}>SignIn</span>
                            <LogIn size={18}/>
                    </Button>
                    <Button
                          size="compact-xl"
                          fw={'normal'}
                          radius={3}
                          onClick={() => open()}
                      >
                            <span  className={`text-xs mx-2 font-PoppinsRegular`}>Sign Up</span>
                    </Button></>}

                    {
                       location.pathname.includes('app') && <Button
                       variant="transparent"

                         size="xs"
                         fw={'normal'}
                         radius={3}
                         onClick={() => navigate('/employee')}
                     >
                           <span  className={`text-xs mx-2 font-PoppinsRegular`}>Sign Out</span>
                           <LogIn size={18}/>
                   </Button>
                    }
            </Group>
  
            {/* <Group visibleFrom="sm">
              <Button variant="default">Log in</Button>
              <Button variant='filled' color={theme.colors.red[6]}>Sign up</Button>
            </Group> */}
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
        {/* Drawer */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Welcome to TechnoIndia Portal"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />
  
            <NavLink to="/employee" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/employee" className={classes.link}>
              Careers
            </NavLink><NavLink to="/employee" className={classes.link}>
              News
            </NavLink><NavLink to="/employee" className={classes.link}>
              Alumni
            </NavLink><NavLink to="/employee" className={classes.link}>
              Scholarship
            </NavLink>
            <NavLink to="/employee" className={classes.link}>
              Contact
            </NavLink>
            
          </ScrollArea>
        </Drawer>
        {/* End */}
        <SignUpComponent
                opened={opened}
                close={close}
            />
        <SignInComponent
         opened={opened_login}
        close={() => setLoginModalVisibility(false)}
        />
      </Box>
    )
}

export default NavComponent
