import './style.css';
import {MakeGridDiv} from './make_grid.js'
import {Knights} from './motion.js'

const input_size_x = document.getElementById('size_grid_x')
const input_size_y = document.getElementById('size_grid_y')
const grid_cont = document.querySelector('.conteiner')
const btn = document.querySelector('button')
let pointsArr = []


/**************************Отслеживание регулятора размера сетки*******************/
input_size_x.addEventListener('input', () => { 
    MakeGridDiv(input_size_x.value, input_size_y.value)
});
input_size_y.addEventListener('input', () => { 
    MakeGridDiv(input_size_x.value, input_size_y.value)
});
/**********************************************************************************/

/******************Отслеживание ячеек****/
grid_cont.addEventListener('click', function (event) {
    if (event.target.closest('.grid_item')) {
        if (pointsArr.length != 2) {
            event.target.className = "choice";
            pointsArr.push(event.target)
        }
    }
  });      
/*****************************************/

/*****************Отслеживаем кнопку****************************************/
btn.addEventListener('click', () => {
    if (pointsArr.length == 2) {
        const input_size_x = document.getElementById('size_grid_x')
        const input_size_y = document.getElementById('size_grid_y')
        let road = Knights([Number(pointsArr[0].getAttribute('x')),
                            Number(pointsArr[0].getAttribute('y'))],
                           [Number(pointsArr[1].getAttribute('x')),
                            Number(pointsArr[1].getAttribute('y'))],
                            input_size_x.value, input_size_y.value)
        ShowPoints(road)
    } 
})
/***************************************************************************/

/******************Показать точки******************************************/
function ShowPoints(arr) {
    const grid_items = document.querySelectorAll('.grid_item')
    arr.forEach(arr_elem => {
        let point_x = Number(arr_elem[0])
        let point_y = Number(arr_elem[1])
        grid_items.forEach(grid_elem => {
            let grid_elem_x = Number(grid_elem.getAttribute('x'))
            let grid_elem_y = Number(grid_elem.getAttribute('y'))
            if(point_x == grid_elem_x && point_y == grid_elem_y) {
                grid_elem.className = "road_point";
            }
        })
    })
}
/**************************************************************************/

/***После загрузки DOM дерева****/
document.addEventListener("DOMContentLoaded", () => {
    MakeGridDiv(input_size_x.value, input_size_y.value)
})

export {pointsArr}
