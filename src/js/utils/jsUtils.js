export function getRandomIndexFromTo(start, end) {
  const randomRest = Math.random();
  const randomNumber = randomRest * (end - start) + start;
  return Math.floor(randomNumber);
}

export function getRandomNumberFromTo({ start, end, stepsCount, includeStart = false, includeEnd = false }) {
  const length = end - start;
  const step = length / stepsCount;

  const startIndex = includeStart ? 0 : 1;
  const endIndex = includeEnd ? stepsCount + 1 : stepsCount;
  const randomIndex = getRandomIndexFromTo(startIndex, endIndex);
  return start + randomIndex * step;
}

export function getVectorsDelta(firstPoint, secondPoint) {
  return [secondPoint[0] - firstPoint[0], secondPoint[1] - firstPoint[1]];
}

export function getVectorsSum(firstPoint, secondPoint, firstCoeff = 1, secondCoeff = 1) {
  return [
    firstCoeff * firstPoint[0] + secondCoeff * secondPoint[0],
    firstCoeff * firstPoint[1] + secondCoeff * secondPoint[1],
  ];
}

export function getVectorLength(point) {
  return Math.sqrt(point[0] ** 2 + point[1] ** 2);
}

export function numbersAreAlmostEqual(firstNumber, secondNumber) {
  return Math.abs(firstNumber - secondNumber) < 0.000001;
}

export function setDraggedObjectPosition({ clientX, clientY, draggedObject, width, height }) {
  draggedObject.style.left = `${clientX + window.scrollX - width / 2}px`;
  draggedObject.style.top = `${clientY + window.scrollY - height / 2}px`;
}

export function generateKey(prefix) {
  return `${prefix}-${Math.random().toString(16).slice(2)}`;
}

export function throttled(func, period) {
  let lastCallTime = null;

  return function (...rest) {
    if (!lastCallTime) {
      lastCallTime = Date.now();
      func(...rest);
      return;
    }
    if (Date.now() - lastCallTime < period) {
      return;
    }
    lastCallTime = Date.now();
    func(...rest);
  };
}
