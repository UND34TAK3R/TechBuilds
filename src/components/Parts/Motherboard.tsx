import { useEffect, useState } from "react";

interface Item {
    mb_id: number;
    model: string;
    socket: string;
    form_factor: string;
    ram_slots: string;
    price: string;
}

function Motherboard(){
    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        fetch('http://localhost:5500/MB')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return(
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Model</th>
                        <th scope="col">Form Factor</th>
                        <th scope="col">Socket</th>
                        <th scope="col">Ram Slots</th>
                        <th scope="col">Price</th>
                        <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item: Item) => (
                        <tr key={item.mb_id}>
                            <td>{item.model}</td>
                            <td>{item.form_factor}</td>
                            <td>{item.socket}</td>
                            <td>{item.ram_slots}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

export default Motherboard;