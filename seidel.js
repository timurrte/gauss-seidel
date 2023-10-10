function gaussSeidel(a, b, x0, maxIterations, tolerance) {
    if (!isDiagonallyDominant(a)) {
        console.log("Матриця A не є діагонально домінантною")
        permuteForDiagonalDominance(a, b)
    }
    const n = a.length;
    let x = x0.slice();
  
    for (let iteration = 0; iteration < maxIterations; iteration++) {
      let maxDiff = 0;
  
      for (let i = 0; i < n; i++) {
        let sum1 = 0;
        let sum2 = 0;
  
        for (let j = 0; j < i; j++) {
          sum1 += a[i][j] * x[j];
        }
  
        for (let j = i + 1; j < n; j++) {
          sum2 += a[i][j] * x[j];
        }
  
        const newX = (b[i] - sum1 - sum2) / a[i][i];
        maxDiff = Math.max(maxDiff, Math.abs(newX - x[i]));
        x[i] = newX;
      }
  
      if (maxDiff < tolerance) {
        console.log(`Converged after ${iteration + 1} iterations`);
        return x;
      }
    }
  
    console.log('Did not converge');
    return x;
  }
  


function isDiagonallyDominant(matrix) {
    const n = matrix.length;
  
    for (let i = 0; i < n; i++) {
      let diagonalElement = Math.abs(matrix[i][i]);
      let sumOfRow = 0;
  
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sumOfRow += Math.abs(matrix[i][j]);
        }
      }
  
      if (diagonalElement <= sumOfRow) {
        return false;
      }
    }
  
    return true;
  }
  
function permuteForDiagonalDominance(A, b) {
    const n = A.length;
    
    for (let i = 0; i < n; i++) {
      let maxRowIndex = i;
      let maxAbsValue = Math.abs(A[i][i]);
  
      // Find the row with the maximum absolute value for the current column
      for (let j = i + 1; j < n; j++) {
        const absValue = Math.abs(A[j][i]);
        if (absValue > maxAbsValue) {
          maxAbsValue = absValue;
          maxRowIndex = j;
        }
      }
  
      // Swap rows i and maxRowIndex in matrix A
      if (maxRowIndex !== i) {
        [A[i], A[maxRowIndex]] = [A[maxRowIndex], A[i]];
        [b[i], b[maxRowIndex]] = [b[maxRowIndex], b[i]];
      }
    }
  
    return { A, b };
  }


let A = [  
    [0.065, 0.052, 0.750, 0.600],
    [0.030, 0.367, 0.087, 0.325],
    [1.350, 0.433, 0.093, 0.256],
    [0.037, 0.700, 0.100, 0.325]
  ];

let b = [6.383, 4.205, 21.603, 6.522];
console.log(isDiagonallyDominant(A))
console.log(gaussSeidel(A, b, [0,0,0,0], 100, 0.0001))
