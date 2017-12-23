import firebase from 'firebase';

const translate = async(q) => {
    
    if(!q){
        return {
            code: 0,
            messages: ['Dữ liệu không hợp lệ']
        }
    }
    try {
        var idToken = await firebase.auth().currentUser.getIdToken(true);
        var response = await fetch('https://us-central1-anhhunglau-7b113.cloudfunctions.net/app/m/texttranslate' ,
        {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + idToken
            },
            body: JSON.stringify({
                q
            })
        });
        rs = await response.json();
        if(rs.code){
            return {
                code: 1,
                data: rs.data.translatedText
            }
        } else {
            return {
                code:0,
                messages: rs.messages
            }
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return {
            code: 0,
            messages: ['Lỗi chưa biết']
        }
    }
    
}
export default {
    translate
}