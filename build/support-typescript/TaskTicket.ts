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
}