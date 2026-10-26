
"use strict";


const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Você gosta de construir, corrigir falhas e encontrar soluções práticas. Sua criatividade e capacidade de resolver problemas são essenciais para o sucesso da missão.",
        imagem: "img/perfil-1.jpg",
        mascote: "img/mascote-tartaruga.jpg"
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Você é curioso, observador e gosta de entender como as coisas funcionam. Sua capacidade de analisar evidências e investigar o desconhecido será fundamental para descobrir os segredos do planeta.",
        imagem: "img/perfil-2.jpg",
        mascote: "img/mascote-pinguim.jpg"
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Você gosta de aventuras, novas experiências e lugares desconhecidos. Sua coragem e capacidade de adaptação ajudam a equipe a explorar territórios nunca antes visitados.",
        imagem: "img/perfil-3.jpg",
        mascote: "img/mascote-raposa.jpg"
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Você sabe organizar informações, coordenar pessoas e tomar decisões importantes. Sua visão estratégica ajuda a equipe a superar desafios e alcançar seus objetivos.",
        imagem: "img/perfil-4.jpg",
        mascote: "img/mascote-axolote.jpg"
    }
];


// ==========================================
// ELEMENTOS HTML
// ==========================================

const formulario = document.getElementById("formulario");

const telaTeste = document.getElementById("tela-teste");
const telaResultado = document.getElementById("tela-resultado");

const campoNome = document.getElementById("nome");
const campoNascimento = document.getElementById("nascimento");

const mensagemErro = document.getElementById("mensagem-erro");
const mensagemResultado = document.getElementById("mensagem-resultado");

const botaoRefazer = document.getElementById("refazer");

const imagemPerfil = document.getElementById("imagem-perfil");
const imagemMascote = document.getElementById("imagem-mascote");

const numeroPerfil = document.getElementById("numero-perfil");
const nomePerfil = document.getElementById("nome-perfil");
const categoriaPerfil = document.getElementById("categoria-perfil");
const descricaoPerfil = document.getElementById("descricao-perfil");

const resultadoNome = document.getElementById("resultado-nome");
const resultadoIdade = document.getElementById("resultado-idade");


// ==========================================
// VERIFICA SE OS ELEMENTOS EXISTEM
// ==========================================

if (
    !formulario ||
    !telaTeste ||
    !telaResultado ||
    !campoNome ||
    !campoNascimento ||
    !mensagemErro ||
    !mensagemResultado ||
    !botaoRefazer ||
    !imagemPerfil ||
    !imagemMascote ||
    !numeroPerfil ||
    !nomePerfil ||
    !categoriaPerfil ||
    !descricaoPerfil ||
    !resultadoNome ||
    !resultadoIdade
) {
    console.error(
        "Missão Aura: confira se os IDs do HTML correspondem aos IDs do JavaScript."
    );
} else {

    // ==========================================
    // DATA ATUAL
    // ==========================================

    function obterDataAtual() {
        const hoje = new Date();

        return {
            ano: hoje.getFullYear(),
            mes: hoje.getMonth() + 1,
            dia: hoje.getDate()
        };
    }


    // ==========================================
    // LIMITA A DATA DE NASCIMENTO AO DIA ATUAL
    // ==========================================

    function atualizarLimiteData() {
        const hoje = obterDataAtual();

        const mes = String(hoje.mes).padStart(2, "0");
        const dia = String(hoje.dia).padStart(2, "0");

        campoNascimento.max = `${hoje.ano}-${mes}-${dia}`;
    }

    atualizarLimiteData();


    // ==========================================
    // VERIFICA SE A DATA EXISTE
    // ==========================================

    function dataValida(dataNascimento) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
            return false;
        }

        const [ano, mes, dia] = dataNascimento.split("-").map(Number);

        const data = new Date(ano, mes - 1, dia);

        return (
            data.getFullYear() === ano &&
            data.getMonth() === mes - 1 &&
            data.getDate() === dia
        );
    }


    // ==========================================
    // CALCULA A IDADE
    // ==========================================

    function calcularIdade(dataNascimento) {
        const [anoNascimento, mesNascimento, diaNascimento] =
            dataNascimento.split("-").map(Number);

        const hoje = obterDataAtual();

        let idade = hoje.ano - anoNascimento;

        const aindaNaoFezAniversario =
            hoje.mes < mesNascimento ||
            (
                hoje.mes === mesNascimento &&
                hoje.dia < diaNascimento
            );

        if (aindaNaoFezAniversario) {
            idade--;
        }

        return idade;
    }


    // ==========================================
    // CALCULA A PONTUAÇÃO DAS RESPOSTAS
    // ==========================================

    function calcularPontuacao() {
        const pontuacao = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };

        for (let i = 1; i <= 4; i++) {
            const resposta = formulario.querySelector(
                `input[name="p${i}"]:checked`
            );

            if (!resposta) {
                return null;
            }

            const idPerfil = Number(resposta.value);

            if (!Object.prototype.hasOwnProperty.call(pontuacao, idPerfil)) {
                return null;
            }

            pontuacao[idPerfil]++;
        }

        return pontuacao;
    }


    // ==========================================
    // IDENTIFICA O PERFIL VENCEDOR
    // ==========================================

    function identificarPerfil(pontuacao) {
        const maiorPontuacao = Math.max(
            ...Object.values(pontuacao)
        );

        const vencedores = Object.keys(pontuacao)
            .filter(id => pontuacao[id] === maiorPontuacao)
            .map(Number);

        // Empate entre os quatro perfis.
        if (vencedores.length === 4) {
            return {
                empate: true,
                perfil: null
            };
        }

        // Empate entre dois ou três perfis.
        if (vencedores.length > 1) {
            const indiceAleatorio = Math.floor(
                Math.random() * vencedores.length
            );

            const idEscolhido = vencedores[indiceAleatorio];

            return {
                empate: true,
                perfil: perfis.find(
                    perfil => perfil.id === idEscolhido
                )
            };
        }

        // Um único perfil venceu.
        return {
            empate: false,
            perfil: perfis.find(
                perfil => perfil.id === vencedores[0]
            )
        };
    }


    // ==========================================
    // MOSTRA O RESULTADO
    // ==========================================

    function mostrarResultado(nome, idade, resultado) {
        resultadoNome.textContent = nome;

        resultadoIdade.textContent =
            `${idade} ${idade === 1 ? "ano" : "anos"}`;

        if (!resultado.perfil) {

            // EMPATE ENTRE OS QUATRO PERFIS

            numeroPerfil.textContent = "PERFIL 00";

            imagemPerfil.hidden = true;
            imagemMascote.hidden = true;

            nomePerfil.textContent = "Tripulante versátil";

            categoriaPerfil.textContent = "Perfil equilibrado";

            descricaoPerfil.textContent =
                "Suas respostas demonstram interesse por diferentes áreas da missão. Você pode contribuir de várias maneiras para a exploração do planeta.";

            mensagemResultado.textContent =
                "As quatro áreas receberam a mesma pontuação. " +
                "Refaça o teste e explore outras possibilidades!";

        } else {

            const perfil = resultado.perfil;

            numeroPerfil.textContent =
                `PERFIL ${String(perfil.id).padStart(2, "0")}`;

            // IMAGEM DO TRIPULANTE

            imagemPerfil.hidden = false;
            imagemPerfil.src = perfil.imagem;
            imagemPerfil.alt = `Tripulante do perfil ${perfil.nome}`;

            // MASCOTE CORRESPONDENTE

            imagemMascote.hidden = false;
            imagemMascote.src = perfil.mascote;
            imagemMascote.alt = `Mascote do perfil ${perfil.nome}`;

            // INFORMAÇÕES DO PERFIL

            nomePerfil.textContent = perfil.nome;
            categoriaPerfil.textContent = perfil.categoria;
            descricaoPerfil.textContent = perfil.descricao;

            // MENSAGEM PERSONALIZADA

            if (resultado.empate) {
                mensagemResultado.textContent =
                    "Você demonstrou afinidade com mais de uma área! " +
                    "Este é um dos perfis empatados nas suas respostas.";
            } else {
                mensagemResultado.textContent =
                    "Análise concluída! Este é o perfil que mais combina " +
                    "com suas preferências.";
            }
        }

        // ESCONDE O TESTE E EXIBE O RESULTADO

        telaTeste.hidden = true;
        telaResultado.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ==========================================
    // ENVIO DO FORMULÁRIO
    // ==========================================

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        mensagemErro.textContent = "";

        campoNome.classList.remove("invalido");
        campoNascimento.classList.remove("invalido");

        const nome = campoNome.value.trim();
        const nascimento = campoNascimento.value;

        // VALIDAÇÃO DO NOME

        if (nome.length < 2) {
            mensagemErro.textContent =
                "Por favor, informe um nome válido.";

            campoNome.classList.add("invalido");
            campoNome.focus();

            return;
        }

        // VALIDAÇÃO DA DATA

        if (!nascimento || !dataValida(nascimento)) {
            mensagemErro.textContent =
                "Informe uma data de nascimento válida.";

            campoNascimento.classList.add("invalido");
            campoNascimento.focus();

            return;
        }

        const [ano, mes, dia] = nascimento.split("-").map(Number);
        const hoje = obterDataAtual();

        const dataFutura =
            ano > hoje.ano ||
            (
                ano === hoje.ano &&
                mes > hoje.mes
            ) ||
            (
                ano === hoje.ano &&
                mes === hoje.mes &&
                dia > hoje.dia
            );

        if (dataFutura) {
            mensagemErro.textContent =
                "A data de nascimento não pode ser futura.";

            campoNascimento.classList.add("invalido");
            campoNascimento.focus();

            return;
        }

        // CALCULA A IDADE

        const idade = calcularIdade(nascimento);

        // VERIFICA SE TODAS AS PERGUNTAS FORAM RESPONDIDAS

        const pontuacao = calcularPontuacao();

        if (!pontuacao) {
            mensagemErro.textContent =
                "Responda às quatro perguntas antes de continuar.";

            return;
        }

        // IDENTIFICA O PERFIL E MOSTRA O RESULTADO

        const resultado = identificarPerfil(pontuacao);

        mostrarResultado(nome, idade, resultado);
    });


    // ==========================================
    // BOTÃO PARA REFAZER O TESTE
    // ==========================================

    botaoRefazer.addEventListener("click", function () {
        formulario.reset();

        mensagemErro.textContent = "";
        mensagemResultado.textContent = "";

        campoNome.classList.remove("invalido");
        campoNascimento.classList.remove("invalido");

        // RESTAURA AS IMAGENS INICIAIS

        imagemPerfil.hidden = false;
        imagemMascote.hidden = false;

        imagemPerfil.src = "img/perfil-1.jpg";
        imagemPerfil.alt = "Imagem do tripulante";

        imagemMascote.src = "img/mascote-tartaruga.jpg";
        imagemMascote.alt = "Mascote do perfil";

        // RESTAURA O RELATÓRIO

        numeroPerfil.textContent = "PERFIL 01";
        nomePerfil.textContent = "Engenheiro de Sistemas";
        categoriaPerfil.textContent = "Construção";
        descricaoPerfil.textContent = "";

        resultadoNome.textContent = "";
        resultadoIdade.textContent = "";

        // VOLTA PARA O FORMULÁRIO

        telaResultado.hidden = true;
        telaTeste.hidden = false;

        atualizarLimiteData();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}
