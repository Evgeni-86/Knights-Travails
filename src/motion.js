class StartPoint {
    constructor(start, motion, max) {
        this.root = this.BuildStartPoint(start, motion, max) 
    }

    BuildStartPoint(start, motion, max) {
        let root = new Node(start, motion, max)
        return root
    }

    FindeRoad(end_coordinates, motion, max) {
        let stack = [this.root]
        let rez = []
        let counter = 0
        while (stack.length || rez.length == 0) {
            let cur = stack.shift()
            counter++
            if (cur.coordinates[0]==end_coordinates[0] 
                            && cur.coordinates[1]==end_coordinates[1]) {
                rez.push(cur)
                break
            }

        for (let key in cur) {
            if(key.includes("motion")) {
                let x_point_end = end_coordinates[0]
                let y_point_end = end_coordinates[1]
                let x_point_cur = cur.coordinates[0]
                let y_point_cur = cur.coordinates[1]
                let x_point_new = Number(x_point_cur + cur[key][0])
                let y_point_new = Number(y_point_cur + cur[key][1])
                let cur_end_length = Math.sqrt(Math.pow(x_point_end - x_point_cur, 2) + 
                            Math.pow(y_point_end - y_point_cur, 2))
                let new_end_length = Math.sqrt(Math.pow(x_point_end - x_point_new, 2) + 
                            Math.pow(y_point_end - y_point_new, 2))
                let new_node = new Node([x_point_new,y_point_new], motion, max)
                new_node.parant = cur
                new_node.length = new_end_length
                if (new_end_length < cur_end_length) { stack.unshift(new_node) }
                else { stack.push(new_node) }
            }
        }  

        }
        function RezultShow (elem, arr=[]) {
            while (elem.parant != null) {
                let el = elem.coordinates
                arr.push(el)
                elem = elem.parant
            }
            arr.push(elem.coordinates)
            return arr.reverse()
        }
        return RezultShow(rez[0])
    }
}

class Node {
    constructor(coordinates, motion, end) {
        this.coordinates = coordinates; // координаты узла
        this.parant = null;   //здесь запоминаем родителя
        this.length = 0;
        this.Motion(coordinates, motion, end);//создаем возможные ходы
    }
    Motion(coordinates, motion, end) {
        let i = 0
        motion.forEach(element => {
            let x_point = Number(coordinates[0]+element[0])
            let y_point = Number(coordinates[1]+element[1])
            if (x_point>0 && x_point <= end[0] && y_point>0 && y_point <= end[1] ) {
                this['motion ' + i++] = element 
            }
        })
    }
}

function Knights(start, end, max_x, max_y) {
    if (start.length == 2 && end.length == 2) {
        let max = [max_x, max_y]//размер поля X, Y
        let motion = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]//возможные ходы
        let x_start = start[0]
        let y_start = start[1]
        let x_end = end[0]
        let y_end = end[1]
        if (Number.isInteger(x_start) && Number.isInteger(y_start)
            && Number.isInteger(x_end) && Number.isInteger(y_end)) {
                let startPoint = new StartPoint([Math.round(x_start), Math.round(y_start)], motion, max)
                return startPoint.FindeRoad([Math.round(x_end), Math.round(y_end)], motion, max)     
        }
    }
}

// Knights([1,1], [5,5], 10, 10)

export {Knights}