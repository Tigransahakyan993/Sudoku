
class SignInView {
    constructor() {
        this.isExist = false;
        this.setData = this.setData.bind(this)
    }

    render() {
        if (!this.isExist) {
            this.create()
            return
        }
        this.update()
    }

    create() {
        const root = document.getElementById('root');
        const container = document.createElement('div');
        this.username = document.createElement("input");
        this.password = document.createElement('input');
        this.username.classList.add('form-control');
        this.password.classList.add('form-control');
        const usernameLabel = document.createElement('label');
        const passwordLabel = document.createElement('label');
        const loginBtn = document.createElement('button');
        usernameLabel.innerText = 'Username';
        passwordLabel.innerText = 'Password';
        loginBtn.innerText = 'LogIn';
        loginBtn.className = 'btn btn-primary';
        loginBtn.addEventListener('click', () => {});

        container.appendChild(usernameLabel);
        container.appendChild(this.username);
        container.appendChild(passwordLabel);
        container.appendChild(this.password);
        container.appendChild(loginBtn);
        root.appendChild(container);
    }

    update() {

    }

    setData() {
        this.render()
    }
}

export const logIn = new SignInView();