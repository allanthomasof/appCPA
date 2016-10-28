angular.module("starter")

.controller("ControllerLogin", function($scope, $http, $location) {

    window.scrollTo(0,1);
    sessionStorage.clear();

    $scope.fazerLogin = function(login) {     
        $http.get("http://" + host + "/api/verificaCPA/").success(function(data) {
            if (data == 1) {
                $http({
                    method: "post",
                    url: "http://" + host + "/api/fazerLogin/", 
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: login
                }).success(function(data){
                    if (data == 0) {
                        $scope.avisos = "Usuário ou Senha Incorretos!";
                    } else {
                        sessionStorage.setItem("ID_ALUNO", data['ID_ALUNO']);
                        sessionStorage.setItem("NOME", data['NOME']);
                        sessionStorage.setItem("PERIODO", data['PERIODO']);
                        sessionStorage.setItem("CPA", data['CPA']);
                        verificaCPA();
                    }
                });
            } else {
                $scope.avisos = "O questionário não está disponível!";
            }
        });
    }

    verificaCPA = function(login) { 
        //Verifica se o usuário já respondeu ao questionário
        if (sessionStorage.getItem("CPA") == 1) {
            $location.path("/ja_foi_respondido");
        //Se não respondeu, é redirecionado para a página do questionario
        } else {
            $location.path("/questionario");
        }
    }
})

