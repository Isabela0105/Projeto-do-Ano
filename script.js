// =========================
// LOGIN
// =========================

function entrar() {

    let email =
        document.getElementById("email").value;

    let senha =
        document.getElementById("senha").value;

    let mensagem =
        document.getElementById("mensagem");


    if (email === "" || senha === "") {

        mensagem.innerText =
            "Preencha o e-mail e a senha!";

        return;
    }


    if (
        email === "Professor@gmail.com" &&
        senha === "1234"
    ) {

        localStorage.setItem(
            "logado",
            "sim"
        );

        window.location.href =
            "painel.html";

    } else {

        mensagem.innerText =
            "E-mail ou senha incorretos!";
    }
}


function mostrarSenha() {

    let senha =
        document.getElementById("senha");


    if (senha.type === "password") {

        senha.type = "text";

    } else {

        senha.type = "password";
    }
}


// =========================
// SAIR
// =========================

function sair() {

    localStorage.removeItem(
        "logado"
    );

    window.location.href =
        "index.html";
}


// =========================
// VERIFICAR LOGIN
// =========================

function verificarLogin() {

    if (
        window.location.pathname.includes(
            "painel.html"
        )
    ) {

        if (
            localStorage.getItem("logado")
            !== "sim"
        ) {

            window.location.href =
                "index.html";
        }
    }
}


// =========================
// GABARITOS
// =========================

let indiceGabaritoEditando = -1;


function adicionarGabarito() {

    let nome =
        document.getElementById(
            "nomeProva"
        ).value;

    let materia =
        document.getElementById(
            "materiaProva"
        ).value;

    let turma =
        document.getElementById(
            "turmaProva"
        ).value;

    let data =
        document.getElementById(
            "dataProva"
        ).value;

    let respostas =
        document.getElementById(
            "gabarito"
        ).value;


    if (
        nome === "" ||
        materia === "" ||
        respostas === ""
    ) {

        alert(
            "Preencha o nome, matéria e gabarito!"
        );

        return;
    }


    let gabaritos =
        JSON.parse(
            localStorage.getItem(
                "gabaritos"
            )
        ) || [];


    let novoGabarito = {

        nome: nome,

        materia: materia,

        turma: turma,

        data: data,

        respostas: respostas

    };


    if (
        indiceGabaritoEditando === -1
    ) {

        gabaritos.push(
            novoGabarito
        );

    } else {

        gabaritos[
            indiceGabaritoEditando
        ] = novoGabarito;

        indiceGabaritoEditando = -1;

        document.getElementById(
            "cancelarGabarito"
        ).style.display = "none";
    }


    localStorage.setItem(
        "gabaritos",
        JSON.stringify(gabaritos)
    );


    limparCamposGabarito();

    mostrarGabaritos();

    atualizarDashboard();
}


function limparCamposGabarito() {

    document.getElementById(
        "nomeProva"
    ).value = "";

    document.getElementById(
        "materiaProva"
    ).value = "";

    document.getElementById(
        "turmaProva"
    ).value = "";

    document.getElementById(
        "dataProva"
    ).value = "";

    document.getElementById(
        "gabarito"
    ).value = "";
}


function mostrarGabaritos() {

    let lista =
        document.getElementById(
            "listaGabaritos"
        );


    if (!lista) return;


    lista.innerHTML = "";


    let gabaritos =
        JSON.parse(
            localStorage.getItem(
                "gabaritos"
            )
        ) || [];


    let pesquisa =
        document.getElementById(
            "pesquisaGabarito"
        ).value.toLowerCase();


    for (
        let i = 0;
        i < gabaritos.length;
        i++
    ) {

        let g = gabaritos[i];


        let texto = (

            g.nome +
            " " +
            g.materia +
            " " +
            g.turma

        ).toLowerCase();


        if (
            !texto.includes(pesquisa)
        ) {

            continue;
        }


        let dataFormatada =
            g.data
            ? formatarData(g.data)
            : "Não informada";


        lista.innerHTML += `

            <div class="item">

                <h3>
                    ${g.nome}
                </h3>

                <p>
                    <strong>
                        Matéria:
                    </strong>

                    ${g.materia}
                </p>

                <p>
                    <strong>
                        Turma:
                    </strong>

                    ${g.turma || "Não informada"}
                </p>

                <p>
                    <strong>
                        Data:
                    </strong>

                    ${dataFormatada}
                </p>

                <p>
                    <strong>
                        Gabarito:
                    </strong>

                    ${g.respostas}
                </p>

                <button
                    onclick="editarGabarito(${i})"
                >
                    Editar
                </button>

                <button
                    class="botao-excluir"
                    onclick="excluirGabarito(${i})"
                >
                    Excluir
                </button>

            </div>

        `;
    }
}


function editarGabarito(posicao) {

    let gabaritos =
        JSON.parse(
            localStorage.getItem(
                "gabaritos"
            )
        ) || [];


    let g =
        gabaritos[posicao];


    document.getElementById(
        "nomeProva"
    ).value = g.nome;


    document.getElementById(
        "materiaProva"
    ).value = g.materia;


    document.getElementById(
        "turmaProva"
    ).value =
        g.turma || "";


    document.getElementById(
        "dataProva"
    ).value =
        g.data || "";


    document.getElementById(
        "gabarito"
    ).value =
        g.respostas;


    indiceGabaritoEditando =
        posicao;


    document.getElementById(
        "cancelarGabarito"
    ).style.display =
        "inline-block";


    window.scrollTo(
        0,
        0
    );
}


function cancelarEdicaoGabarito() {

    indiceGabaritoEditando =
        -1;

    limparCamposGabarito();

    document.getElementById(
        "cancelarGabarito"
    ).style.display =
        "none";
}


function excluirGabarito(posicao) {

    if (
        !confirm(
            "Deseja excluir este gabarito?"
        )
    ) {

        return;
    }


    let gabaritos =
        JSON.parse(
            localStorage.getItem(
                "gabaritos"
            )
        ) || [];


    gabaritos.splice(
        posicao,
        1
    );


    localStorage.setItem(
        "gabaritos",
        JSON.stringify(gabaritos)
    );


    mostrarGabaritos();

    atualizarDashboard();
}


// =========================
// MATERIAIS
// =========================

let indiceMaterialEditando = -1;


function adicionarMaterial() {

    let nome =
        document.getElementById(
            "nomeMaterial"
        ).value;

    let materia =
        document.getElementById(
            "materiaMaterial"
        ).value;

    let turma =
        document.getElementById(
            "turmaMaterial"
        ).value;

    let tipo =
        document.getElementById(
            "tipoMaterial"
        ).value;

    let link =
        document.getElementById(
            "linkMaterial"
        ).value;


    if (
        nome === "" ||
        materia === "" ||
        link === ""
    ) {

        alert(
            "Preencha o nome, matéria e link!"
        );

        return;
    }


    let materiais =
        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];


    let novoMaterial = {

        nome: nome,

        materia: materia,

        turma: turma,

        tipo: tipo,

        link: link

    };


    if (
        indiceMaterialEditando === -1
    ) {

        materiais.push(
            novoMaterial
        );

    } else {

        materiais[
            indiceMaterialEditando
        ] = novoMaterial;

        indiceMaterialEditando = -1;

        document.getElementById(
            "cancelarMaterial"
        ).style.display =
            "none";
    }


    localStorage.setItem(
        "materiais",
        JSON.stringify(materiais)
    );


    limparCamposMaterial();

    mostrarMateriais();

    atualizarDashboard();
}


function limparCamposMaterial() {

    document.getElementById(
        "nomeMaterial"
    ).value = "";

    document.getElementById(
        "materiaMaterial"
    ).value = "";

    document.getElementById(
        "turmaMaterial"
    ).value = "";

    document.getElementById(
        "tipoMaterial"
    ).value = "Slide";

    document.getElementById(
        "linkMaterial"
    ).value = "";
}


function mostrarMateriais() {

    let lista =
        document.getElementById(
            "listaMateriais"
        );


    if (!lista) return;


    lista.innerHTML = "";


    let materiais =
        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];


    let pesquisa =
        document.getElementById(
            "pesquisaMaterial"
        ).value.toLowerCase();


    for (
        let i = 0;
        i < materiais.length;
        i++
    ) {

        let m =
            materiais[i];


        let texto = (

            m.nome +
            " " +
            m.materia +
            " " +
            m.turma +
            " " +
            m.tipo

        ).toLowerCase();


        if (
            !texto.includes(pesquisa)
        ) {

            continue;
        }


        lista.innerHTML += `

            <div class="item">

                <h3>
                    ${m.nome}
                </h3>

                <p>
                    <strong>
                        Matéria:
                    </strong>

                    ${m.materia}
                </p>

                <p>
                    <strong>
                        Turma:
                    </strong>

                    ${m.turma || "Não informada"}
                </p>

                <p>
                    <strong>
                        Tipo:
                    </strong>

                    ${m.tipo}
                </p>

                <p>

                    <a
                        href="${m.link}"
                        target="_blank"
                    >
                        📎 Abrir material
                    </a>

                </p>

                <button
                    onclick="editarMaterial(${i})"
                >
                    Editar
                </button>

                <button
                    class="botao-excluir"
                    onclick="excluirMaterial(${i})"
                >
                    Excluir
                </button>

            </div>

        `;
    }
}


function editarMaterial(posicao) {

    let materiais =
        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];


    let m =
        materiais[posicao];


    document.getElementById(
        "nomeMaterial"
    ).value =
        m.nome;


    document.getElementById(
        "materiaMaterial"
    ).value =
        m.materia;


    document.getElementById(
        "turmaMaterial"
    ).value =
        m.turma || "";


    document.getElementById(
        "tipoMaterial"
    ).value =
        m.tipo || "Slide";


    document.getElementById(
        "linkMaterial"
    ).value =
        m.link;


    indiceMaterialEditando =
        posicao;


    document.getElementById(
        "cancelarMaterial"
    ).style.display =
        "inline-block";


    window.scrollTo(
        0,
        0
    );
}


function cancelarEdicaoMaterial() {

    indiceMaterialEditando =
        -1;

    limparCamposMaterial();

    document.getElementById(
        "cancelarMaterial"
    ).style.display =
        "none";
}


function excluirMaterial(posicao) {

    if (
        !confirm(
            "Deseja excluir este material?"
        )
    ) {

        return;
    }


    let materiais =
        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];


    materiais.splice(
        posicao,
        1
    );


    localStorage.setItem(
        "materiais",
        JSON.stringify(materiais)
    );


    mostrarMateriais();

    atualizarDashboard();
}


// =========================
// CALENDÁRIO
// =========================

let dataAtual =
    new Date();


let calendario =
    JSON.parse(
        localStorage.getItem(
            "calendario"
        )
    ) || {};


let dataEscolhida =
    "";


function mostrarCalendario() {

    let dias =
        document.getElementById(
            "dias"
        );

    let mesAno =
        document.getElementById(
            "mesAno"
        );


    if (
        !dias ||
        !mesAno
    ) {

        return;
    }


    dias.innerHTML = "";


    let ano =
        dataAtual.getFullYear();

    let mes =
        dataAtual.getMonth();


    let nomeMes =
        dataAtual.toLocaleDateString(
            "pt-BR",
            {
                month: "long",
                year: "numeric"
            }
        );


    mesAno.innerText =
        nomeMes.charAt(0).toUpperCase() +
        nomeMes.slice(1);


    let primeiroDia =
        new Date(
            ano,
            mes,
            1
        ).getDay();


    let quantidadeDias =
        new Date(
            ano,
            mes + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < primeiroDia;
        i++
    ) {

        let vazio =
            document.createElement(
                "div"
            );


        vazio.classList.add(
            "dia-vazio"
        );


        dias.appendChild(
            vazio
        );
    }


    for (
        let dia = 1;
        dia <= quantidadeDias;
        dia++
    ) {

        let elemento =
            document.createElement(
                "div"
            );


        elemento.classList.add(
            "dia"
        );


        elemento.innerText =
            dia;


        let data =
            `${ano}-${String(
                mes + 1
            ).padStart(2, "0")}-${String(
                dia
            ).padStart(2, "0")}`;


        let hoje =
            new Date();


        if (
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()
        ) {

            elemento.classList.add(
                "hoje"
            );
        }


        if (
            calendario[data]
        ) {

            elemento.classList.add(
                calendario[data].tipo
            );


            let info =
                document.createElement(
                    "span"
                );


            info.classList.add(
                "info-dia"
            );


            if (
                calendario[data].tipo
                === "prova"
            ) {

                info.innerText =
                    "📝 " +
                    (
                        calendario[data].nome ||
                        "Prova"
                    );

            } else if (
                calendario[data].tipo
                === "atividade"
            ) {

                info.innerText =
                    "🔵 " +
                    (
                        calendario[data].nome ||
                        "Atividade"
                    );

            } else if (
                calendario[data].tipo
                === "aula"
            ) {

                info.innerText =
                    "📚 " +
                    (
                        calendario[data].materia ||
                        "Aula"
                    );

            } else {

                info.innerText =
                    "Sem aula";
            }


            elemento.appendChild(
                info
            );
        }


        elemento.addEventListener(
            "click",
            function() {

                abrirModal(
                    data
                );

            }
        );


        dias.appendChild(
            elemento
        );
    }
}


// =========================
// ABRIR MODAL
// =========================

function abrirModal(data) {

    dataEscolhida =
        data;


    let modal =
        document.getElementById(
            "modalCalendario"
        );


    let informacoes =
        calendario[data];


    document.getElementById(
        "dataSelecionada"
    ).innerText =
        "📅 " +
        formatarData(data);


    if (
        informacoes
    ) {

        document.getElementById(
            "tipoDia"
        ).value =
            informacoes.tipo;


        document.getElementById(
            "nomeProvaCalendario"
        ).value =
            informacoes.nome || "";


        document.getElementById(
            "conteudoProva"
        ).value =
            informacoes.conteudo || "";


        document.getElementById(
            "nomeAtividade"
        ).value =
            informacoes.nome || "";


        document.getElementById(
            "descricaoAtividade"
        ).value =
            informacoes.conteudo || "";


        document.getElementById(
            "materiaEvento"
        ).value =
            informacoes.materia || "";


        document.getElementById(
            "horarioEvento"
        ).value =
            informacoes.horario || "";


    } else {

        document.getElementById(
            "tipoDia"
        ).value =
            "aula";


        document.getElementById(
            "nomeProvaCalendario"
        ).value = "";


        document.getElementById(
            "conteudoProva"
        ).value = "";


        document.getElementById(
            "nomeAtividade"
        ).value = "";


        document.getElementById(
            "descricaoAtividade"
        ).value = "";


        document.getElementById(
            "materiaEvento"
        ).value = "";


        document.getElementById(
            "horarioEvento"
        ).value = "";
    }


    atualizarCamposProva();


    modal.style.display =
        "flex";
}


// =========================
// MOSTRAR CAMPOS
// =========================

function atualizarCamposProva() {

    let tipo =
        document.getElementById(
            "tipoDia"
        ).value;


    let camposProva =
        document.getElementById(
            "informacoesProva"
        );


    let camposAtividade =
        document.getElementById(
            "informacoesAtividade"
        );


    camposProva.style.display =
        tipo === "prova"
        ? "block"
        : "none";


    camposAtividade.style.display =
        tipo === "atividade"
        ? "block"
        : "none";
}


// =========================
// SALVAR DIA
// =========================

function salvarDia() {

    let tipo =
        document.getElementById(
            "tipoDia"
        ).value;


    let nome = "";

    let conteudo = "";


    if (
        tipo === "prova"
    ) {

        nome =
            document.getElementById(
                "nomeProvaCalendario"
            ).value;


        conteudo =
            document.getElementById(
                "conteudoProva"
            ).value;


        if (
            nome === ""
        ) {

            alert(
                "Digite o nome da prova!"
            );

            return;
        }
    }


    if (
        tipo === "atividade"
    ) {

        nome =
            document.getElementById(
                "nomeAtividade"
            ).value;


        conteudo =
            document.getElementById(
                "descricaoAtividade"
            ).value;


        if (
            nome === ""
        ) {

            alert(
                "Digite o nome da atividade!"
            );

            return;
        }
    }


    calendario[
        dataEscolhida
    ] = {

        tipo: tipo,

        nome: nome,

        conteudo: conteudo,

        materia:
            document.getElementById(
                "materiaEvento"
            ).value,

        horario:
            document.getElementById(
                "horarioEvento"
            ).value

    };


    localStorage.setItem(
        "calendario",
        JSON.stringify(
            calendario
        )
    );


    fecharModal();

    mostrarCalendario();

    mostrarProximosEventos();

    atualizarDashboard();
}


// =========================
// EXCLUIR DIA
// =========================

function excluirDia() {

    if (
        !calendario[dataEscolhida]
    ) {

        fecharModal();

        return;
    }


    if (
        !confirm(
            "Deseja excluir este evento?"
        )
    ) {

        return;
    }


    delete calendario[
        dataEscolhida
    ];


    localStorage.setItem(
        "calendario",
        JSON.stringify(
            calendario
        )
    );


    fecharModal();

    mostrarCalendario();

    mostrarProximosEventos();

    atualizarDashboard();
}


// =========================
// FECHAR MODAL
// =========================

function fecharModal() {

    document.getElementById(
        "modalCalendario"
    ).style.display =
        "none";
}


// =========================
// FORMATAR DATA
// =========================

function formatarData(data) {

    let partes =
        data.split("-");


    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// =========================
// MÊS ANTERIOR
// =========================

function mesAnterior() {

    dataAtual.setMonth(
        dataAtual.getMonth() - 1
    );


    mostrarCalendario();
}


// =========================
// PRÓXIMO MÊS
// =========================

function mesProximo() {

    dataAtual.setMonth(
        dataAtual.getMonth() + 1
    );


    mostrarCalendario();
}


// =========================
// PRÓXIMOS EVENTOS
// =========================

function mostrarProximosEventos() {

    let lista =
        document.getElementById(
            "proximosEventos"
        );


    if (!lista) return;


    lista.innerHTML = "";


    let eventos = [];


    for (
        let data in calendario
    ) {

        eventos.push({

            data: data,

            ...calendario[data]

        });
    }


    eventos.sort(
        function(a, b) {

            return new Date(a.data) -
                new Date(b.data);

        }
    );


    let hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    let contador = 0;


    for (
        let evento of eventos
    ) {

        let dataEvento =
            new Date(
                evento.data +
                "T00:00:00"
            );


        if (
            dataEvento < hoje
        ) {

            continue;
        }


        let nome =
            evento.nome ||
            "Aula";


        let textoTipo = {

            "aula":
                "🟢 Aula",

            "sem-aula":
                "🔴 Sem aula",

            "prova":
                "🟡 Prova",

            "atividade":
                "🔵 Atividade"

        };


        lista.innerHTML += `

            <div class="evento-proximo">

                <strong>
                    ${formatarData(
                        evento.data
                    )}
                </strong>

                -
                ${textoTipo[
                    evento.tipo
                ]}

                <br>

                ${nome}

                ${
                    evento.materia
                    ? " | " +
                      evento.materia
                    : ""
                }

                ${
                    evento.horario
                    ? " | " +
                      evento.horario
                    : ""
                }

            </div>

        `;


        contador++;


        if (
            contador >= 5
        ) {

            break;
        }
    }


    if (
        contador === 0
    ) {

        lista.innerHTML =
            "<p>Nenhum próximo evento cadastrado.</p>";
    }
}


// =========================
// DASHBOARD
// =========================

function atualizarDashboard() {

    let gabaritos =
        JSON.parse(
            localStorage.getItem(
                "gabaritos"
            )
        ) || [];


    let materiais =
        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];


    let eventos =
        Object.keys(
            calendario
        );


    let provas = 0;


    for (
        let data of eventos
    ) {

        if (
            calendario[data].tipo
            === "prova"
        ) {

            provas++;
        }
    }


    let elementoGabaritos =
        document.getElementById(
            "totalGabaritos"
        );


    if (
        !elementoGabaritos
    ) {

        return;
    }


    elementoGabaritos.innerText =
        gabaritos.length;


    document.getElementById(
        "totalMateriais"
    ).innerText =
        materiais.length;


    document.getElementById(
        "totalProvas"
    ).innerText =
        provas;


    document.getElementById(
        "totalEventos"
    ).innerText =
        eventos.length;
}


// =========================
// MODO ESCURO
// =========================

function alternarTema() {

    document.body.classList.toggle(
        "modo-escuro"
    );


    if (
        document.body.classList.contains(
            "modo-escuro"
        )
    ) {

        localStorage.setItem(
            "tema",
            "escuro"
        );

    } else {

        localStorage.setItem(
            "tema",
            "claro"
        );
    }
}


function carregarTema() {

    if (
        localStorage.getItem(
            "tema"
        ) === "escuro"
    ) {

        document.body.classList.add(
            "modo-escuro"
        );
    }
}


// =========================
// INICIAR
// =========================

window.onload =
    function() {

        verificarLogin();

        carregarTema();

        mostrarGabaritos();

        mostrarMateriais();

        mostrarCalendario();

        mostrarProximosEventos();

        atualizarDashboard();

    };