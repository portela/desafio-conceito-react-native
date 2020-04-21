import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:3333",
});

export default api;

/**
 * iOS com emulador: localhost
 * iOS com físico: IP da máquina
 * Android com emulador: 
 *  localhost - adb reverse - adb reverse tcp:3333 tcp:3333
 *  10.0.2.2 - Android Studio
 * Android com físico: IP da máquina
 */