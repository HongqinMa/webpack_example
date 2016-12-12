
import './Hello.css';
import './Hello.scss';

import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'blue'
};

export default class Hello extends Component {
    render() {
        return (
            <div>
                {/*内嵌样式的写法*/}
                <h1 style={style} onClick={()=>this.myClick("fdfdf",23)}>使用样式演示</h1>
                <br/>
                <img/>
            </div>
        )
    }
}
