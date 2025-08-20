// Main CharacterSheet class that orchestrates all functionality
export class CharacterSheet {
	constructor(dataManager, chartManager, uiManager, eventManager) {
		this.dataManager = dataManager;
		this.chartManager = chartManager;
		this.uiManager = uiManager;
		this.eventManager = eventManager;

		// Connect managers to each other
		this.eventManager.setManagers(uiManager, dataManager, chartManager);
	}

	init() {
		// Initialize all components
		this.uiManager.populateDropdowns();
		this.uiManager.renderAttributes();
		this.uiManager.renderSavingThrows();
		this.uiManager.renderSkills();
		this.uiManager.renderExhaustion();
		this.chartManager.initAttributeChart();
		this.eventManager.setupEventListeners();
		this.uiManager.updateSpecializationDropdown();
		this.updateSheet();
		this.uiManager.updateInjuryStatus();
	}

	updateSheet() {
		const level = parseInt(document.getElementById("char-level").value) || 1;
		const profBonus = Math.floor((level - 1) / 4) + 2;

		// Update attributes and modifiers
		const modifiers = this.dataManager.updateAttributes();
		this.chartManager.updateAttributeChart();

		// Update saving throws
		this.dataManager.updateSavingThrows(profBonus);

		// Update armor and combat stats
		this.dataManager.updateCombatStats(modifiers);

		// Update racial features and skills
		this.uiManager.updateRacialFeaturesAndSkills(modifiers, profBonus);
		this.dataManager.updateTotals();
	}
}
