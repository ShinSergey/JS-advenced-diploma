import themes from './themes';
import Bowman from './Characters/Bowman';
import Swordsman from './Characters/Swordsman';
import Magician from './Characters/Magician';
import Vampire from './Characters/Vampire';
import Deamon from './Characters/Deamon';
import Undead from './Characters/Undead';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import GamePlay from './GamePlay';
import Maths from './Maths';

export default class GameController { 
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.positionsArray = [];
    this.selected = null;
    this.hoverCell = null;
    this.last = null;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.rendering();
    this.gamePlay.addCellEnterListener(index => this.onCellEnter(index, event));
    this.gamePlay.addCellLeaveListener(index => this.onCellLeave(index, event));
    this.gamePlay.addCellClickListener(index => this.onCellClick(index, event));
  }

  onCellClick(index, event) {
    // TODO: react to click 
    if (event.target.classList.contains('bowman') || event.target.classList.contains('swordsman') || event.target.classList.contains('magician')) {
      this.gamePlay.selectCell(index)
    } else (
      GamePlay.showError()
    )
  }

  onCellEnter(index, event) {
    // TODO: react to mouse enter
      if (event.target.firstChild.classList.contains('character')) {
        let info = this.showStats(index)
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

    const Array = [];

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
        Array.push(positionedCharacter);
      });
    }

    getPosition(blueTeam, boardSize - boardSize, bluePositions);
    getPosition(redTeam, boardSize - 2, redPositions);
    this.positionsArray = Array;
    this.gamePlay.redrawPositions(Array);
  }

  showStats(index) {
    let char = this.positionsArray.filter(obj => {
      return obj.position === index;
    })
    return `\u{1F396}${char[0].character.value.level} \u2694${char[0].character.value.attack} \u{1F6E1}${char[0].character.value.defence} \u2764${char[0].character.value.health}`;
  }
}
