import React from 'react';

import { Link } from 'react-router-dom' 

import {connect} from 'react-redux'
import * as actions from '../../actions/posts'
import { FaThumbsDown, FaThumbsUp, FaPencilAlt, FaTimes} from 'react-icons/fa';
import {
  Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import './Home.css';

class Home extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             posts: []
         };
      }
      componentDidMount () {
        this.getPosts()
        this.getCategories()
      }
    
      componentDidUpdate (prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.getPosts()
            this.getCategories()
          }
      }
      getCategories = () => {
        this.props.getCategoriesFromServer();
      }
    componentWillReceiveProps(nextProps) {

    }
      getPosts = () => {


          if (this.props.match.params.id) {

              this.props.getPostsByCategoryFromServer(this.props.match.params.id)

          }else{
              this.props.getPostsFromServer()
          }
       

        }
    like(post){
         this.props.votePostOnServer(post.id, 'upVote');
         this.props.getPosts();
    }
    unlike(post){
        this.props.votePostOnServer(post.id, 'downVote');
        this.props.getPosts();
    }
    remove(post){
        this.props.deletePostOnServer(post.id);
        this.props.getPosts();
    }
    edit(post){
        this.props.history.push('/editpost/'+post.id)
    }
    render() {
        return (
            <div className='home_wrapper'>
               <Container>
                   <Row>
                       <Col xs="3">
                       <h4>Categorias</h4>
                       <ListGroup>
                        <ListGroupItem><Link to="/">Todas as categorias</Link></ListGroupItem>
                       {this.props.categories.map(category => ( 
                            <ListGroupItem><Link to={"/home/"+category.name}>{category.name}</Link></ListGroupItem>
                        ))}
                <br/>
      </ListGroup>

                        <Link to="/newpost">Adicionar Post</Link>
                       </Col>
                       <Col xs="9">
                       {this.props.posts.map(post => ( 
                            <article>
                                <h2><Link to={"/post/" + post.id} >{post.title}</Link></h2>
                                <p>{post.body}</p>

                                    <Row>
                                                            <Col xs={6} md={6}><strong>Author:</strong> {post.author}</Col>
                                                            <Col xs={6} md={6}><strong>Date:</strong> {post.timestamp}</Col>
                                    </Row>
                                    <Row>
                                    <Col xs={6} md={6}><strong>Category:</strong> {post.category}</Col>
                                 <Col xs={2} md={2}><strong>Likes </strong> {post.voteScore} </Col>
                                    <Col xs={1} md={1}><FaThumbsUp onClick={()=>(this.like(post))} /> </Col>
                                 <Col xs={1} md={1}><FaThumbsDown onClick={()=>(this.unlike(post))}  /></Col>
                                <Col xs={1} md={1}><FaTimes onClick={()=>(this.remove(post))}  /></Col>
                                <Col xs={1} md={1}><FaPencilAlt onClick={()=>(this.edit(post))}  /></Col>
                                    </Row>
                            </article>  
                            )
                            )}
                       </Col>
                   </Row>
               </Container>
            </div>
        );
    }
}


const mapStateToProps = ({categories, posts}) => ({categories, posts})

export default connect(mapStateToProps, actions)(Home)