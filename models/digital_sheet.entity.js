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
    "Assalto": {
        "Commando": [
            { name: "ESTILO DE COMBATE", desc: "Nível 1: Escolha um: Precisão (+2), Defesa (+1 CA), Armas Pesadas (rerola 1s e 2s no dano), Ponto Fraco (+2 dano), Mobilidade (+3m deslocamento). Ganha outro no nível 9." },
            { name: "NÃO VOU COM A SUA CARA...", desc: "Nível 3: No início do combate, marque um 'Alvo'. Escolha: adicionar proficiência no dano contra ele OU ter vantagem em testes de DES e CON causados por ele." },
            { name: "SURTO DE AÇÃO", desc: "Nível 3: Uma vez por descanso, ganha uma ação extra." },
            { name: "TIRO RÁPIDO", desc: "Nível 5: Pode fazer um disparo com uma ação bônus (com desvantagem)." },
            { name: "TÁTICAS DEFENSIVAS", desc: "Nível 7: Escolha um: Escapar da Horda, Defesa Contra Múltiplos Ataques, ou Vontade de Aço." },
            { name: "FORMAÇÃO!", desc: "Nível 10: Fora de combate, pode definir a ordem de iniciativa do grupo. Apenas você rola iniciativa." },
            { name: "MANDA MAIS!", desc: "Nível 12: Mais difícil de ser suprimido (+1 inimigo necessário)." },
            { name: "PONTARIA AGUÇADA", desc: "Nível 15: Remove a desvantagem do Tiro Rápido. Ganha vantagem no primeiro ataque à distância do turno." }
        ],
        "Hazmat": [
            { name: "MESTRADO EM QUÍMICA", desc: "Nível 1: Equipamentos de área de efeito (AOE) que você produz duram +2 turnos." },
            { name: "SURTO DE AÇÃO", desc: "Nível 3: Uma vez por descanso, ganha uma ação extra." },
            { name: "RESPIRAR FUNDO", desc: "Nível 3: Uma vez por descanso, recupera 1d12 + Nível + CON de vida como ação bônus." },
            { name: "NÃO FARÁ EFEITO!", desc: "Nível 5: Ganha resistência a 2 tipos de dano/efeitos (Envenenado, Queimado, etc.)." },
            { name: "CONTROLADOR DE ÁREA", desc: "Nível 7: Ganha bônus de deslocamento e precisão em áreas de efeito que você tem resistência." },
            { name: "DESCONTAMINADO", desc: "Nível 10: Adiciona seu bônus de proficiência ao dano contra alvos em sua área de efeito." },
            { name: "ESTE É O MEU MUNDO!", desc: "Nível 12: Efeitos que afetam a visão em gases são reduzidos. Ganha 3m de visão verdadeira e +2 de CA em áreas de efeito com resistência." },
            { name: "NÃO ENTRE!", desc: "Nível 15: Em áreas contaminadas por você, ganha vantagem no acerto e uma ação de disparo bônus." }
        ]
    },
    "Corpo a corpo": {
        "Espadachim": [
            { name: "ARMA", desc: "Nível 1: Proficiência em armas brancas de médio porte." },
            { name: "SUPERIORIDADE EM COMBATE", desc: "Nível 1: Aprende 3 manobras e ganha 4 dados de superioridade (d8). Aprende mais manobras e ganha mais dados em níveis superiores." },
            { name: "ATAQUE EXTRA", desc: "Nível 3: Pode atacar uma vez a mais com sua arma corpo a corpo." },
            { name: "MESTRE DAS LÂMINAS", desc: "Nível 5: No primeiro turno, pode sacar a arma e atacar um inimigo que ainda não agiu com vantagem, adicionando sua iniciativa ao dano." },
            { name: "ATLETISMO EXTRAORDINÁRIO", desc: "Nível 7: Adiciona metade da proficiência a testes de FOR, DES ou CON não proficientes. Salto em distância aprimorado." },
            { name: "SOBREVIVENTE", desc: "Nível 10: Recupera 5 + mod CON de vida no início do seu turno se estiver com menos da metade da vida." },
            { name: "ATAQUE EXTRA (2)", desc: "Nível 12: Pode atacar duas vezes a mais (total de 3 ataques por ação)." },
            { name: "SUPERIORIDADE APRIMORADA", desc: "Nível 14: Seus dados de superioridade se tornam d10s (d12s no nível 18)." },
            { name: "IMPLACÁVEL", desc: "Nível 16: Se rolar iniciativa sem dados de superioridade, recupera um." }
        ],
        "Selvagem": [
            { name: "ARMA", desc: "Nível 1: Proficiência em armas pesadas de duas mãos." },
            { name: "FÚRIA", desc: "Nível 1: Entra em fúria como ação bônus. Ganha Vantagem em testes de FOR, bônus no dano, resistência a dano físico e +1 disparo com armas de fogo." },
            { name: "ATAQUE EXTRA", desc: "Nível 3: Pode atacar uma vez a mais com sua arma corpo a corpo." },
            { name: "FRENESI", desc: "Nível 5: Enquanto em fúria, pode fazer um ataque corpo-a-corpo como ação bônus (causa exaustão)." },
            { name: "FÚRIA INCONSCIENTE", desc: "Nível 7: Não pode ser atordoado ou amedrontado enquanto em fúria." },
            { name: "PRESENÇA INTIMIDANTE", desc: "Nível 10: Usa sua ação para amedrontar uma criatura." },
            { name: "ATAQUE EXTRA (2)", desc: "Nível 12: Pode atacar duas vezes a mais (total de 3 ataques por ação)." },
            { name: "RETALIAÇÃO", desc: "Nível 14: Usa sua reação para atacar uma criatura que te causou dano." },
            { name: "CAMPEÃO", desc: "Nível 16: Aumenta FOR e CON em 4 (máximo 24)." }
        ],
        "Brawler": [
            { name: "ARMA", desc: "Nível 1: Proficiência em manoplas." },
            { name: "PONTOS DE ESTAMINA", desc: "Nível 1: Ganha pontos de estamina iguais ao seu nível para usar em técnicas." },
            { name: "TÉCNICAS DO FERRO", desc: "Nível 1: Adiciona mod CON ou DES à CA. Pode usar Punho Pesado, Defesa Blindada ou Posição Montanha." },
            { name: "ATAQUE EXTRA", desc: "Nível 3: Pode atacar uma vez a mais com sua arma corpo a corpo." },
            { name: "DESARME!", desc: "Nível 5: Gasta 2 estamina para tentar desarmar um oponente." },
            { name: "DEFLETIR PROJÉTEIS", desc: "Nível 7: Usa reação para reduzir o dano de ataques à distância." },
            { name: "VIGOR DE DIAMANTE", desc: "Nível 10: Ganha proficiência em todos os testes de resistência. Pode gastar estamina para rerrolar um teste falho." },
            { name: "ATAQUE EXTRA (2)", desc: "Nível 12: Pode atacar duas vezes a mais (total de 3 ataques por ação)." },
            { name: "EVASÃO", desc: "Nível 14: Em testes de DES para meio dano, não toma dano se passar e metade se falhar. Pode revidar explosivos." },
            { name: "CONTRA-ATAQUE DEVASTADOR", desc: "Nível 16: Gasta 3 estamina como reação para fazer um ataque crítico com Punho Pesado." }
        ]
    },
    "Suporte": {
        "Medico": [
            { name: "PROFICIÊNCIA", desc: "Nível 1: Ganha proficiência em Medicina." },
            { name: "A FORMA CERTA", desc: "Nível 1: Pode usar mod INT ou SAB x2 em rolagens de cura." },
            { name: "CURA IMPROVISADA", desc: "Nível 3: Cura 6 x (nível de médico) em um aliado." },
            { name: "EFICIENTE", desc: "Nível 5: Vantagem em todas as rolagens de cura." },
            { name: "COBAIA", desc: "Nível 7: Pode produzir 2 tipos de componentes químicos (Overdose, Sonífero, Analgésico, etc.)." },
            { name: "FOLEGO EXTRA", desc: "Nível 7: Uma vez por descanso, recupera 1d12 + Nível de Operador de vida." },
            { name: "NÃO ME ATRAPALHA!", desc: "Nível 12: Pode atacar com armas leves como ação bônus enquanto cura (com desvantagem)." },
            { name: "HORA DE DAR UMA RESPIRADA...", desc: "Nível 14: Uma vez por descanso longo, pode gastar 1 hora para curar completamente aliados e remover a maioria dos debuffs." }
        ],
        "Pilar": [
            { name: "POSTURA DEFENSIVA", desc: "Nível 1: Com colete e escudo, ganha resistência a dano físico, +3 CA como reação e vantagem em testes de FOR e DES. Deslocamento reduzido." },
            { name: "FOLEGO EXTRA", desc: "Nível 3: Uma vez por descanso, recupera 1d12 + Nível de Operador de vida." },
            { name: "COBERTURA DE FERRO", desc: "Nível 5: Inimigos têm desvantagem contra aliados a 1m de você." },
            { name: "APOIO", desc: "Nível 7: Pode usar armas maiores com seu escudo e não tem mais desvantagem com pistolas." },
            { name: "CALEJADO", desc: "Nível 10: Ganha +2 de CON (máximo 24)." },
            { name: "PROTEGER ALIADO", desc: "Nível 12: Usa ação bônus para dar seu bônus de escudo a um aliado adjacente." },
            { name: "SURTO DEFENSIVO", desc: "Nível 14: Duas vezes por descanso longo, pode usar reação para ganhar vantagem em um teste de resistência." },
            { name: "SOBREVIVENTE", desc: "Nível 16: Recupera 5 + mod CON de vida no início do seu turno se estiver com menos da metade da vida." }
        ],
        "Drudge": [
            { name: "SENTA O DEDO!", desc: "Nível 1: Pode gastar o dobro de disparos para atacar em cone de 15m ou adicionar +1 dado de acerto e meio dano extra." },
            { name: "BURRO DE CARGA", desc: "Nível 3: Carga base aumentada de acordo com o colete." },
            { name: "FOLEGO EXTRA", desc: "Nível 3: Uma vez por descanso, recupera 1d12 + Nível de Operador de vida." },
            { name: "QUER UMA AJUDINHA?", desc: "Nível 5: Pode usar equipamentos e itens em aliados como ação bônus." },
            { name: "ENTÃO ASSIM FUNCIONA!", desc: "Nível 7: Pode aprender uma habilidade de nível 8 ou menor de uma subclasse aliada." },
            { name: "EFETIVAMENTE PESADO", desc: "Nível 10: Ganha 3 P.E. extras apenas para equipamentos." },
            { name: "PEGAR E CARREGAR", desc: "Nível 12: Pode usar itens lançáveis como ação bônus e carregar aliados sem penalidade." },
            { name: "NÃO TO TE ESCUTANDO!", desc: "Nível 15: Pode suprimir um inimigo sozinho com LMG ou AR gastando o dobro de munição." }
        ]
    },
    "Cobra": {
        "Espião": [
            { name: "MOBILIDADE", desc: "Passiva: Esconder, Disparar e Desengajar como ação bônus. Metade do dano de queda." },
            { name: "ATAQUE FURTIVO", desc: "Nível 1: Causa dano extra (escala com o nível) em ataques com vantagem." },
            { name: "AÇÃO ARDILOSA", desc: "Nível 3: Ganha uma ação bônus extra por turno (mais uma no nível 8)." },
            { name: "MÃO VELOZ", desc: "Nível 5: Saca e ataca com uma arma leve escondida como ação bônus com vantagem (1x por descanso, aumenta usos depois)." },
            { name: "CQC", desc: "Nível 7: Agarrão como ação bônus. Munições não letais sem desvantagem." },
            { name: "ESPECIALIZAÇÃO", desc: "Nível 9: Dobra a proficiência em duas perícias/ferramentas escolhidas." },
            { name: "MOVIMENTO SILENCIOSO", desc: "Nível 10: Pode se mover sem ser detectado por 3 rodadas em cobertura. Primeiro ataque causa +1d6 de dano." },
            { name: "ESPECIALIZAÇÃO EM INFILTRAÇÃO", desc: "Nível 12: Pode criar identidades falsas." },
            { name: "REFLEXOS DE ESPIÃO", desc: "Nível 15: Ganha um segundo turno na primeira rodada de combate (iniciativa - 10)." }
        ],
        "Assassino": [
            { name: "MOBILIDADE", desc: "Passiva: Esconder, Disparar e Desengajar como ação bônus. Metade do dano de queda." },
            { name: "ATAQUE FURTIVO", desc: "Nível 1: Causa dano extra (escala com o nível) em ataques com vantagem." },
            { name: "AÇÃO ARDILOSA", desc: "Nível 3: Ganha uma ação bônus extra por turno (mais uma no nível 10)." },
            { name: "FURTIVIDADE SUPREMA", desc: "Nível 5: Vantagem em Furtividade se mover metade do deslocamento." },
            { name: "CRÍTICO SUPERIOR", desc: "Nível 9: Margem de crítico aumentada para 18-20." },
            { name: "ELUSIVO", desc: "Nível 10: Ataques contra você não podem ter vantagem." },
            { name: "ASSASSINAR", desc: "Nível 10: Vantagem contra criaturas que não agiram. Acertos em criaturas surpresas são críticos." },
            { name: "IMPOSTOR", desc: "Nível 12: Pode imitar a fala, escrita e comportamento de outros." },
            { name: "GOLPE LETAL", desc: "Nível 15: Alvos surpresos devem fazer um teste de CON ou o dano do seu ataque é dobrado." }
        ],
        "Lâmina": [
            { name: "MOBILIDADE", desc: "Passiva: Esconder, Disparar e Desengajar como ação bônus. Metade do dano de queda." },
            { name: "ATAQUE FURTIVO", desc: "Nível 1: Causa dano extra (escala com o nível) em ataques com vantagem." },
            { name: "AÇÃO ARDILOSA", desc: "Nível 3: Ganha uma ação bônus extra por turno (mais uma no nível 10)." },
            { name: "MÃO VELOZ", desc: "Nível 5: Saca e ataca com uma arma leve escondida como ação bônus com vantagem (usos aumentam com o nível)." },
            { name: "ATAQUE EXTRA", desc: "Nível 7: Ganha ataques extras (2 no 7, 3 no 11, 4 no 20)." },
            { name: "MOVIMENTO RÁPIDO", desc: "Nível 10: Deslocamento aumenta em 3 metros sem armadura pesada." },
            { name: "INSTINTO", desc: "Nível 12: Vantagem na iniciativa e pode agir se estiver surpreso." },
            { name: "CRÍTICO BRUTAL", desc: "Nível 14: Rola dados de dano adicionais em acertos críticos." },
            { name: "GOLPE DE SORTE", desc: "Nível 16: Pode transformar uma falha em um acerto ou um teste falho em um 20 natural (1x por descanso)." }
        ]
    },
    "Franco-atirador": {
        "Cowboy": [
            { name: "PASSIVA", desc: "Armas podem varar inimigos com 'Overkill'." },
            { name: "TÉCNICAS DE TIRO", desc: "Nível 1: Escolha uma técnica (Tiro Atordoante, Certeiro, etc.). Ganha mais nos níveis 6, 9, 12, 15." },
            { name: "ESTILO DE TIRO", desc: "Nível 3: Escolha um estilo (Vigia, Combatente, Fantasma, Caçador de Recompensa)." },
            { name: "VANTAGEM", desc: "Nível 5: Ignora terreno difícil, vantagem na iniciativa e no primeiro turno contra quem não agiu." },
            { name: "PÉS RÁPIDOS", desc: "Nível 7: Disparada e Desengajar como ação bônus." },
            { name: "RAJADA DO CAÇADOR", desc: "Nível 10: Se errar um ataque, pode fazer outro (1x por turno)." },
            { name: "ESQUIVA DO PERSEGUIDOR", desc: "Nível 12: Usa reação para impor desvantagem em um ataque contra você (1x por combate)." },
            { name: "JOGADA DE MESTRE", desc: "Nível 14: Usa reação para atirar em objetos lançados." },
            { name: "CRÍTICO HEMORRÁGICO", desc: "Nível 16: Críticos causam dano de sangramento no turno seguinte do alvo." }
        ],
        "Sniper": [
            { name: "PASSIVA", desc: "Armas podem varar inimigos com 'Overkill'." },
            { name: "FORA DE ALCANCE", desc: "Nível 1: Após um teste de Furtividade bem-sucedido, pode gastar movimento para um disparo extra." },
            { name: "ESTILO DE TIRO", desc: "Nível 3: Escolha um estilo (Vigia, Combatente, Fantasma, Caçador de Recompensa)." },
            { name: "PRECISÃO", desc: "Nível 5: Se não se mover, adiciona mod DES ou SAB ao teste de acerto." },
            { name: "BATER EM RETIRADA", desc: "Nível 7: Se for localizado, ganha deslocamento bônus por 3 turnos." },
            { name: "CRÍTICO APRIMORADO", desc: "Nível 10: Margem de crítico aumentada para 19-20." },
            { name: "RAJADA DO RASTREADOR", desc: "Nível 12: Se errar um ataque, pode fazer outro (1x por turno)." },
            { name: "DESAPARECER", desc: "Nível 14: Pode usar Esconder como ação bônus. Não pode ser rastreado por meios não-tecnológicos." },
            { name: "UM TIRO, UMA MORTE", desc: "Nível 16: Alvos com 20 PV ou menos devem passar em um teste de CON ou caem a 0 PV. (30 PV em um crítico)." }
        ],
        "Caçador": [
            { name: "PASSIVA", desc: "Armas podem varar inimigos com 'Overkill'." },
            { name: "COMPANHEIRO ANIMAL", desc: "Nível 1: Ganha um companheiro animal leal." },
            { name: "ESTILO DE TIRO", desc: "Nível 3: Escolha um estilo (Vigia, Combatente, Fantasma, Caçador de Recompensa)." },
            { name: "EXPLORADOR NATURAL", desc: "Nível 5: Ignora terreno difícil, vantagem na iniciativa e no primeiro turno contra quem não agiu." },
            { name: "CAÇADOR EXPERIENTE", desc: "Nível 7: Ganha proficiência com +2 tipos de armas." },
            { name: "ATAQUE COORDENADO", desc: "Nível 10: Quando você ataca, seu companheiro pode usar a reação para atacar." },
            { name: "RAJADA DO CAÇADOR", desc: "Nível 12: Se errar um ataque, pode fazer outro (1x por turno)." },
            { name: "ESQUIVA DO PERSEGUIDOR", desc: "Nível 14: Usa reação para impor desvantagem em um ataque contra você (1x por combate)." },
            { name: "MATADOR DE INIMIGOS", desc: "Nível 16: Uma vez por turno, pode adicionar seu mod SAB ao ataque ou dano." }
        ]
    },
    "Hacker": {
        "Criador": [
            { name: "CONSTRUIR AUTÔMATO", desc: "Nível 1: Pode fabricar autômatos que obedecem seus comandos." },
            { name: "METACODIGO", desc: "Nível 3: Aprende 2 metacódigos para aprimorar suas criações (Equipar, Resistir, etc.). Ganha mais com o nível." },
            { name: "REPARAR AUTOMATO", desc: "Nível 5: Pode reparar autômatos em combate usando ferramentas." },
            { name: "ENERGIZADO", desc: "Nível 7: Adiciona bônus de proficiência à energia de equipamentos (dobrado nos que você criou)." },
            { name: "ENGENHARIA REVERSA", desc: "Nível 10: Pode aprender a reproduzir máquinas desativadas." },
            { name: "REFORÇAR AUTOMATO", desc: "Nível 12: Seus autômatos ganham resistência a um tipo de dano físico e vantagem em testes de resistência." },
            { name: "DISPOSITIVO DE LOCALIZAÇÃO", desc: "Nível 15: Pode chamar seu autômato para a localização de um alvo." }
        ],
        "Invasor": [
            { name: "USOS DO CÓDIGO", desc: "Nível 1: Ganha usos de invasão que aumentam com o nível." },
            { name: "INVASÃO DE PRIVACIDADE", desc: "Nível 1: Pode invadir, atrapalhar ou controlar entidades tecnológicas com um teste de INT." },
            { name: "METACODIGO", desc: "Nível 3: Aprende 2 metacódigos para aprimorar suas invasões (Alvo Duplo, Código Complexo, etc.). Ganha mais com o nível." },
            { name: "CURTO CIRCUITO", desc: "Nível 5: Pode instalar um vírus que causa dano contínuo (1d4) em uma máquina." },
            { name: "TOMAR CONTROLE", desc: "Nível 7: Pode invadir e controlar um inimigo por 1d4 turnos (requer concentração)." },
            { name: "PONTO FRACO", desc: "Nível 10: Após um crítico em 'invasão' ou 'atrapalhar', adiciona prof + mod INT ao dano do próximo ataque." },
            { name: "REMOVER", desc: "Nível 13: Pode remover temporariamente uma habilidade/equipamento de uma entidade." },
            { name: "CONTROLE TOTAL", desc: "Nível 15: Após invadir, pode fortalecer ou atrapalhar o alvo, adicionando ou subtraindo (INT + Prof) do dano dele." }
        ]
    },
    "Especialista": {
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
    }
};

class DigitalSheet {
    constructor(ATTRIBUTES, SKILLS, COUNTRIES, RACIAL_FEATURES, CLASSES, MUTANT_SUBTYPE_FEATURES) {
        this.ATTRIBUTES = ATTRIBUTES;
        this.SKILLS = SKILLS;
        this.COUNTRIES = COUNTRIES;
        this.RACIAL_FEATURES = RACIAL_FEATURES;
        this.CLASSES = CLASSES;
        this.MUTANT_SUBTYPE_FEATURES = MUTANT_SUBTYPE_FEATURES;
     }
}

//TODO: Criar arquivo entity para as classes, features raciais, features mutantes, talentos, países, usando ENUMs e etc

// Criar arquivo digital sheet entity que junta tudo isso em um só arquivo, e formata ele para ser utilizado. 
// Isso é melhor que usar objeto literais pois posso adicionar uma feature em que o usuário pode criar novas classes ou features raciais, além das que já existem.
// ESPECIALIZAÇÕES PRECISAM PERTENCER A CLASSE EM ESPECIFICO, NÃO PODEM SER ADICIONADAS A OUTRAS CLASSES. (APARECER SOMENTE QUANDO VOCÊ TEM A CLASSE QUE A PERTENCE.)
// VER SE JÁ EXISTE FUNÇÃO PARA CRIAR NOVAS FEATURES PRO PERSONAGEM, COMO POR EXEMPLO, UMA SKILL NOVA, OU NOVA FEATURE DE CLASSE/RAÇA.

// CRIAR ARQUVIVOS ENTITIES PARA CADA COISA NECESSÁRIA (USANDO ENUMS ou CLASSES PARA ISSO) > PASSAR TUDO ISSO PARA UM DIGITAL SHEET ENTITY, 
// QUE POSSUIRÁ TODAS ESSAS INFORMAÇÕES > SEPARARO RESTO DO CÓDIGO USADO E REFATORAR EM DIFERENTES ARQUIVOS, USANDO IMPORTS (EXPORT CLASSES NOS OUTROS ARQUIVOS)

// PARA MUTANTES > FAZER LÓGICA PARA ELES ESCOLHEREM FEATURES DO SUBTIPO DELES

// MUDAR FORMA QUE AS PROPRIEDADES DO OBJETOS DAS FEATURES FUNCIONAM, ELAS ESTÃO COMO STRING, PODERIAM SER SOMENTE PROPRIEDADES MESMO