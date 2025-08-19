import { ATTRIBUTES } from './entities/attributes.js';
import { SKILLS } from './entities/skills.js';
import { COUNTRIES } from './entities/countries.js';
import { RACIAL_FEATURES } from './entities/races.js';
import { CLASSES } from './entities/classes.js';
import { SPECIALIZATIONS } from './entities/specializations.js';
import { MUTANT_SUBTYPE_FEATURES } from './entities/mutantSubtypes.js';
import { COLETES } from './entities/armors.js';
import { INJURY_DESCRIPTIONS } from './entities/injuries.js';
import { DigitalSheet } from './core/digitalSheet.js';

// Temporary bridge: expose data for legacy script until full migration
window.__RPG_DATA__ = new DigitalSheet({
    ATTRIBUTES,
    SKILLS,
    COUNTRIES,
    RACIAL_FEATURES,
    CLASSES,
    SPECIALIZATIONS,
    MUTANT_SUBTYPE_FEATURES,
    COLETES,
    INJURY_DESCRIPTIONS
});

// legacy script loaded separately via HTML 