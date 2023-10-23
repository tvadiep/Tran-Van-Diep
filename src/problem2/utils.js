const TOKEN_INFO_ENDPOINT = "https://interview.switcheo.com/prices.json";
let data;
export const fetchPrice = async () => {
  try {
    const response = await fetch(TOKEN_INFO_ENDPOINT);

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There was a problem when fetching token information:",
      error
    );
    return null; // You can handle the error appropriately and return a value
  }
};
export const getData = () => {
  return data;
};
