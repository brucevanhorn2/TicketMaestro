import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const IssueEditor = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container alignItems={"center"} direction={"row"}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id={"issue-title-label"}>Issue Title</InputLabel>
                            <TextField labelId="issue-title-label" id="issue-title" label="Issue Title"/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="issue-priority-label">Priority</InputLabel>
                            <Select
                                labelId="issue-priority-label"
                                id="issue-priority-select"
                                // value={age}
                                // onChange={handleChange}
                            >
                                <MenuItem value={"dire"}>Holy Crap</MenuItem>
                                <MenuItem value={"critical"}>Critical</MenuItem>
                                <MenuItem value={"major"}>Major</MenuItem>
                                <MenuItem value={"normal"}>Normal</MenuItem>
                                <MenuItem value={"low"}>Low</MenuItem>
                                <MenuItem value={"trivial"}>Trivial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="issue-status-label">Status</InputLabel>
                            <Select
                                labelId="issue-status-label"
                                id="issue-status-select"
                                // value={age}
                                // onChange={handleChange}
                            >
                                <MenuItem value={"backlog"}>Backlog</MenuItem>
                                <MenuItem value={"up-next"}>Up Next</MenuItem>
                                <MenuItem value={"in-progress"}>In Progress</MenuItem>
                                <MenuItem value={"on-hold"}>On Hold</MenuItem>
                                <MenuItem value={"ready-for-code-review"}>Ready for Code Review</MenuItem>
                                <MenuItem value={"ready-for-merge"}>Ready for Merge</MenuItem>
                                <MenuItem value={"ready-for-uat"}>Ready for User Acceptance Testing</MenuItem>
                                <MenuItem value={"done"}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default IssueEditor;