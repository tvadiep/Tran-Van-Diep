console.log("hello");

const TOKEN_INFO_ENDPOINT = "https://interview.switcheo.com/prices.json";

const fetchPrice = async () => {
  try {
    const response = await fetch(TOKEN_INFO_ENDPOINT);

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There was a problem when fetching token information:",
      error
    );
    return null; // You can handle the error appropriately and return a value
  }
};

async function getData() {
  try {
    const data = await fetchPrice();
    return data;
  } catch (error) {
    throw new Error("Error getting data: " + error.message);
  }
}

async function populateSelector() {
  const tokenSelectors = document.getElementsByClassName("token-selector");

  for (const selector of tokenSelectors) {
    selector.innerHTML = "";
    const data = await getData();

    data.forEach((token) => {
      const option = document.createElement("option");
      option.value = token.currency;
      option.textContent = token.currency;
      selector.appendChild(option);
    });
  }
}
populateSelector();

async function main() {
  const sentAmount = document.getElementById("input-amount").value;
  const outputBox = document.getElementById("target-amount");
  outputBox.value = sentAmount;

  console.log(sentAmount);
  try {
    const priceData = await fetchPrice();
    console.log(priceData);
  } catch (error) {
    console.error("There was an error in the main function:", error);
  }
}

const swapButton = document.getElementById("swap-button");
swapButton.addEventListener("click", main);
