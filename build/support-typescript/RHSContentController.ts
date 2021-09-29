class RHSContentController {
	public static generateTableRow(label: string, value: any): string {
		let classes = "";
		if (label == "ID") {
			classes += " is-family-monospace";
		}
		
		if (value instanceof Date) {
			value = MyUtilities.getPreferredLocalString(value);
			classes += " is-family-monospace";
		}

		let preparedHTML = "<tr>";
		preparedHTML += "<td>" + label + "</td>";
		
		if (null == value) {
			preparedHTML += "<td class='" + classes + " has-text-grey-light'>N/A</td>";
		} else {
			preparedHTML += "<td class='" + classes + "'>" + value + "</td>";
		}
		
		preparedHTML += "</tr>";

		return preparedHTML;
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
		$.each({
			"ID": tt.id,
			"External ID": tt.externalId,
			"Title": tt.title,
			"Created": tt.createTs,
			"Due": tt.dueDate,
			"Completed": tt.completedTs,
			"Delegation": tt.delegation,
			"Note": tt.note,
		}, function(index, value) {
			$("#RHSTaskDetails").append(RHSContentController.generateTableRow(index, value))
		});

		$("#RHSCaseNotes").html("");
		tt.caseNotes = tt.caseNotes.sort((a, b) => (a.createTs > b.createTs ? -1 : 1))
		$.each(tt.caseNotes, function(index, caseNote) {
			let preparedCaseNoteHTML = "<div class='panel CaseNotePanel'>";
			preparedCaseNoteHTML += "<div class='CaseNoteTimestamp is-family-monospace'>" + MyUtilities.getPreferredLocalString(caseNote.createTs) + "</div>";
			preparedCaseNoteHTML += "<p>" + caseNote.title + "</p>";
			preparedCaseNoteHTML += "</div>";

			$("#RHSCaseNotes").append(preparedCaseNoteHTML);
		});

		// Toolbar stuff, maybe should move to Toolbar Controller
		if (tt.isStarred) {
			$("#ToolbarStarButton").addClass("is-warning");
		} else {
			$("#ToolbarStarButton").removeClass("is-warning");
		}
		if (tt.isFlagged) {
			$("#ToolbarFlagButton").addClass("is-danger");
		} else {
			$("#ToolbarFlagButton").removeClass("is-danger");
		}
		if (tt.completedTs) {
			$("#ToolbarTickButton").addClass("is-success");
		} else {
			$("#ToolbarTickButton").removeClass("is-success");
		}
		

		DataHelper.globalCurrentSelectedItem = tt;
		DataHelper.saveSelectedItemToLocalStorage();
		$("#NewCaseNoteTextArea").trigger("focus");
	}
}