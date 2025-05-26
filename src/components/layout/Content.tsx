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
  InputAdornment,
} from '@material-ui/core';
import * as json5 from 'json5';
// @ts-ignore
import React, {useEffect, useState} from 'react';
import {TextFieldProps} from '@material-ui/core/TextField';
import jsonAbc from 'jsonabc';

import {copyToClipboard, hasClipboardSupport, readFromClipboard} from '../../clipboard';

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
      resize: 'vertical',
    },
    textField: {
      margin: `${theme.spacing.unit}px 0`,
    },
    lineNumberBox: {
      userSelect: 'none',
      color: theme.palette.text.disabled,
      fontFamily: 'inherit',
      fontSize: '14px',
      textAlign: 'right',
      paddingRight: theme.spacing.unit,
      minWidth: 24,
      background: 'transparent',
      lineHeight: 1.5,
      border: 'none',
    },
    lineNumberContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
    },
    lineNumberAdornment: {
      alignSelf: 'stretch',
      paddingTop: 16,
      background: 'transparent',
    },
  });
};

const demoJson = JSON.stringify({age: 50, name: 'Sophie'});

const formatJSON = (json: string) => {
  try {
    const object = json5.parse(json.replace(/[\r\n]/gm, ''));
    const sorted = jsonAbc.sortObj(object, true);
    return JSON.stringify(sorted, null, 2);
  } catch (error) {
    const errorMessage = (error as Error).message.replace('JSON5: ', '');
    return `Input is not valid JSON (${errorMessage}).`;
  }
};


// Helper to count lines
const countLines = (value: string) => {
  return value.split(/\r?\n/).length;
};

const LineNumberedTextField = withStyles(styles)((props: TextFieldProps & WithStyles<typeof styles> & { lineCount: number }) => {
  const { classes, lineCount, ...rest } = props;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);
  return (
    <div className={classes.lineNumberContainer}>
      <pre className={classes.lineNumberAdornment}>
        <span className={classes.lineNumberBox}>
          {lines.map((n) => (
            <span key={n}>{n}<br /></span>
          ))}
        </span>
      </pre>
      <TextField
        {...rest}
        fullWidth
        multiline
        rows={Math.max(4, lineCount)}
        variant="outlined"
        InputProps={{
          className: classes.textArea,
          style: { paddingLeft: 0 },
        }}
      />
    </div>
  );
});

export const Content = ({classes}: WithStyles<typeof styles>) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => setOutput(input ? formatJSON(input) : ''), [input]);

  // For line numbers, always show at least 4 lines
  const inputLineCount = Math.max(4, countLines(input || showPlaceholder ? demoJson : ''));
  const outputLineCount = Math.max(4, countLines(output || (showPlaceholder ? formatJSON(demoJson) : '')));

  return (
    <Grid container spacing={16} className={classes.grid}>
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            Input
          </Typography>
          <LineNumberedTextField
            onChange={({target: {value}}) => setInput(value)}
            onFocus={() => setShowPlaceholder(false)}
            onBlur={() => setShowPlaceholder(true)}
            placeholder={showPlaceholder ? demoJson : ''}
            value={input}
            className={classes.textField}
            lineCount={inputLineCount}
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
          <LineNumberedTextField
            disabled
            value={output}
            placeholder={showPlaceholder ? formatJSON(demoJson) : ''}
            className={classes.textField}
            lineCount={outputLineCount}
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
