import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { User } from '@/types/one';

@Component
export default class Header extends Vue {
  @Prop({ type: String, default: '标题' }) readonly title?: string;
  @Prop({ type: Object, default: () => ({ name: '-', age: '-' }) }) readonly author!: User;

  goAboutMe() {
    this.$router.push('/about');
  }
}
