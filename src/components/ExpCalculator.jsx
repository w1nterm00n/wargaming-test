import { useEffect, useState } from "react";
import FightAmountSlider from "./FightAmountSlider";


function handleCloseBtn(calcEl) {
  if (!calcEl) return;
  calcEl.classList.remove('exp_calculator_is_visible');
}

function showAndHideCalculator() {
  const cleanups = [];
  document.querySelectorAll('.tank_wrapper').forEach(w => {
    const c = w.querySelector('.exp_calculator');
    if (!c) return;

    const onEnter = () => c.classList.add('exp_calculator_is_visible');
    const onLeave = e => {
      if (!c.contains(e.relatedTarget)) {
        c.classList.remove('exp_calculator_is_visible');
      }
    };

    w.addEventListener('mouseenter', onEnter);
    //w.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      w.removeEventListener('mouseenter', onEnter);
      w.removeEventListener('mouseleave', onLeave);
    });
  });
  return () => cleanups.forEach(fn => fn());
}



function ExpCalculator({name}) {
  useEffect(() => {
    const cleanup = showAndHideCalculator();
    return cleanup;
  }, []);

  const [plan, setPlan] = useState("std");

  const handleChange = e => {
    setPlan(e.target.value);
  };

  return (
    <div className="exp_calculator">
      <div className="close_btn_and_name">
        <div className="name">
          {name}
        </div>
          <button className="close_btn" onClick={(e) =>
            handleCloseBtn(e.currentTarget.closest('.exp_calculator'))
          }>
          <img src="./src/assets/closeBtn.png" alt="X" />
        </button>
      </div>

      <div className="exp_calculator_wrapper">
        <div className="complectation">
          <div className="heading">Комплектация</div>
          <form className="complectationForm">
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="std" checked={plan === "std"} onChange={handleChange}/>
            <span className="r__label r__label_std">Стандартная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="elite" checked={plan === "elite"} onChange={handleChange}/>
            <span className="r__label r__label_elite">Элитная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="pro" checked={plan === "pro"} onChange={handleChange}/>
            <span className="r__label r__label_pro">Премиум</span>
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
