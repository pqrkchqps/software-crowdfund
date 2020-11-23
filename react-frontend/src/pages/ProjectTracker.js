import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import CreateBugForm from '../components/CreateBugForm'
import BugsList from '../components/BugsList'
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

class ProjectTracker extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}`: ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Button onClick={this.onClickLogout}>Logout</Button>
        </NavItem>
        <NavItem>
          <Link to="/projects">Projects Page</Link>
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
        <Fragment>
          <NavItem>
            <Link to="/login">Login Page</Link>
          </NavItem>
          <NavItem>
            <Link to="/signup">Signup Page</Link>
          </NavItem>
        </Fragment>
    )

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">DreamerAssist.fund</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Container>
        </Navbar>
        <BugsList projectId={this.props.match.params.id} />
        <CreateBugForm projectId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(ProjectTracker)