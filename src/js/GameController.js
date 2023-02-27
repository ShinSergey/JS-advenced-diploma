import themes from "./themes";
import Bowman from "./Characters/Bowman"
import Swordsman from "./Characters/Swordsman"
import Magician from "./Characters/Magician"
import Vampire from "./Characters/Vampire"
import Deamon from "./Characters/Deamon"
import Undead from "./Characters/Undead"
import { generateTeam } from "./generators"
import redrawPositions from "./GamePlay"
import PositionedCharacter from "./PositionedCharacter"
import GamePlay from "./GamePlay";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.rendering()
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }

  rendering(boardSize = 8) {
    let blueTeam = generateTeam([Bowman, Swordsman, Magician], 4, 3);
    let redTeam = generateTeam([Vampire, Deamon, Undead], 4, 3);

    const positionsArray = []
    
    const fieldSize = boardSize * boardSize;

    let bluePositions = []
    let redPositions = []

    function getPosition(team, start, array) {
      for (let i = start; i <= fieldSize; i = i + boardSize) {
        if (array.length < boardSize * 2) {
          array.push(i, i + 1)
        }
      }

      team.characters.forEach(element => {
      let positionedCharacter = new PositionedCharacter(element, array[Math.floor(Math.random()*array.length)]);
      array.splice(array.indexOf(positionedCharacter.position), 1);
      positionsArray.push(positionedCharacter);
    })
  }
  getPosition(blueTeam, boardSize - boardSize, bluePositions)
  getPosition(redTeam, boardSize - 2, redPositions)

  this.gamePlay.redrawPositions(positionsArray);
  }
}

