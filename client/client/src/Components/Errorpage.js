import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ErrorPage() {
    let routingError = useRouteError();
    console.log(routingError);

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <Row className="w-100">
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}> {/* Adjusted column size for wider card */}
                    <Card className="text-center shadow-sm" style={{ maxWidth: '100%', width: '600px', margin: '0 auto' }}>
                        <Card.Body>
                            <Card.Title className="display-4 text-danger">Oops!</Card.Title>
                            <Card.Text className="lead">
                                Something went wrong.
                            </Card.Text>
                            <Card.Text className="text-muted">
                                {routingError.status} - {routingError.data}
                            </Card.Text>
                            <a href="/" className="btn btn-primary mt-3">Go Home</a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ErrorPage;
