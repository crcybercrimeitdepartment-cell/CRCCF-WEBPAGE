export const directorySectionData = {
  getSearchPrompts: (title) => [
    `Search ${title} name...`,
    "Try searching 'EMP-1042'...",
    "Search by Department...",
    "Try searching 'Developer'...",
  ],
  texts: {
    employeeTitleHighlight: "Team Profiles",
    employeeTitlePrefix: "Employee & ",
    defaultTitleHighlight: "Directory",
    employeeDescription: "View detailed information about our employees, including their name, department, employee ID, and roles. This directory helps in easily identifying team members and understanding the organizational structure.",
    noRecordsFoundPrefix: "No records found matching",
    viewProfile: "View Profile",
    idPrefix: "ID: ",
    profileTitleSuffix: "Profile",
  },
  announcement: {
    title: "Add Your Title Here",
    subtitle: "Add Your Subtitle Here",
    marqueeText: "🌟 OUTSTANDING PERFORMANCE 🌟 OUTSTANDING PERFORMANCE",
  },
  profileTabs: ["Overview", "Professional Info", "Contact Details"],
  profileLabels: {
    idNumber: "ID Number",
    joinDate: "Join Date",
    gender: "Gender",
    qualification: "Qualification",
    department: "Department",
    jobProfile: "Job Profile",
    experience: "Experience",
    ctc: "Current CTC",
    skills: "Core Skills",
    phone: "Phone Number",
    email: "Email Address",
  },
  profileLinks: {
    linkedinText: "LinkedIn Profile",
    messageText: "Send Message",
    notAvailable: "N/A"
  }
};
