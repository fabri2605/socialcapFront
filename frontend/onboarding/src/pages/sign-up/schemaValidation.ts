import * as Yup from "yup";

export const schemaValidation = Yup.object().shape({
  email: Yup.string().required('Email required').email('Invalid email format'),
  full_name: Yup.string().required('Full name required')
});

