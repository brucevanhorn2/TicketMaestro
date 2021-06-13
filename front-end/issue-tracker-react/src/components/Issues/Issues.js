import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Axios from 'axios';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    addIssueFab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));


const Issues = () => {
    const classes = useStyles();
    const [state, setState] = useState([])
    useEffect(() => {
        Axios.get('/api/v1/all')
            .then( response => setState(response.data));
    }, []);
    return (
        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <Paper className={classes.paper}>

                        <div className="ag-theme-alpine" style={{height: 400}}>
                            <AgGridReact
                                rowData={state}>
                                <AgGridColumn hide="true" field="ID"></AgGridColumn>
                                <AgGridColumn field="Title"></AgGridColumn>
                                <AgGridColumn field="Priority"></AgGridColumn>
                                <AgGridColumn field="AssignedTo"></AgGridColumn>
                                <AgGridColumn field="Status"></AgGridColumn>
                            </AgGridReact>
                        </div>
                        <Fab color="secondary" aria-label="add" size={"small"} className={classes.addIssueFab}>
                            <AddIcon />
                        </Fab>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

export default Issues;