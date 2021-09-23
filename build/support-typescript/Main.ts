

$(function () {
	DataHelper.retrieveItemsFromLocalStorage();
	MenuController.refreshMainMenu();

	$("#NewTaskButton").on("click", function () {
		let newTaskTitle = $("#NewTaskText").val().toString();

		let tt: TaskTicket = new TaskTicket(newTaskTitle);
		DataHelper.addNewItem(tt);
		$("#NewTaskText").val("");

		MenuController.refreshMainMenu();
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