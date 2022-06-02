import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getDeputadoid } from '../services/pesquisa'
import apiDeputados from './../services/apiDeputados'



const Deputados = () => {

    const [deputados, setDeputados] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        apiDeputados.get('deputados?itens=250').then(resultado => {
            console.log(resultado.data)
            setDeputados(resultado.data.dados)
        })
    }, [])

    const pesquisarDeputados = async (event) => {
        getDeputadoid(event.target.value).then(response => setDeputados(response))
    }
   
  return (
    <div style={{ marginTop: "120px" }}>
            <Card className='mt-5 mb-5'>         
               <input style={{ height: '40px', borderRadius: '8px'}} 
               className='text-light bg-dark p-4' 
               placeholder='Pesquisar...' 
               type="Text" 
               onChange={pesquisarDeputados}/>
          </Card>  
        <Card>
            <Card className='bg-dark text-light align-items-center p-2 m-2'>
                <h1>Todos os Deputados</h1>
            </Card>
            { !deputados.length && <h1>Carregando... Aguarde</h1>}
            <Card className='p-2 m-2 bg-light'>
                <Row xs={1} md={2} xl={3} className="g-4">
                {deputados.map(item => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={item.urlFoto } />
                            <Card.Body>
                                <Card.Title><h3>{item.nome}</h3></Card.Title>
                                <Card.Text><strong>Partido: </strong>{item.siglaPartido}</Card.Text>
                                <Card.Text><strong>Estado: </strong>{item.siglaUf}</Card.Text>

                                <Link className="btn btn-success w-100" to={'/detalhesdeputado/' + item.id}>
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

export default Deputados