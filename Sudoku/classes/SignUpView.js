
class SignUpView {
    constructor() {
        this.isExist = false;
        this.setData = this.setData.bind(this);
    }

    render() {
        if (!this.isExist) {
            this.create()
            return;
        }
        this.update()
    }

    create() {
        const root = document.getElementById('root');
        this.container = document.createElement('form');
        this.container.classList.add('sign-up');
        this.username = document.createElement('input');
        this.password = document.createElement('input');
        this.rePassword = document.createElement('input');
        const usernameLabel = document.createElement('label');
        const passwordLabel = document.createElement('label');
        const rePasswordLabel = document.createElement('label');
        const btn = document.createElement('button');
        this.username.classList.add('form-control');
        this.password.classList.add('form-control');
        this.rePassword.classList.add('form-control');
        usernameLabel.setAttribute('for', 'usernameId');
        passwordLabel.setAttribute('for', 'passwordId');
        rePasswordLabel.setAttribute('for', 'rePasswordId');
        this.username.setAttribute('id', 'usernameId');
        this.password.setAttribute('id', 'passwordId');
        this.rePassword.setAttribute('id', 'rePasswordId');
        usernameLabel.innerText = 'Username';
        passwordLabel.innerText = 'Password';
        rePasswordLabel.innerText = 'rePassword';
        btn.innerText = 'Sign Up';
        btn.className = 'btn btn-primary';
        btn.addEventListener('click', () => {});
        this.container.appendChild(usernameLabel);
        this.container.appendChild(this.username);
        this.container.appendChild(passwordLabel);
        this.container.appendChild(this.password);
        this.container.appendChild(rePasswordLabel);
        this.container.appendChild(this.rePassword);
        this.container.appendChild(btn);
        root.appendChild(this.container);
    }

    update() {

    }

    setData() {
        this.render()
    }

}

export const signUp = new SignUpView()
