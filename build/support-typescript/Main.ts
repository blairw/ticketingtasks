class Main {
	public static main() {
		DataHelper.retrieveItemsFromLocalStorage();
		ToolbarController.initialise();
	}
	
	public static foreachHelper(input_dictionary: any, callback_function: any) {
		// @ts-ignore
		for (const [the_key, the_value] of Object.entries(input_dictionary)) {
			callback_function(the_key, the_value);
		}
	}
}
