const cities = ["Tangerang", "Jakarta Pusat", "Bandung", "Semarang", "Yogyakarta", "Surabaya"]
const cat = [
    ["WideArea", "GreenSpace", "ActivityCenter", "PublicTransportation"], 
    ["Population", "LivingCost", "Disasters", "SurfaceHeight"]
]
const n_benefit = cat[0].length
const n_cost = cat[1].length
const n_cat = n_benefit + n_cost

const values = [
    [17730,18,6,7,1566190,4698564,4,20],
    [4790,487,9,10,1114581,7500726,2,7],
    [16730,876,7,8,2339463,5630382,3,768],
    [39457,1331,5,6,1621384,3329461,2,170],
    [3250,1800,7,5,407617,4803345,1,265],
    [35054,2179,7,7,2805906,6059488,2,6]
]

const generateR = (values) => {
    // Find max or min
    maxmin = []
    for (let i = 0; i < n_cat; i++) {
        if(i < n_benefit){
            max = values[0][i]
            for (let j = 0; j < cities.length; j++) {
                if (max < values[j][i]){
                    max = values[j][i]
                }
            }
            maxmin.push(max)
        } else {
            min = values[0][i]
            for (let j = 0; j < cities.length; j++) {
                if (min > values[j][i]){
                    min = values[j][i]
                }
            }
            maxmin.push(min)
        }
    }
    // Normalisasi  
    new_R = []
    for (let i = 0; i < cities.length; i++) {
        new_row = []
        for (let j = 0; j < n_cat; j++) {
            if (j < n_benefit){
                new_row.push(values[i][j] / maxmin[j])
            } else {
                new_row.push(maxmin[j] / values[i][j])
            }
        }
        new_R.push(new_row)
    }
    return new_R
}

R = generateR(values)
console.log("R : ",R)

let input = [0,0,0,0,0,0,0,0]
let result = []
let resultPrint = []

const inputForm = document.querySelector('#inputForm');
const resultContainer = document.querySelector('#result');

inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const userWideArea = inputForm.elements.WideArea
    const userGreenSpace = inputForm.elements.GreenSpace
    const userActivityCenter = inputForm.elements.ActivityCenter
    const userPublicTransportation = inputForm.elements.PublicTransportation
    const userPopulation = inputForm.elements.Population
    const userLivingCost = inputForm.elements.LivingCost
    const userDisasters = inputForm.elements.Disasters
    const userSurfaceHeight = inputForm.elements.SurfaceHeight
    input = [parseInt(userWideArea.value), parseInt(userGreenSpace.value), parseInt(userActivityCenter.value), parseInt(userPublicTransportation.value), parseInt(userPopulation.value), parseInt(userLivingCost.value), parseInt(userDisasters.value), parseInt(userSurfaceHeight.value)]
    
    updateResult(input)

});

const updateResult = (input) => {
    // Reset result
    resultContainer.innerHTML = ''

    // Generate Weight
    let weight = input
    weight = updateWeight(weight)
    console.log("Weight : ",weight)

    // Generate Result
    printResult = getResult(weight)
    for (let i = 0; i < printResult.length; i++) {
        const cityResult = document.createElement('li');
        cityResult.classList.add('list-group-item')
        const cityName = document.createElement('b');
        cityName.append(printResult[i][1])
        cityResult.append(cityName)
        cityResult.append(` = ${printResult[i][0]}`)
        resultContainer.append(cityResult);
    }
}

const updateWeight = (weight) => {
    sum = 0
    for (let i = 0; i < weight.length; i++) {
        sum += weight[i]
    }
    console.log(sum)
    new_weight = []
    for (let i = 0; i < weight.length; i++) {
        new_weight.push(weight[i]/sum)
    }
    return new_weight
}

const getResult = (weight) => {
    result = []
    indexResult = []

    for (let i = 0; i < cities.length; i++) {
        score = 0
        for (let j = 0; j < n_cat; j++) {
            score = score + weight[j]*R[i][j]
        }
        result.push(score)
    }

    // Ranking
    pairResult = []
    for (let i = 0; i < result.length; i++) {
        pairResult.push([result[i],cities[i]])
    }
    pairResult = pairResult.sort()
    pairResult = pairResult.reverse()
    console.log("Result",pairResult)
    return pairResult
}