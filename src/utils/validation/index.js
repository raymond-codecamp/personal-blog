import * as Yup from 'yup';
import {
    REQUIRED_ERROR, 
    EMAIL_ERROR, 
    PASSWORD_POLICY_ERROR,
    PASSWORD_MISSMATCH_ERROR,
    PASSWORD_POLICY,
    EMAIL_FORMAT,
    ACCEPT_TERMS_ERROR
} from 'utils/constants';


export const SignUpValidator = Yup.object().shape({

    //name validation

    fullName: Yup
    .string()
    .required(REQUIRED_ERROR),

    //email validation

    email: Yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(EMAIL_FORMAT, EMAIL_ERROR),

    //password validation

    password: Yup
    .string()
    .required(REQUIRED_ERROR)
    .min(8)
    .max(50)
    .matches(PASSWORD_POLICY,PASSWORD_POLICY_ERROR),

    //password match validation

    confirmPassword: Yup
    .string()
    .required(REQUIRED_ERROR)
    .oneOf([Yup.ref('password'),null],PASSWORD_MISSMATCH_ERROR),

    terms: Yup
    .boolean()
    .oneOf([true], ACCEPT_TERMS_ERROR),

});
export const SignInValidator = Yup.object().shape({
    email: Yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(EMAIL_FORMAT, EMAIL_ERROR),
    password: Yup
    .string()
    .required(REQUIRED_ERROR),
});
export const ChangepasswordValidator = Yup.object().shape({
    //old validation
  
    oldpassword: Yup.string().required(REQUIRED_ERROR),
  
    // new password validation
    newpassword: Yup.string()
      .required(REQUIRED_ERROR)
      .min(8)
      .max(50)
      .matches(PASSWORD_POLICY, PASSWORD_POLICY_ERROR),
    // confirm password validation
    confirmpassword: Yup.string()
      .required(REQUIRED_ERROR)
      .oneOf([Yup.ref("newpassword"), null], PASSWORD_MISSMATCH_ERROR),
});
