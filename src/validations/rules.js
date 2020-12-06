import { extend } from 'vee-validate';
import { required, min, max, length, numeric } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: (fieldName) => {
      return `${fieldName} is required.`
    }
  });
extend('min', {
    ...min,
    message: (fieldName, e) => {
      return `${fieldName} must be a minimum of ${e.length} digits.`
    }
  });

extend('max', {
    ...max,
    message: (fieldName, e) => {
      return `${fieldName} must be a maximum of ${e.length} digits.`
    }
  });

extend('length', {
    ...length,
    message: (fieldName, e) => {
      return `${fieldName} must be ${e.length} digits.`
    }
  });


  extend('numeric', {
    ...numeric,
    message: (fieldName) => {
      return `${fieldName} is must only contain numeric characters`
    }
  });