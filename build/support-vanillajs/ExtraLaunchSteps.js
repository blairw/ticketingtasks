function bodyDidLoad() {
	// TypeScript start-up
	Main.main();

	// Put stuff here if you need it to load outside of TypeScript system.
}

function vanillaJS_exportAndDeleteCompletedTickets() {
	var nativeObject = DataHelper.deleteAndReturnCompletedItems();
	vanillaJS_saveToJSONFile(nativeObject);
}

function vanillaJS_saveToJSONFile(nativeObject) {
	var jsonString = JSON.stringify(nativeObject);
	var newDate = new Date();
	var newDateString = newDate.toISOString();
	newDateString = newDateString.replace(":", "");
	newDateString = newDateString.replace(".", "");
	
	var blob = new Blob([jsonString], {type: "text/plain;charset=utf-8"});
	var filename = newDateString + ".ticketingtasks.json";
	saveAs(blob, filename);
}

function vanillaJS_loadUploadedSONFile() {
	var file = document.getElementById("TTUploadFileInput").files[0];
	var reader = new FileReader();
	reader.addEventListener('load', (event) => {
		DataHelper.retrieveItemsFromUploadedJSONFile(event.target.result);
	});
	reader.readAsText(file, "UTF-8");
}

// Adapted from https://bulma.io/documentation/components/modal/
document.addEventListener('DOMContentLoaded', () => {
	// Functions to open and close a modal
	function openModal($el) {
	  $el.classList.add('is-active');
	}
  
	function closeModal($el) {
	  $el.classList.remove('is-active');
	}
  
	function closeAllModals() {
	  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
		closeModal($modal);
	  });
	}
  
	// Add a click event on buttons to open a specific modal
	(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
	  const modal = $trigger.dataset.target;
	  const $target = document.getElementById(modal);
  
	  $trigger.addEventListener('click', () => {
		openModal($target);
	  });
	});
  
	// Add a click event on various child elements to close the parent modal
	(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
	  const $target = $close.closest('.modal');
  
	  $close.addEventListener('click', () => {
		closeModal($target);
	  });
	});
  
	// Add a keyboard event to close all modals
	document.addEventListener('keydown', (event) => {
	  if(event.key === "Escape") {
		closeAllModals();
	  }
	});
  });
