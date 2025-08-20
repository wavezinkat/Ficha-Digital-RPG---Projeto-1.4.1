// EventManager handles all event listeners and user interactions
import { COUNTRIES, RACIAL_FEATURES } from "../models/index.js";

export class EventManager {
	constructor() {
		this.uiManager = null;
		this.dataManager = null;
		this.chartManager = null;
	}

	setManagers(uiManager, dataManager, chartManager) {
		this.uiManager = uiManager;
		this.dataManager = dataManager;
		this.chartManager = chartManager;
	}

	setupEventListeners() {
		this.setupTabEvents();
		this.setupInputEvents();
		this.setupImageAndThemeEvents();
		this.setupProfileImageEvents();
		this.setupNameVisibilityToggle();
		this.setupDropdownEvents();
		this.setupAddButtonEvents();
		this.setupSaveLoadEvents();
		this.setupNationalityDropdownEvents();
		this.setupDynamicCardEvents();
		this.setupInjuryEvents();
		this.setupWeaponImageEvents();
	}

	setupTabEvents() {
		document.querySelectorAll(".tab-btn").forEach((button) => {
			button.addEventListener("click", () => {
				document
					.querySelectorAll(".tab-btn")
					.forEach((btn) => btn.classList.remove("active"));
				button.classList.add("active");
				document
					.querySelectorAll(".tab-content")
					.forEach((content) => content.classList.remove("active"));
				document.getElementById(button.dataset.tab).classList.add("active");
			});
		});
	}

	setupInputEvents() {
		// Update sheet on any input change
		document.querySelector(".max-w-7xl").addEventListener("input", () => {
			// Trigger sheet update
			document.dispatchEvent(new CustomEvent("updateSheet"));
		});

		// Listen for totals updates
		document.addEventListener("updateTotals", () => {
			if (this.dataManager) {
				this.dataManager.updateTotals();
			}
		});

		// Listen for sheet updates
		document.addEventListener("updateSheet", () => {
			if (this.dataManager) {
				const level =
					parseInt(document.getElementById("char-level").value) || 1;
				const profBonus = Math.floor((level - 1) / 4) + 2;
				const modifiers = this.dataManager.updateAttributes();
				this.chartManager.updateAttributeChart();
				this.dataManager.updateSavingThrows(profBonus);
				this.dataManager.updateCombatStats(modifiers);
				this.uiManager.updateRacialFeaturesAndSkills(modifiers, profBonus);
				this.dataManager.updateTotals();
			}
		});
	}

	setupImageAndThemeEvents() {
		document
			.getElementById("char-image-upload")
			.addEventListener("change", this.handleImageUpload.bind(this));

		document
			.getElementById("apply-background-btn")
			.addEventListener("click", this.applyCustomBackground.bind(this));

		document
			.getElementById("theme-selector")
			.addEventListener("change", (e) => this.applyTheme(e.target.value));
	}

	setupProfileImageEvents() {
		// Click on profile container triggers file upload
		document
			.getElementById("char-portrait-container")
			.addEventListener("click", () => {
				document.getElementById("char-portrait-upload").click();
			});

		// Handle profile image upload
		document
			.getElementById("char-portrait-upload")
			.addEventListener("change", this.handleProfileImageUpload.bind(this));
	}

	setupNameVisibilityToggle() {
		document
			.getElementById("toggle-name-visibility")
			.addEventListener("click", () => {
				const nameInput = document.getElementById("char-name");
				const eyeOpen = document.getElementById("eye-open");
				const eyeClosed = document.getElementById("eye-closed");
				if (nameInput.type === "password") {
					nameInput.type = "text";
					eyeOpen.classList.remove("hidden");
					eyeClosed.classList.add("hidden");
				} else {
					nameInput.type = "password";
					eyeOpen.classList.add("hidden");
					eyeClosed.classList.remove("hidden");
				}
			});
	}

	setupDropdownEvents() {
		// Race change event
		document.getElementById("char-race").addEventListener("change", (e) => {
			document
				.getElementById("mutant-subtype-wrapper")
				.classList.toggle("hidden", e.target.value !== "Mutante");
			const selectedRaceData = this.getRacialFeatures()[e.target.value];
			if (selectedRaceData) {
				document.getElementById("char-speed").value = selectedRaceData.speed;
			}
			document.dispatchEvent(new CustomEvent("updateSheet"));
		});

		// Class change event
		document.getElementById("char-class").addEventListener("change", (e) => {
			this.uiManager.updateSpecializationDropdown();
			document.dispatchEvent(new CustomEvent("updateSheet"));
		});
	}

	setupAddButtonEvents() {
		document
			.getElementById("add-weapon-btn")
			.addEventListener("click", () => this.uiManager.addWeapon());

		document
			.getElementById("add-equipment-btn")
			.addEventListener("click", () => this.uiManager.addEquipment());

		document
			.getElementById("add-title-btn")
			.addEventListener("click", () =>
				this.uiManager.addGenericItem("titles-list", "Título"),
			);

		document
			.getElementById("add-talent-btn")
			.addEventListener("click", () =>
				this.uiManager.addGenericItem("talents-list", "Talento"),
			);

		document
			.getElementById("add-trait-btn")
			.addEventListener("click", () =>
				this.uiManager.addGenericItem("traits-list", "Habilidade Única", true),
			);
	}

	setupSaveLoadEvents() {
		document
			.getElementById("save-btn")
			.addEventListener("click", this.saveCharacterToCache.bind(this));

		document
			.getElementById("load-btn")
			.addEventListener("click", this.loadCharacterFromCache.bind(this));

		document
			.getElementById("clear-btn")
			.addEventListener("click", this.clearCharacter.bind(this));

		document
			.getElementById("download-btn")
			.addEventListener("click", this.downloadCharacterFile.bind(this));

		document
			.getElementById("upload-file")
			.addEventListener("change", this.uploadCharacterFile.bind(this));
	}

	setupNationalityDropdownEvents() {
		const nationalityButton = document.getElementById(
			"char-nationality-button",
		);
		const nationalityOptions = document.getElementById(
			"char-nationality-options",
		);

		nationalityButton.addEventListener("click", () => {
			nationalityOptions.classList.toggle("hidden");
			// Focus on search input when dropdown opens
			const searchInput = document.getElementById("char-nationality-search");
			if (searchInput && !nationalityOptions.classList.contains("hidden")) {
				setTimeout(() => searchInput.focus(), 100);
			}
		});

		nationalityOptions.addEventListener("click", (e) => {
			const option = e.target.closest(".custom-select-option");
			if (option) {
				const value = option.dataset.value;
				document.getElementById("char-nationality").value = value;
				const buttonContent = nationalityButton.querySelector("span");
				const flagUrl = this.getFlagUrl(value);
				buttonContent.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${this.getCountryName(value)}"> <span>${this.getCountryName(value)}</span>`;
				nationalityOptions.classList.add("hidden");
			}
		});

		// Prevent dropdown from closing when clicking on search input
		const searchInput = document.getElementById("char-nationality-search");
		if (searchInput) {
			searchInput.addEventListener("click", (e) => {
				e.stopPropagation();
			});
		}

		window.addEventListener("click", (e) => {
			if (
				!document
					.getElementById("nationality-select-container")
					.contains(e.target)
			) {
				nationalityOptions.classList.add("hidden");
			}
		});
	}

	setupDynamicCardEvents() {
		// Event delegation for dynamic cards
		document.body.addEventListener("click", (e) => {
			this.uiManager.handleCardActions(e);
		});
	}

	setupInjuryEvents() {
		// Add listener for injury clicks
		document
			.getElementById("critical-injury-svg")
			.addEventListener("click", (e) => this.uiManager.handleInjuryClick(e));
	}

	setupWeaponImageEvents() {
		document.getElementById("weapons-list").addEventListener("change", (e) => {
			if (e.target && e.target.matches(".weapon-image-upload")) {
				this.handleWeaponImageUpload(e);
			}
		});
	}

	// Event handlers
	handleImageUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const portraitImg = document.getElementById("char-portrait");
			const placeholderIcon = document.getElementById("portrait-placeholder");

			portraitImg.src = e.target.result;
			portraitImg.classList.remove("hidden");
			if (placeholderIcon) placeholderIcon.classList.add("hidden");
		};
		reader.readAsDataURL(file);
	}

	handleProfileImageUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const portraitImg = document.getElementById("char-portrait");
			const placeholderIcon = document.getElementById("portrait-placeholder");

			portraitImg.src = e.target.result;
			portraitImg.classList.remove("hidden");
			if (placeholderIcon) placeholderIcon.classList.add("hidden");
		};
		reader.readAsDataURL(file);
	}

	handleWeaponImageUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		const container = event.target.closest(".weapon-image-container");
		const imgElement = container.querySelector(".weapon-image");
		const placeholderIcon = container.querySelector("svg");

		reader.onload = (e) => {
			const dataUrl = e.target.result;
			imgElement.src = dataUrl;
			imgElement.classList.remove("hidden");
			if (placeholderIcon) placeholderIcon.classList.add("hidden");
			container.closest(".dynamic-card").dataset.imageSrc = dataUrl;
		};
		reader.readAsDataURL(file);
	}

	applyCustomBackground() {
		const urlInput = document.getElementById("background-url-input");
		const url = urlInput.value;
		if (!url) return;

		const img = new Image();
		img.crossOrigin = "Anonymous";

		// Proxy to avoid CORS issues if possible
		img.src = "https://corsproxy.io/?" + encodeURIComponent(url);

		img.onload = () => {
			document.documentElement.style.setProperty("--bg-url", `url('${url}')`);

			const colorThief = new ColorThief();
			try {
				const dominantColor = colorThief.getColor(img);
				const luminance =
					(0.299 * dominantColor[0] +
						0.587 * dominantColor[1] +
						0.114 * dominantColor[2]) /
					255;
				const theme = luminance > 0.5 ? "light" : "dark";
				this.applyTheme(theme);
				document.getElementById("theme-selector").value = theme;
			} catch (e) {
				console.error(
					"Error getting color from image. Using default theme.",
					e,
				);
				this.applyTheme("dark"); // Fallback to dark theme
				document.getElementById("theme-selector").value = "dark";
			}
		};
		img.onerror = () => {
			// If proxy fails, try direct link and hope for the best
			document.documentElement.style.setProperty("--bg-url", `url('${url}')`);
			console.warn(
				"Could not analyze image color due to CORS policy. Theme will not auto-update.",
			);
		};
	}

	applyTheme(theme) {
		if (this.uiManager) {
			this.uiManager.applyTheme(theme);
		}
	}

	// Data persistence methods
	saveCharacterToCache() {
		if (!this.dataManager) return;

		const data = this.dataManager.getCharacterDataAsObject();
		localStorage.setItem("projeto141Character", JSON.stringify(data));
		alert("Personagem salvo no cache do navegador!");
	}

	loadCharacterFromCache() {
		if (!this.dataManager) {
			console.error("DataManager not available");
			alert("Erro: DataManager não está disponível");
			return;
		}

		const dataString = localStorage.getItem("projeto141Character");
		if (!dataString) {
			alert("Nenhum personagem salvo no cache encontrado.");
			return;
		}

		try {
			console.log("Loading character from cache...");
			const data = JSON.parse(dataString);
			console.log("Parsed cache data:", data);

			this.dataManager.loadCharacterFromData(data);
			alert("Personagem carregado do cache!");
		} catch (error) {
			console.error("Error loading from cache:", error);
			alert("Erro ao carregar do cache: " + error.message);
		}
	}

	downloadCharacterFile() {
		if (!this.dataManager) {
			console.error("DataManager not available");
			alert("Erro: DataManager não está disponível");
			return;
		}

		const data = this.dataManager.getCharacterDataAsObject();
		console.log("Saving character data:", data);

		const dataStr = JSON.stringify(data, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		const charName =
			document.getElementById("char-codename").value || "personagem";
		a.href = url;
		a.download = `${charName.replace(/\s+/g, "_")}-projeto141.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		console.log("Character file downloaded successfully");
	}

	uploadCharacterFile(event) {
		if (!this.dataManager) {
			console.error("DataManager not available");
			alert("Erro: DataManager não está disponível");
			return;
		}

		const file = event.target.files[0];
		if (!file) {
			console.log("No file selected");
			return;
		}

		console.log("Loading character file:", file.name, file.size, "bytes");

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				console.log("File read successfully, parsing JSON...");
				const data = JSON.parse(e.target.result);
				console.log("Parsed character data:", data);

				this.dataManager.loadCharacterFromData(data);
				alert("Personagem carregado do arquivo!");
			} catch (error) {
				console.error("Error parsing character file:", error);
				alert(
					"Erro ao carregar o arquivo. Verifique se o arquivo é válido.\n\nDetalhes: " +
						error.message,
				);
			}
		};

		reader.onerror = (error) => {
			console.error("Error reading file:", error);
			alert("Erro ao ler o arquivo. Tente novamente.");
		};

		reader.readAsText(file);
		event.target.value = ""; // Reset input for re-uploading same file
	}

	clearCharacter() {
		if (
			confirm(
				"Tem certeza que deseja limpar toda a ficha? Esta ação não pode ser desfeita.",
			)
		) {
			localStorage.removeItem("projeto141Character");
			window.location.reload();
		}
	}

	// Utility methods
	getFlagUrl(code) {
		return code === "OTHER"
			? "https://placehold.co/20x15/374151/d1d5db?text=?"
			: `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
	}

	getCountryName(code) {
		return COUNTRIES[code] || "País";
	}

	getRacialFeatures() {
		return RACIAL_FEATURES || {};
	}
}
