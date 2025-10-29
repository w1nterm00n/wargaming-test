import { useState, useEffect } from "react";

function FightAmountSlider({ onNumberChange }) {
  const min = 0, max = 300;

  const [val, setVal] = useState(100);
  const [text, setText] = useState("100");
  const [isManualInput, setIsManualInput] = useState(false);
  const percent = ((val - min) * 100) / (max - min);
  const clamp = (n) => Math.min(max, Math.max(min, n));

    useEffect(() => {
      onNumberChange(val);
    }, [onNumberChange, val]);


  const onSliderChange = (e) => {
    //срабатывает когда выбираю значение ползунком
    const n = Number(e.target.value);
    setVal(n);
    setText(String(n));
    setIsManualInput(false);
  };


  const onInputChange = (e) => {
    //срабатывает когда ввожу цифры через инпут (на каждой цифре)
    const t = e.target.value;
    setText(t);
    setIsManualInput(true);
    const n = Number(t);
    if (!Number.isNaN(n)) {
      setVal(clamp(Math.round(n)));
    }
  };


  const onInputBlur = () => {
    //срабатывает когда полностью ввела число через инпут
    const n = Number(text);
    const normalized = Number.isNaN(n) ? val : clamp(Math.round(n));
    setVal(normalized);
    setText(String(normalized));
  };

  return (
    <div className="fight_amount_slider">
      <div className="fight_amount_slider_wrapper">
        <div className="slider-row">
            <div className="slider_wrapper">
                <div className="slider-shell">
                    <input
                    className="slider"
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={val}
                    onChange={onSliderChange}
                    aria-label="Значение ползунка"
                    style={{'--p': `${percent}%`}}
                    />
                </div>
            </div>

          <input
            className={`display${isManualInput ? " display--manual" : ""}`}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={1}
            value={text}
            onChange={onInputChange}
            onBlur={onInputBlur}
            aria-label="Числовое значение"
          />
        </div>
      </div>
    </div>
  );
}

export default FightAmountSlider;
