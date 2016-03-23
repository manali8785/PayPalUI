/**
 * Created by administrator on 3/17/16.
 */
var app=angular.module("paypal_app",["ui.router"]);

app.config(['$stateProvider',function($stateProvider){
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'index.html',
    }).state('sendMoney',{
        url:'/sendMoney',
        templateUrl:'/html/sendMoney.html',
        controller:'SendMoneyController'
    }).state('success',{
            url:'/success/:currency/:amount',
            templateUrl:'/html/success.html',
            controller:function($scope,$stateParams){
                $scope.cur=$stateParams.currency;
                $scope.amt=$stateParams.amount;

            }
    }).state('getTransactionHistory',{
        url:'/getTransactionHistory',
        templateUrl:'/html/transactionHistory.html',
        controller:function($scope,$http){
            $http.get('/getTransactionHistory').then(function(config){
                console.log('getting trans history',config);
                $scope.data=config.data;

            },function(){
                console.log("There was an error!");
            });
        }
    })
}]);

app.controller('SendMoneyController',function($scope,$state){
    $scope.master={
           email:"",
           amount:0,
           message:"",
           currency:"$"
    };
    $scope.setSelected=function(e){
        var target=$(e.target);
            target.addClass('activeli');
            target.siblings().removeClass('activeli');
    }

    $scope.reset=function(){
        $('#currency').prop('selectedIndex',0);
        $('#paymentfor').children().removeClass('activeli');
        $scope.form=angular.copy($scope.master);
        $scope.sendMoneyForm.$setPristine();
        $scope.sendMoneyForm.$setUntouched();
    }

    $scope.loading=function(){
        console.log("loading...");
        console.log($scope.form.currency);
        document.querySelector('.container').style.visibility="visible";
        document.querySelector('.ispinner').style.visibility="visible";
        setTimeout(function(){
            document.querySelector('.container').style.visibility="hidden";
            document.querySelector('.ispinner').style.visibility="hidden";
            $state.go('success',{currency:$scope.form.currency,amount:$scope.form.amount});
        }, 3000);
    }
});



