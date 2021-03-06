import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateBugForm from '../components/CreateBugForm'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container
} from 'reactstrap'

class AddBug extends Component {
  constructor(props){
    super(props)
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Button >
            <Link to={"/projects/"+this.props.match.params.id}>
              Return To Project Tracker
            </Link>
          </Button>
        </Container>
        <CreateBugForm projectId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(AddBug)