import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
 
 
function ProductScreen({ match }) {
  const params = useParams();
 
  const [product, setProduct] = useState([])
 
  useEffect(() => {
 
    //Veri cekerken params adinda bir useParams nesnesi olusturup, api pathine
    //parametre olarak ekledik.
    async function fetchProduct(){
      const { data } = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
 
    fetchProduct()
 
  }, [])

  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>    
        <Row>
            <Col md={6}>
                <Image src ={product.image} alt ={product.name} fluid/>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color = {'#f8e825'} />
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price
                                </Col>
                                <Col>
                                <strong>
                                    ${product.price}
                                </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Status
                                </Col>
                                <Col>
                                <strong>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block my-3' disabled={product.countInStock == 0} type='button' style={{marginLeft: '60px'}}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ProductScreen
