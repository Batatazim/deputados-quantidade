import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Carousel } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import apiDeputados from './../services/apiDeputados'
import Deputados from './Deputados'

const DetalhesPartido = () => {

    const params = useParams()
    const [partido, setPartido] = useState({})
    const [depmesmopartido, setDepmesmopartido] = useState([])
    const [depmesmoestado, setDepmesmoestado] = useState([])
    const [deputado, setDeputado] = useState([])

    useEffect(() => {
        apiDeputados.get('partidos/' + params.id ).then(resultado => {
            setPartido(resultado.data.dados)
            console.log(resultado.data.dados)
        })

        apiDeputados.get('partidos/' + params.id +  '/membros').then(resultado=>{
            setDepmesmopartido(resultado.data.dados)
            console.log(resultado.data.dados)
        })

        apiDeputados.get('deputados/' + params.id ).then(resultado => {
            setDeputado(resultado.data.dados)
            console.log(resultado.data)
        })
    }, [])

    
    return (

    <div style={{ marginTop: "120px" }}>
        {!partido.id && <h1>Carregando... Aguarde!</h1>}

        {partido.id &&
            <div>
                <Row>
                    <Col md={4} >
                        <Card className='mb-4' style={{ borderRadius: "30px", borderColor: "white" }}>
                            <Card.Img style={{ borderRadius: "30px" }} variant="top" src={partido.urlLogo} />
                            <Link className='btn btn-warning mt-4' to={-1 }> VOLTAR </Link >
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card style={{ borderRadius: "20px", borderColor: "white" }} className="p-3 bg-light">
                            <Card className='bg-dark text-light' style={{ borderRadius: "10px" }}>
                                <h1 className='mx-3'>{partido.nome}</h1>
                            </Card>
                            <Card className='p-3 text-dark' style={{ borderRadius: "5px" }}>
                                <Card className='px-3 pt-2 mb-1'>
                                    <p style={{ fontSize: "18pt" }}><strong>Sigla do Partido: </strong>{partido.sigla}</p>
                                </Card>
                
                                <Card className='px-3 pt-2 mb-1'>
                                    <p style={{ fontSize: "18pt" }}><strong>Situação: </strong>{partido.status.situacao}</p>
                                </Card>
                                <Card className='px-3 pt-2 mb-1'>
                                    <p style={{ fontSize: "18pt" }}><strong>Total de Membros: </strong>{partido.status.totalMembros}</p>
                                </Card>
                                <Row>
                                    <Col>
                                        <Card className='px-3 pt-2 mb-1'>
                                            <img
                                                    className="d-block w-100"
                                                    src={partido.status.lider.urlFoto}
                                                    alt="First slide"
                                            />
                                        </Card> 
                                    </Col>
                                    <Col>
                                        <Card className='px-3 pt-2 mb-1'>
                                            <p style={{ fontSize: "18pt" }}><strong>Líder Partidário: </strong>{partido.status.lider.nome}</p>
                                        </Card>
                                        <Card className='px-3 pt-2 mb-1'>
                                            <p style={{ fontSize: "18pt" }}><strong>Origem do Líder: </strong>{partido.status.lider.uf}</p>
                                        </Card>
                                        <Card className='px-3 pt-2 mb-1'>
                                            <p style={{ fontSize: "18pt" }}><strong>Membro Partido: </strong>{partido.status.lider.siglaPartido}</p>
                                        </Card>
                                    </Col>
                                </Row>                          
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        }
                
        <div>
            <Row className='align-items-center justify-content-center'>
                <Card className='p-2 m-3 align-items-center bg-light w-50'>
                    <Card className='p-2 w-100 align-items-center bg-dark text-light'>
                        <h4>Deputados do mesmo Partido</h4>
                    </Card>
                    <Card className=' mt-2 w-100'>
                        <Row className='m-2'>
                            <Carousel variant='dark' className='align-items-center justify-content-center'>
                                {depmesmopartido.map(item => (
                                    <Carousel.Item key={item.id} style={{ width: '100%'}}>
                                        <img
                                        className="d-block w-100"
                                        src={item.urlFoto}
                                        alt="First slide"
                                        />
                                        <Link to={'/detalhesdeputado/' + item.id}>
                                            <Carousel.Caption>
                                                <Card className='bg-dark text-light'>
                                                    <h3>{item.nome}</h3>
                                                </Card>
                                            </Carousel.Caption>
                                        </Link>
                                    </Carousel.Item>
                                ))}
                            </Carousel>   
                        </Row>
                    </Card>
                </Card>
            </Row>
        </div>
    </div>
    )
}

export default DetalhesPartido