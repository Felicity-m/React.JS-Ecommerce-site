import Commerce from "@chec/commerce.js"
//after writting the key into the parenthesis, stop the terminal and restart 
//it in order for the key to work

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true)