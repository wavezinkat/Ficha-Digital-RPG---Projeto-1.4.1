export const RACIAL_FEATURES = {
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