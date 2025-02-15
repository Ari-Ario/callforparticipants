
/*=======================================
[Start Activation Code]
=========================================
* Sticky Header JS
* Search JS
* Mobile Menu JS
* Hero Slider JS
* Testimonial Slider JS
* Portfolio Slider JS
* Clients Slider JS
* Single Portfolio Slider JS
* Accordion JS
* Nice Select JS
* Date Picker JS
* Counter Up JS
* Checkbox JS
* Right Bar JS
* Video Popup JS
* Wow JS
* Scroll Up JS
* Animate Scroll JS
* Stellar JS
* Google Maps JS
* Preloader JS
=========================================
[End Activation Code]
=========================================*/ 

// const loadHeader = () => {
// 	fetch('./components/header.html')
// 	.then(res => {
// 		return res.text()
// 	})
// 	.then(data => {
// 		document.querySelector('#header').innerHTML = data;
// 	})
// 	console.log('header');
// }

// const loadFooter = () => {
//     fetch('./components/footer.html')
//     .then(res => {
//         return res.text();
//     })
//     .then(data => {
//         document.querySelector('#footer').innerHTML = data ; 
//     })
//     console.log('footer');
// }

// loadHeader();
// loadFooter();

(function($) {
    "use strict";

     $(document).on('ready', function() {
	
        jQuery(window).on('scroll', function() {
			if ($(this).scrollTop() > 200) {
				$('#header .header-inner').addClass("sticky");
			} else {
				$('#header .header-inner').removeClass("sticky");
			}
		});
		
		/*====================================
			Sticky Header JS
		======================================*/ 
		jQuery(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$('.header').addClass("sticky");
			} else {
				$('.header').removeClass("sticky");
			}
		});
		
		$('.pro-features .get-pro').on( "click", function(){
			$('.pro-features').toggleClass('active');
		});
		
		/*====================================
			Search JS
		======================================*/ 
		$('.search a').on( "click", function(){
			$('.search-top').toggleClass('active');
		});
		
		/*====================================
			Mobile Menu
		======================================*/ 	
		$('.menu').slicknav({
			prependTo:".mobile-nav",
			duration: 300,
			closeOnClick:true,
		});
		
		/*===============================
			Hero Slider JS
		=================================*/ 
		$(".hero-slider").owlCarousel({
			loop:true,
			autoplay:true,
			smartSpeed: 500,
			autoplayTimeout:3500,
			singleItem: true,
			autoplayHoverPause:true,
			items:1,
			nav:true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			dots:false,
		});

		
		/*=====================================
			Counter Up JS
		======================================*/
		$('.counter').counterUp({
			delay:20,
			time:2000
		});
		

		
		/*===================
			Accordion JS
		=====================*/ 
		$('.accordion > li:eq(0) a').addClass('active').next().slideDown();
		$('.accordion a').on('click', function(j) {
			var dropDown = $(this).closest('li').find('p');
			$(this).closest('.accordion').find('p').not(dropDown).slideUp(300);
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).closest('.accordion').find('a.active').removeClass('active');
				$(this).addClass('active');
			}
			dropDown.stop(false, true).slideToggle(300);
			j.preventDefault();
		});
		
		/*====================================
			Nice Select JS
		======================================*/ 	
		$('select').niceSelect();
		
		/*=====================================
			Date Picker JS
		======================================*/ 
		$( function() {
			$( "#datepicker" ).datepicker();
		} );
		
		
		
		/*===============================
			Checkbox JS
		=================================*/  
		$('input[type="checkbox"]').change(function(){
			if($(this).is(':checked')){
				$(this).parent("label").addClass("checked");
			} else {
				$(this).parent("label").removeClass("checked");
			}
		});
		
		/*===============================
			Right Bar JS
		=================================*/ 
		$('.right-bar .bar').on( "click", function(){
			$('.sidebar-menu').addClass('active');
		});
		$('.sidebar-menu .cross').on( "click", function(){
			$('.sidebar-menu').removeClass('active');
		});
		

		/*================
			Wow JS
		==================*/		
		var window_width = $(window).width();   
			if(window_width > 767){
            new WOW().init();
		}
	
		/*===================
			Scroll Up JS
		=====================*/
		$.scrollUp({
			scrollText: '<span><i class="fa fa-angle-up"></i></span>',
			easingType: 'easeInOutExpo',
			scrollSpeed: 900,
			animation: 'fade'
		}); 

		
		/*=======================
			Stellar JS
		=========================*/
		$.stellar({
		  horizontalOffset: 0,
		  verticalOffset: 0
		});

		/*====================
			Google Maps JS
		======================*/
		var map = new GMaps({
				el: '#map',
				lat: 23.011245,
				lng: 90.884780,
				scrollwheel: false,
			});
			map.addMarker({
				lat: 23.011245,
				lng: 90.884780,
				title: 'Marker with InfoWindow',
				infoWindow: {
				content: '<p>welcome to Medipro</p>'
			}
		
			});
		});

		/*====================
			Togel checkbox of Photos
		======================*/
		$(document).ready(function () {
			$(".photo-box img").on("click", function (e) {
				let checkbox = $(this).siblings(".photo-checkbox");
				checkbox.prop("checked", !checkbox.prop("checked")); // Toggle checked state
				e.stopPropagation(); // Prevent bubbling
			});
		});
		
	
	
	/*====================
		Preloader JS
	======================*/
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	});


	/*====================
	* Init swiper sliders
	======================*/
	  function initSwiper() {
		document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
		  let config = JSON.parse(
			swiperElement.querySelector(".swiper-config").innerHTML.trim()
		  );
	
		  if (swiperElement.classList.contains("swiper-tab")) {
			initSwiperWithCustomPagination(swiperElement, config);
		  } else {
			new Swiper(swiperElement, config);
		  }
		});
	  }
	
	  window.addEventListener("load", initSwiper);

	/*====================
	* Hiding Elemnts in Pricing page
	======================*/
	$(document).ready(function(){
		$("#pricingToggle").change(function(){
			$(".switch-hide").toggleClass("d-flex d-none");
		});
	});

	/*====================
	* Dark/Light Mode Toggle
	======================*/
	document.addEventListener("DOMContentLoaded", function() {
		// Ensure jQuery is available
		if (typeof jQuery !== "undefined") {
			$(document).ready(function() {
				// Dark/Light Mode Toggle
				$("#themeToggle").change(function() {
					if ($(this).is(":checked")) {
						$("body").addClass("dark-mode").removeClass("light-mode");
						localStorage.setItem("theme", "dark");
					} else {
						// console.log("changed to light mode");
						$("body").addClass("light-mode").removeClass("dark-mode");
						localStorage.setItem("theme", "light");
					}
				});
	
				// Apply saved theme on page load
				if (localStorage.getItem("theme") === "dark") {
					$("#themeToggle").prop("checked", true);
					$("body").addClass("dark-mode").removeClass("light-mode");
				} else {
					$("#themeToggle").prop("checked", false);
					$("body").addClass("light-mode").removeClass("dark-mode");
				}
			});
		} else {
			console.error("jQuery is not loaded. Please check your script order.");
		}
	});

	/*====================
	* Display next-btn "weiter"
	======================*/
	// $(document).ready(function () {
	// 	function toggleNextButton() {
	// 		let isChecked = $("input[type='checkbox']:checked").length > 0;
	
	// 		if (isChecked) {
	// 			$(".next-btn").prop("disabled", false).css({ "opacity": "1", "cursor": "pointer" });
	// 		} else {
	// 			$(".next-btn").prop("disabled", true).css({ "opacity": "0.5", "cursor": "not-allowed" });
	// 		}
	// 	}
	
	// 	// Listen for changes on checkboxes only
	// 	$("input[type='checkbox']").on("change", toggleNextButton);
	
	// 	// Initial state check
	// 	toggleNextButton();
	// });	
	

	/*====================
	* Hidden Elemnts research-about
	======================*/
	$(document).ready(function () {
		// When any radio button inside .selection-grid is selected
		$('input[name="studyRole"]').on("change", function () {
			// Highlight the selected box
			$(".selection-box").removeClass("selected");
			$(this).closest(".selection-box").addClass("selected");
	
			// Show the hidden section & buttons
			$(".hidden-section, .nav-btn").fadeIn(300);

			// Update progress bar to 56%
			$(".progress-bar").css({
				"width": "56%",
				"transition": "width 0.5s ease-in-out" // Smooth animation
			});
		});
	});

	/*====================
	* Hidden Elemnts study-how
	======================*/
	$(document).ready(function () {
		// When any radio button inside .selection-grid is selected
		$('input[name="studyHow"]').on("change", function () {
			// Highlight the selected box
			$(".selection-box").removeClass("selected");
			$(this).closest(".selection-box").addClass("selected");
	
			// Hide all sections first
			$(".hidden-section, .hidden-section-person, .hidden-section-other, .nav-btn").hide();

			// Show only the relevant section based on the selected radio button
			if ($(this).hasClass("studyOnline")) {
				$(".hidden-section, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("studyPerson")) {
				$(".hidden-section-person, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("studyOther")) {
				$(".hidden-section-other, .nav-btn").fadeIn(300);
			}
		});
	});

	/*====================
	* Hidden Elemnts studyWhich selection
	======================*/
	$(document).ready(function () {
		$('input[name="studyWhich"]').on("change", function () {
			// Highlight the selected box
			$(".selection-box").removeClass("selected");
			$(this).closest(".selection-box").addClass("selected");
	
			// Hide all sections first
			$(".hidden-section-interview, .hidden-section-group, .hidden-section-survey, .hidden-section-product, .hidden-section-observation, .hidden-section-other").hide();
	
			// Show only the relevant section based on the selected radio button
			if ($(this).hasClass("interview")) {
				$(".hidden-section-interview, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("group")) {
				$(".hidden-section-group, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("survay")) {
				$(".hidden-section-survey, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("product")) {
				$(".hidden-section-product, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("observation")) {
				$(".hidden-section-observation, .nav-btn").fadeIn(300);
			}
			if ($(this).hasClass("other")) {
				$(".hidden-section-other, .nav-btn").fadeIn(300);
			}
		});
	});

	/*====================
	* Select-Unselect study-keywords
	======================*/
	$(document).ready(function () {
		$(".selection-box input[type='checkbox']").on("click", function () {
			let parentBox = $(this).closest(".selection-box");
	
			if ($(this).prop("checked")) {
				parentBox.addClass("selected");
			} else {
				parentBox.removeClass("selected");
			}
		});
	});
	

	/*====================
	* Reset color, 2000 letters onward
	======================*/
	$(document).ready(function () {
		$(".textarea").on("input", function () {
			let maxChars = 2000;
			let text = $(this).val();
			let textLength = $(this).val().length;
			let warningText = $(this).next("p"); 
			
			if (textLength > maxChars) {
				let normalText = text.substring(0, maxChars);
				let extraText = text.substring(maxChars);
				// console.log(normalText);
				// console.log(extraText);
				$(this).css("color", "red");
				warningText.css("color", "red");
			} else {
				// Reset text color
				$(this).css("color", "");
				warningText.css("color", ""); 
			}
		});
	});
	
	
	/*====================
	* Select-Unselect study-keywords
	======================*/
	$(document).ready(function () {
		$(".photo-box img").on("click", function (e) {
			let checkbox = $(this).siblings(".photo-checkbox");
	
			if (checkbox.prop("checked")) {
				checkbox.prop("checked", false);
				$(this).siblings(".checkboxs").fadeOut(200);
			} else {
				checkbox.prop("checked", true);
				$(this).siblings(".checkboxs").fadeIn(200);
			}
			e.stopPropagation(); // Prevent event bubbling
		});
	});
	
	/*====================
	* Select-Unselect geofence
	======================*/
	$(document).ready(function () {
		// Set "Worldwide" as checked by default
		$("#codeToggle").prop("checked", true);
	
		// When another continent is checked, uncheck "Worldwide"
		$(".continent-toggle").on("change", function () {
			if ($(this).prop("checked")) {
				$("#codeToggle").prop("checked", false);
			}
		});
	
		// If "Worldwide" is checked, uncheck all continents
		$("#codeToggle").on("change", function () {
			if ($(this).prop("checked")) {
				$(".continent-toggle").prop("checked", false);
			}
		});
	
		// Show dropdown when continent switch is turned on
		$(".continent-toggle").on("change", function () {
			let dropdown = $(this).closest(".continent-section").find(".continent-dropdown");
			if ($(this).prop("checked")) {
				dropdown.slideDown();
			} else {
				dropdown.slideUp();
			}
		});
	
		// Clicking the div toggles the dropdown (but not inside elements)
		$(".switch-container").on("click", function (event) {
			if (!$(event.target).is("input, label")) { 
				let dropdown = $(this).next(".continent-dropdown");
				$(".continent-dropdown").not(dropdown).slideUp(); // Close others
				dropdown.slideToggle(); // Toggle clicked one
			}
		});

		const selectCountries = document.getElementById("selectCountries");
		const excludeCountries = document.getElementById("excludeCountries");
		// Open country popup on "+ hinzufügen" click
		$(document).on("click", ".add-countries", function () {
			let targetPopup = $(this).data("target");
			console.log("Opening popup:", targetPopup); // Debugging
			$("#" + targetPopup).fadeIn();

			// Set the toggle switch to "Länder auswählen"
			$("#toggleMode").prop("checked", false).trigger("change");
			selectCountries.classList.remove("d-none");
			excludeCountries.classList.add("d-none");
		});

		// Open country popup on "- ausschließen" click
		$(document).on("click", ".remove-countries", function () {
			let targetPopup = $(this).data("target");
			console.log("Opening popup (remove):", targetPopup); // Debugging
			$("#" + targetPopup).fadeIn();

			// Set the toggle switch to "Länder ausschließen"
			$("#toggleMode").prop("checked", true).trigger("change");
			selectCountries.classList.add("d-none");
			excludeCountries.classList.remove("d-none");
		});
	
		// Close country popup when clicking outside
		$(".close-popup").on("click", function () {
			$(this).closest(".country-popup").fadeOut();
		});
	});	


	/*====================
	* Popups geofence, countries
	======================*/
	$(document).ready(function () {
		const $toggleMode = $("#toggleMode");
		const $selectCountries = $("#selectCountries");
		const $excludeCountries = $("#excludeCountries");
		const $countryBubbles = $(".country-bubble");
	
		// 🔄 Toggle between select and exclude / it functions only in Javascript
		$toggleMode.on("change", function () {
			if ($(this).prop("checked")) {
				$selectCountries.addClass("d-none");
				$excludeCountries.removeClass("d-none");
			} else {
				$selectCountries.removeClass("d-none");
				$excludeCountries.addClass("d-none");
			}
		});
		// $toggleMode.on("change", function () {
		// 	if ($(this).is(":checked")) {
		// 		$selectCountries.hide();
		// 		$excludeCountries.show();
		// 	} else {
		// 		$selectCountries.show();
		// 		$excludeCountries.hide();
		// 	}
		// }).trigger("change"); // Ensure correct state on page load

	
		// 🔎 Search Functionality
		$("#searchInput").on("input", function () {
			let filter = $(this).val().toLowerCase();
			$(".country-bubble").each(function () {
				let text = $(this).text().toLowerCase();
				$(this).toggle(text.includes(filter));
			});
		});


		// ✅ Handle country selection/deselection & disable in the opposite list
		$(document).ready(function () {
			let mainCategories = ["Ostasien", "Südasien", "Südostasien", "Nordeuropa", "Mitteleuropa", "Südeuropa"];
			
		
			$(".country-bubble").on("click", function () {
				let $bubble = $(this);
				let country = $bubble.data("country");
		
				// Check if it's a main category
				if (mainCategories.includes(country)) {
					let $countryList = $bubble.closest(".country-list"); // Find the parent list
					let $subCountries = $countryList.find(".country-bubble").not($bubble); // All sub-countries inside the list
		
					if ($bubble.hasClass("selected")) {
						// 🔹 Deselect main category & all sub-countries
						$bubble.removeClass("selected");
						$subCountries.removeClass("selected");
					} else {
						// 🔹 Select main category & all sub-countries
						$bubble.addClass("selected");
						$subCountries.addClass("selected");
					}
				} else {
					// Handle individual country selection
					let $countryList = $bubble.closest(".country-list");
					let $mainCategory = $countryList.find(".country-bubble").first(); // First bubble is always the main category
					let $allSubCountries = $countryList.find(".country-bubble").not($mainCategory); // All sub-countries
		
					if ($bubble.hasClass("selected")) {
						// 🔹 Deselect individual country
						$bubble.removeClass("selected");
		
						// If any sub-country is unselected, also unselect the main category
						if ($allSubCountries.filter(".selected").length !== $allSubCountries.length) {
							$mainCategory.removeClass("selected");
						}
					} else {
						// 🔹 Select individual country
						$bubble.addClass("selected");
		
						// If all sub-countries are selected, select the main category too
						if ($allSubCountries.length === $allSubCountries.filter(".selected").length) {
							$mainCategory.addClass("selected");
						}
					}
					
				}


				// Handle disabling selected countries from one side to another and vice versa
				function disableOppositeCountries(country) {
					const currentListId = $bubble.closest(".country-section").attr("id"); // Get the current list ID (selectCountries or excludeCountries)
					const oppositeListId = currentListId === "selectCountries" ? "excludeCountries" : "selectCountries"; // Determine the opposite list ID
				
					const selectedInCurrentList = document.querySelector(`#${currentListId} .country-bubble[data-country='${country}']`);
					const selectedInOppositeList = document.querySelector(`#${oppositeListId} .country-bubble[data-country='${country}']`);
				
					if (selectedInCurrentList && selectedInOppositeList) {
						// Disable in the opposite list if selected in the current list
						if (selectedInCurrentList.classList.contains("selected")) {
							selectedInOppositeList.style.opacity = "0.5";
							selectedInOppositeList.classList.add("disabled");
							selectedInOppositeList.style.pointerEvents = "none"; // Prevent clicking
						} else {
							selectedInOppositeList.style.opacity = "1";
							selectedInOppositeList.classList.remove("disabled");
							selectedInOppositeList.style.pointerEvents = "auto"; // Allow clicking
						}
					}
				}
				
				// Call this function after handling selection/deselection
				disableOppositeCountries(country);

				// If it's a main category, disable all sub-countries in the opposite list
				if (mainCategories.includes(country)) {
					const $countryList = $bubble.closest(".country-list");
					const $subCountries = $countryList.find(".country-bubble").not($bubble);

					$subCountries.each(function () {
						const subCountry = $(this).data("country");
						disableOppositeCountries(subCountry);
					});

					// Disable the main category in the opposite list
					disableOppositeCountries(country);
				}

				// Additional block to disable mainCategories in the opposite side if any sub-country is selected
				function disableMainCategoryIfSubCountriesSelected(mainCategory) {
					const $countryList = $(`.country-bubble[data-country='${mainCategory}']`).closest(".country-list");
					const $subCountries = $countryList.find(".country-bubble").not(`[data-country='${mainCategory}']`);

					let shouldDisableMainCategory = false;

					// Check if any sub-country is selected in the current side
					$subCountries.each(function () {
						const subCountry = $(this).data("country");
						const $currentBubble = $(`.country-bubble[data-country='${subCountry}']`);
						const $oppositeBubble = $(`#selectCountries .country-bubble[data-country='${subCountry}'], #excludeCountries .country-bubble[data-country='${subCountry}']`)
							.not($currentBubble);

						if ($oppositeBubble.length && $oppositeBubble.hasClass("selected")) {
							shouldDisableMainCategory = true;
							return false; // Break the loop
						}
					});

					// Disable or enable the main category in the opposite side based on the check
					const $oppositeMainCategory = $(`#selectCountries .country-bubble[data-country='${mainCategory}'], #excludeCountries .country-bubble[data-country='${mainCategory}']`)
						.not($(`.country-bubble[data-country='${mainCategory}']`)); // Ensure we only target the opposite side

					if (shouldDisableMainCategory) {
						$oppositeMainCategory.css("opacity", "0.5").addClass("disabled").css("pointer-events", "none");
					} else {
						$oppositeMainCategory.css("opacity", "1").removeClass("disabled").css("pointer-events", "auto");
					}
				}

				// Call this function for each main category after handling selection/deselection
				mainCategories.forEach(mainCategory => {
					disableMainCategoryIfSubCountriesSelected(mainCategory);
				});


			});


		});
		
		

	});
	
	

	// $(document).ready(function () {
	// 	// Uncheck worldwide when a continent is checked
	// 	$(".continent-toggle").on("change", function () {
	// 		if ($(this).prop("checked")) {
	// 			$("#codeToggle").prop("checked", false);
	// 		}
	// 	});
	
	// 	// Uncheck all continents when worldwide is checked
	// 	$("#codeToggle").on("change", function () {
	// 		if ($(this).prop("checked")) {
	// 			$(".continent-toggle").prop("checked", false);
	// 		}
	// 	});
	
	// 	// Clicking the div toggles the dropdown (but not inside elements)
	// 	$(".switch-container").on("click", function (event) {
	// 		if (!$(event.target).is("input, label")) { 
	// 			let dropdown = $(this).next(".continent-dropdown");
	// 			$(".continent-dropdown").not(dropdown).slideUp(); // Close others
	// 			dropdown.slideToggle(); // Toggle clicked one
	// 		}
	// 	});
	
	// 	// Open popup on clicking "+ hinzufügen"
	// 	$(".add-countries").on("click", function (event) {
	// 		event.stopPropagation();
	// 		let targetPopup = $(this).data("target");
	// 		$("#" + targetPopup).fadeIn();
	// 	});
	
	// 	// Close popup only on clicking the switch
	// 	$(".continent-toggle").on("change", function () {
	// 		let targetPopup = $(this).closest(".continent-section").find(".add-countries").data("target");
	// 		if (!$(this).prop("checked")) {
	// 			$("#" + targetPopup).fadeOut();
	// 		}
	// 	});
	// });
	
	
	/*====================
	  * Initiate Pure Counter
	======================*/
	new PureCounter();

})(jQuery);