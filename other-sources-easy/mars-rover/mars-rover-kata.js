function go(rover, instruction) {
    const compass = ['N', 'E', 'S', 'W'];
    rover.facing = compass[(compass.indexOf(rover.facing) + 1) % compass.length]
    // if (instruction === 'R') {
    //     if (rover.facing === 'N') {
    //         rover.facing = 'E'
    //     } else if (rover.facing === 'E') {
    //         rover.facing = 'S'
    //     } else {
    //         rover.facing = 'W';
    //     }
    // }
    return { ...rover };
}

module.exports.go = go;