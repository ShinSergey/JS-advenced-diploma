import themes from './themes';
import Bowman from './Characters/Bowman';
import Swordsman from './Characters/Swordsman';
import Magician from './Characters/Magician';
import Vampire from './Characters/Vampire';
import Deamon from './Characters/Deamon';
import Undead from './Characters/Undead';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import { gameCtrl } from './app'

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
    this.gamePlay.addCellEnterListener(index => this.onCellEnter(index));
  }

  onCellClick(index) {
    // TODO: react to click

  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    document.addEventListener('mousemove', e => {
      if (document.elementFromPoint(e.clientX, e.clientY).classList.contains('character')) {
        const target = document.elementFromPoint(e.clientX, e.clientY)
        this.gamePlay.showCellTooltip('info', index)
      }
    })
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
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

      team.characters.forEach((element) => {
        const positionedCharacter = new PositionedCharacter(element, array[Math.floor(Math.random() * array.length)]);
        array.splice(array.indexOf(positionedCharacter.position), 1);
        positionsArray.push(positionedCharacter);
      });
    }
    getPosition(blueTeam, boardSize - boardSize, bluePositions);
    getPosition(redTeam, boardSize - 2, redPositions);

    this.gamePlay.redrawPositions(positionsArray);
  }
}
