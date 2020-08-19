export default class Observable {
    constructor() {
        this.observers = [];
    }

    addObserver(type, func) {
        this.observers.push({type, func})
    }

    removeObserver(type) {
        const index = this.observers.findIndex(obs => obs.type === type);
        this.observers.splice(index, 1)
    }

    dispatch(type, msg) {
        this.observers.forEach(obs => {
            obs.type === type ? obs.func(msg) : null;
        })
    }
}