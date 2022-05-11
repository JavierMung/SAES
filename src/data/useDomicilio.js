import { useEffect, useState } from "react";

const useDomiiclio = (codigoPostal) => {
   
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(`https://api.copomex.com/query/info_cp/${ encodeURI(codigoPostal)}?token=pruebas`)
        .then(res=>res.json())
        .then(dat=>setData(dat))

    },[codigoPostal])


    

    return (data);
}
 
export default useDomiiclio;