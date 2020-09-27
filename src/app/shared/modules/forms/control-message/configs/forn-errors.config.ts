import { InjectionToken } from '@angular/core';

export const getDefaultErrorMessages = () => ({
    // angular default validators
    required: () => `This field is required`,
    minlength: ({requiredLength}) => `Expected minimum ${requiredLength} characters`,
    maxlength: ({requiredLength}) => `Expected maximum ${requiredLength} characters`,

    min: ({min}) => `Expected number can not be lower than ${min}`,
    max: ({max}) => `Expected number can not be higher than ${max}`,
    email: () => `Invalid email format`,
    // password validators field
    password: ({message}) => `${message}`,
    // custom
    passwordConfirm: ({message}) => `${message}`,
    async: ({message}) => `${message}`
});

export const FORM_ERROR_MESSAGES = new InjectionToken('Form error messages', {
    factory: () => getDefaultErrorMessages()
});
