import axios from 'axios';

export async function translate(text,lang,token) {
    const instance = axios.create();
    let result = await instance.post('https://translation.googleapis.com/language/translate/v2',{
            q: [text],
            source: 'en',
            target: lang,
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    );
    console.log(result);
    return result;
}

