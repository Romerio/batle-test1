
// Criando publis para lista de players por usuário logado
Meteor.publish("thePlayers", function() {
	var currentUserId = this.userId;
	return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
	"insertPlayerData": function(playerName, playerScore) {
		var currentUserId = Meteor.userId();
		PlayersList.insert({
			name: playerName,
			score: playerScore,
			createdBy: currentUserId
		});
		console.log("sendLogMessage");
	},

	"removePlayerData": function(selectedPlayer) {
		var currentUserId = Meteor.userId();
		PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
	},

	"modifyPlayerScore": function(selectedPlayer, scoreValue) {
		var currentUserId = Meteor.userId();
		PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId},
							{$inc: {score: scoreValue}});
	}
});


