export const initialValues = {
    applicationInformation: {
        positionId: '',
        natureOfJobId: 'Full-Time',
        departmentId: '',
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
    exprience: {
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