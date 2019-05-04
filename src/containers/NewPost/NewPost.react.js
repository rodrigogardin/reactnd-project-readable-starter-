import React from 'react';

import './NewPost.css';

import { connect } from "react-redux";
import * as actions from '../../actions/posts'

import { Redirect } from 'react-router-dom'
import {
    Container, Row, Button, Form, FormGroup, Label, Input, FormText, Col, ListGroupItem
} from 'reactstrap';
class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            category: "",
            post: ""
        };
    }
    componentDidMount () {
        this.getCategories()
    }

    componentDidUpdate (prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.getCategories()
        }
    }
    getCategories = () => {
        this.props.getCategoriesFromServer();
    }
    handleChange = (e, data) => {

        console.log(data);
        console.log();

        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = () =>{
        const { author, title, post, category } = this.state;


            let id = Math.random().toString(36).substring(5);
            var postObject = {title:title, author:author, body:post, category:category, id:id, timestamp: Date.now(), voteScore:0, deleted:false}
            console.log(postObject);


             this.props.addPostOnServer(postObject);

        this.props.history.push('/')

    };


    render() {
        return (<Container>
                    <Form onsubmit={this.handleSubmit} method="post">
                    <Row><Col><h2>Preencha os dados abaixo para cadastrar um post</h2></Col></Row>
                    <Row><Col>
                        <FormGroup>
                        <Label for="title">Título</Label>
                        <Input type="text" name="title" id="title" placeholder="Preencha o título" required="true" onChange={this.handleChange} />
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row><Col>
                    <FormGroup>
                    <Label for="autor">Autor</Label>
                    <Input type="text" name="author" id="author" placeholder="Preencha o autor" required="true" onChange={this.handleChange} />
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                            <FormGroup>
                                <Label for="exampleSelect">Categoria</Label>
                                <Input type="select" name="category" id="category" onChange={this.handleChange}>
                                {this.props.categories.map(category => (
                                        <option>{category.name}</option>
                                ))}
                                </Input>
                            </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <FormGroup>
                        <Label for="description">Conteúdo</Label>
                        <Input type="textarea" name="post" required="true" id="description" placeholder="Preencha o texto do Post" onChange={this.handleChange}  />
                    </FormGroup>
                    </Col>
                    </Row>

                    <Button onClick={this.handleSubmit}>Cadastrar Post</Button>
                </Form>
                    <Row></Row>
                </Container>);
    }
}


const mapStateToProps = ({categories}) => ({categories})

export default connect(mapStateToProps, actions)(NewPost)