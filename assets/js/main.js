function choice(){
	// action du bouton confirme
    document.getElementById("confirmP1").addEventListener("click", function() {
    	document.getElementById("choiceP1").style.display = "none";
    	document.getElementById("awesome").style.display = "block";

});

    document.getElementById("confirmP2").addEventListener("click", function() {
    	document.getElementById("choiceP2").style.display = "none";
    	document.getElementById("player2").style.display = "block";


});

};
choice();


//choix perso grace a un carousell
(() => {
	// gallery d image pour le carousel
    const gallery = [
        "assets/js/sprites/elfRight.png",
        "assets/js/sprites/orcRight.png",
        "assets/js/sprites/squelletRight.png",
        "assets/js/sprites/humanRight.png",
    ];
    const galleryValue = [
        "elves",
        "orc",
        "skeleton",
        "human",
    ];

    const image = document.querySelector("img"); 
    let i = 0;

    document.getElementById("next").addEventListener("click", () => {
        i++
        // On incrémente de 1 pour faire défiler les images
        if(i >= gallery.length){      
            // En fin de longueur du tableau, on redémarre au début de l'index
            i = 0;  
        }
        image.src = gallery[i];
        image.alt =  galleryValue[i];
        // On associe image aux éléments du tableau (suivant le numéro d'index)                       
        
        
    });

   const imagePlayer2 = document.getElementById("P2race");

	document.getElementById("nextPlayer2").addEventListener("click", () => {
        i++
        // On incrémente de 1 pour faire défiler les images
        if(i >= gallery.length){      
            // En fin de longueur du tableau, on redémarre au début de l'index
            i = 0;  
        }
        imagePlayer2.src = gallery[i];  
        imagePlayer2.alt =  galleryValue[i]; 
        // On associe image aux éléments du tableau (suivant le numéro d'index)                       
        
        
    });

})();

