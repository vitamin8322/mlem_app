import * as yup from 'yup'

export const authSchema = yup.object({
    email: yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Email is not valid'),
    password: yup.string().required('Password is required').min(8, "Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure."),
    passwordLoginPage: yup.string().required('Password is required').min(8, "Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure."),
    fname: yup.string().required('First Name is required'),
    lname: yup.string().required('Last Name is required'),
    userName: yup.string().required('User Name is required'),
    confirm_password: yup.string().oneOf([yup.ref('new_password')], 'Confirm password must match'),
    phone_number: yup.string().required('Phone Number is required').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone Number is not valid'),
    name:  yup.string().required('Name is required'),
})
export const changePassword = yup.object({
  password: yup.string().required('Current Password is required'),
  new_password: yup.string().required('New Password is required').min(8, "Your password needs to be at least 8 characters. Include multiple words and phrases to make it more secure.").notOneOf([yup.ref('password')], 'New password must be different from current password'),
  new_confirm_password: yup.string().required('Confirm Password is required').oneOf([yup.ref('new_password')], 'Confirm password does not match with a password.'),
})
export const editProfileSchema = authSchema.pick(['fname', 'lname', 'phone_number', 'email'])
export const changePasswordSchema = changePassword

export const loginSchema = authSchema.pick(['email', 'password'])
export const registerSchema = authSchema.pick(['name', 'password', 'email'])

export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type EditProfileSchema = yup.InferType<typeof editProfileSchema>
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
