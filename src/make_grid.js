import {pointsArr} from './index.js'

function MakeGridDiv(size_x, size_y) {
    let coordinateStart = [1, 1]   
    let coordinateEnd = [size_x, size_y]// X, Y
    let max_y = coordinateEnd[1]// сколько строк будет
    let start_x = coordinateStart[0]//будет изменятся в цикле

    const grid_cont = document.querySelector('.conteiner')

    grid_cont.style.setProperty('--grid-rows', size_y);
    grid_cont.style.setProperty('--grid-columns', size_x);

    ClearGrid(grid_cont)

    while (max_y > 0) {
      
      if(start_x > coordinateEnd[0]) {
        max_y = max_y - 1;
        start_x = coordinateStart[0]
        continue
      }

      let cell = document.createElement("div")
      cell.setAttribute('x', start_x)
      cell.setAttribute('y', max_y)
      start_x = start_x + 1
      grid_cont.appendChild(cell).className = "grid_item";
    }
    return
}

function ClearGrid(target) {
  pointsArr.length = 0
  while (target.firstChild) {
      target.removeChild(target.firstChild)
  }
  return
}

export {MakeGridDiv}