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

const styles = (theme: Theme) => {
  return createStyles({
    grid: {
      margin: 0,
      padding: theme.spacing.unit / 2,
      width: '100%',
    },
    gridItem: {},
    paper: {
      padding: theme.spacing.unit,
    },
    textArea: {
      fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      fontSize: '14px',
    },
    textField: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });
};

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

const JsonTextField = withStyles(styles)((props: TextFieldProps & WithStyles<typeof styles>) => {
  const {classes} = props;

  return (
    <TextField
      {...props}
      fullWidth
      multiline
      rows={4}
      rowsMax={Infinity}
      variant="outlined"
      InputProps={{
        className: classes.textArea,
      }}
    />
  );
});

export const Content = ({classes}: WithStyles<typeof styles>) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => setOutput(input ? formatJSON(input) : ''), [input]);

  return (
    <Grid container spacing={16} className={classes.grid}>
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Input
          </Typography>
          <JsonTextField
            onChange={({target: {value}}) => setInput(value)}
            onFocus={() => setShowPlaceholder(false)}
            onBlur={() => setShowPlaceholder(true)}
            placeholder={showPlaceholder ? demoJson : ''}
            value={input}
            className={classes.textField}
          />
          {hasClipboardSupport() && (
            <Button onClick={() => readFromClipboard().then(setInput)} color="inherit" variant="contained">
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
          <JsonTextField
            disabled
            value={output}
            placeholder={showPlaceholder ? formatJSON(demoJson) : ''}
            className={classes.textField}
          />
          {hasClipboardSupport() && (
            <Button onClick={() => copyToClipboard(output)} color="inherit" variant="contained">
              Copy
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Content);
