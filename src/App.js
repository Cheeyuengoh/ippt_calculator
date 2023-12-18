import './App.css';
import { useEffect, useState } from "react";
import FilterContainer from "./components/FilterContainer";
import PushupContainer from './components/PushupContainer';
import SitupContainer from './components/SitupContainer';
import RunContainer from './components/RunningContainer';
import ResultContainer from './components/ResultContainer';

function App() {
  const [ipptData, setIpptData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/data/ippt.json");
        const result = await response.json();
        setIpptData(result);
      } catch (err) {
        console.log(err);
      }
    }
    if (!ipptData) {
      getData();
    }
  }, [ipptData]);

  const [type, setType] = useState("special");
  const [age, setAge] = useState(18);
  const [ageGroup, setAgeGroup] = useState(1);
  useEffect(() => {
    if (ipptData) {
      for (const key in ipptData.ageGroups) {
        let ageRange = key.split("-");
        if (age >= ageRange[0] && age <= ageRange[1]) {
          setAgeGroup(ipptData.ageGroups[key]);
          break;
        }
      }
    }
  }, [ipptData, age]);

  const [pushups, setPushups] = useState(1);
  const [situps, setSitups] = useState(1);
  const [runTime, setRunTime] = useState(720);

  if (!ipptData) return (<div>Loading</div>);
  return (
    <main className="app">
      <section>
        <p>IPPT Calculator</p>
        <p>Calculate your ippt scores</p>
      </section>

      <FilterContainer setAge={setAge} ageGroup={ageGroup} setType={setType} />

      <section className="flex">
        <p className="basis-1/5">Station</p>
        <p className="basis-2/5">Reps</p>
        <p className="basis-1/5">Points</p>
        <p className="basis-1/5">To Next Point</p>
      </section>

      <PushupContainer pushups={pushups} setPushups={setPushups} pushupsData={ipptData.scores.ageGroups[ageGroup].pushups} />
      <SitupContainer situps={situps} setSitups={setSitups} situpsData={ipptData.scores.ageGroups[ageGroup].situps} />
      <RunContainer runTime={runTime} setRunTime={setRunTime} runningData={ipptData.scores.ageGroups[ageGroup].running} />
      <ResultContainer pushups={pushups} situps={situps} runTime={runTime} scoresData={ipptData.scores.ageGroups[ageGroup]} resultData={ipptData.result[type]} />
    </main>
  );
}

export default App;
