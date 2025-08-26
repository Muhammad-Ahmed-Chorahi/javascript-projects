const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".result");
const swapBtn = document.getElementById("swap-btn");

window.addEventListener("load", ()=>{
    updatedata();
});

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = 'selected';
        }
        else if (select.name === 'to' && currCode === 'PKR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let contryCode = countryList[currCode];
    console.log(currCode, contryCode);
    let newSrc = `https://flagsapi.com/${contryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updatedata();
});

swapBtn.addEventListener("click", () => {
    // Add animation class
    swapBtn.classList.add("animate");
    setTimeout(() => {
        swapBtn.classList.remove("animate");
    }, 400); // Match CSS transition duration

    // Swap the selected values
    const fromValue = fromCurr.value;
    const toValue = toCurr.value;
    fromCurr.value = toValue;
    toCurr.value = fromValue;
    // Update flags
    updateFlag(fromCurr);
    updateFlag(toCurr);
    // Update conversion result
    updatedata();
});

const updatedata= async()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if (isNaN(amtValue) || amtValue.trim() === "" || amtValue < 0) {
        amtValue = 1;
        amount.value = 1;
    }

    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;

    const response = await fetch(`${BASE_URL}${fromCurrency.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    let finalAmount = amount.value * rate;
    console.log(finalAmount);

    msg.innerText=`${amount.value} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
}



// const BASE_URL_JSDELIVR = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
// const BASE_URL_FALLBACK = "https://latest.currency-api.pages.dev/v1/currencies/";

// // Function to fetch exchange rate using async/await with fallback
// const fetchExchangeRate = async (fromCurrency, toCurrency) => {
//     try {
//         // First try fetching from the primary URL (cdn.jsdelivr.net)
//         const response = await fetch(`${BASE_URL_JSDELIVR}${fromCurrency.toLowerCase()}.json`);
//         if (!response.ok) throw new Error('Primary API failed'); // In case of failure, trigger fallback
//         const data = await response.json();
//         return data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
//     } catch (error) {
//         console.warn("Primary API failed, trying fallback URL:", error);

//         // Fallback mechanism if primary API fails
//         try {
//             const fallbackResponse = await fetch(`${BASE_URL_FALLBACK}${fromCurrency.toLowerCase()}.json`);
//             if (!fallbackResponse.ok) throw new Error('Fallback API failed');
//             const fallbackData = await fallbackResponse.json();
//             return fallbackData[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
//         } catch (fallbackError) {
//             console.error("Both APIs failed:", fallbackError);
//             return null; // In case both fail
//         }
//     }
// }

// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtValue = amount.value;

//     if (isNaN(amtValue) || amtValue.trim() === "" || amtValue < 0) {
//         amtValue = 1;
//         amount.value = 1;
//     }

//     const fromCurrency = fromCurr.value;
//     const toCurrency = toCurr.value;

//     // Fetch the exchange rate
//     const exchangeRate = await fetchExchangeRate(fromCurrency, toCurrency);

//     if (exchangeRate) {
//         const convertedAmount = amtValue * exchangeRate;
//         console.log(`Converted amount: ${convertedAmount}`);
//         // Update the DOM with the converted amount, if needed
//     } else {
//         console.log("Failed to retrieve the exchange rate.");
//     }
// });
