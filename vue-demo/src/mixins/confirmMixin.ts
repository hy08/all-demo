// import { Vue, Component } from 'vue-property-decorator';
// import { Modal } from 'ant-design-vue';

// declare module 'vue/types/vue' {
//   interface Vue {
//     previewImg: string | null;
//     previewVisible: boolean;
//     showConfirm(): void;
//     showImgPreview(img: string): void;
//     closeImgPreview(): void;
//   }
// }

// Vue.use(Modal);
// const { confirm } = Modal;

// // You can declare mixins as the same style as components.
// @Component
// export default class ConfirmMixin extends Vue {
//   previewImg: string | null = null;
//   previewVisible = false;

//   showConfirm() {
//     confirm({
//       title: '确认提交吗?',
//       content: '确认数据填写完毕了吗?',
//       okText: '确定',
//       cancelText: '取消',
//       onCancel: () => {},
//       onOk: () => {
//         (this as any).submit();
//       },
//     });
//   }
//   showImgPreview(img: string) {
//     this.previewImg = img;
//     this.previewVisible = true;
//   }
//   closeImgPreview() {
//     this.previewImg = null;
//     this.previewVisible = false;
//   }
// }
