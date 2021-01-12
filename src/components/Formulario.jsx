import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios';

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'



const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    //State listado criptomonedas
    const [ listaCripto, guardarListaCripto ] = useState([]);
    //Satate error validacion
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: "USD", nombre: "Dolar de Estados Unidos"},
        { codigo: "MXN", nombre: "Peso Mexicano"},
        { codigo: "EUR", nombre: "Euro"},
        { codigo: "GBP", nombre: "Libra Esterlina"}
    ]

    //Utilizar nuestro hook de monedas
    const [ moneda, SelectMonedas ] = useMoneda("Elige tu moneda", "", MONEDAS);
    //Utilizar nuestro hook de criptomonedas
    const [ criptomoneda, SelectCripto ] = useCriptomoneda("Elige tu criptomoneda", "", listaCripto);

    //Ejecutar llamado API criptomonedas al cargar la web
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const resultado = await axios.get(url);

            guardarListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    const cotizarMoneda = e => {
        e.preventDefault();

        //validar
        if(moneda === "" ||criptomoneda === ""){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Pasar datos a componente principal
        
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            <SelectMonedas />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;