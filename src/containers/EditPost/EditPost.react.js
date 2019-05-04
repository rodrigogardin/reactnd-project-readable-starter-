import React from 'react';

import './EditPost.css';
import { connect } from "react-redux";
import * as actions from '../../actions/posts'
import {
    Container, Row, Button, Form, FormGroup, Label, Input, FormText, Col, ListGroupItem
} from 'reactstrap';

import {FaPencilAlt, FaThumbsDown, FaThumbsUp, FaTimes} from "react-icons/fa";
class EditPost extends React.Component {

    constructor() {
        super();
        this.state = {
            title: "",
            author: "",
            category: "",
            post: ""
        };
    }

    componentWillMount() {

        this.getCategories()
        if (this.props.match.params.id) {

            this.props.getPostFromServer(this.props.match.params.id);

        }
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.post !== this.state.post) {
            this.setState({title:this.props.post.title,
                author:this.props.post.author,
                category:this.props.post.category,
                post:this.props.post.post,
            })
        }
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


        var postObject = {title:title, author:author, body:post, category:category}
        console.log(postObject);


        this.props.editPostOnServer(this.props.post.id, postObject);

        this.props.history.push('/')


    };

    render() {

        return (
            <Container>
            <Form onsubmit={this.handleSubmit} method="post">
            <Row><Col><h2>Preencha os dados abaixo para editar o post</h2></Col></Row>
        <Row><Col>
        <FormGroup>
        <Label for="title">Título</Label>
            <Input type="text" name="title" id="title" placeholder="Preencha o título" required="true" value={this.state.title} onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>
        <Row><Col>
        <FormGroup>
        <Label for="autor">Autor</Label>
            <Input type="text" name="author" id="author" value={this.state.author} placeholder="Preencha o autor" required="true" onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
        <FormGroup>
        <Label for="exampleSelect">Categoria</Label>
            <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChange}>
            {this.props.categories.map(category => (
                    <option >{category.name}</option>
                ))}
    </Input>
        </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
        <FormGroup>
        <Label for="description">Conteúdo</Label>
            <Input type="textarea" name="post" required="true" id="description" value={this.state.body} placeholder="Preencha o texto do Post" onChange={this.handleChange}  />
        </FormGroup>
        </Col>
        </Row>

        <Button onClick={this.handleSubmit}>Atualizar Post</Button>
        </Form>






    </Container>
    );
    }
}
const mapStateToProps = ({post, comments, categories}) => ({post, comments, categories})

export default connect(mapStateToProps, actions)(EditPost)