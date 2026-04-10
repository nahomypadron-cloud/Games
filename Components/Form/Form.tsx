import { useState, useEffect } from "react";
import "./Form.css";

export default function Form() {

  const [usd, setUsd] = useState("");
  const [eur, setEur] = useState("");
  const [mxn, setMxn] = useState("");
  const [gbp, setGbp] = useState("");

  useEffect(() => {
    if (usd === "") return;

    const convertir = async () => {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${usd}&from=USD&to=EUR,MXN,GBP`
      );

      const data = await res.json();

      setEur(data.rates.EUR);
      setMxn(data.rates.MXN);
      setGbp(data.rates.GBP);
    };

    convertir();
  }, [usd]); // se ejecuta cuando cambia USD

  return (
    <div className="container">
      <div className="formulario">

        <h1>Convertidor de Moneda</h1>

        <label>Precio en USD</label>
        <input
          className="input"
          value={usd}
          onChange={(e) => setUsd(e.target.value)}
          placeholder="Ingrese USD"
        />

        <label>EUR</label>
        <input className="input" value={eur} readOnly />

        <label>MXN</label>
        <input className="input" value={mxn} readOnly />

        <label>GBP</label>
        <input className="input" value={gbp} readOnly />

        <p>Tipo de cambio en tiempo real</p>

      </div>
    </div>
  );
}