// Graficos.jsx
import { Chart } from "react-google-charts";
import React from "react";

const generateRandomFaturamento = () => {
    return Math.floor(Math.random() * 1000) + 500;
};

const produtos = ["Shampoo", "Coleira", "Cama", "Brinquedos"];

const data = [
    ["Produto", "Faturamento"],
    ...produtos.map((produto) => [produto, generateRandomFaturamento()]),
];

const options = {
    title: "Faturamento por Produto",
    pieHole: 0.4,
    chartArea: { width: "80%", height: "80%" },
};

const Graficos = () => {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
};

export default Graficos;
