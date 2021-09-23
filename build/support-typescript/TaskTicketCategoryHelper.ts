enum TaskTicketCategory {
	ASSORTED,
	DONE_BEFORE_TODAY,
	OVERDUE,
	NEGLECTED,
	DUE_SOON,
	DUE_TODAY
}

type TaskTicketCategoryBucketSet = EnumDictionary<TaskTicketCategory, Array<TaskTicket>>;

class TaskTicketCategoryHelper {
	// Adapted from https://stackoverflow.com/questions/54542318/using-an-enum-as-a-dictionary-key
	private static domNames: EnumDictionary<TaskTicketCategory, string> = {
		[TaskTicketCategory.ASSORTED]: "Uncategorised",
		[TaskTicketCategory.DONE_BEFORE_TODAY]: "DoneBeforeToday",
		[TaskTicketCategory.OVERDUE]: "Overdue",
		[TaskTicketCategory.NEGLECTED]: "Neglected",
		[TaskTicketCategory.DUE_SOON]: "DueSoon",
		[TaskTicketCategory.DUE_TODAY]: "DueToday",
	};

	public static enumToDomName(ttc: TaskTicketCategory): string {
		return TaskTicketCategoryHelper.domNames[ttc];
	}

	public static generateBuckets(): TaskTicketCategoryBucketSet {
		let bucketSet = <TaskTicketCategoryBucketSet> {};
		$.each(TaskTicketCategoryHelper.domNames, function(index, value) {
			bucketSet[index] = [];
		});

		return bucketSet;
	}
}