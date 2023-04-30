import {Grid} from "./grid.js";
import {Tile} from "./tile.js";


let scoreText = document.getElementById("score");
let maxScoreText = document.getElementById("max_score");
maxScoreText.innerText = 1456;


const gameBoard = document.getElementById("game_board");
const chooseLevel = document.getElementById("choose_level");

gameBoard.style.display = "none";

const newGameButton = document.getElementById("new-game-button");
const autoGameButton = document.getElementById("auto-game-button");

const level1Button = document.getElementById("levelBtn1");
const level2Button = document.getElementById("levelBtn2");
const level3Button = document.getElementById("levelBtn3");

let grid;

newGameButton.addEventListener("click", function() {
    console.log(grid)
    gameBoard.style.display = "none";
    chooseLevel.style.display = "flex";
    if(!!grid){
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
    }
});
autoGameButton.addEventListener("click", function() {
    console.log(grid)
    gameBoard.style.display = "none";
    chooseLevel.style.display = "flex";
    if(!!grid){
        while (gameBoard.firstChild) {
            gameBoard.removeChild(gameBoard.firstChild);
        }
    }
    startAutoGame(4);
});

level1Button.addEventListener("click", function () {
    start(4);
    gameBoard.style.setProperty("--cell-size", 17.5+"vmin");
});
level2Button.addEventListener("click", function () {
    start(5);
    gameBoard.style.setProperty("--cell-size", 15+"vmin");
});
level3Button.addEventListener("click", function () {
    start(6);
    gameBoard.style.setProperty("--cell-size", 12.5+"vmin");
});
function start(size){
    console.log("start")
    gameBoard.style.display = "grid";
    chooseLevel.style.display = "none";

    gameBoard.style.setProperty("--size-board", size);

    grid = new Grid(gameBoard,size);

    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    setupInputOnce();

    function setupInputOnce() {
        window.addEventListener("keydown", handleInput, {once:true});
    }


    async function handleInput(event) {

        switch (event.key) {
            case "ArrowUp":
                if(!canMoveUp()) {
                    setupInputOnce();
                    return
                }
                await moveUp();
                break;
            case "ArrowLeft":
                if(!canMoveLeft()) {
                    setupInputOnce();
                    return
                }
                await moveLeft();
                break;
            case "ArrowDown":
                if(!canMoveDown()) {
                    setupInputOnce();
                    return
                }
                await moveDown();
                break;
            case "ArrowRight":
                if(!canMoveRight()) {
                    setupInputOnce();
                    return
                }
                await moveRight();
                break;
            default:
                await setupInputOnce();
                return
        }

        const newTile = new Tile(gameBoard);
        grid.getRandomEmptyCell().linkTile(newTile);

        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            await newTile.waitForAnimationEnd()
            alert("Try again!")
            return;
        }

        setupInputOnce();
    }

    async function moveUp() {
        await slideTiles(grid.cellsGroupedByColumn);
    }

    async function moveDown() {
        await slideTiles(grid.cellsGroupedByRevercedColumn);
    }

    async function moveLeft() {
        await slideTiles(grid.cellsGroupedByRow);
    }

    async function moveRight() {
        await slideTiles(grid.cellsGroupedByRevercedRow);
    }

    async function slideTiles(groupedCells) {
        const promises = [];
        groupedCells.forEach(group => slideTilesInGroup(group, promises));

        await Promise.all(promises);
        grid.cells.forEach(cell => {
            cell.hasTileForMerge() && cell.mergeTiles()
        });
    }
    function slideTilesInGroup(group, promises) {
        for (let i = 1; i < group.length; i++) {
            if(group[i].isEmpty()){
                continue;
            }

            const cellWithTile = group[i];
            let targetCell;
            for (let j = i-1; j >= 0; j--) {
                if(group[j].canAccept(cellWithTile.linkedTile)){
                    targetCell = group[j];
                }else break;
            }

            if(!targetCell) continue;

            promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

            if(targetCell.isEmpty()){
                targetCell.linkTile(cellWithTile.linkedTile)
            }else{
                scoreText.innerText = Number(scoreText.textContent)+Number(cellWithTile.linkedTile.value);
                targetCell.linkTileForMerge(cellWithTile.linkedTile);
            }

            cellWithTile.unlinkTile();
        }

    }

    function canMove(groupedCells) {
        return groupedCells.some(group => canMoveInGroup(group))
    }
    function canMoveInGroup(group) {
        return group.some((cell, index) => {
            if (index === 0) {
                return false;
            }

            if (cell.isEmpty()) {
                return false;
            }

            const targetCell = group[index - 1];
            return targetCell.canAccept(cell.linkedTile);
        });
    }

    function canMoveUp() {
        return canMove(grid.cellsGroupedByColumn);
    }

    function canMoveDown() {
        return canMove(grid.cellsGroupedByRevercedColumn);
    }

    function canMoveLeft() {
        return canMove(grid.cellsGroupedByRow);
    }

    function canMoveRight() {
        return canMove(grid.cellsGroupedByRevercedRow);
    }
}

function startAutoGame(size){
    console.log(12);
    gameBoard.style.display = "grid";
    chooseLevel.style.display = "none";

    gameBoard.style.setProperty("--size-board", size);

    grid = new Grid(gameBoard,size);

    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
    setupInputOnce();

    function setupInputOnce() {
        window.addEventListener("keydown", handleInput, {once:true});
    }


    async function handleInput(event) {

        while (true){
            let number = math.random()*10;
            if(number < 2.5){
                moveRight();
            }else if (number < 5){
                moveLeft();
            }else if (number < 5){
                moveUp();
            }else{
                moveDown();
            }
        }


        const newTile = new Tile(gameBoard);
        grid.getRandomEmptyCell().linkTile(newTile);

        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            await newTile.waitForAnimationEnd()
            alert("Try again!")
            return;
        }

        setupInputOnce();
    }

    async function moveDown() {
        await slideTiles(grid.cellsGroupedByRevercedColumn);
    }

    async function moveLeft() {
        await slideTiles(grid.cellsGroupedByRow);
    }

    async function moveRight() {
        await slideTiles(grid.cellsGroupedByRevercedRow);
    }

    async function slideTiles(groupedCells) {
        const promises = [];
        groupedCells.forEach(group => slideTilesInGroup(group, promises));

        await Promise.all(promises);
        grid.cells.forEach(cell => {
            cell.hasTileForMerge() && cell.mergeTiles()
        });
    }
    function slideTilesInGroup(group, promises) {
        for (let i = 1; i < group.length; i++) {
            if(group[i].isEmpty()){
                continue;
            }

            const cellWithTile = group[i];
            let targetCell;
            for (let j = i-1; j >= 0; j--) {
                if(group[j].canAccept(cellWithTile.linkedTile)){
                    targetCell = group[j];
                }else break;
            }

            if(!targetCell) continue;

            promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

            if(targetCell.isEmpty()){
                targetCell.linkTile(cellWithTile.linkedTile)
            }else{
                scoreText.innerText = Number(scoreText.textContent)+Number(cellWithTile.linkedTile.value);
                targetCell.linkTileForMerge(cellWithTile.linkedTile);
            }

            cellWithTile.unlinkTile();
        }

    }

    function canMove(groupedCells) {
        return groupedCells.some(group => canMoveInGroup(group))
    }
    function canMoveInGroup(group) {
        return group.some((cell, index) => {
            if (index === 0) {
                return false;
            }

            if (cell.isEmpty()) {
                return false;
            }

            const targetCell = group[index - 1];
            return targetCell.canAccept(cell.linkedTile);
        });
    }

    function canMoveUp() {
        return canMove(grid.cellsGroupedByColumn);
    }

    function canMoveDown() {
        return canMove(grid.cellsGroupedByRevercedColumn);
    }

    function canMoveLeft() {
        return canMove(grid.cellsGroupedByRow);
    }

    function canMoveRight() {
        return canMove(grid.cellsGroupedByRevercedRow);
    }
}
