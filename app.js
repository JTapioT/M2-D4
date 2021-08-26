generateTeams = function() {
  let generateTeamsBtn = document.querySelector(".generateTeamsBtn");
  let textArea = document.querySelector(".form-control");
  let teamInputAmount = document.querySelector("#inputGroupSelect");

  // Generate teams button logic:
  generateTeamsBtn.onclick = function(event) {
    // Comes in one string form:
    let playersTotalStr = textArea.value;
    // To array form:
    let playersTotal = playersTotalStr.split(',');

    console.log("Total amount of players:");
    console.log(playersTotal.length);

    // Calculations - Total teams and max players per team:
    let teamsTotal = teamInputAmount.value;
    let teamMaxPlayers = Math.ceil(playersTotal.length / teamsTotal);

    // Teams - Array of sub-arrays which contain teams with players:
    let teams = [];
    for(let i=0; i<teamsTotal; i++) {
      teams.push([]);
    }

    // Divide players to teams
    for (let j = 0; j < playersTotal.length; j++) {
      // NEEDS MORE LOGIC!!

      for(let k=0; k < teams.length; k++) {
        let randomTeam = Math.floor(Math.random() * teams.length);
        if(teams[randomTeam].length < teamMaxPlayers) {
          teams[randomTeam].push(playersTotal[j]);
          break;
        } 
      }
    }

    console.log("Teams:");
    console.log(teams);



    // Create elements for teams:
    let containerElement = document.createElement('div');
    containerElement.classList.add('container');
    containerElement.classList.add('teamContainer');
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
  let resetTeamsBtn = document.querySelector(".resetTeamsBtn");
  resetTeamsBtn.onclick = function() {
    textArea.value = "";
    teamInputAmount.value = "Choose amount of teams";

    let teamContainer = document.querySelector(".teamContainer");
    teamContainer.remove();
  }

}



window.onload = function() {
  generateTeams();
}