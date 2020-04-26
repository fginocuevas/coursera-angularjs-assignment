(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController )
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
        .config(ShoppingListCheckOffConfig);

    ShoppingListCheckOffConfig.$inject= ['ShoppingListCheckOffServiceProvider'];
    function ShoppingListCheckOffConfig(ShoppingListCheckOffServiceProvider){
        const provider= ShoppingListCheckOffServiceProvider;
        //Initalize toBuy List
        let initialList= [
            { name: "eggs", quantity: 12 },
            { name: "cereals", quantity: 50 },
            { name: "rice", quantity: 10000 },
            { name: "bread", quantity: 5 },
            { name: "cookies", quantity: 20 }
        ];
        provider.defaultList= initialList;
    }

    ToBuyController.$inject= ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        const controller= this;
        const target= ShoppingListCheckOffService.getListBought();
        controller.items = ShoppingListCheckOffService.getListToBuy();

        controller.buyItem= (item) => {
            try {
                ShoppingListCheckOffService.addItem(target, item);
            } catch (e) {
                controller.errorMessage= e.message;
            }

        }
    }

    AlreadyBoughtController.$inject= ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        const controller= this;
        controller.items = ShoppingListCheckOffService.getListBought();
        controller.message= "Nothing bought yet.";

        controller.checkEmpty= ()=> {
            if(controller.items.length > 0){
                return false;
            } else {
                return true;
            }
        }
    }

    function ShoppingListCheckOffService(defaultList){
        const service= this;
        let listToBuy= defaultList;
        let listBought= [];

        service.addItem= (targetList, index) => {
            if(listToBuy.length > 0){
                let item= listToBuy[index];
                listToBuy.splice(index, 1);
                listBought.push(item);
            }

            if(listToBuy.length == 0) {
                throw new Error("Everything is bought!");
            }
        };

        service.getListToBuy= () => {
            return listToBuy;
        }

        service.getListBought= () => {
            return listBought;
        }
    }

    function ShoppingListCheckOffServiceProvider(){
        const provider= this;
        provider.defaultList= [
            { name: "raw wheat", quantity: 10 },
            { name: "raw flour", quantity: 10 }
        ];

        provider.$get= function(){
            let shoppingList= new ShoppingListCheckOffService(provider.defaultList);
            return shoppingList;
        };
    }
})();