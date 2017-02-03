const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	// IMPLEMENT ME
	position[0] += velocity[0] * delta + 1/2 * acceleration[0] * delta * delta;
	position[1] += velocity[1] * delta + 1/2 * acceleration[1] * delta * delta;

	velocity[0] += acceleration[0] * delta;
	velocity[1] += acceleration[1] * delta;

	if (position[0] + mass < 0) {
		position[0] = 800 + mass;
	} 
	if (position[0] - mass > 800) {
		position[0] = 0 - mass;
	}
	if (position[1] + mass < 0) {
		position[1] = 800 + mass;
	}
	if (position[1] - mass > 800) {
		position[1] = 0 - mass;
	}


    return { mass, acceleration, velocity, position }
}

export default particle

export { update }
