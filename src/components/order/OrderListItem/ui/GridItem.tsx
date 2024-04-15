import { IOrder } from "@/app/api/fakeServer/types";
import { separateNumbers, wordCountEnding } from "@/app/helpers/textHelpers";
import { Col, Flex, Row } from "antd";
import { Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

const { Text } = Typography;

const ItemWrapper = styled("div")`
	padding: 1rem;
	width: 100%;
	background: #fff;
	border-radius: 15px;
	cursor: pointer;
`;

const StyledPriceDiv = styled("div")`
	display: flex;
	flex-direction: column;
	justify-content: center;

	&:first-child {
	}

	&:nth-child(2) {
	}
`;

const StyledDivider = styled("div")`
	display: flex;
	clear: both;
	width: 100%;
	min-width: 100%;
	margin: 0.7rem 0;
	position: relative;

	&::after {
		position: absolute;
		content: "";
		width: 95%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #eee;
		height: 1px;
	}
`;

const StyledPrice = styled(Text)`
	font-size: 1.3rem;
`;

const StyledGsm = styled(Text)`
	font-size: 0.8rem;
`;

const StyledButton = styled("button")`
	background-color: orange;
	color: white;
	padding: 0.7rem 2rem;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

interface IProps {
	item: IOrder;
}

export const GridItem: FC<IProps> = ({ item }) => {
	return (
		<ItemWrapper>
			<Row gutter={16}>
				<Col className="gutter-row" span={24}>
					<Flex gap="small" vertical>
						<Flex justify="space-between">
							<Flex vertical>
								<Flex vertical>
									<Text>{item.from.city}</Text>
									<Text type="secondary">
										{item.from.area}
									</Text>
								</Flex>
								<Flex vertical>
									<Text>{item.to.city}</Text>
									<Text type="secondary">{item.to.area}</Text>
								</Flex>
							</Flex>
							<Flex>
								<Text type="secondary">
									№{item.shipment_number}
								</Text>
							</Flex>
						</Flex>
						<Flex>
							<div>
								<Text type="secondary">Растояние&nbsp;</Text>
								<Text>
									{Math.ceil(item.distance / 1000)} км&nbsp;
								</Text>
								{item.points && (
									<Text type="success">
										+{item.points}{" "}
										{wordCountEnding(item.points, "пункт")}
									</Text>
								)}
							</div>
						</Flex>
					</Flex>
				</Col>
				<StyledDivider />
				<Col className="gutter-row" span={24}>
					<Flex justify="space-between">
						<Flex gap="small" vertical>
							<Text>{item.cargo.type}</Text>
							<div>
								<Text type="secondary">
									{(item.cargo.weight / 1000).toFixed(2)}{" "}
									т.&nbsp;/&nbsp;
									{item.cargo.value_from}-
									{item.cargo.value_to}
									&nbsp;м&#xB2;
								</Text>
							</div>
						</Flex>
						<Flex>
							<Flex gap="small" vertical>
								<Text>
									{new Date(
										item.cargo.shipment_date
									).toLocaleDateString("ru-RU", {
										day: "numeric",
										month: "long",
										year: "numeric",
										hour: "numeric",
										minute: "numeric",
										hour12: false
									})}
								</Text>
								<Text type="secondary">
									<span style={{textAlign: 'right', width: '100%', display: 'block'}}>{item.transport_type.type}</span>
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Col>
				<StyledDivider />
				<Col className="gutter-row" span={24}>
					<Flex justify="space-between">
						<StyledPriceDiv>
							<StyledPrice>
								{separateNumbers(item.price)} &#8381;
							</StyledPrice>
							<StyledGsm type="secondary">
								ГСМ: {separateNumbers(item.gsm)} &#8381;
							</StyledGsm>
						</StyledPriceDiv>
						<StyledButton>Откликнуться</StyledButton>
					</Flex>
				</Col>
			</Row>
		</ItemWrapper>
	);
};
