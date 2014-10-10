angular.module('controllers', [])
    .controller('SearchController', function($scope, $http) {
        $scope.query ="Axel Springer";

        this.oauth = new OAuth({
            consumer: {
                public: "hackathon",
                secret: "33f3fb11-59b4-4a38-a549-27bb4628d1af"
            }
        });

        this.requestUrl = "https://ipool.s.asideas.de/api/v3/search?limit=25&q=" + $scope.query;

        var request_data = {
            url: this.requestUrl,
            method: 'GET',
            data: {}
        };

        this.authorization = this.oauth.toHeader(this.oauth.authorize(request_data));

        $http.get(this.requestUrl, {
            headers: { Authorization : this.authorization['Authorization'] }
        }).success(function(data, status, headers, config) {

            $scope.articles = data['documents'];

        }).error(function(data, status, headers, config) {
            $scope.result = "An error occured: " + data;
        });
    })


