import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_APP_MIX_PUSHER_KEY,
    cluster: import.meta.env.VITE_APP_MIX_PUSHER_CLUSTER,
    forceTLS: true,
    encrypted: true,
    authEndpoint: `${import.meta.env.VITE_APP_URL}/broadcasting/auth`,
});

console.log("Echo instance:", window.Echo);


export default window.Echo;
