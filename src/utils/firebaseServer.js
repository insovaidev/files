import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const myRefreshToken = "APZUo0QjkLjmwBABb-h8MI3YouWeeaTyR9w4I736UBaWM0HySOhV_w7zz-rwEpjBpEUf04P_NfQ_SwCjohIV1PV3a8veCyv7yyOHMSWBkWhTr2QqUEcR-NYNF4RB_SNUk92L7WWz4hWmb_a_iIJM5PmO3oLoqvO0ekicLqQqvvJJnqNhrFi7TddAjcQQIvrQ9IXTqfRotFVcCUdGejdmfO0mNavQGiuGzw"


const app = initializeApp({
    credential: refreshToken(myRefreshToken),
    databaseURL: 'https://vue-auth-1c876-default-rtdb.firebaseio.com/'
  });

const verifyToken = async (token) => {
    const response = await getAuth(app).verifyIdToken(token)
    if(response){
        const uid = response.uid;
        console.log(uid)
    }
    return 1
}  


export { verifyToken }

// uChviiAtBaVY55rFUXdq9YSRQd73