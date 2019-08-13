export function preciseRound(num, dec){

    if ((typeof num !== 'number') || (typeof dec !== 'number'))
        return false;

    let num_sign = num >= 0 ? 1 : -1;

    return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
}