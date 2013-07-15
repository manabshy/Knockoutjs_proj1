!(function () {

	///
    // Start the app
    ///
    require(
        ['knockout',
         'summary'],
        function (ko, summaryVM) {
		/*
			var testData = "[{'name':'Item','value':'20'}, {'name':'Item','value':'20'}, {'name':'Item','value':'20'}, {'name':'Item','value':'20'}, {'name':'Item','value':'30.50'}]",
				summaryModule = new summaryVM(testData);
		*/		
			var testData = '{"dataval":[' +
			'{"name":"Item","value":"20" },' +
			'{"name":"Item","value":"20" },' +
			'{"name":"Item","value":"20" },' +
			'{"name":"Item","value":"20" },' +			
			'{"name":"Item","value":"30.50" }]}',
			   summaryModule = new summaryVM(testData),	
			   obj  = eval('(' + testData + ')');
                
			//alert(obj.dataval.length);  
            ko.applyBindings(summaryModule, document.getElementById('test-section'));
	    
		// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
			// Class to represent a row in the seat reservations grid
			function SeatReservation(name, initialMeal) {
				var self = this;
				self.name = name;
				self.meal = ko.observable(initialMeal);

				self.formattedPrice = ko.computed(function() {
					var price = self.meal().price;
					return price ? "$" + price.toFixed(2) : "None";        
				});    
            } 
			// Overall viewmodel for this screen, along with initial state
			function ReservationsViewModel() {
				var self = this;

				// Non-editable catalog data - would come from the server
				self.availableMeals = [
					{ mealName: "Standard (sandwich)", price: 0 },
					{ mealName: "Premium (lobster)", price: 34.95 },
					{ mealName: "Ultimate (whole zebra)", price: 290 }
				];    

				// Editable data
				//alert(summaryModule.value[0]);
				self.seats = ko.observableArray([
					new SeatReservation(obj.dataval[0].value, self.availableMeals[0]),
					new SeatReservation(obj.dataval[1].value, self.availableMeals[0]),
				    new SeatReservation(obj.dataval[2].value, self.availableMeals[0]),
					new SeatReservation(obj.dataval[3].value, self.availableMeals[0]),
					new SeatReservation(obj.dataval[4].value, self.availableMeals[0]),

				]);
				// Operations
				self.addSeat = function() {
					self.seats.push(new SeatReservation("", self.availableMeals[0]));
				}
				self.removeSeat = function(seat) { self.seats.remove(seat) }
				this.fullTotal = ko.computed(function() {
					return self.seats.total;    
				}, this);
				
			}

			ko.applyBindings(new ReservationsViewModel());	
         });			
})();