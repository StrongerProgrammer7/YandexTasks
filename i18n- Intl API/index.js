const getI18nText = require('./function');
const input = require('./input');

const stringTokens = [  
    "#price",  
    " ",  
    ["@plural", "#day", "$tripDays"],  
    " - ",  
    ["@number", "$tripPrice", "USD"]  
];  
 
const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
}  
 
const translations = {  
  "ru-RU" : {             // локаль  
    price: "Цена",        // обычный перевод для ключа price  
    day: {                // перевод для ключа day c учетом плюральных форм  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
    }  
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
          few: " days",  
          many: " days",  
          other: " days",   
        }  
  },  
 
}  

console.log(getI18nText({stringTokens, variables, translations, locale: "ru-RU"}));
console.log(getI18nText({stringTokens, variables, translations, locale: "en-US"}));

console.log(getI18nText(
  {
      stringTokens:[["@number", "$var", "USD"]],
      variables: { var: 123456789.0123 },
      translations: {},
  }));

console.log(getI18nText(
{
    stringTokens:input[0],
    variables: input[1],
    translations: input[2],
}));

console.log(getI18nText(
    {
        stringTokens:["key", " ", "$var", " ", "#translation"],
        variables: { var: 100 },
        translations: {
            "ru-RU": { translation: "тест" },
            "en-US": { translation: "test" },
            "de-DE": { translation: "prüfen" },
            "hi-IN": { translation: "परीक्षा" },
            "ar-AA": { translation: "امتحان" },
        }
    }));