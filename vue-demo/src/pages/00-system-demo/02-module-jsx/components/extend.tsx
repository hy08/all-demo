import * as tsx from 'vue-tsx-support';
const MyComponent = tsx.componentFactory.create({
  props: {
    text: { type: String, required: true },
    important: Boolean,
  } as const, // `as const` is needed in some cases.
  computed: {
    className(): string {
      return this.important ? 'label-important' : 'label-normal';
    },
  },
  methods: {
    onClick(event) {
      this.$emit('ok', event);
    },
  },
  render() {
    return (
      <span class={this.className} onClick={this.onClick}>
        {this.text}
      </span>
    );
  },
});

export default MyComponent;
