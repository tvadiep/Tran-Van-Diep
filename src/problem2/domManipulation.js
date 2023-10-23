const dropdowns = document.querySelectorAll(".dropdown");
const IMAGES_LIB_URL =
  "https://raw.githubusercontent.com/tvadiep/token-icons/1bdbb539fb3a4cb12cc733de5faa6bbf786c6379/token/";

const createTokenIcon = (tokenName) => {
  const img = document.createElement("img");
  img.src = `${IMAGES_LIB_URL}${tokenName.toLocaleLowerCase()}.svg`;
  img.alt = `${tokenName.toLocaleLowerCase()}`;
  img.width = img.height = 24;
  img.style.bottom = "2px";
  img.style.position = "relative";
  img.style.right = "5px";
  img.style.float = "left";
  return img;
};
export async function populateSelector(data) {
  dropdowns.forEach(async (dropdown) => {
    const ul = dropdown.querySelector(".menu");
    ul.innerHTML = "";
    data.forEach((token) => {
      const option = document.createElement("li");
      option.value = token.currency;
      //   option.textContent = token.currency;
      option.appendChild(document.createTextNode(token.currency));
      const img = createTokenIcon(token.currency);
      option.appendChild(img);
      ul.appendChild(option);
    });
  });
}

export function addStyleToListItem() {
  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");
    // Add a click event to the select element
    select.addEventListener("click", () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });
    options.forEach((option) => {
      // Add click event to each option element
      option.addEventListener("click", () => {
        // Add token Icon to the select component
        selected.innerText = option.innerText;
        const img = createTokenIcon(option.innerText);
        selected.appendChild(img);

        // Close the options list
        select.classList.remove("select-clicked");
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach((option) => {
          option.classList.remove("active");
        });
        option.classList.add("active");
      });
    });
  });
}
