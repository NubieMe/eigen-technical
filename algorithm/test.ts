// No 1
function reverseAlphabet(str: string): string {
    let result: string[] = [];
    str.split("").forEach((val) => (!!Number(val) ? result.push(val) : result.unshift(val)));

    return result.join("");
}

console.log("hasil nomor 1:", reverseAlphabet("NEGIE1"));

// No 2
function longest(sentence: string): string {
    let result = "";
    sentence.split(" ").forEach((val) => (val.length > result.length ? (result = val) : null));

    return result;
}

console.log("hasil nomor 2:", longest("Saya sangat senang mengerjakan soal algoritma"));

// No 3
function valueCounter(input: string[], query: string[]): number[] {
    let result: number[] = [];

    for (let i = 0; i < query.length; i++) {
        let count = 0;

        for (let j = 0; j < input.length; j++) {
            if (query[i] === input[j]) {
                count++;
            }
        }

        result.push(count);
        count = 0;
    }
    return result;
}

console.log("hasil nomor 3:", valueCounter(["xc", "dz", "bbb", "dz"], ["bbb", "ac", "dz"]));

// No 4
function matrixResult(matr: number[][]): number {
    let temp1 = 0;
    let temp2 = 0;

    for (let i = 0; i < matr.length; i++) {
        for (let j = 0; j < matr[i].length; j++) {
            if (i === 1 && j === 1) {
                temp1 += matr[i][j];
                temp2 += matr[i][j];
            } else if (i === j) {
                temp1 += matr[i][j];
            } else if ((i === 0 && j === 2) || (i === 2 && j === 0)) {
                temp2 += matr[i][j];
            }
        }
    }
    return temp1 - temp2;
}

console.log(
    "hasil nomor 4:",
    matrixResult([
        [1, 2, 0],
        [4, 5, 6],
        [7, 8, 9],
    ])
);
