const zip = (a, b) => {
  const result = [];
  for (let i=0; i < a.length; i++) {
    result.push(a[i] + b[i]);
  }
  return result;
}

const unzip = (a, n) => {
  const result = ([], []);
  for (row of a) {
    result[0] += row.slice(0, n);
    result[1] += row.slice(n);
  }
  return result;
}

const reduceMatrix = (a) => {
  let headhead = a[0][0];
  for (let j=0; j < a.length; j++) {
    let factor = -1 * a[j][0] / headhead;
    for (let i=0; i < a[j].length; i++) {
      a[j][i] += factor * a[0][i];
    }
  }
}

const identity = (n) => {
  let I = [];
  for (let i=0; i<n; i++) {
    I.push([...Array(n).keys()]);
  }
}

const augment = (a) => {
  let n = a.length;
  return zip(a, identity(n));
}

const invert = (a) => {
  return unzip(
    reduceMatrix(augment(a)), 
    3
  );
}