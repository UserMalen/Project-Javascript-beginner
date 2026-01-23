// api
const baseUrl = "https://api.github.com/users/";
// dom 
const searchForm = document.getElementById("search");
const renderCard = document.getElementById("main-content");

const getData = async (username)=> {
    try{
        const respone = await fetch(`${baseUrl}${username}`);
        if(!respone.ok){
            console.error("Not found data", respone.status);
            return null;
        }
        const data = await respone.json();
        return data;
    }
    catch(error){
        console.error("Error api", error);
        return null
    }
};

const cardContent = (data)=> {
    return  `
        <div class="profile-card">
            <img src="${data.avatar_url}" alt="Profile Picture">
            <h2>${data.name || data.login}</h2>
            <p>${data.bio || "គណនីនេះមិនមានជីវប្រវត្តិ (Bio) ទេ"}</p>
            <div class="stats">
                <div><strong>${data.followers}</strong><br>Followers</div>
                <div><strong>${data.following}</strong><br>Following</div>
                <div><strong>${data.public_repos}</strong><br>Repos</div>
            </div>
            <br>
            <a href="${data.html_url}" target="_blank" style="text-decoration:none; color:#007bff;">មើល Profile ដើម</a>
        </div>`
};

searchForm.addEventListener("submit", async (e)=> {
    e.preventDefault();
    const inputEl = document.getElementById("search-input");
    const inputSearch = inputEl.value.trim();

    if(inputSearch){
        renderCard.innerHTML = "<p>Loading...</p>";
        inputEl.value = "";
        const user = await getData(inputSearch);

        if(user){
            renderCard.innerHTML = cardContent(user);
        }
        else{
            renderCard.innerHTML = "<p>Not found username <b>" + inputSearch;
        }
    }
});