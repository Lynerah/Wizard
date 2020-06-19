
class Character{

    //DAMAGE STUFF
    min = 3;
    maxDamage = 30;
    damageBoost = 0;
    maxDamageTaken = 1;
    damageTotal = 0;

    //HEALIN STUFF
    maxHealing = 30;
    minHealing = 10;
    boostHealing = 1;
    currenthealth = 100;
    maxHealth = 100;


    // SPECIAL CLASS OPTION
    reflect = 0;
    lifeSteal = 0;
    dodgeChance = 0.05;
    twiceHit = 0;



    constructor(race,item,name){
        this.race = race;
        this.item = item;
        this.name = name;
        
    
    

    this.heal = function(){
        console.log(this.currenthealth);
        let totalHeal =  Math.round(randFromRange([this.minHealing,this.maxHealing])*this.boostHealing);
        this.currenthealth = this.currenthealth + totalHeal;

        console.log("vie récuperée :"+totalHeal);
        addConsole("vie récuperée par "+this.name+" : "+totalHeal);
        

        if(this.currenthealth>=this.maxHealth){
            this.currenthealth = this.maxHealth;
        }
        console.log("vie restante"+this.currenthealth);
        addConsole("vie restante de"+this.name+" : "+this.currenthealth);


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
function randFromRange(range) {
    return Math.round(
        (Math.random() * (range[1] - range[0]) + range[0])
    ); //random between min - max included
}
function addConsole(montexte){
    tableConsole.push(montexte);
    var item = tableConsole[tableConsole.length-1];
    var elem = document.createElement("li");
    elem.innerHTML = item;
    // ulList.appendChild(elem);   
    ulList.prepend(elem);   
};
document.getElementById("btnP1").style.display = "none";
document.getElementById("btnP2").style.display = "none";
// CREATION DE LI 
let tableConsole = [];
let ulList = document.getElementById("ulList");
// RECUP BARRE DE VIE 
let lifeP1 = document.getElementById("HealthBarP1");
let lifeP2 = document.getElementById("HealthBarP2");
// RECUP RACE ET ITEM P1 ET DEBUT DE GAME
document.getElementById("confirmP1").addEventListener("click",function(){
    player1ChoiceRace = document.getElementById("P1race").alt;
    player1ChoiceItem = document.getElementById("itemP1choice").value;
    console.log(player1ChoiceItem);
});
document.getElementById("confirmP2").addEventListener("click",function(){
    player2ChoiceRace = document.getElementById("P2race").alt;
    player2ChoiceItem = document.getElementById("itemP2choice").value;
    console.log(player2ChoiceItem);
});

let image = document.getElementById("persoP1");
let image2 = document.getElementById("persoP2");
// VARIABLE QUI DEMARRE LA GAME 
let start = 0;
//
document.getElementById("confirmP1").addEventListener("click",function(){
    player1ChoiceName = document.getElementById("pseudoPlayer1").value;
    if(player1ChoiceName == ""){
        player1ChoiceName = "P1";
    }
    console.log(player1ChoiceName);
    player1ChoiceRace = document.getElementById("P1race").alt;
    player1ChoiceItem = document.getElementById("itemP1choice").value;
    start++;
    if(start == 2){
        document.getElementById("btnP1").style.display = "flex";
        document.getElementById("btnP2").style.display = "flex";
        document.getElementById("HealthBarP1").style.display = "block";
        document.getElementById("HealthBarP2").style.display = "block";
        document.getElementById("console").style.display = "block";
        document.getElementById("HealthBarP1").className = "vieP1 vieGreen animate__animated animate__fadeInLeftBig";
        document.getElementById("HealthBarP2").className = "vieP2 vieGreen animate__animated animate__fadeInRightBig";
        document.getElementById("console").className = "console animate__animated animate__fadeInDownBig";
        game();
    }

});
document.getElementById("confirmP2").addEventListener("click",function(){
    player2ChoiceName = document.getElementById("pseudoPlayer2").value;
    if(player2ChoiceName == ""){
        player2ChoiceName = "P2";
    }
    player2ChoiceRace = document.getElementById("P2race").alt;
    player2ChoiceItem = document.getElementById("itemP2choice").value;
    start++
    if(start == 2){
        document.getElementById("btnP1").style.display = "flex";
        document.getElementById("btnP2").style.display = "flex";
        document.getElementById("btnP1").className = "btnP1 animate__animated animate__fadeInUp";
        document.getElementById("btnP2").className = "btnP2 animate__animated animate__fadeInUp";
        
        document.getElementById("HealthBarP1").style.display = "block";
        document.getElementById("HealthBarP2").style.display = "block";
        document.getElementById("console").style.display = "block";
        document.getElementById("HealthBarP1").className = "vieP1 vieGreen animate__animated animate__fadeInLeftBig";
        document.getElementById("HealthBarP2").className = "vieP2 vieGreen animate__animated animate__fadeInRightBig";
        document.getElementById("console").className = "console animate__animated animate__fadeInDownBig";
        game();
    }
});






// LA GAME COMMENCE !!!!!!!!!!!!!!!!!!!!!











function game(){
    
    switch(player1ChoiceRace){
        case 'human' : 
            switch(player1ChoiceItem){
                  case 'boots' : image.src =  "assets/js/sprites/human_boots.png" ;
                    break;
                 case 'cape' : image.src =  "assets/js/sprites/human_cape.png" ;
                     break;
                 case 'sword' : image.src =  "assets/js/sprites/human_sword.png" ;
                     break;
                 case 'bow' : image.src =  "assets/js/sprites/human_bow.png" ;
                    break;
            }
            break;
         case 'orc' : 
            switch(player1ChoiceItem){
                  case 'boots' : image.src =  "assets/js/sprites/orc_boots.png" ;
                    break;
                 case 'cape' : image.src =  "assets/js/sprites/orc_cape.png" ;
                     break;
                 case 'sword' : image.src =  "assets/js/sprites/orc_sword.png" ;
                     break;
                 case 'bow' : image.src =  "assets/js/sprites/orc_bow.png" ;
                     break;
            }
            break;
    
        case 'elves' : 
            switch(player1ChoiceItem){
                  case 'boots' : image.src =  "assets/js/sprites/elf_boots.png"  ;
                    break;
                 case 'cape' : image.src =  "assets/js/sprites/elf_cape.png" ;
                     break;
                 case 'sword' : image.src =  "assets/js/sprites/elf_sword.png" ;
                     break;
                 case 'bow' :image.src =  "assets/js/sprites/elf_bow.png" ;
                     break;
            }
                     break;
        case 'skeleton' : 
            switch(player1ChoiceItem){
                  case 'boots' : image.src =  "assets/js/sprites/skeleton_boots.png" ;
                    break;
                 case 'cape' : image.src =  "assets/js/sprites/skeleton_cape.png" ;
                     break;
                 case 'sword' : image.src =  "assets/js/sprites/skeleton_sword.png" ; 
                     break;
                 case 'bow' : image.src =  "assets/js/sprites/skeleton_bow.png" ;
                     break;
            }
                     break;
            
      };



      switch(player2ChoiceRace){
        case 'human' : 
            switch(player2ChoiceItem){
                  case 'boots' : image2.src =  "assets/js/sprites/human_boots.png" ;
                    break;
                 case 'cape' : image2.src =  "assets/js/sprites/human_cape.png" ;
                     break;
                 case 'sword' : image2.src =  "assets/js/sprites/human_sword.png" ;
                     break;
                 case 'bow' : image2.src =  "assets/js/sprites/human_bow.png" ;
                    break;
            }
            break;
         case 'orc' : 
            switch(player2ChoiceItem){
                  case 'boots' : image2.src =  "assets/js/sprites/orc_boots.png" ;
                    break;
                 case 'cape' : image2.src =  "assets/js/sprites/orc_cape.png" ;
                     break;
                 case 'sword' : image2.src =  "assets/js/sprites/orc_sword.png" ;
                     break;
                 case 'bow' : image2.src =  "assets/js/sprites/orc_bow.png" ;
                     break;
            }
            break;
    
        case 'elves' : 
            switch(player2ChoiceItem){
                  case 'boots' : image2.src =  "assets/js/sprites/elf_boots.png"  ;
                    break;
                 case 'cape' : image2.src =  "assets/js/sprites/elf_cape.png" ;
                     break;
                 case 'sword' : image2.src =  "assets/js/sprites/elf_sword.png" ;
                     break;
                 case 'bow' :image2.src =  "assets/js/sprites/elf_bow.png" ;
                     break;
            }
                     break;
        case 'skeleton' : 
            switch(player2ChoiceItem){
                  case 'boots' : image2.src =  "assets/js/sprites/skeleton_boots.png" ;
                    break;
                 case 'cape' : image2.src =  "assets/js/sprites/skeleton_cape.png" ;
                     break;
                 case 'sword' : image2.src =  "assets/js/sprites/skeleton_sword.png" ; 
                     break;
                 case 'bow' : image2.src =  "assets/js/sprites/skeleton_bow.png" ;
                     break;
            }
                     break;
            
      };
    
    image.className = "animate__animated animate__flash";
    image2.className = "animate__animated animate__flash";
    
    
     let player1 = new Character(player1ChoiceRace,player1ChoiceItem,player1ChoiceName);
    player1.setObjetBoost();
    player1.setRaceBoost();
     player1.displayChar();
    
    let player2 = new Character(player2ChoiceRace,player2ChoiceItem,player2ChoiceName);
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
     
    
     // RANDOM POUR SAVOIR QUEL JOUEUR COMMENCE
    let playerTurn = Math.round(Math.random() + 1);
    if(playerTurn == 1){
        addConsole( player1.name+" commence");
    }else{
        addConsole( player2.name+" commence");
    }
    
    
    
    
    
    
    
    
    
    
    // MY FUNCTION

    function setLife(playerAttack,playerDefense){
        let percentP1 = Math.round((playerAttack.currenthealth/playerAttack.maxHealth)*100);
        let percentP2 = Math.round((playerDefense.currenthealth/playerDefense.maxHealth)*100);
        if(playerAttack == player1){
            lifeP1.value = percentP1;
            lifeP2.value = percentP2;
        }else{
            lifeP1.value = percentP2;
            lifeP2.value = percentP1;
        }
        
    
        if(lifeP1.value<70){
            lifeP1.className = "vieP1 vieOrange";
            if(lifeP1.value<35){
                lifeP1.className = "vieP1 vieRed";
            }
        }
        if(lifeP2.value<70){
            lifeP2.className = "vieP2 vieOrange";
            if(lifeP2.value<35){
                lifeP2.className = "vieP2 vieRed";
            }
        }
     
        
    
    }
    
    function endTurnP1(){
        if(player1.item == 'bow'){
            let randomHitTwice = Math.random();
            if(randomHitTwice <= player1.twiceHit){
                randomHitTwice = 1;
                console.log('hit twice!!!!!!!!!');
                addConsole(player1.name+" hit TWICEEE !!!");
                reflectElvesAndBoots(player1,player2);
                setLife(player1,player2);
            }else{
                addConsole(player1.name+" didn't attack twice...");
                attackButtonP1.disabled = true;
                healButtonP1.disabled = true;
                yieldButtonP1.disabled = true;
    
                attackButtonP2.disabled = false;
                healButtonP2.disabled = false;
                yieldButtonP2.disabled = false;
                setLife(player1,player2);
            }
        }else{
            attackButtonP1.disabled = true;
            healButtonP1.disabled = true;
            yieldButtonP1.disabled = true;
    
            attackButtonP2.disabled = false;
            healButtonP2.disabled = false;
            yieldButtonP2.disabled = false;
            setLife(player1,player2);
        }
       
    
        //LIFESTEAL
        if(player2.race == 'skeleton'){
            console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
            console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
            player1.currenthealth = player1.currenthealth - Math.round(player1.currenthealth*player2.lifeSteal);
            player2.currenthealth = player2.currenthealth + Math.round(player1.currenthealth*player2.lifeSteal);
            console.log("vie volée = "+Math.round(player1.currenthealth*player2.lifeSteal));
            addConsole("vie volée par "+player2.name+" = "+Math.round(player1.currenthealth*player2.lifeSteal));
            
            if(player1.currenthealth<=0){
                setLife(player1,player2);
                endGame();
                alert('player 2 WON');
                addConsole(player2.name+' WON !');
                
                
            }
            if(player2.currenthealth>=player2.maxHealth){
                player2.currenthealth = player2.maxHealth;
            }
            console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
            addConsole('vie de '+player1.name+' debut du tour : '+player1.currenthealth);
            console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
            addConsole('vie '+player2.name+' debut du tour : '+player2.currenthealth);
            setLife(player1,player2);
        }
        
    }
    function endTurnP2(){
        if(player2.item == 'bow'){
            let randomHitTwice = Math.random();
            if(randomHitTwice <= player2.twiceHit){
                randomHitTwice = 1;
                console.log('hit twice!!!!!!!!!');
                addConsole(player2.name+" hit TWICEEE !!!");
                reflectElvesAndBoots(player2,player1);
                setLife(player2,player1);
    
            }else{
                addConsole(player2.name+" didn't attack twice...");
                attackButtonP1.disabled = false;
                healButtonP1.disabled = false;
                yieldButtonP1.disabled = false;
                attackButtonP2.disabled = true;
                healButtonP2.disabled = true;
                yieldButtonP2.disabled = true;
                setLife(player2,player1);
    
            }
        }else{
            attackButtonP1.disabled = false;
            healButtonP1.disabled = false;
            yieldButtonP1.disabled = false;
            attackButtonP2.disabled = true;
            healButtonP2.disabled = true;
            yieldButtonP2.disabled = true;
            setLife(player2,player1);
        }
    
        //LIFESTEAL
        if(player1.race == 'skeleton'){
            console.log("vie du PLAYER2 a la fin du tour : "+player2.currenthealth);
            console.log("vie du PLAYER1 a la fin du tour : "+player1.currenthealth);
            player2.currenthealth = player2.currenthealth - Math.round(player2.currenthealth*player1.lifeSteal);
            player1.currenthealth = player1.currenthealth + Math.round(player2.currenthealth*player1.lifeSteal);
            console.log("vie volée = "+Math.round(player2.currenthealth*player1.lifeSteal));
            addConsole("vie volée = "+Math.round(player2.currenthealth*player1.lifeSteal));
            
            if(player2.currenthealth<=0){
                endGame();
                alert('player 1 WON');
                addConsole(player1.name+' WON !!!');
                setLife(player2,player1);
            }
            if(player1.currenthealth>=player1.maxHealth){
                player1.currenthealth = player1.maxHealth;
            }
            console.log('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
            addConsole('vie JOUEUR 2 debut du tour : '+player2.currenthealth);
            console.log('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
            addConsole('vie JOUEUR 1 debut du tour : '+player1.currenthealth);
            setLife(player2,player1);
        }
    }
    
    
    function endGame(){
        attackButtonP1.disabled = true;
        healButtonP1.disabled = true;
        yieldButtonP1.disabled = true;
        attackButtonP2.disabled = true;
        healButtonP2.disabled = true;
        yieldButtonP2.disabled = true;
        attackButtonP1.style.display = "none";
        attackButtonP2.style.display = "none";
        healButtonP1.style.display = "none";
        healButtonP2.style.display = "none";
        yieldButtonP1.style.display = "none";
        yieldButtonP2.style.display = "none";
        //AFFICHER LA BOX REPLAY
        document.getElementById("replay").style.display = "block";
        document.getElementById("replayYES").addEventListener('click', function(){
            location.reload();
            console.log("bonjour");
        });
        document.getElementById("replayNO").addEventListener('click', function(){
            document.getElementById("replay").style.display = "none";
        });
        
    }
    // function replay(){
        
    //     if (confirm('Replay ?')) {
    //         // Save it!
    //         location.reload();
    //       } else {
    //         // Do nothing!
           
    //       }
    // }

    function checkEndTurn(playerAttack, playerDefense){
        if(playerDefense.currenthealth<=0){
            playerDefense.currenthealth = 0;
            
            
            if(playerAttack == player1){
                document.getElementById("awesome2").className = "sprite left";
                document.getElementById("persoP1").src = "assets/js/sprites/win.svg";
                document.getElementById("persoP2").src = "assets/js/sprites/loose.svg";
                document.getElementById("persoP1").className = "animate__animated animate__flash";
                document.getElementById("persoP2").className = "animate__animated animate__flash";
            
            }else{
                document.getElementById("awesome2").className = "sprite left";
                document.getElementById("persoP1").src = "assets/js/sprites/loose.svg";
                document.getElementById("persoP2").src = "assets/js/sprites/win.svg";
                document.getElementById("persoP1").className = "animate__animated animate__flash";
                document.getElementById("persoP2").className = "animate__animated animate__flash";
                
            }

            
            addConsole(playerAttack.name+" WON");
            endGame();
            

        }else if(playerAttack.currenthealth <= 0){
            playerAttack.currenthealth = 0;
            
            
            addConsole(playerDefense.name+" WON");
            endGame();
            
            
           
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
                addConsole("DODGE !!! vie restante de "+playerDefense.name+" : "+playerDefense.currenthealth);
            }else{
                playerDefense.currenthealth = playerDefense.currenthealth - Math.round(playerAttack.damageTotal * playerDefense.maxDamageTaken);
                console.log("MISS DODGE ! vie restante au "+playerDefense.race+" : "+playerDefense.currenthealth);
                addConsole("MISS DODGE ! vie restante à "+playerDefense.name+" : "+playerDefense.currenthealth);
            }
        }else{
                playerDefense.currenthealth = playerDefense.currenthealth - Math.round(playerAttack.damageTotal * playerDefense.maxDamageTaken);
                console.log("HIT ! vie restante au "+playerDefense.race+" : "+playerDefense.currenthealth);
                addConsole("HIT ! vie restante à "+playerDefense.name+" : "+playerDefense.currenthealth);
        }
    }
    function reflectElvesAndBoots(playerAttack,playerDefense){
        let finalDamage = Math.round(playerAttack.damageTotal*playerDefense.maxDamageTaken);
    
        addConsole("dégat infligé par "+playerAttack.name+" : "+finalDamage);
        console.log("dégat infligé par "+playerAttack.race+" : "+finalDamage);
        if(playerDefense.race == 'elves'){
            let randomReflect = Math.random();
            if(randomReflect<= playerDefense.reflect){
                let reflectDamage = Math.round(finalDamage/2 *playerAttack.maxDamageTaken);
                playerDefense.currenthealth = playerDefense.currenthealth;
                playerAttack.currenthealth = playerAttack.currenthealth - reflectDamage;
                console.log("REFLECT !! "+playerAttack.race+" recois "+reflectDamage+" dégats, il lui reste : "+playerAttack.currenthealth);
                addConsole("REFLECT !! "+playerAttack.name+" recois "+reflectDamage+" dégats, il lui reste : "+playerAttack.currenthealth);
                checkEndTurn(playerAttack,playerDefense);
                
               
            }else{
                console.log(playerDefense.name+" miss the reflect ...");
                addConsole(playerDefense.name+" miss the reflect ...");
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
        document.getElementById("awesome2").className = "sprite left";
        document.getElementById("persoP1").src = "assets/js/sprites/loose.svg";
        document.getElementById("persoP2").src = "assets/js/sprites/win.svg";
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
        document.getElementById("awesome2").className = "sprite left";
        document.getElementById("persoP2").src = "assets/js/sprites/loose.svg";
        document.getElementById("persoP1").src = "assets/js/sprites/win.svg";
        endGame();
    });
    
    
};
 

