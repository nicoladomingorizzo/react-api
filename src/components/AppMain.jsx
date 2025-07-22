import { useEffect, useState } from "react";

export default function AppMain() {

    const url = 'https://lanciweb.github.io/demo/api/actresses/';
    const [apiUrl, setApiUrl] = useState(url);
    const [actressData, setActressData] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setActressData(data)
            }
            )
    }, [apiUrl])
    return (
        <>
            <section>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {actressData && actressData.map(actress => {

                            return (
                                <div key={actress.id} className="col">
                                    <div className="card my-1 p-3 ">
                                        <div className="card-image">
                                            <figure>
                                                <img className='' src={actress.image} alt={`${actress.name} photo`} />
                                            </figure>
                                        </div>
                                        <div>
                                            {`Name: ${actress.name}`} <br />
                                            {`Year of birth: ${actress.birth_year}`} <br />
                                            {`Nationality: ${actress.nationality}`} <br />
                                            {`Biography: ${actress.biography}`} <br />
                                            {`Awards: ${actress.awards}`} <br />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

/*
E’ arrivato il momento di mettere insieme i concetti appresi creiamo una piccola app che ci mostri un elenco di attori o attrici.
Usate uno di questi due endpoint, a piacimento:
Lista di Attrici:  https://lanciweb.github.io/demo/api/actresses/
Lista di Attori: https://lanciweb.github.io/demo/api/actors/ 
MILESTONE 1
Al caricamento dell'applicazione, recuperiamo la lista degli attori e delle attrici dalle API e stampiamoli in console.
MILESTONE 2
Prepariamo una card per ciascun attore / attrice, mostrandone le seguenti informazioni:
nome
anno nascita
nazionalità
biografia
riconoscimenti
immagine
MILESTONE 3
Mostriamo in pagina una card per ciascun attore, con grafica a piacimento!
BONUS 1 : rilassato:
Stampare sia una lista delle attrici che degli attori, separatamente.
    BONUS 2 : occhiali_da_sole:
Stampare un’unica lista che contiene attori e attrici insieme!
BONUS 3 : testa_che_esplode:
Inserire un filtro di ricerca che permetta di cercare gli attori o le attrici per nome.
Per fare questo bonus avrai bisogno di consultare la documentazione:
documentazione attrici: https://www.freetestapi.com/apis/actresses
documentazione attori: https://www.freetestapi.com/apis/actors
: faccia_robot: AI:
Se questa task è troppo difficile sfrutta l'ai per farti date una scaletta di passaggi da seguire per aiutarti a ragionare e man mano sviluppare la funzionalita' in pair programming.
Cerca però sempre di comprendere quello che ti viene suggerito e di non fare copia / incolla o far fare tutto all'AI - lo scopo e' sempre Imparare! : occhiolino:
*/