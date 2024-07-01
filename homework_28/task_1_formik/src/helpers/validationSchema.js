import * as Yup from 'yup';

export const schema = Yup.object().shape({
    task: Yup.string()
        .min(5, "Minimum 5 characters in task")
        .max(20, "Maximum 20 characters in task")
        .required("Field is required"),
});
