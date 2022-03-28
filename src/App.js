import { useState, useMemo } from 'react';
import './App.css';

function App(props) {

  const {
    data = [], // 列表数据
    height = 0, // 列表容器高度
    itemHeight = 38, // 列表项高度,
    size = 10, // 渲染条数
  } = props

  const [listData, setListData] = useState([...data].slice(0, size))
  const [scrollTop, setScrollTop] = useState(0)

  const contentH = useMemo(() => {
    return data.length * itemHeight
  }, [data, itemHeight])

  const scroll = (e) => {
    let scrollT = e.target.scrollTop // 滚动条滚动距离
    setScrollTop(scrollT)
    if (scrollT < scrollTop) {
      return
    }
    let offsetNum = Math.ceil(scrollT / itemHeight)
    let tempData = [...data]
    tempData.splice(0, offsetNum)
    let arr = tempData
    setListData(arr.slice(0, size))
  }

  return (
    <div 
    className="virtual-list" 
    style={{height: height + 'px'}} 
    onScroll={scroll}
    >
      <div 
      className='virtual-list-content' 
      style={{height: contentH + 'px'}}
      >
          {
            listData.map(item => {
              return <div 
              className='virtual-list-item'
              key={item}
              >
                  {
                    item
                  }
              </div>
            })
          }
      </div>
    </div>
  );
}

export default App;
