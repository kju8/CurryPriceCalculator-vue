let app = new Vue({
	el: '#app',
	data: {
		selected: {
			source: source.findIndex(item => item.default),
			size: 3,
			spiciness: spiciness.findIndex(item => item.default),
			sweetness: sweetness.findIndex(item => item.default),
			toppings: []
		}
	},
	computed: {
		sizePrice: function () {
			let scale = this.selected.source > 2 ? 134 : 107 ;
			if(this.selected.size == 2) return -51 ;
			else return ( this.selected.size -3 ) * scale;
		},
		totalPrice: function () {
			let toppingTotalPrice = 0;
			this.selected.toppings.forEach(function(val,index,ar){
				toppingTotalPrice += toppings[val].price;
			});
			return source[this.selected.source].price + 
					this.sizePrice + 
					spiciness[this.selected.spiciness].price + 
					sweetness[this.selected.sweetness].price +
					toppingTotalPrice;
		},
		isAzurlane: function () {
			return this.totalPrice > 900;
		}
	}
})