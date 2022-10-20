export interface TableInterface {
	id: number;
	size: number;
	currentOrder: {
		id: number;
		createdAt: Date;
		firstName: string;
		lastName: string;
	};
	nextReservation: {
		id: number;
		reservationDateTime: Date;
		customerName: String;
	};
}
