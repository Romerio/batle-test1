Meteor.subscribe("thePlayers");

// Adicionando Helpers
Template.leaderboard.helpers({
	"player": function() {
		var currentUserId = Meteor.userId();
		return PlayersList.find({},
								{sort: {score: -1, name: 1}
								});
	},
	"selectedClass": function() {
		var playerId = this._id;
		var selectedPlayer = Session.get("selectedPlayer");
		if(playerId == selectedPlayer){
			return "selected";
		}
	},
	"showSelectedPlayer": function() {
		var selectedPlayer = Session.get("selectedPlayer");
		return PlayersList.findOne(selectedPlayer);
	}
});

// Adicionando eventos de click aos players
Template.leaderboard.events({
	"click .player": function(){
		var playerId = this._id;;
		Session.set("selectedPlayer", playerId);

	},

	"click .increment": function(){
		var selectedPlayer = Session.get("selectedPlayer");
		Meteor.call("modifyPlayerScore", selectedPlayer, 5);
	},

	"click .decrement": function(){
		var selectedPlayer = Session.get("selectedPlayer");
		Meteor.call("modifyPlayerScore", selectedPlayer, -5);
	},

	"click .remove": function(){
		var alertConfirm = confirm("Tem certeza que deseja remover?")

		if (alertConfirm){
			var selectedPlayer = Session.get("selectedPlayer");
			Meteor.call("removePlayerData", selectedPlayer);
		}

	}
});

// Adicionando evento de click ao Form
Template.addPlayerForm.events({
	"submit form": function(event){
		event.preventDefault();

		var playerName = event.target.playerName.value;
		var playerScore = parseInt(event.target.playerScore.value);
		var currentUserId = Meteor.userId();

		if (playerName && playerScore != undefined){

			Meteor.call("insertPlayerData", playerName, playerScore);

			event.target.playerName.value = "";
			event.target.playerScore.value = "";
			
		} else {
			alert("Insira nome e score.");
		}

	}
});
