class TaskTicket {
	id: string;
	title: string;
	note: string;

	externalId?: string;
	delegation?: string;

	createTs: Date;
	completedTs?: Date;
	dueDate?: Date;
	isStarred = false;

	caseNotes: Array<CaseNote> = [];

	constructor(title: string) {
		this.id = MyUtilities.generateUUID();
		this.title = title;
		this.createTs = new Date();
	}

	public toggleStar() {
		this.isStarred = !this.isStarred;

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public toggleCompletion() {
		if (this.completedTs) {
			this.completedTs = null;
		} else {
			this.setCompleted();
		}

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public setDueDate(dateString: string) {
		this.dueDate = new Date(dateString);
		
		LHSMenuController.saveDataAndRefreshMenu();
	}

	public setCompleted() {
		this.completedTs = new Date();

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public setExternalId(externalId: string) {
		this.externalId = externalId;
		LHSMenuController.refreshMainMenu();

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public setDelegation(delegation: string) {
		this.delegation = delegation;
		LHSMenuController.refreshMainMenu();

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public addCaseNote(title: string) {
		let cn = new CaseNote(title);
		cn.createTs = new Date();
		cn.id = MyUtilities.generateUUID();

		this.caseNotes.push(cn);

		LHSMenuController.saveDataAndRefreshMenu();
	}

	public determineCategory(): TaskTicketCategory {
		let preparedResponse = TaskTicketCategory.ASSORTED;

		// figure out if NEGLECTED
		let ticketAge = MyUtilities.daysBetween(this.createTs, new Date());
		if (ticketAge > 3) {
			preparedResponse = TaskTicketCategory.NEGLECTED;
		}

		// figure out if urgent
		if (this.dueDate) {
			if (MyUtilities.isSameDay(new Date(), this.dueDate)) {
				preparedResponse = TaskTicketCategory.DUE_TODAY;
			} else {
				let daysLeft = MyUtilities.daysBetween(new Date(), this.dueDate);
				// console.log("daysLeft " + this.id + " = " + daysLeft);
				if (daysLeft < 0) {
					preparedResponse = TaskTicketCategory.OVERDUE;
				} else if (daysLeft < 5) {
					preparedResponse = TaskTicketCategory.DUE_SOON;
				}
			}
		}

		// figure out if done before today
		if (this.completedTs) {
			if (MyUtilities.isBeforeToday(this.completedTs)) {
				preparedResponse = TaskTicketCategory.DONE_BEFORE_TODAY;
			}
		}

		return preparedResponse;
	}
}