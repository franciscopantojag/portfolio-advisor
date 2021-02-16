const highFunction = (portfolio, riskLevelLabelMapper) => {
  const newAmmounts = [];
  for (let key in portfolio) {
    newAmmounts.push(Number(portfolio[key].new));
  }

  const differences = [];
  for (let key in portfolio) {
    differences.push(Number(portfolio[key].difference));
  }

  const inputs = [];
  for (let key in portfolio) {
    inputs.push(Number(portfolio[key].old));
  }

  const labels = [];
  for (let key in portfolio) {
    labels.push(riskLevelLabelMapper[key]);
  }

  const globalArr = [];
  function recordTransfers(differences) {
    let counter =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const recordedTransfers =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let newDifferences = differences.slice(0);

    const sortedDiff = differences.sort((a, b) => a - b);

    let transferMade = false;
    let smallestFittingDeficit = null;

    sortedDiff
      .slice(0)
      .reverse()
      .forEach(function (surplus) {
        if (!transferMade && surplus > 0) {
          sortedDiff.forEach((deficit) => {
            if (surplus + deficit <= 0) {
              smallestFittingDeficit = deficit;
            }
          });

          if (smallestFittingDeficit) {
            let surplusIdx = newDifferences.indexOf(surplus);
            let deficitIdx = newDifferences.indexOf(smallestFittingDeficit);
            newDifferences[surplusIdx] = 0;
            newDifferences[deficitIdx] = surplus + smallestFittingDeficit;
            let transferAmount = Math.round(100 * surplus) / 100;

            let transferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}`;
            globalArr.push(transferString);
            recordedTransfers.push({
              from: deficitIdx,
              to: surplusIdx,
              amount: transferAmount,
            });
            transferMade = true;
          }
        }
      });

    if (!transferMade) {
      sortedDiff.forEach(function (smallestSurplus) {
        if (smallestSurplus > 0) {
          sortedDiff
            .slice(0)
            .reverse()
            .forEach(function (smallestDeficit) {
              if (!transferMade && smallestDeficit < 0) {
                let surplusIdx = newDifferences.indexOf(smallestSurplus);
                let deficitIdx = newDifferences.indexOf(smallestDeficit);
                newDifferences[surplusIdx] = smallestSurplus + smallestDeficit;
                newDifferences[deficitIdx] = 0;
                const transferAmount =
                  Math.round(
                    100 *
                      (smallestSurplus - (smallestSurplus + smallestDeficit))
                  ) / 100;
                const transferString = `Transfer $${transferAmount} from ${labels[deficitIdx]} to ${labels[surplusIdx]}`;
                globalArr.push(transferString);
                recordedTransfers.push({
                  from: deficitIdx,
                  to: surplusIdx,
                  amount: transferAmount,
                });
                transferMade = true;
              }
            });
        }
      });
    }

    newDifferences = newDifferences.map(function (el) {
      return Math.round(100 * el) / 100;
    });

    const numOfZeroDifferences = newDifferences.filter(function (x) {
      return x === 0;
    }).length;

    if (numOfZeroDifferences < 4 && counter < 7) {
      recordTransfers(newDifferences, counter + 1, recordedTransfers);
    } else if (numOfZeroDifferences === 4) {
      const amount = newDifferences.find(function (el) {
        return el !== 0;
      });
      const surplusIdx = newDifferences.indexOf(amount);

      const largestAmount = Math.max(...newAmmounts);

      let deficitIdx = void 0;
      newAmmounts.forEach(function (el, idx) {
        if (parseFloat(el) === largestAmount) {
          deficitIdx = idx;
        }
      });

      newAmmounts[deficitIdx] =
        Math.round(100 * (largestAmount - amount)) / 100;

      const newDif =
        largestAmount -
        amount -
        Math.round(
          100 *
            parseFloat(inputs[deficitIdx].toString().replace(/[^0-9.]+/g, ""))
        ) /
          100;

      differences[deficitIdx] = Math.round(100 * newDif) / 100;

      let priorStringModified = false;
      recordedTransfers.forEach(function (transfer, idx) {
        if (transfer["from"] === surplusIdx && transfer["to"] === deficitIdx) {
          const newAmount =
            Math.round(100 * (Math.abs(amount) + transfer["amount"])) / 100;
          const newString = `Transfer $${newAmount} from ${labels[surplusIdx]} to ${labels[deficitIdx]}`;
          globalArr.push(newString);
          priorStringModified = true;
        }
      });

      if (!priorStringModified) {
        const transferString = `Transfer $${Math.abs(amount)} from ${
          labels[surplusIdx]
        } to ${labels[deficitIdx]}`;
        globalArr.push(transferString);
      }
    }
  }
  recordTransfers(differences);
  return globalArr;
};
export default highFunction;
