import * as Yup from "yup";

export const schemaValidation = Yup.object().shape({
  otp: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),
});
