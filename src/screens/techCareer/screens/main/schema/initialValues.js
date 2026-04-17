export const initialValues = {
    applicationInformation: {
        positionId: '',
        natureOfJobId: 'Full-Time',
        subjectOrAreaOrInstitueId: '',
        preferredLocationId_1:'',
        preferredLocationId_2:'',
        preferredLocationId_3:'',
    },
    personalInformation: {
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male',
        mobile: '',
        email: '',
        currentResidence: {
            countryId: '',
            stateId: '',
            cityName: '',
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
                startDate: '',
                endDate: ''
            }
        ],
        nonAcademic: [
            {
                natureOfJobId: '',
                countryId: '',
                organizationName: '',
                designationName: '',
                departmentName: '',
                startDate: '',
                endDate: ''
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
}