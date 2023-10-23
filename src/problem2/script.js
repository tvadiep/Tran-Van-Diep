/**
 * CSS Manipulating
 */
import { fetchPrice, getData } from "./utils.js";
import { populateSelector, addStyleToListItem } from "./domManipulation.js";

const tokenExchange = (data) => {
  const [selector1, selector2] = document.querySelectorAll(".selected");
  const baseToken = selector1.innerText;
  const targetToken = selector2.innerText;
  const errorMessageEle = document.getElementById("form-error-message");

  if (baseToken === "Select" || targetToken === "Select") {
    errorMessageEle.classList.add("error-on");
    return;
  }

  const baseTokenPrice = data.filter((token) => token.currency === baseToken)[0]
    ?.price;
  const targetTokenPrice = data.filter(
    (token) => token.currency === targetToken
  )[0]?.price;
  const ratio = baseTokenPrice / targetTokenPrice;

  const sentAmount = document.getElementById("input-amount").value;
  const outputBox = document.getElementById("target-amount");
  outputBox.value = Number((sentAmount / ratio).toFixed(6));
  errorMessageEle.classList.remove("error-on");
};

async function main() {
  await fetchPrice();
  const data = getData();
  populateSelector(data);
  addStyleToListItem();

  const swapButton = document.getElementById("swap-button");
  swapButton.addEventListener("click", () => tokenExchange(data));
}

main();
