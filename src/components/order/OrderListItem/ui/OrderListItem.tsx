import { IOrder } from "@/app/api/fakeServer/types";
import { FC } from "react";
import { RowItem } from "./RowItem";
import { GridItem } from "./GridItem";


interface IProps {
	item: IOrder;
	type?: "row" | "card";
}


export const OrderListItem: FC<IProps> = ({ item, type = "row" }) => {
    return type === 'row' ? <RowItem item={item} /> : <GridItem item={item} />
};
