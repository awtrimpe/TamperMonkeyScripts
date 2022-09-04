// ==UserScript==
// @name         Zillow PPSF
// @namespace    http://zillow.com/
// @version      0.1
// @description  Improving the Zillow UI
// @author       atrimpe
// @match        *.zillow.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zillow.com
// @grant        none
// @run-at        document-end
// ==/UserScript==

(() => {
    "use strict";
    document.addEventListener("mouseover", () => {
        let cards = document.getElementsByClassName("property-card-data");
        if (cards.length < 1) {
            console.log('Getting other type');
            cards = document.getElementsByClassName("list-card-info");
        }
        for (let card of cards) {
            let price;
            let sqFootage;
            card.childNodes.forEach((node) => {
                if (node.innerText.includes("$")) {
                    const moneyRegex = /[0-9,]+/g;
                    price = Number(
                        node.innerText.match(moneyRegex)[0].replaceAll(",", "")
                    );
                }
                const regex = /((?<=ba)(.*)(?= sqft))/g;
                if (node.innerText.includes("sqft")) {
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
