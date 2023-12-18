import { useEffect, useMemo } from "react";

export default function RunningContainer({ runTime, setRunTime, runningData }) {
    const time = useMemo(() => {
        let time = {
            mins: Math.floor(runTime / 60),
            secs: runTime % 60
        }
        return time;
    }, [runTime]);

    useEffect(() => {
        const selectRunMins = document.getElementById("selectRunMins");
        selectRunMins.querySelector(`option[value="${time.mins}"]`).selected = true;

        const selectRunSecs = document.getElementById("selectRunSecs");
        selectRunSecs.querySelector(`option[value="${time.secs}"]`).selected = true;
    }, [time]);

    function decrementRunTime() {
        setRunTime((prevState) => {
            let nextState = prevState - 10;
            return nextState >= 510 ? nextState : prevState;
        });
    }

    function incrementRunTime() {
        setRunTime((prevState) => {
            let nextState = prevState + 10;
            return nextState <= 1100 ? nextState : prevState;
        });
    }

    function selectRunMins(e) {
        if (parseInt(e.currentTarget.value) === 8) {
            const selectRunSecs = document.getElementById("selectRunSecs");
            if (selectRunSecs.value < 30) {
                selectRunSecs.querySelector('option[value="30"]').selected = true;
            }
        }
        const selectRunSecs = document.getElementById("selectRunSecs");
        setRunTime(parseInt(e.currentTarget.value) * 60 + parseInt(selectRunSecs.value));
    }

    function selectRunSecs(e) {
        const selectRunMins = document.getElementById("selectRunMins");
        setRunTime(parseInt(e.currentTarget.value) + parseInt(selectRunMins.value) * 60);
    }

    function timeToNextPoint() {
        const timeArr = runningData["time(<)"];
        let time = 0;
        let smallestHigher = timeArr[Object.keys(timeArr)[0]].points || 50;
        for (const key in timeArr) {
            if (timeArr[key].points > timeArr[runTime].points && timeArr[key].points <= smallestHigher) {
                smallestHigher = timeArr[key].points;
                time = key;
            }
        }
        return runTime - time;
    }

    return (
        <section className="flex">
            <p className="basis-1/5">2.4km Run</p>
            <div className="basis-2/5 flex">
                <button className="button" onClick={decrementRunTime}>-10s</button>
                <select className="select" id="selectRunMins" onChange={selectRunMins}>
                    {Array.from(Array(19).keys(), (i) => i < 8 ? null : <option key={i} value={i}>{i} mins</option>)}
                </select>
                <select className="select" id="selectRunSecs" onChange={selectRunSecs}>
                    {Array.from(Array(6).keys(), (i) => <option disabled={(time.mins === 8 && (i === 0 || i === 1 || i === 2)) || (time.mins === 18 && (i === 3 || i === 4 || i === 5))} key={i * 10} value={i * 10}>{i * 10} secs</option>)}
                </select>
                <button className="button" onClick={incrementRunTime}>+10s</button>
            </div>
            <p className="basis-1/5">{runningData["time(<)"][runTime].points}</p>
            <p className="basis-1/5">{timeToNextPoint()} secs</p>
        </section>
    );
}