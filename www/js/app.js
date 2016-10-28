angular.module('starter', ['ionic', 'ngRoute'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
	  
	var push = PushNotification.init({
    android: {
        senderID: "64422910691"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
	});

	push.on('registration', function(data) {
        console.log = "Chegou";
		document.getElementById("devID").innerHTML = data.registrationId;
	});

	push.on('notification', function(data) {
		// data.message,
		// data.title,
		// data.count,
		// data.sound,
		// data.image,
		// data.additionalData
	});

	push.on('error', function(e) {
		// e.message
	});
	  
	  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller:  "ControllerLogin"
    })

    $routeProvider.when("/questionario", {
        templateUrl: "view/questionario.html",
        controller:  "ControllerQuestionario"
    })

    $routeProvider.when("/ja_foi_respondido", {
        templateUrl: "view/ja_foi_respondido.html"
    })

    $routeProvider.when("/login_adm", {
        templateUrl: "view/login_adm.html",
        controller:  "ControllerLoginADM"
    })

    $routeProvider.when("/login_adm", {
        templateUrl: "view/login_adm.html",
        controller:  "ControllerLoginADM"
    })

    $routeProvider.when("/adm", {
        templateUrl: "view/adm.html",
        controller:  "ControllerADM"
    })

    $routeProvider.when("/finalizado", {
        templateUrl: "view/finalizado.html"
    })

    // Se a rota não for encontrada, redireciona para:
    $routeProvider.otherwise({redirectTo: "/login"});

})
