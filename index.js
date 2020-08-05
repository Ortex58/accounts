const imgUrl = "./simp.jpg";
var initialData = {
    "accounts": [
        {
            "title": "Mister Smith",
            "img": imgUrl
        },
        {
            "title": "Mister Bob",
            "img": imgUrl
        },
        {
            "title": "Mister Garry",
            "img": imgUrl
        }
    ]
}

const screen1 = document.querySelector('.screen1');
const screen2 = document.querySelector('.screen2');
const inputTextField = document.querySelector('input.form-user-add--text');
function getFormButtons() {
    return document.querySelectorAll('.form-user-add__button__btn');
}
function setData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}
function getData() {
    return JSON.parse(localStorage.getItem('data'));
}
const state = {
    firstScreen: {
        active: true,
        currentAccount: 0,
        listFocused: true,
        buttonAddFocused: false
    },
    secondScreen: {
        active: false,
        currentButton: 0,
        inputFocused: true
    }
}
console.log()


window.onload = () => {

    if (!getData()) {
        setData(initialData);
    }
    renderAccountItems();
    const formButtons = getFormButtons();
    //Click on Screen2 button ADD
    formButtons[0].addEventListener('click', () => {
        const newAccount = {
            title: inputTextField.value,
            img: imgUrl
        };
        if (inputTextField.value !== '') {
            const data = getData();
            data.accounts.push(newAccount);
            setData(data);
            inputTextField.value = '';
            renderAccountItems();
            screen2.classList.remove('active');
            screen1.classList.add('active');
            state.secondScreen.active = false;
            state.firstScreen.active = true;
            inputFocused = false;
            state.firstScreen.currentAccount = 0;
            getAccountElements()[state.firstScreen.currentAccount].focus();
        }

    });
    //Click on Screen2 button Cancel
    formButtons[1].addEventListener('click', () => {
        state.secondScreen.active = false;
        state.firstScreen.active = true;
        state.firstScreen.currentAccount = 0;
        screen2.classList.remove('active');
        screen1.classList.add('active');
        getAccountElements()[state.firstScreen.currentAccount].focus();
    });
    //Click on Screen1 button ADD
    buttonAddAccount.addEventListener('click', (event) => {
        event.preventDefault();
        screen2.classList.add('active');
        screen1.classList.remove('active');
        state.secondScreen.active = true;
        state.firstScreen.active = false;
        if (state.secondScreen.active) {
            state.secondScreen.inputFocused = true;
            inputTextField.focus();
            inputTextField.value = '';
        }
    })
}
function renderAccountItem(title, img, parent) {
    const accountItem = document.createElement('li');
    const imgItem = document.createElement('img');
    const titleItem = document.createElement('span');
    accountItem.classList.add('accounts__item');
    accountItem.setAttribute('tabindex', '0');
    imgItem.classList.add('accounts__item--img');
    imgItem.setAttribute('src', img);
    titleItem.classList.add('accounts__item--title');
    titleItem.innerText = title;
    accountItem.appendChild(imgItem);
    accountItem.appendChild(titleItem);
    parent.appendChild(accountItem);
}
function renderAccountItems() {
    const container = document.querySelector('.accounts__items');
    container.innerHTML = '';
    const accountsData = getData();
    accountsData.accounts.forEach((account) => {
        renderAccountItem(account.title, account.img, container);
    });
    const elements = getAccountElements();
    if (elements.length) {
        state.firstScreen.currentAccount = 0;
        elements[0].focus();
        console.log(elements[0]);
    }

};
function getAccountElements() {
    return document.querySelectorAll('.accounts__item');
}

screen1.classList.add('active');

let currentFocusedAccount = 0;
let buttonAddAccount = document.querySelector('.accounts__button .accounts__button--btn');

document.addEventListener('keydown', (event) => {
    const keyCode = event.keyCode
    // KeyDown
    if (keyCode == 40) {
        if (state.firstScreen.active) {
            if (state.firstScreen.listFocused && state.firstScreen.currentAccount < getAccountElements().length - 1) {
                state.firstScreen.currentAccount++;
                getAccountElements()[state.firstScreen.currentAccount].focus();
            } else
                if (state.firstScreen.listFocused && state.firstScreen.currentAccount == getAccountElements().length - 1) {
                    state.firstScreen.currentAccount = 0;
                    getAccountElements()[state.firstScreen.currentAccount].focus();
                    // console.log(state.firstScreen.currentAccount);
                }
        }
        else if (state.secondScreen.active) {
            if (state.secondScreen.inputFocused) {
                state.secondScreen.inputFocused = false;
                getFormButtons()[state.secondScreen.currentButton].focus();
            }
        }
    }
    // KeyUp
    if (keyCode == 38) {
        if (state.firstScreen.active) {
            if (state.firstScreen.listFocused && state.firstScreen.currentAccount == 0) {
                state.firstScreen.currentAccount = getAccountElements().length - 1;
                getAccountElements()[state.firstScreen.currentAccount].focus();
            } else if (state.firstScreen.listFocused && state.firstScreen.currentAccount > 0) {
                state.firstScreen.currentAccount--;
                getAccountElements()[state.firstScreen.currentAccount].focus();
            }
        }
        else if (state.secondScreen.active) {
            if (state.secondScreen.currentButton == 0) {
                state.secondScreen.inputFocused = true;
                inputTextField.focus();
            } else if (state.secondScreen.currentButton == 1) {
                state.secondScreen.inputFocused = true;
                inputTextField.focus();
            }
        }
    }
    // KeyRight
    if (keyCode == 39) {
        if (state.firstScreen.active) {
            if (state.firstScreen.listFocused) {
                buttonAddAccount.focus();
                state.firstScreen.buttonAddFocused = true;
            }
        }
        else
            if (state.secondScreen.active) {
                if (!state.secondScreen.inputFocused && state.secondScreen.currentButton == 0) {
                    state.secondScreen.currentButton = 1;
                    getFormButtons()[state.secondScreen.currentButton].focus();
                }
            }
    }
    // KeyLeft
    if (keyCode == 37) {
        if (state.firstScreen.active) {
            if (state.firstScreen.buttonAddFocused) {
                getAccountElements()[state.firstScreen.currentAccount].focus();
                state.firstScreen.buttonAddFocused = false;
            } else if (state.firstScreen.listFocused) {
                const data = getData();
                if (data.accounts.length) {
                    data.accounts.splice(state.firstScreen.currentAccount, 1);
                    setData(data);
                    renderAccountItems();
                }
            }

        }
        else
            if (state.secondScreen.active) {
                if (state.secondScreen.currentButton == 1) {
                    state.secondScreen.currentButton = 0;
                    getFormButtons()[state.secondScreen.currentButton].focus();
                }
            }
    }
    //Press Enter on input field
    if (keyCode == 13) {
        if (state.secondScreen.active && state.secondScreen.inputFocused) {
            const newAccount = {
                title: inputTextField.value,
                img: imgUrl
            };
            if (inputTextField.value !== '') {
                const data = getData();
                data.accounts.push(newAccount);
                setData(data);
                inputTextField.value = '';
                renderAccountItems();
                screen2.classList.remove('active');
                screen1.classList.add('active');
                state.secondScreen.active = false;
                state.firstScreen.active = true;
                inputFocused = false;
                state.firstScreen.currentAccount = 0;
                getAccountElements()[state.firstScreen.currentAccount].focus();
            }
        }
    }
});

