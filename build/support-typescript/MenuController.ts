class MenuController {
	/**
	 * Populates the menu when the app is started.
	 */
	public static refreshMainMenu() {
		$("#MainMenu_Overdue").html('<p class="TTMenuPanelHeading panel-heading">Overdue</p>');
		$("#MainMenu_DueToday").html('<p class="TTMenuPanelHeading panel-heading">Due Today</p>');
		$("#MainMenu_DueSoon").html('<p class="TTMenuPanelHeading panel-heading">Due Soon</p>');
		$("#MainMenu_Neglected").html('<p class="TTMenuPanelHeading panel-heading">Neglected?</p>');
		$("#MainMenu_Uncategorised").html('<p class="TTMenuPanelHeading panel-heading">Uncategorised</p>');
		$("#MainMenu_DoneBeforeToday").html('<p class="TTMenuPanelHeading panel-heading">Done Before Today</p>');

		// sort into buckets
		let preparedBuckets = TaskTicketCategoryHelper.generateBuckets();
		$.each(DataHelper.globalItems, function (index, value) {
			let item = <TaskTicket>value;
			
			let destinationBucket = item.determineCategory();
			preparedBuckets[destinationBucket].push(item);
		});

		// generate
		$.each(preparedBuckets, function(bucketID, bucketContents) {
			// sort by name, then by completion
			// Adapted from: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
			// Adapted from: https://stackoverflow.com/questions/48195456/order-array-of-objects-with-typescript-by-value
			let notDonePart = bucketContents.filter(obj => obj.completedTs == null);
			let donePart = bucketContents.filter(obj => obj.completedTs != null);
			notDonePart.sort((a, b) => (a.title > b.title ? 1 : -1));
			donePart.sort((a, b) => (a.title > b.title ? 1 : -1));
			bucketContents = notDonePart.concat(donePart);

			$.each(bucketContents, function(index, item) {
				let destinationDom = TaskTicketCategoryHelper.enumToDomName(bucketID);

				let itemClasses = 'TTMenuItem panel-block';
				if (item.completedTs) {
					itemClasses += ' is-completed'
				}

				let preparedHTML = ""
					+ "<a style='display: none;' class='" + itemClasses + "' id='" + MENU_ITEM_PREFIX + item.id + "'>"
					+ item.title
					+ "</a>";

				$("#MainMenu_" + destinationDom).append(preparedHTML);
			});
		});

		// try to move to pre-saved location
		let possibleSavedItem = DataHelper.retrieveSelectedItemFromStorage();
		if (null == possibleSavedItem) {
			// nothing was saved
		} else {
			MenuController.moveToMenuItemByID(possibleSavedItem.id);
			// AnimationController.insideDivSmoothScrollWithParent(
			// 	$("#" + MENU_ITEM_PREFIX + possibleSavedItem.id),
			// 	$("#LeftSide")
			// );
			let category = possibleSavedItem.determineCategory();
			let categoryString = TaskTicketCategoryHelper.enumToDomName(category);
			console.log("categoryString == " + categoryString);
			AnimationController.insideDivSmoothScrollWithParent(
				$("#MainMenu_" + categoryString),
				$("#LeftSide")
			);
		}
		
		$(".TTMenuItem").fadeIn("fast");
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
