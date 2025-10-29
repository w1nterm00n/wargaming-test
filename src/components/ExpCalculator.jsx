import { useEffect, useRef, useState } from "react";
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
    w.addEventListener('mouseleave', onLeave);

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

  const [complectation, setComplectation] = useState("std");
  const [fightsAmount, setFightsAmount] = useState(100);
  const [totalExp, setTotalExp] = useState(300);
  const [displayedExp, setDisplayedExp] = useState(300);
  const displayedExpRef = useRef(displayedExp);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let n = fightsAmount * 3;
    if (complectation === "std") {
      setTotalExp(n);
    } else if (complectation === "elite") {
      setTotalExp(n + Math.round(n * 0.1));
    } else if (complectation === "pro") {
      setTotalExp(n + Math.round(n * 0.2));
    } else {
      setTotalExp(0);
    }

  }, [complectation, fightsAmount]);

  useEffect(() => {
    displayedExpRef.current = displayedExp;
  }, [displayedExp]);

  useEffect(() => {
    if (displayedExpRef.current === totalExp) {
      return;
    }

    const duration = 400;
    const startValue = displayedExpRef.current;
    const diff = totalExp - startValue;
    let startTime = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextValue = Math.round(startValue + diff * easedProgress);
      setDisplayedExp(nextValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [totalExp]);

  const handleComplectation = e => {
    setComplectation(e.target.value);
  };
  const handleFightsAmount = (value) => {
    setFightsAmount(value);
  }

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
            <input className="r__input" type="radio" name="plan" value="std" checked={complectation === "std"} onChange={handleComplectation}/>
            <span className="r__label r__label_std">Стандартная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="elite" checked={complectation === "elite"} onChange={handleComplectation}/>
            <span className="r__label r__label_elite">Элитная</span>
          </label>
          
          <label className="r">
            <input className="r__input" type="radio" name="plan" value="pro" checked={complectation === "pro"} onChange={handleComplectation}/>
            <span className="r__label r__label_pro">Премиум</span>
          </label>
        </form>
        </div>
        <div className="tank_exp">
          <div className="heading">Опыт танка</div>
          <div className="tank_exp_wrapper">
            <img src="./src/assets/star.png" alt="star" />
            <div className="tank_exp_value">
                {displayedExp}
            </div>
          </div>
        </div>
        <div className="fights_amount">
          <div className="heading">Количество боёв</div>
          <FightAmountSlider onNumberChange={handleFightsAmount}/>
        </div>
      </div>
    </div>
  );
}

export default ExpCalculator;
