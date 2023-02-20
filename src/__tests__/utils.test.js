import { calcTileType } from '../js/utils';

test('should calcTileType', () => {
  const tile = calcTileType(17, 8);

  expect(tile).toEqual('center');
});

test('should calcTileType', () => {
  const tile = calcTileType(0, 8);

  expect(tile).toEqual('top-left');
});

test('should calcTileType', () => {
  const tile = calcTileType(7, 8);

  expect(tile).toEqual('top-right');
});

test('should calcTileType', () => {
  const tile = calcTileType(3, 8);

  expect(tile).toEqual('top');
});

test('should calcTileType', () => {
  const tile = calcTileType(56, 8);

  expect(tile).toEqual('bottom-left');
});

test('should calcTileType', () => {
  const tile = calcTileType(63, 8);

  expect(tile).toEqual('bottom-right');
});

test('should calcTileType', () => {
  const tile = calcTileType(60, 8);

  expect(tile).toEqual('bottom');
});

test('should calcTileType', () => {
  const tile = calcTileType(23, 8);

  expect(tile).toEqual('right');
});

test('should calcTileType', () => {
  const tile = calcTileType(16, 8);

  expect(tile).toEqual('left');
});
