angular.module("starter")

.controller("ControllerLoginADM", function($scope, $http, $location) {

    window.scrollTo(0,1);
    sessionStorage.clear();

    $scope.fazerLoginAdm = function(login) {     
        $http({
            method: "post",
            url: "http://" + host + "/api/fazerLoginAdm/", 
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: login
        }).success(function(data){
            if (data == 0) {
                $scope.avisos = "Usuário ou Senha Incorretos!";
            } else {
                $location.path("/adm");
            }
        });
    }

});