import { useState } from "react";

function FightAmountSlider() {
  const min = 0, max = 300;

  const [val, setVal] = useState(100);
  const [text, setText] = useState("100");
  const percent = ((val - min) * 100) / (max - min);
  const clamp = (n) => Math.min(max, Math.max(min, n));


  const onSliderChange = (e) => {
    const n = Number(e.target.value);
    setVal(n);
    setText(String(n));
  };


  const onInputChange = (e) => {
    const t = e.target.value;
    setText(t);

    const n = Number(t);
    if (!Number.isNaN(n)) {
      setVal(clamp(Math.round(n)));
    }
  };


  const onInputBlur = () => {
    const n = Number(text);
    const normalized = Number.isNaN(n) ? val : clamp(Math.round(n));
    setVal(normalized);
    setText(String(normalized));
  };

  return (
    <div className="fight_amount_slider">
      <div className="fight_amount_slider_wrapper">
        <div className="slider-row">
            <div class="slider_wrapper">
                <div class="slider-shell">
                    <input
                    class="slider"
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
            className="display"
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
