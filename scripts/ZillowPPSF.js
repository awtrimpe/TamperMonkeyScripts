(() => {
    "use strict";
    document.addEventListener("mouseover", () => {
        console.log("ALEX!");
        let cards = document.getElementsByClassName("property-card-data");
        for (let card of cards) {
            let price;
            let sqFootage;
            card.childNodes.forEach((node) => {
                if (node.innerText.includes("$")) {
                    const moneyRegex = /[0-9,]+/g;
                    console.log(node.innerText.match(moneyRegex)[0]);
                    price = Number(
                        node.innerText.match(moneyRegex)[0].replaceAll(",", "")
                    );
                }
                const regex = /((?<=ba)(.*)(?= sqft))/g;
                if (node.innerText.includes("sqft")) {
                    console.log(node.innerText.match(regex)[0]);
                    sqFootage = Number(
                        node.innerText.match(regex)[0].replaceAll(",", "")
                    );
                }
            });
            card.childNodes.forEach((node) => {
                if (node.innerText.includes("$")) {
                    node.innerText = `${node.innerText} | $${(price / sqFootage).toFixed(
            2
          )} price/sq ft`;
                }
            });
        }
    });
})();