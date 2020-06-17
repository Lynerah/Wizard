// function choice(){
	//action du bouton confirme
    document.getElementById("confirmP1").addEventListener("click", function() {
    	document.getElementById("choiceP1").style.display = "none";
    	document.getElementById("awesome").style.display = "block";

});

    document.getElementById("confirmP2").addEventListener("click", function() {
    	let perso = document.getElementById("carouselPlayer2").src;
    	return perso;
    	console.log(perso);
    	alert(hello);
    	document.getElementById("choiceP2").style.display = "none";
    	document.getElementById("player2").style.display = "block";


});

// };
// choice();

// //permet de selectionner un perso
//  (function() {

//     var sprite = document.querySelector('.sprite'),
//         // key = {left: false, right: false},
//         trans = 0,
//         property = getTransformProperty(sprite);

//     function getTransformProperty(element) {
//         var properties = [
//             'transform',
//             'WebkitTransform',
//             'msTransform',
//             'MozTransform',
//             'OTransform'
//         ];
//         var p;
//         while (p = properties.shift()) {
//             if (typeof element.style[p] != 'undefined') {
//                 return p;
//             }
//         }
//         return false;
//     }

//     // function translate() {
//     //     sprite.style[property] = 'translateX(' + trans + 'px)';
//     // }

// });

//choix perso grace a un carousell
(() => {
	// gallery d image pour le carousel
    const gallery = [
        "assets/js/sprites/elfRight.png",
        "assets/js/sprites/orcRight.png",
        "assets/js/sprites/squelletRight.png",
        "assets/js/sprites/humanRight.png",
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
        // On associe image aux éléments du tableau (suivant le numéro d'index)                       
        
        
    });

   const imagePlayer2 = document.getElementById("carouselPlayer2");

	document.getElementById("nextPlayer2").addEventListener("click", () => {
        i++
        // On incrémente de 1 pour faire défiler les images
        if(i >= gallery.length){      
            // En fin de longueur du tableau, on redémarre au début de l'index
            i = 0;  
        }
        imagePlayer2.src = gallery[i];   
        // On associe image aux éléments du tableau (suivant le numéro d'index)                       
        
        
    });

})();
