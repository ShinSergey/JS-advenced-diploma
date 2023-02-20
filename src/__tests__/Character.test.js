import Character from "../js/Character";
import Bowman from "../js/Characters/Bowman";

test('should throw error', () => {
     expect(new Character(1)).toThrow('Класс не найден');
  });

  test('should create character', () => {
    expect(new Bowman(1)).toEqual({
        type: 'Bowman',
        attack: 25,
        defence: 25,
        health: 50,
        level: 1,
    });
 });