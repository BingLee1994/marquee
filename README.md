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
  
# marquee
可以显示跑马灯（如果文本太长）的react组件。

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
滚动速度（像素、秒）。  
  
----
`gapWidth`{number}  
当前滚动文本和下一个滚动文本之间的间距（滚动是无限循环的）。
  
----
`delay`{number}  
延时滚动的事件（毫秒） 。
  
