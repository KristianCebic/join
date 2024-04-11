
/**
 * The function looks for the word "Join" in a section of text on the web page and visually marks it by wrapping the text after "Join" in a highlighted <span> element.
 *
 */
function searchJoin() {
    let paragraph = document.getElementById("textToManipulate");
    let text = paragraph.textContent;
    let index = text.indexOf("Join");

    if (index !== -1) {
        let before = text.substring(0, index);
        let after = text.substring(index);

        let spanElement = document.createElement("span");
        spanElement.textContent = after;
        spanElement.classList.add("highlight");
        paragraph.innerHTML = before;
        paragraph.appendChild(spanElement);
    }
}