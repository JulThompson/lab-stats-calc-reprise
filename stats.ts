function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let nums : string[] = lines[i].split(" ");
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

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    if (nums.length % 2 === 1) {
        let index : number = (nums.length - 1) / 2;
        return nums[index];
    } else {
        let upperIndex : number = nums.length / 2;
        let lowerIndex : number = upperIndex - 1;
        return (nums[upperIndex] + nums[lowerIndex]) / 2;
    }
}

function getMinMax(nums : number[]) : [number, number] {
    let min : number = nums[0]
    let max : number = nums[nums.length - 1];
    return [min, max];
}

function getStdDev(nums : number[]) : number {
    let mean : number = getMean(nums);
    let distance : number[] = [];
    for (let num of nums) {
        distance.push((mean-num) ** 2);
    }
    let meanDist = getMean(distance);
    return meanDist ** 0.5;
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let largest : number = nums[nums.length-1];
    while (true) {
        let lcm : boolean = true;
        for (let i = 0; i < nums.length; i++) {
            if (largest % nums[i] !== 0) 
                lcm = false;
        }
        if (lcm === true) {
            return largest
        } else {
            largest += 1;
        }
    }
}

function getAllCommonFactors(nums : number[]) : number[] {
    let commonFactors : number[] = [];
    let smallest : number = nums[0];
    while (smallest > 1) {
        let cf : boolean = true;
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

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
