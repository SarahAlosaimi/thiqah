import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';
import PlaceholderButton from 'react-bootstrap/PlaceholderButton'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


// Define a functional component named CardsSkeleton for cards loading
const CardsSkeleton = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => {
                return (
                    <Col>
                        <Card className='borderCard'>
                            <Card.Header className='text-center h5 cardHeader text-white'>
                                <Placeholder as={Card.Title} animation="wave">
                                    <Placeholder xs={12} />
                                </Placeholder>
                            </Card.Header>
                            <Card.Body>
                                <Placeholder as={Card.Text} animation="wave">
                                    <Placeholder xs={5} /> <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="wave">
                                    <Placeholder xs={5} /> <Placeholder xs={3} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="wave">
                                    <Placeholder xs={5} /> <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="wave">
                                    <Placeholder xs={5} /> <Placeholder lg={6} />
                                </Placeholder>
                                <PlaceholderButton className='buttonColor w-50' animation='wave' variant='info' size='lg' />
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </>
    )
}

export default CardsSkeleton