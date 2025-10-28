function BackToTop(  ) {
    function returnToTop() {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    }

    return (
        <div className="back_to_top_wrapper">
            <button className="back_to_top" onClick={returnToTop}>
                <img src="./src/assets/toTopButton.png" alt="arrow" />
                <img src="./src/assets/toTopButton.png" alt="arrow" />
            </button>
        </div>
    )
}

export default BackToTop;