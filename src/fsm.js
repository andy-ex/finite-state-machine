class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config)
            throw new Error()

        this.config = config;
        this.history = [config.initial];
        this.currentState = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.currentState];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.history = this.history.slice(0, this.currentState + 1);
            this.history.push(state);
            this.currentState++;
        } else 
            throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.config.states[this.getState()].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event)
            return Object.keys(this.config.states);

        var states = []
        for (var state in this.config.states) {
            var transition = this.config.states[state].transitions[event];
            if (transition)
                states.push(state);
        }

        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentState == 0)
            return false;

        this.currentState--;

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.currentState == this.history.length - 1)
            return false;

        this.currentState++;

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.getState()];
        this.currentState = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
