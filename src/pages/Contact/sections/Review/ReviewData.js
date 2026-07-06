export const reviewData = {
  header: {
    titlePrefix: "Submit a ",
    titleHighlight: "Review",
    subtitle: "We'd love to hear about your experience. Your review helps us maintain our high standards."
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
    rating: {
      title: "Experience & Rating",
      ratings: {
        overall: "Overall Experience",
        support: "Support Quality",
        productTitle: "Rate this Product",
        productInput: "Product Name",
        productPlaceholder: "e.g. Smart Dashboard",
        serviceTitle: "Rate this Service",
        serviceInput: "Service Name",
        servicePlaceholder: "e.g. System Installation"
      },
      image: {
        label: "Attach an Image (Optional)",
        instructions: "Click to upload or drag and drop",
        formatInfo: "PNG, JPG or GIF (max. 5MB)",
        removeTitle: "Remove image"
      },
      writtenReview: {
        label: "Your Written Review",
        placeholder: "Tell us what you loved or what we can improve..."
      }
    }
  },
  footer: {
    disclaimer: "* Your review may be used on our public testimonials page.",
    submitText: "Submit Review",
    successMessage: "Review submitted successfully!"
  },
  navigation: {
    backText: "Back to Dashboard"
  }
};
