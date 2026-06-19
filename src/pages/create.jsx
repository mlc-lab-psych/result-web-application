import React, { useState } from "react";
import Arrow from "../assets/arrow.svg";
import CreateMultiStepForm from "../components/CreateMultiStepForm";
import { iatSteps, aliveSteps, alignmentSteps } from "../components/create";

const experiments = [
    {
        key: "iat",
        label: "IAT Experiment",
        steps: iatSteps,
        description: "Implicit Association Test"
    },
    {
        key: "alive",
        label: "Alive Experiment",
        steps: aliveSteps,
        description: "Image-based stimuli study"
    },
    {
        key: "alignment",
        label: "Alignment Voice Experiment",
        steps: alignmentSteps,
        description: "Audio voice alignment study"
    }
];

export default function CreateExperiment() {
    const [selectedExperiment, setSelectedExperiment] = useState(null);

    const handleSelect = (experiment) => {
        if (selectedExperiment?.key === experiment.key) return;
        setSelectedExperiment(experiment);
    };

    const handleClose = () => {
        setSelectedExperiment(null);
    };

    return (
        <main>
            <header>
                <h1>Create a New Experiment</h1>
            </header>
            <section style={{ width: "100%" }}>
                <div className={"new-experiment-carousal start"}>
                    {experiments.map((experiment) => (
                        <div
                            key={experiment.key}
                            className={selectedExperiment && selectedExperiment.key !== experiment.key
                                ? "disabled-experiment-blob"
                                : "disabled-experiment-blob selected"
                            }
                            onClick={() => handleSelect(experiment)}
                        >
                            <span>
                                {experiment.label}
                                <img src={Arrow} alt={"Arrow Icon"} className={"arrow"} />
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {selectedExperiment && (
                <section style={{ width: "100%"}}>
                    <CreateMultiStepForm
                        steps={selectedExperiment.steps}
                        experimentType={selectedExperiment.key}
                        onClose={handleClose}
                    />
                </section>
            )}
        </main>
    );
}