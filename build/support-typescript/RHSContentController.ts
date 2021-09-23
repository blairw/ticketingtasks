class RHSContentController {
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
		$("#RHSTaskDetails").append("<tr><td>External ID</td><td>" + tt.externalId + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Title</td><td>" + tt.title + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Created</td><td>" + tt.createTs + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Due</td><td>" + tt.dueDate + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Completed</td><td>" + tt.completedTs + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Delegation</td><td>" + tt.delegation + "</td></tr>");
		$("#RHSTaskDetails").append("<tr><td>Note</td><td>" + tt.note + "</td></tr>");

		$("#RHSCaseNotes").html("");
		tt.caseNotes = tt.caseNotes.sort((a, b) => (a.createTs > b.createTs ? -1 : 1))
		$.each(tt.caseNotes, function(index, caseNote) {
			let preparedCaseNoteHTML = "<div class='panel CaseNotePanel'>";
			preparedCaseNoteHTML += "<div class='CaseNoteTimestamp'>" + caseNote.createTs + "</div>";
			preparedCaseNoteHTML += "<p>" + caseNote.title + "</p>";
			preparedCaseNoteHTML += "</div>";

			$("#RHSCaseNotes").append(preparedCaseNoteHTML);
		});

		DataHelper.globalCurrentSelectedItem = tt;
		DataHelper.saveSelectedItemToLocalStorage();
		console.log(tt.id);
	}
}