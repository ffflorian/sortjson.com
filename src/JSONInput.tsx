import React, {ChangeEvent, PureComponent} from 'react';
const jsonAbc = require('jsonabc');

interface JSONInputState {
  value: string;
}

interface JSONInputProps {}

export class JSONInput extends PureComponent<JSONInputProps, JSONInputState> {
  myinput: HTMLTextAreaElement | null;
  myoutput: HTMLTextAreaElement | null;
  value: string;

  constructor(props: JSONInputProps) {
    super(props);
    this.myinput = null;
    this.myoutput = null;
    this.value = '';
    this.state = {
      value: '',
    };
  }
  handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (this.myoutput) {
      if (e.currentTarget.value) {
        try {
          const obj = JSON.parse(e.currentTarget.value);
          const sorted = jsonAbc.sortObj(obj);
          this.myoutput.value = JSON.stringify(sorted, null, 2);
        } catch (error) {
          this.myoutput.value = error.message;
          console.error(error);
        }
      } else {
        this.myoutput.value = '';
      }
    }
  }
  render() {
    return (
      <div>
        <div>
          Input
          <br />
          <textarea
            id="input"
            onChange={e => {
              this.handleChange(e);
            }}
            ref={input => (this.myinput = input)}
          />
        </div>
        <br />
        <div>
          Output
          <br />
          <textarea id="output" readOnly ref={output => (this.myoutput = output)} />
        </div>
      </div>
    );
  }
}
