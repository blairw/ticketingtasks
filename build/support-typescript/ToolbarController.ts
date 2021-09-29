class ToolbarController {
	public static dueDateDatePickerVisible = false;
	public static delegationInputVisible = false;

	public static initialise() {
		// Enable this if you need animated #anchor links
		// AnimationController.smoothScrollLinks();

		$("#NewCaseNoteButton").on("click", function () {
			let newCaseNoteTitle = $("#NewCaseNoteTextArea").val().toString();

			DataHelper.globalCurrentSelectedItem.addCaseNote(newCaseNoteTitle);

			$("#NewCaseNoteTextArea").val("");
		});

		$("#NewTaskButton").on("click", function () {
			let newTaskTitle = $("#NewTaskText").val().toString();

			let tt: TaskTicket = new TaskTicket(newTaskTitle);
			DataHelper.addNewItem(tt);
			$("#NewTaskText").val("");

			LHSMenuController.refreshMainMenu();
			RHSContentController.moveToMenuItemByID(tt.id);
		});

		$("#DueDateDatePicker").on("change", function () {
			$("#DueDateButton").removeClass("is-disabled");
		});

		let keyTrackers = {
			"#NewCaseNoteTextArea": "#NewCaseNoteButton",
			"#NewTaskText": "#NewTaskButton",
			"#DelegationInput": "#DelegationButton"
		};

		$.each(keyTrackers, function (myTextarea, myButton) {
			$(myTextarea).on("keyup", function () {
				let textEntered = <string>$(myTextarea).val();
				if (textEntered.length > 2) {
					$(myButton).removeClass("is-disabled");
				} else {
					$(myButton).addClass("is-disabled");
				}
			});
		});
	}

	public static userDidClickDueDateButton() {
		if (ToolbarController.dueDateDatePickerVisible) {
			// behaviour if due date picker already visible
			let selectedDueDate = <string>$("#DueDateDatePicker").val();
			DataHelper.globalCurrentSelectedItem.setDueDate(selectedDueDate);
			ToolbarController.hideDetail("#DueDateButton");

		} else {
			// behaviour if due date picker not yet visible
			ToolbarController.hideAllDetail();
			$("#DueDateDatePicker").animate({ width: 'toggle' }, 100);
			$("#DueDateDatePicker").trigger("focus");

			// Adapted from https://stackoverflow.com/questions/596608/slide-right-to-left
			$("#DueDateButton").addClass("is-info");
			$("#DueDateButton").addClass("is-disabled");
			$("#DueDateButton").html("🗓 set due date");
			ToolbarController.dueDateDatePickerVisible = true;
		}

	}


	public static userDidClickDelegationButton() {
		if (ToolbarController.delegationInputVisible) {
			// behaviour if due date picker already visible
			let enteredDelegation = <string>$("#DelegationInput").val();
			DataHelper.globalCurrentSelectedItem.setDelegation(enteredDelegation);
			ToolbarController.hideDetail("#DelegationButton");

		} else {
			// behaviour if due date picker not yet visible
			ToolbarController.hideAllDetail();
			$("#DelegationInput").animate({ width: 'toggle' }, 100);
			$("#DelegationInput").trigger("focus");

			// Adapted from https://stackoverflow.com/questions/596608/slide-right-to-left
			$("#DelegationButton").addClass("is-info");
			$("#DelegationButton").addClass("is-disabled");
			$("#DelegationButton").html("💼 set delegation");
			ToolbarController.delegationInputVisible = true;
		}
	}

	private static hideAllDetail() {
		$.each(["#DueDateButton", "#DelegationButton"], function(index, value) {
			ToolbarController.hideDetail(value);
		});
	}

	private static hideDetail(buttonSelector: string) {
		let buttonLabel = "";
		let inputSelector = "";

		if (buttonSelector == "#DueDateButton") {
			buttonLabel = "🗓 due";
			inputSelector = "#DueDateDatePicker";
			ToolbarController.dueDateDatePickerVisible = false;
		} else if (buttonSelector == "#DelegationButton") {
			buttonLabel = "💼 delegate";
			inputSelector = "#DelegationInput";
			ToolbarController.delegationInputVisible = false;
		}

		$(buttonSelector).removeClass("is-info");
		$(buttonSelector).removeClass("is-disabled");
		$(buttonSelector).html(buttonLabel);
		$(inputSelector).val("")
		$(inputSelector).hide();
	}
}