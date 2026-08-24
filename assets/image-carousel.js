;(() => {
	const initSlider = (section) => {
		let slider, navigation, pagination

		if (document.currentScript) {
			slider = document.currentScript.parentElement.querySelector(
				'.image-carousel__slider'
			)
		} else {
			slider = section.querySelector('.image-carousel__slider')
		}

		if (!slider) return

		navigation = slider.parentElement.querySelector('.image-carousel__navigation')
		pagination = slider.parentElement.querySelector('.image-carousel__pagination')

		const columns = Number(slider.dataset.columns) || 3
		const columnsTablet = Number(slider.dataset.columnsTablet) || Math.max(1, columns - 1)
		const columnsMobile = Number(slider.dataset.columnsMobile) || 1

		let swiperParams = {
			slidesPerView: columnsMobile,
			spaceBetween: Number(slider.dataset.gap) || 16,
			grabCursor: true,
			breakpoints: {
				750: {
					slidesPerView: columnsTablet,
				},
				1200: {
					slidesPerView: columns,
				},
			},
		}

		if (slider.dataset.autoplay === 'true') {
			swiperParams.autoplay = {
				delay: (Number(slider.dataset.autoplaySpeed) || 5) * 1000,
				disableOnInteraction: false,
			}
		}

		if (slider.dataset.loop === 'true') {
			swiperParams.loop = true
		}

		if (slider.dataset.pagination === 'true' && pagination) {
			swiperParams.pagination = {
				el: pagination,
				type: 'bullets',
				clickable: true,
			}
		}

		if (slider.dataset.navigation === 'true' && navigation) {
			swiperParams.navigation = {
				nextEl: navigation.querySelector('.swiper-button-next'),
				prevEl: navigation.querySelector('.swiper-button-prev'),
			}
		}

		if (slider.swiper) slider.swiper.destroy(true, true)

		new Swiper(slider, swiperParams)
	}

	initSlider()

	document.addEventListener('shopify:section:load', function (section) {
		initSlider(section.target)
	})
})()
