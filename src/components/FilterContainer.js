export default function FilterContainer({ setAge, ageGroup, setType }) {
    function selectAge(e) {
        setAge(parseInt(e.currentTarget.value));
    }

    function selectType(e) {
        e.currentTarget.checked ? setType("special") : setType("normal");
    }

    return (
        <section className="flex">
            <div className="basis-1/2 flex gap-4 justify-center">
                <p>Age(Age Group: {ageGroup})</p>
                <select className="w-16" id="selectAge" onChange={selectAge}>
                    {Array.from(Array(61).keys(), (i) => i < 18 ? null : <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
            <label className="basis-1/2 flex gap-4 justify-center">
                <span>Commando/Diver/Guards</span>
                <input type="checkbox" onChange={selectType}></input>
            </label >
        </section >
    );
}