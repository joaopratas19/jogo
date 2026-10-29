document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
        let targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
        document.getElementById(targetId).classList.add('active');
        btn.classList.add('active');
        atualizarEcra();
    });
});

document.getElementById('btn-gerar').addEventListener('click', gerarMissao);

function abrirDespacho(idOcorr) {
    estado.ocorrenciaEmFoco = estado.ocorrencias.find(o => o.idOcorr === idOcorr);
    let missao = estado.ocorrenciaEmFoco.dados;
    
    document.getElementById('modal-titulo').innerText = `Ocorrência: ${missao.desc}`;
    document.getElementById('modal-info').innerText = `Recompensa Prevista: €${missao.recompensa.toLocaleString()}`;
    
    let htmlVeiculos = "";
    estado.frota.filter(v => v.estado === "disponivel").forEach(v => {
        htmlVeiculos += `
            <li>
                <label style="display:flex; align-items:center;">
                    <input type="checkbox" class="veiculo-check" value="${v.id}">
                    ${frotaConfig[v.tipo].nome} (${v.tipo})
                </label>
            </li>`;
    });
    
    if(htmlVeiculos === "") htmlVeiculos = "<p style='color:red; font-weight:bold;'>Sem viaturas disponíveis no quartel!</p>";
    document.getElementById('lista-veiculos-despacho').innerHTML = htmlVeiculos;
    document.getElementById('modal-despacho').classList.remove('hidden');
}

document.getElementById('btn-fechar-modal').addEventListener('click', () => {
    document.getElementById('modal-despacho').classList.add('hidden');
});

document.getElementById('btn-enviar-meios').addEventListener('click', () => {
    let selecionados = document.querySelectorAll('.veiculo-check:checked');
    if(selecionados.length === 0) {
        alert("Tens de selecionar pelo menos uma viatura!");
        return;
    }
    
    estado.dinheiro += estado.ocorrenciaEmFoco.dados.recompensa;
    estado.xp += estado.ocorrenciaEmFoco.dados.xp;
    estado.ocorrencias = estado.ocorrencias.filter(o => o.idOcorr !== estado.ocorrenciaEmFoco.idOcorr);
    
    verificarSubidaNivel();
    document.getElementById('modal-despacho').classList.add('hidden');
    atualizarEcra();
});

function mandarFormar(idBombeiro) {
    let select = document.getElementById(`select-${idBombeiro}`);
    let cursoId = select.value;
    let custo = cursosENB[cursoId].custo;
    enviarParaENB(idBombeiro, cursoId, custo);
}

function atualizarEcra() {
    let tituloNivel = niveisComando.find(n => n.nivel === estado.nivelAtual).titulo;
    document.getElementById('player-rank').innerText = tituloNivel;
    document.getElementById('player-funds').innerText = "€ " + estado.dinheiro.toLocaleString();

    let htmlOcorrencias = "";
    estado.ocorrencias.forEach(o => {
        htmlOcorrencias += `
            <li class="incident-card">
                <h3>${o.dados.desc}</h3>
                <p>Recompensa: €${o.dados.recompensa.toLocaleString()}</p>
                <button class="btn-resolver" onclick="abrirDespacho('${o.idOcorr}')">Abrir Comando</button>
            </li>`;
    });
    document.getElementById('incident-list').innerHTML = htmlOcorrencias || "<p style='text-align:center; color:#777; margin-top:20px;'>Sem ocorrências ativas.</p>";

    let htmlFrota = "";
    estado.frota.forEach(v => {
        htmlFrota += `<li><span>${frotaConfig[v.tipo].nome} (${v.tipo})</span> <span style="color:green; font-weight:bold;">✅ Disp.</span></li>`;
    });
    document.getElementById('frota-list').innerHTML = htmlFrota || "<p>Sem viaturas.</p>";

    let htmlPessoal = "";
    estado.pessoal.forEach(b => {
        let badgesCursos = b.cursos.map(c => `<span class="tag-curso">${cursosENB[c] ? cursosENB[c].nome : c}</span>`).join("");
        let actionHTML = "";
        
        if(b.estado === "em_formacao") {
            actionHTML = `<span style="color:#f57c00; font-size:0.9em; font-weight:bold;">Na ENB (Aguardar...)</span>`;
        } else {
            let cursosEmFalta = Object.keys(cursosENB).filter(c => !b.cursos.includes(c));
            if(cursosEmFalta.length > 0) {
                let options = cursosEmFalta.map(c => `<option value="${c}">${cursosENB[c].nome} (€${cursosENB[c].custo})</option>`).join("");
                actionHTML = `
                    <div style="display:flex; gap:5px; margin-top:8px;">
                        <select id="select-${b.id}" style="padding:4px; font-size:0.85em; border-radius:3px; border:1px solid #ccc; flex:1;">
                            ${options}
                        </select>
                        <button class="btn-formacao" onclick="mandarFormar('${b.id}')">Formar</button>
                    </div>`;
            } else {
                actionHTML = `<span style="color:#388e3c; font-size:0.9em; font-weight:bold;">Formação Máxima!</span>`;
            }
        }

        htmlPessoal += `
            <li style="display:flex; flex-direction:column; align-items:flex-start;">
                <div style="width:100%; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <strong>${b.nome}</strong>
                    <div style="margin-top:5px; display:flex; flex-wrap:wrap;">${badgesCursos}</div>
                </div>
                <div style="width:100%; margin-top:5px;">
                    ${actionHTML}
                </div>
            </li>`;
    });
    document.getElementById('pessoal-list').innerHTML = htmlPessoal;
}

window.onload = atualizarEcra;