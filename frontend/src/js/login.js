import { loadScript } from "vue-plugin-load-script";
import axios from 'axios';

// Function to initialize login
// Callback function called when user logs in
export async function promptLogin(callback) {
      loadScript("http://accounts.google.com/gsi/client")
        .then(() => {
          // Script is loaded, do something
        google.accounts.id.initialize({
          client_id: '510093681647-t5kvn1mblhmn4spdeel659pm3f646il5.apps.googleusercontent.com',
          callback: (e) => { callback(e) }
        });
        google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
          );
          //google.accounts.id.prompt();
          /*google.account.id.cancel();*/
        })
        .catch(() => {
          // Failed to fetch script
          console.log("fail");
            });
}

export async function userSignedIn(credential) {
    const instance = axios.create();
    let result = await instance.get('https://oauth2.googleapis.com/tokeninfo?id_token='+credential);
    return result.data.aud === '510093681647-t5kvn1mblhmn4spdeel659pm3f646il5.apps.googleusercontent.com';
}

export async function loadGoogle() {
  loadScript("http://accounts.google.com/gsi/client");
}
