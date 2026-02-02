const containerToast = document.getElementById("toast");
const btnSuccessEl = document.getElementById("success");
const btnErrorEl  = document.getElementById("error");

// functin សម្រាប់ផ្ទុក​ data
const toastMessage = {
    success: {
        icon: "✓",
        title: "Success!",
        description: "Your action completed successfully."
    },
    error: {
        icon: "✗",
        title: "Error!",
        description: "Something went wrong. Please try again."
    }
};

// function បង្កើត card 
const cardElement = (item, type)=> {
    return `
        <div class="toast-body ${type}">
            <span>${item.icon}</span>
            <div class="text-content">
                <p class="title">${item.title}</p>
                <p style="font-size: 14px;" class="description">${item.description}</p>
            </div>
            <div class="btn"><button>×</button></div>
            <div class="progress-line"></div>
        </div>
    `;
};

// function toggle toast 
const closeToast = (e)=> {
    e.classList.remove("show");
    e.classList.add("hidden");
    e.addEventListener("transitionend", () => e.remove());
};

// function សម្រាប់បង្ហាញ data 
const displayCardToast = (data)=> {
    containerToast.insertAdjacentHTML(
        "beforeend",
        cardElement(toastMessage[data], data)
    )
    const toast = containerToast.lastElementChild;
    setTimeout(()=> {
        toast.classList.add("show")
    }, 10)

    const duration = 3000;
    const timer = setTimeout(()=> {
        closeToast(toast)
    }, duration);

    const btnCloseToast = toast.querySelector(".btn");
    btnCloseToast.addEventListener("click", ()=> {
        clearTimeout(timer);
        closeToast(toast);
    });
};

// even​ សម្រាប់ ចុច button
btnSuccessEl.addEventListener("click", ()=> {
    displayCardToast("success")
});

btnErrorEl.addEventListener("click", ()=> {
    displayCardToast("error")
});