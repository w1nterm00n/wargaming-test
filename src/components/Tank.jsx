import ExpCalculator from "./ExpCalculator"


function Tank( {name} ) {
    return (
        <div className="tank_wrapper" data-tank={name}>
            <div className="tank">
                <img src="./src/assets/tank.png" alt="tank image" />
                <h6>{name}</h6>
            </div>
            <ExpCalculator />
        </div>
    )
}

export default Tank;