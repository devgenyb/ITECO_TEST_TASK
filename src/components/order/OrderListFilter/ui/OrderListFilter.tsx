import { SwapOutlined } from "@ant-design/icons";
import { Col, DatePicker, Input, Row, Spin, Typography } from "antd";
import { useFormik } from "formik";
import styled from "styled-components";
import { schema } from "../constants/schema";
import { IForm } from "../types/types";
import { FC } from "react";

const StyledInput = styled(Input)`
	&:focus {
		border-color: green;
	}

	&:hover {
		border-color: green;
	}
`;

const StyledSwitchWrapper = styled("div")`
	display: flex;
	position: relative;
	justify-content: space-between;
	width: 100%;
	& > :first-child {
		margin-right: 0.5rem;
	}
	& > :nth-child(2) {
		margin-left: 0.5rem;
	}
`;

const StyledSwitchInput = styled(StyledInput)`
	width: 50%;
`;

const StyledSwapIcon = styled(SwapOutlined)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	cursor: pointer;
	padding: 0.3rem;
	border: 2px solid #ccc;
	border-radius: 50%;
	overflow: hidden;
	background-color: #eee;
`;

const StyledHeader = styled(Typography.Text)`
	font-size: 1.2rem;
`;

const StyledClear = styled(Typography.Text)`
	height: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
	font-size: 0.8rem;
	text-decoration: underline;
`;

const StyledRow = styled(Row)`
	margin-bottom: 1rem;
`;

const StaledDatePicker = styled(DatePicker)`
	width: 100%;
	&:focus {
		border-color: green;
	}

	&:hover {
		border-color: green;
	}
`;

const StyledButton = styled("button")`
	background-color: orange;
	color: white;
	width: 100%;
	padding: 0.7rem 1rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const StyledPointer = styled('span')`
	cursor: pointer;
`

interface IPRops {
	setFilters?: (val: IForm) => void;
	onSubmit: (val: IForm) => void;
	isLoading: boolean;
}

export const OrderListFilter: FC<IPRops> = ({ onSubmit, isLoading }) => {
	const submit = (values: IForm) => {
		onSubmit(values);
	};

	const {
		handleChange,
		values,
		setFieldValue,
		handleSubmit,
		errors,
		resetForm
	} = useFormik<IForm>({
		initialValues: {
			from: "",
			to: "",
			order_number: "",
			order_date: null
		},
		onSubmit: (formData) => submit(formData),
		validationSchema: schema
	});

	return (
		<form noValidate onSubmit={handleSubmit}>
			<StyledRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Col className="gutter-row" span={17}>
					<StyledHeader>Поиск грузов</StyledHeader>
				</Col>
				<Col className="gutter-row" span={7}>
					<StyledInput
						name="order_number"
						placeholder="№ заказа"
						value={values.order_number}
						onChange={handleChange}
						status={errors.order_number ? "error" : ""}
					/>
				</Col>
			</StyledRow>
			<StyledRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Col className="gutter-row" span={17}>
					<StyledSwitchWrapper>
						<StyledSwitchInput
							placeholder="Откуда"
							value={values.from}
							onChange={handleChange}
							name="from"
							status={errors.from ? "error" : ""}
						/>
						<StyledSwitchInput
							placeholder="Куда"
							value={values.to}
							onChange={handleChange}
							name="to"
							status={errors.to ? "error" : ""}
						/>
						<StyledSwapIcon
							onClick={() => {
								setFieldValue("from", values["to"]);
								setFieldValue("to", values["from"]);
							}}
						/>
					</StyledSwitchWrapper>
				</Col>
				<Col className="gutter-row" span={7}>
					<StaledDatePicker
						placeholder="Дата отгрузки"
						value={values.order_date}
						onChange={(date) => setFieldValue("order_date", date)}
					/>
				</Col>
			</StyledRow>
			<StyledRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
				<Col span={17}>
					<StyledClear type="secondary">
						<StyledPointer
							onClick={() => {
								resetForm();
							}}
						>
							Сбросить фильтры
						</StyledPointer>
					</StyledClear>
				</Col>
				<Col span={7}>
					<StyledButton type="submit">
						{isLoading ? <Spin /> : "Поиск"}
					</StyledButton>
				</Col>
			</StyledRow>
		</form>
	);
};
