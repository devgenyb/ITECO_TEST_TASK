import * as yup from "yup";

export const schema = yup.object().shape({
	from: yup
		.string()
		.min(3, "Поле откуда должно содержать не менее 3 символов"),
	to: yup.string().min(3, "Поле куда должно содержать не менее 3 символов"),
	order_number: yup
		.string()
		.min(3, "Не менее 3 символов")
		.matches(/^(A?\d{0,10})$/, "Введенная строка не соотвествует формату номера отправления")
});
