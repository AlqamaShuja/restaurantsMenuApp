import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
        Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        alert('Current Comments detail is: ' + JSON.stringify(values));
    }

    render() { 
        return ( 
            <div className="col-12 col-md-9">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil mr-1"></span> 
                    Submit Comment 
                </Button>


                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>

                    <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}> Rating </Label>
                                <Col>
                                    <Control.select model=".rating" 
                                        id="rating" name="rating"
                                        className="form-control"
                                        innerRef={(input) => this.rating = input}
                                    >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="author" md={2}> Your Name </Label>
                            <Col>
                                <Control.text model=".author" 
                                    id="author"
                                    className="form-control"
                                    placeholder="Your Name"
                                    name="author"
                                    innerRef={(input) => this.author = input}
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Label htmlFor="comment" md={2} > Comment </Label>
                            <Col>
                                <Control.textarea model=".comment" 
                                    id="comment" 
                                    className="form-control"
                                    name="comment"
                                    rows="6"
                                    innerRef={(input) => this.comment = input } 
                                />
                            </Col>
                        </Row>

                        <Button type="submit" value="submit" color="primary"> Submit </Button> 
                    </LocalForm>

                    </ModalBody>
                </Modal>
            </div>
         );
    }
}


class DishDetailComponent extends Component {
    constructor(props) {
        super(props);
    }

    

    render() { 
        const { dish, comments } = this.props;

        const RenderDishDesc = ({dish}) => {
            if(dish !== null){
                return(
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{ dish.name }</CardTitle>
                                <CardText>{ dish.description }</CardText>
                            </CardBody>
                        </Card>
                    </div>
                );
            }
            else return( <div> </div> )
        }

        const RenderDishComment = ({comments}) => {
            if(comments !== null ){
                return(
                    <div className="col-12 col-md-5 m-1">
                        <h4> Comments </h4>
                        <ul className="list-unstyled">
                            {comments.map(comment =>
                                <li className="list-item"> 
                                    <p className="list-item"> {comment.comment} </p>
                                    <p className="list-item"> -- {comment.author}, {comment.date} </p>
                                </li> )
                            }
                            <CommentForm />
                        </ul>
                    </div>
                );
            }
            else return(
                <div>  </div>
            )
        }


        return ( 
            <div className="container" >

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu"> Menu </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active > {dish.name} </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3> {dish.name} </h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderDishDesc dish={dish} />
                    <RenderDishComment comments={comments} />
                </div>
            </div>
         );
    }
}
 
export default DishDetailComponent;