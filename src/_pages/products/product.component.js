import { connect } from 'react-redux';
import { productAction } from '../../_actions';
import React, { Component } from 'react';
import AppBar from '../../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Nav from '../../_components/nav'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
});


class Product extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(productAction.getProduct());
    }
    
      handleChange = event => {
        this.setState({
          anchor: event.target.value,
        });
      };


      handleClick = (event, id) => {
        console.log(id);
        const { dispatch } = this.props;
        dispatch(productAction.deleteProductById(id))
      };
    
   render() {
     const { classes } = this.props;
     const { product } = this.props.product;
     
      return (
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    <Grid item xs={3}>
                        Product
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                            
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">
                      <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-product">
                        Add Product
                      </Button>      
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container>
                  <Paper className={classes.root}>
                      <Table className={classes.table}>
                          <TableHead>
                          <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Price</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                          {product.map(n => {
                              return (
                              <TableRow key={n.id}>
                                  <TableCell component="th" scope="row">
                                  {n.name}
                                  </TableCell>
                                  <TableCell>{n.description}</TableCell>
                                  <TableCell>{n.price}</TableCell>
                                  <TableCell>
                                    <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-product/${n.id}`}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, n.id)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                              );
                          })}
                          </TableBody>
                      </Table>
                  </Paper>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}


Product.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>{
  return {
      product : state.product
  };
}

const connectedProductPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Product)));

export { connectedProductPage as Product };