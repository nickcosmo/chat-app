// validation rules
import { extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'This field is required',
});

extend('email', {
    ...email,
    message: 'Please enter a valid email address',
});

extend('min', {
    ...min,
    message: `Must be {length} characters long`,
});