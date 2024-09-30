import { useEffect, useState } from "react";

interface Item {
    case_id: number;
    name: string;
    form_factor: string;
    color: string;
    material: string;
    volume: string;
    fan_count: string;
    price: string;
}

function Case(){
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch('http://localhost:5500/Case')
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
                    <th scope="col">Name</th>
                    <th scope="col">Form Factor</th>
                    <th scope="col">Color</th>
                    <th scope="col">Material</th>
                    <th scope="col">Volume</th>
                    <th scope="col">Fan Count</th>
                    <th scope="col">Price</th>
                    <th scope="col">Selection</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item: Item) => (
                        <tr key={item.case_id}>
                            <td>{item.name}</td>
                            <td>{item.form_factor}</td>
                            <td>{item.color}</td>
                            <td>{item.material}</td>
                            <td>{item.volume}</td>
                            <td>{item.fan_count}</td>
                            <td>{item.price}</td>
                            <td><button>Add To Build</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Case;