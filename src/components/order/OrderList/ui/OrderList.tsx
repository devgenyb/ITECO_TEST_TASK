import { IOrder } from "@/app/api/fakeServer/types";
import { FC, Ref, forwardRef } from "react";
import OrderListItem from "../../OrderListItem";
import styled from "styled-components";
import { BackTop, Col, Row, Spin } from "antd";
import { RowItemSkeleton } from "../../OrderListItem/ui/RowItemSkeleton";

const StypedItemRow = styled("div")`
	margin-bottom: 1rem;
`;

const StyledLoader = styled("div")`
	display: flex;
	justify-content: center;
	margin: 1rem;
`;

interface IProps {
	loading: boolean;
	listLoading: boolean;
	items: IOrder[];
	type: "row" | "grid";
	ref: Ref<HTMLDivElement>;
}

const OrderListInner: FC<IProps> = (
	{ loading, items, type, listLoading },
	ref
) => {
	if (loading)
		return (
			<div>
				{Array.from({ length: 10 }).map((_, index) => (
					<StypedItemRow key={index}>
						<RowItemSkeleton />
					</StypedItemRow>
				))}
			</div>
		);

	return (
		<>	
			<BackTop />
			{type === "row" && (
				<div>
					{items.map((item, index) => (
						<StypedItemRow key={item.id}>
							{index === items.length - 5 ? (
								<div ref={ref}>
									<OrderListItem item={item} type="row" />
								</div>
							) : (
								<OrderListItem item={item} type="row" />
							)}
						</StypedItemRow>
					))}
				</div>
			)}

			{type === "grid" && (
				<div>
					<Row gutter={[12, 12]}>
						{items.map((item, index) => (
							<Col md={12} span={24} key={item.id}>
								{index === items.length - 5 ? (
									<div ref={ref}>
										<OrderListItem
											item={item}
											type="card"
										/>
									</div>
								) : (
									<OrderListItem item={item} type="card" />
								)}
							</Col>
						))}
					</Row>
				</div>
			)}
			<StyledLoader>{listLoading && <Spin />}</StyledLoader>
			{!items.length && <div>Данных по Вашему запросу не найдено</div>}
		</>
	);
};

export const OrderList = forwardRef((props: IProps, ref: Ref<HTMLDivElement>) =>
	OrderListInner(props, ref)
);
