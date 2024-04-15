interface IOrderAddress {
	city: string;
	area: string;
}

interface ICargo {
	type: string;
	weight: number; //в кг
	value_from: number; // куб. метр
	value_to: number; // куб. метр
	shipment_date: string;
}

interface ITransportType {
	type: string;
}

export interface IOrder {
	id: number | string;
	from: IOrderAddress;
	to: IOrderAddress;
	distance: number; // в метрах
	points: number | null;
	cargo: ICargo;
	shipment_number: string;
	transport_type: ITransportType;
	price: number;
	gsm: number; // ?
}
