
let interval = 0;
let timer = null;

onmessage = async (eve) => {
    const status = eve?.data;
    switch (status){
        case "begin":
            timer = setInterval(() => {
                interval++
            }, 100)

            break;
        case "time":
            postMessage(interval);
            break;
        case "reset":
            interval = 0;
            break;
        case "end":
            clearInterval(timer);
            break;
    }
}
