import { useForm } from '@mantine/form'
import {  useEffect, useState } from 'react'
import React from 'react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Button,  Group, useMantineTheme } from '@mantine/core';
import { Select } from '@mantine/core';
import { SegmentedControl } from '@mantine/core';
import { MoveRight } from 'lucide-react';
import { Card } from '@mantine/core';
import stepperList from '@/assets/json/NewFacultyPositionStepper.json';
import MStepperComp from '../component/MStepper';
import { CarrerCallApi } from '@/services/dbIntr';
import MNSelectComponent from '../component/ux/MNSelect';


const CompletedComponent = React.lazy(()=> import('../component/FormComp/Completed')); 
const OtherInformationComponent = React.lazy(()=> import('../component/FormComp/OtherInformation')); 
const PeerRecognitionAwardsComponent = React.lazy(()=> import('../component/FormComp/PeerRecognitionAwards'));
const ConsultancyComponent = React.lazy(()=> import('../component/FormComp/Consultancy'));
const PatentDetailsComponent = React.lazy(()=> import('../component/FormComp/PatentDetails'));
const BookAuthoredCoAuthoredCoEditedComponent = React.lazy(()=> import('../component/FormComp/BookAuthoredCoAuthoredCoEdited'));
const FellowShipComponent = React.lazy(()=> import('../component/FormComp/FellowShip'));
const ExprienceInComponent =  React.lazy(()=> import('../component/FormComp/ExprienceIn'));
const PersonalInfoComponent = React.lazy(()=> import('../component/FormComp/PersonalInfo'));
const ResearchWorkComponent = React.lazy(()=> import('../component/FormComp/ResearchWork'));
const AcademicProfessionalQualificationComponent = React.lazy(()=> import('../component/FormComp/AcademicProfessionalQualification'));
const QualifiedInComponent = React.lazy(()=> import('../component/FormComp/QualifiedIn'));

import { ACADEMIC_DOMAIN, AREA, CAMPUS, CITY, COUNTRY, DIVISION, EDUCATION_MODE, FELLOWSHIP_STATUS, JOB_NATURE, PATENT_STATUS, POSITION, REGION, RESPONSIBILITY, STATE, WRITTENT } from '@/model/Api';
import MNSegmentControlComponent from '../component/ux/MNSegmentControl';
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_RESUME_TYPES = ["application/pdf", "application/doc", "application/docx"];


const NewFacultyPositionSchema = z.object({
    applicationInformation: z.object({
        campusApplyingForId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        responsibilityId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        positionId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        academicDomainId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        natureOfJobId: z.string({
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }),
    }),
    personalInformation: z.object({
        firstName: z.string({
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }).default(''),
        lastName: z.string({
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }).default(''),
        dob: z.date({
            message: '*Plese provide mandatory field',
            invalid_type_error: '*Invalid date'
        }).default(null),
        gender: z.string({
            required_error: '*Please provide mandatory field',
            message: '*Please provide mandatory field'
        }).default('male'),
        mobile: z.number({
            required_error: '*Please provide mandatory field',
            message: '*Please provide mandatory field'
        }),
        email: z.string({
            required_error: '*Please provide mandatory field',
            message: '*Please provide mandatory field'
        }).email({
            message: '*Please provide valid email',
        }),
        currentResidence: z.object({
            countryId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            stateId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            cityId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            religionId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            maritialStatusId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }).default('Single'),
        }),
        nativePlace: z.object({
            countryId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            stateId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            aadhaarNo: z.string().optional(),
            panNo: z.string().optional()
        })
    }),
    academicProfessionalQualification: z.object({
        higherSecondary: z.object({
            countryId: z.string({
                invalid_type_error:"*Please provide mandatory field" 
            }).min(1, { message: "*Please provide mandatory field" }),
            educationModeId: z.string({
                invalid_type_error:"*Please provide mandatory field" 
            }).min(1, { message: "*Please provide mandatory field" }),
            schoolName: z.string().min(1, { message: "*Please provide mandatory field" }),
            boardName: z.string().min(1, { message: "*Please provide mandatory field" }),
            divisionId: z.string({
                invalid_type_error:"*Please provide mandatory field" 
            }).min(1, { message: "*Please provide mandatory field" }),
            passingYear: z.number({
                required_error: '*Please provide mandatory field',
                invalid_type_error:'*Please provide mandatory field'
            }),
            aggregrateMarks: z.number(
                {
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                }
            )
        }),
        graduate: z.array(
            z.object({
                countryId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                educationModeId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                universityStateName: z.string().min(1, { message: "*Please provide mandatory field" }),
                collegeName: z.string().min(1, { message: "*Please provide mandatory field" }),
                graduationYear: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                }),
                areaId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                courseName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                divisionId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                aggregrateMarks: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                })
            })
        ),
        postGraduate: z.array(
            z.object({
                countryId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                educationModeId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                universityStateName: z.string().min(1, { message: "*Please provide mandatory field" }),
                collegeName: z.string().min(1, { message: "*Please provide mandatory field" }),
                graduationYear: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                }),
                areaId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                courseName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                divisionId: z.string({
                    invalid_type_error:"*Please provide mandatory field" 
                }).min(1, { message: "*Please provide mandatory field" }),
                aggregrateMarks: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                })
            })
        ),
        Mphil: z.array(
            z.object({
                countryId: z.string().optional(),
                educationModeId: z.string().optional(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                graduationYear: z.coerce.number().optional(),
                areaId: z.string().optional(),
                divisionId: z.string().optional(),
                aggregrateMarks: z.coerce.number().optional()
            })
        ),
        phD: z.array(
            z.object({
                statusId: z.string().optional(),
                countryId: z.string().optional(),
                educationModeId: z.string().optional(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                completionYear: z.coerce.number().optional(),
                areaId: z.string().optional(),
                anticipatedCompletionYear: z.coerce.number().optional(),
                hasTeachingExprience: z.string().default('no'),

            })
        ),
        postDoctoral: z.array(
            z.object({
                countryId: z.string().optional(),
                educationModeId: z.string().optional(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                year: z.coerce.number().optional(),
                areaId: z.string().optional(),
                courseName: z.string().optional(),
                divisionId: z.string().optional(),
                aggregrateMarks: z.coerce.number().optional(),
            })
        )
    }),
    qualifiedIn: z.object({
        gateId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        gateYear: z.coerce.number().optional(),
        ugcNetId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        ugcNetYear: z.coerce.number().optional(),
        ugcjrfId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        ugcjrfYear: z.coerce.number().optional(),
        urcCsirId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        urcCsirYear: z.coerce.number().optional(),
        icmrId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        icmrYear: z.coerce.number().optional(),
        icarId: z.string().min(1, { message: '*Please provide mandatory field' }).default('no'),
        icarYear: z.coerce.number().optional(),
    }),
    exprience: z.object({
        academic: z.array(
            z.object({
                natureOfJobId: z.string().min(1, { message: '*Please provide mandatory field' }),
                countryId: z.string().min(1, { message: '*Please provide mandatory field' }),
                universityName: z.string().min(1, { message: '*Please provide mandatory field' }),
                collegeName: z.string().min(1, { message: '*Please provide mandatory field' }),
                positionId: z.string().min(1, { message: '*Please provide mandatory field' }),
                academicDomain: z.string().min(1, { message: '*Please provide mandatory field' }),
                startDate: z.date(),
                endDate: z.date()
            })
        ),
        nonAcademic: z.array(
            z.object({
                natureOfJobId: z.string().min(1, { message: '*Please provide mandatory field' }),
                countryId: z.string().min(1, { message: '*Please provide mandatory field' }),
                organizationName: z.string().min(1, { message: '*Please provide mandatory field' }),
                designationName: z.string().min(1, { message: '*Please provide mandatory field' }),
                departmentName: z.string().min(1, { message: '*Please provide mandatory field' }),
                startDate: z.date(),
                endDate: z.date()
            })
        )
    }),
    fellowShipsArchived: z.array(
        z.object({
            fellowshipDetails: z.string().min(1, { message: "*Required!!" }),
            year: z.number({ required_error: '*Required!!' }),
            amountPerAnnum: z.number({ required_error: '*Required!!' }),
            fellowshipStatusId: z.string().min(1, { message: "*Required!!" }),
        })
    ),
    researchWork: z.object({
        orcidId: z.string().optional(),
        hIndexAsPerScopus: z.number().optional(),
        hIndexAsPerWebOfScience: z.number().optional(),
        CumulativeImpactFactor: z.number().optional(),
        NoOfPublication: z.array(
            z.object({
                ResearchPapersPublishedTotal: z.object({
                    total: z.number().optional(),
                    AsPerUGCCareList: z.number().optional(),
                    SCI: z.number().optional(),
                    WebOfScience: z.number().optional(),
                    GoogleScholar: z.number().optional(),
                    Scopus: z.number().optional(),
                })
            }),
            z.object({
                ResearchPapersPublishedIn: z.object({
                    total: z.number().optional(),
                    AsPerUGCCareList: z.number().optional(),
                    SCI: z.number().optional(),
                    WebOfScience: z.number().optional(),
                    GoogleScholar: z.number().optional(),
                    Scopus: z.number().optional(),
                })
            })
        ),
        NumberOfCitations: z.number().optional(),
        NoOfFundedProjects: z.array(
            z.object({
                completed: z.object({
                    noOfProject: z.number().optional(),
                    amount: z.number().optional(),
                })
            }),
            z.object({
                ongoing: z.object({
                    noOfProject: z.number().optional(),
                    amount: z.number().optional(),
                })
            })
        ),
        noOfConferencesSeminarsWorkshopsTrainingProgrammers: z.array(
            z.object({
                presentedAt: z.object({
                    totalNo: z.number().optional(),
                    nationalNo: z.number().optional(),
                    internationalNo: z.number().optional()
                })
            }),
            z.object({
                attended: z.object({
                    totalNo: z.number().optional(),
                    nationalNo: z.number().optional(),
                    internationalNo: z.number().optional()
                })
            }),
            z.object({
                organized: z.object({
                    totalNo: z.number().optional(),
                    nationalNo: z.number().optional(),
                    internationalNo: z.number().optional()
                })
            })
        ),
        researchGuidance: z.array(
            z.object({
                successfullyCompleted: z.array(
                    z.object(
                        {
                            Independent: z.object({
                                MPhilEquivalentNo: z.number().optional(),
                                PhDEquivalentNo: z.number().optional(),
                            })
                        }
                    ),
                    z.object(
                        {
                            asCosupervisor: z.object({
                                MPhilEquivalentNo: z.number().optional(),
                                PhDEquivalentNo: z.number().optional(),
                            })
                        }
                    )
                )
            }),
            z.object({
                underSupervision: z.array(
                    z.object(
                        {
                            Independent: z.object({
                                MPhilEquivalentNo: z.number().optional(),
                                PhDEquivalentNo: z.number().optional(),
                            })
                        }
                    ),
                    z.object(
                        {
                            asCosupervisor: z.object({
                                MPhilEquivalentNo: z.number().optional(),
                                PhDEquivalentNo: z.number().optional(),
                            })
                        }
                    )
                )
            })
        )
    }),
    booksAuthoredCoAuthoredEditedCoEdited: z.array(
        z.object({
            details: z.string().optional(),
            isbnNo: z.number().optional(),
            writtenAs: z.string().optional(),
        })
    ),
    consultancy: z.array(
        z.object({
            completed: z.object({
                noOfAssignments: z.number().optional(),
                amount: z.number().optional(),
            })
        }),
        z.object({
            ongoing: z.object({
                noOfAssignments: z.number().optional(),
                amount: z.number().optional(),
            })
        })
    ),
    patentDetails: z.array(
        z.object({
            details: z.string().optional(),
            year: z.number().optional(),
            patentStatusId: z.string().optional(),
        })
    ),
    peerRecognitionAwards: z.array(
        z.object({
            awardsOrHonors: z.string().optional(),
            agency: z.string().optional(),
            year: z.number().optional(),
        })
    ),
    otherInformation: z.object({
        presentLastDrawnSalary: z.coerce.number().optional(),
        noticePeriod: z.coerce.number().optional(),
        doYouKnowAnyoneInAmity: z.object({
            knowAnyone: z.string().default('no'),
            ifYes: z.array(
                z.object({
                    name: z.string().optional(),
                    designation: z.string().optional(),
                    department: z.string().optional(),
                    campusId: z.string().optional()
                })

            )
        }),
        haveYouEverBeenInterviewedInAmityEarlier: z.string().optional(),
        campusId: z.string().optional(),
        givenOfferToJoin: z.string().optional(),
        joined: z.string().optional(),
        ifYes: z.object({
            startDate: z.coerce.date().optional(),
            endDate: z.coerce.date().optional(),
        }),
        haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw: z.object(
            {
                punishedStatus: z.string().optional(),
                explain: z.string().optional()
            }
        ),
        doYouHaveAnyCasePendingAgainstYouInCourtOfLaw: z.object({
            casePendingStatus: z.string().optional(),
            explain: z.string().optional()
        }),
        photoUpload: z.instanceof(File, {
            message: '*Please provide mandatory field'
        }).refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
        .refine((files) => {
                    return ACCEPTED_IMAGE_TYPES.includes(files?.type)
                },
                "Only .jpg, .jpeg, .png formats are supported."
        ),
        resumeUpload: z.any().optional()
            .refine((files) => files ? files?.size <= MAX_FILE_SIZE : true, `Max image size is 2MB.`)
            .refine(
                (files) => {
                    return files ? ACCEPTED_RESUME_TYPES.includes(files?.type) : true
                },
                "Only .docx, .doc, .pdf formats are supported."
            ),
    }
    )
});

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



const NewFacultyPositionScreen = () => {

    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            applicationInformation: {
                campusApplyingForId: '',
                responsibilityId: '',
                positionId: '',
                natureOfJobId: ''
            },
            personalInformation: {
                firstName: '',
                lastName: '',
                dob: null,
                gender: 'male',
                mobile: '',
                email: '',
                currentResidence: {
                    countryId: '',
                    stateId: '',
                    cityId: '',
                    religionId: '',
                    maritialStatusId: 'single'
                },
                nativePlace: {
                    countryId: '',
                    stateId: '',
                    aadhaarNo: '',
                    panNo: ''
                }
            },
            academicProfessionalQualification: {
                higherSecondary: {
                    countryId: '',
                    educationModeId: '',
                    schoolName: '',
                    boardName: '',
                    passingYear:'',
                    divisionId: '',
                    aggregrateMarks:''
                },
                graduate: [
                    {
                        countryId: '',
                        educationModeId: '',
                        universityStateName: '',
                        collegeName: '',
                        graduationYear:'',
                        area: '',
                        courseName: '',
                        divisionId: '',
                        aggregrateMarks:''

                    }
                ],
                postGraduate: [{
                    countryId: '',
                    educationModeId: '',
                    universityStateName: '',
                    collegeName: '',
                    graduationYear:'',
                    area: '',
                    courseName: '',
                    divisionId: '',
                    aggregrateMarks:''
                }],
                Mphil: [
                    {
                        countryId: '',
                        educationModeId: '',
                        universityStateName: '',
                        collegeName: '',
                        graduationYear:'',
                        area: '',
                        divisionId: '',
                        aggregrateMarks:''
                    }
                ],
                phD: [{
                    statusId: '',
                    countryId: '',
                    educationModeId: '',
                    universityStateName: '',
                    collegeName: '',
                    completionYear:'',
                    area: '',
                    hasTeachingExprience: 'no',
                    anticipatedCompletionYear:''
                }],
                postDoctoral: [{
                    countryId: '',
                    educationModeId: '',
                    universityStateName: '',
                    collegeName: '',
                    year:'',
                    area: '',
                    courseName: '',
                    divisionId: '',
                    aggregrateMarks:''
                }]
            },
            qualifiedIn: {
                gateId: 'no',
                gateYear:'',
                ugcNetId: 'no',
                ugcNetYear:'',
                ugcjrfId: 'no',
                ugcjrfYear:'',
                urcCsirId: 'no',
                urcCsirYear:'',
                icmrId: 'no',
                icmrYear:'',
                icarId: 'no',
                icarYear:''
            },
            exprience: {
                academic: [
                    {
                        natureOfJobId: '',
                        countryId: '',
                        universityName: '',
                        collegeName: '',
                        positionId: '',
                        academicDomain: '',
                        startDate:null,
                        endDate: null
                    }
                ],
                nonAcademic: [
                    {
                        natureOfJobId: '',
                        countryId: '',
                        organizationName: '',
                        designationName: '',
                        departmentName: '',
                        startDate:null,
                        endDate: null
                    }
                ]
            },
            fellowShipsArchived: [
                {
                    fellowshipDetails: '',
                    year: '',
                    amountPerAnnum: '',
                    fellowshipStatusId: '',
                }
            ],
            researchWork: {
                orcidId: '',
                hIndexAsPerScopus:'',
                hIndexAsPerWebOfScience:'',
                CumulativeImpactFactor:'',
                NoOfPublication: [
                    {
                        ResearchPapersPublishedTotal: {
                            total:'',
                            AsPerUGCCareList:'',
                            SCI:'',
                            WebOfScience:'',
                            GoogleScholar:'',
                            Scopus:'',
                        }
                    },
                    {
                        ResearchPapersPublishedInLastThreeYear: {
                            total:'',
                            AsPerUGCCareList:'',
                            SCI:'',
                            WebOfScience:'',
                            GoogleScholar:'',
                            Scopus:'',
                        }
                    }

                ],
                // NumberOfCitations:0,
                NoOfFundedProjects: [
                    {
                        completed: {
                            noOfProject:'',
                            amount:'',
                        }
                    },
                    {
                        ongoing: {
                            noOfProject:'',
                            amount:'',
                        }
                    }
                ],
                noOfConferencesSeminarsWorkshopsTrainingProgrammers: [
                    {
                        presentedAt: {
                            // totalNo:'',
                            // nationalNo:'',
                            // internationalNo:''
                        }
                    },
                    {
                        attended: {
                            totalNo:'',
                            nationalNo:'',
                            internationalNo:''
                        }
                    },
                    {
                        organized: {
                            totalNo:'',
                            nationalNo:'',
                            internationalNo:''
                        }
                    },

                ],
                researchGuidance: [
                    {
                        successfullyCompleted: [
                            {
                                Independent: {
                                    MPhilEquivalentNo:'',
                                    PhDEquivalentNo:''
                                }
                            },
                            {
                                asCosupervisor: {
                                    MPhilEquivalentNo:'',
                                    PhDEquivalentNo:''
                                }
                            }
                        ]
                    },
                    {
                        underSupervision: [
                            {
                                Independent: {
                                    MPhilEquivalentNo:'',
                                    PhDEquivalentNo:''
                                }
                            },
                            {
                                asCosupervisor: {
                                    MPhilEquivalentNo:'',
                                    PhDEquivalentNo:''
                                }
                            }
                        ]
                    }
                ]
            },
            booksAuthoredCoAuthoredEditedCoEdited: [
                {
                    details: '',
                    isbnNo:'',
                    writtenAs: ''
                }
            ],
            patentDetails: [
                {
                    details: '',
                    year:'',
                    patentStatusId: ''
                }
            ],
            consultancy: [
                {
                    completed: {
                        noOfAssignments:'',
                        amount:''
                    }
                },
                {
                    ongoing: {
                        noOfAssignments:'',
                        amount:''
                    }
                }
            ],
            peerRecognitionAwards: [
                {
                    awardsOrHonors: '',
                    agency: '',
                    year:'',
                }
            ],
            otherInformation: {
                presentLastDrawnSalary:'',
                noticePeriod:'',
                doYouKnowAnyoneInAmity: {
                    knowAnyone: 'no',
                    ifYes: [{
                        name: '',
                        designation: '',
                        department: '',
                        campusId: ''
                    }]
                },
                haveYouEverBeenInterviewedInAmityEarlier: 'no',
                campusId: '',
                givenOfferToJoin: 'no',
                joined: 'no',
                ifYes: {
                    startDate: null,
                    endDate: null,
                },
                haveYouEverBeenPunishedDuringYourServiceOrConvictedByACourtOfLaw: {
                    punishedStatus: 'no',
                    explain: ''
                }
                ,
                doYouHaveAnyCasePendingAgainstYouInCourtOfLaw: {
                    casePendingStatus: 'no',
                    explain: ''
                },
                photoUpload:null,
                resumeUpload:null
            }
        },
        validate: (values) => {
            let resolver = zodResolver(NewFacultyPositionSchema)(values);
            if (active === 0) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation"]);
            }

            if (active === 1) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation"]);
            }

            if (active == 2) {
                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation", "academicProfessionalQualification"]);
            }

            if (active == 11) {

                resolver = filterObjectWithKeyString(resolver, ["personalInformation", "applicationInformation", "academicProfessionalQualification", "otherInformation"]);
            }

            if (active >= 3 && active <= 10) {
                resolver = null
            }
            return resolver;
        },
        onValuesChange: (values) => {
            console.log(values);
          },
    })

    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 12 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const theme = useMantineTheme();
    const [md_campus,setCampus] = useState([])
    const [md_country,setCountry] = useState([]);
    const [md_city,setCity] = useState([]);
    const [md_responsibility,setResponsibility] = useState([]);
    const [md_position,setPosition] = useState([]);
    const [md_academicdomain,setAcademicdomain] = useState([]);
    const [md_state,setState] = useState([]);
    const [md_region,setRegion] = useState([]);
    const [md_educationMode,setEducationMode] = useState([]);
    const [md_division,setDivision] = useState([])
    const [md_jobnature,setJobNature] = useState([]);
    const [md_fellowship,setFellowShip] = useState([]);
    const [md_written,setWriiten] = useState([]);
    const [md_patent,setPatent] = useState([]);
    const [md_area,setArea] = useState([]);

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

   const fetchResponsibility = async() =>{
         if(md_responsibility.length == 0){
            const responsibility_response = await CarrerCallApi(0,RESPONSIBILITY.getAll,null);
            if(responsibility_response?.request.status == 200){
                if(responsibility_response?.data.isValid){
                    setResponsibility(responsibility_response?.data.list);
                }
            }
         }   
   }

   const fetchPosition = async () =>{
            if(md_position.length == 0){
                const position_response = await CarrerCallApi(0,POSITION.getAll,null);
                if(position_response?.request.status == 200){
                    if(position_response?.data.isValid){
                        setPosition(position_response?.data.list);
                    }
                }
            }
   }

   const fetchAcademicDomain = async() =>{
    if(md_academicdomain.length == 0){
        const academicdomain_response = await CarrerCallApi(0,ACADEMIC_DOMAIN.getAll,null);
        if(academicdomain_response?.request.status == 200){
            if(academicdomain_response?.data.isValid){
                setAcademicdomain(academicdomain_response?.data.list);
            }
        }
    }
   }

   const fetchState = async () =>{
            if(md_state.length == 0){
                const state_response = await CarrerCallApi(0,STATE.getAll,null);
                if(state_response.request.status == 200){
                    if(state_response?.data.isValid){
                        setState(state_response?.data.list);
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

   const fetchJobNature = async () =>{
        if(md_jobnature.length == 0){
            const jobnature_response = await CarrerCallApi(0,JOB_NATURE.getAll,null);
            if(jobnature_response.request.status == 200){
                if(jobnature_response?.data.isValid){
                    setJobNature(jobnature_response?.data.list);
                    if(jobnature_response?.data.list.length > 0){
                        form.setValues({
                            applicationInformation:{
                                natureOfJobId:jobnature_response?.data.list[0].jobNatureId.toString()
                            }
                        })
                            
                    }
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


    useEffect(()=>{
            console.log(active);
            if(active == 0){
                fetchCountry();
                fetchCity();
                fetchState();
                fetchRegion();
            }
            else if(active == 1){
                fetchCampus();
                fetchResponsibility();
                fetchPosition();
                fetchAcademicDomain();
                fetchJobNature();
            }
            else if(active == 2){
                fetchEducationMode();
                fetchDivision();
                fetchArea();
            }
            // else if(active == 4){
            //     fetchJobNature();
            // }
            else if(active == 5){
                fetchFellowShipStatus()
            }
            else if(active == 7){
                fetchWritten();
            }
            else if(active == 8){
                fetchPatent();    
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

    return (
            <div className='container mx-auto'>
                <form onSubmit={form.onSubmit((values) => {
                    nextStep()
                    if(active == 11){
                        console.log(values)
                    }
                })}>

                    <div className='grid grid-cols-12 gap-3 my-2'>
                        {active < 12 && <div className='md:col-span-3 col-span-12 h-full'>
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
                        </div>}
                        <div className={`${active < 12 ? 'md:col-span-9' : 'md:col-span-12'} col-span-12 h-full`}>
                        <h2  className='underline my-5 text-xl font-semibold underline-offset-8 text-red-500'>
                                {
                                    stepperList.filter(el => el.id == (active + 1))[0]?.label
                                }
                            </h2>
                            <Card my={20} radius="sm" shadow='xs' className={active == 12 ? 'h-[calc(100%_-_1.25rem)] flex items-center justify-center' : ''}>
                                <Card.Section p={0}>
                                    {/* Application Information */}
                                    {
                                        active == 1 && <div className='container mx-auto  p-5'>
                                            <div className='grid grid-cols-12 gap-6'>
                                                <div className='md:col-span-3 col-span-12'>
                                                    <MNSelectComponent
                                                        formKey={'applicationInformation.campusApplyingForId'}
                                                        dataSource={md_campus.map(el => {return {value:el.campusId.toString(),label:el.campusName}})}
                                                        label="Campus Applying for"
                                                        withAsterik={true}
                                                        form={form}
                                                    />
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                    <MNSelectComponent
                                                        formKey={'applicationInformation.responsibilityId'}
                                                        dataSource={md_responsibility.map(el => {return {value:el.responsibilityId.toString(),label:el.responsibilityName}})}
                                                        label="Responsibility"
                                                        withAsterik={true}
                                                        form={form}
                                                    />
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                    <MNSelectComponent
                                                        formKey={'applicationInformation.positionId'}
                                                        dataSource={md_position.map(el => {return {value:el.positionId.toString(),label:el.positionName}})}
                                                        label="Position"
                                                        withAsterik={true}
                                                        form={form}
                                                    />
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                    <MNSelectComponent
                                                        formKey={'applicationInformation.academicDomainId'}
                                                        dataSource={md_academicdomain.map(el => {return {value:el.academicDomainId.toString(),label:el.academicDomainName}})}
                                                        label="Academic Domain"
                                                        withAsterik={true}
                                                        form={form}
                                                    />
                                                </div>
                                                <div className='md:col-span-3 col-span-12'>
                                                    <h5 className='font-medium text-[14px]'>Nature Of Job<span className='text-red-600'>*</span></h5>
                                                    <MNSegmentControlComponent
                                                        formKey={'applicationInformation.natureOfJobId'}
                                                        form={form}
                                                        dataSource={md_jobnature.map(el => {return {label:el.jobNatureName,value:el.jobNatureId.toString()}})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* End */}
                                    {/* Personal Information */}
                                    {
                                        active == 0 && <PersonalInfoComponent 
                                        form={form} md_country={md_country} 
                                        md_city={md_city} md_state={md_state} 
                                        md_region={md_region}/>
                                    }
                                    {/* End */}

                                    {/* Academic / Professional Qualification */}
                                    {
                                        active == 2 && <AcademicProfessionalQualificationComponent 
                                        form={form} md_country={md_country} 
                                        md_educationMode={md_educationMode}
                                        md_division={md_division}
                                        md_area={md_area}
                                        />
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
                                        active == 5 && <FellowShipComponent form={form} md_fellowship={md_fellowship}/>
                                    }
                                    {/* End */}
                                    {/* Research Work */}
                                    {
                                        active == 6 && <ResearchWorkComponent form={form} />
                                    }
                                    {/* End */}
                                    {/* Books Authored/co-authored/ edited/co-edited (in last three years) */}

                                    {
                                        active == 7 && <BookAuthoredCoAuthoredCoEditedComponent form={form} md_written={md_written}/>
                                    }
                                    {/* End */}
                                    {/* Patent Details */}
                                    {
                                        active == 8 && <PatentDetailsComponent form={form} md_patent={md_patent}/>
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
                                        active == 11 && <OtherInformationComponent form={form} md_campus={md_campus}/>
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

export default NewFacultyPositionScreen
