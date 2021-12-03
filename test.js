
let scriptExchange = 'function getCotizacionBinance() { return 1; }';
let scriptTrade = 'function getCotizacion() { return getCotizacionBinance(); }';

eval(scriptExchange);
eval(scriptTrade);

let cotizacion = getCotizacion();
console.log(cotizacion)

