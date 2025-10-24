import FightAmountSlider from "./FightAmountSlider";

function ExpCalculator() {
  return (
    <div className="exp_calculator">
      <div className="exp_calculator_wrapper">
        <div className="complectation">
          <div className="heading">Комплектация</div>
          <form className="complectationForm">
            <label>
              <input
                type="radio"
                name="complectation"
                value="standart"
                defaultChecked
              />{" "}
              Стандартная
            </label>
            <label>
              <input type="radio" name="complectation" value="elite" /> Элитная
            </label>
            <label>
              <input type="radio" name="complectation" value="premium" />{" "}
              Премиум
            </label>
          </form>
        </div>
        <div className="tank_exp">
          <div className="heading">Опыт танка</div>
          <div>
            <img src="./src/assets/star.png" alt="star" />
            <div className="tank_exp_value">
                330
            </div>
          </div>
        </div>
        <div className="fights_amount">
          <div className="heading">Количество боёв</div>
          <FightAmountSlider />
        </div>
      </div>
    </div>
  );
}

export default ExpCalculator;
