
/**
 * The function displays the intro screen, and after the intro is complete, the content of the page is displayed by setting the display to "flex" and increasing the z-index.
 *
 */
function showIntro(){
let introElement = document.querySelector(".intro");
let contentElement = document.querySelector(".content");

introElement.addEventListener("animationend", function() { 
  contentElement.style.display = "flex";                     
  contentElement.style.zIndex = "4";
});
}