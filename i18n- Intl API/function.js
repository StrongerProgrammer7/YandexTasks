
module.exports = function getI18nText({ stringTokens, variables, translations, locale }) 
{  
    let i18nText = "";
    function plural(forms,num)
    {
        if(num%10 === 0 && num % 100 !== 11)
            return forms.many || '';
        else
        {
            if(num%10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num% 100 >= 20))
                return forms.few || '';
            else
                return forms.one || '';
            
        }
    }

    function number(locale,num,format)
    {
        return new Intl.NumberFormat(`${locale}`,{
            style: "currency",
            currency: format
        }).format(num)
    }
    function date(locale,timestamp)
    {
        let options = { weekday: 'long',  day: 'numeric', month: 'long', year: 'numeric', 
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZoneName: 'short'};
        let date = new Date(timestamp);
        return new Intl.DateTimeFormat(locale,options).format(date);
    }

    function relativeTime(locale,num,format)
    {
        return `${new Intl.RelativeTimeFormat(`${locale}`,{
            style: "currency",
            currency: format
        }).format(num)} ${format}`;
    }
    

    function searchingTranslation(locale,elem)
    {
        for(let key in translations[`${locale}`])
            if(key === elem)
                return translations[`${locale}`][`${key}`];        
        return '';
    }

    function searchingVariables(elem)
    {
        for(let key in variables)
        {
            if(key===elem)
                return variables[key];
        }
    }
   
    if(Object.entries(translations).length === undefined || Object.entries(translations).length === null || Object.entries(translations).length == 0)
    {
        translations = {
            "ru-RU": { },
            "en-US": { },
            "de-DE": { },
            "hi-IN": { },
            "ar-AA": { }
        }
       
    }
    function recordAll(locale,elem,translations,format,func,i18nText)
    {
        if(locale===undefined || locale === null || locale === "")
        {
            i18nText = "";
            for(let i in translations)
            {
                switch (func) {
                    case number:
                        i18nText+= number(i,elem,format) + "\n";
                        break;
                    case date:
                        i18nText+= date(i,elem) + "\n";
                        break;
                    case date:
                        i18nText+= date(i,elem) + "\n";
                        break;
                    default:
                        break;
                }
            }

            return i18nText;

        }else
            {
                switch (func) {
                    case number:
                        return i18nText  += number(locale,elem,format);
                        break;
                        case date:
                            return i18nText  += date(locale,elem);
                            break;
                    default:
                        break;
                }
            }
        
    }


    for(let ind = 0; ind<stringTokens.length; ind++)
    {
        if(Array.isArray(stringTokens[ind])===false)
        {
            if(stringTokens[ind][0] === '#')
            {
                if(locale===undefined || locale === null || locale === "" || locale === {} || locale ===[])
                {
                    let substr = i18nText;
                    i18nText = "";
                    for(let i in translations)
                        for(let j in translations[i])
                            i18nText+= substr + translations[i][j] + "\n";
                }else
                    i18nText  += searchingTranslation(locale,stringTokens[ind].substring(1));
            }else
            {
                if(stringTokens[ind][0] ==='$')
                    i18nText  += searchingVariables(stringTokens[ind].substring(1));
                else
                    i18nText  += stringTokens[ind];
            }
        }else
        {
            if(stringTokens[ind][0].substring(1) === 'plural')
            {
                let num = searchingVariables(stringTokens[ind][2].substring(1));
                let key = stringTokens[ind][1].substring(1);
                i18nText  += num + plural(translations[`${locale}`][`${key}`],num);  

            }else
            {
                if(stringTokens[ind][0].substring(1) === 'number') 
                {
                    let num = searchingVariables(stringTokens[ind][1].substring(1)); 
                    i18nText = recordAll(locale,num,translations,stringTokens[ind][2],number,i18nText);
                }else
                {
                    if(stringTokens[ind][0].substring(1) === 'date') 
                    {
                        let timestamp = stringTokens[ind][1]; 
                        i18nText = recordAll(locale,timestamp,translations,null,date,i18nText);
                    }else
                    {
                        if(stringTokens[ind][0].substring(1) === 'relativeTime') 
                        {
                            let num = searchingVariables(stringTokens[ind][1].substring(1)); 
                            let format = stringTokens[ind][2];
                            i18nText = recordAll(locale,num,translations,format,relativeTime,i18nText);
                            // if(locale===undefined || locale === null || locale === "" || locale === {} || locale ===[])
                            // {
                            //     i18nText = "";
                            //     for(let i in translations)
                            //             i18nText+= relativeTime(i,num,format) + "\n";
                                   
                            // }else
                            //     i18nText  += relativeTime(locale,num,format);
                        }else
                        {
                            let ar = stringTokens[ind];
                            ar.shift();
                            for(let i=0;i<ar.length;i++)
                            {
                                if(ar[i][0] === '#')
                                {
                                    if(locale===undefined || locale === null || locale === "" || locale === {} || locale ===[])
                                    {
                                        let substr = i18nText;
                                        i18nText = "";

                                        for(let j in translations)
                                            for(let k in translations[j])
                                                i18nText+= substr + translations[j][k] + "\n";
                                    }else
                                        i18nText  += searchingTranslation(ar[i].substring(1));
                                }else
                                {
                                    if(stringTokens[ind][0] ==='$')
                                        i18nText  += searchingVariables(ar[i].substring(1));
                                    else
                                        i18nText  += ar[i];
                                }
                            }
                        }
                    }
                
                }
            }
        }  
    } 
   return i18nText; 
 }