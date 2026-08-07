(function () {
	const initProductAccordion = () => {
		$(".about__accordion-toggle").click(function () {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active");
				$(this)
					.siblings(".about__accordion-description")
					.eq($(this).index())
					.stop()
					.slideDown(300);
			} else {
				$(this).removeClass("active");
				$(this).siblings(".about__accordion-description").stop().slideUp(300);
			}
		});
	};

	// ── Control visibility of Add to Cart vs Quote button based on quantity ─────
	const initQuantityButtonToggle = () => {
		const quantityInput = document.querySelector('input[name="quantity"]');
		const addToCartBtn = document.querySelector('.product-form__submit');
		const quoteBtn = document.getElementById('product-quote-btn');

		if (!quantityInput || !addToCartBtn || !quoteBtn) return;

		const updateButtonsVisibility = () => {
			const qty = parseInt(quantityInput.value, 10) || 1;
			
			if (qty > 5) {
				// Show Quote button, hide Add to Cart
				addToCartBtn.style.display = 'none';
				quoteBtn.style.display = '';
				// Trigger cotizador modal when quote button is clicked
				quoteBtn.addEventListener('click', (e) => {
					e.preventDefault();
					const cotizadorBtn = document.getElementById('qcot-trigger');
					if (cotizadorBtn) cotizadorBtn.click();
				});
			} else {
				// Show Add to Cart, hide Quote button
				addToCartBtn.style.display = '';
				quoteBtn.style.display = 'none';
			}
		};

		// Listen to quantity changes
		quantityInput.addEventListener('change', updateButtonsVisibility);
		quantityInput.addEventListener('input', updateButtonsVisibility);

		// Initial check on load
		updateButtonsVisibility();
	};

	document.addEventListener("shopify:section:load", function () {
		initProductAccordion();
		initQuantityButtonToggle();
	});

	initProductAccordion();
	initQuantityButtonToggle();
})();
