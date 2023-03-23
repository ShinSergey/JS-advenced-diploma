import themes from './themes';
import Bowman from './Characters/Bowman';
import Swordsman from './Characters/Swordsman';
import Magician from './Characters/Magician';
import Vampire from './Characters/Vampire';
import Deamon from './Characters/Deamon';
import Undead from './Characters/Undead';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';

export default class GameController { 
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.rendering();
    this.gamePlay.addCellEnterListener(index => this.onCellEnter(index, event));
    this.gamePlay.addCellLeaveListener(index => this.onCellLeave(index, event));
  }

  onCellClick(index) {
    // TODO: react to click

  }

  onCellEnter(index, event) {
    // TODO: react to mouse enter
      if (event.target.firstChild.classList.contains('character')) {
        let info = this.showStats(event.target.firstChild)
        this.gamePlay.showCellTooltip(info, index)
      }
  }

  onCellLeave(index, event) {
    // TODO: react to mouse leave
      if (event.target.firstChild.classList.contains('character')) {
        this.gamePlay.hideCellTooltip(index)
      }
  }

  rendering(boardSize = 8) {
    const blueTeam = generateTeam([Bowman, Swordsman, Magician], 4, 3);
    const redTeam = generateTeam([Vampire, Deamon, Undead], 4, 3);

    const positionsArray = [];

    const fieldSize = boardSize * boardSize;

    const bluePositions = [];
    const redPositions = [];

    function getPosition(team, start, array) {
      for (let i = start; i <= fieldSize; i += boardSize) {
        if (array.length < boardSize * 2) {
          array.push(i, i + 1);
        }
      }

      team.characters.forEach(function(element) {
        const positionedCharacter = new PositionedCharacter(element, array[Math.floor(Math.random() * array.length)]);
        array.splice(array.indexOf(positionedCharacter.position), 1);
        positionsArray.push(positionedCharacter);
      });
    }

    getPosition(blueTeam, boardSize - boardSize, bluePositions);
    getPosition(redTeam, boardSize - 2, redPositions);

    this.gamePlay.redrawPositions(positionsArray);
  }

  showStats(char) {
    console.log(`U+1F396 ${char.level} ⚔10 🛡40 ❤50`);

    return char;
  }
}
