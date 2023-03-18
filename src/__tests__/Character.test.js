import Character from '../js/Character';
import Bowman from '../js/Characters/Bowman';


test('should create character', () => {
  expect(new Bowman(1)).toEqual({
    type: 'bowman',
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
  });
});

test('should throw error', () => {
  expect(new Character(1, 'wizard')).toThrow('Класс не найден');
});