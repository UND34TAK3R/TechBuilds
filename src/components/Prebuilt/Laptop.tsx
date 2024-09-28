import Header from "../Layout/Header";
function Laptop(){
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
                    <th scope="col">Display</th>
                    <th scope="col">Battery life</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </>
    )
}

export default Laptop;
