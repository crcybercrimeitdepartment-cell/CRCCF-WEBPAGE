export const feedbackData = {
  header: {
    titlePrefix: "We Value Your ",
    titleHighlight: "Feedback",
    subtitle: "Help us improve our services by sharing your experience. Your insights drive our innovation."
  },
  sections: {
    identity: {
      title: "Personal Identity",
      fields: {
        fullName: "Full Name",
        fatherName: "Father's Name",
        dob: "Date of Birth",
        gender: "Gender",
        genderOptions: {
          default: "Select Gender",
          male: "Male",
          female: "Female",
          other: "Other"
        },
        occupation: "Occupation"
      }
    },
    contact: {
      title: "Contact Information",
      fields: {
        mobile: "Mobile Number",
        whatsapp: "WhatsApp Number",
        sameAsMobile: "Same as Mobile Number",
        email: "Email ID"
      }
    },
    message: {
      title: "Message & Suggestions",
      label: "Your Message / Suggestions"
    },
    documents: {
      title: "Supporting Documents",
      subtitle: "Upload Documents (Optional)",
      instructions: "Click to upload or drag and drop",
      formatInfo: "Supported: PDF, JPEG, PNG, MP4 (Max 10MB)",
      changeText: "Click to change"
    }
  },
  footer: {
    disclaimer: "* Your feedback is confidential and used solely for quality assurance.",
    submitText: "Submit Feedback",
    successMessage: "Feedback submitted successfully!"
  },
  navigation: {
    backText: "Back to Contact Hub"
  }
};
