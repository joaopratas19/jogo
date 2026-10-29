// Estado Atual do Jogo (Inicia com a tua Base Standard)
let estado = {
    dinheiro: 50000,
    xp: 0,
    nivelAtual: 1,
    frota: ["VFCI", "VSAE", "ABSC"],
    pessoalCount: 10,
    ocorrencias: []
};

// Lógica Principal
function gerarMissao() {
    // Filtra missões que o jogador já tem nível para fazer
    let missoesValidas = missoesBase.filter(m => m.reqNivel <= estado.nivelAtual);
    let missaoSorteada = missoesValidas[Math.floor(Math.random() * missoesValidas.length)];
    
    let novaOcorrencia = {
        idOcorr: "REQ-" + Math.floor(Math.random() * 10000),
        dados: missaoSorteada
    };
    
    estado.ocorrencias.push(novaOcorrencia);
    atualizarEcra();
}

function resolverMissao(idOcorr) {
    // Encontra e remove a missão da lista
    let index = estado.ocorrencias.findIndex(o => o.idOcorr === idOcorr);
    if (index > -1) {
        let missao = estado.ocorrencias[index].dados;
        
        // Dá o dinheiro e XP
        estado.dinheiro += missao.recompensa;
        estado.xp += missao.xp;
        
        estado.ocorrencias.splice(index, 1);
        
        verificarSubidaNivel();
        atualizarEcra();
    }
}

function verificarSubidaNivel() {
    let proxNivel = niveisComando.find(n => n.nivel === estado.nivelAtual + 1);
    if (proxNivel && estado.xp >= proxNivel.xpReq) {
        estado.nivelAtual = proxNivel.nivel;
        estado.dinheiro += proxNivel.bonus;
        alert(`Foste Promovido a ${proxNivel.titulo}!\nBónus: €${proxNivel.bonus.toLocaleString()}`);
    }
}