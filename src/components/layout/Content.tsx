import {Grid, Paper, TextField, Theme, Typography, WithStyles, createStyles, withStyles} from '@material-ui/core';
import * as React from 'react';

const jsonAbc = require('jsonabc');

const styles = (theme: Theme) =>
  createStyles({
    Pane: {
      marginBottom: 10,
      marginTop: 10,
      padding: 20,
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  input: string;
  output: string;
}

class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: JSON.stringify({name: 'Sophie', age: 50}, null, 2),
      output: '',
    };
  }

  handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({input: event.currentTarget.value}, this.formatJSON);
  };

  formatJSON = () => {
    try {
      const object = JSON.parse(this.state.input);
      const sorted = jsonAbc.sortObj(object);
      this.setState({
        output: JSON.stringify(sorted, null, 2),
      });
    } catch (error) {
      this.setState({
        output: error.message,
      });
    }
  };

  componentDidMount() {
    this.formatJSON();
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.Pane}>
            <Typography variant="h5" component="h3">
              Input
            </Typography>
            <TextField
              fullWidth
              helperText="Please paste your unformatted JSON here."
              id="filled-full-width"
              margin="normal"
              multiline={true}
              onChange={this.handleInput}
              placeholder={this.state.input}
              rows={4}
              rowsMax={Infinity}
              style={{margin: 8}}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.Pane}>
            <Typography variant="h5" component="h3">
              Output
            </Typography>
            <TextField
              disabled
              fullWidth
              helperText="Formatted and sorted JSON result."
              id="filled-full-width"
              margin="normal"
              multiline={true}
              rows={4}
              rowsMax={Infinity}
              style={{margin: 8}}
              value={this.state.output}
              variant="filled"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Content);
