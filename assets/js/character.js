
class Character{

    //DAMAGE STUFF
    min = 3;
    maxDamage = 20;
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
             case 'elf' : this.reflect = 0.3;
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
             case 'bow' : this.twiceHit = 0.2;
         }
     };
    this.damage = function(){
        let damage = randFromRange([this.min,this.maxDamage]);
        if (this.item == 'sword'){
            damage = Math.round(damage * this.damageBoost);
            this.damageTotal = damage;
        }else{
            this.damageTotal = Math.round(damage);
        }
        
    };

    this.totalDamage = this.damage();

    this.displayChar = function(){
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };

    }
}
 let player1 = new Character('orc','sword');
 console.log(player1.maxHealth)
 console.log(player1.damageBoost);
player1.setObjetBoost();
player1.setRaceBoost();
console.log(player1.maxHealth)
 console.log(player1.damageBoost);
 player1.displayChar();

let player2 = new Character('skeleton','cape');
player2.setObjetBoost();
player2.setRaceBoost();
player2.displayChar();


// let finalDamageP1 = player1.damageTotal * player2.maxDamageTaken;

let finalDamageP2 = Math.round(player2.damageTotal*player1.maxDamageTaken);

let attackButtonP1 = document.getElementById("attack1");
let attackButtonP2 = document.getElementById("attack2");
let healButtonP1 = document.getElementById("heal1");
let healButtonP2 = document.getElementById("heal2");
let yieldButtonP1 = document.getElementById("surrender1");
let yieldButtonP2 = document.getElementById("surrender2");
 



 // RANDOM POUR SAVOIR QUEL JOUEUR COMMENCE
 let playerTurn = Math.round(Math.random() + 1);
console.log(playerTurn);

// MY FUNCTION
function endTurnP1(){
    attackButtonP1.disabled = true;
    healButtonP1.disabled = true;
    yieldButtonP1.disabled = true;

    attackButtonP2.disabled = false;
    healButtonP2.disabled = false;
    yieldButtonP2.disabled = false;
    
    if(player2.race == 'skeleton'){
        console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
        console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
        player1.currenthealth = player1.currenthealth - Math.round(player1.currenthealth*player2.lifeSteal);
        player2.currenthealth = player2.currenthealth + Math.round(player1.currenthealth*player2.lifeSteal);
        console.log("vie volée = "+Math.round(player1.currenthealth*player2.lifeSteal));
        console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
        console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
        if(player1.currenthealth<=0){
            endGame();
            alert('player 2 WON');
        }
    }
    
}
function endTurnP2(){
    attackButtonP1.disabled = false;
    healButtonP1.disabled = false;
    yieldButtonP1.disabled = false;
    attackButtonP2.disabled = true;
    healButtonP2.disabled = true;
    yieldButtonP2.disabled = true;
    if(player1.race == 'skeleton'){
        console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
        console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
        player2.currenthealth = player2.currenthealth - Math.round(player2.currenthealth*player1.lifeSteal);
        player1.currenthealth = player1.currenthealth + Math.round(player2.currenthealth*player1.lifeSteal);
        console.log("vie volée = "+Math.round(player2.currenthealth*player1.lifeSteal));
        console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
        console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
        if(player2.currenthealth<=0){
            endGame();
            alert('player 1 WON');
        }
    }
}
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
    console.log(player1.damageTotal);
    console.log(player2.maxDamageTaken);
    console.log("dégat infligé par le joueur 1 :"+Math.round(player1.damageTotal * player2.maxDamageTaken));
    
    player2.currenthealth = player2.currenthealth - Math.round(player1.damageTotal * player2.maxDamageTaken);
    console.log("vie restante au joueur 2: "+player2.currenthealth);
    if(player2.currenthealth<=0){
        player2.currenthealth = 0;
        endGame();
        alert("PLAYER 1 WON");
    }else{
        endTurnP1();
    }
    
});
document.getElementById("heal1").addEventListener("click", function(){
    player1.heal();
    endTurnP1(); 
});
document.getElementById("surrender1").addEventListener("click", function(){
    endTurnP1();
});




document.getElementById("attack2").addEventListener("click", function(){
    player2.damage();
    console.log("dégat infligé par le joueur 2 :"+finalDamageP2);
    
    player1.currenthealth = player1.currenthealth - finalDamageP2;
    console.log("vie restante au joueur 1: "+player1.currenthealth);
    if(player1.currenthealth<=0){
        player2.currenthealth = 0;
        endGame();
        alert("PLAYER 2 WON");
    }else{
        endTurnP2();
    }
    
});
document.getElementById("heal2").addEventListener("click", function(){
    player2.heal();
    endTurnP2();
});
document.getElementById("surrender2").addEventListener("click", function(){
    endTurnP2();
});




