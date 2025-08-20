// ChartManager handles the attribute radar chart and its updates
import { ATTRIBUTES } from "../models/index.js";

export class ChartManager {
	constructor() {
		this.attributeChart = null;
	}

	initAttributeChart() {
		const ctx = document.getElementById("attributeChart").getContext("2d");
		const isLightTheme = document.body.classList.contains("light-theme");

		const gridColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--chart-grid-color")
			.trim();
		const labelColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--chart-label-color")
			.trim();
		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--accent-color")
			.trim();

		this.attributeChart = new Chart(ctx, {
			type: "radar",
			data: {
				labels: Object.values(ATTRIBUTES),
				datasets: [
					{
						label: "Atributos",
						data: [10, 10, 10, 10, 10, 10],
						backgroundColor: `${accentColor}33`, // Accent with 20% opacity
						borderColor: accentColor,
						pointBackgroundColor: accentColor,
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: accentColor,
					},
				],
			},
			options: {
				scales: {
					r: {
						angleLines: { color: gridColor },
						grid: { color: gridColor },
						pointLabels: { color: labelColor, font: { size: 12 } },
						ticks: {
							display: false,
							stepSize: 5,
						},
						min: 0,
						max: 20,
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		});

		// Listen for theme changes
		document.addEventListener("themeChanged", (e) => {
			this.handleThemeChange(e.detail.theme);
		});
	}

	updateAttributeChart() {
		if (!this.attributeChart) return;
		const scores = Object.keys(ATTRIBUTES).map((key) => {
			return (
				parseInt(document.getElementById(`score-${key.toLowerCase()}`).value) ||
				0
			);
		});
		this.attributeChart.data.datasets[0].data = scores;
		this.attributeChart.update();
	}

	handleThemeChange(theme) {
		if (!this.attributeChart) return;

		// Re-initialize chart with new colors
		this.attributeChart.destroy();
		this.initAttributeChart();
		this.updateAttributeChart();
	}

	destroyChart() {
		if (this.attributeChart) {
			this.attributeChart.destroy();
			this.attributeChart = null;
		}
	}
}
