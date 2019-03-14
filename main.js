'use strict';

let app = new Vue({
	el: '#app',
	data: {
		source: dataSource,
		sweetness: dataSweetness,
		toppings: dataToppings,
		selected: {
			source: dataSource.findIndex(item => item.default),
			size: 3,
			spiciness: dataSpiciness.findIndex(item => item.default),
			sweetness: dataSweetness.findIndex(item => item.default),
			toppings: []
		}
	},
	computed: {
		sizePrice: function () {
			let scale = this.selected.source >= 2 ? 134 : 107 ;
			if(this.selected.size == 2) return -51 ;
			else return ( this.selected.size -3 ) * scale;
		},
		totalPrice: function () {
			let toppingTotalPrice = 0;
			this.selected.toppings.forEach(function(val,index,ar){
				toppingTotalPrice += dataToppings[val].price;
			});
			return dataSource[this.selected.source].price + 
					this.sizePrice + 
					dataSpiciness[this.selected.spiciness].price + 
					dataSweetness[this.selected.sweetness].price +
					toppingTotalPrice;
		},
		isAzurlane: function () {
			return this.totalPrice > 900;
		},
		spiciness: function () {
			if(!this.menuDisable || !this.menuDisable.spiciness){
				return dataSpiciness;
			}else{
				let that = this;
				let newSpiciness = objectClone(dataSpiciness);
				newSpiciness.forEach(function(item,index,ar){
					if(that.menuDisable.spiciness.indexOf(item.name) >= 0)
						item.disabled = true;
					else
						item.disabled = false;
				});
				if(newSpiciness[this.selected.spiciness].disabled)
					this.selected.spiciness = dataSpiciness.findIndex(item => item.default);
				return newSpiciness;
			}
		},
		menuDisable: function () {
			return dataSource[this.selected.source].disable || {};
		}
	}
});

let objectClone = function(obj){
	if(typeof obj == "object"){
		let newObj = null;
		if(Array.isArray(obj))
			newObj = [];
		else
			newObj = {};
		Object.keys(obj).forEach(function(key){
			newObj[key] = objectClone(obj[key]);
		});
		return newObj;
	}else{
		return obj;
	}
}