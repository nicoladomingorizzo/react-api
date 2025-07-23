import { useEffect, useState } from "react";

export default function AppMain() {
    const actressUrl = "https://lanciweb.github.io/demo/api/actresses/";
    const actorsUrl = "https://lanciweb.github.io/demo/api/actors/";
    const [actressData, setActressData] = useState([]); // Stato per i dati delle attrici
    const [actorsData, setActorsData] = useState([]); // Stato per i dati degli attori
    const [allActorsList, setAllActorsList] = useState([]); // Stato per tutti gli attori/attrici
    const [actorsFilteredList, setActorsFilteredList] = useState([]); // Stato per la lista filtrata
    const [searchList, setSearchList] = useState(""); // Stato per la selezione tra "Attori" e "Attrici"
    const [searchName, setSearchName] = useState(""); // Stato per il nome da cercare

    useEffect(() => {
        // Recupero dei dati per attrici e attori
        const p1 = fetch(actressUrl)
            .then((res) => res.json())
            .then((data) => {
                setActressData(data); // Salvo i dati delle attrici
                return data;
            });
        const p2 = fetch(actorsUrl)
            .then((res) => res.json())
            .then((data) => {
                setActorsData(data); // Salvo i dati degli attori
                return data;
            });

        // Quando entrambe le promesse sono completate, unisco i dati di attori e attrici in un'unica lista
        Promise.all([p1, p2]).then((values) => {
            setAllActorsList([...values[0], ...values[1]]);
        });
    }, []);

    useEffect(() => {
        // Ogni volta che la selezione cambia (Attrici/Attori), aggiorno la lista filtrata
        if (searchList === "Attrici") {
            setActorsFilteredList(actressData); // Solo le attrici
        } else if (searchList === "Attori") {
            setActorsFilteredList(actorsData); // Solo gli attori
        } else {
            setActorsFilteredList([]); // Reset se nessuna selezione
        }
    }, [searchList, actressData, actorsData]); // Dipende dalla selezione dell'utente

    useEffect(() => {
        // Applicazione del filtro per nome
        if (searchName.trim() !== "") {
            // Se l'utente ha digitato qualcosa nella barra di ricerca, filtro la lista
            const filteredActor = actorsFilteredList.filter((actor) =>
                actor.name.toLowerCase().includes(searchName.toLowerCase())
            );
            setActorsFilteredList(filteredActor); // Imposto la lista filtrata
        } else {
            // Se la barra di ricerca è vuota, resetto la lista filtrata e mostro quella selezionata
            if (searchList === "Attrici") {
                setActorsFilteredList(actressData);
            } else if (searchList === "Attori") {
                setActorsFilteredList(actorsData);
            } else {
                setActorsFilteredList([]); // Reset se nessuna selezione
            }
        }
    }, [searchName, searchList, actressData, actorsData]); // Dipende dalla ricerca, dalla selezione e dai dati

    return (
        <>
            {/* Selettore per scegliere tra "Attori" e "Attrici" */}
            <select
                className="form-select container my-4 ms-auto py-3 px-4"
                aria-label="Default select example"
                onChange={(e) => setSearchList(e.target.value)} // Imposta la selezione
            >
                <option value="">Scegli una lista (attrici, attori)</option>
                <option value="Attori">Attori</option>
                <option value="Attrici">Attrici</option>
            </select>
            {/* Barra di ricerca per il nome */}
            <input
                className="container form-control my-2 py-2 ps-4 mx-auto"
                placeholder="Cerca un titolo"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)} // Imposta il nome da cercare
            />
            <section>
                {/* Visualizza la lista filtrata, se disponibile */}
                {actorsFilteredList.length ? (
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {actorsFilteredList.map((actor) => {
                                return (
                                    <div key={actor.id} className="col">
                                        <div className="card h-100 my-1 p-3 ">
                                            <div className="card-image">
                                                <figure>
                                                    {/* Visualizza l'immagine dell'attore o attrice */}
                                                    <img
                                                        className=""
                                                        src={actor.image}
                                                        alt={`${actor.name} photo`}
                                                    />
                                                </figure>
                                            </div>
                                            <div>
                                                {/* Mostra i dettagli dell'attore/attrice */}
                                                Name: {actor.name}
                                                <br />
                                                Year of birth: {actor.birth_year}
                                                <br />
                                                Nationality: {actor.nationality}
                                                <br />
                                                Biography: {actor.biography}
                                                <br />
                                                Awards: {actor.awards}
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div>No actors or actresses found.</div> // Messaggio quando non ci sono risultati
                )}
            </section>
        </>
    );
}
