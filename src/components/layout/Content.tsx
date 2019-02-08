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
import React, {useEffect, useState} from 'react';
import {copyToClipboard, hasClipboardSupport, readFromClipboard} from '../../clipboard';

import {TextFieldProps} from '@material-ui/core/TextField';
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

const demoJson = JSON.stringify({name: 'Sophie', age: 50});

const formatJSON = (json: string) => {
  try {
    const object = json5.parse(json);
    const sorted = jsonAbc.sortObj(object, true);
    return JSON.stringify(sorted, null, 2);
  } catch (error) {
    return 'Input is not valid JSON.';
  }
};

const JsonTextField = (props: TextFieldProps) => (
  <TextField {...props} fullWidth multiline rows={4} rowsMax={Infinity} style={{margin: 8}} variant="filled" />
);

export const Content = ({classes}: WithStyles<typeof styles>) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(formatJSON(demoJson));
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => setOutput(input ? formatJSON(input) : ''), [input]);

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.Pane}>
          <Typography variant="h5" component="h3">
            Input
          </Typography>
          <JsonTextField
            onChange={({target: {value}}) => setInput(value)}
            onFocus={() => setShowPlaceholder(false)}
            onBlur={() => setShowPlaceholder(true)}
            placeholder={showPlaceholder ? demoJson : ''}
            value={input}
          />
          {hasClipboardSupport() && (
            <Button
              onClick={() => readFromClipboard().then(setInput)}
              className={classes.Button}
              color="inherit"
              variant="contained"
            >
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
          <JsonTextField disabled value={output} placeholder={showPlaceholder ? formatJSON(demoJson) : ''} />
          {hasClipboardSupport() && (
            <Button
              onClick={() => copyToClipboard(output)}
              className={classes.Button}
              color="inherit"
              variant="contained"
            >
              Copy
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Content);
