// select DOM 
const input_element = document.querySelectorAll(".contant-input input");
const range_element = document.querySelectorAll(".contant-range input");
const slider_element = document.querySelector(".slider");
// gap min price and max price
const gapPrice = 100;
// price max 1000
const maxPrice = 1000;
// event input 
input_element.forEach(input => {
    input.addEventListener("input", (e)=> {
        // get value
        let miniMum = parseInt(input_element[0].value) || 0;
        let maxiMum = parseInt(input_element[1].value) || maxPrice;

        // limit price 
        miniMum = Math.min(Math.max(miniMum, 0), maxPrice);
        maxiMum = Math.min(Math.max(maxiMum, 0) , maxPrice);
        // check gap price
        if(maxiMum - miniMum < gapPrice){
            if(e.target.className === "min-input"){
                miniMum = maxiMum - gapPrice;
                if(miniMum < 0) miniMum = 0;
                input_element[0].value = miniMum 
            }
            else{
                maxiMum = miniMum + gapPrice;
                if(maxiMum > maxPrice) maxiMum = maxPrice;
                input_element[1].value = maxiMum
            }
        }
        // update value to slider range
        range_element[0].value = miniMum;
        range_element[1].value = maxiMum;
        // calling arrow funcntion slider style
        sliderRange(miniMum, maxiMum);
    });
});
// event range
range_element.forEach(range => {
    range.addEventListener("input", (e)=> {
        // get value
        let minRange = parseInt(range_element[0].value);
        let maxRange = parseInt(range_element[1].value);
        // check gap slider
        if(maxRange - minRange < gapPrice){
            if(e.target.className === "min-range"){
                minRange = maxRange - gapPrice;
                if(minRange < 0 ) minRange = 0;
                range_element[0].value = minRange
            }
            else{
                maxRange = minRange + gapPrice;
                if(maxRange > maxPrice) maxRange = maxPrice;
                range_element[1].value = maxRange;
            }
        }
        // update value to input element
        input_element[0].value = minRange;
        input_element[1].value = maxRange;
        // calling arrow function slider style
        sliderRange(minRange, maxRange);
    });
});
// function generate slider style
const sliderRange = (min, max)=> {
    // calculate slider 
    let minSlider = (min / maxPrice) * 100; 
    let maxSlider = 100 - (max / maxPrice) * 100;
    // update slider
    slider_element.style.left = minSlider + "%";
    slider_element.style.right = maxSlider + "%"; 
};
// Initialize
// window.addEventListener('DOMContentLoaded', () => {
//     const initialMin = parseInt(input_element[0].value) || 0;
//     const initialMax = parseInt(input_element[1].value) || maxPrice;
//     sliderRange(initialMin, initialMax);
// });