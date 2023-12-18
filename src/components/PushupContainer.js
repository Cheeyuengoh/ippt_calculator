import { useEffect } from "react";

export default function PushupContainer({ pushups, setPushups, pushupsData }) {
    useEffect(() => {
        const ele = document.getElementById("selectPushups");
        ele.querySelector(`option[value="${pushups}"]`).selected = true;
    }, [pushups]);

    function decrementPushups() {
        setPushups((prevState) => {
            let nextState = prevState - 1;
            return nextState > 0 ? nextState : prevState;
        });
    }

    function incrementPushups() {
        setPushups((prevState) => {
            let nextState = prevState + 1;
            return nextState <= 60 ? nextState : prevState;
        });
    }

    function selectPushups(e) {
        setPushups(parseInt(e.currentTarget.value));
    }

    function numRepToNextPoint() {
        for (const key in pushupsData.repetitions) {
            if (pushupsData.repetitions[key].points > pushupsData.repetitions[pushups].points) {
                return key - pushups;
            }
        }
    }

    return (
        <section className="flex">
        <p className="basis-1/5">Push Ups</p>
        <div className="basis-2/5 flex">
            <button className="button" onClick={decrementPushups}>-1</button>
            <select className="select" id="selectPushups" onChange={selectPushups}>
                {Array.from(Array(61).keys(), (i) => i > 0 ? <option key={i} value={i}>{i}</option> : null)}
            </select>
            <button className="button" onClick={incrementPushups}>+1</button>
        </div>
        <p className="basis-1/5">{pushupsData.repetitions[pushups].points}</p>
        <p className="basis-1/5">{numRepToNextPoint()} reps</p>
    </section>
    );
}