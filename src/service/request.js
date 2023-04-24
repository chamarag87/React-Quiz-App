import axios from "axios";


export const randQuestion = async () => {
    const config = {
        headers: {}
    }

    const res = await axios.get(
        'https://marcconrad.com/uob/smile/api.php',
        config
    )
    return res;
}