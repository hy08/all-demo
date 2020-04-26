import React, { Component } from 'react';

const todoInputDefaultProps = {
  inputSetting: {
    maxlength: 20,
    placeholder: '请输入todo',
  }
}

type Props = {
  handleSubmit: (value: string) => void
  children: React.ReactNode
} & Partial<typeof todoInputDefaultProps>

interface State {
  itemText: string
}

class TodoInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      itemText: ''
    }
  }

  private inputRef = React.createRef<HTMLInputElement>();

  private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value })
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!this.state.itemText.trim()) {
      return
    }

    this.props.handleSubmit(this.state.itemText)
    this.setState({ itemText: '' })
  }

  public static defaultProps = todoInputDefaultProps;

  public render() {
    const { itemText } = this.state
    const { updateValue, handleSubmit } = this;
    const { inputSetting } = this.props;

    return (
      <form onSubmit={handleSubmit} >
        <input ref={this.inputRef} maxLength={inputSetting.maxlength} type='text' value={itemText} onChange={updateValue} />
        <button type='submit' >添加todo</button>
      </form>
    )
  }
}

export default TodoInput;