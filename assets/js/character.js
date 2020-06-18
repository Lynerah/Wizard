
class Character{

    //DAMAGE STUFF
    min = 3;
    maxDamage = 30;
    damageBoost = 0;
    maxDamageTaken = 1;
    damageTotal = 0;

    //HEALIN STUFF
    maxHealing = 20;
    boostHealing = 1;
    currenthealth = 100;
    maxHealth = 100;


    // SPECIAL CLASS OPTION
    reflect = 0;
    lifeSteal = 0;
    dodgeChance = 0.05;
    twiceHit = 0;



    constructor(race,item){
        this.race = race;
        this.item = item;
        
    
    

    this.heal = function(){
        console.log(this.currenthealth);

        this.currenthealth = this.currenthealth + Math.round(this.maxHealing*this.boostHealing);

        console.log("vie récuperée :"+Math.round(this.maxHealing*this.boostHealing));
        

        if(this.currenthealth>=this.maxHealth){
            this.currenthealth = this.maxHealth;
        }
        console.log("vie restante"+this.currenthealth);


    };
    
     this.setRaceBoost = function(){
         switch(this.race){
             case 'human' : this.maxDamageTaken = this.maxDamageTaken*0.8;
                 break;
             case 'orc' : this.maxHealth = this.maxHealth * 1.4;
                          this.currenthealth = this.maxHealth;
                 break;
             case 'elves' : this.reflect = 0.3;
                 break;
             case 'skeleton' : this.lifeSteal = 0.10;
                 break;
        };
    };
     this.setObjetBoost = function(){
         switch(this.item){
             case 'boots' : this.dodgeChance = 0.3;
                break;
             case 'cape' : this.boostHealing = 1.2;
                 break;
             case 'sword' : this.damageBoost = 1.3;
                 break;
             case 'bow' : this.twiceHit = 0.3;
         }
     };
    this.damage = function(){
        let damage = randFromRange([this.min,this.maxDamage]);
        if (this.item == 'sword'){
            damage = Math.round(damage * this.damageBoost);
            this.damageTotal = damage;
        }
        else{
            this.damageTotal = Math.round(damage);
        }
        
    };

    this.totalDamage = this.damage();

    this.displayChar = function(){
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };

    }
}

document.getElementById("confirmP1").addEventListener("click",function(){
    player1ChoiceRace = document.getElementById("P1race").alt;
    player1ChoiceItem = document.getElementById("itemP1choice").value;
    console.log(player1ChoiceItem);

});




 let player1 = new Character('human','cape');
player1.setObjetBoost();
player1.setRaceBoost();
 player1.displayChar();

let player2 = new Character('elves','boots');
player2.setObjetBoost();
player2.setRaceBoost();
player2.displayChar();

// LES BOUTTONS DE COMBAT 

let attackButtonP1 = document.getElementById("attack1");
let attackButtonP2 = document.getElementById("attack2");
let healButtonP1 = document.getElementById("heal1");
let healButtonP2 = document.getElementById("heal2");
let yieldButtonP1 = document.getElementById("surrender1");
let yieldButtonP2 = document.getElementById("surrender2");
 








// CREATION DE LI 

let tableConsole = [];
let ulList = document.getElementById("ulList");

// tableConsole.push(number+" "+guessedName);
// var item = tableConsole[tableConsole.length-1];
// var elem = document.createElement("li");
// elem.innerHTML = item;
// ulList.appendChild(elem);

 // RANDOM POUR SAVOIR QUEL JOUEUR COMMENCE
 let playerTurn = Math.round(Math.random() + 1);
console.log("le joueur "+playerTurn+" commence");
addConsole("le joueur "+playerTurn+" commence");








// MY FUNCTION
function endTurnP1(){
    if(player1.item == 'bow'){
        let randomHitTwice = Math.random();
        if(randomHitTwice <= player1.twiceHit){
            randomHitTwice = 1;
            console.log('hit twice!!!!!!!!!');
            reflectElvesAndBoots(player1,player2);

        }else{
            attackButtonP1.disabled = true;
            healButtonP1.disabled = true;
            yieldButtonP1.disabled = true;

            attackButtonP2.disabled = false;
            healButtonP2.disabled = false;
            yieldButtonP2.disabled = false;
        }
    }else{
        attackButtonP1.disabled = true;
        healButtonP1.disabled = true;
        yieldButtonP1.disabled = true;

        attackButtonP2.disabled = false;
        healButtonP2.disabled = false;
        yieldButtonP2.disabled = false;
    }
   

    //LIFESTEAL
    if(player2.race == 'skeleton'){
        console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
        console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
        player1.currenthealth = player1.currenthealth - Math.round(player1.currenthealth*player2.lifeSteal);
        player2.currenthealth = player2.currenthealth + Math.round(player1.currenthealth*player2.lifeSteal);
        console.log("vie volée = "+Math.round(player1.currenthealth*player2.lifeSteal));
        
        if(player1.currenthealth<=0){
            endGame();
            alert('player 2 WON');
        }
        if(player2.currenthealth>=player2.maxHealth){
            player2.currenthealth = player2.maxHealth;
        }
        console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
        console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
    }
    
}
function endTurnP2(){
    if(player2.item == 'bow'){
        let randomHitTwice = Math.random();
        if(randomHitTwice <= player2.twiceHit){
            randomHitTwice = 1;
            console.log('hit twice!!!!!!!!!');
            reflectElvesAndBoots(player2,player1);

        }else{
            attackButtonP1.disabled = false;
            healButtonP1.disabled = false;
            yieldButtonP1.disabled = false;
            attackButtonP2.disabled = true;
            healButtonP2.disabled = true;
            yieldButtonP2.disabled = true;
        }
    }else{
        attackButtonP1.disabled = false;
        healButtonP1.disabled = false;
        yieldButtonP1.disabled = false;
        attackButtonP2.disabled = true;
        healButtonP2.disabled = true;
        yieldButtonP2.disabled = true;
    }

    //LIFESTEAL
    if(player1.race == 'skeleton'){
        console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
        console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
        player2.currenthealth = player2.currenthealth - Math.round(player2.currenthealth*player1.lifeSteal);
        player1.currenthealth = player1.currenthealth + Math.round(player2.currenthealth*player1.lifeSteal);
        console.log("vie volée = "+Math.round(player2.currenthealth*player1.lifeSteal));
        
        if(player2.currenthealth<=0){
            endGame();
            alert('player 1 WON');
        }
        if(player1.currenthealth>=player1.maxHealth){
            player1.currenthealth = player1.maxHealth;
        }
        console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
        console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
    }
}
function addConsole(montexte){
    tableConsole.push(montexte);
    var item = tableConsole[tableConsole.length-1];
    var elem = document.createElement("li");
    elem.innerHTML = item;
    ulList.appendChild(elem);   
};

function endGame(){
    attackButtonP1.disabled = true;
    healButtonP1.disabled = true;
    yieldButtonP1.disabled = true;
    attackButtonP2.disabled = true;
    healButtonP2.disabled = true;
    yieldButtonP2.disabled = true;
}
function randFromRange(range) {
    return Math.round(
        (Math.random() * (range[1] - range[0]) + range[0])
    ); //random between min - max included
}
function checkEndTurn(playerAttack, playerDefense){
    if(playerDefense.currenthealth<=0){
        playerDefense.currenthealth = 0;
        endGame();
        alert(playerAttack.race+" WON");
    }else if(playerAttack.currenthealth <= 0){
        playerAttack.currenthealth = 0;
        endGame();
        alert(playerDefense.race+" WON")
    }
    else{
        if(playerAttack == player1){
            endTurnP1();
        }else{
            endTurnP2();
        }
        
    }
}
function dodgeBoots(playerAttack,playerDefense){
    if(playerDefense.item == 'boots'){
        let randomDodgeBoots = Math.random();
        if(randomDodgeBoots <= playerDefense.dodgeChance){
            playerDefense.currenthealth = playerDefense.currenthealth;
            console.log("DODGE !!! vie restante de "+playerDefense.race+" : "+playerDefense.currenthealth);
        }else{
            playerDefense.currenthealth = playerDefense.currenthealth - Math.round(playerAttack.damageTotal * playerDefense.maxDamageTaken);
            console.log("MISS DODGE ! vie restante au "+playerDefense.race+" : "+playerDefense.currenthealth);
        }
    }else{
            playerDefense.currenthealth = playerDefense.currenthealth - Math.round(playerAttack.damageTotal * playerDefense.maxDamageTaken);
            console.log("HIT ! vie restante au "+playerDefense.race+" : "+playerDefense.currenthealth);
    }
}
function reflectElvesAndBoots(playerAttack,playerDefense){
    let finalDamage = Math.round(playerAttack.damageTotal*playerDefense.maxDamageTaken);

    addConsole("dégat infligé par"+playerAttack.race+" : "+finalDamage);
    console.log("dégat infligé par "+playerAttack.race+" : "+finalDamage);
    if(playerDefense.race == 'elves'){
        let randomReflect = Math.random();
        if(randomReflect<= playerDefense.reflect){
            let reflectDamage = finalDamage/2;
            playerDefense.currenthealth = playerDefense.currenthealth;
            playerAttack.currenthealth = playerAttack.currenthealth - reflectDamage;
            console.log("REFLECT !! "+playerAttack.race+" recois "+reflectDamage+" dégats, il lui reste : "+playerAttack.currenthealth);
            checkEndTurn(playerAttack,playerDefense);
            
           
        }else{
            console.log("miss the reflect ...");
            dodgeBoots(playerAttack,playerDefense);
            checkEndTurn(playerAttack,playerDefense);
            
        }
   
    }else{
        
          dodgeBoots(playerAttack,playerDefense);
          checkEndTurn(playerAttack,playerDefense);
    }
 }

if(playerTurn == 1){
    attackButtonP2.disabled = true;
    healButtonP2.disabled = true;
    yieldButtonP2.disabled = true;  
}
else{
    attackButtonP1.disabled = true;
    healButtonP1.disabled = true;
    yieldButtonP1.disabled = true;

}



document.getElementById("attack1").addEventListener("click", function(){
    player1.damage();
    reflectElvesAndBoots(player1,player2);

});
document.getElementById("heal1").addEventListener("click", function(){
    player1.heal();
    endTurnP1(); 
});
document.getElementById("surrender1").addEventListener("click", function(){
    alert('player 2 WON');
    endGame();
});




document.getElementById("attack2").addEventListener("click", function(){
    player2.damage();
    reflectElvesAndBoots(player2,player1);
    
});
document.getElementById("heal2").addEventListener("click", function(){
    player2.heal();
    endTurnP2();
});
document.getElementById("surrender2").addEventListener("click", function(){
    alert('player 1 WON ');
    endGame();
});




