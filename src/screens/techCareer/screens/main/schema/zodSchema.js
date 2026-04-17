import { z } from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_RESUME_TYPES = ["application/pdf", "application/doc", "application/docx"];

export const schemas = z.object({
    applicationInformation: z.object({
      
        positionId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        subjectOrAreaOrInstitueId: z.string({
            required_error: "*Please provide mandatory field",
            invalid_type_error: "*Please provide mandatory field",
        }).min(1, { message: '*Please provide mandatory field' }),
        natureOfJobId: z.string({
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }).default('Full-Time'),
        preferredLocationId_1:z.string({
            invalid_type_error:"*Please provide mandatory field",
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }),
        preferredLocationId_2:z.string({
            invalid_type_error:"*Please provide mandatory field",
            required_error: "*Please provide mandatory field"
        }).min(1, { message: '*Please provide mandatory field' }),
        preferredLocationId_3:z.string({
            invalid_type_error:"*Please provide mandatory field",
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
        }).default(''),
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
                required_error: '*Please provide mandatory field',
                message:"*Please provide mandatory field"
            }).min(1, { message: '*Please provide mandatory field' }),
            stateId: z.string({
                required_error: '*Please provide mandatory field',
                message:"*Please provide mandatory field"
            }).min(1, { message: '*Please provide mandatory field' }),
            cityId: z.string({
                invalid_type_error:'*Please provide mandatory field',
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }),
            religionId: z.string({
                required_error: '*Please provide mandatory field',
                message:"*Please provide mandatory field"
            }).min(1, { message: '*Please provide mandatory field' }),
            maritialStatusId: z.string({
                required_error: '*Please provide mandatory field'
            }).min(1, { message: '*Please provide mandatory field' }).default('Single'),
        }),
        nativePlace: z.object({
            countryId: z.string({
                required_error: '*Please provide mandatory field',
                message:"*Please provide mandatory field"
            }).min(1, { message: '*Please provide mandatory field' }),
            stateId: z.string({
                required_error: '*Please provide mandatory field',
                message:"*Please provide mandatory field"
            }).min(1, { message: '*Please provide mandatory field' }),
            aadhaarNo: z.string().optional(),
            panNo: z.string().optional()
        })
    }),
    academicProfessionalQualification: z.object({
        higherSecondary: z.object({
            countryId: z.string({
                message:"*Please provide mandatory field"
            }).min(1, { message: "*Please provide mandatory field" }),
            educationModeId: z.string({
                message:"*Please provide mandatory field"
            }).min(1, { message: "*Please provide mandatory field" }),
            schoolName: z.string({
            }).min(1, { message: "*Please provide mandatory field" }),
            boardName: z.string({
            }).min(1, { message: "*Please provide mandatory field" }),
            divisionId: z.string({
                message:"*Please provide mandatory field"
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
                message:"*Please provide mandatory field"
                }).min(1, { message: "*Please provide mandatory field" }),
                educationModeId: z.string({
                message:"*Please provide mandatory field"
                }).min(1, { message: "*Please provide mandatory field" }),
                universityStateName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                collegeName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                graduationYear: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                }),
                areaId: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                courseName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                divisionId: z.string({
                 message:"*Please provide mandatory field"
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
                 message:"*Please provide mandatory field"
                }).min(1, { message: "*Please provide mandatory field" }),
                educationModeId: z.string({
                message:"*Please provide mandatory field"
                }).min(1, { message: "*Please provide mandatory field" }),
                universityStateName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                collegeName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                graduationYear: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                }),
                areaId: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                courseName: z.string({
                }).min(1, { message: "*Please provide mandatory field" }),
                divisionId: z.string({
                    message:"*Please provide mandatory field"
                }).min(1, { message: "*Please provide mandatory field" }),
                aggregrateMarks: z.number({
                    required_error: '*Please provide mandatory field',
                    invalid_type_error:'*Please provide mandatory field'
                })
            })
        ),
        Mphil: z.array(
            z.object({
                countryId: z.string().optional().nullable(),
                educationModeId: z.string().optional().nullable(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                graduationYear: z.coerce.number().optional(),
                areaId: z.string().optional().nullable(),
                divisionId: z.string().optional().nullable(),
                aggregrateMarks: z.coerce.number().optional()
            })
        ),
        phD: z.array(
            z.object({
                statusId: z.string().optional().nullable(),
                countryId: z.string().optional().nullable(),
                educationModeId: z.string().optional().nullable(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                completionYear: z.coerce.number().optional(),
                areaId: z.string().optional().nullable(),
                anticipatedCompletionYear: z.coerce.number().optional(),
                hasTeachingExprience: z.string().default('no'),

            })
        ),
        postDoctoral: z.array(
            z.object({
                countryId: z.string().optional().nullable(),
                educationModeId: z.string().optional().nullable(),
                universityStateName: z.string().optional(),
                collegeName: z.string().optional(),
                year: z.coerce.number().optional(),
                areaId: z.string().optional().nullable(),
                courseName: z.string().optional(),
                divisionId: z.string().optional().nullable(),
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