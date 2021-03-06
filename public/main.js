angular
    .module('main', [
        'fileUpload',
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'notifier',
        'Scope.safeApply',
        'stPagamento'
    ])
    .config([
        '$routeProvider',
        '$locationProvider',
        function config(
            $routeProvider,
            $locationProvider
        ) {
            'use strict';
            $locationProvider.html5Mode(true);
            $routeProvider.when('/', {
                templateUrl: '/views/home.html',
                controller: 'homeController'
            });
            $routeProvider.when('/inscricao/listar', {
                templateUrl: '/views/inscricao/list.html',
                controller: 'inscricao/listController',
                resolve: {
                    data: [
                        'inscricaoService',
                        function data(
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    notifyOnReject: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.when('/inscricao/nova', {
                templateUrl: '/views/inscricao/edit.html',
                controller: 'inscricao/editController'
            });
            $routeProvider.when('/inscricao/:id/editar', {
                templateUrl: '/views/inscricao/edit.html',
                controller: 'inscricao/editController',
                resolve: {
                    data: [
                        '$route',
                        'inscricaoService',
                        function data(
                            $route,
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    id: $route.current.params.id,
                                    notifyOnReject: true,
                                    notifyOnUnauthorized: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.when('/inscricao/:id', {
                templateUrl: '/views/inscricao/view.html',
                controller: 'inscricao/viewController',
                resolve: {
                    data: [
                        '$route',
                        'inscricaoService',
                        function data(
                            $route,
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    id: $route.current.params.id,
                                    notifyOnReject: true,
                                    notifyOnUnauthorized: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.otherwise({
                template: '<style>body { background: #ededed; }</style><pre style="font-size: 1.5em; position: absolute; right: 50px; bottom: 50px;"><b>Página Inexistente!</b></pre>'
            });
        }
    ])
    .run([
        '$rootScope',
        'loading',
        'sessionService',
        function run(
            $rootScope,
            loading,
            sessionService
        ) {
            $rootScope.session = sessionService;
        }
    ]);
