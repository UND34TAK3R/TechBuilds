import { Link } from 'react-router-dom';
import '../css/Builder.scss';
function Builder()
{
return(
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Part Name</th>
      <th scope="col" colSpan={2}>Description</th>
      <th scope="col">Wattage</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope= "row"><Link to="./components/Parts/Motherboard.tsx">Motherboard</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/Motherboard.tsx"><button className="btn btn-outline-dark">Add Motherboard</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/CPU.tsx">CPU</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/CPU.tsx"><button className="btn btn-outline-dark">Add CPU</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/CPU_Cooler.tsx">CPU Cooler</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/CPU_Cooler.tsx"><button className="btn btn-outline-dark">Add CPU Cooler</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/RAM.tsx">RAM</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
     <td> <Link to=".components/Parts/RAM.tsx"><button className="btn btn-outline-dark">Add RAM</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/GPU.tsx">GPU</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/GPU.tsx"><button className="btn btn-outline-dark">Add GPU</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/Storage.tsx">Storage</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/Storage.tsx"><button className="btn btn-outline-dark">Add Storage</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/PSU.tsx">PSU</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/PowerSupply.tsx"><button className="btn btn-outline-dark">Add PSU</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/Case.tsx">Case</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/Case.tsx"><button className="btn btn-outline-dark">Add Case</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/OS.tsx">OS</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/OS.tsx"><button className="btn btn-outline-dark">Add OS</button></Link></td>
    </tr>
    <tr>
    <th scope="row"><Link to="./components/Parts/NetAdapter.tsx"> Network Adapter</Link></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><Link to=".components/Parts/NetAdapter.tsx"><button className="btn btn-outline-dark">Add Network Adapter</button></Link></td>
    </tr>
  </tbody>
</table>
)}
export default Builder