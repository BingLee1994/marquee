# marquee
A react component that shows a scrolling area of text.

## Examples
```javascript
import Marquee from 'component/marquee';

export default () => {
  return (
    <div style={{width: 200, fontSize: 20}}>
      <Marquee>The Marquee react component</Marquee>
    </div>
  )
}
```

## Props
`speed`{number}  
Scroll speed(px/s).  
  
----
`gapWidth`{number}  
The gap width between the text and the next next.  
  
----
`delay`{number}  
The time, in milliseconds, the text should wait before scrolling.  
  
----
# marquee
可以显示跑马灯（如果文本太长）的react组件。
跑马灯已经优化并实现如下效果：
* 仅当组件子节点的文本发生变化时，组件才重新渲染，因此不必担心因为父组件不小心调用`setState`而导致动画重新播放。
* 当容器宽度变化时，可监听宽度变化，当宽度足够宽以能够显示所有文本时，跑马灯将停止滚动。
* 当父容器宽度变化过于频繁时，比如用户连续拖拽调整浏览器窗口，组件使用了`debounce`技巧以节省性能。
* 跑马灯是无限循环滚动的，因此需要在原文本后面添加一个“尾巴”以在视觉上实现无缝衔接。
* 仅当文本出现在父容器可视区域时，文本才进行滚动以节省性能。
请勿通过非`React`手段，比如`jQuery`，来强制修改组件的`DOM`属性或者子节点文本。

## Examples
```javascript
import Marquee from 'component/marquee';

export default () => {
  return (
    <div style={{width: 200, fontSize: 20}}>
      <Marquee>The Marquee react component</Marquee>
    </div>
  )
}
```

## Props
`speed`{number}  
滚动速度（像素/秒），最大250像素。  
  
----
`gapWidth`{number}  
当前滚动文本和下一个滚动文本之间的间距（滚动是无限循环的）。
  
----
`delay`{number}  
延时滚动的时间（毫秒） 。
  
