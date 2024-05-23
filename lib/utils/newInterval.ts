
export function calculateNewInterval(
  CEF: number,
  TSR: number,
  CSR: number,
  dampeningFactor: number,
  currentInterval: number
): {
  logTSR: number;
  logCSR: number;
  logRatio: number;
  adjustedLogDifference: number;
  adjustedEaseFactor: number;
  CSR: number;
  boundedEaseFactor: number;
  newInterval: number;
  ratio: number;
  realDif: number;
  dif: number;
} {
  const logTSR = Math.log(TSR / 100);
  const logCSR = Math.log(CSR / 100);
  const logRatio = logTSR / logCSR;

  const adjustedLogDifference = CEF * (logRatio - 1);
  const adjustedEaseFactor = CEF + dampeningFactor * adjustedLogDifference;

  // Set a very high upper limit for the boundedEaseFactor
  const boundedEaseFactor = Math.max(
    1300,
    Math.min(13000, Math.round(adjustedEaseFactor))
  );

  const realDif = adjustedEaseFactor - CEF;
  const dif = boundedEaseFactor - CEF;

  const ratio = Math.min(3, boundedEaseFactor / CEF);

  let newInterval = Math.max(
    1,
    Math.round(currentInterval * ratio)
  );

  if (boundedEaseFactor <= 1550) {
    newInterval = 1;
  }

  return {
    logTSR,
    logCSR,
    logRatio,
    adjustedLogDifference,
    adjustedEaseFactor,
    CSR,
    boundedEaseFactor,
    newInterval,
    ratio,
    realDif,
    dif,
  };
}
