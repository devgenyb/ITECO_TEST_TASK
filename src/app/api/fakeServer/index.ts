import { IOrderFilters } from "@/components/order/OrderListFilter";
import { IOrder } from "./types";
import { fakerRU as faker } from "@faker-js/faker";

export interface IResposePaginated<T> {
	data: T[];
	total: number;
	page_count: number;
}

class FakeServer {
	private ordersList: IOrder[] = [];

	constructor() {
		for (let i = 0; i < 30000; ++i) {
			this.ordersList.push(this.generateFakeOrder(i + 1));
		}
	}

	/**
	 * getFakeOrders
	 */
	public getFakeOrders(
		queryString: string
	): Promise<IResposePaginated<IOrder>> {
		const params = new URLSearchParams(queryString);
		const data = Object.fromEntries(params.entries());
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(this.getOrdersPage(+data.page, 10, data));
			}, 300);
		});
	}

	private getOrdersPage(
		page: number,
		per_page: number,
		filter: Partial<IOrderFilters>
	): IResposePaginated<IOrder> {
		const data = this.filter(filter);
		const startIndex = (page - 1) * per_page;
		const endIndex = startIndex + per_page;
		const dataSlice = data.slice(startIndex, endIndex);
		const response = {
			data: dataSlice,
			total: dataSlice.length,
			page_count: Math.ceil(dataSlice.length / per_page)
		};
		return response;
	}

	private filter(filter: Partial<IOrderFilters>) {
		const res = [];
		for (let index = 0; index < this.ordersList.length; index++) {
			const item = this.ordersList[index];
			if (filter.from && !item.from.city.includes(filter.from)) {
				continue;
			} else if (filter.to && !item.to.city.includes(filter.to)) {
				continue;
			} else if (
				filter.order_number &&
				!item.shipment_number.includes(filter.order_number)
			) {
				continue;
			} else if (filter.order_date) {
				const filterDate = new Date(filter.order_date.toString());
				const orderDate = new Date(item.cargo.shipment_date);
				filterDate.setHours(0, 0, 0, 0);
				orderDate.setHours(0, 0, 0, 0);
				const time1 = filterDate.getTime();
				const time2 = orderDate.getTime();
				if (time1 !== time2) {
					continue;
				}
			}

			res.push(item);
		}

		return res;
	}

	private generateFakeOrder(id: number): IOrder {
		const order: IOrder = {
			id,
			from: {
				city: faker.location.city(),
				area: faker.location.county()
			},
			to: {
				city: faker.location.city(),
				area: faker.location.county()
			},
			distance: faker.number.int({ min: 10_000, max: 50_000 }),
			points: faker.number.int({ min: 1, max: 10 }),
			cargo: {
				type: faker.helpers.arrayElement([
					"Стройматериалы",
					"Мебель",
					"Груз"
				]),
				weight: faker.number.int({ min: 100, max: 10_000 }),
				value_from: faker.number.int({ min: 1, max: 10 }),
				value_to: faker.number.int({ min: 10, max: 50 }),
				shipment_date: faker.date.future().toISOString()
			},
			shipment_number: "A" + faker.string.numeric(10),
			transport_type: {
				type: faker.helpers.arrayElement(["Тент / полная"])
			},
			price: faker.number.int({ min: 5_000, max: 50_000 }),
			gsm: faker.number.int({ min: 1_000, max: 5_000 }) // Оставил как вопрос
		};

		return order;
	}
}

const api = new FakeServer();

export default api;
