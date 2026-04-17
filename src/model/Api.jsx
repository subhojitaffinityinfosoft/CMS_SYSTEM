export const pre_api_name = '/api/master/';
export const pre_trans_api_name = '/api/transaction/';
export const pre_file_api_name = '/api/fileupload/';
export const get_all_details_by_unitid = '/getalldetailsbyunitid'

export const get_data_source_by_paginate = '/showalldatafordatatable';
export const get_data_source_all = '/getall';
export const add_updated_row = '/addorupdate';
export const delete_row = '/delete';
export const get_row_by_id = '/getbyid';
export const get_all_details_by_roleId = '/getalldetailsbyroleid';
export const delete_by_unit_id = '/deletebyunitid';
export const get_all_data_by_id = '/getalldatabyid';
export const getalldetailsbyuserid = '/getalldetailsbyuserid';
export const deletebyuserid = '/deletebyuserid';
export const getbycategoryid = '/getbycategoryid';
export const getemployeedetailsforicard = '/Getemployeedetailsforicard';
export const getallbyunitid = '/getallbyunitid';
export const AUTH = {
    signIn: 'gettoken',
    emplogin: 'emplogin'
}

export const CATEGORY = {
    fetch: `${pre_api_name}categorymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}categorymaster${add_updated_row}`,
    delete: `${pre_api_name}categorymaster${delete_row}`,
    getbyId: `${pre_api_name}categorymaster${get_row_by_id}`,
    getAll: `${pre_api_name}categorymaster${get_data_source_all}`
}

export const SHIFT = {
    fetch: `${pre_api_name}shiftmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}shiftmaster${add_updated_row}`,
    delete: `${pre_api_name}shiftmaster${delete_row}`,
    getbyId: `${pre_api_name}shiftmaster${get_row_by_id}`,
    getAll: `${pre_api_name}shiftmaster${get_data_source_all}`
}

export const APKVERSION = {
    fetch: `${pre_api_name}appreleaseapkmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}appreleaseapkmaster${add_updated_row}`,
    delete: `${pre_api_name}appreleaseapkmaster${delete_row}`,
    getbyId: `${pre_api_name}appreleaseapkmaster${get_row_by_id}`,
    getAll: `${pre_api_name}appreleaseapkmaster${get_data_source_all}`
}


export const ROLE = {
    fetch: `${pre_api_name}rolemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}rolemaster${add_updated_row}`,
    delete: `${pre_api_name}rolemaster${delete_row}`,
    getbyId: `${pre_api_name}rolemaster${get_row_by_id}`,
    getAll: `${pre_api_name}rolemaster${get_data_source_all}`
}


export const MODULE = {
    fetch: `${pre_api_name}modulemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}modulemaster${add_updated_row}`,
    delete: `${pre_api_name}modulemaster${delete_row}`,
    getbyId: `${pre_api_name}modulemaster${get_row_by_id}`,
    getAll: `${pre_api_name}modulemaster${get_data_source_all}`
}

export const MENUMST = {
    fetch: `${pre_api_name}menumaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}menumaster${add_updated_row}`,
    delete: `${pre_api_name}menumaster${delete_row}`,
    getbyId: `${pre_api_name}menumaster${get_row_by_id}`,
    getAll: `${pre_api_name}menumaster${get_data_source_all}`,
    CustomGetApp: `${pre_api_name}menumaster/CustomGetAll`,
}

export const ROLE_WISE_MENU_ACCESS = {
    fetch: `${pre_api_name}rolewisemenuaccess${get_data_source_by_paginate}`,
    modify: `${pre_api_name}rolewisemenuaccess${add_updated_row}`,
    delete: `${pre_api_name}rolewisemenuaccess${delete_row}`,
    getbyId: `${pre_api_name}rolewisemenuaccess${get_row_by_id}`,
    getAll: `${pre_api_name}rolewisemenuaccess${get_data_source_all}`,
    get_all_details_by_roleId: `${pre_api_name}rolewisemenuaccess${get_all_details_by_roleId}`,
    custom_get_by_role_id: `${pre_api_name}rolewisemenuaccess/customgetbyroleid`
}



export const SESSION = {
    fetch: `${pre_api_name}sessionmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}sessionmaster${add_updated_row}`,
    delete: `${pre_api_name}sessionmaster${delete_row}`,
    getbyId: `${pre_api_name}sessionmaster${get_row_by_id}`,
    getAll: `${pre_api_name}sessionmaster${get_data_source_all}`
}
export const HOLIDAY = {
    fetch: `${pre_api_name}holidaymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}holidaymaster${add_updated_row}`,
    delete: `${pre_api_name}holidaymaster${delete_row}`,
    getbyId: `${pre_api_name}holidaymaster${get_row_by_id}`,
    getAll: `${pre_api_name}holidaymaster${get_data_source_all}`
}

export const DEPARTMENT = {
    fetch: `${pre_api_name}departmentmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}departmentmaster${add_updated_row}`,
    delete: `${pre_api_name}departmentmaster${delete_row}`,
    getbyId: `${pre_api_name}departmentmaster${get_row_by_id}`,
    getAll: `${pre_api_name}departmentmaster${get_data_source_all}`,
}

export const UNITS = {
    fetch: `${pre_api_name}unitmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitmaster${add_updated_row}`,
    delete: `${pre_api_name}unitmaster${delete_row}`,
    getbyId: `${pre_api_name}unitmaster${get_row_by_id}`,
    getAll: `${pre_api_name}unitmaster${get_data_source_all}`,
    getbycategoryid: `${pre_api_name}unitmaster${getbycategoryid}`,
}

export const COMPANY = {
    fetch: `${pre_api_name}companymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}companymaster${add_updated_row}`,
    delete: `${pre_api_name}companymaster${delete_row}`,
    getbyId: `${pre_api_name}companymaster${get_row_by_id}`,
    getAll: `${pre_api_name}companymaster${get_data_source_all}`
}


export const EARNING_DEDUCTION = {
    fetch: `${pre_api_name}earningdeductionmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}earningdeductionmaster${add_updated_row}`,
    delete: `${pre_api_name}earningdeductionmaster${delete_row}`,
    getbyId: `${pre_api_name}earningdeductionmaster${get_row_by_id}`,
    getAll: `${pre_api_name}earningdeductionmaster${get_data_source_all}`
}

export const DESIGNATION = {
    fetch: `${pre_api_name}designationmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}designationmaster${add_updated_row}`,
    delete: `${pre_api_name}designationmaster${delete_row}`,
    getbyId: `${pre_api_name}designationmaster${get_row_by_id}`,
    getAll: `${pre_api_name}designationmaster${get_data_source_all}`
}

export const EARNING_DEDUCTION_MAP = {
    fetch: `${pre_api_name}unitwiseearningdeductionmapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwiseearningdeductionmapping${add_updated_row}`,
    delete: `${pre_api_name}unitwiseearningdeductionmapping${delete_by_unit_id}`,
    getbyId: `${pre_api_name}unitwiseearningdeductionmapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwiseearningdeductionmapping${get_data_source_all}`,
    get_all_details_by_unitid: `${pre_api_name}unitwiseearningdeductionmapping${get_all_details_by_unitid}`

}

export const DEPARTMENT_MAP = {
    fetch: `${pre_api_name}unitwisedepartmentmapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwisedepartmentmapping${add_updated_row}`,
    delete: `${pre_api_name}unitwisedepartmentmapping${delete_by_unit_id}`,
    getbyId: `${pre_api_name}unitwisedepartmentmapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwisedepartmentmapping${get_data_source_all}`,
    get_all_details_by_unitid: `${pre_api_name}unitwisedepartmentmapping${get_all_details_by_unitid}`
}

export const CARRER_MAP = {
    fetch: `${pre_api_name}unitwisecareerapplymapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwisecareerapplymapping${add_updated_row}`,
    delete: `${pre_api_name}unitwisecareerapplymapping${delete_by_unit_id}`,
    getbyId: `${pre_api_name}unitwisecareerapplymapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwisecareerapplymapping${get_data_source_all}`,
    get_all_details_by_unitid: `${pre_api_name}unitwisecareerapplymapping${get_all_details_by_unitid}`
}

export const DESIGNATION_MAP = {
    fetch: `${pre_api_name}unitwisedesignationmapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwisedesignationmapping${add_updated_row}`,
    delete: `${pre_api_name}unitwisedesignationmapping${delete_by_unit_id}`,
    getbyId: `${pre_api_name}unitwisedesignationmapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwisedesignationmapping${get_data_source_all}`,
    get_all_details_by_unitid: `${pre_api_name}unitwisedesignationmapping${get_all_details_by_unitid}`

}

export const UNIT_WISE_CAREER_STEP_MAP = {
    fetch: `${pre_api_name}unitwiseempcareerstepmapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwiseempcareerstepmapping${add_updated_row}`,
    getbyId: `${pre_api_name}unitwiseempcareerstepmapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwiseempcareerstepmapping${get_data_source_all}`,
    getAllUnitDesignationDepartment: `${pre_api_name}unitwiseempcareerstepmapping/getallUnitDesignationDepartmentid`,
    deletebyUnitDesignationDepartment: `${pre_api_name}unitwiseempcareerstepmapping/deletebyUnitDesignationDepartmentid`,
    getallunitdesignationid: `${pre_api_name}unitwiseempcareerstepmapping/getallunitdesignationid`
}


export const UNIT_WISE_EMP_DOC_TYPE_MAP = {
    fetch: `${pre_api_name}unitwiseempdoctypemapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwiseempdoctypemapping${add_updated_row}`,
    getbyId: `${pre_api_name}unitwiseempdoctypemapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwiseempdoctypemapping${get_data_source_all}`,
    getAllUnitDesignationDepartment: `${pre_api_name}unitwiseempdoctypemapping/getallUnitDesignationDepartmentid`,
    deletebyUnitDesignationDepartment: `${pre_api_name}unitwiseempdoctypemapping/deletebyUnitDesignationDepartmentid`,
}


export const EMPLOYEE = {
    // fetch:`${pre_trans_api_name}employeemaster${get_data_source_by_paginate}`,
    // modify:`${pre_trans_api_name}employeemaster${add_updated_row}`,
    // delete:`${pre_trans_api_name}employeemaster${delete_row}`,
    // getbyId:`${pre_trans_api_name}employeemaster${get_row_by_id}`,
    // getAll:`${pre_trans_api_name}employeemaster${get_data_source_all}`,
    // getEmployeeDetailsForICard:`${pre_trans_api_name}employeemaster${getemployeedetailsforicard}`,
    // getalldatabyId:`${pre_trans_api_name}employeemaster${get_all_data_by_id}`,
    // getallbyunitid:`${pre_trans_api_name}employeemaster${getallbyunitid}`,
    // getalldatabyemployeecode:`${pre_trans_api_name}employeemaster/getalldatabyemployeecode`,
    fetch: `${pre_trans_api_name}employeemaster${get_data_source_by_paginate}`,
    modify: `${pre_trans_api_name}employeemaster${add_updated_row}`,
    delete: `${pre_trans_api_name}employeemaster${delete_row}`,
    getbyId: `${pre_trans_api_name}employeemaster${get_row_by_id}`,
    getAll: `${pre_trans_api_name}employeemaster${get_data_source_all}`,
    getEmployeeDetailsForICard: `${pre_trans_api_name}employeemaster${getemployeedetailsforicard}`,
    getalldatabyId: `${pre_trans_api_name}employeemaster${get_all_data_by_id}`,
    getallbyunitid: `${pre_trans_api_name}employeemaster${getallbyunitid}`,
    getalldatabyemployeecode: `${pre_trans_api_name}employeemaster/getalldatabyemployeecode`,
    getemployeewiseworkingday: `${pre_trans_api_name}employeemaster/getemployeewiseworkingday`,
    updateemployeewiseworkingday: `${pre_trans_api_name}employeemaster/updateemployeewiseworkingday`,
    getemployeewiseleavedetails: `${pre_trans_api_name}employeemaster/getemployeewiseleavedetails`,
    updateemployeewiseleavedetails: `${pre_trans_api_name}employeemaster/updateemployeewiseleavedetails`,
    getemployeewiseearningdeduction: `${pre_trans_api_name}employeemaster/getemployeewiseearningdeduction`,
    updateemployeewiseearningdeduction: `${pre_trans_api_name}employeemaster/updateemployeewiseearningdeduction`,
    getemployeewiseearndeductcalpermission: `${pre_trans_api_name}employeemaster/getemployeewiseearndeductcalpermission`,
    updateemployeewiseearndeductcalpermission: `${pre_trans_api_name}employeemaster/updateemployeewiseearndeductcalpermission`,
    getemployeewisedoctype: `${pre_trans_api_name}employeemaster/getemployeewisedoctype`,
    updateemployeewisedoctype: `${pre_trans_api_name}employeemaster/updateemployeewisedoctype`,
    getemployeewisereportingapprove: `${pre_trans_api_name}employeemaster/getemployeewiserepotingapprove`,
    updateemployeewisereportingapprove: `${pre_trans_api_name}employeemaster/updateemployeewiserepotingapprove`,
    employeebirthdaytable: `${pre_trans_api_name}employeemaster/getbirthdaydetailsdatatable`,
    employeeworkinganniversary: `${pre_trans_api_name}employeemaster/getworkinganniversarydetailsdatatable`,
    getbirthdayandworkinganniversaryfetchtype: `${pre_api_name}commonmaster/getbirthdayandworkinganniversaryfetchtype`,
    getallemployeebyunitids: `${pre_trans_api_name}employeemaster/getallbyunitids`,
    getemployeeleavedetailsreport: `${pre_trans_api_name}employeemaster/getemployeeleavedetailsreport`,
    getemployeebulkleavesetup: `${pre_trans_api_name}employeemaster/getemployeebulkleavesetup`,
    getbloodgroup: `${pre_api_name}commonmaster/getbloodgroup`,
    getPunchingType: `${pre_api_name}commonmaster/getPunchingType`,
    updateemployeeotherdetails: `${pre_trans_api_name}employeemaster/updateemployeeotherdetails`,
    getemployeeotherdetails: `${pre_trans_api_name}employeemaster/getemployeeotherdetails`,
    employeestatusupdate: `${pre_trans_api_name}employeemaster/employeestatusupdate`,

}

export const EMPLOYEE_TYPE = {
    fetch: `${pre_api_name}employeetypemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}employeetypemaster${add_updated_row}`,
    delete: `${pre_api_name}employeetypemaster${delete_row}`,
    getbyId: `${pre_api_name}employeetypemaster${get_row_by_id}`,
    getAll: `${pre_api_name}employeetypemaster${get_data_source_all}`,
    getalldatabyId: `${pre_api_name}employeetypemaster${get_all_data_by_id}`,
}


export const GENDER = {
    fetch: `${pre_api_name}gendermaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}gendermaster${add_updated_row}`,
    delete: `${pre_api_name}gendermaster${delete_row}`,
    getbyId: `${pre_api_name}gendermaster${get_row_by_id}`,
    getAll: `${pre_api_name}gendermaster${get_data_source_all}`,
    getalldatabyId: `${pre_api_name}gendermaster${get_all_data_by_id}`,
}

export const PAYMODEMASTER = {
    fetch: `${pre_api_name}paymodemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}paymodemaster${add_updated_row}`,
    delete: `${pre_api_name}paymodemaster${delete_row}`,
    getbyId: `${pre_api_name}paymodemaster${get_row_by_id}`,
    getAll: `${pre_api_name}paymodemaster${get_data_source_all}`,
    getalldatabyId: `${pre_api_name}paymodemaster${get_all_data_by_id}`,
}

export const USERWISEUNITMASTER = {
    fetch: `${pre_api_name}userwiseunitmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}userwiseunitmaster${add_updated_row}`,
    deletebyuserid: `${pre_api_name}userwiseunitmaster${deletebyuserid}`,
    getbyId: `${pre_api_name}userwiseunitmaster${get_row_by_id}`,
    getAll: `${pre_api_name}userwiseunitmaster${get_data_source_all}`,
    getalldatabyId: `${pre_api_name}userwiseunitmaster${get_all_data_by_id}`,
    getalldetailsbyuserid: `${pre_api_name}userwiseunitmaster${getalldetailsbyuserid}`,
    getalldetailsbyunitId: `${pre_api_name}userwiseunitmaster/getalluserdetailsbyunitid`,

}

export const FILE_UPLOAD = {
    upload: `${pre_file_api_name}upload`,
    download: `${pre_file_api_name}download`,
    delete: `${pre_file_api_name}delete`,
}

export const USERMASTER = {
    getAll: `${pre_api_name}usermaster${get_data_source_all}`,
    getById: `${pre_api_name}usermaster${get_row_by_id}`,
    changepassword: `${pre_api_name}usermaster/changepassword`,
    forgotPassword: `${pre_api_name}usermaster/forgotpassword`
}
export const EMP_ATTENDANCE = {
    get_attendace_for_datatable: `${pre_api_name}employeeattendance/getattendancefordatatable`,
    get_attendace_report: `${pre_api_name}employeeattendance/getmonthlyattendancereport`,
    get_attendace_report_with_leave: `${pre_api_name}employeeattendance/getmonthlyattendancereportwithleave`,
}


export const WEEKDAYS = {
    getallWeekDays: `${pre_api_name}commonmaster/getallweekdaymaster`,
    getattedancetype: `${pre_api_name}commonmaster/getattedancetype`
}

export const LEAVE_MASTER_OPTIONS = {
    getleavemasterleavetype: `${pre_api_name}commonmaster/getleavemasterleavetype`,
    getleavemastercarryforwardtype: `${pre_api_name}commonmaster/getleavemastercarryforwardtype`,
    getleavemasterencashmenttype: `${pre_api_name}commonmaster/getleavemasterencashmenttype`,
    getleavemasterweekendpolicy: `${pre_api_name}commonmaster/getleavemasterweekendpolicy`,
    getleavemasterholidaypolicy: `${pre_api_name}commonmaster/getleavemasterholidaypolicy`,
    getleavemasterapplicablegender: `${pre_api_name}commonmaster/getleavemasterapplicablegender`,

}

export const COUNTRY = {
    fetch: `${pre_api_name}countrymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}countrymaster${add_updated_row}`,
    delete: `${pre_api_name}countrymaster${delete_row}`,
    getbyId: `${pre_api_name}countrymaster${get_row_by_id}`,
    getAll: `${pre_api_name}countrymaster${get_data_source_all}`
}

export const CAMPUS = {
    fetch: `${pre_api_name}campusmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}campusmaster${add_updated_row}`,
    delete: `${pre_api_name}campusmaster${delete_row}`,
    getbyId: `${pre_api_name}campusmaster${get_row_by_id}`,
    getAll: `${pre_api_name}campusmaster${get_data_source_all}`
}

export const CITY = {
    fetch: `${pre_api_name}citymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}citymaster${add_updated_row}`,
    delete: `${pre_api_name}citymaster${delete_row}`,
    getbyId: `${pre_api_name}citymaster${get_row_by_id}`,
    getAll: `${pre_api_name}citymaster${get_data_source_all}`
}

export const DIVISION = {
    fetch: `${pre_api_name}divisionmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}divisionmaster${add_updated_row}`,
    delete: `${pre_api_name}divisionmaster${delete_row}`,
    getbyId: `${pre_api_name}divisionmaster${get_row_by_id}`,
    getAll: `${pre_api_name}divisionmaster${get_data_source_all}`
}

export const EDUCATION_MODE = {
    fetch: `${pre_api_name}educationmodemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}educationmodemaster${add_updated_row}`,
    delete: `${pre_api_name}educationmodemaster${delete_row}`,
    getbyId: `${pre_api_name}educationmodemaster${get_row_by_id}`,
    getAll: `${pre_api_name}educationmodemaster${get_data_source_all}`
}

export const LEAVE_MASTER = {
    fetch: `${pre_api_name}leavemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}leavemaster${add_updated_row}`,
    delete: `${pre_api_name}leavemaster${delete_row}`,
    getbyId: `${pre_api_name}leavemaster${get_row_by_id}`,
    getAll: `${pre_api_name}leavemaster${get_data_source_all}`,
    getbyUnitIdEmpType: `${pre_api_name}leavemaster/getalldetailsbyunitemoployeetypedepartmentid`
}

export const FELLOWSHIP_STATUS = {
    fetch: `${pre_api_name}fellowshipstatusmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}fellowshipstatusmaster${add_updated_row}`,
    delete: `${pre_api_name}fellowshipstatusmaster${delete_row}`,
    getbyId: `${pre_api_name}fellowshipstatusmaster${get_row_by_id}`,
    getAll: `${pre_api_name}fellowshipstatusmaster${get_data_source_all}`
}
export const JOB_NATURE = {
    fetch: `${pre_api_name}jobnaturemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}jobnaturemaster${add_updated_row}`,
    delete: `${pre_api_name}jobnaturemaster${delete_row}`,
    getbyId: `${pre_api_name}jobnaturemaster${get_row_by_id}`,
    getAll: `${pre_api_name}jobnaturemaster${get_data_source_all}`
}
export const MOBILE_CODE = {
    fetch: `${pre_api_name}mobilecodemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}mobilecodemaster${add_updated_row}`,
    delete: `${pre_api_name}mobilecodemaster${delete_row}`,
    getbyId: `${pre_api_name}mobilecodemaster${get_row_by_id}`,
    getAll: `${pre_api_name}mobilecodemaster${get_data_source_all}`
}
export const POSITION = {
    fetch: `${pre_api_name}positionmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}positionmaster${add_updated_row}`,
    delete: `${pre_api_name}positionmaster${delete_row}`,
    getbyId: `${pre_api_name}positionmaster${get_row_by_id}`,
    getAll: `${pre_api_name}positionmaster${get_data_source_all}`
}
export const STATE = {
    fetch: `${pre_api_name}statemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}statemaster${add_updated_row}`,
    delete: `${pre_api_name}statemaster${delete_row}`,
    getbyId: `${pre_api_name}statemaster${get_row_by_id}`,
    getAll: `${pre_api_name}statemaster${get_data_source_all}`
}
export const AREA = {
    fetch: `${pre_api_name}areamaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}areamaster${add_updated_row}`,
    delete: `${pre_api_name}areamaster${delete_row}`,
    getbyId: `${pre_api_name}areamaster${get_row_by_id}`,
    getAll: `${pre_api_name}areamaster${get_data_source_all}`
}

export const CARRERAPPLY = {
    fetch: `${pre_api_name}careerapplymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}careerapplymaster${add_updated_row}`,
    delete: `${pre_api_name}careerapplymaster${delete_row}`,
    getbyId: `${pre_api_name}careerapplymaster${get_row_by_id}`,
    getAll: `${pre_api_name}careerapplymaster${get_data_source_all}`
}

export const CAREERSTEP = {
    fetch: `${pre_api_name}empcareerstepmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}empcareerstepmaster${add_updated_row}`,
    delete: `${pre_api_name}empcareerstepmaster${delete_row}`,
    getbyId: `${pre_api_name}empcareerstepmaster${get_row_by_id}`,
    getAll: `${pre_api_name}empcareerstepmaster${get_data_source_all}`
}


export const ACADEMIC_DOMAIN = {
    fetch: `${pre_api_name}academicdomainmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}academicdomainmaster${add_updated_row}`,
    delete: `${pre_api_name}academicdomainmaster${delete_row}`,
    getbyId: `${pre_api_name}academicdomainmaster${get_row_by_id}`,
    getAll: `${pre_api_name}academicdomainmaster${get_data_source_all}`
}
export const ACADEMIC_STATUS = {
    fetch: `${pre_api_name}academicstatusmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}academicstatusmaster${add_updated_row}`,
    delete: `${pre_api_name}academicstatusmaster${delete_row}`,
    getbyId: `${pre_api_name}academicstatusmaster${get_row_by_id}`,
    getAll: `${pre_api_name}academicstatusmaster${get_data_source_all}`
}
export const MARITAL_STATUS = {
    fetch: `${pre_api_name}maritialstatusmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}maritialstatusmaster${add_updated_row}`,
    delete: `${pre_api_name}maritialstatusmaster${delete_row}`,
    getbyId: `${pre_api_name}maritialstatusmaster${get_row_by_id}`,
    getAll: `${pre_api_name}maritialstatusmaster${get_data_source_all}`
}
export const PATENT_STATUS = {
    fetch: `${pre_api_name}patentstatusmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}patentstatusmaster${add_updated_row}`,
    delete: `${pre_api_name}patentstatusmaster${delete_row}`,
    getbyId: `${pre_api_name}patentstatusmaster${get_row_by_id}`,
    getAll: `${pre_api_name}patentstatusmaster${get_data_source_all}`
}
export const REGION = {
    fetch: `${pre_api_name}regionmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}regionmaster${add_updated_row}`,
    delete: `${pre_api_name}regionmaster${delete_row}`,
    getbyId: `${pre_api_name}regionmaster${get_row_by_id}`,
    getAll: `${pre_api_name}regionmaster${get_data_source_all}`
}
export const RESPONSIBILITY = {
    fetch: `${pre_api_name}responsibilitymaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}responsibilitymaster${add_updated_row}`,
    delete: `${pre_api_name}responsibilitymaster${delete_row}`,
    getbyId: `${pre_api_name}responsibilitymaster${get_row_by_id}`,
    getAll: `${pre_api_name}responsibilitymaster${get_data_source_all}`
}
export const WRITTENT = {
    fetch: `${pre_api_name}writtenmaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}writtenmaster${add_updated_row}`,
    delete: `${pre_api_name}writtenmaster${delete_row}`,
    getbyId: `${pre_api_name}writtenmaster${get_row_by_id}`,
    getAll: `${pre_api_name}writtenmaster${get_data_source_all}`
}

export const SALARY_FORMULA = {
    fetch: `${pre_api_name}salaryformulamaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}salaryformulamaster${add_updated_row}`,
    getbyId: `${pre_api_name}salaryformulamaster${get_row_by_id}`,
    getAll: `${pre_api_name}salaryformulamaster${get_data_source_all}`,
    getAllDetailsByUnitAndDepartment: `${pre_api_name}salaryformulamaster/getalldetailsbyunitidanddepartmentid`,
    getalldetailsbyunitid: `${pre_api_name}salaryformulamaster/getalldetailsbyunitid`
}



export const EMPLOYEE_DOC_TYPE = {
    fetch: `${pre_api_name}employeedoctypemaster${get_data_source_by_paginate}`,
    modify: `${pre_api_name}employeedoctypemaster${add_updated_row}`,
    getbyId: `${pre_api_name}employeedoctypemaster${get_row_by_id}`,
    getAll: `${pre_api_name}employeedoctypemaster${get_data_source_all}`,
}


export const SALARY_PROCESS = {
    fetch: `${pre_trans_api_name}salaryprocess${get_data_source_by_paginate}`,
    modify: `${pre_trans_api_name}salaryprocess${add_updated_row}`,
    getbyId: `${pre_trans_api_name}salaryprocess${get_row_by_id}`,
    getAll: `${pre_trans_api_name}salaryprocess${get_data_source_all}`,
    getsalaryprocess: `${pre_trans_api_name}salaryprocess/getsalaryprocess`,
    delete: `${pre_trans_api_name}salaryprocess${delete_row}`,
    getSalary: `${pre_trans_api_name}salaryprocess/getsalary`
}



export const UNITWISEUSERSALARYAPPROVEMAPPING = {
    fetch: `${pre_api_name}unitwiseusersaleryapprovemapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwiseusersaleryapprovemapping${add_updated_row}`,
    getbyId: `${pre_api_name}unitwiseusersaleryapprovemapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwiseusersaleryapprovemapping${get_data_source_all}`,
    delete: `${pre_api_name}unitwiseusersaleryapprovemapping${delete_by_unit_id}`,
    get_all_details_by_unitid: `${pre_api_name}unitwiseusersaleryapprovemapping${get_all_details_by_unitid}`,
}

export const UNITWISEUSERATTENDANCEAPPROVEMAPPING = {
    fetch: `${pre_api_name}unitwiseuserattendanceapprovemapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}unitwiseuserattendanceapprovemapping${add_updated_row}`,
    getbyId: `${pre_api_name}unitwiseuserattendanceapprovemapping${get_row_by_id}`,
    getAll: `${pre_api_name}unitwiseuserattendanceapprovemapping${get_data_source_all}`,
    delete: `${pre_api_name}unitwiseuserattendanceapprovemapping${delete_by_unit_id}`,
    get_all_details_by_unitid: `${pre_api_name}unitwiseuserattendanceapprovemapping${get_all_details_by_unitid}`,
}

export const EMPFLEXIBLEWORK = {
    getempflexibleworkstatus: `${pre_api_name}empflexiblework/getempflexibleworkstatus`,
    getempflexibleworktype: `${pre_api_name}empflexiblework/getempflexibleworktype`,
    showalldatafordatatable: `${pre_api_name}empflexiblework/showalldatafordatatable`,
    getAll: `${pre_api_name}empflexiblework/getAll`,
    getbyid: `${pre_api_name}empflexiblework/getbyid`,
    checkempflexibleworkforappattendance: `${pre_api_name}empflexiblework/checkempflexibleworkforappattendance`,
    addorupdate: `${pre_api_name}empflexiblework/addorupdate`,
    approve: `${pre_api_name}empflexiblework/approve`,
    delete: `${pre_api_name}empflexiblework/delete`,
}

export const LEAVE_REQ = {
    getleaverequeststatus: `${pre_api_name}leaverequest/getleaverequeststatus`,
    getcustomdaypart: `${pre_api_name}leaverequest/getcustomdaypart`,
    showalldatafordatatable: `${pre_api_name}leaverequest/showalldatafordatatable`,
    getall: `${pre_api_name}leaverequest/getall`,
    getbyid: `${pre_api_name}leaverequest/getalldatabyid`,
    addorupdate: `${pre_api_name}leaverequest/addorupdate`,
    approve: `${pre_api_name}leaverequest/approve`,
    delete: `${pre_api_name}leaverequest/delete`,
    getalldataById: `${pre_api_name}leaverequest/getalldataById`,
    getleaverequestdaytype: `${pre_api_name}commonmaster/getleaverequestdaytype`,
    leaverequestapproval: `${pre_api_name}leaverequest/leaverequestapproval`,
    getleaverequestapprovestatus: `${pre_api_name}commonmaster/getleaverequestapprovestatus`,
    calculateleavedays: `${pre_api_name}leaverequest/calculateleavedays`,
}

export const visitnotification = {
    GetVisitNotificationByEmpIdAndDate: `${pre_api_name}visitnotification/GetVisitNotificationByEmpIdAndDate`,
}
export const employeeshiftschedule = {
    getall: `${pre_api_name}employeeshiftschedule/getall`,
    getbyid: `${pre_api_name}employeeshiftschedule/getbyid`,
    addorupdate: `${pre_api_name}employeeshiftschedule/addorupdate`,
    getemployeeshiftschedule: `${pre_api_name}employeeshiftschedule/getemployeeshiftschedule`,
    getemployeeshiftschedulewiseattendancecompare: `${pre_api_name}employeeshiftschedule/getemployeeshiftschedulewiseattendancecompare`
}


export const salaryAdvance = {
    addorupdate: `${pre_api_name}salaryadvance/addorupdate`,
    showalldatafordatatable: `${pre_api_name}salaryadvance/showalldatafordatatable`,
    delete: `${pre_api_name}salaryadvance/delete`,
    getbyid: `${pre_api_name}salaryadvance/getbyid`,
}


export const manualAttandance = {
    getdatafetchbyEmployeedate: `${pre_trans_api_name}menualempattendance/getdatafetchbyEmployeedate`,
    addorupdate: `${pre_trans_api_name}menualempattendance/addorupdate`,
    getmanualattendancetypes: `${pre_api_name}commonmaster/getmanualattendancetypes`,

}

export const USER_MASTER = {
    addorupdate: `${pre_api_name}usermaster/addorupdate`,
    showalldatafordatatable: `${pre_api_name}usermaster/showalldatafordatatable`,
    getbyid: `${pre_api_name}usermaster/getbyid`,
    getall: `${pre_api_name}usermaster/getall`,
}

export const UNITWISEUSERREQUIREMENTREQUESTAPPROVEMAPPING = {
    fetch: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${get_data_source_by_paginate}`,
    modify: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${add_updated_row}`,
    getbyId: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${get_row_by_id}`,
    getAll: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${get_data_source_all}`,
    delete: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${delete_by_unit_id}`,
    get_all_details_by_unitid: `${pre_api_name}UnitWiseUserRequirementRequestApproveMapping${get_all_details_by_unitid}`,
}

export const REQUIREMENTREQUEST = {
    fetch: `${pre_api_name}requirementrequest${get_data_source_by_paginate}`,
    modify: `${pre_api_name}requirementrequest${add_updated_row}`,
    getalldataById: `${pre_api_name}requirementrequest${get_all_data_by_id}`,
    getAll: `${pre_api_name}requirementrequest${get_data_source_all}`,
    delete: `${pre_api_name}requirementrequest${delete_by_unit_id}`,
    getrequirementrequestcategory: `${pre_api_name}commonmaster/getrequirementrequestcategory`,
    getrequirementrequesttype: `${pre_api_name}commonmaster/getrequirementrequesttype`,
    getrequirementrequeststatus: `${pre_api_name}commonmaster/getrequirementrequeststatus`,
    requirementrequestapproval: `${pre_api_name}requirementrequest/requirementrequestapproval`,
    getrequirementapprovalaction: `${pre_api_name}commonmaster/getrequirementapprovalaction`
}

export const JOBPOST = {
    fetch: `${pre_api_name}jobpost${get_data_source_by_paginate}`,
    modify: `${pre_api_name}jobpost${add_updated_row}`,
    getbyId: `${pre_api_name}jobpost${get_row_by_id}`,
    getAll: `${pre_api_name}jobpost${get_data_source_all}`,
    getAllData: `${pre_api_name}jobpost/getalldata`,
    delete: `${pre_api_name}jobpost${delete_by_unit_id}`,
    getalldataById: `${pre_api_name}jobpost${get_all_data_by_id}`,
    getjobdetailsbytoken: `${pre_api_name}jobpost/getjobdetailsbytoken`,
}

export const CANDIDATE = {
    fetch: `${pre_api_name}candidate${get_data_source_by_paginate}`,
    modify: `${pre_api_name}candidate${add_updated_row}`,
    getbyId: `${pre_api_name}candidate${get_row_by_id}`,
    getAll: `${pre_api_name}candidate${get_data_source_all}`,
    delete: `${pre_api_name}candidate${delete_by_unit_id}`,
    getbyjobid: `${pre_api_name}candidate/getbyjobid`,
    addorupdatecandidatepersonalinformation: `${pre_api_name}candidate/addorupdatecandidatepersonalinformation`,
    getcandidatepersonalinformation: `${pre_api_name}candidate/getcandidatepersonalinformation`,
    addorupdatecandidatequalification: `${pre_api_name}candidate/addorupdatecandidatequalification`,
    getcandidatequalification: `${pre_api_name}candidate/getcandidatequalification`,
    addorupdatecandidatequalifiedexams: `${pre_api_name}candidate/addorupdatecandidatequalifiedexams`,
    getcandidatequalifiedexams: `${pre_api_name}candidate/getcandidatequalifiedexams`,
    addorupdatecandidateexperience: `${pre_api_name}candidate/addorupdatecandidateexperience`,
    getcandidateexperience: `${pre_api_name}candidate/getcandidateexperience`,
    addorupdatecandidatefellowships: `${pre_api_name}candidate/addorupdatecandidatefellowships`,
    getcandidatefellowships: `${pre_api_name}candidate/getcandidatefellowships`,
    addorupdatecandidatebooks: `${pre_api_name}candidate/addorupdatecandidatebooks`,
    getcandidatebooks: `${pre_api_name}candidate/getcandidatebooks`,
    addorupdatecandidatepatent: `${pre_api_name}candidate/addorupdatecandidatepatent`,
    getcandidatepatent: `${pre_api_name}candidate/getcandidatepatent`,
    addorupdatecandidateconsultancy: `${pre_api_name}candidate/addorupdatecandidateconsultancy`,
    getcandidateconsultancy: `${pre_api_name}candidate/getcandidateconsultancy`,
    addorupdatecandidateaward: `${pre_api_name}candidate/addorupdatecandidateaward`,
    getcandidateaward: `${pre_api_name}candidate/getcandidateaward`,
    addorupdatecandidateresearchwork: `${pre_api_name}candidate/addorupdatecandidateresearchwork`,
    getcandidateresearchwork: `${pre_api_name}candidate/getcandidateresearchwork`,
    getcandidateinterviews: `${pre_api_name}candidate/getcandidateinterviews`,
    Getcandidateinterviewsfeedbackbycandidateid: `${pre_api_name}candidate/Getcandidateinterviewsfeedbackbycandidateid`,

}

export const CANDIDATESHORTLIST = {
    fetch: `${pre_api_name}candidateshortlist${get_data_source_by_paginate}`,
    modify: `${pre_api_name}candidateshortlist${add_updated_row}`,
    getbyId: `${pre_api_name}candidateshortlist${get_row_by_id}`,
    getAll: `${pre_api_name}candidateshortlist${get_data_source_all}`,
    delete: `${pre_api_name}candidateshortlist${delete_by_unit_id}`,
}

export const CANDIDATELOGIN = {
    fetch: `${pre_api_name}candidatelogin${get_data_source_by_paginate}`,
    modify: `${pre_api_name}candidatelogin${add_updated_row}`,
    getbyId: `${pre_api_name}candidatelogin${get_row_by_id}`,
    getAll: `${pre_api_name}candidatelogin${get_data_source_all}`,
    delete: `${pre_api_name}candidatelogin${delete_by_unit_id}`,
    getcandidateloginbytoken: `${pre_api_name}candidatelogin/getcandidateloginbytoken`,
    getcandidateloginvarifybytoken: `${pre_api_name}candidatelogin/getcandidateloginverifybytoken`,
}

export const INTERVIEWSCHEDULE = {
    fetch: `${pre_api_name}interviewschedule${get_data_source_by_paginate}`,
    modify: `${pre_api_name}interviewschedule${add_updated_row}`,
    getbyId: `${pre_api_name}interviewschedule${get_row_by_id}`,
    getAll: `${pre_api_name}interviewschedule${get_data_source_all}`,
    delete: `${pre_api_name}interviewschedule${delete_by_unit_id}`,
    getcommonstatus: `${pre_api_name}commonmaster/getcommonstatus`,
    getinterviewschedulestatus: `${pre_api_name}commonmaster/getinterviewschedulestatus`,
    getinterviewschedulemeetingplatform: `${pre_api_name}commonmaster/getinterviewschedulemeetingplatform`,
    getinterviewscheduleinterviewtype: `${pre_api_name}commonmaster/getinterviewscheduleinterviewtype`,
    getinterviewscheduleround: `${pre_api_name}commonmaster/getinterviewscheduleround`,
    sendmail: `${pre_api_name}interviewschedule/sendmail`,
    Getalldetails: `${pre_api_name}interviewschedule/Getalldetails`,
    schedulestatusupdate: `${pre_api_name}interviewschedule/schedulestatusupdate`,
}

export const INTERVIEWEVALUATION = {
    fetch: `${pre_api_name}interviewevaluation${get_data_source_by_paginate}`,
    modify: `${pre_api_name}interviewevaluation${add_updated_row}`,
    getbyId: `${pre_api_name}interviewevaluation${get_row_by_id}`,
    getAll: `${pre_api_name}interviewevaluation${get_data_source_all}`,
    delete: `${pre_api_name}interviewevaluation${delete_by_unit_id}`,
    Getalldetails: `${pre_api_name}interviewevaluation/Getalldetails`,
}

export const OFFERLETTER = {
    fetch: `${pre_api_name}offerletter${get_data_source_by_paginate}`,
    modify: `${pre_api_name}offerletter${add_updated_row}`,
    getbyId: `${pre_api_name}offerletter${get_row_by_id}`,
    getAll: `${pre_api_name}offerletter${get_data_source_all}`,
    delete: `${pre_api_name}offerletter${delete_by_unit_id}`,
}

export const ONBOARDING = {
    fetch: `${pre_api_name}onboarding${get_data_source_by_paginate}`,
    modify: `${pre_api_name}onboarding${add_updated_row}`,
    getbyId: `${pre_api_name}onboarding${get_row_by_id}`,
    getAll: `${pre_api_name}onboarding${get_data_source_all}`,
    delete: `${pre_api_name}onboarding${delete_by_unit_id}`,
}

export const ADDITIONAL_DAYOFF = {
    fetch: `${pre_api_name}EmployeeAlternativeOffDay${get_data_source_by_paginate}`,
    modify: `${pre_api_name}EmployeeAlternativeOffDay${add_updated_row}`,
    delete: `${pre_api_name}EmployeeAlternativeOffDay${delete_row}`,
    getbyId: `${pre_api_name}EmployeeAlternativeOffDay${get_row_by_id}`,
    getAll: `${pre_api_name}EmployeeAlternativeOffDay${get_data_source_all}`
}

export const ADDITIONAL_ABSENT = {
     fetch: `${pre_api_name}employeemanualabsent${get_data_source_by_paginate}`,
    modify: `${pre_api_name}employeemanualabsent${add_updated_row}`,
    delete: `${pre_api_name}employeemanualabsent${delete_row}`,
    getbyId: `${pre_api_name}employeemanualabsent${get_row_by_id}`,
    getAll: `${pre_api_name}employeemanualabsent${get_data_source_all}`
}

export const ATTENDANCE_PROCESS = {
    fetch: `${pre_api_name}monthlyattendancewithleavedetails${get_data_source_by_paginate}`,
    modify: `${pre_api_name}monthlyattendancewithleavedetails${add_updated_row}`,
    getbyId: `${pre_api_name}monthlyattendancewithleavedetails${get_row_by_id}`,
    getAll: `${pre_api_name}monthlyattendancewithleavedetails${get_data_source_all}`,
    getmonthlyattendancewithleavedetails: `${pre_api_name}monthlyattendancewithleavedetails/getmonthlyattendancereportwithleave`,
    delete: `${pre_api_name}monthlyattendancewithleavedetails${delete_row}`,
    deletebeforemonthlyattendancewithleavedetailssubmitonetimecall: `${pre_api_name}monthlyattendancewithleavedetails/deletebeforemonthlyattendancewithleavedetailssubmitonetimecall`,
}