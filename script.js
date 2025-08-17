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
    
    // --- INITIALIZATION ---
    function init() {
        populateDropdowns();
        renderAttributes();
        renderSavingThrows();
        renderSkills();
        setupEventListeners();
        updateSpecializationDropdown(); // Call this initially
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

    function updateSpecializationDropdown() {
        const classSelect = document.getElementById('char-class');
        const specWrapper = document.getElementById('specialization-wrapper');
        const specSelect = document.getElementById('char-specialization');
        const selectedClass = classSelect.value;

        const classSpecs = SPECIALIZATIONS[selectedClass];

        if (classSpecs) {
            specWrapper.classList.remove('hidden');
            specSelect.innerHTML = ''; // Clear existing options
            Object.keys(classSpecs).forEach(specName => {
                const option = document.createElement('option');
                option.value = specName;
                option.textContent = specName;
                specSelect.appendChild(option);
            });
        } else {
            specWrapper.classList.add('hidden');
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
        document.getElementById('apply-background-btn').addEventListener('click', applyCustomBackground);

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
            updateSpecializationDropdown();
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

        // Event delegation for dynamic cards
        document.body.addEventListener('click', handleCardActions);
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
        const classSpecs = SPECIALIZATIONS[selectedClassName];
        if (classSpecs) {
            const selectedSpecName = document.getElementById('char-specialization').value;
            const selectedSpecData = classSpecs[selectedSpecName];
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
        document.querySelectorAll('.weapon-pe').forEach(input => {
            currentPE += parseFloat(input.value) || 0;
        });
        document.querySelectorAll('.equipment-pe').forEach(input => {
            currentPE += parseFloat(input.value) || 0;
        });
        document.getElementById('pe-current').textContent = currentPE;

        let currentCarga = 0;
        document.querySelectorAll('.equipment-carga').forEach(input => {
            currentCarga += parseFloat(input.value) || 0;
        });
        document.getElementById('carga-current').textContent = currentCarga;
    }

    // --- DYNAMIC ITEM MANAGEMENT ---

    function handleCardActions(e) {
        const card = e.target.closest('.dynamic-card');
        if (!card) return;

        if (e.target.matches('.save-card-btn')) {
            const inputs = card.querySelectorAll('.edit-mode [data-value-source]');
            inputs.forEach(input => {
                const key = input.dataset.valueSource;
                const viewElement = card.querySelector(`.view-mode [data-value-target="${key}"]`);
                
                card.dataset[key] = input.value;
                if (viewElement) {
                    viewElement.textContent = input.value;
                }
            });
            
            const weaponImg = card.querySelector('.edit-mode .weapon-image');
            if (weaponImg && weaponImg.src) {
                const viewImg = card.querySelector('.view-mode .weapon-image-view');
                card.dataset.imageSrc = weaponImg.src;
                if (viewImg) {
                    viewImg.src = weaponImg.src;
                    viewImg.classList.remove('hidden');
                }
            }

            card.classList.add('view-state');
        } else if (e.target.matches('.edit-card-btn')) {
            const inputs = card.querySelectorAll('.edit-mode [data-value-source]');
            inputs.forEach(input => {
                const key = input.dataset.valueSource;
                input.value = card.dataset[key] || '';
            });
            card.classList.remove('view-state');
        } else if (e.target.matches('.remove-card-btn')) {
            if (confirm('Tem certeza que deseja excluir este item?')) {
                card.remove();
                updateTotals();
            }
        }
    }

    function addWeapon() {
        const list = document.getElementById('weapons-list');
        const id = Date.now();
        const weaponId = `weapon-${id}`;
        const inputId = `weapon-image-upload-${id}`;
        const imgId = `weapon-image-${id}`;

        const weaponHTML = `
            <div id="${weaponId}" class="card bg-gray-900 p-4 flex flex-col sm:flex-row gap-4 dynamic-card">
                <!-- View Mode -->
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
                                    <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">X</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 mt-2 text-sm">
                                <div><strong>Dano:</strong> <span data-value-target="damage"></span></div>
                                <div><strong>Alcance:</strong> <span data-value-target="range"></span></div>
                                <div><strong>Troca:</strong> <span data-value-target="swap"></span></div>
                                <div><strong>P.E.:</strong> <span data-value-target="pe" class="weapon-pe-view"></span></div>
                            </div>
                            <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                        </div>
                    </div>
                </div>
                <!-- Edit Mode -->
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
                            </div>
                            <textarea class="form-textarea mt-3" rows="2" placeholder="Vantagens, desvantagens, acessórios..." data-value-source="desc"></textarea>
                            <div class="flex gap-2 mt-3">
                                <button class="btn btn-secondary bg-green-600 hover:bg-green-700 text-xs save-card-btn">Salvar</button>
                                <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', weaponHTML);
    }

    function addEquipment() {
        const list = document.getElementById('equipment-list');
        const id = Date.now();
        const equipId = `equip-${id}`;
        const equipHTML = `
            <div id="${equipId}" class="card bg-gray-900 p-3 dynamic-card">
                <!-- View Mode -->
                <div class="view-mode">
                    <div class="flex justify-between items-start">
                        <h3 class="text-md font-bold text-white" data-value-target="name">Nome do Item</h3>
                        <div>
                            <button class="btn btn-secondary text-xs edit-card-btn">Editar</button>
                            <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">X</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-x-4 mt-2 text-sm">
                        <div><strong>Carga:</strong> <span data-value-target="carga" class="equipment-carga-view"></span></div>
                        <div><strong>P.E.:</strong> <span data-value-target="pe" class="equipment-pe-view"></span></div>
                    </div>
                    <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                </div>
                <!-- Edit Mode -->
                <div class="edit-mode">
                    <div class="flex items-center gap-3">
                        <input type="text" class="form-input flex-grow" placeholder="Nome do Item" data-value-source="name">
                        <input type="number" step="0.5" class="form-input w-24 equipment-carga" placeholder="Carga" data-value-source="carga">
                        <input type="number" step="0.5" class="form-input w-24 equipment-pe" placeholder="P.E." data-value-source="pe">
                    </div>
                    <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição do item..." data-value-source="desc"></textarea>
                    <div class="flex gap-2 mt-2">
                        <button class="btn btn-secondary bg-green-600 hover:bg-green-700 text-xs save-card-btn">Salvar</button>
                        <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">Remover</button>
                    </div>
                </div>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', equipHTML);
    }
    
    function addGenericItem(listId, placeholder) {
        const list = document.getElementById(listId);
        const id = Date.now();
        const itemId = `item-${id}`;
        const itemHTML = `
             <div id="${itemId}" class="card bg-gray-900 p-3 dynamic-card">
                <!-- View Mode -->
                <div class="view-mode">
                    <div class="flex justify-between items-start">
                        <h3 class="text-md font-bold text-white" data-value-target="name">Nome do Item</h3>
                        <div>
                            <button class="btn btn-secondary text-xs edit-card-btn">Editar</button>
                            <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">X</button>
                        </div>
                    </div>
                    <p class="text-gray-300 mt-2 text-sm item-desc-view" data-value-target="desc"></p>
                </div>
                <!-- Edit Mode -->
                <div class="edit-mode">
                    <div class="flex items-center gap-3">
                        <input type="text" class="form-input flex-grow" placeholder="Nome do ${placeholder}" data-value-source="name">
                    </div>
                    <textarea class="form-textarea mt-2" rows="2" placeholder="Descrição..." data-value-source="desc"></textarea>
                    <div class="flex gap-2 mt-2">
                        <button class="btn btn-secondary bg-green-600 hover:bg-green-700 text-xs save-card-btn">Salvar</button>
                        <button class="btn btn-secondary bg-red-600 hover:bg-red-700 text-xs remove-card-btn">Remover</button>
                    </div>
                </div>
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
        const container = event.target.closest('.weapon-image-container');
        const imgElement = container.querySelector('.weapon-image');
        const placeholderIcon = container.querySelector('svg');

        reader.onload = (e) => {
            const dataUrl = e.target.result;
            imgElement.src = dataUrl;
            imgElement.classList.remove('hidden');
            if(placeholderIcon) placeholderIcon.classList.add('hidden');
            container.closest('.dynamic-card').dataset.imageSrc = dataUrl; 
        };
        reader.readAsDataURL(file);
    }

    function applyCustomBackground() {
        const url = document.getElementById('background-url-input').value;
        if (url) {
            document.body.style.backgroundImage = `url('${url}')`;
        }
    }

    // --- DATA PERSISTENCE ---
    function kebabToCamel(s) {
        return s.replace(/-./g, x => x[1].toUpperCase());
    }

    function getCharacterDataAsObject() {
        // First, ensure any cards in edit mode are saved to their dataset
        document.querySelectorAll('.dynamic-card:not(.view-state) .save-card-btn').forEach(btn => btn.click());

        const data = {
            inputs: {},
            checkboxes: {},
            textareas: {},
            selects: {},
            nationality: document.getElementById('char-nationality').value,
            portraitSrc: document.getElementById('char-portrait').src,
            backgroundUrl: document.getElementById('background-url-input').value,
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
        
        document.querySelectorAll('#weapons-list > div').forEach(card => {
            data.dynamic.weapons.push({
                name: card.dataset.name || '',
                damage: card.dataset.damage || '',
                range: card.dataset.range || '',
                swap: card.dataset.swap || '',
                pe: card.dataset.pe || '',
                desc: card.dataset.desc || '',
                imageSrc: card.dataset.imageSrc || ''
            });
        });
        document.querySelectorAll('#equipment-list > div').forEach(card => {
            data.dynamic.equipment.push({
                name: card.dataset.name || '',
                carga: card.dataset.carga || '',
                pe: card.dataset.pe || '',
                desc: card.dataset.desc || '',
            });
        });
        document.querySelectorAll('#titles-list > div, #talents-list > div, #traits-list > div').forEach(card => {
            const item = {
                name: card.dataset.name || '',
                desc: card.dataset.desc || '',
            };
            if(card.parentElement.id === 'titles-list') data.dynamic.titles.push(item);
            else if(card.parentElement.id === 'talents-list') data.dynamic.talents.push(item);
            else if(card.parentElement.id === 'traits-list') data.dynamic.traits.push(item);
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

        if (data.backgroundUrl) {
            document.getElementById('background-url-input').value = data.backgroundUrl;
            applyCustomBackground();
        }

        document.getElementById('char-race').dispatchEvent(new Event('change'));
        document.getElementById('char-class').dispatchEvent(new Event('change'));

        data.dynamic.weapons.forEach(w => {
            addWeapon();
            const card = document.querySelector('#weapons-list > div:last-child');
            Object.assign(card.dataset, w);
            card.querySelector('[data-value-target="name"]').textContent = w.name;
            card.querySelector('[data-value-target="damage"]').textContent = w.damage;
            card.querySelector('[data-value-target="range"]').textContent = w.range;
            card.querySelector('[data-value-target="swap"]').textContent = w.swap;
            card.querySelector('[data-value-target="pe"]').textContent = w.pe;
            card.querySelector('[data-value-target="desc"]').textContent = w.desc;
            
            if (w.imageSrc && w.imageSrc.startsWith('data:image')) {
                const viewImg = card.querySelector('.weapon-image-view');
                const editImg = card.querySelector('.edit-mode .weapon-image');
                const placeholder = card.querySelector('.edit-mode svg');
                
                viewImg.src = w.imageSrc;
                editImg.src = w.imageSrc;
                viewImg.classList.remove('hidden');
                editImg.classList.remove('hidden');
                if (placeholder) placeholder.classList.add('hidden');
            }
            card.classList.add('view-state');
        });
        data.dynamic.equipment.forEach(e => {
            addEquipment();
            const card = document.querySelector('#equipment-list > div:last-child');
            Object.assign(card.dataset, e);
            card.querySelector('[data-value-target="name"]').textContent = e.name;
            card.querySelector('[data-value-target="carga"]').textContent = e.carga;
            card.querySelector('[data-value-target="pe"]').textContent = e.pe;
            card.querySelector('[data-value-target="desc"]').textContent = e.desc;
            card.classList.add('view-state');
        });
        data.dynamic.titles.forEach(t => {
            addGenericItem('titles-list', 'Título');
            const card = document.querySelector('#titles-list > div:last-child');
            Object.assign(card.dataset, t);
            card.querySelector('[data-value-target="name"]').textContent = t.name;
            card.querySelector('[data-value-target="desc"]').textContent = t.desc;
            card.classList.add('view-state');
        });
        data.dynamic.talents.forEach(t => {
            addGenericItem('talents-list', 'Talento');
            const card = document.querySelector('#talents-list > div:last-child');
            Object.assign(card.dataset, t);
            card.querySelector('[data-value-target="name"]').textContent = t.name;
            card.querySelector('[data-value-target="desc"]').textContent = t.desc;
            card.classList.add('view-state');
        });
        data.dynamic.traits.forEach(t => {
            addGenericItem('traits-list', 'Habilidade/Traço');
            const card = document.querySelector('#traits-list > div:last-child');
            Object.assign(card.dataset, t);
            card.querySelector('[data-value-target="name"]').textContent = t.name;
            card.querySelector('[data-value-target="desc"]').textContent = t.desc;
            card.classList.add('view-state');
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
        const charName = document.getElementById('char-codename').value || 'personagem';
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
 