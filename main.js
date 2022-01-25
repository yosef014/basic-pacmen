var gBorder = []
var gPacmen = {}
var gGhost = []
var gScore
var intervalGhost
var isGameOver

const PLAYER = '😺'
const GHOST = '👻'
const FOOD = '◽'
const SUPER = '⚡'
const WALL = '🟥'





function init() {
    isGameOver = false
    gScore = 0
    makeBorder(100)
    renderBorder()

}

function makeBorder(cellsNum) {
    var size = Math.sqrt(cellsNum)
    for (var i = 0; i < size; i++) {
        gBorder[i] = []
        for (var j = 0; j < size; j++) {
            gBorder[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                gBorder[i][j] = WALL
            }
        }
    }
    createPacman();
    createGhosts(3)
    intervalGhost = setInterval(moveGhosts, 900);

}

function renderBorder() {
    var strHtml = ''
    var elTable = document.querySelector('.table_game')
    for (var i = 0; i < gBorder.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gBorder[0].length; j++) {
            strHtml += `<th class="cell cell-${i}-${j}">${gBorder[i][j]}</th>`

        }
        strHtml += '</tr>'
        elTable.innerHTML = strHtml

    }



}

function createPacman() {

    gPacmen = {
        isSuper: false,
        location: {
            i: 5,
            j: 5
        }

    }
    gBorder[gPacmen.location.i][gPacmen.location.j] = PLAYER

}

function createGhosts(ghostNum) {

    for (var i = 0; i < ghostNum; i++) {
        var randomLoation = getRandomEmptyLocation()
        gGhost[i] = {
            location: {
                i: randomLoation.i,
                j: randomLoation.j
            },
            imSitigOn: FOOD
        }
        gBorder[gGhost[i].location.i][gGhost[i].location.j] = GHOST
    }


}

function moveGhosts() {
    var nextLocation = {}
    for (var i = 0; i < gGhost.length; i++) {

        var randomalInt = getRandomInt(1, 5)
        if (randomalInt === 1) {
            nextLocation = {
                newI: gGhost[i].location.i + 1,
                newj: gGhost[i].location.j
            }
        } else if (randomalInt === 2) {
            nextLocation = {
                newI: gGhost[i].location.i - 1,
                newj: gGhost[i].location.j
            }

        } else if (randomalInt === 3) {
            nextLocation = {
                newI: gGhost[i].location.i,
                newj: gGhost[i].location.j + 1
            }
        } else if (randomalInt === 4) {
            nextLocation = {
                newI: gGhost[i].location.i,
                newj: gGhost[i].location.j - 1
            }

        }

        if (gBorder[nextLocation.newI][nextLocation.newj] === WALL) return
        if (gBorder[nextLocation.newI][nextLocation.newj] === GHOST) return
        if (gBorder[nextLocation.newI][nextLocation.newj] === PLAYER) { gameOver();  return }
        gBorder[gGhost[i].location.i][gGhost[i].location.j] = gGhost[i].imSitigOn
        gGhost[i].imSitigOn = gBorder[nextLocation.newI][nextLocation.newj]
        gBorder[nextLocation.newI][nextLocation.newj] = GHOST
        gGhost[i].location.i = nextLocation.newI
        gGhost[i].location.j = nextLocation.newj
        renderBorder()
        // gBorder[gGhost[i].location.i][gGhost[i].location.j]
    }



}
function movePacman(event) {
    if (isGameOver) return
    var nextLocation = {
        newI: gPacmen.location.i,
        newj: gPacmen.location.j
    }

    switch (event.code) {
        case 'ArrowUp':
            nextLocation.newI--
            break;
        case 'ArrowDown':
            nextLocation.newI++
            break;
        case 'ArrowLeft':
            nextLocation.newj--
            break;
        case 'ArrowRight':
            nextLocation.newj++
            break;
        default: return null
    }
    if (gBorder[nextLocation.newI][nextLocation.newj] === WALL) return
    if (gBorder[nextLocation.newI][nextLocation.newj] === GHOST) { gameOver(); return }
    if (gBorder[nextLocation.newI][nextLocation.newj] === FOOD) gScore++
    document.querySelector('h2 span').innerText = gScore
    gBorder[gPacmen.location.i][gPacmen.location.j] = ''
    gBorder[nextLocation.newI][nextLocation.newj] = PLAYER
    gPacmen.location.i = nextLocation.newI
    gPacmen.location.j = nextLocation.newj
    renderBorder()
    checkIfAllFoodOver()

}







function getRandomEmptyLocation() {

    var emptyLocactionsArr = []
    for (var i = 0; i < gBorder.length; i++) {
        for (var j = 0; j < gBorder[i].length; j++) {
            if (gBorder[i][j] !== WALL) {
                emptyLocactionsArr.push({ i: i, j: j })


            }
        }
    }
    var random = emptyLocactionsArr[getRandomInt(0, emptyLocactionsArr.length)]
    return random
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function gameOver() {
    clearInterval(intervalGhost);
    isGameOver = true
    document.querySelector('h2').innerText = `game over, your sorce:${gScore}`

}

function restartBt() {
    document.querySelector('h2').innerHTML = `score:<span>0</span>`


    init()
}

function checkIfAllFoodOver() {
    for (var i = 0; i < gBorder.length; i++) {
        for (var j = 0; j < gBorder[i].length; j++) {
            if (gBorder[i][j] === FOOD) return

        }
        

    }
         gameOver()

}