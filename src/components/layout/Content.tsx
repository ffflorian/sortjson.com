import {Grid, Paper, TextField, Typography} from '@material-ui/core';
import * as React from 'react';

const jsonAbc = require('jsonabc');

const style = {
  Pane: {
    marginBottom: 10,
    marginTop: 10,
    padding: 20,
  },
};

interface Props {}

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
    return (
      <Grid container>
        <Grid item sm>
          <Paper style={style.Pane}>
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
        <Grid item sm>
          <Paper style={style.Pane}>
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

export {Content};
