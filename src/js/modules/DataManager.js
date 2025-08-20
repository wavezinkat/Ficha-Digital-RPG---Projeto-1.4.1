// DataManager handles all data operations, calculations, and persistence
import { ATTRIBUTES, CLASSES, COLETES, SKILLS } from "../models/index.js";

export class DataManager {
	constructor() {
		this.attributeChart = null;
	}

	getModifier(score) {
		return Math.floor((score - 10) / 2);
	}

	updateAttributes() {
		const modifiers = {};
		for (const key in ATTRIBUTES) {
			const scoreInput = document.getElementById(`score-${key.toLowerCase()}`);
			const score = parseInt(scoreInput.value) || 10;
			const mod = this.getModifier(score);
			modifiers[key] = mod;
			document.getElementById(`mod-${key.toLowerCase()}`).textContent =
				mod >= 0 ? `+${mod}` : mod;
		}
		return modifiers;
	}

	updateSavingThrows(profBonus) {
		const selectedClassName = document.getElementById("char-class").value;
		const selectedClass = CLASSES[selectedClassName];

		// Reset all saving throw checkboxes
		document.querySelectorAll('[id^="prof-save-"]').forEach((cb) => {
			if (!cb.dataset.manual) {
				cb.checked = false;
				cb.disabled = true;
			} else {
				cb.disabled = false;
			}
		});

		// Set class-specific saving throws
		if (selectedClass) {
			selectedClass.saves.forEach((save) => {
				document.getElementById(`prof-save-${save.toLowerCase()}`).checked =
					true;
			});

			if (selectedClass.choice) {
				selectedClass.choice.forEach((choice) => {
					const checkbox = document.getElementById(
						`prof-save-${choice.toLowerCase()}`,
					);
					checkbox.disabled = false;
					checkbox.dataset.manual = true;
				});
			} else {
				Object.keys(ATTRIBUTES).forEach((key) => {
					const checkbox = document.getElementById(
						`prof-save-${key.toLowerCase()}`,
					);
					if (checkbox.dataset.manual) {
						delete checkbox.dataset.manual;
						checkbox.checked = false;
					}
				});
			}
		}

		// Calculate and display saving throw bonuses
		const modifiers = this.updateAttributes();
		for (const key in ATTRIBUTES) {
			const isProficient = document.getElementById(
				`prof-save-${key.toLowerCase()}`,
			).checked;
			const bonus = modifiers[key] + (isProficient ? profBonus : 0);
			document.getElementById(`bonus-save-${key.toLowerCase()}`).textContent =
				bonus >= 0 ? `+${bonus}` : bonus;
		}
	}

	updateCombatStats(modifiers) {
		const selectedColeteName = document.getElementById("char-colete").value;
		const selectedColete = COLETES[selectedColeteName];

		// Calculate AC
		let dexForAC = modifiers.DEX;
		if (selectedColete.maxDex !== null && dexForAC > selectedColete.maxDex) {
			dexForAC = selectedColete.maxDex;
		}

		const coleteAC = selectedColete.addDex
			? selectedColete.ac + dexForAC
			: selectedColete.ac;
		const shieldBonus =
			parseInt(document.getElementById("ac-bonus-shield").value) || 0;
		const otherAcBonus =
			parseInt(document.getElementById("ac-bonus-other").value) || 0;
		document.getElementById("char-ac").textContent =
			coleteAC + shieldBonus + otherAcBonus;

		// Update armor dropdown based on current strength
		if (this.uiManager) {
			this.uiManager.updateColeteDropdown();
		}

		// Handle Stealth Disadvantage
		const stealthIndicator = document.getElementById(
			"stealth-disadvantage-indicator",
		);
		if (selectedColete.stealthDisadvantage) {
			stealthIndicator.classList.remove("hidden");
		} else {
			stealthIndicator.classList.add("hidden");
		}

		// Update Ammo
		document.getElementById("ammo-primary").textContent =
			selectedColete.primaryAmmo;
		document.getElementById("ammo-secondary").textContent =
			selectedColete.secondaryAmmo;

		// Update Initiative
		const otherInitBonus =
			parseInt(document.getElementById("init-bonus-other").value) || 0;
		const totalInitiative = modifiers.DEX + otherInitBonus;
		document.getElementById("char-initiative").textContent =
			totalInitiative >= 0 ? `+${totalInitiative}` : totalInitiative;

		// Update Hit Dice
		const selectedClassName = document.getElementById("char-class").value;
		const selectedClass = CLASSES[selectedClassName];
		if (selectedClass) {
			const level = parseInt(document.getElementById("char-level").value) || 1;
			document.getElementById("char-hit-dice").value =
				`${level}d${selectedClass.hitDice}`;
		}

		// Update P.E.
		const level = parseInt(document.getElementById("char-level").value) || 1;
		const peBase = 4 + Math.floor((level - 1) / 3) + (level >= 12 ? 1 : 0);
		const peStr = modifiers.FOR > 0 ? modifiers.FOR : 0;
		const peBonus = parseInt(document.getElementById("pe-bonus").value) || 0;
		document.getElementById("pe-base").textContent = peBase;
		document.getElementById("pe-str").textContent = peStr;
		document.getElementById("pe-max").textContent = peBase + peStr + peBonus;

		// Update Carga
		document.getElementById("carga-max").textContent = 8 + modifiers.FOR * 2;
	}

	updateTotals() {
		let currentPE = 0;
		document.querySelectorAll(".weapon-pe-view").forEach((el) => {
			currentPE += parseFloat(el.textContent) || 0;
		});
		document.querySelectorAll(".equipment-pe-view").forEach((el) => {
			currentPE += parseFloat(el.textContent) || 0;
		});
		document.getElementById("pe-current").textContent = currentPE;

		let currentCarga = 0;
		document.querySelectorAll('.dynamic-card[id^="equip-"]').forEach((card) => {
			if (card.classList.contains("view-state")) {
				const qty = parseFloat(card.dataset.qty) || 1;
				const carga = parseFloat(card.dataset.carga) || 0;
				currentCarga += qty * carga;
			}
		});
		document.getElementById("carga-current").textContent = currentCarga;
	}

	// Data persistence methods
	getCharacterDataAsObject() {
		// First, ensure any cards in edit mode are saved to their dataset
		document
			.querySelectorAll(".dynamic-card:not(.view-state) .save-card-btn")
			.forEach((btn) => btn.click());

		const data = {
			inputs: {},
			checkboxes: {},
			textareas: {},
			selects: {},
			nationality: document.getElementById("char-nationality").value,
			portraitSrc: document.getElementById("char-portrait").src,
			backgroundUrl: document.getElementById("background-url-input").value,
			theme: document.body.classList.contains("light-theme") ? "light" : "dark",
			criticalInjuries: [],
			dynamic: {
				weapons: [],
				equipment: [],
				titles: [],
				talents: [],
				traits: [],
			},
		};

		// Collect all input data
		document
			.querySelectorAll(
				'input[type="text"]:not(#char-name), input[type="number"]',
			)
			.forEach((el) => {
				if (!el.disabled) data.inputs[el.id] = el.value;
			});

		data.inputs["char-name"] = document.getElementById("char-name").value;

		document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
			if (el.dataset.manual || !el.disabled) {
				data.checkboxes[el.id] = el.checked;
			}
		});

		document
			.querySelectorAll("textarea")
			.forEach((el) => (data.textareas[el.id] = el.value));

		document
			.querySelectorAll("select")
			.forEach((el) => (data.selects[el.id] = el.value));

		// Collect dynamic card data
		this.collectDynamicCardData(data);

		// Collect critical injuries
		document
			.querySelectorAll("#critical-injury-svg .body-part.injured")
			.forEach((part) => {
				data.criticalInjuries.push(part.id);
			});

		return data;
	}

	collectDynamicCardData(data) {
		// Weapons
		document.querySelectorAll("#weapons-list > div").forEach((card) => {
			data.dynamic.weapons.push({
				name: card.dataset.name || "",
				damage: card.dataset.damage || "",
				range: card.dataset.range || "",
				swap: card.dataset.swap || "",
				pe: card.dataset.pe || "",
				penteAtual: card.dataset.penteAtual || "",
				penteMax: card.dataset.penteMax || "",
				desc: card.dataset.desc || "",
				imageSrc: card.dataset.imageSrc || "",
			});
		});

		// Equipment
		document.querySelectorAll("#equipment-list > div").forEach((card) => {
			data.dynamic.equipment.push({
				name: card.dataset.name || "",
				qty: card.dataset.qty || "1",
				carga: card.dataset.carga || "",
				pe: card.dataset.pe || "",
				desc: card.dataset.desc || "",
			});
		});

		// Generic items (titles, talents, traits)
		document
			.querySelectorAll(
				"#titles-list > div, #talents-list > div, #traits-list > div",
			)
			.forEach((card) => {
				const item = {
					name: card.dataset.name || "",
					desc: card.dataset.desc || "",
					usosAtuais: card.dataset.usosAtuais,
					usosMax: card.dataset.usosMax,
				};
				if (card.parentElement.id === "titles-list")
					data.dynamic.titles.push(item);
				else if (card.parentElement.id === "talents-list")
					data.dynamic.talents.push(item);
				else if (card.parentElement.id === "traits-list")
					data.dynamic.traits.push(item);
			});
	}

	loadCharacterFromData(data) {
		try {
			console.log("Loading character data:", data);

			// Validate data structure
			if (!this.validateCharacterData(data)) {
				throw new Error("Estrutura de dados do personagem inválida");
			}

			// Clear existing data
			this.clearExistingData();

			// Load form data
			this.loadFormData(data);

			// Load dynamic data
			this.loadDynamicData(data);

			// Load critical injuries
			this.loadCriticalInjuries(data);

			// Update UI
			const raceSelect = document.getElementById("char-race");
			if (raceSelect) {
				raceSelect.dispatchEvent(new Event("change"));
			}

			if (this.uiManager && this.uiManager.updateSpecializationDropdown) {
				this.uiManager.updateSpecializationDropdown();
			}

			if (data.selects && data.selects["char-specialization"]) {
				const specSelect = document.getElementById("char-specialization");
				if (specSelect) {
					specSelect.value = data.selects["char-specialization"];
				}
			}

			// Trigger sheet update through event system
			document.dispatchEvent(new CustomEvent("updateSheet"));

			if (this.uiManager && this.uiManager.updateInjuryStatus) {
				this.uiManager.updateInjuryStatus();
			}

			console.log("Character data loaded successfully");
		} catch (error) {
			console.error("Error loading character data:", error);
			alert("Erro ao carregar o personagem: " + error.message);
		}
	}

	validateCharacterData(data) {
		// Basic validation - check if data has the expected structure
		if (!data || typeof data !== "object") {
			console.error("Data is not an object:", data);
			return false;
		}

		// Check for required top-level properties
		const requiredProps = [
			"inputs",
			"checkboxes",
			"textareas",
			"selects",
			"dynamic",
		];
		for (const prop of requiredProps) {
			if (!(prop in data)) {
				console.error(`Missing required property: ${prop}`);
				return false;
			}
		}

		// Check if dynamic property has the expected structure
		if (!data.dynamic || typeof data.dynamic !== "object") {
			console.error("Dynamic property is not an object:", data.dynamic);
			return false;
		}

		const requiredDynamicProps = [
			"weapons",
			"equipment",
			"titles",
			"talents",
			"traits",
		];
		for (const prop of requiredDynamicProps) {
			if (!(prop in data.dynamic)) {
				console.error(`Missing required dynamic property: ${prop}`);
				return false;
			}
			if (!Array.isArray(data.dynamic[prop])) {
				console.error(
					`Dynamic property ${prop} is not an array:`,
					data.dynamic[prop],
				);
				return false;
			}
		}

		console.log("Character data validation passed");
		return true;
	}

	clearExistingData() {
		document.getElementById("weapons-list").innerHTML = "";
		document.getElementById("equipment-list").innerHTML = "";
		document.getElementById("titles-list").innerHTML = "";
		document.getElementById("talents-list").innerHTML = "";
		document.getElementById("traits-list").innerHTML = "";

		document
			.querySelectorAll("#critical-injury-svg .body-part")
			.forEach((part) => {
				part.classList.remove("injured");
			});
	}

	loadFormData(data) {
		for (const id in data.inputs)
			if (document.getElementById(id))
				document.getElementById(id).value = data.inputs[id];
		for (const id in data.checkboxes)
			if (document.getElementById(id))
				document.getElementById(id).checked = data.checkboxes[id];
		for (const id in data.textareas)
			if (document.getElementById(id))
				document.getElementById(id).value = data.textareas[id];
		for (const id in data.selects)
			if (document.getElementById(id))
				document.getElementById(id).value = data.selects[id];

		// Handle nationality
		if (data.nationality) {
			const nationalityInput = document.getElementById("char-nationality");
			if (nationalityInput) {
				nationalityInput.value = data.nationality;
				// Update the nationality button display
				this.updateNationalityDisplay(data.nationality);
			}
		}

		// Handle portrait
		if (data.portraitSrc && data.portraitSrc.startsWith("data:image")) {
			const portraitImg = document.getElementById("char-portrait");
			const placeholderIcon = document.getElementById("portrait-placeholder");
			if (portraitImg && placeholderIcon) {
				portraitImg.src = data.portraitSrc;
				portraitImg.classList.remove("hidden");
				placeholderIcon.classList.add("hidden");
			}
		}

		// Handle background
		if (data.backgroundUrl) {
			document.getElementById("background-url-input").value =
				data.backgroundUrl;
			// Apply the background
			document.documentElement.style.setProperty(
				"--bg-url",
				`url('${data.backgroundUrl}')`,
			);
		}

		// Handle theme
		if (data.theme) {
			document.body.classList.toggle("light-theme", data.theme === "light");
			document.getElementById("theme-selector").value = data.theme;
		}
	}

	loadDynamicData(data) {
		// Load weapons
		if (
			data.dynamic &&
			data.dynamic.weapons &&
			Array.isArray(data.dynamic.weapons)
		) {
			data.dynamic.weapons.forEach((w) => {
				this.uiManager.addWeapon();
				const card = document.querySelector("#weapons-list > div:last-child");
				if (card) {
					Object.assign(card.dataset, w);
					this.uiManager.updateCardView(card);
					card.classList.add("view-state");
				}
			});
		}

		// Load equipment
		if (
			data.dynamic &&
			data.dynamic.equipment &&
			Array.isArray(data.dynamic.equipment)
		) {
			data.dynamic.equipment.forEach((e) => {
				this.uiManager.addEquipment();
				const card = document.querySelector("#equipment-list > div:last-child");
				if (card) {
					Object.assign(card.dataset, e);
					this.uiManager.updateCardView(card);
					card.classList.add("view-state");
				}
			});
		}

		// Load titles
		if (
			data.dynamic &&
			data.dynamic.titles &&
			Array.isArray(data.dynamic.titles)
		) {
			data.dynamic.titles.forEach((t) => {
				this.uiManager.addGenericItem("titles-list", "Título");
				const card = document.querySelector("#titles-list > div:last-child");
				if (card) {
					Object.assign(card.dataset, t);
					this.uiManager.updateCardView(card);
					card.classList.add("view-state");
				}
			});
		}

		// Load talents
		if (
			data.dynamic &&
			data.dynamic.talents &&
			Array.isArray(data.dynamic.talents)
		) {
			data.dynamic.talents.forEach((t) => {
				this.uiManager.addGenericItem("talents-list", "Talento");
				const card = document.querySelector("#talents-list > div:last-child");
				if (card) {
					Object.assign(card.dataset, t);
					this.uiManager.updateCardView(card);
					card.classList.add("view-state");
				}
			});
		}

		// Load traits
		if (
			data.dynamic &&
			data.dynamic.traits &&
			Array.isArray(data.dynamic.traits)
		) {
			data.dynamic.traits.forEach((t) => {
				this.uiManager.addGenericItem(
					"traits-list",
					"Habilidade Única",
					!!t.usosMax,
				);
				const card = document.querySelector("#traits-list > div:last-child");
				if (card) {
					Object.assign(card.dataset, t);
					this.uiManager.updateCardView(card);
					card.classList.add("view-state");
				}
			});
		}
	}

	loadCriticalInjuries(data) {
		if (data.criticalInjuries && Array.isArray(data.criticalInjuries)) {
			data.criticalInjuries.forEach((partId) => {
				const partElement = document.getElementById(partId);
				if (partElement) {
					partElement.classList.add("injured");
				}
			});
		}
	}

	updateNationalityDisplay(nationalityCode) {
		const nationalityButton = document.getElementById(
			"char-nationality-button",
		);
		if (nationalityButton) {
			const buttonContent = nationalityButton.querySelector("span");
			const flagUrl = this.getFlagUrl(nationalityCode);
			const countryName = this.getCountryName(nationalityCode);
			buttonContent.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${countryName}"> <span>${countryName}</span>`;
		}
	}

	getFlagUrl(code) {
		if (code === "OTHER") {
			return "https://placehold.co/20x15/374151/d1d5db?text=?";
		} else if (code === "GB-SCT") {
			// Scotland flag - using a placeholder since flagcdn doesn't support subdivisions
			return "https://placehold.co/20x15/0065BD/ffffff?text=🏴󠁧󠁢󠁳󠁣󠁴󠁿";
		} else {
			return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
		}
	}

	getCountryName(code) {
		// Import COUNTRIES here since it's not available in DataManager
		const COUNTRIES = {
			US: "Estados Unidos",
			BR: "Brasil",
			GB: "Reino Unido",
			"GB-SCT": "Escócia",
			FR: "França",
			DE: "Alemanha",
			IT: "Itália",
			ES: "Espanha",
			PT: "Portugal",
			RU: "Rússia",
			CN: "China",
			JP: "Japão",
			KR: "Coreia do Sul",
			IN: "Índia",
			AU: "Austrália",
			CA: "Canadá",
			MX: "México",
			AR: "Argentina",
			CL: "Chile",
			CO: "Colômbia",
			PE: "Peru",
			VE: "Venezuela",
			OTHER: "Outro",
		};
		return COUNTRIES[code] || "País";
	}
}
