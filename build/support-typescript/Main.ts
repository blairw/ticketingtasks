$(function () {
	DataHelper.retrieveItemsFromLocalStorage();
	LHSMenuController.refreshMainMenu();

	ToolbarController.initialise();
});