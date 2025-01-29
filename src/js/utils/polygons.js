import {
  getVectorLength,
  getRandomNumberFromTo,
  getRandomIndexFromTo,
  getVectorsDelta,
  getVectorsSum,
  numbersAreAlmostEqual,
} from './jsUtils';

export default function createSVGPolygon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  const width = getRandomIndexFromTo(70, 150);
  const height = getRandomIndexFromTo(80, 120);
  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);

  const polygon = document.createElementNS(svg.namespaceURI, 'polygon');
  polygon.setAttribute(
    'points',
    generatePolygonPoints({
      width,
      height,
      vertsCount: getRandomIndexFromTo(3, 8),
    }),
  );

  svg.append(polygon);
  return svg;
}

function generatePolygonPoints({ vertsCount, width, height }) {
  const centerPoint = [width / 2, height / 2];
  const angle = (2 * Math.PI) / vertsCount;

  const angleStepsCount = 10;
  const radiusStepsCount = 10;

  let pointsString = '';
  for (let i = 0; i < vertsCount; ++i) {
    const randomAngle = getRandomNumberFromTo({
      start: i * angle,
      end: (i + 1) * angle,
      stepsCount: angleStepsCount,
      includeStart: true,
    });
    const vertVector = [Math.cos(randomAngle), Math.sin(randomAngle)];
    const randomRadius = getSideRandomRadius({ vertVector, centerPoint, width, height, radiusStepsCount });
    const vert = getVectorsSum(centerPoint, vertVector, 1, randomRadius);
    pointsString = `${pointsString} ${vert[0]},${vert[1]}`;
  }

  return pointsString;
}

function getSideRandomRadius({ vertVector, centerPoint, width, height, radiusStepsCount }) {
  const borderPoint = getLineBorderIntersection({ lineVector: vertVector, centerPoint, width, height });
  if (!borderPoint) {
    throw new Error('error while generating a polygon');
  }
  const maxVector = getVectorsDelta(centerPoint, borderPoint);
  const maxLength = getVectorLength(maxVector);
  return getRandomNumberFromTo({ start: maxLength / 3, end: maxLength, stepsCount: radiusStepsCount, includeEnd: true });
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
