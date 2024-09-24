import { Link } from 'react-router-dom';

function Builder()
{
return(
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Part Name</th>
      <th scope="col">Wattage</th>
      <th scope="col">Price</th>
      <th scope="col">Where to buy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <Link to="./components/Parts/Motherboard.tsx"><th>Motherboard</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/CPU.tsx"><th scope="row">CPU</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">RAM</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">GPU</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">Storage</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">PSU</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">Case</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">OS</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
    <Link to="./components/Parts/Motherboard.tsx"><th scope="row">Network Adapter</th></Link>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
)}
export default Builder