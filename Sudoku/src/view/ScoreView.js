export class ScoreView {
    constructor() {
        this.isExist = false;
        this.start = false;
        this.time = [0,0];
        this.render = this.render.bind(this);
        this.startStop = this.startStop.bind(this);
    }

    render(){
        if (!this.isExist) {
            this.create();
            this.isExist = true;
            return;
        }
        this.update()
    }

    create () {
        this.container = document.createElement('div');
        this.score = document.createElement('span');
        this.btn = document.createElement('button');

        this.container.classList.add('score');
        this.btn.classList.add('btn');
        this.btn.classList.add('btn-primary');

        this.score.innerText = `00 : 00`;
        this.btn.innerText = 'stop';

        this.btn.addEventListener('click', this.startStop)
        this.container.appendChild(this.score);
        this.container.appendChild(this.btn);
        document.getElementById('root').appendChild(this.container)
        this.startStop();
    }

    update () {
        this.score.innerText = '00 : 00';
        this.time = [0,0];
        !this.start ? this.startStop() : null;
    }

    startStop () {
        if (!this.start) {
            this.btn.innerText = 'stop';
            this.start = true;
            this.timerId = setInterval(() => {
                if (this.time[0] < 59) {
                    this.time[0]++;
                } else {
                    this.time[0] = 0;
                    this.time[1]++
                }
                if (this.time[1] > 60) {
                    this.time[1] = 0
                }
                this.score.innerText = `${this.time[1]}`.padStart(2,'00') + ' : ' + `${this.time[0]}`.padStart(2,'00')
            }, 1000)
        } else {
            this.btn.innerText = 'start';
            clearInterval(this.timerId)
            this.start = false;
        }
    }
}

// export const score = new ScoreView()