const { Stack } = require('./stack-class-with-error-handling')

describe('stack', () => {
    describe('push, pop', () => {
        it('thorws when popping from an empty stack', () => {
            const stack = new Stack();
            expect(() => {stack.pop()}).toThrow(new Error('Stack underflow'));
            expect(() => {stack.pop()}).toThrow('Stack underflow');
        });
                    
        it('pops the most recently pushed item; 11', () => {
            const stack = new Stack();
            stack.push(11)
            expect(stack.pop()).toEqual(11);
        });
        
        it('pops the most recently pushed item; 13, 11', () => {
            const stack = new Stack();
            stack.push(11)
            stack.push(13)
            expect(stack.pop()).toEqual(13);
            expect(stack.pop()).toEqual(11);
        });

        it('pops the most recently pushed item; 15, 13, 11', () => {
            const stack = new Stack();
            stack.push(11)
            stack.push(13)
            stack.push(15)
            expect(stack.pop()).toEqual(15);
            expect(stack.pop()).toEqual(13);
            expect(stack.pop()).toEqual(11);
        });
    });
    
    describe('peek', () => {
        it('thorws when peeking from an empty stack', () => {
            const stack = new Stack();
            expect(() => {stack.peek()}).toThrow(new Error('Stack underflow'));
            expect(() => {stack.peek()}).toThrow('Stack underflow');
        });        

        it('peeks the most recently pushed item; 13', () => {
            const stack = new Stack();
            stack.push(11)
            stack.push(13)
            expect(stack.peek()).toEqual(13);
        });
    });

    describe('size', () => {
        it('should return 0 for an empty stack', () => {
            const stack = new Stack();
            expect(stack.size()).toEqual(0);
        });        

        it('should return the size of current Stack; 2', () => {
            const stack = new Stack();
            stack.push(11)
            stack.push(13)
            expect(stack.size()).toEqual(2);
        });
    });

    describe('isEmpty', () => {
        it('should true for an empty stack', () => {
            const stack = new Stack();
            expect(stack.isEmpty()).toEqual(true);
        });        

        it('should return false for not empty stack', () => {
            const stack = new Stack();
            stack.push(11)
            stack.push(13)
            expect(stack.isEmpty()).toEqual(false);
        });
    });
})