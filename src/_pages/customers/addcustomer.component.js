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
import { customerAction } from '../../_actions';
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

class AddCustomer extends Component {
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(customerAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(customerAction.getCustomerById(params.id));
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch } = this.props;
            
        let payload={
            id: params.id,
            name: this.props.customer.name,
            lastname: this.props.customer.lastname,
            mail: this.props.customer.mail,
            gsm: this.props.customer.gsm,
            address: this.props.customer.address,
        }

        if(params.id){
            dispatch(customerAction.editCustomerInfo(params.id, payload));
        }else{
            dispatch(customerAction.createCustomer(payload));
        }
    }


   render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.customer);
     

     function InsertText(props) {
        return <Typography>{'Add New Customer'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{'Edit Customer'}</Typography>;
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
                                                value={this.props.customer.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="lastname"
                                                label="Lastname"
                                                className={classes.textField}
                                                value={this.props.customer.lastname}
                                                onChange={this.handleChange('lastname')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="mail"
                                                label="Mail"
                                                className={classes.textField}
                                                value={this.props.customer.mail}
                                                onChange={this.handleChange('mail')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="gsm"
                                                label="Gsm"
                                                className={classes.textField}
                                                value={this.props.customer.gsm}
                                                onChange={this.handleChange('gsm')}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="address"
                                                label="Address"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.customer.address}
                                                onChange={this.handleChange('address')}
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
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/customer">
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

AddCustomer.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddCustomerPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddCustomer)));

export { connectedAddCustomerPage as AddCustomer };