import React, { useState } from "react";

import "./form.css";

const labels = [
  "CEP",
  "Logradouro",
  "Complemento",
  "Bairro",
  "Localidade",
  "UF",
  "IBGE",
  "GIA",
  "DDD",
  "SIAFI",
];

function randomID() {
  return Math.random() * 100 + 17;
}

function Form(params) {
  const [cepInfo, setCepInfo] = useState();
  const [inputInfo, setInputInfo] = useState("");
  const [bError, setbError] = useState(false);

  const findCep = (cepCode) => {
    fetch(`https://viacep.com.br/ws/${cepCode}/json/`)
      .then((Response) => Response.json())
      .then((data) => {
        setCepInfo(data);
        setbError(false);
      })
      .catch((err) => {
        console.log(err);
        setbError(true);
      });
  };

  const handleSendRequest = (event) => {
    event.preventDefault();
    findCep(inputInfo.replace("-", ""));
  };

  const formatResponse = (json) => {
    let jsonArray = [];
    for (var i in json) {
      if (json[i] === "true") setbError(true);
      jsonArray.push(json[i]);
    }
    return jsonArray;
  };

  return (
    <form className={cepInfo ? "main-form" : "main-form-a"}>
      <div className="main-input">
        <label>ezCEP</label>
        <input
          type="search"
          placeholder="76410-000"
          id="search"
          onChange={(e) => setInputInfo(e.target.value)}
        ></input>
        <button onClick={handleSendRequest}>Verificar</button>
      </div>
      {bError ? (
        <span className="error">CEP Inválido.</span>
      ) : (
        cepInfo && (
          <div className="main-resp">
            <ul className="labels">
              {labels.map((item) => {
                return <li key={randomID()}>{item}</li>;
              })}
            </ul>
            <ul className="response">
              {formatResponse(cepInfo).map((item) => {
                return <li key={randomID()}>{item}</li>;
              })}
            </ul>
          </div>
        )
      )}
    </form>
  );
}

export default Form;
