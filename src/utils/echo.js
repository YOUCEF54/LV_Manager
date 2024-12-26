import Echo from "laravel-echo";
import Pusher from "pusher-js";


window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_APP_MIX_PUSHER_KEY,
    cluster: import.meta.env.VITE_APP_MIX_PUSHER_CLUSTER,
    encrypted: true,
});

export default echo;
