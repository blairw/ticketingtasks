class DataHelper {
	public static globalItems: any = {};
	public static globalCurrentSelectedItem: TaskTicket;

	public static deleteAndReturnCompletedItems(): Array<TaskTicket> {
		let completedItems: Array<TaskTicket> = [];

		Main.foreachHelper(DataHelper.globalItems, function(key, item) {
			if (item.isCompleted()) {
				completedItems.push(item);
				DataHelper.removeItem(item.id);
			}
		});

		LHSMenuController.refreshMainMenu();
		return completedItems;
	}

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

	public static processParsedJSON(parsedJSON: any) {
		DataHelper.globalItems = {};

		$.each(parsedJSON, function (index, value) {
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
			if (value["externalId"]) {
				tt.externalId = value["externalId"];
			}
			if (value["delegation"]) {
				tt.delegation = value["delegation"];
			}
			if (value["isStarred"]) {
				tt.isStarred = (value["isStarred"] == true);
			}
			if (value["isFlagged"]) {
				tt.isFlagged = (value["isFlagged"] == true);
			}
			
			if (value["caseNotes"]) {
				$.each(value["caseNotes"], function(index, caseNote) {
					if (caseNote) {
						let cn = new CaseNote(caseNote['title']);
						cn.id = caseNote['id'];
						cn.createTs = new Date(caseNote['createTs']);

						tt.caseNotes.push(cn);
					}
				});
			}

			DataHelper.globalItems[tt.id] = tt;
		});
	}

	public static retrieveItemsFromLocalStorage() {
		try {
			let jsonOutput: any = JSON.parse(localStorage.getItem("wang.blair.ticketingtasks.items"));
			DataHelper.processParsedJSON(jsonOutput);
		} catch (exception) {
			// saved data has been corrupted, so reset it
			localStorage.setItem(
				"wang.blair.ticketingtasks",
				JSON.stringify({})
			);
		}
	}
}
