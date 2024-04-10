class LHSMenuController {
	/**
	 * Populates the menu when the app is started.
	 */
	public static refreshMainMenu() {
		$("#MainMenu_Overdue").html('<p class="TTMenuPanelHeading panel-heading">Overdue</p>');
		$("#MainMenu_DueToday").html('<p class="TTMenuPanelHeading panel-heading">Due Today</p>');
		$("#MainMenu_DueTomorrow").html('<p class="TTMenuPanelHeading panel-heading">Due Tomorrow</p>');
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

				// Adapted from: https://stackoverflow.com/questions/61627784/right-align-text-in-bulma-panel-block
				let itemClasses = 'TTMenuItem panel-block is-justify-content-space-between';
				let badges = '';
				if (item.completedTs) {
					itemClasses += ' is-completed'
				}
				if (item.isStarred) {
					itemClasses += ' is-starred-menu-item'
					badges = '⭐️';
				}
				if (item.isFlagged) {
					itemClasses += ' is-flagged-menu-item'
					badges = '🔴';
				}
				if (item.delegation) {
					itemClasses += ' is-delegated-menu-item'
					badges = '💼';

				}

				let preparedHTML = ""
					+ "<a style='display: none;' class='" + itemClasses + "' id='" + MENU_ITEM_PREFIX + item.id + "'>"
					+ "<span>"
					+ "<span class='LeftSideMenuIdFragment'>" + item.getIdFragment() + "</span> &nbsp;"
					+ item.title + "</span>"
					+ "<div class='is-pulled-right'>" + badges + "</div>"
					+ "</a>";

				$("#MainMenu_" + destinationDom).append(preparedHTML);
			});
		});

		// try to move to pre-saved location
		let possibleSavedItem = DataHelper.retrieveSelectedItemFromStorage();
		if (null == possibleSavedItem) {
			// nothing was saved
		} else {
			RHSContentController.moveToMenuItemByID(possibleSavedItem.id);
			// AnimationController.insideDivSmoothScrollWithParent(
			// 	$("#" + MENU_ITEM_PREFIX + possibleSavedItem.id),
			// 	$("#LeftSide")
			// );
			let category = possibleSavedItem.determineCategory();
			let categoryString = TaskTicketCategoryHelper.enumToDomName(category);
			AnimationController.insideDivSmoothScrollWithParent(
				$("#MainMenu_" + categoryString),
				$("#LeftSide")
			);
		}
		
		$(".TTMenuItem").fadeIn("fast");
		LHSMenuController.attachMenuItemHandlers();
	}

	public static attachMenuItemHandlers() {
		$(".TTMenuItem").on("click", function () {
			let selectedID: string = $(this).attr("id").replace(MENU_ITEM_PREFIX, "");

			RHSContentController.moveToMenuItemByID(selectedID);
		});
	}

	public static saveDataAndRefreshMenu() {
		DataHelper.saveItemsToLocalStorage();
		LHSMenuController.refreshMainMenu();
	}

}
