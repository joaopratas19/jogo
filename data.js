// Bases de Dados de Viaturas, Cursos e Tipos de Missão
const frotaConfig = {
    ABSC: { nome: "Ambulância de Socorro", custo: 55000 },
    VSAE: { nome: "Veíc. Socorro e Assist.", custo: 85000 },
    VFCI: { nome: "Veíc. Florestal de Combate", custo: 70000 },
    VUCI: { nome: "Veíc. Urbano de Combate", custo: 90000 }
};

const missoesBase = [
    { id: "1101", desc: "Doença Súbita na Via Pública", reqNivel: 1, recompensa: 5000, xp: 200 },
    { id: "2401", desc: "Atropelamento (EN365)", reqNivel: 1, recompensa: 8000, xp: 300 },
    { id: "3101", desc: "Fogo em Mato / Agrícola", reqNivel: 1, recompensa: 7000, xp: 250 },
    { id: "2301", desc: "Acidente Rodoviário c/ Encarcerados", reqNivel: 3, recompensa: 15000, xp: 500 },
    { id: "2101", desc: "Incêndio Urbano - Habitação", reqNivel: 3, recompensa: 20000, xp: 600 },
    { id: "2115", desc: "Incêndio Industrial", reqNivel: 5, recompensa: 45000, xp: 1200 },
    { id: "4101", desc: "Busca K9 - Desaparecido na Serra", reqNivel: 5, recompensa: 30000, xp: 1000 },
    { id: "9000", desc: "Motim / Controlo de Multidão", reqNivel: 7, recompensa: 80000, xp: 2000 }
];

const niveisComando = [
    { nivel: 1, titulo: "Bombeiro de 3ª", xpReq: 0, bonus: 0 },
    { nivel: 2, titulo: "Bombeiro de 2ª", xpReq: 1000, bonus: 100000 },
    { nivel: 3, titulo: "Bombeiro de 1ª", xpReq: 3000, bonus: 150000 },
    { nivel: 4, titulo: "Subchefe", xpReq: 6000, bonus: 250000 },
    { nivel: 5, titulo: "Chefe", xpReq: 12000, bonus: 400000 },
    { nivel: 6, titulo: "Adjunto", xpReq: 20000, bonus: 600000 },
    { nivel: 7, titulo: "2º Comandante", xpReq: 35000, bonus: 850000 },
    { nivel: 8, titulo: "Comandante", xpReq: 60000, bonus: 1500000 }
];