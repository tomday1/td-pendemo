function autoGuideRefresh() {
    if (typeof pendo !== 'undefined' && typeof pendo.isReady === 'function' && pendo.isReady()) {
        console.log("Pendo is ready. Proceeding with guide logic.");

        function attemptGuideRetrieval() {
            const guide = pendo.findGuideById('3hcK0X524AtCmK9xc0iJBXl1LuE');

            if (guide) {
                const guideName = guide.name;
                console.log("Guide name:", guideName);

                if (guide && guide.steps && guide.steps.length > 0) {
                    console.log("Guide has steps:", guide.steps);

                    const lastStep = guide.steps[guide.steps.length - 1];
                    const lastStepId = lastStep.id;

                    console.log("Last step ID:", lastStepId);

                    if (pendo.lastGuideStepSeen && pendo.lastGuideStepSeen.guideStepId) {
                        const lastSeenStepId = pendo.lastGuideStepSeen.guideStepId;
                        console.log("Last seen step ID:", lastSeenStepId);

                        if (lastStepId !== lastSeenStepId) {
                            console.log("Last step ID does not match last seen step ID. Showing guide.");
                            pendo.showGuideById('3hcK0X524AtCmK9xc0iJBXl1LuE');
                        } else {
                            console.log("Last step ID matches last seen step ID. Doing nothing.");
                        }
                    } else {
                        console.log("pendo.lastGuideStepSeen or pendo.lastGuideStepSeen.guideStepId is undefined.");
                    }
                } else {
                    console.log("Guide not found or has no steps.");
                }

            } else {
                console.log("Guide not found. Retrying...");
                setTimeout(attemptGuideRetrieval, 200); 
            }
        }

        attemptGuideRetrieval();

    } else {
        console.log("Pendo is not ready yet. Retrying...");
        setTimeout(autoGuideRefresh, 200);
    }
}

autoGuideRefresh();