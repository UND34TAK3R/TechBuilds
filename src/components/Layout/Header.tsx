import {useLocation} from 'react-router-dom'

function Header(){
const location = useLocation();
const isBuilderPage = location.pathname === '/Builder';
const isPreBuiltPage = location.pathname === '/PreBuilt';
const isPartsPage = location.pathname === '/Parts';
const isBenchmarkPage = location.pathname === '/Benchmark';
const isContactPage = location.pathname === '/Contact';
let text;

    if(isBuilderPage)
    {
        text = 'Builder';
    } 
    else if (isPreBuiltPage) 
    {
        text = 'Pre-Built';
    } 
    else if (isPartsPage) 
    {
        text = 'Parts';
    } 
    else if (isBenchmarkPage) 
    {
        text = 'Benchmark';
    } 
    else if (isContactPage) 
    {
        text = 'Contact';
    }
    return(  
    <h2 className="h2">{text}</h2>
)}
export default Header