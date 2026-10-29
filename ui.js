// Ouve os cliques no Menu Inferior para trocar de ecrã
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove class active de todos os botões e ecrãs
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active', 'hidden'));
        
        // Esconde todos
        document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
        
        // Ativa apenas o clicado
        let targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
        document.getElementById(targetId).classList.add('active');
        btn.classList.add('active');
    });
});

// Botão de Gerar Ocorrência
document.getElementById('btn-gerar').addEventListener('click', gerarMissao);

// Atualizar interface visual com dados do JS
function atualizarEcra() {
    // Atualiza Topo
    let tituloNivel = niveisComando.find(n => n.nivel === estado.nivelAtual).titulo;
    document.getElementById('player-rank').innerText = tituloNivel;
    document.getElementById('player-funds').innerText = "€ " + estado.dinheiro.toLocaleString();

    // Renderiza Frota
    let htmlFrota = "";
    estado.frota.forEach(v => {
        htmlFrota += `<li><span>${frotaConfig[v].nome} (${v})</span> <span>✅ Disp.</span></li>`;
    });
    document.getElementById('frota-list').innerHTML = htmlFrota;

    // Renderiza Pessoal
    document.getElementById('pessoal-list').innerHTML = `<li><span>Bombeiros Prontos</span> <span>${estado.pessoalCount} Operacionais</span></li>`;

    // Renderiza Ocorrências Ativas
    let htmlOcorrencias = "";
    estado.ocorrencias.forEach(o => {
        htmlOcorrencias += `
            <li class="incident-card">
                <h3>[${o.dados.id}] ${o.dados.desc}</h3>
                <p>Recompensa: €${o.dados.recompensa.toLocaleString()}</p>
                <button class="btn-resolver" onclick="resolverMissao('${o.idOcorr}')">Despachar e Resolver</button>
            </li>
        `;
    });
    
    if(estado.ocorrencias.length === 0) {
        htmlOcorrencias = "<p style='text-align:center; color:#777; margin-top:20px;'>Tudo calmo. Sem ocorrências ativas.</p>";
    }
    
    document.getElementById('incident-list').innerHTML = htmlOcorrencias;
}

// Inicia o jogo mal a página carrega
window.onload = atualizarEcra;