export function calculateNewInterval(
  CEF: number,
  TSR: number,
  CSR: number,
  currentInterval: number
) {
  // 
  let CSRavoidInfinity = CSR === 100 ? 90 : CSR === 0 ? 25 : CSR;
    const logTSR = Math.log(TSR / 100);
    const logCSR = Math.log(CSRavoidInfinity / 100);
    const logRatio = logTSR / logCSR;
  const adjustedEaseFactor = CEF * (logRatio + 0.1);
  

    const boundedEaseFactor = Math.max(1300, Math.min(7000, Math.round(adjustedEaseFactor)));
    // const realDif = adjustedEaseFactor - CEF;
    // const difference = boundedEaseFactor - CEF;
    let newInterval = Math.max(1, Math.round(currentInterval * (boundedEaseFactor / CEF)));


    
    // Optional logic to adjust newInterval based on boundedEaseFactor values
    // if (boundedEaseFactor <= 1400) {
    //     newInterval = 1;
    // } else if (boundedEaseFactor >= 4000) {
    //     newInterval = Math.round(currentInterval * 2.5);
  // }
  

// Temp logic allowing to get back to short interval without loosing reviewState
  if (boundedEaseFactor <= 1750) {
    newInterval = 1;
} else if (boundedEaseFactor >= 4900) {
    newInterval = Math.round(currentInterval * 3);
} else if (boundedEaseFactor >= 6500) {
    newInterval = Math.round(currentInterval * 2.5);
}

   console.log('newInterval after', newInterval);

    return {
        CEF,
        currentInterval,
        logTSR,
        logCSR,
        logRatio,
        adjustedEaseFactor,
        boundedEaseFactor,
        newInterval,
        // realDif,
        // difference,
    };
}
