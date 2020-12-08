export interface TableInterface {
	id: number;
	size: number;
	currentOrder: {
		createdAt: Date;
	};
	nextReservation: {
		reservationDateTime: Date;
	};
}
