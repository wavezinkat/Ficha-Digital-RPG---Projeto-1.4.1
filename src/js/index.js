// Main entry point for the RPG Sheet application
import { CharacterSheet } from "./modules/CharacterSheet.js";
import { EventManager } from "./modules/EventManager.js";
import { DataManager } from "./modules/DataManager.js";
import { UIManager } from "./modules/UIManager.js";
import { ChartManager } from "./modules/ChartManager.js";

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// Initialize all managers
	const dataManager = new DataManager();
	const chartManager = new ChartManager();
	const uiManager = new UIManager();
	const eventManager = new EventManager();

	// Initialize the main character sheet
	const characterSheet = new CharacterSheet(
		dataManager,
		chartManager,
		uiManager,
		eventManager,
	);

	// Start the application
	characterSheet.init();
});
