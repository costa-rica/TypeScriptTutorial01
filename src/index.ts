console.log("Hello TypeScript Tutorial 01");

// Exercise Chapt 4 Arrays (56:58)
export function averageScore(ratings: number[]) {
const numerator = ratings.reduce((rating, sum)=>{
    return rating + sum;
})

return numerator / ratings.length;
  }

  const result = averageScore([1, 2, 3, 4, 5]);
  console.log(result);