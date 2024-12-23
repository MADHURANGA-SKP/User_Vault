const validateName = (name) => {
    if (!name) return "Name is required.";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name must only contain letters.";
    return null; // No error
  };
  
  const validateAge = (age) => {
    if (!age) return "Age is required.";
    if (isNaN(age)) return "Age must be a number.";
    if (age <= 0) return "Age must be a positive number.";
    if (!Number.isInteger(Number(age))) return "Age must be an integer.";
    if (age < 1 || age > 120) return "Age must be between 1 and 120.";
    return null;
  };
  
  const validateAddress = (address) => {
    if (!address) return "Address is required.";
    if (address.length < 10) return "Address must be at least 10 characters.";
    return null;
  };
  
  const validateFamilyDetails = (familyDetails) => {
    if (!Array.isArray(familyDetails) || familyDetails.length === 0) {
      return "At least one family member is required.";
    }
  
    for (const member of familyDetails) {
      if (!member.name) return "Family member's name is required.";
      if (!member.relation) return "Relation is required.";
    }
  
    return null;
  };
  
  const validateEducationDetails = (educationDetails) => {
    if (!Array.isArray(educationDetails) || educationDetails.length === 0) {
      return "At least one educational qualification is required.";
    }
  
    for (const edu of educationDetails) {
      if (!edu.institution) return "Institution name is required.";
      if (!edu.degree) return "Degree is required.";
    }
  
    return null;
  };
  
  const validateProfilePicture = (profilePicture) => {
    if (!profilePicture) return "Profile picture is required.";
    return null;
  };
  
  const validateForm = (data) => {
    const errors = {};
  
    const nameError = validateName(data.name);
    if (nameError) errors.name = nameError;
  
    const ageError = validateAge(data.age);
    if (ageError) errors.age = ageError;
  
    const addressError = validateAddress(data.address);
    if (addressError) errors.address = addressError;
  
    const familyDetailsError = validateFamilyDetails(data.familyDetails);
    if (familyDetailsError) errors.familyDetails = familyDetailsError;
  
    const educationDetailsError = validateEducationDetails(data.educationDetails);
    if (educationDetailsError) errors.educationDetails = educationDetailsError;
  
    const profilePictureError = validateProfilePicture(data.profilePicture);
    if (profilePictureError) errors.profilePicture = profilePictureError;
  
    return errors;
  };
  