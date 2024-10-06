// load categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
};

// remove active class function
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    for(let btn of buttons) {
        btn.classList.remove("active")
    }
}

// video category load
const loadCategoriesVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // remove active button
            removeActiveClass()

            // add active button
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
}

// display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")

    categories.forEach((item) => {
        console.log(item);
        // create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn category-btn" >${item.category}</button>
        `

        // add button to category container
        categoryContainer.append(buttonContainer);
    });
}

// time string setup
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let rSecond = parseInt(time % 3600);
    const minute = parseInt(rSecond / 60);
    rSecond = rSecond % 60;
    return `${hour} hour ${minute} minute ago `
}

// load videos
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
};
// displayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = "";
    // add no content section
    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `<div class="min-h-[300px] w-full flex flex-row gap-5 justify-center items-center">
        <img src="./assets/Icon.png" alt="">
        <h2 class="text-center text-xl font-bold">No Content Here In This Category</h2>
    </div>`;
    }else {
        videoContainer.classList.add("grid")
    }

    // add full video section
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML =
            `<figure class="h-[200px] relative">
            <img
                src=${video.thumbnail} class="h-full w-full object-cover" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-1 bg-slate-500 text-sm text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`
            }    
                
        </figure>
        <div class="px-0 py-2 flex gap-2">
          <div>
            <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
          </div>
          <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-slate-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ""}
            </div>
            <p></p>
          </div>
        </div>
        `

        // appent video to container
        videoContainer.append(card)
    })
}

loadCategories()
loadVideos()