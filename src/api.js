// import { objectToString } from "@vue/shared";

const API_KEY = "4817ebe08dca9fcc5513f0f7829eb5f28f5016f2ec96cff001796e23760e27c7"

// const tickersHandlers = new Map(); // {}
// const loadTickers = () =>{
//     if (tickersHandlers.size === 0){
//         return;
//     }
// }
// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR
// const AGGREGATE_INDEX = "5";

export const loadTickers = tickers =>
fetch (
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tickers.join(
        ","
    )}&tsyms=USD&api_key=${API_KEY}`
)
.then(r => r.json())
.then(rawData =>
    Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
    )
    )
// .then(rawData => {
//     const updatedPrices = Object.fromEntries(
//         Object.entries(rawData).map(([key, value]) => [key, value.USD])
//     )
//     Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
//         const handlers = tickersHandlers.get(currency) ?? [];
//         handlers.forEach(fn => fn(newPrice))
//     })
// })

// socket.addEventListener("message", e => {
//     const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(
//         e.data
//     );
//     if (type !== AGGREGATE_INDEX || newPrice === undefined) {
//         return;
//     }

//     const handlers = tickersHandlers.get(currency) ?? [];
//     handlers.forEach(fn => fn(newPrice));
// });

// function sendToWebSocket(message) {
//     const stringifiedMessage = JSON.stringify(message);

//     if (socket.readyState === WebSocket.OPEN) {
//         socket.send(stringifiedMessage);
//         return;
//     }

//     socket.addEventListener(
//         "open",
//         () => {
//             socket.send(stringifiedMessage);
//         },
//         { once: true }
//     );
// }

// function subscribeToTickerOnWs(ticker) {
//     sendToWebSocket({
//         action: "SubAdd",
//         subs: [`5~CCCAGG~${ticker}~USD`]
//     });
// }

// function unsubscribeFromTickerOnWs(ticker) {
//     sendToWebSocket({
//         action: "SubRemove",
//         subs: [`5~CCCAGG~${ticker}~USD`]
//     });
// }

// export const subscribeToTicker = (ticker, cb) => {
//     const subscribers = tickersHandlers.get(ticker) || [];
//     tickersHandlers.set(ticker, [...subscribers, cb]);
// };

// export const unsubscribeToTicker = (ticker, cb) => {
//     const subscribers = tickersHandlers.get(ticker) || [];
//     tickersHandlers.set(ticker, 
//     subscribers.filter(fn => fn !== cb)
//     )
// }

// setInterval(loadTickers, 5000)
// window.tickers = tickersHandlers
// export const unsubscribeFromTicker = ticker => {
//     tickersHandlers.delete(ticker);
//     unsubscribeFromTickerOnWs(ticker);
// };
