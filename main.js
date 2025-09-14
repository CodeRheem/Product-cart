let shop = []; // define shop array
const container = document.getElementById("desserts"); // get container element

// Fetch data from local JSON file

async function fetchData() {
  try {
    const response = await fetch("data.json"); // fetch data from local JSON file
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json(); // parse JSON data
    shop = data; // assign data to shop array
    console.log(shop); // log shop array to console
    renderShop(); // call function to render shop items
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function increaseQuantity(object){
        shop.forEach(item => {
        if(item.name === object){
            item.quantity += 1;          
        }
    })
    renderShop();
}
function decreaseQuantity(object){
    shop.forEach(item => {
        if(item.name === object){
            if(item.quantity > 0){
                item.quantity -= 1;
            }
        }
    })
    renderShop();
}

function renderShop() {
  let htmlContent = ""; // clear existing content
  shop.forEach((item) => {
    const cartButton =
      item.quantity > 0
        ? `<div class="border border-white shadow-2xs text-white bg-rose-900 rounded-3xl flex items-center justify-between p-2 justify-self-center absolute -m-5 w-1/2">
                    <button class="font-medium h-full aspect-square p-2 rounded-full border border-white flex items-center" onclick="decreaseQuantity('${item.name}')" >-</button>
                    <p class="font-medium">${item.quantity}</p>
                    <button class="font-medium h-full aspect-square p-2 rounded-full border border-white flex items-center" onclick="increaseQuantity('${item.name}')">+</button>
            </div>`
        : ` <button class="border flex items-center justify-center gap-2 border-black shadow-2xs bg-white rounded-3xl justify-self-center absolute -m-5 px-7 py-2 w-1/2 " onclick="increaseQuantity('${item.name}')">
                <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart" class="mr-1 font">
                <p class="font-medium">Add to Cart</p>
            </button>`;
    htmlContent += `
        <div class="w-fit">
            <div class="w-inherit relative">
                <img src="${item.image.desktop}" alt="${item.name}" class="rounded-2xl relative">
                ${cartButton}
            </div>
            <div class="mt-10 flex flex-col justify-self-start gap-4">
                <div class="text-[13px] text-red-200 font-[100px]">${item.category}</div>
                <div class="-mt-3 font-[450] text-[15px]">${item.name}</div>
                <div class="-mt-3 text-rose-400 font-[450]">$${item.price}</div>
            </div>
        </div>
    `;
  });

  container.innerHTML = htmlContent;
}

fetchData(); // call fetchData function to initiate data fetching and rendering
