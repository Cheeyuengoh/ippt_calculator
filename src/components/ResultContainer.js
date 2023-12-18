import { useMemo } from "react";

export default function ResultContainer({ pushups, situps, runTime, scoresData, resultData }) {
    const totalPoints = useMemo(() => {
        let pushupsPoints = scoresData.pushups.repetitions[pushups].points;
        let situpsPoints = scoresData.situps.repetitions[situps].points;
        let runTimePoints = scoresData.running["time(<)"][runTime].points;

        return pushupsPoints + situpsPoints + runTimePoints;
    }, [pushups, situps, runTime, scoresData]);

    const result = useMemo(() => {
        for (const key in resultData) {
            let scoresRange = key.split("-");
            if (totalPoints >= scoresRange[0] && totalPoints <= scoresRange[1]) {
                return {
                    award: resultData[key].award,
                    incentive: resultData[key].incentive
                }
            }
        }
    }, [totalPoints, resultData]);

    return (
        <section className="flex justify-between">
            <p>Total Points: {totalPoints}</p>
            <p>Award/Incentive: {result.award}({result.incentive})</p>
        </section>
    );
}