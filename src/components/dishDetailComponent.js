import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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
                                    <p className="list-item"> -- {comment.commentBy}, {comment.commentTime} </p>
                                </li> )
                            }
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