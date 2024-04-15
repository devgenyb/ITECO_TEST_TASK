import * as yup from "yup";

export const schema = yup.object().shape({
	from: yup.string().min(3, "Не менее 3 символов"),
    to: yup.string().min(3, "Не менее 3 символов"),
    order_number: yup.string().min(3, "Не менее 3 символов"),
    // order_date: yup.string()
});
