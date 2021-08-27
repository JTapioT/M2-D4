generateTeams = function() {
  let generateTeamsBtn = document.getElementById("generateTeamsBtn");
  let textArea = document.querySelector(".form-control");
  let teamInputAmount = document.querySelector("#inputGroupSelect");

  /* if(textArea.value === "") {
    return; 
    // Maybe try to introduce modal later which asks to name players 
    // before generating teams.
  } */

  // Generate teams button logic:
  generateTeamsBtn.onclick = function(event) {
    // Comes in one string form:
    let playersTotalStr = textArea.value;
    // To Array form:
    let playersTotal = playersTotalStr.split(',');

    console.log("Total amount of players:");
    console.log(playersTotal.length);

    // SMALL CALCULATIONS:
    // Total amount of teams:
    let teamsTotal = parseInt(teamInputAmount.value);
    // Amount of players / team:
    // Un-even teams taken into consideration?
    let teamMaxPlayers;
    let isNonEvenTeams;
    if(playersTotal.length % 2 === 0) {
      teamMaxPlayers = playersTotal.length / teamsTotal;
    } else {
      // In a way this creates a problem when later assigning players to teams?
      isNonEvenTeams = true;
      teamMaxPlayers = Math.floor(playersTotal.length / teamsTotal);
    }
    //teamMaxPlayers = playersTotal.length / teamsTotal;

    // Teams: Array of sub-arrays (teams) which contain players of the team:
    let teams = [];
    for(let i = 0; i<teamsTotal; i++) {
      teams.push([]);
    }


    // Assign players to teams randomly
    // Outer-loop - Go through each player
    // Inner-loop - Assign randomly to available teams
    for (let i = 0; i < playersTotal.length; i++) {

      // In a situation when we have un-even teams. 
      // Inner-loop below will assign players to teams until they are filled
      // Hence, last player will always be left out of even teams
      // Randomly just add last player to some team:
      if(isNonEvenTeams && i === (playersTotal[i].length -1)) {
        let randomTeam = Math.floor(Math.random() * teams.length);
        teams[randomTeam].push(playersTotal[i]);
        break;
      }

      
      
   /*    let isTeamsEvenlyAssigned;
      for (m = 0; m < teams.length; m++) {
        if (m === teams.length - 1) {
          if (teams[m].length === teams[m - 1].length) {
            isTeamsEvenlyAssigned = true;
            break;
          } else {
            isTeamsEvenlyAssigned = false;
            break;
          }
        } else {
          if (teams[m].length === teams[m + 1].length) {
            isTeamsEvenlyAssigned = true;
            continue;
          } else {
            isTeamsEvenlyAssigned = false;
            continue;
          }
        }
      } */

      for(let k = 0;; k++) {
        let randomTeam = Math.floor(Math.random() * teams.length);

        if(teams[randomTeam].length < teamMaxPlayers) {
          teams[randomTeam].push(playersTotal[i]);
          break;
        } else {
          continue;
        }
      }
    }

    console.log("Teams:");
    console.log(teams);



    // Create elements for teams:
    let containerElement = document.createElement('div');
    containerElement.classList.add('container');
    containerElement.id = 'teamContainer';
    document.body.appendChild(containerElement);


    for(let i=0; i<teams.length; i++) {
      let teamHeader = document.createElement("h4");
      // Append Header before row:
      teamHeader.innerText = `Team: ${i+1}`;
      containerElement.appendChild(teamHeader);

      let ulList = document.createElement("ul");

      for(let j=0; j < teams[i].length; j++) {
        let playerLi = document.createElement("li");
        playerLi.innerText = teams[i][j];

        ulList.appendChild(playerLi);
      } 
      teamHeader.after(ulList);

    }
  }


  // Reset button logic:
  let resetTeamsBtn = document.getElementById("resetTeamsBtn");

  resetTeamsBtn.onclick = function() {
    textArea.value = "";
    teamInputAmount.value = "Choose amount of teams";

    let teamContainer = document.getElementById("teamContainer");
    if(teamContainer !== null) {
      teamContainer.remove();
    } else {
      return;
    }
  }

}



window.onload = function() {
  generateTeams();
}