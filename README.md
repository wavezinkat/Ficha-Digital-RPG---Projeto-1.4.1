# RPG Sheet Project - Digital Character Sheet

A modern, modular digital character sheet for tabletop RPGs, built with vanilla JavaScript and ES6 modules.

### Project Structure
```
src/
├── js/
│   ├── models/                    # Main index
│   │   └── index.js               # Main exporter
│   ├── modules/                    # Core application logic
│   │   ├── CharacterSheet.js      # Main orchestrator
│   │   ├── DataManager.js         # Data operations & calculations
│   │   ├── UIManager.js           # UI rendering & DOM manipulation
│   │   ├── ChartManager.js        # Chart management
│   │   └── EventManager.js        # Event handling & user interactions
│   └── index.js                   # Application entry point
├── models/                         # Game data entities
│   ├── attributes.entity.js       # Character attributes
│   ├── classes.entity.js          # Character classes
│   ├── armors.entity.js           # Armor/equipment data
│   ├── countries.entity.js        # Nationalities
│   ├── injuries.entity.js         # Injury descriptions
│   ├── mutantSubtypes.entity.js   # Mutant features
│   ├── races.entity.js            # Racial features
│   ├── skills.entity.js           # Skills & proficiencies
│   ├── specializations.entity.js  # Class specializations
│   └── index.js                   # Models export index
├── styles/
│   └── style.css                  # Application styles
└── index.html                     # Main HTML file
```

## 🔧 Core Components

### 1. CharacterSheet (Main Controller)
**Purpose**: Central orchestrator that coordinates all other managers
- **Responsibilities**: 
  - Initializes all components in the correct order
  - Coordinates updates between different managers
  - Maintains the main application state
  - Handles the overall application flow

### 2. DataManager
**Purpose**: Handles all data operations, calculations, and persistence
- **Responsibilities**:
  - Attribute calculations and modifiers
  - Saving throw calculations with proficiency bonuses
  - Combat stats updates (AC, initiative, hit dice)
  - Data persistence (save/load from localStorage)
  - Dynamic card data management (weapons, equipment, etc.)
  - Character data serialization/deserialization

### 3. UIManager
**Purpose**: Manages all UI rendering, updates, and DOM manipulation
- **Responsibilities**:
  - Populating dropdowns with game data
  - Rendering attributes, skills, and other UI components
  - Dynamic card management (weapons, equipment, titles, etc.)
  - Injury status updates and visual feedback
  - Theme and background management
  - Form validation and error handling

### 4. ChartManager
**Purpose**: Manages the attribute radar chart visualization
- **Responsibilities**:
  - Chart initialization with proper styling
  - Real-time chart updates when attributes change
  - Theme change handling (dark/light mode)
  - Chart lifecycle management (create/destroy)
  - Responsive chart sizing

### 5. EventManager
**Purpose**: Handles all event listeners and user interactions
- **Responsibilities**:
  - Tab navigation and content switching
  - Form input handling and validation
  - Image uploads (character portraits, weapon images)
  - Theme changes and background updates
  - Save/load operations
  - Dynamic card interactions (edit, save, delete)
  - Injury system interactions

### 6. Models
**Purpose**: Centralized data entities containing game rules and configuration
- **Responsibilities**:
  - Game rules data (attributes, classes, races)
  - Character options and choices
  - Static configuration data
  - Data validation and constraints

## 🚀 Adding New Features

### Step-by-Step Guide

1. **Add Data** → Extend appropriate entity files in `models/`
   ```javascript
   // Example: Adding a new race
   export const RACIAL_FEATURES = {
     "New Race": {
       features: [{ name: "Feature Name", desc: "Description" }],
       auto_skills: ["Skill1", "Skill2"],
       speed: "9m"
     }
   };
   ```

2. **Add UI** → Extend `UIManager` with new rendering methods
   ```javascript
   renderNewFeature() {
     const container = document.getElementById("new-feature-container");
     // Render your new UI component
   }
   ```

3. **Add Logic** → Add calculation methods to `DataManager`
   ```javascript
   calculateNewFeature() {
     // Your calculation logic here
     return result;
   }
   ```

4. **Add Events** → Wire up new interactions in `EventManager`
   ```javascript
   setupNewFeatureEvents() {
     document.getElementById("new-feature-btn")
       .addEventListener("click", this.handleNewFeature.bind(this));
   }
   ```

5. **Integration** → Coordinate in `CharacterSheet` if needed
   ```javascript
   init() {
     // ... existing code ...
     this.uiManager.renderNewFeature();
     this.eventManager.setupNewFeatureEvents();
   }
   ```
   
