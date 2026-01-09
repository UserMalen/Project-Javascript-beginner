// dom
const tag_select_element = document.getElementById("tag-select");
const paragraph_element = document.getElementById("range-paragraph");
const word_element = document.getElementById("range-word");
 
// create option in js
const tagOption = ["p", "h1", "h2", "h3"];

const createOption = ()=> {
    // create option tag
    tagOption.map(tag => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = `<${tag}>`;
        tag_select_element.appendChild(option);
    });
    // event paragraph slider
    const count_paragraph_element = document.getElementById("value-para");
    paragraph_element.addEventListener("input", ()=>{
        count_paragraph_element.textContent = paragraph_element.value;
    })
    // event word slider
    const count_word_element = document.getElementById("value-word");
    word_element.addEventListener("input", ()=>{
        count_word_element.textContent = word_element.value;
    });
    // event button create paragraph
    const button_element = document.getElementById("button");
    button_element.addEventListener("click", displayGetValue);
};

// function generate word
const createWord = (number)=> {
    // create lorem
    const rawLorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio nihil voluptas eum culpa unde sed provident, cupiditate nobis dolorum ipsum perferendis asperiores excepturi quas modi. Consequuntur id delectus deleniti architecto!";
    // conver paragraph into word
    const new_word = rawLorem.split(/\s+/);
    const return_word = [];
    // create word random
    for(let i = 0; i < number; i++){
        const word_random = Math.floor(Math.random() * new_word.length);
        return_word.push(new_word[word_random]);
    };
    return return_word.join(" ");
};

// function generate paragraph
const createParagraph = (tag, paragraph, word, includeHtml)=> {
    const return_paragraph = [];
    for(let i = 0; i < paragraph; i++){
        const words = createWord(word);
        if(includeHtml === "yes"){
            return_paragraph.push(`<${tag}>${words}</${tag}>`) 
        }
        else{
            return_paragraph.push(words)
        }
    };
    return includeHtml === "yes" ? return_paragraph.join(""):return_paragraph("\n\n");
};

// function display and get value
const displayGetValue = (e)=> {
    e.preventDefault();
    // get value 
    const paragraph = parseInt(paragraph_element.value);
    const word = parseInt(word_element.value);
    const tag = tag_select_element.value;
    const includeHtml = document.getElementById("include-html").value;
    const render_html = document.getElementById("render-html");
    // render
    render_html.textContent = createParagraph(tag, paragraph, word, includeHtml);
};
// calling function display 
createOption();