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
import React from 'react';

import jsonAbc from 'jsonabc';

const styles = (theme: Theme) => {
  return createStyles({
    button: {
      //margin: theme.spacing.unit,
    },
    grid: {padding: theme.spacing.unit},
    gridItem: {},

    paper: {
      padding: theme.spacing.unit,
    },
    textField: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });
};

interface Props extends WithStyles<typeof styles> {}

interface State {
  input: string;
  inputInfo: string;
  output: string;
  outputInfo: string;
  showPlaceholder: boolean;
}

class Content extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      inputInfo: 'Please paste your unformatted JSON here.',
      output: '',
      outputInfo: '',
      showPlaceholder: true,
    };
  }

  formatJSON = () => {
    try {
      const object = JSON.parse(this.state.input);
      const sorted = jsonAbc.sortObj(object);
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
    const placeholder = this.state.showPlaceholder ? JSON.stringify({name: 'Sophie', age: 50}, null, 2) : '';

    return (
      <Grid container spacing={16} className={classes.grid}>
        <Grid item xs={12} sm={6} className={classes.gridItem}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Input
            </Typography>
            <TextField
              fullWidth
              id="jsonInput"
              multiline={true}
              onChange={this.handleInput}
              placeholder={placeholder}
              rows={4}
              onFocus={() => this.setState({showPlaceholder: false})}
              onBlur={() => this.setState({showPlaceholder: true})}
              margin="none"
              rowsMax={Infinity}
              variant="outlined"
              className={classes.textField}
            />
            {this.hasClipboardSupport && (
              <Button className={classes.button} color="inherit" onClick={this.pasteFromClipboard} variant="contained">
                Paste
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
              Output
            </Typography>
            <TextField
              disabled
              fullWidth
              id="jsonOutput"
              multiline={true}
              rows={4}
              rowsMax={Infinity}
              value={this.state.output}
              variant="outlined"
              margin="none"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textField}
            />
            {this.hasClipboardSupport && (
              <Button className={classes.button} color="inherit" onClick={this.copyToClipboard} variant="contained">
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
