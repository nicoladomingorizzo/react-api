import { useEffect, useState } from "react";

export default function AppMain() {

    const actressUrl = 'https://lanciweb.github.io/demo/api/actresses/';
    const actorsUrl = 'https://lanciweb.github.io/demo/api/actors/';
    const [actressData, setActressData] = useState([]);
    const [actorsData, setActorsData] = useState([]);
    const [allActorsList, setAllActorsList] = useState([]);
    const [actorsFilteredList, setActorsFilteredList] = useState([]);
    const [searchList, setSearchList] = useState('');
    const [searchName, setSearchName] = useState('');



    useEffect(() => {
        const p1 = fetch(actressUrl)
            .then(res => res.json())
            .then(data => {
                setActressData(data)
                return data;
            });
        const p2 = fetch(actorsUrl)
            .then(res => res.json())
            .then(data => {
                setActorsData(data)
                return data;
            });
        /* //NOTE: promise all serve per salvare entrambe le liste nel nostro caso quando le promise sono eseguite alla fine 
        Promise.all([p1, p2]).then(values => {
            console.log('vals:', values)
            console.log('vals:', values[0])
            console.log('vals:', values[1])
            setAllActorsList([...values[0], ...values[1]])
            })
            */
    }, []);

    useEffect(() => {
        if (searchList.length && searchList == 'Attrici') {
            setAllActorsList(actressData)
        } else if (searchList.length && searchList == 'Attori') {
            setAllActorsList(actorsData)
        } else {
            setAllActorsList([]);
        }
    }, [searchList])

    useEffect(() => {
        if (searchName.trim() !== '') {
            const filteredActor = allActorsList.filter(actor =>
                actor.name.toLowerCase().includes(searchName.toLowerCase())
            );
            setActorsFilteredList(filteredActor);
        } else {
            setActorsFilteredList(allActorsList); // reset filtro se la barra è vuota
        }
    }, [searchName, allActorsList]); //FIXME: Non funziona il filter by name


    return (
        <>
            <select className="form-select container my-4 ms-auto py-3 px-4" aria-label="Default select example" onChange={e => setSearchList(e.target.value)}>
                <option value=''>Scegli una lista (attrici, attori)</option>
                <option value="Attori">Attori</option>
                <option value="Attrici">Attrici</option>
            </select>
            <input className="container form-control my-2 py-2 ps-4 mx-auto" placeholder="Cerca un titolo" type="text" value={searchName} onChange={(e => setSearchName(e.target.value))} />
            <section>
                {actorsFilteredList.length ? (
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {allActorsList && allActorsList.map((actress) => {
                                return (
                                    <div key={actress.id} className="col">
                                        <div className="card h-100 my-1 p-3 ">
                                            <div className="card-image">
                                                <figure>
                                                    <img className='' src={actress.image} alt={`${actress.name} photo`} />
                                                </figure>
                                            </div>
                                            <div>
                                                {`Name: ${actress.name}`}<br />
                                                {`Year of birth: ${actress.birth_year}`}<br />
                                                {`Nationality: ${actress.nationality}`}<br />
                                                {`Biography: ${actress.biography}`}<br />
                                                {`Awards: ${actress.awards}`}<br />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {actressData && actressData.map((actress) => {
                                return (
                                    <div key={actress.id} className="col">
                                        <div className="card h-100 my-1 p-3 ">
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

                            {actorsData && actorsData.map(actor => {
                                return (
                                    <div key={actor.id} className="col">
                                        <div className="card h-100 my-1 p-3 ">
                                            <div className="card-image">
                                                <figure>
                                                    <img className='' src={actor.image} alt={`${actor.name} photo`} />
                                                </figure>
                                            </div>
                                            <div>
                                                {`Name: ${actor.name}`} <br />
                                                {`Year of birth: ${actor.birth_year}`} <br />
                                                {`Nationality: ${actor.nationality}`} <br />
                                                {`Biography: ${actor.biography}`} <br />
                                                {`Awards: ${actor.awards}`} <br />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
};