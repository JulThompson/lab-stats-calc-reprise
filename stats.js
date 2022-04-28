"use strict";
function readAllNumbers() {
    let textArea = document.querySelector("textarea");
    let lines = textArea.value.split("\n");
    let numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === "")
            continue;
        let nums = lines[i].split(" ");
        for (let n = 0; n < nums.length; n++) {
            if (nums[n] === "")
                continue;
            if (isNaN(Number(nums[n])))
                continue;
            numbers.push(Number(nums[n]));
        }
    }
    return numbers;
}
function getMean(nums) {
    let sum = 0;
    for (const n of nums) {
        sum += n;
    }
    return sum / nums.length;
}
function getAboveBelowMean(nums) {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums) {
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    if (nums.length % 2 === 1) {
        let index = (nums.length - 1) / 2;
        return nums[index];
    }
    else {
        let upperIndex = nums.length / 2;
        let lowerIndex = upperIndex - 1;
        return (nums[upperIndex] + nums[lowerIndex]) / 2;
    }
}
function getMinMax(nums) {
    let min = nums[0];
    let max = nums[nums.length - 1];
    return [min, max];
}
function getStdDev(nums) {
    let mean = getMean(nums);
    let distance = [];
    for (let num of nums) {
        distance.push((mean - num) ** 2);
    }
    let meanDist = getMean(distance);
    return meanDist ** 0.5;
}
let basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = `${getMean(numbers)}`;
    document.querySelector("#aboveBelow").textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    document.querySelector("#median").textContent = `${getMedian(numbers)}`;
    document.querySelector("#minMax").textContent = `${getMinMax(numbers).join(" & ")}`;
    document.querySelector("#stdDev").textContent = `${getStdDev(numbers)}`;
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    let largest = nums[nums.length - 1];
    while (true) {
        let lcm = true;
        for (let i = 0; i < nums.length; i++) {
            if (largest % nums[i] !== 0)
                lcm = false;
        }
        if (lcm === true) {
            return largest;
        }
        else {
            largest += 1;
        }
    }
}
function getAllCommonFactors(nums) {
    let commonFactors = [];
    let smallest = nums[0];
    while (smallest > 1) {
        let cf = true;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] % smallest !== 0)
                cf = false;
        }
        if (cf === true)
            commonFactors.push(smallest);
        smallest -= 1;
    }
    return commonFactors;
}
let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = `${getLeastCommonMultiple(numbers)}`;
    document.querySelector("#factors").textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
