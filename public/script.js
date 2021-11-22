let inititalCount = document.querySelector(".count").textContent;
console.log(inititalCount);

window.setTimeout(async function checkCount() {
    let res = await fetch("/statistics");
    let statistics = await res.json();
    let newCount = statistics.count;
    console.log(newCount);
    if (newCount !== inititalCount) {
        inititalCount = newCount;
        document.querySelector(".count").textContent = newCount;
        document.querySelector(".bg").classList.add("animate");
        document.querySelectorAll(".shape > span").forEach((span, index) => {
            span.style = `animation: anim${index + 1} 0.4s ease-out 1;`;
        });
    }
}, 1000);

document
    .querySelector(".bg")
    .addEventListener("animationend", function removeAnimation() {
        document.querySelector(".bg").classList.remove("animate");
    });

document.querySelectorAll(".shape > span").forEach((span, index) => {
    span.addEventListener("animationend", function removeAnimation() {
        this.style = "animation: none";
    });
});

document.querySelector(".anim").addEventListener("click", () => {
    document.querySelector(".bg").classList.add("animate");
    document.querySelectorAll(".shape > span").forEach((span, index) => {
        span.style = `animation: anim${index + 1} 0.4s ease-out 1;`;
    });
});
