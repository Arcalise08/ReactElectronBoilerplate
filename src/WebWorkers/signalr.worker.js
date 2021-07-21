// eslint-disable-next-line import/no-webpack-loader-syntax
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

const $RefreshReg$ = () => {};

let triggers, messages, connection;


onmessage = async (eve) => {
    const status = eve?.data?.status;
    switch (status){
        case "begin":
            triggers = eve?.data?.triggers;
            messages = eve?.data?.messages;

            connect(eve?.data?.url);
            break;
        default:
            break;
    }
}

const connect = (url) => {
     connection = new HubConnectionBuilder()
        .withUrl(url)
        .configureLogging(LogLevel.None)
        .build();
    try {
        runBasicTriggers();
    }
    catch {
    }
}

const runBasicTriggers = async () => {
    if (!connection){
        console.log("trigger execution blocked");
        return;
    }

    for (let i=0; i < triggers?.length; i++) {
        connection.on(triggers[i], onReply);
    }
    await connection.start();
    runMessages();
}

const onReply = (msg) => {
    postMessage({status: "message", client: false, time: new Date(Date.now()), message: msg, name:"Other" })
}

const runMessages = async () => {
    for (let i=0; i < messages?.length; i++) {
        const constructMessage = {
            client: true,
            time: new Date(Date.now()),
            message: messages[i],
            name:"You",
            success: true,
            status: "message"
        }
        await connection.send(messages[i]);
        postMessage(constructMessage);
    }
    setTimeout(() => {

            for (let i=0; i < triggers?.length; i++) {
                connection.off(triggers[i], onReply);
            }

        postMessage({status: "end"})
    }, 100 * messages?.length)

}

