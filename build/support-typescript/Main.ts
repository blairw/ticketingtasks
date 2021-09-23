

$(function () {
	DataHelper.retrieveItemsFromLocalStorage();
	LHSMenuController.refreshMainMenu();

	// Enable this if you need animated #anchor links
	// AnimationController.smoothScrollLinks();

	$("#NewTaskButton").on("click", function () {
		let newTaskTitle = $("#NewTaskText").val().toString();

		let tt: TaskTicket = new TaskTicket(newTaskTitle);
		DataHelper.addNewItem(tt);
		$("#NewTaskText").val("");

		LHSMenuController.refreshMainMenu();
	});

	$("#NewTaskText").on("keyup", function () {
		let textEntered = <string> $("#NewTaskText").val();
		if (textEntered.length > 2) {
			$("#NewTaskButton").removeClass("is-disabled");
		} else {
			$("#NewTaskButton").addClass("is-disabled");
		}
	});

});