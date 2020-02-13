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
  
