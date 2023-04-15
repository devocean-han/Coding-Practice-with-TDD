const { go } = require('./mars-rover-kata')

describe('Mars Rover', () => {
    [
        { startFacing: 'N', endsFacing: 'E' },
        { startFacing: 'E', endsFacing: 'S' },
        { startFacing: 'S', endsFacing: 'W' },
        { startFacing: 'W', endsFacing: 'N' },
    ].forEach(({startFacing, endsFacing}) => {
        it(`turns right from ${startFacing} to ${endsFacing}`, () => {
            let rover = {facing: startFacing};
            rover = go(rover, 'R');
            expect(rover.facing).toEqual(endsFacing);
        });
    });

    // it('turns right from N to E', () => {
    //     let rover = {facing: 'N'}
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('E');
    // });

    // it('turns right from E to S', () => {
    //     let rover = {facing: 'E'};
    //     rover = go(rover, 'R');
    //     expect(rover.facing).toEqual('S');
    // });

    // it('turns right from S to W', () => {
    //     let rover = {facing: 'S'}
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('W');
    // });

    // it('turns right from W to N', () => {
    //     let rover = {facing: 'W'}
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('N');
    // });

    // it('turns right properly from any of the starting direction', () => {
    //     let rover = {facing: 'N'}
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('E');
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('S');
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('W');
    //     rover = go(rover, 'R')
    //     expect(rover.facing).toEqual('N');
    // });
})