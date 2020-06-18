//Use this script to generate your character

import {
    handleRace,
    handleItemEffect
} from './gamelogic.js'

class Person {
    maxHealth = 100;
    min = 3;
    maxDamage = 20;
    maxHealing = 30;
    

    position;

    constructor(name, race, item,position) {
        this.name = name;
        this.race = race;
        this.item = item;
        this.currentHealth = this.maxHealth;
        this.position = position;
        
        initMeter(this)
    }
    heal() {
        let healingAmount = randFromRange([this.min, this.maxHealing]);
        if (this.item === 'staff' && handleItemEffect('staff')) {
            healingAmount += healingAmount * 0.2;
            console.log('Healing effect amplified with my staff !');
        }
        console.log(`${this.name} is healing : + ${healingAmount}HP`);
        if (this.currentHealth + healingAmount > this.maxHealth) {
            this.currentHealth = this.maxHealth;
            console.log(`${this.name} is full life : ${this.currentHealth}`);
        } else this.currentHealth += healingAmount;

        setMeter(this);

    }

    damage() {
        let dmg = randFromRange([this.min, this.maxDamage]);
        if (this.item === 'sword') handleItemEffect(this.item, dmg);
        console.log(`${this.name} want to attack : -${dmg} hp...`)
        return dmg;
    }

    receiveDamage(damage) {
        if (this.item === 'boot' && handleItemEffect(this.item)) {
            console.log(`${this.name} evades thanks to his/her shiny boots !`);
            return true;
        }
        if (this.race === 'elf' && Math.random() < 0.2) {
            console.log(`Thanks to his/her elf agility, the incoming attack was block ! ${this.name} counter-attack`);
            return false;
        }
        console.log(`and... it's a hit !`);
        this.currentHealth -= damage;
        setMeter(this);
        return true;
    }

    displayChar() {
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    }

    set setCurrentHealth(value) {
        this.currentHealth = value;
        setMeter(this);
    }
    /**
     *
     *
     * @memberof Person
     * @param {Number} value
     */
    set setMaxHealth(value) {
        this.maxHealth = value;
        initMeter(this);
    }

    get getMaxHealth() {
        return this.maxHealth;
    }

    get totalDamage() {
        return this.damage();
    }
}
const path = './resources/svg/'
const races = [{
    race: 'orc',
    path: `${path}orc.svg`
}, {
    race: 'human',
    path: `${path}human.svg`
}, {
    race: 'elf',
    path: `${path}elf.svg`
}, {
    race: 'vampire',
    path: `${path}vampire.svg`
}]

const items = [{
    item: 'boot',
    path: `${path}boot.svg`
}, {
    item: 'bow',
    path: `${path}bow.svg`
}, {
    item: 'staff',
    path: `${path}staff.svg`
}, {
    item: 'sword',
    path: `${path}sword.svg`
}]

let player1;
let player2;
let isPlayer1Turn = true;
let playerHasSurrender = false;

let fps;

let indexRaceLeft = 0,
    indexRaceRight = 0,
    indexItemLeft = 0,
    indexItemRight = 0;

startGame();
let start = document.getElementById('btn-start');
start.disabled = true;

document.getElementById("btn-ready-left").addEventListener('click', () => {
    player1 = getInfoFrom('left');
    if (player2) start.disabled = false;
});
document.getElementById("btn-ready-right").addEventListener('click', () => {
    player2 = getInfoFrom('right');
    if (player1) start.disabled = false;
});

start.addEventListener('click', () => {
    if (player1 && player2) battleStart();
})

function getInfoFrom(side) {
    const name = document.getElementById(`hero_name-${side}`).value;
    const race = (side === 'left') ? races[indexRaceLeft].race : races[indexRaceRight].race;
    const item = (side === 'left') ? items[indexItemLeft].item : items[indexItemRight].item;

    let player = new Person(name, race, item,side);
    handleRace(player);
    return player;
}

//#region CAROUSEL
document.getElementById("btn-carousel-left-item-left").addEventListener('click', () => {
    indexItemLeft--;
    if (indexItemLeft < 0) indexItemLeft = items.length - 1;
    updateItemDisplay('left');
});
document.getElementById("btn-carousel-left-item-right").addEventListener('click', () => {
    indexItemLeft++;
    if (indexItemLeft >= items.length) indexItemLeft = 0;
    updateItemDisplay('left');
});
document.getElementById("btn-carousel-left-race-left").addEventListener('click', () => {
    indexRaceLeft--;
    if (indexRaceLeft < 0) indexRaceLeft = races.length - 1;
    updateRaceDisplay('left');
});
document.getElementById("btn-carousel-left-race-right").addEventListener('click', () => {
    indexRaceLeft++;
    if (indexRaceLeft >= races.length) indexRaceLeft = 0;
    updateRaceDisplay('left');
});

document.getElementById("btn-carousel-right-item-left").addEventListener('click', () => {
    indexItemRight--;
    if (indexItemRight < 0) indexItemRight = items.length - 1;
    updateItemDisplay('right');
});
document.getElementById("btn-carousel-right-item-right").addEventListener('click', () => {
    indexItemRight++;
    if (indexItemRight >= items.length) indexItemRight = 0;
    updateItemDisplay('right');
});
document.getElementById("btn-carousel-right-race-left").addEventListener('click', () => {
    indexRaceRight--;
    if (indexRaceRight < 0) indexRaceRight = races.length - 1;
    updateRaceDisplay('right');
});
document.getElementById("btn-carousel-right-race-right").addEventListener('click', () => {
    indexRaceRight++;
    if (indexRaceRight >= races.length) indexRaceRight = 0;
    updateRaceDisplay('right');
});

function updateRaceDisplay(side) {
    let carousel = document.getElementById(`race-choice-${side}`);
    side === 'left' ? carousel.setAttribute('src', races[indexRaceLeft].path) : carousel.setAttribute('src', races[indexRaceRight].path);
}

function updateItemDisplay(side) {
    let carousel = document.getElementById(`item-choice-${side}`)
    side = side === 'left' ? carousel.setAttribute('src', items[indexItemLeft].path) : carousel.setAttribute('src', items[indexItemRight].path);
}
//#endregion

function startGame() {
    updateItemDisplay('left');
    updateItemDisplay('right');
    updateRaceDisplay('left');
    updateRaceDisplay('right');

    document.getElementById('vs-screen').style.display = "none";
    document.getElementById('log-screen').style.display = "none";

}


function battleStart() {
    
    document.getElementById('creation-screen').style.display = "none";
    document.getElementById('vs-screen').style.display = "flex";
    document.getElementById('log-screen').style.display = "flex";

    displayPlayer('left', player1);
    displayPlayer('right', player2);

    initBtnAction('left');
    initBtnAction('right');

    fps = setInterval(() => {
        turnByTurn();
    }, 150);


}

function turnByTurn() {
    if (!playerHasSurrender && player1.currentHealth > 0 && player2.currentHealth > 0) {
        isPlayer1Turn ?
            (needToDisabledButtonOn('right', true), needToDisabledButtonOn('left', false)) :
            (needToDisabledButtonOn('left', true), needToDisabledButtonOn('right', false));
    } else {
        displayDeadOne();
        clearInterval(fps);
    }

}

function displayDeadOne() {
    const side = isPlayer1Turn ? player1.position : player2.position;
    document.getElementById(`char-${side}`)
    .setAttribute('src',`${path}dead.svg`);
}

function needToDisabledButtonOn(side, disabled) {
    const buttons = document.getElementById(`buttons--${side}`);
    [...buttons.children].forEach(btn => {
        btn.disabled = disabled;
    })

}

function initBtnAction(side) {
    const buttons = document.getElementById(`buttons--${side}`);
    buttons.children.item(0).addEventListener('click', playerAttack);
    buttons.children.item(1).addEventListener('click', playerHeal);
    buttons.children.item(2).addEventListener('click', playerYield);
}

function playerAttack() {
    if (isPlayer1Turn) {
        if (!player2.receiveDamage(player1.totalDamage))
            player1.receiveDamage(player1.totalDamage / 2)
    } else {
        if (!player1.receiveDamage(player2.totalDamage))
            player2.receiveDamage(player2.totalDamage / 2);
    };
    isPlayer1Turn = !isPlayer1Turn;
}

function playerHeal() {
    isPlayer1Turn ? player1.heal() : player2.heal()
    isPlayer1Turn = !isPlayer1Turn;
}

function playerYield() {
    playerHasSurrender = true;
}

/**
 *
 *
 * @param {*} side
 * @param {Person} player
 */
function displayPlayer(side, player) {
    document.getElementById(`meter-${side}`)
    document.getElementById(`char-${side}`).setAttribute('src', `${path}${player.race}.svg`);
    document.getElementById(`item-${side}`).setAttribute('src', `${path}${player.item}.svg`);
    document.getElementById(`name-${side}`).innerText = player.name
}
/**
 *
 *
 * @param {Person} player
 */
function setMeter(player) {
    let meter = document.getElementById(`meter-${player.position}`);
    meter.value = player.currentHealth;
}

/**
 *
 *
 * @param {Person} player
 */
function initMeter(player) {
    let meter = document.getElementById(`meter-${player.position}`);
    meter.setAttribute('max',`${player.maxHealth}`)
    meter.setAttribute('low',`${player.maxHealth*0.3}`)
    meter.setAttribute('high',`${player.maxHealth*0.6}`)
    meter.setAttribute('optimum',`${player.maxHealth}`)
    meter.value = player.currentHealth;
}

function randFromRange(range) {
    return Math.round(
        (Math.random() * (range[1] - range[0]) + range[0])
    ); //random between min - max included
}