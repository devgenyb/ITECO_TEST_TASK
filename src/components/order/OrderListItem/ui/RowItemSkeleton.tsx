import { Col, Divider, Flex, Row, Skeleton } from "antd";
import styled from "styled-components";

const ItemWrapper = styled("div")`
	padding: 1rem;
	height: 114px;
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

export const RowItemSkeleton = () => {
	return (
		<ItemWrapper>
			<Row gutter={16}>
				<Col className="gutter-row" span={6}>
					<Flex gap="small" vertical>
						<Flex>
							<Skeleton.Input size="small" />
						</Flex>
						<Flex>
							<Skeleton.Input size="small" />
						</Flex>
					</Flex>
				</Col>
				<StyledDivider type="vertical" />
				<Col className="gutter-row" span={11}>
					<Flex justify="space-between">
						<Flex gap="small" vertical>
							<Skeleton.Input size="small" />
							<Skeleton.Input size="small" />
						</Flex>
						<Flex>
							<Flex gap="small" vertical>
								<Skeleton.Input size="small" />
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
							<Skeleton.Input />
							<Skeleton.Input />
						</StyledPriceDiv>
					</Flex>
				</Col>
			</Row>
		</ItemWrapper>
	);
};
