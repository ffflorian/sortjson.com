import {Grid, Paper, Typography} from '@material-ui/core';
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
      input: '{"name": "Sophie", "age": 50}',
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
            <Typography component="textarea" onChange={this.handleInput} defaultValue={this.state.input} />
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={style.Pane}>
            <Typography variant="h5" component="h3">
              Output
            </Typography>
            <Typography component="pre">{this.state.output}</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export {Content};
