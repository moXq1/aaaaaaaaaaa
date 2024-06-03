function getDigit(num,pos){
    return Math.floor(Math.abs(num) / Math.pow(10,pos)) % 10
}

function getNumOfDigits(number){
     if (number === 0) return 1
  return Math.floor(Math.log10(Math.abs(number))) + 1
}

function mostDigits(nums) {
  let maxDigits = 0
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, getNumOfDigits(nums[i]))
  }
  return maxDigits
}


function radixSort(arr){
    
const max = mostDigits(arr)

for(let i = 0;i<max;i++){
    const bucket = Array.from({ length: 10 }, () => [])
    console.log(bucket)
    for(let j = 0; j<arr.length;j++){
        const digit = getDigit(arr[j],i)
        bucket[digit].push(arr[j])
    }
    // console.log(bucket)
    arr = [].concat(...bucket)
}
return arr
}

console.log(radixSort([1, 33, 444, 0, 3, 2])) 