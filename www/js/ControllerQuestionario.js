angular.module("starter")

.controller("ControllerQuestionario", function($scope, $http, $location) {
    if (sessionStorage.getItem("CPA") == null) {
        $location.path("/login");
    }

    window.scrollTo(0,1);

    var JSONRespostas = [];

    var arrayDisciplinas = Array();
    var index = 0;
    var aux = 0;

    buscaDisciplinas = function(ID_ALUNO) {
        $http({
            method: "post",
            url: "http://" + host + "/api/buscaDisciplinas/", 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: ID_ALUNO
        }).success(function(data){
            for (; index<99; index++) {
                var aux = data[index];
                if (data[index] == null) break;
                arrayDisciplinas.push(aux["NOME"]);
            }
            //Adiciona na tela o nome da primeira disciplina do questinário
            $scope.idAluno = sessionStorage.getItem("ID_ALUNO");
            $scope.nomeAluno = sessionStorage.getItem("NOME");
            $scope.nomeDisciplina = arrayDisciplinas[0];
        });
    }

    $scope.guardarDados = function(resposta) {
        resposta.id_aluno = sessionStorage.getItem("ID_ALUNO");
        resposta.disciplina = arrayDisciplinas[aux];
        var data_atual = new Date();
        var dataFormatada = data_atual.toISOString().substr(8,2) +
                            data_atual.toISOString().substr(5,2) +
                            data_atual.toISOString().substr(0,4);
        resposta.data_quest = dataFormatada;

        //Faz uma cópia da resposta atual para não enviar a mesma referência de memória
        var novaResposta = angular.copy(resposta);
        
        //Adiciona a resposta ao Objeto JSON
        JSONRespostas[aux] = novaResposta;
        console.log(JSONRespostas);
        //Prepara para a resposta seguinte
        aux = aux + 1;
        $scope.nomeDisciplina = arrayDisciplinas[aux];
        limparFormulario(resposta);
        $('html, body').animate({scrollTop:0}, 'slow');

        //Verifica se as disciplinas já acabaram encerra o questinário
        if (aux == index) {
            salvarRespostas();
            sessionStorage.clear();
            $location.path("/finalizado");
        }
    }

    limparFormulario = function(resposta) {
        resposta.r01 = false;
        resposta.r02 = false;
        resposta.r03 = false;
        resposta.r04 = false;
        resposta.r05 = false;
        resposta.r06 = false;
        resposta.r07 = "";
        resposta.r08 = "";
    }
    
    salvarRespostas = function() {
        $http({
            method: "post",
            url: "http://" + host + "/api/salvarRespostas/", 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: JSONRespostas
        }).success(function(data){
            console.log("POST COM SUCESSO");
            console.log(data);
        });
    }

    $scope.iniciaQuestionario = function(login) { 
        buscaDisciplinas(sessionStorage.getItem("ID_ALUNO"));
    }
    
});
