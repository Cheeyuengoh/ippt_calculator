import { useEffect } from "react";

export default function SitupContainer({ situps, setSitups, situpsData }) {
    useEffect(() => {
        const ele = document.getElementById("selectSitups");
        ele.querySelector(`option[value="${situps}"]`).selected = true;
    }, [situps]);

    function decrementSitups() {
        setSitups((prevState) => {
            let nextState = prevState - 1;
            return nextState > 0 ? nextState : prevState;
        });
    }

    function incrementSitups() {
        setSitups((prevState) => {
            let nextState = prevState + 1;
            return nextState <= 60 ? nextState : prevState;
        });
    }

    function selectSitups(e) {
        setSitups(parseInt(e.currentTarget.value));
    }

    function numRepToNextPoint() {
        for (const key in situpsData.repetitions) {
            if (situpsData.repetitions[key].points > situpsData.repetitions[situps].points) {
                return key - situps;
            }
        }
    }

    return (
        <section className="flex">
            <p className="basis-1/5">Sit Ups</p>
            <div className="basis-2/5 flex">
                <button className="button" onClick={decrementSitups}>-1</button>
                <select className="select" id="selectSitups" onChange={selectSitups}>
                    {Array.from(Array(61).keys(), (i) => i > 0 ? <option key={i} value={i}>{i}</option> : null)}
                </select>
                <button className="button" onClick={incrementSitups}>+1</button>
            </div>
            <p className="basis-1/5">{situpsData.repetitions[situps].points}</p>
            <p className="basis-1/5">{numRepToNextPoint()} reps</p>
        </section>
    );
}