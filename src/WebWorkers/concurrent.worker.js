// eslint-disable-next-line import/no-webpack-loader-syntax
import TimerWorker from 'worker-loader!./timer.js';
const $RefreshReg$ = () => {};

let timer = null;
let time = 0;

onmessage = async (eve) => {
   const status = eve?.data?.status;
   switch (status){
      case "begin":
         StartRequests(eve?.data?.requests, eve?.data?.threadName)
         break;
      default:
         break;
   }
}
const listener = (msg) => {
   //time = msg?.data;
}

const StartRequests = async (requests, threadIndex) => {
   const results = [];
   timer = setInterval(() => time++, 10)

   //timer.addEventListener("message", listener)
   //timer.postMessage("begin");

   if (!requests || !requests?.length) {
      const response = {msg:"results", thread: threadIndex, results: []};
      postMessage(response);
      return;
   }
   for (let i=0; i < requests?.length; i++) {
      const headers = {};
      for (let a=0; a < requests[i]?.headers?.length; a++) {
         headers[requests[i].headers[a].key] = requests[i].headers[a].value;
      }
      let url = requests[i].url + requests[i].endPoint;
      let body = null;
      if (requests[i].method === "GET")
         url += requests[i]?.params ?? "";
      else
         body = requests[i].body;

      const response = await AttemptRequest(timer, url, headers, requests[i].method, body);
      const toResults = {...response, request: requests[i]}
      results.push(toResults);
   }

   const response = {msg:"results", thread: threadIndex, results: [...results], totalTime: time};
   clearInterval(timer);
   postMessage(response);
}

const AttemptRequest = async (timer, url, headers, method, body) => {
   let startTime = parseInt(`${time}`);
   const init = {
      headers: headers,
      method: method,
   }
   if (body !== null && method !== "GET")
      init.body = body;
   const request = await fetch(url, init);
   let endTime = parseInt(`${time}`);
   return {success: request?.ok, url:request?.url, status: request?.status, completedIn: endTime - startTime }
}





