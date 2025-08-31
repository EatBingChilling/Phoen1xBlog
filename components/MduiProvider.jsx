// components/MduiProvider.jsx
import { useEffect } from 'react';

// 这个组件本身不渲染任何可见的 UI。
// 它的唯一使命就是在客户端挂载时，加载所有 mdui 组件的定义。
const MduiProvider = () => {
  useEffect(() => {
    // 把所有 mdui 组件和图标的 import 都放在这里
    import('mdui/components/top-app-bar.js');
    import('mdui/components/button.js');
    import('mdui/components/button-icon.js');
    import('mdui/components/card.js');
    import('mdui/components/chip.js');
    import('mdui/components/list.js');
    import('mdui/components/list-item.js');
    import('@mdui/icons/dark-mode.js');
    import('@mdui/icons/light-mode.js');
    import('@mdui/icons/people.js');
  }, []);

  return null; // 不渲染任何东西
};

export default MduiProvider;