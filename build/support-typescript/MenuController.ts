class MenuController {
	/**
	 * Populates the menu when the app is started.
	 */
	public static refreshMainMenu() {
		$("#MainMenu_DueToday").html('<p class="TTMenuPanelHeading panel-heading">Due Today</p>');
		$("#MainMenu_DueSoon").html('<p class="TTMenuPanelHeading panel-heading">Due Soon</p>');
		$("#MainMenu_Neglected").html('<p class="TTMenuPanelHeading panel-heading">Neglected?</p>');
		$("#MainMenu_Uncategorised").html('<p class="TTMenuPanelHeading panel-heading">Uncategorised</p>');
		$("#MainMenu_DoneBeforeToday").html('<p class="TTMenuPanelHeading panel-heading">Done Before Today</p>');
		$.each(DataHelper.globalItems, function (index, value) {
			let destination = "Uncategorised";

			let item = <TaskTicket>value;


			// figure out if neglected
			let ticketAge = MyUtilities.daysBetween(item.createTs, new Date());
			if (ticketAge > 3) {
				destination = "Neglected";
			}

			// figure out if urgent
			if (item.dueDate) {
				if (MyUtilities.isSameDay(new Date(), item.dueDate)) {
					destination = "DueToday";
				} else {
					let daysLeft = MyUtilities.daysBetween(new Date(), item.dueDate);
					console.log("daysLeft " + item.id + " = " + daysLeft);
					if (daysLeft < 3) {
						destination = "DueSoon";
					}
				}
			}

			// figure out if done before today
			if (item.completedTs) {
				if (MyUtilities.isBeforeToday(item.completedTs)) {
					destination = "DoneBeforeToday";
				}
			}

			let itemClasses = 'TTMenuItem panel-block';
			if (item.completedTs) {
				itemClasses += ' is-completed'
			}

			let preparedHTML = ""
				+ "<a class='" + itemClasses + "' id='" + MENU_ITEM_PREFIX + item.id + "'>"
				+ item.title
				+ "</a>";

			$("#MainMenu_" + destination).append(preparedHTML);
		});

		// try to move to pre-saved location
		let possibleSavedItem = DataHelper.retrieveSelectedItemFromStorage();
		if (null == possibleSavedItem) {
			// nothing was saved
		} else {
			MenuController.moveToMenuItemByID(possibleSavedItem.id);
		}

		MenuController.attachMenuItemHandlers();
	}

	public static attachMenuItemHandlers() {
		$(".TTMenuItem").on("click", function () {
			let selectedID: string = $(this).attr("id").replace(MENU_ITEM_PREFIX, "");

			MenuController.moveToMenuItemByID(selectedID);
		});
	}

	public static moveToMenuItemByID(selectedID: string) {

		$(".TTMenuItem").removeClass("is-active");
		$("#" + MENU_ITEM_PREFIX + selectedID).addClass("is-active");

		let tt: TaskTicket = DataHelper.globalItems[selectedID];

		let x = tt.createTs;
		let formattedDate = [
			x.getFullYear(),
			MyUtilities.pad(x.getMonth().toString(), 2, "0"),
			MyUtilities.pad(x.getDay().toString(), 2, "0")
		].join("-");
		let formattedTime = [x.getHours(), x.getMinutes()].join(":");
		let formattedCreateTs = formattedDate + " " + formattedTime;

		$("#RHSTaskTitle").html(tt.title);
		$("#RHSTaskDetails").html("");
		$("#RHSTaskDetails").append("<tr><td>ID</td><td><code>" + tt.id + "</code></td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Title</td><td>" + tt.title + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Created</td><td>" + tt.createTs + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Due</td><td>" + tt.dueDate + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Completed</td><td>" + tt.completedTs + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Note</td><td>" + tt.note + "</td></tr>");

		DataHelper.globalCurrentSelectedItem = tt;
		DataHelper.saveSelectedItemToLocalStorage();
		console.log(tt.id);
	}
}
