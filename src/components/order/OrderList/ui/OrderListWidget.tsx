import { IOrder } from "@/app/api/fakeServer/types";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api, { IResposePaginated } from "@/app/api/fakeServer";
import OrderListFilter, { IOrderFilters } from "../../OrderListFilter";
import { OrderList } from "./OrderList";
import { Button } from "antd";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const StyledButton = styled(Button)`
	margin-bottom: 2rem;
	@media (max-width: 768px) {
		display: none;
	}
`;

export const OrderListWidget = () => {
	const [list, setList] = useState<IOrder[]>([]);
	const [countPage, setCountPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [infinityListLoading, setInfinityListLoading] = useState(false);
	const [filters, setFilters] = useState<IOrderFilters | null>(null);
	const [ref, setRef] = useState<undefined | null | HTMLDivElement>(
		undefined
	);
	const [isRefetchFilter, setIsRefetchFilter] = useState(false);
	const [isGrid, setIsGrid] = useState(false);

	const isMobile = useMediaQuery({
		query: "(max-width: 768px)"
	});

	const { data, isLoading, refetch } = useQuery<
		IResposePaginated<IOrder>,
		Error
	>({
		queryKey: ["orders"],
		queryFn: () => {
			const queryParams = new URLSearchParams();
			queryParams.append("page", countPage.toString());
			if (filters) {
				if (filters.from) queryParams.append("from", filters.from);
				if (filters.to) queryParams.append("to", filters.to);
				if (filters.order_number)
					queryParams.append("order_number", filters.order_number);
				if (filters.order_date)
					queryParams.append(
						"order_date",
						filters.order_date.toString()
					);
			}
			return api.getFakeOrders(queryParams.toString());
		}
	});

	useEffect(() => {
		if (!data) return;
		setList(data.data);
		setRef(observerTargetRef.current);
	}, [isLoading]);

	useEffect(() => {
		if (!data) return;
		setRef(observerTargetRef.current);
	}, [list, isGrid, isMobile]);

	const observerTargetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!hasMore || !ref) return;
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				setCountPage(countPage + 1);
			}
		});
		if (ref) {
			observer.observe(ref);
		}
		return () => {
			observer.disconnect();
		};
	}, [ref]);

	useEffect(() => {
		if (countPage === 1 || !hasMore) return;
		setInfinityListLoading(true);
		refetch().then((data) => {
			const newOrders = data.data!.data;
			setList((prev) => [...prev, ...newOrders]);
			setHasMore(!(list.length + newOrders.length === data.data?.total));
			setInfinityListLoading(false);
		});
	}, [countPage]);

	useEffect(() => {
		if (isRefetchFilter) {
			refetch().then((data) => {
				setList(data.data!.data);
				setIsRefetchFilter(false);
			});
		}
	}, [isRefetchFilter]);

	return (
		<>
			<OrderListFilter
				isLoading={isRefetchFilter}
				onSubmit={async (val: IOrderFilters) => {
					console.log(val);
					setFilters(val);
					setIsRefetchFilter(true);
					setCountPage(1);
				}}
			/>
			<StyledButton onClick={() => setIsGrid((prev) => !prev)}>
				{isGrid ? "Строка" : "Сетка"}
			</StyledButton>
			<OrderList
				loading={isLoading}
				items={list}
				ref={observerTargetRef}
				listLoading={infinityListLoading}
				type={!isGrid && !isMobile ? "row" : "grid"}
			/>
		</>
	);
};
