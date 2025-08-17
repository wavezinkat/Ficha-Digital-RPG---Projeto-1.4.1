document.addEventListener('DOMContentLoaded', () => {
    // --- DATA FROM RULEBOOK ---
    const ATTRIBUTES = {
        FOR: "Força", DEX: "Destreza", CON: "Constituição",
        INT: "Inteligência", SAB: "Sabedoria", CHA: "Carisma"
    };

    const SKILLS = {
        "Atletismo": "FOR", "Aviação": "DEX", "Habilitação": "DEX", "Acrobacia": "DEX",
        "Mãos Leves": "DEX", "Furtividade": "DEX", "Vigor": "CON", "Medicina": "SAB",
        "Intuição": "SAB", "Percepção": "SAB", "Adestrar Animais": "SAB", "Sobrevivência": "SAB",
        "Ciência": "INT", "Sabotagem": "INT", "Tecnologia": "INT", "Investigação": "INT",
        "Persuasão": "CHA", "Intimidação": "CHA", "Enganação": "CHA", "Atuação": "CHA"
    };
    
    const COUNTRIES = {
        'AF': 'Afeganistão', 'ZA': 'África do Sul', 'AL': 'Albânia', 'DE': 'Alemanha', 'AD': 'Andorra', 'AO': 'Angola', 'SA': 'Arábia Saudita', 'DZ': 'Argélia', 'AR': 'Argentina', 'AM': 'Armênia', 'AU': 'Austrália', 'AT': 'Áustria', 'AZ': 'Azerbaijão', 'BS': 'Bahamas', 'BD': 'Bangladesh', 'BB': 'Barbados', 'BE': 'Bélgica', 'BZ': 'Belize', 'BJ': 'Benin', 'BY': 'Bielorrússia', 'BO': 'Bolívia', 'BA': 'Bósnia e Herzegovina', 'BW': 'Botsuana', 'BR': 'Brasil', 'BG': 'Bulgária', 'BF': 'Burkina Faso', 'BI': 'Burundi', 'BT': 'Butão', 'CV': 'Cabo Verde', 'CM': 'Camarões', 'KH': 'Camboja', 'CA': 'Canadá', 'QA': 'Catar', 'KZ': 'Cazaquistão', 'TD': 'Chade', 'CL': 'Chile', 'CN': 'China', 'CY': 'Chipre', 'CO': 'Colômbia', 'CG': 'Congo', 'CD': 'Congo (RDC)', 'KR': 'Coreia do Sul', 'CI': 'Costa do Marfim', 'CR': 'Costa Rica', 'HR': 'Croácia', 'CU': 'Cuba', 'DK': 'Dinamarca', 'DJ': 'Djibuti', 'DM': 'Dominica', 'EG': 'Egito', 'SV': 'El Salvador', 'AE': 'Emirados Árabes Unidos', 'EC': 'Equador', 'SK': 'Eslováquia', 'SI': 'Eslovênia', 'ES': 'Espanha', 'US': 'Estados Unidos', 'EE': 'Estônia', 'ET': 'Etiópia', 'FJ': 'Fiji', 'PH': 'Filipinas', 'FI': 'Finlândia', 'FR': 'França', 'GA': 'Gabão', 'GM': 'Gâmbia', 'GH': 'Gana', 'GE': 'Geórgia', 'GR': 'Grécia', 'GT': 'Guatemala', 'GN': 'Guiné', 'GW': 'Guiné-Bissau', 'GQ': 'Guiné Equatorial', 'GY': 'Guiana', 'HT': 'Haiti', 'NL': 'Holanda', 'HN': 'Honduras', 'HU': 'Hungria', 'YE': 'Iêmen', 'IN': 'Índia', 'ID': 'Indonésia', 'IQ': 'Iraque', 'IR': 'Irã', 'IE': 'Irlanda', 'IS': 'Islândia', 'IL': 'Israel', 'IT': 'Itália', 'JM': 'Jamaica', 'JP': 'Japão', 'JO': 'Jordânia', 'KW': 'Kuwait', 'LA': 'Laos', 'LV': 'Letônia', 'LB': 'Líbano', 'LT': 'Lituânia', 'LU': 'Luxemburgo', 'MY': 'Malásia', 'MW': 'Malawi', 'MV': 'Maldivas', 'ML': 'Mali', 'MT': 'Malta', 'MA': 'Marrocos', 'MU': 'Maurício', 'MR': 'Mauritânia', 'MX': 'México', 'MD': 'Moldávia', 'MC': 'Mônaco', 'MN': 'Mongólia', 'ME': 'Montenegro', 'MZ': 'Moçambique', 'MM': 'Mianmar', 'NP': 'Nepal', 'NI': 'Nicarágua', 'NE': 'Níger', 'NG': 'Nigéria', 'NO': 'Noruega', 'NZ': 'Nova Zelândia', 'OM': 'Omã', 'PK': 'Paquistão', 'PA': 'Panamá', 'PY': 'Paraguai', 'PE': 'Peru', 'PL': 'Polônia', 'PT': 'Portugal', 'KE': 'Quênia', 'GB': 'Reino Unido', 'CZ': 'República Tcheca', 'RO': 'Romênia', 'RW': 'Ruanda', 'RU': 'Rússia', 'SN': 'Senegal', 'SL': 'Serra Leoa', 'RS': 'Sérvia', 'SG': 'Singapura', 'SY': 'Síria', 'SO': 'Somália', 'LK': 'Sri Lanka', 'SE': 'Suécia', 'CH': 'Suíça', 'SR': 'Suriname', 'TH': 'Tailândia', 'TZ': 'Tanzânia', 'TJ': 'Tajiquistão', 'TG': 'Togo', 'TT': 'Trinidad e Tobago', 'TN': 'Tunísia', 'TR': 'Turquia', 'UA': 'Ucrânia', 'UG': 'Uganda', 'UY': 'Uruguai', 'UZ': 'Uzbequistão', 'VE': 'Venezuela', 'VN': 'Vietnã', 'ZM': 'Zâmbia', 'ZW': 'Zimbábue', 'OTHER': 'Outro'
    };

    const RACIAL_FEATURES = {
        "Humano": {
            speed: "9m",
            features: [
                { name: "Aumento no Valor de Habilidade", desc: "Possui 4 pontos de distribuição que não podem acumular no mesmo atributo." },
                { name: "Perícia", desc: "Você ganha proficiência em UMA perícia, à sua escolha." },
                { name: "Talento", desc: "Você ganha UM talento a sua escolha." }
            ],
            auto_skills: []
        },
        "Mecanizado": {
            speed: "11m",
            features: [
                { name: "Aumento no Valor de Habilidade", desc: "Seu valor de Força ou Destreza aumenta em 2 e seu valor de Constituição e Inteligência aumenta em 1." },
                { name: "Talento", desc: "Você ganha UM talento, à sua escolha." },
                { name: "Ameaçador", desc: "Você adquire proficiência na perícia Intimidação." }
            ],
            auto_skills: ["Intimidação"]
        },
        "Mutante": {
            speed: "9m",
            features: [
                { name: "Mutante", desc: "Selecione uma tipagem de mutante para ver suas habilidades." }
            ],
            auto_skills: []
        }
    };

    const MUTANT_SUBTYPE_FEATURES = {
        "Incendiário": {
            features: [
                { name: "Aumento no Valor de Habilidade", desc: "Seu valor de força é aumentado em +2 e Constituição +1." },
                { name: "Sangue fervendo", desc: "O operador ganha proficiência em atletismo." },
                { name: "Superaquecer", desc: "1° Nível: 2d6 Dano incendiário, alcance 1m, 1 uso por descanso." }
            ],
            auto_skills: ["Atletismo"]
        },
        "Blitz": {
            features: [
                { name: "Aumento no Valor de Habilidade", desc: "Seu valor de Destreza é aumentado em +2 e Sabedoria +1." },
                { name: "Eletrizar", desc: "1° Nível: 2d4 Dano elétrico, alcance 3m, 2 usos por descanso." }
            ],
            auto_skills: []
        },
        "Anima": {
            features: [
                { name: "Aumento no Valor de Habilidade", desc: "Seu valor de Força OU Destreza aumenta em 2 e seu valor de carisma aumenta em 1." },
                { name: "Sentidos aguçados", desc: "Escolha proficiência entre: Percepção, Intimidação e Intuição." },
                { name: "Intuição animal", desc: "Ganha proficiência em adestrar animais." }
            ],
            auto_skills: ["Adestrar Animais"]
        },
        "Sankta": {
            features: [
                { name: "Aumento no valor de habilidade", desc: "Valor de destreza aumenta em 2. Bônus adicionais dependem da cor da auréola." },
                { name: "Auréola brilhante", desc: "O operador possui desvantagem em testes de furtividade (exceto auréola preta)." },
                { name: "Cores das Auréolas", desc: "Preta (+1 atributo, sem desvantagem), Branca (+1 atributo, prof. carisma), Vermelha (+1 FOR/CON, cura), Azul (+1 SAB/INT, remove oriopatia)." }
            ],
            auto_skills: []
        }
    };

    const CLASSES = {
        "Assalto": { hitDice: 12, saves: ["FOR", "CON"] },
        "Corpo a corpo": { hitDice: 12, saves: ["CON"], choice: ["FOR", "DEX"] },
        "Suporte": { hitDice: 8, saves: ["INT", "CHA"] },
        "Cobra": { hitDice: 8, saves: ["DEX", "INT"] },
        "Franco-atirador": { hitDice: 6, saves: ["DEX", "SAB"] },
        "Hacker": { hitDice: 6, saves: ["INT", "CHA"] },
        "Especialista": { hitDice: 10, saves: ["FOR", "INT"] }
    };

    const SPECIALIZATIONS = {
        "Armeiro": [
            { name: "A ARMA CERTA PARA O TRABALHO", desc: "Nível 1: Proficiência em todas as armas de fogo e coletes. Usa metade do Mod de Proficiência no dano da arma." },
            { name: "ACESSORIOS!!", desc: "Nível 3: Cancela o uso de 1/2 PE de acessórios de armas (aumenta no nível 14)." },
            { name: "SLOT TATICO", desc: "Nível 5: Nega o uso de PE em 2 granadas (aumenta para 3 e 4 nos níveis 8 e 13)." },
            { name: "ARMA FAVORITA", desc: "Nível 7: Gaste 30min para tornar uma arma sua favorita, ganhando benefícios." },
            { name: "REDUZIR P.E", desc: "Nível 10: Pode melhorar uma arma para diminuir o PE em 1 (aumenta para 2 no nível 17)." },
            { name: "ARSENAL PERFEITO", desc: "Nível 13: Com 3+ acessórios na arma, a proficiência é dobrada nos disparos." },
            { name: "ARMADO", desc: "Nível 15: Pode remover e colocar acessórios fora do QG com um kit de reparos." },
        ],
        "Engenheiro": [
            { name: "MELHORIA", desc: "Nível 1: Equipamentos criados/modificados por você possuem maior melhoria (1 por equipamento, aumenta para 2 no nível 11)." },
            { name: "SLOT TATICO", desc: "Nível 3: Nega o uso de PE em 2 granadas (aumenta para 3 e 4 nos níveis 8 e 13)." },
            { name: "SLOT EXTRA", desc: "Nível 5: Nega uso de PE em equipamentos. Ganha 1+ PE a cada 5 níveis." },
            { name: "CRIAR", desc: "Nível 7: Pode fazer equipamentos que já conhece gastando dinheiro e tempo." },
            { name: "REPARAR", desc: "Nível 10: Pode reparar autômatos e equipamentos. Autômatos curam 1d10 + INT." },
            { name: "REDUZIR P.E", desc: "Nível 13: Pode melhorar um equipamento para diminuir o PE." },
            { name: "REUTILIZAR", desc: "Nível 15: Gaste 1 kit de reparo para ter um uso extra em seu equipamento." },
        ]
    };

    // --- INITIALIZATION ---
    function init() {
        populateDropdowns();
        renderAttributes();
        renderSavingThrows();
        renderSkills();
        setupEventListeners();
        updateSheet();
    }

    function populateDropdowns() {
        const classSelect = document.getElementById('char-class');
        Object.keys(CLASSES).forEach(c => {
            const option = document.createElement('option');
            option.value = c;
            option.textContent = c;
            classSelect.appendChild(option);
        });

        const specSelect = document.getElementById('char-specialization');
        Object.keys(SPECIALIZATIONS).forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = s;
            specSelect.appendChild(option);
        });

        const raceSelect = document.getElementById('char-race');
        Object.keys(RACIAL_FEATURES).forEach(r => {
            const option = document.createElement('option');
            option.value = r;
            option.textContent = r;
            raceSelect.appendChild(option);
        });
        
        const mutantSelect = document.getElementById('char-mutant-subtype');
        Object.keys(MUTANT_SUBTYPE_FEATURES).forEach(m => {
            const option = document.createElement('option');
            option.value = m;
            option.textContent = m;
            mutantSelect.appendChild(option);
        });

        // Create custom nationality dropdown
        const nationalityContainer = document.getElementById('nationality-select-container');
        const dropdownId = 'char-nationality';
        const buttonHTML = `
            <button type="button" id="${dropdownId}-button" class="form-input custom-select-button">
                <span class="flex items-center">
                    <img src="https://flagcdn.com/w20/us.png" alt="Bandeira">
                    <span>Estados Unidos</span>
                </span>
                <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </button>`;
        const optionsHTML = `<div id="${dropdownId}-options" class="custom-select-options hidden"></div>`;
        nationalityContainer.innerHTML = `<input type="hidden" id="${dropdownId}" value="US">` + buttonHTML + optionsHTML;

        const optionsContainer = document.getElementById(`${dropdownId}-options`);
        for (const code in COUNTRIES) {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('custom-select-option');
            optionDiv.dataset.value = code;
            const flagUrl = code === 'OTHER' ? 'https://placehold.co/20x15/374151/d1d5db?text=?' : `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
            optionDiv.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${COUNTRIES[code]}"> <span>${COUNTRIES[code]}</span>`;
            optionsContainer.appendChild(optionDiv);
        }
    }

    function renderAttributes() {
        const container = document.getElementById('attributes');
        container.innerHTML = '';
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

    function renderSavingThrows() {
        const container = document.getElementById('saving-throws');
        container.innerHTML = '';
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

    function renderSkills() {
        const container = document.getElementById('skills');
        container.innerHTML = '';
        for (const skill in SKILLS) {
            const attr = SKILLS[skill];
            const skillHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input type="checkbox" id="prof-skill-${skill.replace(/\s+/g, '')}" class="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500">
                        <label class="ml-2">${skill} <span class="text-xs text-gray-500">(${attr})</span></label>
                    </div>
                    <span id="bonus-skill-${skill.replace(/\s+/g, '')}" class="font-bold">+0</span>
                </div>
            `;
            container.innerHTML += skillHTML;
        }
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                document.getElementById(button.dataset.tab).classList.add('active');
            });
        });

        // Update sheet on any input change
        document.querySelector('.max-w-7xl').addEventListener('input', updateSheet);
        
        // Image Upload
        document.getElementById('char-image-upload').addEventListener('change', handleImageUpload);

        // Special case for dropdowns to show/hide sections
        document.getElementById('char-race').addEventListener('change', (e) => {
            document.getElementById('mutant-subtype-wrapper').classList.toggle('hidden', e.target.value !== 'Mutante');
            const selectedRaceData = RACIAL_FEATURES[e.target.value];
            if (selectedRaceData) {
                document.getElementById('char-speed').value = selectedRaceData.speed;
            }
            updateSheet();
        });
        document.getElementById('char-class').addEventListener('change', (e) => {
            document.getElementById('specialization-wrapper').classList.toggle('hidden', e.target.value !== 'Especialista');
            updateSheet();
        });

        // Add buttons
        document.getElementById('add-weapon-btn').addEventListener('click', addWeapon);
        document.getElementById('add-equipment-btn').addEventListener('click', addEquipment);
        document.getElementById('add-title-btn').addEventListener('click', () => addGenericItem('titles-list', 'Título'));
        document.getElementById('add-talent-btn').addEventListener('click', () => addGenericItem('talents-list', 'Talento'));
        document.getElementById('add-trait-btn').addEventListener('click', () => addGenericItem('traits-list', 'Habilidade/Traço'));

        // Save/Load/Clear
        document.getElementById('save-btn').addEventListener('click', saveCharacterToCache);
        document.getElementById('load-btn').addEventListener('click', loadCharacterFromCache);
        document.getElementById('clear-btn').addEventListener('click', clearCharacter);
        document.getElementById('download-btn').addEventListener('click', downloadCharacterFile);
        document.getElementById('upload-file').addEventListener('change', uploadCharacterFile);
        
        // Custom Dropdown Logic
        const nationalityButton = document.getElementById('char-nationality-button');
        const nationalityOptions = document.getElementById('char-nationality-options');
        nationalityButton.addEventListener('click', () => {
            nationalityOptions.classList.toggle('hidden');
        });
        
        nationalityOptions.addEventListener('click', (e) => {
            const option = e.target.closest('.custom-select-option');
            if (option) {
                const value = option.dataset.value;
                document.getElementById('char-nationality').value = value;
                const buttonContent = nationalityButton.querySelector('span');
                const flagUrl = value === 'OTHER' ? 'https://placehold.co/20x15/374151/d1d5db?text=?' : `https://flagcdn.com/w20/${value.toLowerCase()}.png`;
                buttonContent.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${COUNTRIES[value]}"> <span>${COUNTRIES[value]}</span>`;
                nationalityOptions.classList.add('hidden');
            }
        });

        window.addEventListener('click', (e) => {
            if (!document.getElementById('nationality-select-container').contains(e.target)) {
                nationalityOptions.classList.add('hidden');
            }
        });

        // Event delegation for weapon image uploads
        document.getElementById('weapons-list').addEventListener('change', (e) => {
            if (e.target && e.target.matches('.weapon-image-upload')) {
                handleWeaponImageUpload(e);
            }
        });
    }

    // --- UPDATE LOGIC ---
    function getModifier(score) {
        return Math.floor((score - 10) / 2);
    }

    function updateSheet() {
        const level = parseInt(document.getElementById('char-level').value) || 1;
        const profBonus = Math.floor((level - 1) / 4) + 2;

        // Attributes and Modifiers
        const modifiers = {};
        for (const key in ATTRIBUTES) {
            const scoreInput = document.getElementById(`score-${key.toLowerCase()}`);
            const score = parseInt(scoreInput.value) || 10;
            const mod = getModifier(score);
            modifiers[key] = mod;
            document.getElementById(`mod-${key.toLowerCase()}`).textContent = mod >= 0 ? `+${mod}` : mod;
        }

        // Saving Throws
        const selectedClassName = document.getElementById('char-class').value;
        const selectedClass = CLASSES[selectedClassName];
        
        document.querySelectorAll('[id^="prof-save-"]').forEach(cb => {
            if(!cb.dataset.manual) {
                cb.checked = false;
                cb.disabled = true;
            } else {
                cb.disabled = false;
            }
        });

        if (selectedClass) {
            selectedClass.saves.forEach(save => {
                document.getElementById(`prof-save-${save.toLowerCase()}`).checked = true;
            });

            if (selectedClass.choice) {
                selectedClass.choice.forEach(choice => {
                    const checkbox = document.getElementById(`prof-save-${choice.toLowerCase()}`);
                    checkbox.disabled = false;
                    checkbox.dataset.manual = true;
                });
            } else {
                 Object.keys(ATTRIBUTES).forEach(key => {
                    const checkbox = document.getElementById(`prof-save-${key.toLowerCase()}`);
                    if (checkbox.dataset.manual) {
                        delete checkbox.dataset.manual;
                        checkbox.checked = false;
                    }
                 });
            }
        }
        
        for (const key in ATTRIBUTES) {
            const isProficient = document.getElementById(`prof-save-${key.toLowerCase()}`).checked;
            const bonus = modifiers[key] + (isProficient ? profBonus : 0);
            document.getElementById(`bonus-save-${key.toLowerCase()}`).textContent = bonus >= 0 ? `+${bonus}` : bonus;
        }
        
        // Combat Stats
        const dexMod = modifiers.DEX;
        const vestBonus = parseInt(document.getElementById('ac-bonus-vest').value) || 0;
        const shieldBonus = parseInt(document.getElementById('ac-bonus-shield').value) || 0;
        const otherAcBonus = parseInt(document.getElementById('ac-bonus-other').value) || 0;
        document.getElementById('char-ac').textContent = 10 + dexMod + vestBonus + shieldBonus + otherAcBonus;
        
        const otherInitBonus = parseInt(document.getElementById('init-bonus-other').value) || 0;
        const totalInitiative = dexMod + otherInitBonus;
        document.getElementById('char-initiative').textContent = totalInitiative >= 0 ? `+${totalInitiative}` : totalInitiative;
        
        // Hit Dice
        if (selectedClass) {
            document.getElementById('char-hit-dice').value = `${level}d${selectedClass.hitDice}`;
        }

        // P.E.
        const peBase = 4 + Math.floor((level - 1) / 3) + (level >= 12 ? 1 : 0);
        const peStr = modifiers.FOR > 0 ? modifiers.FOR : 0;
        document.getElementById('pe-base').textContent = peBase;
        document.getElementById('pe-str').textContent = peStr;
        document.getElementById('pe-max').textContent = peBase + peStr;

        // Carga
        document.getElementById('carga-max').textContent = 8 + (modifiers.FOR * 2);
        
        updateRacialFeaturesAndSkills(modifiers, profBonus);
        updateTotals();
    }
    
    function updateRacialFeaturesAndSkills(modifiers, profBonus) {
        const featuresList = document.getElementById('features-list');
        featuresList.innerHTML = '';
        const selectedRaceName = document.getElementById('char-race').value;
        const selectedRaceData = RACIAL_FEATURES[selectedRaceName];
        
        document.getElementById('char-speed').dataset.manual = document.getElementById('char-speed').value !== selectedRaceData.speed;

        // Clear old racial profs
        document.querySelectorAll('[data-racial-prof="true"]').forEach(el => {
            el.checked = false;
            el.disabled = false;
            el.removeAttribute('data-racial-prof');
        });

        if (selectedRaceData) {
            selectedRaceData.features.forEach(feature => {
                featuresList.innerHTML += `<div class="text-sm"><p class="font-semibold text-blue-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
            });
            selectedRaceData.auto_skills.forEach(skill => {
                const skillCheckbox = document.getElementById(`prof-skill-${skill.replace(/\s+/g, '')}`);
                if (skillCheckbox) {
                    skillCheckbox.checked = true;
                    skillCheckbox.disabled = true;
                    skillCheckbox.dataset.racialProf = "true";
                }
            });

            if (selectedRaceName === 'Mutante') {
                const selectedSubtypeName = document.getElementById('char-mutant-subtype').value;
                const selectedSubtypeData = MUTANT_SUBTYPE_FEATURES[selectedSubtypeName];
                if (selectedSubtypeData) {
                    featuresList.innerHTML = ''; 
                    selectedSubtypeData.features.forEach(feature => {
                        featuresList.innerHTML += `<div class="text-sm mt-2"><p class="font-semibold text-purple-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
                    });
                    selectedSubtypeData.auto_skills.forEach(skill => {
                        const skillCheckbox = document.getElementById(`prof-skill-${skill.replace(/\s+/g, '')}`);
                        if (skillCheckbox) {
                            skillCheckbox.checked = true;
                            skillCheckbox.disabled = true;
                            skillCheckbox.dataset.racialProf = "true";
                        }
                    });
                }
            }
        }

        const selectedClassName = document.getElementById('char-class').value;
        if (selectedClassName === 'Especialista') {
            const selectedSpecName = document.getElementById('char-specialization').value;
            const selectedSpecData = SPECIALIZATIONS[selectedSpecName];
            if (selectedSpecData) {
                featuresList.innerHTML += '<hr class="border-gray-600 my-3">';
                selectedSpecData.forEach(feature => {
                    featuresList.innerHTML += `<div class="text-sm"><p class="font-semibold text-green-300">${feature.name}</p><p class="text-xs text-gray-400 pl-2">${feature.desc}</p></div>`;
                });
            }
        }
        
        for (const skill in SKILLS) {
            const attr = SKILLS[skill];
            const isProficient = document.getElementById(`prof-skill-${skill.replace(/\s+/g, '')}`).checked;
            const bonus = modifiers[attr] + (isProficient ? profBonus : 0);
            document.getElementById(`bonus-skill-${skill.replace(/\s+/g, '')}`).textContent = bonus >= 0 ? `+${bonus}` : bonus;
        }
    }

    function updateTotals() {
        let currentPE = 0;
        document.querySelectorAll('.weapon-pe, .equipment-pe').forEach(input => {
            currentPE += parseFloat(input.value) || 0;
        });
        document.getElementById('pe-current').textContent = currentPE;

        let currentCarga = 0;
        document.querySelectorAll('.equipment-carga').forEach(input => {
            currentCarga += parseFloat(input.value) || 0;
        });
        document.getElementById('carga-current').textContent = currentCarga;
    }

    function addWeapon() {
        const list = document.getElementById('weapons-list');
        const weaponId = `weapon-${Date.now()}`;
        const inputId = `weapon-image-upload-${Date.now()}`;
        const imgId = `weapon-image-${Date.now()}`;

        const weaponHTML = `
            <div id="${weaponId}" class="card bg-gray-900 p-4 flex flex-col sm:flex-row gap-4">
                <label for="${inputId}" class="weapon-image-container">
                    <img id="${imgId}" src="" class="weapon-image hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input type="file" id="${inputId}" accept="image/*" class="hidden weapon-image-upload">
                </label>
                <div class="flex-grow">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <input type="text" class="form-input" placeholder="Nome da Arma">
                        <input type="text" class="form-input" placeholder="Dano">
                        <input type="text" class="form-input" placeholder="Alcance">
                        <input type="number" class="form-input weapon-pe" placeholder="P.E.">
                    </div>
                    <textarea class="form-textarea mt-3" rows="2" placeholder="Vantagens, desvantagens, acessórios..."></textarea>
                    <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs mt-3" onclick="document.getElementById('${weaponId}').remove(); updateTotals();">Remover</button>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', weaponHTML);
    }

    function addEquipment() {
        const list = document.getElementById('equipment-list');
        const equipId = `equip-${Date.now()}`;
        const equipHTML = `
            <div id="${equipId}" class="card bg-gray-900 p-3">
                <div class="flex items-center gap-3">
                    <input type="text" class="form-input flex-grow" placeholder="Nome do Item">
                    <input type="number" step="0.5" class="form-input w-24 equipment-carga" placeholder="Carga">
                    <input type="number" step="0.5" class="form-input w-24 equipment-pe" placeholder="P.E.">
                    <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs" onclick="document.getElementById('${equipId}').remove(); updateTotals();">X</button>
                </div>
                <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição do item..."></textarea>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', equipHTML);
    }
    
    function addGenericItem(listId, placeholder) {
        const list = document.getElementById(listId);
        const itemId = `item-${Date.now()}`;
        const itemHTML = `
             <div id="${itemId}" class="card bg-gray-900 p-3">
                <div class="flex items-center gap-3">
                    <input type="text" class="form-input flex-grow" placeholder="Nome do ${placeholder}">
                    <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs" onclick="document.getElementById('${itemId}').remove()">X</button>
                </div>
                <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição..."></textarea>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', itemHTML);
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const portraitImg = document.getElementById('char-portrait');
            const placeholderIcon = document.getElementById('portrait-placeholder');

            portraitImg.src = e.target.result;
            portraitImg.classList.remove('hidden');
            if(placeholderIcon) placeholderIcon.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
    
    function handleWeaponImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        const imgElement = event.target.closest('.weapon-image-container').querySelector('.weapon-image');
        const placeholderIcon = event.target.closest('.weapon-image-container').querySelector('svg');

        reader.onload = (e) => {
            imgElement.src = e.target.result;
            imgElement.classList.remove('hidden');
            if(placeholderIcon) placeholderIcon.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    // --- DATA PERSISTENCE ---

    function getCharacterDataAsObject() {
        const data = {
            inputs: {},
            checkboxes: {},
            textareas: {},
            selects: {},
            nationality: document.getElementById('char-nationality').value,
            portraitSrc: document.getElementById('char-portrait').src,
            dynamic: {
                weapons: [],
                equipment: [],
                titles: [],
                talents: [],
                traits: []
            }
        };

        document.querySelectorAll('input[type="text"], input[type="number"]').forEach(el => {
            if (!el.disabled) data.inputs[el.id] = el.value;
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(el => {
            if (el.dataset.manual || !el.disabled) {
                data.checkboxes[el.id] = el.checked;
            }
        });
        document.querySelectorAll('textarea').forEach(el => data.textareas[el.id] = el.value);
        document.querySelectorAll('select').forEach(el => data.selects[el.id] = el.value);
        
        document.querySelectorAll('#weapons-list > div').forEach(div => {
            data.dynamic.weapons.push({
                name: div.querySelector('input[placeholder="Nome da Arma"]').value,
                damage: div.querySelector('input[placeholder="Dano"]').value,
                range: div.querySelector('input[placeholder="Alcance"]').value,
                pe: div.querySelector('.weapon-pe').value,
                desc: div.querySelector('textarea').value,
                imageSrc: div.querySelector('.weapon-image').src
            });
        });
        document.querySelectorAll('#equipment-list > div').forEach(div => {
            data.dynamic.equipment.push({
                name: div.querySelector('input[type="text"]').value,
                carga: div.querySelector('.equipment-carga').value,
                pe: div.querySelector('.equipment-pe').value,
                desc: div.querySelector('textarea').value,
            });
        });
        document.querySelectorAll('#titles-list > div, #talents-list > div, #traits-list > div').forEach(div => {
            const item = {
                name: div.querySelector('input[type="text"]').value,
                desc: div.querySelector('textarea').value,
            };
            if(div.parentElement.id === 'titles-list') data.dynamic.titles.push(item);
            else if(div.parentElement.id === 'talents-list') data.dynamic.talents.push(item);
            else if(div.parentElement.id === 'traits-list') data.dynamic.traits.push(item);
        });
        return data;
    }

    function loadCharacterFromData(data) {
        document.getElementById('weapons-list').innerHTML = '';
        document.getElementById('equipment-list').innerHTML = '';
        document.getElementById('titles-list').innerHTML = '';
        document.getElementById('talents-list').innerHTML = '';
        document.getElementById('traits-list').innerHTML = '';

        for(const id in data.inputs) if(document.getElementById(id)) document.getElementById(id).value = data.inputs[id];
        for(const id in data.checkboxes) if(document.getElementById(id)) document.getElementById(id).checked = data.checkboxes[id];
        for(const id in data.textareas) if(document.getElementById(id)) document.getElementById(id).value = data.textareas[id];
        for(const id in data.selects) if(document.getElementById(id)) document.getElementById(id).value = data.selects[id];

        if (data.nationality) {
            const value = data.nationality;
            document.getElementById('char-nationality').value = value;
            const buttonContent = document.getElementById('char-nationality-button').querySelector('span');
            const flagUrl = value === 'OTHER' ? 'https://placehold.co/20x15/374151/d1d5db?text=?' : `https://flagcdn.com/w20/${value.toLowerCase()}.png`;
            buttonContent.innerHTML = `<img src="${flagUrl}" alt="Bandeira de ${COUNTRIES[value]}"> <span>${COUNTRIES[value]}</span>`;
        }

        if (data.portraitSrc && data.portraitSrc.startsWith('data:image')) {
            const portraitImg = document.getElementById('char-portrait');
            const placeholderIcon = document.getElementById('portrait-placeholder');
            portraitImg.src = data.portraitSrc;
            portraitImg.classList.remove('hidden');
            if(placeholderIcon) placeholderIcon.classList.add('hidden');
        }

        document.getElementById('char-race').dispatchEvent(new Event('change'));
        document.getElementById('char-class').dispatchEvent(new Event('change'));

        data.dynamic.weapons.forEach(w => {
            addWeapon();
            const last = document.querySelector('#weapons-list > div:last-child');
            last.querySelector('input[placeholder="Nome da Arma"]').value = w.name;
            last.querySelector('input[placeholder="Dano"]').value = w.damage;
            last.querySelector('input[placeholder="Alcance"]').value = w.range;
            last.querySelector('.weapon-pe').value = w.pe;
            last.querySelector('textarea').value = w.desc;
            if (w.imageSrc && w.imageSrc.startsWith('data:image')) {
                const img = last.querySelector('.weapon-image');
                const placeholder = last.querySelector('svg');
                img.src = w.imageSrc;
                img.classList.remove('hidden');
                placeholder.classList.add('hidden');
            }
        });
        data.dynamic.equipment.forEach(e => {
            addEquipment();
            const last = document.querySelector('#equipment-list > div:last-child');
            last.querySelector('input[type="text"]').value = e.name;
            last.querySelector('.equipment-carga').value = e.carga;
            last.querySelector('.equipment-pe').value = e.pe;
            last.querySelector('textarea').value = e.desc;
        });
        data.dynamic.titles.forEach(t => {
            addGenericItem('titles-list', 'Título');
            const last = document.querySelector('#titles-list > div:last-child');
            last.querySelector('input[type="text"]').value = t.name;
            last.querySelector('textarea').value = t.desc;
        });
        data.dynamic.talents.forEach(t => {
            addGenericItem('talents-list', 'Talento');
            const last = document.querySelector('#talents-list > div:last-child');
            last.querySelector('input[type="text"]').value = t.name;
            last.querySelector('textarea').value = t.desc;
        });
        data.dynamic.traits.forEach(t => {
            addGenericItem('traits-list', 'Habilidade/Traço');
            const last = document.querySelector('#traits-list > div:last-child');
            last.querySelector('input[type="text"]').value = t.name;
            last.querySelector('textarea').value = t.desc;
        });

        updateSheet();
    }

    function saveCharacterToCache() {
        const data = getCharacterDataAsObject();
        localStorage.setItem('projeto141Character', JSON.stringify(data));
        alert('Personagem salvo no cache do navegador!');
    }

    function loadCharacterFromCache() {
        const dataString = localStorage.getItem('projeto141Character');
        if (!dataString) {
            alert('Nenhum personagem salvo no cache encontrado.');
            return;
        }
        const data = JSON.parse(dataString);
        loadCharacterFromData(data);
        alert('Personagem carregado do cache!');
    }
    
    function downloadCharacterFile() {
        const data = getCharacterDataAsObject();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const charName = document.getElementById('char-name').value || 'personagem';
        a.href = url;
        a.download = `${charName.replace(/\s+/g, '_')}-projeto141.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function uploadCharacterFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                loadCharacterFromData(data);
                alert('Personagem carregado do arquivo!');
            } catch (error) {
                alert('Erro ao carregar o arquivo. Verifique se o arquivo é válido.');
                console.error("Erro ao parsear JSON:", error);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input for re-uploading same file
    }
    
    function clearCharacter() {
        if (confirm('Tem certeza que deseja limpar toda a ficha? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('projeto141Character');
            window.location.reload();
        }
    }

    init();
    });
 