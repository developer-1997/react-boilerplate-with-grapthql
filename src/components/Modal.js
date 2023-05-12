import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { ADD_RATING_AND_STATUS } from '../gql/bookQueries';
import { useMutation } from '@apollo/client';
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";


const ReviewSchema = Yup.object().shape({
    rating: Yup.number()
        .min(0)
        .max(5),
});

function MyModal(props) {
    const token = localStorage.getItem('token') || "";
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addRatingAndStatus] = useMutation(ADD_RATING_AND_STATUS, {
        context: {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        },
    });

    const handleSubmit = (values) => {
        console.log({ rating:values.rating , collect:"READ" , bookId:props.bookId}  )
        addRatingAndStatus({ variables: { input: {bookId:props.bookId  , collect:"READ" , rating:values.rating} } })
            .then((result) => {
                toast("hank you for read our book");
                handleClose()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit view
            </Button>
            <Formik
                validationSchema={ReviewSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
                initialValues={{
                    rating: 0,
                    review: "",
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                }) => (
                        <Form
                            noValidate
                            onSubmit={(event) => handleSubmit(event)}
                        >

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Submit Rating</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <Form.Group as={Col} sm="4" className="mx-auto text-start mb-3" controlId="validationFormik01">
                                        <Form.Label className="pb-1">Rating *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="rating"
                                            name="rating"
                                            max={5}
                                            min={0}
                                            value={values.rating}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.rating && !errors.rating}
                                            isInvalid={touched.rating && !!errors.rating}
                                        />
                                        {touched.rating && errors.rating && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.rating}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit' onClick={(event) => handleSubmit(event )}>
                                        Save
                                    </Button>
                                </Modal.Footer>

                            </Modal>
                        </Form>
                    )}
            </Formik>
        </>
    );
}

export default MyModal;