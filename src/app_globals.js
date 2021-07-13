import WebRequest from "./pages/webRequest";
import Results from "./pages/results";
import SignalR from './pages/signalRview'
import SignalRIcon from '../src/assets/signalR.png';
import WebRequestIcon from '../src/assets/webRequest.png';
import ResultsIcon from '../src/assets/results.png'

export const PAGES = [
    {name:"signalR", component: SignalR, friendlyName:"SignalR", navIcon: SignalRIcon},
    {name:"requests", component: WebRequest, friendlyName:"Web Requests", navIcon: WebRequestIcon},
    {name: "results", component: Results, friendlyName: "Results", navIcon:ResultsIcon}
]

export const Colors = {
    mainBackgroundColor: "white",
    secondaryBackgroundColor:"black",
    buttonColor:"rgba(26, 131, 223, 0.47)",
    navItemColor:"rgba(26, 131, 223, 0.47)",
    navHoverColor:"rgba(26, 131, 223, 0.47)"
}
