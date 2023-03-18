import { characterGenerator } from '../js/generators';
import Bowman from '../js/Characters/Bowman';
import Swordsman from '../js/Characters/Swordsman';
import Magician from '../js/Characters/Magician';

test('should generate', () => {
  const generator = characterGenerator([Bowman, Swordsman, Magician], 3);
  let char = {}
  let num = 1
  while (num < 10) {
    num = num + 1
    char = generator.next([Bowman, Swordsman, Magician], 3);
  }

  expect(char.value.type).toEqual('bowman' || 'swordsman' || 'magician');
});

test('should generate leveled team', () => {
  const team = generateTeam([Bowman, Swordsman, Magician], 3, 3);
  team.forEach((element) => {
    expect(element.value.level).toEqual(1 || 2 || 3);
  });
});

test('should generate huge team', () => {
  const team = generateTeam([Bowman, Swordsman, Magician], 7, 5);
  expect(team.length).toEqual(7);
});
