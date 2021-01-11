const fs = require('fs')
const readline = require('readline')


async function processLineByLine() {
    const fileStream = fs.createReadStream('./data.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
  
    const arr = []
    let num 

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
    //   console.log(`Line from file: ${line}`);
      num = parseInt(line)
      arr.push(num)
    }

    for(let i = 0; i< arr.length; i++) {
        for(let j =i+1; j<arr.length; j++) {
            for(let k=j+1; k<arr.length; k++) {
                if(arr[i]+arr[j] + arr[k] === 2020) {
                    console.log(arr[i], arr[j], arr[k])
                    console.log(arr[i]*arr[j]*arr[k])
                }
            }
        }
    }

    // console.log(arr)
  }
  
  processLineByLine();