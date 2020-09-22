import { Vue, Component, Prop } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import { User } from '@/types/one';
import styles from './index.less';

@Component
export default class Header extends Vue {
  _tsx!: tsx.DeclareProps<tsx.AutoProps<Header>>;

  @Prop({ type: String, default: '标题' }) readonly title?: string;
  @Prop({ type: Object, default: () => ({ name: '-', age: '-' }) }) readonly author!: User;

  private goAboutMe() {
    this.$router.push('/about');
  }

  render() {
    return (
      <div class={styles.header}>
        <div class={styles.title}>
          <h1>{this.title}</h1>
          <span onClick={this.goAboutMe}>
            作者：
            <span>{this.author.name}</span>
          </span>
        </div>
      </div>
    );
  }
}
