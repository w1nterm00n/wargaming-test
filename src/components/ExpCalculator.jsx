import FightAmountSlider from "./FightAmountSlider";

function ExpCalculator() {
  return (
    <div className="exp_calculator">
      <div className="exp_calculator_wrapper">
        <div className="complectation">
          <div className="heading">Комплектация</div>
          <form className="complectationForm">
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="std" checked/>
            <span className="r__label">Стандартная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="elite"/>
            <span className="r__label">Элитная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="pro"/>
            <span className="r__label">Премиум</span>
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
