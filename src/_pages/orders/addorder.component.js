import React, { Component } from 'react';
import AppBar from '../../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../../_components/nav'; 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { orderAction } from '../../_actions';
import { productAction } from '../../_actions';
import { customerAction } from '../../_actions';
import { withRouter } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';


const drawerWidth = 240;

const styles = theme => ({

    root: {
        flexGrow: 1,
      },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
});

class AddOrder extends Component {

    state = {
        selectedProduct: null,
        selectedCustomer: null
    };
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(orderAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;
        const { dispatch } = this.props;
        if(params.id){
            dispatch(orderAction.getOrderById(params.id));
        }
        dispatch(customerAction.getCustomer());
        dispatch(productAction.getProduct());
    }

    selectedProductChangeHandler = (e, value) => {
        e.preventDefault();
        this.setState({
            selectedProduct: value
        });
    };

    selectedCustomerChangeHandler = (e, value) => {
        e.preventDefault();
        this.setState({
            selectedCustomer: value
        });
    };

    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch } = this.props;
            
        let payload={
            id: params.id,
            quantity:  this.props.order.quantity,
            subtotal: this.props.order.subtotal,
            note: this.props.order.note,
            product: (this.state.selectedProduct==null) ? this.props.order.product:this.state.selectedProduct,
            customer: (this.state.selectedCustomer==null) ? this.props.order.customer:this.state.selectedCustomer
        }
        if(params.id){
            dispatch(orderAction.editOrderInfo(params.id, payload));
        }else{
            dispatch(orderAction.createOrder(payload));
        }
    }

   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     const { customer } = this.props.customer;
     const { product } = this.props.product;

     function InsertText(props) {
        return <Typography>{'Add New Order'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{'Edit Order'}</Typography>;
      }


    function SegHeader() {
        if(params.id){
            return <EditText />;
        }
        return <InsertText />;
    }
     
      return (
        
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    <Grid item xs={3}>
                        <SegHeader />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">                            
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container>
                    <Grid item xs={12}>
                        <div>
                            <Paper className={classes.contentRoot} elevation={1}>
                                <form className={classes.container}>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="quantity"
                                                label="Quantity"
                                                className={classes.textField}
                                                value={this.props.order.quantity}
                                                onChange={this.handleChange('quantity')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="note"
                                                label="Note"
                                                className={classes.textField}
                                                value={this.props.order.note}
                                                onChange={this.handleChange('note')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Autocomplete 
                                                id="product"
                                                value={(this.state.selectedProduct==null) ? this.props.order.product:this.state.selectedProduct}
                                                options={product}
                                                getOptionLabel={option => option.name  +' -  $'+ option.price}
                                                style={{ width: 300 }}
                                                onChange={(event, value) =>  this.selectedProductChangeHandler(event, value)}
                                                renderInput={params => (
                                                    <TextField {...params} label="Product" variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Autocomplete
                                                id="customer"
                                                value={(this.state.selectedCustomer==null) ? this.props.order.customer:this.state.selectedCustomer}
                                                options={customer}
                                                getOptionLabel={option => option.name +' '+ option.lastname}
                                                style={{ width: 300 }}
                                                onChange={(event, value) => this.selectedCustomerChangeHandler(event, value)}
                                                renderInput={params => (
                                                    <TextField {...params} label="Customer" variant="outlined" fullWidth />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={6}>
                                        </Grid>
                                        <Grid item xs={3} container justify="center">
                                            <Grid container>
                                                <Grid item xs={6} container justify="center">
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/order">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} container justify="flex-start">
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

AddOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddOrderPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddOrder)));

export { connectedAddOrderPage as AddOrder };