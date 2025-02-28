import {
  getVectorLength,
  getRandomNumberFromTo,
  getVectorsDelta,
  getVectorsSum,
  numbersAreAlmostEqual,
  getRandomIndexFromTo,
  generateKey,
} from './jsUtils';

export default function generatePolygonsData({ maxHeight }) {
  const polygonsCount = getRandomIndexFromTo(5, 20);
  const polygonsData = [];
  for (let i = 0; i < polygonsCount; ++i) {
    polygonsData.push(
      generatePolygonData({
        width: getRandomIndexFromTo(80, 150),
        height: getRandomIndexFromTo(80, maxHeight),
        vertsCount: getRandomIndexFromTo(3, 12),
      }),
    );
  }
  return polygonsData;
}

export function generatePolygonData(param) {
  const { width, height } = param;
  const pointsArray = generatePolygonPoints(param);

  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  pointsArray.forEach((point) => {
    const [pointX, pointY] = point;

    minX = pointX < minX ? pointX : minX;
    maxX = pointX > maxX ? pointX : maxX;

    minY = pointY < minY ? pointY : minY;
    maxY = pointY > maxY ? pointY : maxY;
  });

  const points = pointsArray.reduce((pointString, point) => `${pointString} ${point[0] - minX},${point[1] - minY}`, '');

  return {
    key: generateKey('polygon'),
    width: maxX - minX,
    height: maxY - minY,
    points,
  };
}

function generatePolygonPoints({ vertsCount, width, height }) {
  const centerPoint = [width / 2, height / 2];
  const angle = (2 * Math.PI) / vertsCount;

  const angleStepsCount = 10;
  const radiusStepsCount = 10;

  const pointsArray = [];
  for (let i = 0; i < vertsCount; ++i) {
    const randomAngle = getRandomNumberFromTo({
      start: i * angle,
      end: (i + 1) * angle - angle / 3,
      stepsCount: angleStepsCount,
      includeStart: true,
    });
    const vertVector = [Math.cos(randomAngle), Math.sin(randomAngle)];
    const randomRadius = getSideRandomRadius({ vertVector, centerPoint, width, height, radiusStepsCount });
    const vert = getVectorsSum(centerPoint, vertVector, 1, randomRadius);
    pointsArray.push([Math.round(vert[0]), Math.round(vert[1])]);
  }

  return pointsArray;
}

function getSideRandomRadius({ vertVector, centerPoint, width, height, radiusStepsCount }) {
  const borderPoint = getLineBorderIntersection({ lineVector: vertVector, centerPoint, width, height });
  if (!borderPoint) {
    throw new Error('error while generating a polygon');
  }
  const maxVector = getVectorsDelta(centerPoint, borderPoint);
  const maxLength = getVectorLength(maxVector);
  return getRandomNumberFromTo({
    start: maxLength / 3,
    end: maxLength,
    stepsCount: radiusStepsCount,
    includeEnd: true,
  });
}

function getLineBorderIntersection(param) {
  return getLineIntersectionWithHorizontal(param) || getLineIntersectionWithVertical(param);
}

function getLineIntersectionWithHorizontal({ centerPoint, lineVector, width, height }) {
  if (numbersAreAlmostEqual(lineVector[1], 0)) {
    return null;
  }

  const lineTopStep = -centerPoint[1] / lineVector[1];
  const topPoint = getPointByLineStep(lineTopStep);
  if (topPoint) {
    return topPoint;
  }

  const lineBottomStep = (height - centerPoint[1]) / lineVector[1];
  const bottomPoint = getPointByLineStep(lineBottomStep);
  if (bottomPoint) {
    return bottomPoint;
  }

  function getPointByLineStep(lineStep) {
    if (lineStep < 0) {
      return null;
    }
    const borderPoint = getVectorsSum(centerPoint, lineVector, 1, lineStep);
    if (borderPoint[0] < 0 || borderPoint[0] > width) {
      return null;
    }
    return borderPoint;
  }

  return null;
}

function getLineIntersectionWithVertical({ centerPoint, lineVector, height, width }) {
  if (numbersAreAlmostEqual(lineVector[0], 0)) {
    return null;
  }

  const lineLeftStep = -centerPoint[0] / lineVector[0];
  const leftPoint = getPointByLineStep(lineLeftStep);
  if (leftPoint) {
    return leftPoint;
  }

  const lineRightStep = (width - centerPoint[0]) / lineVector[0];
  const rightPoint = getPointByLineStep(lineRightStep);
  if (rightPoint) {
    return rightPoint;
  }

  function getPointByLineStep(lineStep) {
    if (lineStep < 0) {
      return null;
    }
    const borderPoint = getVectorsSum(centerPoint, lineVector, 1, lineStep);
    if (borderPoint[1] < 0 || borderPoint[1] > height) {
      return null;
    }
    return borderPoint;
  }

  return null;
}

export function getPolygonDataByElement(polygonEl) {
  return {
    key: polygonEl.getAttribute('polygon-key'),
    width: Number(polygonEl.getAttribute('width')),
    height: Number(polygonEl.getAttribute('height')),
    points: polygonEl.getAttribute('points'),
  };
}

export function getPolygonsDataByElements(polygonEls) {
  return [...polygonEls].map((polygonEl) => getPolygonDataByElement(polygonEl));
}

export function renderPolygon(polygonData) {
  const polygon = document.createElement('generated-polygon');

  polygon.setAttribute('width', polygonData.width);
  polygon.setAttribute('height', polygonData.height);
  polygon.setAttribute('polygon-key', polygonData.key);
  polygon.setAttribute('points', polygonData.points);

  return polygon;
}
