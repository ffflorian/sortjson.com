import {Grid, Paper, TextField, Theme, Typography, WithStyles, createStyles, withStyles} from '@material-ui/core';
import * as React from 'react';

const jsonAbc = require('jsonabc');

const styles = (theme: Theme) =>
  createStyles({
    Pane: {
      margin: '20px',
      padding: theme.spacing.unit * 2,
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  input: string;
  inputInfo: string;
  output: string;
  outputInfo: string;
}

class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: JSON.stringify({name: 'Sophie', age: 50}, null, 2),
      inputInfo: 'Please paste your unformatted JSON here.',
      output: '',
      outputInfo: '',
    };
  }

  formatJSON = () => {
    const object = JSON.parse(this.state.input);
    const sorted = jsonAbc.sortObj(object);
    this.setState({
      output: JSON.stringify(sorted, null, 2),
      outputInfo: 'Formatted and sorted JSON result.',
    });
  };

  formatObject = () => {
    try {
      if (this.state.input) {
        const input = eval(`JSON.stringify(${this.state.input})`);
        this.setState({input}, this.formatJSON);
      } else {
        this.setState({output: ''});
      }
    } catch (error) {
      this.formatText();
    }
  };

  formatText = () => {
    const output = this.state.input
      .split('\n')
      .sort((a, b) => a.localeCompare(b))
      .filter(Boolean)
      .join('\n');
    this.setState({output, outputInfo: `No valid JSON import. Treated input as text when sorting it.`});
  };

  handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({input: event.currentTarget.value}, this.formatObject);
  };

  componentDidMount() {
    this.formatJSON();
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.Pane}>
            <Typography variant="h5" component="h3">
              Input
            </Typography>
            <TextField
              fullWidth
              helperText={this.state.inputInfo}
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
              helperText={this.state.outputInfo}
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
