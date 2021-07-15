const $RefreshReg$ = () => {};


onmessage = async (eve) => {
   const status = eve?.data?.status;
   console.log(eve);
   switch (status){
      case "begin":
         StartRequests(eve?.data?.requests, eve?.data?.threadName)
         break;
      default:
         break;
   }
}
const StartRequests = async (requests, threadIndex) => {
   const results = [];
   for (let i=0; i < requests?.length; i++) {
      const headers = {};
      for (let a=0; a < requests[i]?.headers?.length; a++) {
         headers[requests[i].headers[a].key] = requests[i].headers[a].value;
      }
      if (requests[i].method === "GET") {
         const url = !requests[i]?.params || !requests[i]?.length ? requests[i].url : requests[i].url + requests[i]?.params;
         const request = fetch(url, {
            headers: headers,
            method: requests[i].method
         });

         const timeout = new Promise((resolve, reject) => setTimeout(() => {reject("timeout")}, 1500))
         results.push(Promise.race([request, timeout]));
      }
      else {

      }
   }
   const processed = await ProcessResults(results)
   const response = {msg:"results", thread: threadIndex, results: [...processed]};
   postMessage(response);
}

const ProcessResults = async (results) => {
   const processed = [];
   const responses = await Promise.all(results);
   responses.map(item => processed.push(item?.json() ?? item))
   return await Promise.all(processed);
}





