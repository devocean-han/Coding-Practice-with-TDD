// Stack's API
// - push - adds/pushes items onto the stack
// - pop - removes/pops the most recently pushed item form the stack
// - pook - returns the most recently pushed item without eliminating it from stack
// - size - returns size of the stack
// - isEmpty - returns true if stack is empty

class Stack {

    constructor() {
        this._size = 0;
    }

    pop() {
        if (!this.toBePopped) {
            throw new Error('Stack underflow')
        }
        const result = this.toBePopped.item;
        this.toBePopped = this.toBePopped.nextToBePopped;
        this._size--;
        return result;
    }

    push(item) {
        this.toBePopped = {
            item,
            nextToBePopped: this.toBePopped,
        }
        this._size++;
    }

    peek() {
        if (!this.toBePopped) {
            throw new Error('Stack underflow')
        }
        return this.toBePopped.item;
    }

    size() {
        if (!this.toBePopped) {
            return 0;
        }
        return this._size;
    }

    isEmpty() {
        return this.size() === 0;
    }
}

module.exports.Stack = Stack;