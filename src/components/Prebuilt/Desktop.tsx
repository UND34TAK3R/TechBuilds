import Header from '../Layout/Header';

function Desktop(){
    return(
        <>
        < Header />
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Model</th>
                    <th scope="col">CPU</th>
                    <th scope="col">GPU</th>
                    <th scope="col">RAM</th>
                    <th scope="col">Storage</th>
                    <th scope="col">PSU</th>
                    <th scope="col">Cooling</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    )
}

export default Desktop;