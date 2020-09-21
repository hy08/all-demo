import { Component } from 'vue-property-decorator';
import * as tsc from 'vue-tsx-support';
@Component
export default class App extends tsc.Component<{}> {
  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}
