let searchInput = document.querySelector('.chats__header__input');
let list = document.querySelector('.chats__content__list');
let notFound = document.createElement('li');
notFound.classList.add('not__found');
notFound.innerHTML = "User not found";
let userInfoSideBar = document.querySelector('.telegram-user-infos');
let sendMess = document.querySelector(".messages__send");
let messInput = document.querySelector(".messages__send__input");
let arr

me = {
    nickname: "Asadbek Zoirov",
    bio: "UWED Student",
    username: "@zoirovasadbek",
    mobile: "+998(99)821-17-44",
    avatar: "./assets/img/emblem.jpg"
}
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let Time
if (minutes < 10) {
    minutes.toString();
    Time = `${hours}:0${minutes}`
} else {
    Time = `${hours}:${minutes}`;
}
// local storage
let data = JSON.stringify(DATA);
localStorage.setItem("__data", data);
let users = JSON.parse(localStorage.getItem("__data")).users;

function renderChats(array) {
    list.innerHTML = "";

    array.forEach(element => {

        let newListElement = document.createElement('li');
        newListElement.classList.add('chats__content__list__element');
        newListElement.innerHTML = `
            <div class="chats__content__list__element__main">
                <img src="${element.avatar}" alt="" class="chats__content__list__element__main__avatar">
                <div class="chats__content__list__element__main__content">
                    <span class="chats__content__list__element__main__content__username">${element.nickname}</span>
                    <span class="chats__content__list__element__main__content__lastmess">${element.messages[(element.messages.length) - (1)].text.slice(0, 25)}...</span>
                </div>
            </div>
            <div class="chats__content__list__element__other">
                <span class="chats__content__list__element__other__time">${element.messages[(element.messages.length) - (1)].date}</span>
                <i class="fas fa-check chats__content__list__element__other__icon"></i>
            </div>
        `
        list.appendChild(newListElement);
        document.addEventListener("DOMContentLoaded", () => {
            if (element.id == '1') {
                newListElement.click();
            }
        });

        newListElement.addEventListener('click', event => {
            arr = element.messages

            let chats = document.querySelectorAll('.chats__content__list__element')
            chats.forEach(chat => { chat.classList.remove('active') });
            newListElement.classList.add('active');
            // MESSAGE CONTENT
            let messHeaderUserName = document.querySelector('.messages__header__main__name');
            let messHeaderStatus = document.querySelector('.messages__header__main__status');
            messHeaderUserName.textContent = element.nickname;
            messHeaderStatus.textContent = element.status;

            let messList = document.querySelector('.messages__content') // ul
            function renderMess(array) {
                messList.textContent = "";
                array.forEach((el, index) => {
                    if (el.isOwner) {
                        let messFromMe = document.createElement("li");
                        messFromMe.classList.add("messages__content__mine");

                        messFromMe.innerHTML = `
                        <img src="${me.avatar}" alt="" class="messages__content__mine__avatar">
                        <span class="messages__content__mine__mess">
                            <span class="messages__content__mine__mess__text">${el.text}</span>
                            <span class="messages__content__mine__mess__time">${el.date}</span>
                        </span>
                        `
                        messFromMe.setAttribute("id", `message${index}`)
                        messList.appendChild(messFromMe)
                    }
                    else {
                        let messToMe = document.createElement("li");
                        messToMe.classList.add("messages__content__others");

                        messToMe.innerHTML = `
                        <img src="${element.avatar}" alt="" class="messages__content__others__avatar"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <span class="messages__content__others__mess">
                            <span class="messages__content__others__mess__text">${el.text}</span>
                            <span class="messages__content__others__mess__time">${el.date}</span>
                        </span>
                        `
                        messToMe.setAttribute("id", `message${index}`)
                        messList.appendChild(messToMe)
                    }
                    location.href = "#message" + (array.length - 1);
                    sendMess.reset();
                    messInput.focus();
                });
            }
            renderMess(element.messages)
            sendMess.addEventListener("submit", event => {
                event.preventDefault();
                createMess(messInput.value);
            })
            function createMess(value) {
                if (value.length > 0) {
                    if (value.length > 25) {
                        let ar = [...value];
                        for (let i = 0; i < ar.length; i += 40) {
                            ar.splice(i, 0, " ");
                        }

                        value = ar.join("");
                    }
                    arr.push({ text: value, isOwner: true, date: Time });

                    // localStorage.clear();
                    localStorage.setItem("__messages", JSON.stringify(arr));
                }
                renderMess(JSON.parse(localStorage.getItem("__messages")))
                newListElement.innerHTML = `
            <div class="chats__content__list__element__main">
                <img src="${element.avatar}" alt="" class="chats__content__list__element__main__avatar">
                <div class="chats__content__list__element__main__content">
                    <span class="chats__content__list__element__main__content__username">${element.nickname}</span>
                    <span class="chats__content__list__element__main__content__lastmess">${element.messages[(element.messages.length) - (1)].text.slice(0, 25)}...</span>
                </div>
            </div>
            <div class="chats__content__list__element__other">
                <span class="chats__content__list__element__other__time">${element.messages[(element.messages.length) - (1)].date}</span>
                <i class="fas fa-check chats__content__list__element__other__icon"></i>
            </div>
        `
            }


            // sidebar and modal 
            let rightSidebarContent = document.querySelector(".infos");
            let modal = document.querySelector("#modalBody");
            rightSidebarContent.innerHTML = `
            <span class="infos__title">User Info</span>
            <div class="infos__main">
                <img src="${element.avatar}" class="infos__main__avatar" />
                <div class="infos__main__content">
                    <span class="infos__main__content__username">${element.nickname}</span>
                    <span class="infos__main__content__status">${element.status}</span>
                </div>
            </div>
            <div class="infos__general">
                <i class="fas fa-info-circle"></i>
                <div class="infos__general__content">
                    <span class="infos__general__content__text">${element.bio}</span>
                    <span class="infos__general__content__subtitle">Bio</span>
                    <span class="infos__general__content__text">${element.mobile}</span>
                    <span class="infos__general__content__subtitle">Mobile</span>
                    <span class="infos__general__content__text">${element.username}</span>
                    <span class="infos__general__content__subtitle">Username</span>
                </div>
            </div>
            <div class="infos__other">
                <ul class="infos__other__list">
                    <li>
                        <i class="fas fa-image"></i>
                        <span class="infos__others__list__element">
                            <span class="infos__other__list__element__count">5</span>
                            <span class="infos__other__list__element__text">Photos</span>
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-file"></i>
                        <span class="infos__others__list__element">
                            <span class="infos__other__list__element__count">5</span>
                            <span class="infos__other__list__element__text">Files</span>
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-microphone"></i>
                        <span class="infos__others__list__element">
                            <span class="infos__other__list__element__count">1</span>
                            <span class="infos__other__list__element__text">Voice Messages</span>
                        </span>
                    </li>
                    <li>
                        <i class="fas fa-user"></i>
                        <span class="infos__others__list__element">
                            <span class="infos__other__list__element__count">1</span>
                            <span class="infos__other__list__element__text">Groups in Common</span>
                        </span>
                    </li>
                </ul>
            </div>
            `
            modal.innerHTML = `
            <div class="modal-body__main">
            <img src="${element.avatar}" class="modal-body__main__avatar" />
            <div class="modal-body__main__content">
                <span class="modal-body__main__content__username">${element.nickname}</span>
                <span class="modal-body__main__content__status">${element.status}</span>
            </div>
        </div>
        <div class="modal-body__general">
            <i class="fas fa-info-circle"></i>
            <div class="modal-body__general__content">
                <span class="modal-body__general__content__text">${element.bio}</span>
                <span class="modal-body__general__content__subtitle">Bio</span>
                <span class="modal-body__general__content__text">${element.mobile}</span>
                <span class="modal-body__general__content__subtitle">Mobile</span>
                <span class="modal-body__general__content__text">${element.username}</span>
                <span class="modal-body__general__content__subtitle">Username</span>
            </div>
        </div>
        <div class="modal-body__other">
            <ul class="modal-body__other__list">
                <li>
                    <i class="fas fa-image"></i>
                    <span class="modal-body__others__list__element">
                        <span class="modal-body__other__list__element__count">5</span>
                        <span class="modal-body__other__list__element__text">Photos</span>
                    </span>
                </li>
                <li>
                    <i class="fas fa-file"></i>
                    <span class="modal-body__others__list__element">
                        <span class="modal-body__other__list__element__count">5</span>
                        <span class="modal-body__other__list__element__text">Files</span>
                    </span>
                </li>
                <li>
                    <i class="fas fa-microphone"></i>
                    <span class="modal-body__others__list__element">
                        <span class="modal-body__other__list__element__count">1</span>
                        <span class="modal-body__other__list__element__text">Voice Messages</span>
                    </span>
                </li>
                <li>
                    <i class="fas fa-user"></i>
                    <span class="modal-body__others__list__element">
                        <span class="modal-body__other__list__element__count">1</span>
                        <span class="modal-body__other__list__element__text">Groups in Common</span>
                    </span>
                </li>
            </ul>
        </div>
            `
        });
    });
}
renderChats(users);


let maximize = document.querySelector('.fa-window-maximize');
maximize.addEventListener('click', event => {
    userInfoSideBar.classList.toggle('clicked');
    maximize.classList.toggle('active');
});