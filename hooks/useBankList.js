import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import addApiKey from '../config/headerAdd';


const useBankList = () => {

    const [bankList, setBankList] = useState(null);

    useEffect(() => {
        const getBankList = async () => {
            try {
                addApiKey();
                // const resultado = await clienteAxios.get('/institutions');
                const resultado = await clienteAxios.get('/institutions/basiqinstitutionsapp');
                setBankList(resultado.data.institutions.data);
            } catch (error) {
                console.log(error)
            }
        }
        getBankList();
    }, [])

    return {
        bankList
    };
}

export default useBankList;