console.log("Hello TypeScript Tutorial 01");

// // Exercise Chapt 4 Arrays (56:58)
// export function averageScore(ratings: number[]) {
// const numerator = ratings.reduce((rating, sum)=>{
//     return rating + sum;
// })

// return numerator / ratings.length;
//   }

//   const result = averageScore([1, 2, 3, 4, 5]);
//   console.log(result);


// // Exercise Chapt 4 Heterogeneous Arrays (59:38)
// export function interpolateComment(
//     id: number,
//     comment: string,
//     comments: (string | number)[],
//   ) {
//     // ?
//   }
  

// // Exercise Chapt 4: Rest Parameters (1:02:14)
// // This allows for an undefined number of parameters
// function gatherParty(partyName: string, ...adventurers: string[]): string {
//     return `${partyName} consists of: ${adventurers.join(", ")}`;
//   }
  
//   const msg = gatherParty("The Fellowship", "Frodo", "Sam", "Gandalf", "Nick");
//   console.log(msg);

// Exercise Chapt 4: Evolving Any (1:03:53)
export function collectSupportData(id: number, resolved: boolean) {
    const supportData = [];
    supportData.push(id);
    supportData.push(resolved);
    return supportData;
  }
  

  