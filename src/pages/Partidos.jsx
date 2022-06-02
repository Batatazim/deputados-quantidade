import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getPartidoid } from '../services/pesquisa'
import apiDeputados from './../services/apiDeputados'

{/*Aumentar a quantidade de partidos que aparece na tela*/}

const Partidos = () => {
    const [partidos, setPartidos] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        apiDeputados.get('partidos?itens=61').then(resultado => {
            console.log(resultado.data)
            setPartidos(resultado.data.dados)
        })
    }, [])

    const pesquisarPartidos = async (event) => {
        getPartidoid(event.target.value).then(response => setPartidos(response))
    }

  return (
    <div style={{ marginTop: "120px" }}>
        <Card className='mt-5 mb-5'> 
        <input style={{ height: '40px', borderRadius: '8px'}} 
               className='text-light bg-dark p-4' 
               placeholder='Pesquisar partidos por sigla ...' 
               type="Text" 
               onChange={pesquisarPartidos}/>       
        </Card>

        <Card>
            <Card className='bg-dark text-light align-items-center p-2 m-2'>
                <h1>Todos os Partidos</h1>
            </Card>
            { !partidos.length && <h1>Carregando... Aguarde</h1>}
            <Card className='p-2 m-2 bg-light'>
                <Row xs={1} md={2} xl={3} className="g-4">
                {partidos.map(item => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={item.urlLogo} />
                            <Card.Body>
                                <Card.Title><h3>{item.sigla}</h3></Card.Title>
                                <Card.Text><strong>Nome: </strong>{item.nome}</Card.Text>

                                {/*o caminho é item.status.lider.uf pra mostrar o estado do líder do partido*/}
                                <Card.Text><strong>Estado: </strong>{item.status}</Card.Text>
                                {/*criar uma variável pra isso, não tá funcionando pq retorna undefined*/}

                                {/*pra ver todos os caminhos: https://dadosabertos.camara.leg.br/api/v2/partidos/36898*/}

                                <Link className="btn btn-success w-100" to={'/detalhespartido/' + item.id}>
                                    Ver Detalhes
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Card>
        </Card>
    </div>
  )
}

export default Partidos