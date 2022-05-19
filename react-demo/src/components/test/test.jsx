import { ReactComponent as Img } from '../../logo.svg';
import { debounce } from 'lodash';
import './test.css';

export default function MouseOverImg() {
  const handleMouseOver = debounce((e) => {
    console.log('target', e.target);
  }, 200);
  return (
    <div className="container">
      <div className="pa1" onMouseDown={handleMouseOver}>
        <div className="inner">
          <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.zzNowFLKvkJQyI1q1K1K4QAAAA?w=188&amp;h=176&amp;c=7&amp;r=0&amp;o=5&amp;pid=1.7" />
        </div>
      </div>
      <div className="pa2" onMouseDown={handleMouseOver}>
        <div className="inner">
          <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.zzNowFLKvkJQyI1q1K1K4QAAAA?w=188&amp;h=176&amp;c=7&amp;r=0&amp;o=5&amp;pid=1.7" />
        </div>
      </div>
      <div className="pa3" onMouseDown={handleMouseOver}>
        <div className="inner">
          <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.zzNowFLKvkJQyI1q1K1K4QAAAA?w=188&amp;h=176&amp;c=7&amp;r=0&amp;o=5&amp;pid=1.7" />
        </div>
      </div>
    </div>
  );
}
