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
import { productAction } from '../../_actions';
import { withRouter } from 'react-router-dom';


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

class AddProduct extends Component {
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(productAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(productAction.getProductById(params.id));
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch } = this.props;
            
        let payload={
            id: params.id,
            name: this.props.product.name,
            description: this.props.product.description,
            price: this.props.product.price
        }

        if(params.id){
            dispatch(productAction.editProductInfo(params.id, payload));
        }else{
            dispatch(productAction.createProduct(payload));
        }
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.product);
     

     function InsertText(props) {
        return <Typography>{'Add New Product'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{'Edit Product'}</Typography>;
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
                                                id="name"
                                                label="Name"
                                                className={classes.textField}
                                                value={this.props.product.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="description"
                                                label="Description"
                                                className={classes.textField}
                                                value={this.props.product.description}
                                                onChange={this.handleChange('description')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="price"
                                                label="Price"
                                                className={classes.textField}
                                                value={this.props.product.price}
                                                onChange={this.handleChange('price')}
                                                margin="normal"
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
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/product">
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

AddProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddProductPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddProduct)));

export { connectedAddProductPage as AddProduct };