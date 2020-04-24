(function () {
    'use strict';
    angular.module('lunchCheck', [])
        .controller('LunchCheckController', LunchCheckController)

    LunchCheckController.$inject = ['$scope', '$filter'];
    const maxLimit= 3;

    function LunchCheckController($scope, $filter) {
        $scope.message="";
        $scope.userInput="";

        $scope.processUserInput= () => {
            //console.log("MCI> processUserInput");
            if(checkIfEmpty($scope.userInput)){
                $scope.message="Please enter data first";
            } else if (checkIfTooMuch($scope.userInput)){
                $scope.message="Too much!";
            } else {
                $scope.message="Enjoy!";
            }
        }
    }

    // Check if which items are not empty.
    // Return true if nonempty items exceed the limit
    function checkIfTooMuch(input){
        //console.log("MCI> checkIfTooMuch");
        let inputArray= input.split(",");
        let count= 0;

        inputArray.forEach((item)=>{
            if(item.trim().length > 0 && item.length != 0 && item != ""){
                count++;
            }
        })

        //console.log("MCO> checkIfTooMuch");
        return count > maxLimit;
    }

    function checkIfEmpty(input) {
        //console.log("MCI> checkIfEmpty");
        return input.length < 1 || input.replace(/,/g, '').length < 1;
    }


})();