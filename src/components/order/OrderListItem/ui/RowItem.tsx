import { IOrder } from "@/app/api/fakeServer/types";
import { separateNumbers, wordCountEnding } from "@/app/helpers/textHelpers";
import { Col, Divider, Flex, Row } from "antd";
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

const StyledDivider = styled(Divider)`
	height: 5rem;
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

const StyledPrice = styled(Text)`
	font-size: 1.3rem;
`;

const StyledGsm = styled(Text)`
	font-size: 0.8rem;
`;

interface IProps {
	item: IOrder;
}

export const RowItem: FC<IProps> = ({ item }) => {
	return (
		<ItemWrapper>
			<Row gutter={16}>
				<Col className="gutter-row" span={6}>
					<Flex gap="small" vertical>
						<Flex>
							<Text>{item.from.city}&nbsp;</Text>
							<Text type="secondary">{item.from.area}</Text>
						</Flex>
						<Flex>
							<Text>{item.to.city}&nbsp;</Text>
							<Text type="secondary">{item.to.area}</Text>
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
				<StyledDivider type="vertical" />
				<Col className="gutter-row" span={11}>
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
							<div>
								<Text type="secondary">Погрузка&nbsp;</Text>
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
							</div>
						</Flex>
						<Flex>
							<Flex gap="small" vertical>
								<Text type="secondary">
									№{item.shipment_number}
								</Text>
								<Text type="secondary">
									{item.transport_type.type}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Col>
				<StyledDivider type="vertical" />
				<Col className="gutter-row" span={6}>
					<Flex
						style={{ height: "100%" }}
						align="center"
						justify="center"
					>
						<StyledPriceDiv>
							<StyledPrice>
								{separateNumbers(item.price)} &#8381;
							</StyledPrice>
							<StyledGsm type="secondary">
								ГСМ: {separateNumbers(item.gsm)} &#8381;
							</StyledGsm>
						</StyledPriceDiv>
					</Flex>
				</Col>
			</Row>
		</ItemWrapper>
	);
};
