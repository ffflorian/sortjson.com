import React, {ChangeEvent, PureComponent} from 'react';

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
      this.myoutput.value = e.currentTarget.value;
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
