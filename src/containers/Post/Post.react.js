import React from 'react';

import './Post.css';
import { connect } from "react-redux";
import * as actions from '../../actions/posts'
import {
    Container, Row, Button, Form, FormGroup, Label, Input, FormText, Col, ListGroupItem
} from 'reactstrap';

import {FaPencilAlt, FaThumbsDown, FaThumbsUp, FaTimes} from "react-icons/fa";
class Post extends React.Component {

    constructor() {
        super();
        this.state = {
            body:"",
            author: "",
            comment: null
        };
      }
    
      componentWillMount() {
    
        if (this.props.match.params.id) {
        
          this.props.getPostFromServer(this.props.match.params.id);
          this.props.getCommentsFromServer(this.props.match.params.id);
          
        }
      }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render


    }

    like(comment){
        this.props.voteCommentOnServer(comment.id, 'upVote');
        this.props.getCommentsFromServer(this.props.match.params.id);
    }
    unlike(comment){
        this.props.voteCommentOnServer(comment.id, 'downVote');
        this.props.getCommentsFromServer(this.props.match.params.id);
    }
    remove(comment){
        this.props.deleteCommentOnServer(comment.id);
        this.props.getCommentsFromServer(this.props.match.params.id);
    }
    edit(comment){
        this.setState({author: comment.author, body:comment.body, comment:comment})
    }
    handleChange = (e, data) => {

        console.log(data);
        console.log();

        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = () =>{
        const { author, body } = this.state;


        let id = Math.random().toString(36).substring(5);

        console.log(commentObject);

        if(this.state.comment == null) {
            var commentObject = {parentId:this.props.match.params.id, id:id, author:author, body:body, timestamp: Date.now(), voteScore:0, deleted:false, parentDeleted:false}
            this.props.addCommentOnServer(commentObject);
            this.props.getCommentsFromServer(this.props.match.params.id);
        }else{
            var commentObject = {parentId:this.props.match.params.id, author:author, body:body}
            this.props.editCommentOnServer(this.state.comment.id, commentObject);
            this.props.getCommentsFromServer(this.props.match.params.id);

        }
        this.setState({author:"", body:"", comment: null})


    };

    render() {
        if(this.props.post != null && typeof this.props.post != 'undefined'){
        return (
            <Container>
                <Row>
                    <Col><h2>{this.props.post.title}</h2></Col>
                </Row>
                <Row>
                <Col><p><strong>Autor:</strong> {this.props.post.author}</p></Col>
                </Row>
                <Row>
                    <Col><p><strong>Categoria:</strong> {this.props.post.category}</p></Col>
                </Row>
                <Row>
                    <Col><p>{this.props.post.body}</p></Col>
                </Row>
                <Row>
        <Col>
                    <Form onSubmit={this.handleSubmit} method="post" className="form-comment">
                        <Row><Col><h2>Preencha os dados abaixo para cadastrar um comentário</h2></Col></Row>
                    <Row><Col>
                    <FormGroup>
                    <Label for="autor">Autor</Label>
                        <Input type="text" name="author" id="author" placeholder="Preencha o autor"  value={this.state.author} required="true" onChange={this.handleChange} />
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <FormGroup>
                    <Label for="description">Comentário</Label>
                        <Input type="textarea" name="body" required="true" id="description" value={this.state.body} placeholder="Preencha o texto do comentário" onChange={this.handleChange}  />
                    </FormGroup>
                    </Col>
                    </Row>

                    <Button onClick={this.handleSubmit}>{(this.state.comment == null ? "Cadastrar": "Salvar")} Comentário</Button>
                    </Form>
            </Col>
                </Row>
                <Row>
                    <hr/>
                    <Col><p><strong>Comentários</strong></p></Col>
                </Row>

                {this.props.comments.map(comment => (
                    <Row>
                    <Col><p class="comment">
                            <strong>Por {comment.author}</strong><br/>
                            {comment.body} <br/>
                <Row>
                <Col xs={6} md={6}>em {comment.timestamp}</Col>
                <Col xs={2} md={2}><strong>Likes </strong> {comment.voteScore} </Col>
                <Col xs={1} md={1}><FaThumbsUp onClick={()=>(this.like(comment))} /> </Col>
                <Col xs={1} md={1}><FaThumbsDown onClick={()=>(this.unlike(comment))}  /></Col>
                <Col xs={1} md={1}><FaTimes onClick={()=>(this.remove(comment))}  /></Col>
                <Col xs={1} md={1}><FaPencilAlt onClick={()=>(this.edit(comment))}  /></Col>
                    </Row>
                            </p> </Col>  </Row>
                            )
                            )}

            </Container>
        );
        }else{
            return (<Container></Container>);
        }
    }
}
const mapStateToProps = ({post, comments}) => ({post, comments})

export default connect(mapStateToProps, actions)(Post)