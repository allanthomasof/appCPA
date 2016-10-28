angular.module("starter")

.controller("ControllerADM", function($scope, $http) {
    window.scrollTo(0,1);
    sessionStorage.clear();

    $scope.iniciar = function() {  
        $http.get("http://" + host + "/api/verificaCPA/").success(function(data) {
            if (data == 1) {
                $scope.status = "ON";
                $scope.statusStyle = "statusStyleAberto";
            } else {
                $scope.status = "OFF";
                $scope.statusStyle = "statusStyleFechado";
            }
        }); 
    }

    $scope.alterarStatus = function() {  
        if (confirm("Deseja continuar?")) {
            $http.get("http://" + host + "/api/alteraStatusCPA/").success(function(data) {
                $scope.iniciar();
            }); 
        }
    }

    $scope.gerarRelatorio = function(relatorio) { 
        // Foi feita uma cópia do objeto, pois o Angular estava acusando erros no Log
        var relatorio_ok = angular.copy(relatorio);
        relatorio_ok.dataInicial = converteData(relatorio_ok.dataInicial);
        relatorio_ok.dataFinal = converteData(relatorio_ok.dataFinal);

        $http({
            method: "post",
            url: "http://" + host + "/api/gerarRelatorio/", 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: relatorio_ok
        }).success(function(data){
            console.log(data);
            switch (relatorio.tipo) {
                case 'G_Universidade' :
                    $scope.descricao = "Gráfico Geral da Universidade";
                    document.getElementById('grafico').innerHTML =
                    '<img id="graficoImg" src="http://chart.apis.google.com/chart?cht=p&chd=t:'+ data['A'] +','+ data['B'] +','+ data['C'] +
                    '&chs=338x200&chl='+ data['A'] +'%|'+ data['B'] +'%|'+ data['C'] +'%&chdl=A|B|C&chf=bg,s,eeeeee&chco=3CB371|ff8c00|00a8eb" alt="" />';
                    break;
            }
        });
    }

    converteData = function(data) {
        return data.toISOString().substr(8,2) +
               data.toISOString().substr(5,2) +
               data.toISOString().substr(0,4);
    }

});