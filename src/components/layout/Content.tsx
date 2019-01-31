import {
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core';
import json5 from 'json5';
import React from 'react';

import jsonAbc from 'jsonabc';

const styles = (theme: Theme) =>
  createStyles({
    Button: {
      margin: theme.spacing.unit,
    },
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
    try {
      const object = json5.parse(this.state.input);
      const sorted = jsonAbc.sortObj(object, true);
      this.setState({
        output: JSON.stringify(sorted, null, 2),
        outputInfo: 'Formatted and sorted JSON result.',
      });
    } catch (error) {
      this.setState({
        output: '',
        outputInfo: 'Input is not valid JSON.',
      });
    }
  };

  handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({input: event.currentTarget.value}, this.formatJSON);
  };

  get hasClipboardSupport() {
    const hasClipboardAPI = typeof (navigator as any).clipboard !== 'undefined';
    const isNotFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') === -1;
    return hasClipboardAPI && isNotFirefox;
  }

  copyToClipboard = async (event: React.MouseEvent<HTMLInputElement>) => {
    const nav = navigator as NavigatorPermissions.NavigatorPermissions;
    if (nav.permissions) {
      const result = await nav.permissions.query({name: 'clipboard-write'});
      if (result.state == 'granted' || result.state == 'prompt') {
        (navigator as any).clipboard.writeText(this.state.output);
        this.setState({
          outputInfo: 'Copied output into clipboard.',
        });
      }
    }
  };

  pasteFromClipboard = async (event: React.MouseEvent<HTMLInputElement>) => {
    const nav = navigator as NavigatorPermissions.NavigatorPermissions;
    if (nav.permissions) {
      const result = await nav.permissions.query({name: 'clipboard-read'});
      if (result.state == 'granted' || result.state == 'prompt') {
        const pasteText = await (navigator as any).clipboard.readText();
        this.setState(
          {
            input: pasteText,
            inputInfo: 'Pasted clipboard content into input.',
          },
          this.formatJSON
        );
      }
    }
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
              id="jsonInput"
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
            {this.hasClipboardSupport && (
              <Button className={classes.Button} color="inherit" onClick={this.pasteFromClipboard} variant="contained">
                Paste
              </Button>
            )}
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
              id="jsonOutput"
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
            {this.hasClipboardSupport && (
              <Button className={classes.Button} color="inherit" onClick={this.copyToClipboard} variant="contained">
                Copy
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Content);
