import { getRandomIndexFromTo } from './jsUtils';
import createSVGPolygon from './polygons';

export function doAction(actionName) {
  switch (actionName) {
    case 'create':
      createPolygons();
      break;
    default:
      break;
  }
}

export function createPolygons() {
  const bufferArea = document.querySelector('buffer-area');
  bufferArea.innerHTML = '';

  const polygonsCount = getRandomIndexFromTo(5, 20);

  for (let i = 0; i < polygonsCount; i += 1) {
    const svg = createSVGPolygon();
    bufferArea.append(svg);
  }
}
