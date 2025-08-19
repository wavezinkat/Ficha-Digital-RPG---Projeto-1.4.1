export const MUTANT_SUBTYPE_FEATURES = {
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