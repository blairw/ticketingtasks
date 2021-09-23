class BoundingBox {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

class AnimationController {
	public static easeInOutQuad(t: number) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };

	public static getRelativePos(elm: any): BoundingBox {
		// to account for the height of sticky top bar and then some
		let INSIDE_DIV_SMOOTH_SCROLLING_OFFSET = 10;

		var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
			cPos = elm.getBoundingClientRect(), // target pos
			pos = new BoundingBox();

		pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop - INSIDE_DIV_SMOOTH_SCROLLING_OFFSET,
			pos.right = cPos.right - pPos.right,
			pos.bottom = cPos.bottom - pPos.bottom,
			pos.left = cPos.left - pPos.left;

		return pos;
	}

	public static scrollTo(element: any, to: number, duration: number) {
		var start = element.scrollTop,
			change = to - start,
			startTime = performance.now(),
			val, now, elapsed, t;

		function animateScroll() {
			now = performance.now();
			elapsed = (now - startTime) / 1000;
			t = (elapsed / duration);

			element.scrollTop = start + change * AnimationController.easeInOutQuad(t);

			if (t < 1) {
				window.requestAnimationFrame(animateScroll);
			}
		};

		animateScroll();
	}

	public static scrollToElm(container: any, elm: any, duration: number) {
		let pos:BoundingBox = AnimationController.getRelativePos(elm);
		AnimationController.scrollTo(container, pos.top, duration);
	}

	// SOURCE: https://stackoverflow.com/questions/635706/how-to-scroll-to-an-element-inside-a-div
	public static insideDivSmoothScroll(target: any) {
		AnimationController.insideDivSmoothScrollWithParent(target, target.parent());
	}

	public static insideDivSmoothScrollWithParent(target: any, parent: any) {
		let parentID = target.parent().attr("id");
		let targetID = target.attr("id");
		let parentSelector = document.querySelector("#" + parentID);
		let targetSelector = document.querySelector("#" + targetID);

		let durationInSeconds = 0.5;
		AnimationController.scrollToElm(parentSelector, targetSelector, durationInSeconds);
	}

	// source: https://css-tricks.com/snippets/jquery/smooth-scrolling/
	public static smoothScrollLinks() {
		// Select all links with hashes
		$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.on("click", function(event) {
			let hae = <HTMLAnchorElement> this;

			// On-page links
			if (
				location.pathname.replace(/^\//, '') == hae.pathname.replace(/^\//, '') &&
				location.hostname == hae.hostname
			) {
				// Figure out element to scroll to
				var target = $(hae.hash);
				target = target.length ? target : $('[name=' + hae.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();

					// BLAIR: replaced default code with `insideDivSmoothScrolling.js` version
					// $('html, body').animate({
					// 	scrollTop: target.offset().top
					// }, 500, function() {
					// 	// Callback after animation
					// });

					AnimationController.insideDivSmoothScroll($(target));
				}
			}
		});
	}
}
