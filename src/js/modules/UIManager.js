// UIManager handles all UI rendering, updates, and DOM manipulation
import {
	ATTRIBUTES,
	CLASSES,
	RACIAL_FEATURES,
	MUTANT_SUBTYPE_FEATURES,
	COLETES,
	COUNTRIES,
	SPECIALIZATIONS,
	SKILLS,
	INJURY_DESCRIPTIONS,
} from "../models/index.js";

export class UIManager {
	constructor() {
		// Bind methods to maintain context
		this.handleInjuryClick = this.handleInjuryClick.bind(this);
		this.handleCardActions = this.handleCardActions.bind(this);
	}

	populateDropdowns() {
		this.populateClassDropdown();
		this.populateRaceDropdown();
		this.populateMutantDropdown();
		this.populateColeteDropdown();
		this.createNationalityDropdown();
	}

	populateClassDropdown() {
		const classSelect = document.getElementById("char-class");
		Object.keys(CLASSES).forEach((c) => {
			const option = document.createElement("option");
			option.value = c;
			option.textContent = c;
			classSelect.appendChild(option);
		});
	}

	populateRaceDropdown() {
		const raceSelect = document.getElementById("char-race");
		Object.keys(RACIAL_FEATURES).forEach((r) => {
			const option = document.createElement("option");
			option.value = r;
			option.textContent = r;
			raceSelect.appendChild(option);
		});
	}

	populateMutantDropdown() {
		const mutantSelect = document.getElementById("char-mutant-subtype");
		Object.keys(MUTANT_SUBTYPE_FEATURES).forEach((m) => {
			const option = document.createElement("option");
			option.value = m;
			option.textContent = m;
			mutantSelect.appendChild(option);
		});
	}

	populateColeteDropdown() {
		const coleteSelect = document.getElementById("char-colete");
		Object.keys(COLETES).forEach((c) => {
			const option = document.createElement("option");
			option.value = c;
			option.textContent = c;
			coleteSelect.appendChild(option);
		});
	}

	createNationalityDropdown() {
		const nationalityContainer = document.getElementById(
			"nationality-select-container",
		);
		const dropdownId = "char-nationality";
		const buttonHTML = `
            <button type="button" id="${dropdownId}-button" class="form-input custom-select-button">
                <span class="flex items-center">
                    <img src="https://flagcdn.com/w20/us.png" alt="Bandeira">
                    <span>Estados Unidos</span>
                </span>
                <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </button>`;
		const optionsHTML = `<div id="${dropdownId}-options" class="custom-select-options hidden"></div>`;
		nationalityContainer.innerHTML =
			`<input type="hidden" id="${dropdownId}" value="US">` +
			buttonHTML +
			optionsHTML;

		const optionsContainer = document.getElementById(`${dropdownId}-options`);
		for (const code in COUNTRIES) {
			const optionDiv = document.createElement("div");
			optionDiv.classList.add("custom-select-option");
			optionDiv.dataset.value = code;
			const flagUrl =
				code === "OTHER"
					? "https://placehold.co/20x15/374151/d1d5db?text=?"
					: `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
			optionDiv.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${COUNTRIES[code]}"> <span>${COUNTRIES[code]}</span>`;
			optionsContainer.appendChild(optionDiv);
		}
	}

	updateSpecializationDropdown() {
		const classSelect = document.getElementById("char-class");
		const specWrapper = document.getElementById("specialization-wrapper");
		const specSelect = document.getElementById("char-specialization");
		const selectedClass = classSelect.value;

		const classSpecs = SPECIALIZATIONS[selectedClass];

		if (classSpecs && Object.keys(classSpecs).length > 0) {
			specWrapper.classList.remove("hidden");
			specSelect.innerHTML = ""; // Clear existing options
			Object.keys(classSpecs).forEach((specName) => {
				const option = document.createElement("option");
				option.value = specName;
				option.textContent = specName;
				specSelect.appendChild(option);
			});
		} else {
			specWrapper.classList.add("hidden");
		}
	}

	renderAttributes() {
		const container = document.getElementById("attributes");
		container.innerHTML = "";
		for (const key in ATTRIBUTES) {
			const attrHTML = `
                <div class="attribute-box">
                    <label class="font-semibold text-white">${ATTRIBUTES[key]}</label>
                    <div id="mod-${key.toLowerCase()}" class="attribute-mod">+0</div>
                    <input type="number" id="score-${key.toLowerCase()}" class="form-input attribute-score" value="10">
                </div>
            `;
			container.innerHTML += attrHTML;
		}
	}

	renderSavingThrows() {
		const container = document.getElementById("saving-throws");
		container.innerHTML = "";
		for (const key in ATTRIBUTES) {
			const stHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input type="checkbox" id="prof-save-${key.toLowerCase()}" class="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500">
                        <label class="ml-2">${ATTRIBUTES[key]}</label>
                    </div>
                    <span id="bonus-save-${key.toLowerCase()}" class="font-bold">+0</span>
                </div>
            `;
			container.innerHTML += stHTML;
		}
	}

	renderSkills() {
		const container = document.getElementById("skills");
		container.innerHTML = "";
		const sortedSkills = Object.keys(SKILLS).sort();
		for (const skill of sortedSkills) {
			const attr = SKILLS[skill];
			let disadvantageIndicatorHTML = "";
			if (skill === "Furtividade") {
				disadvantageIndicatorHTML = `<span id="stealth-disadvantage-indicator" class="text-red-400 text-xs ml-2 font-bold hidden">(Desv.)</span>`;
			}
			const skillHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input type="checkbox" id="prof-skill-${skill.replace(/\s+/g, "")}" class="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500">
                    <label class="ml-2">${skill} <span class="text-xs text-gray-500">(${attr})</span></label>
                    ${disadvantageIndicatorHTML}  </div>
                <span id="bonus-skill-${skill.replace(/\s+/g, "")}" class="font-bold">+0</span>
            </div>
        `;
			container.innerHTML += skillHTML;
		}
	}

	renderExhaustion() {
		const container = document.getElementById("exhaustion-levels");
		const levels = [
			"Desvantagem em testes de habilidade",
			"Velocidade reduzida pela metade",
			"Desvantagem em rolagens de ataque e testes de resistência",
			"Pontos de vida máximo reduzidos pela metade",
			"Velocidade reduzida a 0",
			"Morte",
		];
		container.innerHTML = levels
			.map(
				(desc, i) => `
            <div class="flex items-center text-sm">
                <input type="checkbox" id="exhaustion-level-${i + 1}" class="death-save mr-2">
                <label for="exhaustion-level-${i + 1}">Nível ${i + 1}: ${desc}</label>
            </div>
        `,
			)
			.join("");
	}

	updateRacialFeaturesAndSkills(modifiers, profBonus) {
		const featuresList = document.getElementById("features-list");
		featuresList.innerHTML = "";
		const selectedRaceName = document.getElementById("char-race").value;
		const selectedRaceData = RACIAL_FEATURES[selectedRaceName];

		// Clear old racial profs
		document.querySelectorAll('[data-racial-prof="true"]').forEach((el) => {
			el.checked = false;
			el.disabled = false;
			el.removeAttribute("data-racial-prof");
		});

		if (selectedRaceData) {
			selectedRaceData.features.forEach((feature) => {
				featuresList.innerHTML += `<div class="text-sm"><p class="font-semibold text-blue-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
			});
			selectedRaceData.auto_skills.forEach((skill) => {
				const skillCheckbox = document.getElementById(
					`prof-skill-${skill.replace(/\s+/g, "")}`,
				);
				if (skillCheckbox) {
					skillCheckbox.checked = true;
					skillCheckbox.disabled = true;
					skillCheckbox.dataset.racialProf = "true";
				}
			});

			if (selectedRaceName === "Mutante") {
				const selectedSubtypeName = document.getElementById(
					"char-mutant-subtype",
				).value;
				const selectedSubtypeData =
					MUTANT_SUBTYPE_FEATURES[selectedSubtypeName];
				if (selectedSubtypeData) {
					featuresList.innerHTML = "";
					selectedSubtypeData.features.forEach((feature) => {
						featuresList.innerHTML += `<div class="text-sm mt-2"><p class="font-semibold text-purple-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
					});
					selectedSubtypeData.auto_skills.forEach((skill) => {
						const skillCheckbox = document.getElementById(
							`prof-skill-${skill.replace(/\s+/g, "")}`,
						);
						if (skillCheckbox) {
							skillCheckbox.checked = true;
							skillCheckbox.disabled = true;
							skillCheckbox.dataset.racialProf = "true";
						}
					});
				}
			}
		}

		const selectedClassName = document.getElementById("char-class").value;
		const classSpecs = SPECIALIZATIONS[selectedClassName];
		if (classSpecs) {
			const selectedSpecName = document.getElementById(
				"char-specialization",
			).value;
			const selectedSpecData = classSpecs[selectedSpecName];
			if (selectedSpecData) {
				featuresList.innerHTML += '<hr class="border-gray-600 my-3">';
				selectedSpecData.forEach((feature) => {
					featuresList.innerHTML += `<div class="text-sm"><p class="font-semibold text-green-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
				});
			}
		}

		for (const skill in SKILLS) {
			const attr = SKILLS[skill];
			const isProficient = document.getElementById(
				`prof-skill-${skill.replace(/\s+/g, "")}`,
			).checked;
			const bonus = modifiers[attr] + (isProficient ? profBonus : 0);
			document.getElementById(
				`bonus-skill-${skill.replace(/\s+/g, "")}`,
			).textContent = bonus >= 0 ? `+${bonus}` : bonus;
		}
	}

	updateInjuryStatus() {
		const statusContainer = document.getElementById("critical-injury-status");
		statusContainer.innerHTML = ""; // Limpa o status atual

		const injuredParts = new Set();
		document
			.querySelectorAll("#critical-injury-svg .body-part.injured")
			.forEach((part) => {
				injuredParts.add(part.id);
			});

		const hasLeftArm = injuredParts.has("injury-left-arm");
		const hasRightArm = injuredParts.has("injury-right-arm");
		const hasLeftLeg = injuredParts.has("injury-left-leg");
		const hasRightLeg = injuredParts.has("injury-right-leg");

		// Lógica para os braços
		if (hasLeftArm && hasRightArm) {
			const statusElement = document.createElement("p");
			statusElement.className = "text-red-400";
			statusElement.textContent = `● ${INJURY_DESCRIPTIONS["arms-crippled"]}`;
			statusContainer.appendChild(statusElement);
		} else {
			if (hasLeftArm) {
				const statusElement = document.createElement("p");
				statusElement.className = "text-yellow-400";
				statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-left-arm"]}`;
				statusContainer.appendChild(statusElement);
			}
			if (hasRightArm) {
				const statusElement = document.createElement("p");
				statusElement.className = "text-yellow-400";
				statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-right-arm"]}`;
				statusContainer.appendChild(statusElement);
			}
		}

		// Lógica para as pernas
		if (hasLeftLeg && hasRightLeg) {
			const statusElement = document.createElement("p");
			statusElement.className = "text-red-400";
			statusElement.textContent = `● ${INJURY_DESCRIPTIONS["legs-crippled"]}`;
			statusContainer.appendChild(statusElement);
		} else {
			if (hasLeftLeg) {
				const statusElement = document.createElement("p");
				statusElement.className = "text-yellow-400";
				statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-left-leg"]}`;
				statusContainer.appendChild(statusElement);
			}
			if (hasRightLeg) {
				const statusElement = document.createElement("p");
				statusElement.className = "text-yellow-400";
				statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-right-leg"]}`;
				statusContainer.appendChild(statusElement);
			}
		}

		// Lógica para Torso e Cabeça (sempre se aplicam se feridos)
		if (injuredParts.has("injury-torso")) {
			const statusElement = document.createElement("p");
			statusElement.className = "text-yellow-400";
			statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-torso"]}`;
			statusContainer.appendChild(statusElement);
		}
		if (injuredParts.has("injury-head")) {
			const statusElement = document.createElement("p");
			statusElement.className = "text-yellow-400";
			statusElement.textContent = `● ${INJURY_DESCRIPTIONS["injury-head"]}`;
			statusContainer.appendChild(statusElement);
		}

		// Mensagem padrão se não houver ferimentos
		if (statusContainer.innerHTML === "") {
			statusContainer.innerHTML =
				'<p class="text-gray-500">Nenhum ferimento crítico ativo.</p>';
		}
	}

	// Injury handling
	handleInjuryClick(event) {
		const part = event.target.closest(".body-part");
		if (part) {
			part.classList.toggle("injured");
			this.updateInjuryStatus(); // Atualiza o texto de status
		}
	}

	// Dynamic card management
	handleCardActions(e) {
		const card = e.target.closest(".dynamic-card");
		if (!card) return;

		if (e.target.matches(".save-card-btn")) {
			this.saveCard(card);
		} else if (e.target.matches(".edit-card-btn")) {
			this.editCard(card);
		} else if (e.target.matches(".remove-card-btn")) {
			this.removeCard(card);
		} else if (e.target.matches(".use-btn")) {
			this.useResource(card, e.target.dataset.target);
		} else if (e.target.matches(".add-btn")) {
			this.addResource(card, e.target.dataset.target);
		}
	}

	saveCard(card) {
		const inputs = card.querySelectorAll(".edit-mode [data-value-source]");
		inputs.forEach((input) => {
			const key = input.dataset.valueSource;
			card.dataset[key] = input.value;
		});

		const weaponImg = card.querySelector(".edit-mode .weapon-image");
		if (weaponImg && weaponImg.src && weaponImg.src.startsWith("data:image")) {
			card.dataset.imageSrc = weaponImg.src;
		}

		this.updateCardView(card);
		card.classList.add("view-state");
		// Trigger totals update
		document.dispatchEvent(new CustomEvent("updateTotals"));
	}

	editCard(card) {
		const inputs = card.querySelectorAll(".edit-mode [data-value-source]");
		inputs.forEach((input) => {
			const key = input.dataset.valueSource;
			input.value = card.dataset[key] || "";
		});
		card.classList.remove("view-state");
	}

	removeCard(card) {
		if (confirm("Tem certeza que deseja excluir este item?")) {
			card.remove();
			// Trigger totals update
			document.dispatchEvent(new CustomEvent("updateTotals"));
		}
	}

	useResource(card, targetKey) {
		let currentValue = parseInt(card.dataset[targetKey]) || 0;
		if (currentValue > 0) {
			currentValue--;
			card.dataset[targetKey] = currentValue;
			this.updateCardView(card);
		}
	}

	addResource(card, targetKey) {
		let currentValue = parseInt(card.dataset[targetKey]) || 0;
		const maxKey = targetKey.replace("Atual", "Max");
		const maxValue = parseInt(card.dataset[maxKey]) || 0;
		if (currentValue < maxValue) {
			currentValue++;
			card.dataset[targetKey] = currentValue;
			this.updateCardView(card);
		}
	}

	updateCardView(card) {
		card
			.querySelectorAll(".view-mode [data-value-target]")
			.forEach((viewEl) => {
				const key = viewEl.dataset.valueTarget;

				if (key === "penteAtual" || key === "usosAtuais") {
					const maxKey = key.replace("Atual", "Max");
					viewEl.textContent = `${card.dataset[key] || 0} / ${card.dataset[maxKey] || 0}`;
				} else if (
					key === "name" &&
					card.querySelector('[data-value-target="qty"]')
				) {
					viewEl.textContent = card.dataset.name || "Nome do Item";
					card.querySelector('[data-value-target="qty"]').textContent =
						card.dataset.qty || "1";
				} else if (key === "imageSrc") {
					if (
						card.dataset.imageSrc &&
						card.dataset.imageSrc.startsWith("data:image")
					) {
						viewEl.src = card.dataset.imageSrc;
						viewEl.classList.remove("hidden");
						card.querySelector(".edit-mode svg")?.classList.add("hidden");
					} else {
						viewEl.src = "";
						viewEl.classList.add("hidden");
						card.querySelector(".edit-mode svg")?.classList.remove("hidden");
					}
				} else {
					viewEl.textContent = card.dataset[key] || "";
				}
			});
	}

	// Dynamic item creation
	addWeapon() {
		const list = document.getElementById("weapons-list");
		const id = Date.now();
		const weaponId = `weapon-${id}`;
		const inputId = `weapon-image-upload-${id}`;
		const imgId = `weapon-image-${id}`;

		const weaponHTML = `
            <div id="${weaponId}" class="card bg-gray-900 p-4 flex flex-col sm:flex-row gap-4 dynamic-card">
                <div class="view-mode">
                    <div class="flex gap-4">
                        <div class="weapon-image-container">
                            <img data-value-target="imageSrc" src="" class="weapon-image-view weapon-image hidden">
                        </div>
                        <div class="flex-grow">
                            <div class="flex justify-between items-start">
                                <h3 class="text-lg font-bold text-white" data-value-target="name">Nome da Arma</h3>
                                <div>
                                    <button class="btn btn-secondary text-xs edit-card-btn">Editar</button>
                                    <button class="btn btn-danger text-xs remove-card-btn">X</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 mt-2 text-sm">
                                <div><strong>Dano:</strong> <span data-value-target="damage"></span></div>
                                <div><strong>Alcance:</strong> <span data-value-target="range"></span></div>
                                <div><strong>Troca:</strong> <span data-value-target="swap"></span></div>
                                <div><strong>P.E.:</strong> <span data-value-target="pe" class="weapon-pe-view"></span></div>
                            </div>
                             <div class="flex items-center gap-2 mt-2">
                                <strong>Pente:</strong>
                                <span data-value-target="penteAtual">0 / 0</span>
                                <button class="btn btn-secondary text-xs resource-btn use-btn" data-target="penteAtual">-</button>
                                <button class="btn btn-secondary text-xs resource-btn add-btn" data-target="penteAtual">+</button>
                            </div>
                            <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                        </div>
                    </div>
                </div>
                <div class="edit-mode">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <label for="${inputId}" class="weapon-image-container">
                            <img id="${imgId}" src="" class="weapon-image hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input type="file" id="${inputId}" accept="image/*" class="hidden weapon-image-upload">
                        </label>
                        <div class="flex-grow">
                            <input type="text" class="form-input mb-3" placeholder="Nome da Arma" data-value-source="name">
                            <div class="grid grid-cols-2 gap-3">
                                <input type="text" class="form-input" placeholder="Dano" data-value-source="damage">
                                <input type="text" class="form-input" placeholder="Alcance" data-value-source="range">
                                <input type="text" class="form-input" placeholder="Troca" data-value-source="swap">
                                <input type="number" class="form-input weapon-pe" placeholder="P.E." data-value-source="pe">
                                <input type="number" class="form-input" placeholder="Pente Atual" data-value-source="penteAtual">
                                <input type="number" class="form-input" placeholder="Pente Máx" data-value-source="penteMax">
                            </div>
                            <textarea class="form-textarea mt-3" rows="2" placeholder="Vantagens, desvantagens, acessórios..." data-value-source="desc"></textarea>
                            <div class="flex gap-2 mt-3">
                                <button class="btn btn-success text-xs save-card-btn">Salvar</button>
                                <button class="btn btn-danger text-xs remove-card-btn">Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
		list.insertAdjacentHTML("beforeend", weaponHTML);
	}

	addEquipment() {
		const list = document.getElementById("equipment-list");
		const id = Date.now();
		const equipId = `equip-${id}`;
		const equipHTML = `
            <div id="${equipId}" class="card bg-gray-900 p-3 dynamic-card">
                <div class="view-mode">
                    <div class="flex justify-between items-start">
                        <h3 class="text-md font-bold text-white"><span data-value-target="name"></span> (<span data-value-target="qty"></span>)</h3>
                        <div>
                            <button class="btn btn-secondary text-xs edit-card-btn">Editar</button>
                            <button class="btn btn-danger text-xs remove-card-btn">X</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-x-4 mt-2 text-sm">
                        <div><strong>Carga:</strong> <span data-value-target="carga" class="equipment-carga-view"></span></div>
                        <div><strong>P.E.:</strong> <span data-value-target="pe" class="equipment-pe-view"></span></div>
                    </div>
                    <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                </div>
                <div class="edit-mode">
                    <div class="flex items-center gap-3">
                        <input type="text" class="form-input flex-grow" placeholder="Nome do Item" data-value-source="name">
                        <input type="number" class="form-input w-20" placeholder="Qtd" data-value-source="qty" value="1">
                        <input type="number" step="0.5" class="form-input w-24 equipment-carga" placeholder="Carga" data-value-source="carga">
                        <input type="number" step="0.5" class="form-input w-24 equipment-pe" placeholder="P.E." data-value-source="pe">
                    </div>
                    <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição do item..." data-value-source="desc"></textarea>
                    <div class="flex gap-2 mt-2">
                        <button class="btn btn-success text-xs save-card-btn">Salvar</button>
                        <button class="btn btn-danger text-xs remove-card-btn">Remover</button>
                    </div>
                </div>
            </div>
        `;
		list.insertAdjacentHTML("beforeend", equipHTML);
	}

	addGenericItem(listId, placeholder, hasUses = false) {
		const list = document.getElementById(listId);
		const id = Date.now();
		const itemId = `item-${id}`;

		const usesHTML = hasUses
			? `
            <div class="flex items-center gap-2 mt-2">
                <strong>Usos:</strong>
                <span data-value-target="usosAtuais">0 / 0</span>
                <button class="btn btn-secondary text-xs resource-btn use-btn" data-target="usosAtuais">-</button>
                <button class="btn btn-secondary text-xs resource-btn add-btn" data-target="usosAtuais">+</button>
            </div>
        `
			: "";

		const usesEditHTML = hasUses
			? `
            <div class="grid grid-cols-2 gap-3 mt-2">
                <input type="number" class="form-input" placeholder="Usos Atuais" data-value-source="usosAtuais">
                <input type="number" class="form-input" placeholder="Usos Máx" data-value-source="usosMax">
            </div>
        `
			: "";

		const itemHTML = `
             <div id="${itemId}" class="card bg-gray-900 p-3 dynamic-card">
                <div class="view-mode">
                    <div class="flex justify-between items-start">
                        <h3 class="text-md font-bold text-white" data-value-target="name">Nome do Item</h3>
                        <div>
                            <button class="btn btn-secondary text-xs edit-card-btn">Editar</button>
                            <button class="btn btn-danger text-xs remove-card-btn">X</button>
                        </div>
                    </div>
                    ${usesHTML}
                    <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                </div>
                <div class="edit-mode">
                    <div class="flex items-center gap-3">
                        <input type="text" class="form-input flex-grow" placeholder="Nome do ${placeholder}" data-value-source="name">
                    </div>
                    ${usesEditHTML}
                    <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição..." data-value-source="desc"></textarea>
                    <div class="flex gap-2 mt-2">
                        <button class="btn btn-success text-xs save-card-btn">Salvar</button>
                        <button class="btn btn-danger text-xs remove-card-btn">Remover</button>
                    </div>
                </div>
            </div>
        `;
		list.insertAdjacentHTML("beforeend", itemHTML);
	}

	// Utility methods for data loading
	updateNationalityDisplay(value) {
		const buttonContent = document
			.getElementById("char-nationality-button")
			.querySelector("span");
		const flagUrl =
			value === "OTHER"
				? "https://placehold.co/20x15/374151/d1d5db?text=?"
				: `https://flagcdn.com/w20/${value.toLowerCase()}.png`;
		buttonContent.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${COUNTRIES[value]}"> <span>${COUNTRIES[value]}</span>`;
	}

	updatePortrait(portraitSrc) {
		const portraitImg = document.getElementById("char-portrait");
		const placeholderIcon = document.getElementById("portrait-placeholder");
		portraitImg.src = portraitSrc;
		portraitImg.classList.remove("hidden");
		if (placeholderIcon) placeholderIcon.classList.add("hidden");
	}

	updateBackground(backgroundUrl) {
		document.getElementById("background-url-input").value = backgroundUrl;
		document.documentElement.style.setProperty(
			"--bg-url",
			`url('${backgroundUrl}')`,
		);
	}

	applyTheme(theme) {
		document.getElementById("theme-selector").value = theme;
		if (theme === "light") {
			document.body.classList.add("light-theme");
		} else {
			document.body.classList.remove("light-theme");
		}
		// Trigger chart update
		document.dispatchEvent(
			new CustomEvent("themeChanged", { detail: { theme } }),
		);
	}
}
