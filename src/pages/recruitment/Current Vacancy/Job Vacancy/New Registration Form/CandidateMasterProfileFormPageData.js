import { createContext, useContext } from 'react'

// ============================================================================
// APPLICATION SECTIONS DATA
// ============================================================================
// This file defines all 18 sections and their fields for two combined forms:
//   PART 1 (Sections 1–13): Candidate Master Profile Form
//   PART 2 (Sections 14–18): Official Travel, Mobility & Field Work Eligibility Form
//
// Field format (compact array): [label, name, placeholder, status, type?, options?]
// ============================================================================

const applicationSections = [

  // ==========================================================================
  // PART 1: CANDIDATE MASTER PROFILE FORM (Sections 1–13)
  // ==========================================================================

  {
    id: 1,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Personal Information',
    subtitle: 'Kindly provide your basic personal details as per your official documents.',
    fields: [
      ['Candidate First Name', 'candidateFirstName', 'Enter first name', 'Required'],
      ['Candidate Middle Name', 'candidateMiddleName', 'Enter middle name (optional)', 'Optional'],
      ['Candidate Last Name', 'candidateLastName', 'Enter last name', 'Required'],
      ["Father's First Name", 'fathersFirstName', "Enter father's first name", 'Required'],
      ["Father's Middle Name", 'fathersMiddleName', "Enter father's middle name (optional)", 'Optional'],
      ["Father's Last Name", 'fathersLastName', "Enter father's last name", 'Required'],
      ["Mother's First Name", 'mothersFirstName', "Enter mother's first name", 'Required'],
      ["Mother's Middle Name", 'mothersMiddleName', "Enter mother's middle name (optional)", 'Optional'],
      ["Mother's Last Name", 'mothersLastName', "Enter mother's last name", 'Required'],
      ['Spouse First Name', 'spouseFirstName', 'Enter spouse first name (optional)', 'Optional'],
      ['Spouse Middle Name', 'spouseMiddleName', 'Enter spouse middle name (optional)', 'Optional'],
      ['Spouse Last Name', 'spouseLastName', 'Enter spouse last name (optional)', 'Optional'],
      ['Date of Birth', 'dateOfBirth', 'Enter date of birth (DD/MM/YYYY)', 'Required'],
      ['Age as on Application Date', 'ageAsOnApplicationDate', 'Auto-calculated from Date of Birth', 'Auto-Calculated'],
      ['Place of Birth', 'placeOfBirth', 'Enter place of birth (optional)', 'Optional'],
      ['Gender', 'gender', 'Select gender', 'Required', 'select', ['Male', 'Female', 'Transgender', 'Other']],
      ['Marital Status', 'maritalStatus', 'Select marital status', 'Required', 'select', ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']],
      ['Nationality', 'nationality', 'Enter nationality (e.g., Indian)', 'Required'],
      ['Religion', 'religion', 'Select religion', 'Optional', 'select', ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Zoroastrianism', 'Other']],
      ['Community / Caste Category', 'communityCasteCategory', 'Select community or caste category', 'Optional', 'select', ['General', 'OBC', 'SC', 'ST', 'EWS', 'Other', 'Prefer not to say']],
      ['Mother Tongue', 'motherTongue', 'Select mother tongue', 'Optional', 'select', ['Hindi', 'Odia', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili', 'Santali', 'Kashmiri', 'Nepali', 'Konkani', 'Sindhi', 'Dogri', 'Manipuri', 'Bodo', 'Sanskrit', 'English', 'Other']],
    ],
  },

  {
    id: 2,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Physical & Identification Information',
    subtitle: 'Kindly provide your physical measurements and identification details.',
    fields: [
      ['Height (cm)', 'heightCm', 'Enter height in cm (e.g., 170)', 'Optional', 'number'],
      ['Weight (kg)', 'weightKg', 'Enter weight in kg (e.g., 65)', 'Optional', 'number'],
      ['Blood Group', 'bloodGroup', 'Select blood group', 'Optional', 'select', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']],
      ['Handedness', 'handedness', 'Select handedness', 'Optional', 'select', ['Right-Handed', 'Left-Handed', 'Ambidextrous']],
      ['Identification Mark / Visible Identification Mark', 'identificationMark', 'Enter visible identification mark (e.g., mole on left cheek, scar on right hand)', 'Optional', 'textarea'],
      ['Disability Status', 'disabilityStatus', 'Select disability status', 'Optional', 'select', ['No Disability', 'Visual Impairment', 'Hearing Impairment', 'Locomotor Disability', 'Intellectual Disability', 'Multiple Disabilities', 'Other']],
    ],
  },

  {
    id: 3,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Education, Skills & Experience',
    subtitle: 'Kindly provide your educational qualifications, technical skills, experience, and certifications.',
    fields: [
      ['Occupation', 'occupation', 'Enter current occupation or job title (e.g., Software Developer, Student, Freelancer)', 'Optional'],
      ['Higher Qualification', 'higherQualification', 'Enter highest educational qualification (e.g., B.Tech, MBA, B.Com, 12th Pass)', 'Required'],
      ['Computer Course', 'computerCourse', 'Enter computer course completed (e.g., DCA, PGDCA, MS-CIT, Tally, MS Office)', 'Optional'],
      ['Typing Speed (WPM)', 'typingSpeed', 'Enter typing speed in words per minute (e.g., 35)', 'Optional', 'number'],
      ['Technical Skill', 'technicalSkill', 'Enter technical skills (e.g., MS Excel, AutoCAD, Photoshop)', 'Optional', 'textarea'],
      ['Technical Stack', 'technicalStack', 'Enter technology stack (e.g., React.js, Node.js, MySQL, Python)', 'Optional', 'textarea'],
      ['Languages Known', 'languagesKnown', 'Enter languages known (e.g., English, Hindi, Odia)', 'Required', 'textarea'],
      ['Experience', 'experience', 'Enter total professional work experience summary and key projects', 'Optional', 'textarea'],
      ['Certification', 'certification', 'Enter professional certifications held (e.g., AWS Certified, Google Analytics, CCNA)', 'Optional', 'textarea'],
    ],
  },

  {
    id: 4,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Address & Contact Information',
    subtitle: 'Kindly provide your active contact details and complete residential address details.',
    fields: [
      ['Mobile Number', 'mobileNumber', 'Enter active 10-digit mobile number', 'Required', 'tel'],
      ['WhatsApp Number', 'whatsappNumber', 'Enter active 10-digit WhatsApp number', 'Required', 'tel'],
      ['Alternate Mobile Number', 'alternateMobileNumber', 'Enter alternate contact number (optional)', 'Optional', 'tel'],
      ['Email ID', 'emailId', 'Enter primary email address (e.g., name@example.com)', 'Required', 'email'],
      ['Alternate Email ID', 'alternateEmailId', 'Enter alternate email address (optional)', 'Optional', 'email'],
      ['Permanent Address', 'permanentAddress', 'Enter complete permanent address including house number, street, city, district, state, and PIN code', 'Required', 'textarea'],
      ['Present Address', 'presentAddress', 'Enter current residential address (or type "Same as Permanent Address")', 'Required', 'textarea'],
    ],
  },

  {
    id: 5,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Social Media',
    subtitle: 'Kindly provide links to your social media profiles and online presence.',
    fields: [
      ['LinkedIn Profile', 'linkedinProfileUrl', 'Enter LinkedIn profile URL (e.g., https://linkedin.com/in/username)', 'Optional', 'url'],
      ['GitHub Profile', 'githubProfileUrl', 'Enter GitHub profile URL (e.g., https://github.com/username)', 'Optional', 'url'],
      ['Portfolio Link', 'portfolioLink', 'Enter personal portfolio website URL (e.g., https://portfolio.com)', 'Optional', 'url'],
      ['Facebook Profile', 'facebookProfileUrl', 'Enter Facebook profile URL (optional)', 'Optional', 'url'],
      ['Instagram Profile', 'instagramProfileUrl', 'Enter Instagram profile URL (optional)', 'Optional', 'url'],
      ['Twitter / X Profile', 'twitterProfileUrl', 'Enter Twitter / X profile URL (optional)', 'Optional', 'url'],
      ['Telegram Profile', 'telegramProfileUrl', 'Enter Telegram profile URL or username (optional)', 'Optional', 'url'],
      ['Personal Website', 'personalWebsite', 'Enter personal website URL (optional)', 'Optional', 'url'],
    ],
  },

  {
    id: 6,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Internship Details',
    subtitle: 'Kindly provide your internship details, organization, role, and duration.',
    fields: [
      ['Internship (If Any)', 'internshipIfAny', 'Select Yes or No', 'Required', 'select', ['Yes', 'No']],
      ['Internship Duration', 'internshipDuration', 'Enter total duration of internship (e.g., 3 Months, 6 Months, 1 Year)', 'Optional'],
      ['Internship Type', 'internshipType', 'Select internship type', 'Optional', 'select', ['Paid', 'Unpaid', 'Stipend Based', 'Academic / College Project', 'Other']],
      ['Internship Organization Name', 'internshipOrganizationName', 'Enter full name of internship organization', 'Optional'],
      ['Internship Role / Designation', 'internshipRole', 'Enter role or designation (e.g., Web Developer Intern, Data Analyst Intern)', 'Optional'],
      ['Internship Start Date', 'internshipStartDate', 'Enter internship start date (DD/MM/YYYY)', 'Optional'],
      ['Internship End Date', 'internshipEndDate', 'Enter internship end date (DD/MM/YYYY)', 'Optional'],
      ['Internship Mode', 'internshipMode', 'Select internship mode', 'Optional', 'select', ['Online', 'Offline', 'Hybrid']],
      ['Internship Location', 'internshipLocation', 'Enter city or location of internship organization', 'Optional'],
      ['Department / Team Name', 'internshipDepartmentTeamName', 'Enter department or team name (e.g., Software Engineering, HR)', 'Optional'],
      ['Internship Project / Work Title', 'internshipProjectWorkTitle', 'Enter main project or work title completed during internship', 'Optional', 'textarea'],
    ],
  },

  {
    id: 7,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Trainer & Certificate Details',
    subtitle: 'Kindly provide details of your internship trainer, supervisor, and certificate.',
    fields: [
      ['Trainer / Supervisor Name', 'trainerSupervisorName', 'Enter trainer or supervisor full name', 'Optional'],
      ['Trainer / Supervisor Designation', 'trainerSupervisorDesignation', 'Enter trainer or supervisor designation', 'Optional'],
      ['Trainer / Supervisor Contact Number', 'trainerSupervisorContactNumber', 'Enter trainer or supervisor contact number', 'Optional', 'tel'],
      ['Trainer / Supervisor Email ID', 'trainerSupervisorEmailId', 'Enter trainer or supervisor email address', 'Optional', 'email'],
      ['Internship Certificate Registration Number', 'internshipCertificateRegNumber', 'Enter internship certificate registration number (if issued)', 'Optional'],
      ['Internship Certificate Serial Number', 'internshipCertificateSerialNumber', 'Enter certificate serial number (if applicable)', 'Optional'],
      ['Student ID', 'studentId', 'Enter student ID or roll number assigned during internship / college', 'Optional'],
    ],
  },

  {
    id: 8,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Employment Information',
    subtitle: 'Kindly provide your current and previous employment details.',
    fields: [
      ['Employment Experience (If Any)', 'employmentIfAny', 'Select Yes or No', 'Required', 'select', ['Yes', 'No']],
      ['Current Employment Status', 'currentEmploymentStatus', 'Select current employment status', 'Optional', 'select', ['Employed Full-Time', 'Employed Part-Time', 'Self-Employed / Freelancer', 'Unemployed', 'Student', 'Looking for Work', 'Other']],
      ['Current Company / Organization', 'currentCompany', 'Enter current employer or organization name', 'Optional'],
      ['Current Designation', 'currentDesignation', 'Enter current job title or designation', 'Optional'],
      ['Previous Company', 'previousCompany', 'Enter most recent previous employer name', 'Optional'],
      ['Previous Designation', 'previousDesignation', 'Enter job title or designation at previous company', 'Optional'],
      ['Total Work Experience', 'totalWorkExperience', 'Enter total professional work experience (e.g., 2 Years 3 Months)', 'Optional'],
      ['Notice Period', 'noticePeriod', 'Enter notice period (e.g., 30 Days, 60 Days, Immediately Available)', 'Optional'],
      ['Current Salary / CTC', 'currentSalaryCTC', 'Enter current or last drawn salary (e.g., ₹25,000/month or ₹3 LPA)', 'Optional'],
      ['Expected Salary / CTC', 'expectedSalaryCTC', 'Enter expected salary (e.g., ₹35,000/month or ₹4.5 LPA)', 'Optional'],
      ['Availability / Joining Status', 'availabilityJoiningStatus', 'Select joining availability', 'Optional', 'select', ['Immediately Available', 'Within 15 Days', 'Within 30 Days', 'Within 60 Days', 'After Notice Period', 'Other']],
      ['Willingness to Relocate', 'willingnessToRelocate', 'Select relocation preference', 'Optional', 'select', ['Yes — Willing to relocate anywhere', 'Yes — Willing to relocate within the state', 'Maybe — Depends on location', 'No — Not willing to relocate']],
    ],
  },

  {
    id: 9,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Identity & Government Information',
    subtitle: 'Kindly provide your government-issued identity document and certificate numbers for verification.',
    fields: [
      ['Aadhaar Number', 'aadhaarNumber', 'Enter 12-digit Aadhaar number', 'Required for Verification', 'tel'],
      ['PAN Number', 'panNumber', 'Enter 10-character PAN number (e.g., ABCDE1234F)', 'Required for Payroll'],
      ['Passport Number', 'passportNumber', 'Enter valid Passport number (if issued)', 'Optional'],
      ['Driving Licence Number', 'drivingLicenceNumber', 'Enter driving licence number (if available)', 'Optional'],
      ['Voter ID Number', 'voterIdNumber', 'Enter Voter ID / EPIC number (if available)', 'Optional'],
      ['Residence Certificate Number', 'residenceCertificateNumber', 'Enter Residence / Residential certificate number (if issued)', 'Optional'],
      ['Caste Certificate Number', 'casteCertificateNumber', 'Enter Caste certificate number (if issued)', 'Optional'],
      ['Income Certificate Number', 'incomeCertificateNumber', 'Enter Income certificate number (if issued)', 'Optional'],
      ['EWS Certificate Number', 'ewsCertificateNumber', 'Enter Economically Weaker Section (EWS) certificate number (if issued)', 'Optional'],
      ['Domicile Certificate Number', 'domicileCertificateNumber', 'Enter Domicile certificate number (if issued)', 'Optional'],
      ['Birth Certificate Registration Number', 'birthCertificateRegNumber', 'Enter Birth Certificate registration number (if issued)', 'Optional'],
      ['Disability Certificate / UDID Number', 'disabilityCertificateUdidNumber', 'Enter Unique Disability ID (UDID) or certificate number (if applicable)', 'Optional'],
      ['Ration Card Number', 'rationCardNumber', 'Enter Ration card number (if available)', 'Optional'],
      ['Police Verification / Character Certificate Number', 'policeVerificationCharacterCertNumber', 'Enter Police Verification or Character Certificate number (if issued)', 'Optional'],
    ],
  },

  {
    id: 10,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: '10th Standard Qualification Details',
    subtitle: 'Kindly provide complete details of your 10th / Matriculation / Secondary Education.',
    fields: [
      ['Qualification Name (10th)', 'tenthQualificationName', 'Enter qualification name (e.g., 10th / Matriculation / SSC)', 'Required'],
      ['Year of Passing (10th)', 'tenthYearOfPassing', 'Enter year of passing (e.g., 2018)', 'Required', 'number'],
      ['Name of the Board', 'tenthBoardName', 'Select 10th Class Board', 'Required', 'select', [
        'CBSE',
        'ICSE / CISCE',
        'NIOS',
        'BSE Odisha',
        'BSEB Bihar',
        'UPMSP (U.P. Board)',
        'WBBSE (West Bengal Board)',
        'MSBSHSE (Maharashtra Board)',
        'BSE Telangana',
        'BSEAP (Andhra Pradesh)',
        'KSEEB (Karnataka Board)',
        'TNBSE (Tamil Nadu Board)',
        'GSEB (Gujarat Board)',
        'RBSE (Rajasthan Board)',
        'MPBSE (Madhya Pradesh Board)',
        'HBSE (Haryana Board)',
        'PSEB (Punjab Board)',
        'CGBSE (Chhattisgarh Board)',
        'JAC (Jharkhand Board)',
        'UKSE (Uttarakhand Board)',
        'HPBOSE (Himachal Pradesh)',
        'JKBOSE (J&K Board)',
        'SEBA (Assam Board)',
        'MBOSE (Meghalaya Board)',
        'NBSE (Nagaland Board)',
        'MBSE (Mizoram Board)',
        'TBSE (Tripura Board)',
        'BSEM (Manipur Board)',
        'Goa Board',
        'KBPE (Kerala Board)',
        'Other'
      ]],
      ['Type of Board', 'tenthBoardType', 'Select type of board', 'Required', 'select', ['Central Board', 'State Board', 'Private/National Board', 'International Board', 'Open Schooling Board', 'Other']],
      ['Student Roll Number', 'tenthRollNumber', 'Enter student roll number', 'Required'],
      ['Student Enrollment Number (if applicable)', 'tenthEnrollmentNumber', 'Enter student enrollment number (optional)', 'Optional'],
      ['Certificate Serial Number', 'tenthCertificateSerialNumber', 'Enter certificate serial number (optional)', 'Optional'],
      ['Certificate Registration Number', 'tenthCertificateRegNumber', 'Enter certificate registration number (optional)', 'Optional'],
      ['Date of Issue of Certificate', 'tenthCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Total Marks Obtained', 'tenthTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'tenthMaximumMarks', 'Enter maximum marks (e.g., 500 / 600)', 'Required', 'number'],
      ['Percentage / Grade / Division', 'tenthPercentageGradeDivision', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['Subjects Studied (Main Subjects)', 'tenthSubjectsStudied', 'Enter main subjects studied (e.g., Mathematics, Science, English, Social Studies, Odia)', 'Required', 'textarea'],
      ['School Name', 'tenthSchoolName', 'Enter full name of school attended', 'Required'],
      ['School Type (Government / Private / Aided / Others)', 'tenthSchoolType', 'Select type of school', 'Optional', 'select', ['Government', 'Private', 'Aided', 'Others']],
      ['School Address', 'tenthSchoolAddress', 'Enter full address of school', 'Optional', 'textarea'],
      ['School Code / Board Code (if available)', 'tenthSchoolCode', 'Enter school code or board affiliation code (optional)', 'Optional'],
      ['Medium of Instruction (English / Hindi / Odia / Others)', 'tenthMediumOfInstruction', 'Select medium of instruction', 'Required', 'select', ['English', 'Hindi', 'Odia', 'Others']],
      ['Residing Year During School (From – To)', 'tenthResidingYears', 'Enter years attended (e.g., 2016 – 2018)', 'Optional'],
      ['School Contact Number (if known)', 'tenthSchoolContactNumber', 'Enter school contact number (optional)', 'Optional', 'tel'],
      ['Principal / Headmaster’s Name', 'tenthPrincipalHeadmasterName', 'Enter Principal or Headmaster full name (optional)', 'Optional'],
    ],
  },

  {
    id: 11,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Secondary / Higher Secondary / Technical Qualification Details',
    subtitle: 'Kindly provide details of your 12th, ITI, Diploma, or relevant qualification.',
    fields: [
      ['Qualification Name', 'twelfthQualificationName', 'Select qualification', 'Required', 'select', ['12th', 'ITI', 'Diploma', 'Other']],
      ['Stream (Science / Commerce / Arts / Vocational)', 'twelfthStream', 'Select stream', 'Required', 'select', ['Science', 'Commerce', 'Arts', 'Vocational', 'Other']],
      ['School / College Name', 'twelfthSchoolCollegeName', 'Enter full name of school or college attended', 'Required'],
      ['School / College Type (Government / Private / Aided / Others)', 'twelfthSchoolCollegeType', 'Select type of school or college', 'Optional', 'select', ['Government', 'Private', 'Aided', 'Others']],
      ['School / College Address', 'twelfthSchoolCollegeAddress', 'Enter full address of school or college', 'Optional', 'textarea'],
      ['School / College Code (if available)', 'twelfthSchoolCollegeCode', 'Enter school or college code (optional)', 'Optional'],
      ['Medium of Instruction (English / Hindi / Odia / Others)', 'twelfthMediumOfInstruction', 'Select medium of instruction', 'Required', 'select', ['English', 'Hindi', 'Odia', 'Others']],
      ['Year of Passing (12th / +2)', 'twelfthYearOfPassing', 'Enter year of passing (e.g., 2020)', 'Required', 'number'],
      ['Examination Year', 'twelfthExaminationYear', 'Enter examination year (e.g., 2020)', 'Optional', 'number'],
      ['Examination Type', 'twelfthExaminationType', 'Select examination type', 'Optional', 'select', ['Regular', 'Private', 'Ex-Regular', 'Compartmental', 'Supplementary', 'Other']],
      ['Name of the Board', 'twelfthBoardName', 'Select 12th Class Board / Council', 'Required', 'select', [
        'CHSE Odisha',
        'CBSE',
        'ISC / CISCE',
        'NIOS',
        'BSEB Bihar',
        'UPMSP (U.P. Board)',
        'WBCHSE (West Bengal Board)',
        'MSBSHSE (Maharashtra Board)',
        'TS BIE (Telangana)',
        'BIEAP (Andhra Pradesh)',
        'KSEEB / Pre-University (Karnataka)',
        'TNBSE (Tamil Nadu Board)',
        'GSEB (Gujarat Board)',
        'RBSE (Rajasthan Board)',
        'MPBSE (Madhya Pradesh Board)',
        'HBSE (Haryana Board)',
        'PSEB (Punjab Board)',
        'CGBSE (Chhattisgarh Board)',
        'JAC (Jharkhand Board)',
        'UKSE (Uttarakhand Board)',
        'HPBOSE (Himachal Pradesh)',
        'JKBOSE (J&K Board)',
        'AHSEC (Assam Board)',
        'MBOSE (Meghalaya Board)',
        'NBSE (Nagaland Board)',
        'MBSE (Mizoram Board)',
        'TBSE (Tripura Board)',
        'COHSEM (Manipur Board)',
        'Goa Board',
        'DHSE (Kerala Board)',
        'Other'
      ]],
      ['Type of Board (State / CBSE / ICSE / CHSE / Others)', 'twelfthBoardType', 'Select type of board', 'Required', 'select', ['CHSE', 'Central Board (CBSE)', 'State Board', 'ICSE / CISCE', 'Private/National Board', 'International Board', 'Open Schooling Board (NIOS)', 'Other']],
      ['Roll Number', 'twelfthRollNumber', 'Enter student roll number', 'Required'],
      ['Enrollment Number (if applicable)', 'twelfthEnrollmentNumber', 'Enter student enrollment number (optional)', 'Optional'],
      ['Subjects Studied (Main & Optional)', 'twelfthSubjectsStudied', 'Enter main and optional subjects studied (e.g., Physics, Chemistry, Mathematics, Biology, English)', 'Required', 'textarea'],
      ['Total Marks Obtained', 'twelfthTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'twelfthMaximumMarks', 'Enter maximum marks (e.g., 500 / 600)', 'Required', 'number'],
      ['Percentage / Grade / Division', 'twelfthPercentageGradeDivision', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['Certificate Serial Number', 'twelfthCertificateSerialNumber', 'Enter certificate serial number (optional)', 'Optional'],
      ['Certificate Registration Number', 'twelfthCertificateRegNumber', 'Enter certificate registration number (optional)', 'Optional'],
      ['Certificate Type', 'twelfthCertificateType', 'Select certificate type', 'Optional', 'select', ['Passing Certificate', 'Provisional Certificate', 'Migration Certificate', 'Marksheet Cum Certificate', 'Other']],
      ['Date of Issue of Certificate', 'twelfthCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Residing Year During Course (From – To)', 'twelfthResidingYears', 'Enter years attended (e.g., 2018 – 2020)', 'Optional'],
      ['Mode of Study', 'twelfthModeOfStudy', 'Select mode of study', 'Optional', 'select', ['Regular / Full-Time', 'Distance / Open Learning', 'Part-Time', 'Private Candidate', 'Other']],
      ['College Contact Number (if known)', 'twelfthCollegeContactNumber', 'Enter college contact number (optional)', 'Optional', 'tel'],
      ['Principal / Headmaster’s Name', 'twelfthPrincipalHeadmasterName', 'Enter Principal or Headmaster full name (optional)', 'Optional'],

      // ---- ITI SPECIFIC FIELDS ----
      ['ITI Trade / Branch', 'itiTrade', 'Select or enter ITI trade', 'Required', 'select', ['Electrician', 'Fitter', 'Turner', 'Machinist', 'Welder', 'COPA (Computer Operator)', 'Mechanic Motor Vehicle', 'Draughtsman (Civil/Mech)', 'Wireman', 'Refrigeration & AC Mechanic', 'Plumber', 'Other']],
      ['ITI College / Institute Name', 'itiInstituteName', 'Enter full name of ITI institute', 'Required'],
      ['NCVT / SCVT Affiliation', 'itiAffiliation', 'Select affiliation body', 'Required', 'select', ['NCVT', 'SCVT', 'Other']],
      ['ITI Institute Type', 'itiInstituteType', 'Select institute type', 'Optional', 'select', ['Government ITI', 'Private ITI', 'Aided ITI', 'Others']],
      ['ITI Institute Address', 'itiInstituteAddress', 'Enter full address of ITI institute', 'Optional', 'textarea'],
      ['ITI NCVT / Institute Code (if available)', 'itiInstituteCode', 'Enter ITI / NCVT affiliation code (optional)', 'Optional'],
      ['Medium of Instruction', 'itiMediumOfInstruction', 'Select medium of instruction', 'Required', 'select', ['English', 'Hindi', 'Odia', 'Others']],
      ['Year of Passing (ITI)', 'itiYearOfPassing', 'Enter year of passing (e.g., 2021)', 'Required', 'number'],
      ['Course Duration', 'itiCourseDuration', 'Select course duration', 'Optional', 'select', ['1 Year', '2 Years', 'Other']],
      ['ITI Roll Number / Registration Number', 'itiRollNumber', 'Enter ITI roll number or NCVT registration number', 'Required'],
      ['Semester / Annual Pattern', 'itiSystemType', 'Select evaluation pattern', 'Optional', 'select', ['Annual Pattern', 'Semester System', 'Other']],
      ['Main Subjects / Modules Studied', 'itiSubjectsStudied', 'Enter main trade practical and theory modules studied', 'Required', 'textarea'],
      ['Total Marks Obtained', 'itiTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'itiMaximumMarks', 'Enter maximum marks (e.g., 700 / 1400)', 'Required', 'number'],
      ['Percentage / Grade / Division', 'itiPercentageGradeDivision', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['NCVT / SCVT Certificate Number', 'itiCertificateNumber', 'Enter NCVT or SCVT certificate number (optional)', 'Optional'],
      ['Date of Issue of Certificate', 'itiCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Apprenticeship Completed (NAC)', 'itiApprenticeshipDone', 'Select whether NAC apprenticeship was completed', 'Optional', 'select', ['Yes', 'No']],
      ['Mode of Study', 'itiModeOfStudy', 'Select mode of study', 'Optional', 'select', ['Regular Full-Time', 'Apprenticeship Mode', 'External', 'Other']],
      ['Institute Contact Number (if known)', 'itiContactNumber', 'Enter ITI institute contact number (optional)', 'Optional', 'tel'],
      ['Principal / Superintendent Name', 'itiPrincipalSuperintendentName', 'Enter Principal or Superintendent full name (optional)', 'Optional'],

      // ---- DIPLOMA SPECIFIC FIELDS ----
      ['Diploma Branch / Specialization', 'diplomaBranch', 'Select diploma engineering branch', 'Required', 'select', ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Computer Science & Engineering', 'Electronics & Telecommunication', 'Chemical Engineering', 'Automobile Engineering', 'Mining Engineering', 'Architectural Assistantship', 'Information Technology', 'Other']],
      ['Polytechnic / Diploma College Name', 'diplomaPolytechnicCollegeName', 'Enter full name of polytechnic or diploma college', 'Required'],
      ['Technical Board / University', 'diplomaTechnicalBoard', 'Select Technical Board or University', 'Required', 'select', ['SCTE&VT Odisha', 'BTEUP (U.P. Tech Board)', 'MSBTE (Maharashtra)', 'DOTE (Tamil Nadu)', 'WBSCTE (West Bengal)', 'DTTE Delhi', 'AICTE / Recognized University', 'Other']],
      ['College Type', 'diplomaCollegeType', 'Select college type', 'Optional', 'select', ['Government Polytechnic', 'Private Polytechnic', 'Aided', 'Autonomous', 'Others']],
      ['Polytechnic / College Address', 'diplomaCollegeAddress', 'Enter full address of polytechnic or college', 'Optional', 'textarea'],
      ['AICTE / Approval Code (if available)', 'diplomaAicteCode', 'Enter AICTE or Board approval code (optional)', 'Optional'],
      ['Medium of Instruction', 'diplomaMediumOfInstruction', 'Select medium of instruction', 'Required', 'select', ['English', 'Hindi', 'Odia', 'Others']],
      ['Year of Passing (Diploma)', 'diplomaYearOfPassing', 'Enter year of passing (e.g., 2022)', 'Required', 'number'],
      ['Course Duration / Entry Type', 'diplomaCourseType', 'Select duration or entry type', 'Optional', 'select', ['3 Years Regular', '2 Years Lateral Entry', '1 Year Advanced Diploma', 'Other']],
      ['Roll Number / Registration Number / PIN', 'diplomaRollNumber', 'Enter student roll number, registration number, or PIN', 'Required'],
      ['Evaluation Pattern', 'diplomaPattern', 'Select evaluation pattern', 'Optional', 'select', ['Semester Pattern', 'Annual Pattern', 'Other']],
      ['Core Engineering Subjects Studied', 'diplomaSubjectsStudied', 'Enter core engineering subjects and project work', 'Required', 'textarea'],
      ['Total Marks Obtained', 'diplomaTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'diplomaMaximumMarks', 'Enter maximum marks (e.g., 3000 / 4000)', 'Required', 'number'],
      ['Percentage / Grade / Division', 'diplomaPercentageGradeDivision', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['Diploma Certificate / Registration Number', 'diplomaCertificateRegNumber', 'Enter diploma certificate or registration serial number (optional)', 'Optional'],
      ['Date of Issue of Certificate', 'diplomaCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Residing Year During Course (From – To)', 'diplomaResidingYears', 'Enter years attended (e.g., 2019 – 2022)', 'Optional'],
      ['Mode of Study', 'diplomaModeOfStudy', 'Select mode of study', 'Optional', 'select', ['Regular Full-Time', 'Lateral Entry', 'Part-Time', 'Distance / Open Learning', 'Other']],
      ['College Contact Number (if known)', 'diplomaCollegeContactNumber', 'Enter college contact number (optional)', 'Optional', 'tel'],
      ['Principal / HOD Name', 'diplomaPrincipalHodName', 'Enter Principal or HOD full name (optional)', 'Optional'],

      // ---- OTHER QUALIFICATION SPECIFIC FIELDS ----
      ['School / College / Institute Name', 'otherQualInstitutionName', 'Enter full name of school, college, or institute', 'Required'],
      ['Board / University / Examining Body', 'otherQualBoardUniversity', 'Enter board, university, or examining body name', 'Required'],
      ['Medium of Instruction', 'otherQualMediumOfInstruction', 'Select medium of instruction', 'Required', 'select', ['English', 'Hindi', 'Odia', 'Others']],
      ['Year of Passing', 'otherQualYearOfPassing', 'Enter year of passing (e.g., 2022)', 'Required', 'number'],
      ['Roll Number / Registration Number', 'otherQualRollNumber', 'Enter roll number or registration number', 'Required'],
      ['Main Subjects Studied', 'otherQualSubjectsStudied', 'Enter main subjects studied', 'Required', 'textarea'],
      ['Total Marks Obtained', 'otherQualTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'otherQualMaximumMarks', 'Enter maximum marks', 'Required', 'number'],
      ['Percentage / Grade / Division', 'otherQualPercentageGradeDivision', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
    ],
  },

  {
    id: 12,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Bachelor’s Degree / Graduation Qualification Details',
    subtitle: 'Kindly provide your Bachelor’s Degree or Graduation qualification details.',
    fields: [
      ['Do you possess a Bachelor’s / Graduation Degree?', 'hasBachelorDegree', 'Select Yes or No', 'Required', 'select', ['Yes', 'No']],
      ['Degree Name', 'bachelorDegreeName', 'Select degree course name', 'Required', 'select', ['B.Tech (Bachelor of Technology)', 'B.E (Bachelor of Engineering)', 'B.Sc (Bachelor of Science)', 'B.Com (Bachelor of Commerce)', 'B.A (Bachelor of Arts)', 'BBA (Bachelor of Business Administration)', 'BCA (Bachelor of Computer Applications)', 'B.Pharm (Bachelor of Pharmacy)', 'LLB (Bachelor of Laws)', 'B.Ed (Bachelor of Education)', 'MBBS', 'BDS', 'Other']],
      ['College / University Name', 'bachelorCollegeUniversityName', 'Enter full name of college or university', 'Required'],
      ['College / University Type', 'bachelorCollegeUniversityType', 'Select college or university type', 'Required', 'select', ['Government', 'Private', 'Autonomous', 'Deemed University', 'Others']],
      ['College / University Address', 'bachelorCollegeUniversityAddress', 'Enter full address of college or university', 'Optional', 'textarea'],
      ['College / University Code (if available)', 'bachelorCollegeUniversityCode', 'Enter college or university code (optional)', 'Optional'],
      ['Admission Year', 'bachelorAdmissionYear', 'Enter admission year (e.g., 2018)', 'Required', 'number'],
      ['Graduation Year', 'bachelorGraduationYear', 'Enter graduation year (e.g., 2022)', 'Required', 'number'],
      ['Course Duration', 'bachelorCourseDuration', 'Select course duration', 'Required', 'select', ['3 Years', '4 Years', '5 Years', 'Other']],
      ['Mode of Study', 'bachelorModeOfStudy', 'Select mode of study', 'Required', 'select', ['Regular / Full-Time', 'Distance / Open Learning', 'Online', 'Part-Time', 'Others']],
      ['Enrollment Number', 'bachelorEnrollmentNumber', 'Enter university enrollment number (optional)', 'Optional'],
      ['Registration Number', 'bachelorRegistrationNumber', 'Enter registration number', 'Required'],
      ['Roll Number', 'bachelorRollNumber', 'Enter student roll number', 'Required'],
      ['Examination Type', 'bachelorExaminationType', 'Select examination type', 'Optional', 'select', ['Regular', 'Backlog / Compartmental', 'Distance', 'Other']],
      ['Academic Pattern', 'bachelorAcademicPattern', 'Select academic pattern', 'Required', 'select', ['Semester Pattern', 'Annual Pattern', 'Trimester Pattern', 'Other']],
      ['Academic Session', 'bachelorAcademicSession', 'Enter academic session (e.g., 2018-2022)', 'Optional'],
      ['Total Marks Obtained', 'bachelorTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'bachelorMaximumMarks', 'Enter maximum marks', 'Required', 'number'],
      ['Final Result (Percentage / CGPA / Grade / Division)', 'bachelorFinalResult', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['Result Status', 'bachelorResultStatus', 'Select result status', 'Required', 'select', ['Passed / Awarded', 'Appearing / Pursuing', 'Result Awaited', 'Other']],
      ['Degree Certificate Number', 'bachelorDegreeCertificateNumber', 'Enter degree certificate serial number (optional)', 'Optional'],
      ['Degree Certificate Type', 'bachelorDegreeCertificateType', 'Select degree certificate type', 'Optional', 'select', ['Original Degree Certificate', 'Provisional Degree Certificate', 'Convocation Certificate', 'Other']],
      ['Degree Certificate Issue Date', 'bachelorDegreeCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Provisional Certificate Number (if applicable)', 'bachelorProvisionalCertificateNumber', 'Enter provisional certificate number (optional)', 'Optional'],
      ['Provisional Certificate Issue Date (if applicable)', 'bachelorProvisionalCertificateIssueDate', 'Enter provisional certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Final Marksheet Number', 'bachelorFinalMarksheetNumber', 'Enter final marksheet serial number (optional)', 'Optional'],
      ['Final Marksheet Issue Date', 'bachelorFinalMarksheetIssueDate', 'Enter final marksheet issue date (DD/MM/YYYY)', 'Optional'],
      ['College Contact Number (if known)', 'bachelorCollegeContactNumber', 'Enter college contact number (optional)', 'Optional', 'tel'],
      ['University Contact Number (if known)', 'bachelorUniversityContactNumber', 'Enter university contact number (optional)', 'Optional', 'tel'],
      ['Head of Institution Name', 'bachelorHeadOfInstitutionName', 'Enter Head of Institution full name (optional)', 'Optional'],
      ['University Registrar Name', 'bachelorUniversityRegistrarName', 'Enter University Registrar full name (optional)', 'Optional'],
    ],
  },

  {
    id: 13,
    formTitle: 'CANDIDATE MASTER PROFILE FORM',
    title: 'Master Degree / Post Graduate Qualification Details',
    subtitle: 'Kindly provide your Master Degree or Post Graduate qualification details.',
    fields: [
      ['Do you possess a Master’s / Post Graduate Degree?', 'hasMasterDegree', 'Select Yes or No', 'Required', 'select', ['Yes', 'No']],
      ['Master Degree / Course Name', 'masterDegreeName', 'Select Master degree course name', 'Required', 'select', ['M.Tech (Master of Technology)', 'M.Sc (Master of Science)', 'MCA (Master of Computer Applications)', 'MBA (Master of Business Administration)', 'MA (Master of Arts)', 'M.Com (Master of Commerce)', 'M.Pharm (Master of Pharmacy)', 'LLM (Master of Laws)', 'M.Ed (Master of Education)', 'MS (Master of Science/Surgery)', 'Other']],
      ['College / University Name', 'masterCollegeUniversityName', 'Enter full name of college or university', 'Required'],
      ['College / University Type', 'masterCollegeUniversityType', 'Select college or university type', 'Required', 'select', ['Government', 'Private', 'Autonomous', 'Deemed University', 'Others']],
      ['College / University Address', 'masterCollegeUniversityAddress', 'Enter full address of college or university', 'Optional', 'textarea'],
      ['College / University Code (if available)', 'masterCollegeUniversityCode', 'Enter college or university code (optional)', 'Optional'],
      ['Affiliated University Name (if applicable)', 'masterAffiliatedUniversityName', 'Enter affiliated university name (optional)', 'Optional'],
      ['Admission Year', 'masterAdmissionYear', 'Enter admission year (e.g., 2020)', 'Required', 'number'],
      ['Completion Year', 'masterCompletionYear', 'Enter completion year (e.g., 2022)', 'Required', 'number'],
      ['Course Duration', 'masterCourseDuration', 'Select course duration', 'Required', 'select', ['1 Year', '2 Years', '3 Years', 'Other']],
      ['Mode of Study', 'masterModeOfStudy', 'Select mode of study', 'Required', 'select', ['Regular / Full-Time', 'Distance / Open Learning', 'Online', 'Part-Time', 'Others']],
      ['Enrollment Number', 'masterEnrollmentNumber', 'Enter university enrollment number (optional)', 'Optional'],
      ['Registration Number', 'masterRegistrationNumber', 'Enter registration number', 'Required'],
      ['Roll Number', 'masterRollNumber', 'Enter student roll number', 'Required'],
      ['Examination Type', 'masterExaminationType', 'Select examination type', 'Optional', 'select', ['Regular', 'Backlog / Compartmental', 'Distance', 'Other']],
      ['Academic Pattern', 'masterAcademicPattern', 'Select academic pattern', 'Required', 'select', ['Semester Pattern', 'Annual Pattern', 'Trimester Pattern', 'Other']],
      ['Total Marks Obtained', 'masterTotalMarksObtained', 'Enter total marks obtained', 'Required', 'number'],
      ['Maximum Marks', 'masterMaximumMarks', 'Enter maximum marks', 'Required', 'number'],
      ['Final Result (Percentage / CGPA / Grade / Division)', 'masterFinalResult', 'Auto-calculated from Total & Maximum Marks', 'Auto-Calculated'],
      ['Result Status', 'masterResultStatus', 'Select result status', 'Required', 'select', ['Passed / Awarded', 'Appearing / Pursuing', 'Result Awaited', 'Other']],
      ['Degree Certificate Number', 'masterDegreeCertificateNumber', 'Enter degree certificate serial number (optional)', 'Optional'],
      ['Degree Certificate Type', 'masterDegreeCertificateType', 'Select degree certificate type', 'Optional', 'select', ['Original Degree Certificate', 'Provisional Degree Certificate', 'Convocation Certificate', 'Other']],
      ['Degree Certificate Issue Date', 'masterDegreeCertificateIssueDate', 'Enter certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Provisional Certificate Number (if applicable)', 'masterProvisionalCertificateNumber', 'Enter provisional certificate number (optional)', 'Optional'],
      ['Provisional Certificate Issue Date (if applicable)', 'masterProvisionalCertificateIssueDate', 'Enter provisional certificate issue date (DD/MM/YYYY)', 'Optional'],
      ['Final Marksheet Number', 'masterFinalMarksheetNumber', 'Enter final marksheet serial number (optional)', 'Optional'],
      ['Final Marksheet Issue Date', 'masterFinalMarksheetIssueDate', 'Enter final marksheet issue date (DD/MM/YYYY)', 'Optional'],
      ['College Contact Number (if known)', 'masterCollegeContactNumber', 'Enter college contact number (optional)', 'Optional', 'tel'],
      ['University Contact Number (if known)', 'masterUniversityContactNumber', 'Enter university contact number (optional)', 'Optional', 'tel'],
      ['Head of Institution Name', 'masterHeadOfInstitutionName', 'Enter Head of Institution full name (optional)', 'Optional'],
      ['University Registrar Name', 'masterUniversityRegistrarName', 'Enter University Registrar full name (optional)', 'Optional'],
    ],
  },

  // ==========================================================================
  // PART 2: OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM (Sections 14–18)
  // ==========================================================================

  {
    id: 14,
    formTitle: 'OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM',
    title: 'Travel Eligibility',
    subtitle: 'Kindly indicate your willingness and comfort level for official travel assignments.',
    fields: [
      ['Are you willing to travel for official work?', 'willingToTravelOfficial', 'Select willingness to travel', 'Required', 'select', ['Yes', 'No', 'Depends on Assignment']],
      ['Are you comfortable travelling outside your current city?', 'comfortableOutsideCity', 'Select comfort travelling outside city', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you comfortable travelling outside your state?', 'comfortableOutsideState', 'Select comfort travelling outside state', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you willing to travel anywhere in India for official assignments?', 'willingAnywhereIndia', 'Select willingness to travel across India', 'Required', 'select', ['Yes', 'No', 'Depends on Assignment']],
      ['Are you willing to undertake frequent official travel?', 'willingFrequentTravel', 'Select frequent travel willingness', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Maximum duration you are comfortable staying away from home for official work', 'maxDurationAwayFromHome', 'Select maximum duration away from home', 'Required', 'select', ['1-3 Days', '1 Week', '2 Weeks', '1 Month', 'More than 1 Month', 'As Required']],
    ],
  },

  {
    id: 15,
    formTitle: 'OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM',
    title: 'Travel Availability',
    subtitle: 'Kindly provide details about your travel availability and preferences.',
    fields: [
      ['Preferred Travel Mode', 'preferredTravelMode', 'Select preferred travel mode', 'Required', 'select', ['Train', 'Bus', 'Flight', 'Personal Vehicle', 'Company Vehicle', 'Any Mode', 'Other']],
      ['Are you comfortable with overnight travel?', 'comfortableOvernightTravel', 'Select overnight travel comfort', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you available for emergency official travel?', 'availableEmergencyTravel', 'Select emergency travel availability', 'Required', 'select', ['Yes', 'No', 'Depends on Situation']],
      ['Minimum notice period required before travelling', 'minNoticePeriodTravel', 'Select minimum notice period for travel', 'Required', 'select', ['No notice required (immediately)', '1 Day', '2-3 Days', '1 Week', '2 Weeks', 'Other']],
    ],
  },

  {
    id: 16,
    formTitle: 'OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM',
    title: 'Field Work Eligibility',
    subtitle: 'Kindly indicate your comfort level and willingness for field-based official assignments.',
    fields: [
      ['Are you comfortable working outside the office environment?', 'comfortableWorkingOutsideOffice', 'Select comfort working outside office', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you willing to participate in field assignments?', 'willingFieldAssignments', 'Select field assignment willingness', 'Required', 'select', ['Yes', 'No', 'Depends on Assignment']],
      ['Are you comfortable visiting different locations for official work?', 'comfortableVisitingLocations', 'Select location visit comfort', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you comfortable interacting with government offices, institutions, organizations, and the public during official assignments?', 'comfortableInteractingGovt', 'Select government / public interaction comfort', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
      ['Are you comfortable attending official meetings outside office premises?', 'comfortableMeetingsOutside', 'Select external meeting comfort', 'Required', 'select', ['Yes', 'No', 'Occasionally']],
    ],
  },

  {
    id: 17,
    formTitle: 'OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM',
    title: 'Travel Restrictions & Preferences',
    subtitle: 'Kindly mention any travel restrictions, preferences, or limitations you may have.',
    fields: [
      ['Do you have any restrictions regarding official travel?', 'hasRestrictions', 'Select travel restriction status', 'Required', 'select', ['Yes', 'No']],
      ['If yes, please specify travel restrictions', 'specifyTravelRestrictions', 'Enter details of travel restrictions (if any)', 'Optional', 'textarea'],
      ['Preferred Travel Locations', 'preferredTravelLocations', 'Enter preferred states, regions, or cities', 'Optional', 'textarea'],
      ['Locations where you are unable or unwilling to travel', 'noGoLocations', 'Enter locations unable or unwilling to travel (if any)', 'Optional', 'textarea'],
      ['Any other travel-related preferences or limitations', 'otherTravelPreferences', 'Enter other travel preferences or requirements (if any)', 'Optional', 'textarea'],
    ],
  },

  {
    id: 18,
    formTitle: 'OFFICIAL TRAVEL, MOBILITY & FIELD WORK ELIGIBILITY FORM',
    title: 'Emergency & Extended Travel',
    subtitle: 'Kindly confirm your availability and willingness for emergency and extended travel assignments.',
    fields: [
      ['Are you willing to travel on short notice for urgent official assignments?', 'willingShortNoticeTravel', 'Select short notice travel willingness', 'Required', 'select', ['Yes', 'No', 'Depends on Situation']],
      ['Are you willing to work during travel assignments beyond normal office hours, if required?', 'willingWorkBeyondHours', 'Select beyond normal hours willingness', 'Required', 'select', ['Yes', 'No', 'Occasionally if Required']],
      ['Are you willing to stay at company-arranged accommodation during official travel?', 'willingCompanyAccommodation', 'Select accommodation preference', 'Required', 'select', ['Yes', 'No', 'Prefer to arrange own accommodation']],
      ['Are you willing to undertake extended outstation assignments?', 'willingExtendedOutstation', 'Select extended outstation willingness', 'Required', 'select', ['Yes', 'No', 'Depends on Duration and Location', 'Depends on Compensation']],
    ],
  },
]

// ============================================================================
// FIELD NORMALIZER
// ============================================================================
// Converts compact field arrays into full field objects used by the UI.

function normalizeField(field, index) {
  if (!Array.isArray(field)) return field

  const [label, name, placeholder, status, type, options] = field

  return {
    id: index + 1,
    label,
    name,
    placeholder,
    status,
    type,
    options,
    required: status?.startsWith('Required'),
    fullWidth: type === 'textarea',
    readOnly: status === 'Auto-Calculated',
  }
}

// Exposes every section with a consistent field object shape.
const normalizedApplicationSections = applicationSections.map((section) => ({
  ...section,
  fields: section.fields.map(normalizeField),
}))

// ============================================================================
// FORM CONTEXT & HOOK
// ============================================================================

export const FormContext = createContext()

export function useFormContext() {
  return useContext(FormContext)
}

export default normalizedApplicationSections
