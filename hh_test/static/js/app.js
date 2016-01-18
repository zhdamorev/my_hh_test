app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
});

app.config(function($stateProvider, $urlRouterProvider){


    //$urlRouterProvider.otherwise("/");

    $stateProvider
        .state('task', {
            url: "/",
            templateUrl: "/static/partials/task.html"
        })

        .state('user', {
            url: '/user',
            templateUrl: "static/partials/users.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {
		    $scope.users = [];
		  
                    $http.get('/api/v1/user/').success(function(data) {
                        $scope.users = data.objects;
		
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })

        .state('user.view', {
            url: '/:userId',
            views: {
                '': {
                    templateUrl: "static/partials/users.view.html",
                    controller: ['$scope', '$http', '$stateParams',
                        function( $scope,   $http,   $stateParams) {
			$scope.$parent.lightMenu = function(id){
				if (id == $stateParams.userId) {return {background: '#ff55ee', color: '#55bbaa' } }
				}
                           $scope.selectedUser = {};
                            $http.get('/api/v1/user/'+$stateParams.userId+'/').success(function(data) {
			        delete data["password"];
                                $scope.selectedUser = data;
			

                            }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/'
                            }
                    })
                        }
                    ]
                }
            }
        })

        .state('auto_model', {
            url: '/auto_model',
            templateUrl: "static/partials/auto_models.html",
            controller: ['$scope', '$http',
                function( $scope,   $http) {

                    $scope.auto_models = [];
                    $http.get('/api/v1/auto_model/').success(function(data) {
                        $scope.auto_models = data.objects;
		
                    }).error(function(data, status, headers, config) {
                            if(status=401){
                                window.location = '/admin'
                            }
                    })
                }
            ]
        })

       .state('auto_model.view', {
            url: '/auto/:car_modelId',
	    views: {
	    '':{
                //templateUrl: 'auto',
		templateUrl: "static/partials/auto_models.view.html",
            controller: ['$scope', '$http', '$stateParams',
                function( $scope,   $http,    $stateParams) {
			

                   $scope.name = {};
                    $http.get('/api/v1/auto_model/'+$stateParams.car_modelId+'/').success(function(data) {
                        $scope.selectedAuto = data;
			$scope.master = {}
			$scope.update = function(selectedAuto){
				$scope.master = angular.copy(selectedAuto)
			
			//здесь почему то не отрабатывается ПОСТ запрос, почему, я не разобрался
			data = { 'name': selectedAuto.name, 'auto_id': selectedAuto.id }
 			$http.post("/change_mark/", data).success(function(data){console.log(data)})	

			}
                    }).error(function(data, status, headers, config) {
                         
                    })
                }
            ]
	}
	}
        })

.state('auto_model.add', {
            url: '/add',
            templateUrl: 'add',
            controller: ['$scope', '$http',
                function( $scope,   $http) {
		    
                    }]
                })
            
        




});

app.run(['$rootScope', function($rootScope) {

}]);
