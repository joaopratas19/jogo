const nomesBase = ["João", "Martim", "Zé", "Artolas", "Bode", "Pato", "Ana", "Jorge", "Manel", "Jaquim", "Panisga", "Rui"];
const apelidosBase = ["Pratas", "Jagunço", "Silva", "Costa", "Ferreira", "Gomes", "Urso"];

let estado = {
    dinheiro: 50000, xp: 0, nivelAtual: 1,
    frota: [
        { id: "V01", tipo: "VFCI", estado: "disponivel" },
        { id: "V02", tipo: "VSAE", estado: "disponivel" },
        { id: "V03", tipo: "ABSC", estado: "disponivel" }
    ],
    pessoal: [], ocorrencias: [], ocorrenciaEmFoco: null
};

function gerarPessoalBase() {
    for(let i = 0; i < 10; i++) {
        let nome = nomesBase[Math.floor(Math.random() * nomesBase.length)] + " " + apelidosBase[Math.floor(Math.random() * apelidosBase.length)];
        estado.pessoal.push({
            id: "B" + i, nome: nome,
            cursos: ["TAT", "INCENDIOS_FLORESTAIS"], 
            estado: "disponivel" 
        });
    }
}
gerarPessoalBase();

function gerarMissao() {
    let missoesValidas = missoesBase.filter(m => m.reqNivel <= estado.nivelAtual);
    let missaoSorteada = missoesValidas[Math.floor(Math.random() * missoesValidas.length)];
    let novaOcorrencia = { idOcorr: "REQ-" + Math.floor(Math.random() * 10000), dados: missaoSorteada };
    estado.ocorrencias.push(novaOcorrencia);
    atualizarEcra();
}

function verificarSubidaNivel() {
    let proxNivel = niveisComando.find(n => n.nivel === estado.nivelAtual + 1);
    if (proxNivel && estado.xp >= proxNivel.xpReq) {
        estado.nivelAtual = proxNivel.nivel;
        estado.dinheiro += proxNivel.bonus;
        alert(`Foste Promovido a ${proxNivel.titulo}!\nBónus: €${proxNivel.bonus.toLocaleString()}`);
    }
}

function enviarParaENB(idBombeiro, cursoId, custo) {
    if (estado.dinheiro < custo) {
        alert("Comandante, não temos fundos para esta formação!");
        return;
    }
    let bomb = estado.pessoal.find(b => b.id === idBombeiro);
    if(bomb && bomb.estado === "disponivel") {
        estado.dinheiro -= custo;
        bomb.estado = "em_formacao";
        atualizarEcra();
        
        setTimeout(() => {
            bomb.cursos.push(cursoId);
            bomb.estado = "disponivel";
            alert(`🚒 Formação Concluída: ${bomb.nome} tirou o curso de ${cursosENB[cursoId].nome}!`);
            atualizarEcra();
        }, 10000); 
    }
}