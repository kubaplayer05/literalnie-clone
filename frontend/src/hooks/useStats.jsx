import {useState} from "react";

const useStats = (name) => {

    const [stat, setStat] = useState(parseInt(localStorage.getItem(`${name}`)) || 0)

    const updateStorage = value => {
        localStorage.setItem(`${name}`, value)
    }

    return {
        value: stat,
        updateValue: setStat,
        updateStorage,
    }
}

export default useStats