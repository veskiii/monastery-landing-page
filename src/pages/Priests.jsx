import { useState, useEffect } from "react";
import { apiUrl } from "../App";
import Priest from "./Priest";

function Priests() {
  const [priests, setPriests] = useState([]);

  useEffect(() => {
    getPriests();
  }, []);

  const getPriests = () => {
    fetch(apiUrl + "/kaplani", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => setPriests(data));
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
            Nasi Kapłani
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {priests.map((priest, i) => (
            <Priest
              {...{
                priestName: priest.kaplan_name,
                priestFunction: priest.funkcja,
                quote: priest.kaplan_cytat,
                pictureUrl: priest.kaplan_zdjecie_sciezka,
              }}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Priests;
