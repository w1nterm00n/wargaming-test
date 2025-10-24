import ExpCalculator from "./ExpCalculator"
import Tank from "./Tank"

const tanks = [
    'T-34', 'KV-1', 'T-150', 'IS-3', 'ST-1', 'Object-752'
]

function Vidget() {
    const listTanks = tanks.map(tank => 
        <Tank key={tank} name={tank}></Tank>
    );

    return (
        <div className="vidget">
            <div className="vidger_wrapper">
                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>

                <div className="tanks_grid">
                    {listTanks}
                </div>
            </div>
        </div>
    )
}

export default Vidget;