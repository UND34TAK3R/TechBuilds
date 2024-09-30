import { useState, useEffect } from 'react';

interface Item {
    psu_id: number
    name: string
    form_factor: string
    efficiency_rating: string
    wattage: string
    modularity: string
    price: string
}
function PSU(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/PSU')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    })
    return(
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Form Factor</th>
                        <th scope="col">Efficency Rating</th>
                        <th scope="col">Wattage</th>
                        <th scope="col">Modularity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: Item) => (
                        <tr key={item.psu_id}>
                            <td>{item.name}</td>
                            <td>{item.form_factor}</td>
                            <td>{item.efficiency_rating}</td>
                            <td>{item.wattage}</td>
                            <td>{item.modularity}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default PSU;