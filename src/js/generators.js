import Bowman from "./Characters/Bowman";
import Swordsman from "./Characters/Swordsman";
import Magician from "./Characters/Magician";

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const randomType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const randomLevel = Math.floor(Math.random() * maxLevel) + 1;
  yield new randomType(randomLevel);
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  let generator = characterGenerator(allowedTypes, maxLevel)
  let characters = [];
  while (characters.length <= characterCount - 1) {
    let char = generator.next(allowedTypes, maxLevel)
    characters.push(char)
  }
  return new Team(characters);
}
