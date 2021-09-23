enum TaskTicketCategory {
	ASSORTED = "Uncategorised",
	DONE_BEFORE_TODAY = "DoneBeforeToday",
	OVERDUE = "Overdue",
	NEGLECTED = "Neglected",
	DUE_SOON = "DueSoon",
	DUE_TODAY = "DueToday"
}

class TaskTicket {
	id: string;
	title: string;
	note: string;

	createTs: Date;
	completedTs?: Date;
	dueDate?: Date;

	caseNotes: Array<CaseNote> = [];

	constructor(title: string) {
		this.id = MyUtilities.generateUUID();
		this.title = title;
		this.createTs = new Date();
	}


	public static determineCategory(item: TaskTicket): TaskTicketCategory {
		let preparedResponse = TaskTicketCategory.ASSORTED;

		// figure out if NEGLECTED
		let ticketAge = MyUtilities.daysBetween(item.createTs, new Date());
		if (ticketAge > 3) {
			preparedResponse = TaskTicketCategory.NEGLECTED;
		}

		// figure out if urgent
		if (item.dueDate) {
			if (MyUtilities.isSameDay(new Date(), item.dueDate)) {
				preparedResponse = TaskTicketCategory.DUE_TODAY;
			} else {
				let daysLeft = MyUtilities.daysBetween(new Date(), item.dueDate);
				console.log("daysLeft " + item.id + " = " + daysLeft);
				if (daysLeft < 0) {
					preparedResponse = TaskTicketCategory.OVERDUE;
				} else if (daysLeft < 3) {
					preparedResponse = TaskTicketCategory.DUE_SOON;
				}
			}
		}

		// figure out if done before today
		if (item.completedTs) {
			if (MyUtilities.isBeforeToday(item.completedTs)) {
				preparedResponse = TaskTicketCategory.DONE_BEFORE_TODAY;
			}
		}

		return preparedResponse;
	}
}