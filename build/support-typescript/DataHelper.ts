class DataHelper {
	public static globalItems: any = {};
	public static globalCurrentSelectedItem: TaskTicket;

	public static addNewItem(tt: TaskTicket) {
		DataHelper.globalItems[tt.id] = tt;
		DataHelper.saveItemsToLocalStorage();
	}

	public static removeItem(idToRemove: string) {
		let newGlobalItems: any = {};
		$.each(DataHelper.globalItems, function (index, value) { 
			let item = <TaskTicket> value;
			if (item.id != idToRemove) {
				newGlobalItems[item.id] = item;
			}
		});
		DataHelper.globalItems = newGlobalItems;
		DataHelper.saveItemsToLocalStorage();
	}

	public static saveItemsToLocalStorage() {
		localStorage.setItem(
			"wang.blair.ticketingtasks.items",
			JSON.stringify(DataHelper.globalItems)
		);
	}

	public static saveSelectedItemToLocalStorage() {
		localStorage.setItem(
			"wang.blair.ticketingtasks.selectedItem",
			DataHelper.globalCurrentSelectedItem.id
		);
	}

	public static retrieveSelectedItemFromStorage(): TaskTicket {
		let tt: TaskTicket = null;

		try {
			let savedID = localStorage.getItem("wang.blair.ticketingtasks.selectedItem");
			tt = DataHelper.globalItems[savedID];
		} catch (exception) {
			// do nothing
		}

		return tt;
	}

	public static retrieveItemsFromLocalStorage() {
		try {
			let jsonOutput: any = JSON.parse(localStorage.getItem(
				"wang.blair.ticketingtasks.items"
			));

			DataHelper.globalItems = {};
			$.each(jsonOutput, function (index, value) {
				let tt: TaskTicket = new TaskTicket(value["title"]);
				tt.id = value["id"]
				tt.createTs = new Date(value["createTs"]);
				if (value["completedTs"]) {
					tt.completedTs = new Date(value["completedTs"]);
				}
				if (value["dueDate"]) {
					tt.dueDate = new Date(value["dueDate"]);
				}
				if (value["note"]) {
					tt.note = value["note"];
				}
				
				// TODO: casenotes

				DataHelper.globalItems[tt.id] = tt;
			});
		} catch (exception) {
			// saved data has been corrupted, so reset it
			localStorage.setItem(
				"wang.blair.ticketingtasks",
				JSON.stringify({})
			);
		}
	}
}