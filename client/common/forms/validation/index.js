
export const validate_addProperty = values => {

    const errors = {}

    const requiredFields = [
        'title',
        'country',
        'city',
        'locality',
        'rent',
        'builtArea',
        'carpetArea',
        'latitude',
        'longitude',
        'type',
        'availability',
        'availableFrom',
        'description',
        'availableFor',
        'floor',
        'address',
        'powerBackup',
        'maintenance',
        'features',
        'furnishingStatus',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    if(values.address && (values.address.length < 10 || values.address.length > 100))
        errors.address = "address must be between 10 and 100 length";

    return errors;

}

export const validate_contactForm = values => {
    
    const errors = {}
    
    const requiredFields = [
      'name',
      'email',
      'message'
    ]
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
  
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
  
    return errors;
    
  }


export const validate_registerForm = values => {

    const errors = {}

    const requiredFields = [
        'name',
        'email',
        'password'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    if (
        values.email && values.email.length < 6
    ) {
        errors.email = 'Invalid password'
    }

    return errors;

}

export const validate_loginForm = values => {

    const errors = {}

    const requiredFields = [
        'email',
        'password'
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }

    if (
        values.email && values.email.length < 6
    ) {
        errors.email = 'Invalid password'
    }

    return errors;

}