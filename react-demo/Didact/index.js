// 文本节点类型
const TEXT_ELEMENT_TYPE = 'TEXT_ELEMENT';

/**
 * 模拟React.createElement
 * babel会将组件编译成React.createElement函数
 * @param {string} type 元素类型
 * @param {object} props 元素属性
 * @param  {Array} children 元素的子元素
 * @returns React.ReactElement
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

/**
 * 非object类型的基本类型的值
 * @param {string|number|boolean|undefined|BigInt|symbol} text
 * @returns React.ReactElement(文本节点)
 */
function createTextElement(text) {
  return {
    type: TEXT_ELEMENT_TYPE,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

/**
 * 创建dom
 * @param {object} fiber fiber对象，包含dom属性等的一种数据结构
 * @returns Dom node
 */
function createDom(fiber) {
  const dom =
    fiber.type === TEXT_ELEMENT_TYPE
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}

const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

/**
 * 比较prevProps和nextProps得区别，更新dom属性
 * @param {*} dom
 * @param {*} prevProps
 * @param {*} nextProps
 * @returns undefined
 */
function updateDom(dom, prevProps, nextProps) {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => (dom[name] = ''));
  // set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => (dom[name] = nextProps[name]));
  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
/**
 * commit阶段,在递归处理完所有fiber节点之后调用
 * 递归执行完commit任务，将当前的工作的fiberRoot，赋值给currentRoot，清空wipRoot
 * @returns undefined
 */
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
/**
 * 递归处理fiber节点，依据effectTag标记进行新增、修改、删除操作
 * @param {object} fiber
 * @returns undefined
 */
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
/**
 * 删除dom节点,但是fiber节点还在
 * @param {*} fiber
 * @param {*} domParent
 */
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

/**
 * 模拟ReactDOM.render
 * 初始变量赋值
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  wipRoot = {
    dom: container,
    props: { children: [element] },
    alternate: currentRoot, // alternate fiber节点的备份，指向上一次渲染得到的fiber节点 || null
  };
  deletions = [];
  nextUnitOfWork = wipRoot; //设置第一个fiber为rootFiber
}
/** 下一个工作fiber */
let nextUnitOfWork = null;
/** 完成commit阶段生成的fiber tree的引用 */
let currentRoot = null;
/** 正在工作中的fiber tree的引用（processRoot） */
let wipRoot = null;
/** 正在工作中的fiber节点 */
let wipFiber = null;
/** 记录当前使用的hook索引 */
let hookIndex = 0;
/** 删除操作集合 */
let deletions = null;

/**
 * 循环任务，直到递归fiber(每一个fiber是一个)节点结束，或者浏览器不再空闲
 * @param {*} deadline requestIdleCallback回调函数参数，可以判断是否有空闲时间
 */
function workLoop(deadline) {
  // 标记是否交出处理fiber的权限
  let shouldYield = false;
  //循环任务，直到递归fiber(每一个fiber是一个)节点结束，或者浏览器不再空闲
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //判断浏览器是否空闲
    shouldYield = deadline.timeRemaining() < 1;
  }
  //如果完成了fiber递归，并且存在正在工作中的fiber树，则进入commit阶段
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

// 浏览器API，浏览器空闲时自动执行回调，调度(scheduler)的一种实现
window.requestIdleCallback(workLoop);

/**
 * 执行工作单元（从performUnitWork到reconcileChildren都是reconcile阶段）
 * 任务：
 * 1. 更新当前组件（函数式组件、普通组件），依次创建wipRoot tree的fiber节点
 * 2. 选择下一个工作单元（下一个fiber节点：父->子->兄弟->父->父->父->null）
 * @param {} nextUnitOfWork
 * @returns filber || null
 */
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  //return next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
/**
 * 更新函数式组件
 * 内部进行协调fiber节点（reconciler）
 * @param {object}} fiber
 * @returns undefined
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  //调用Didact.createElement，创建children
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

/** 模拟实现React.useState */
function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => (hook.state = action(hook.state)));
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
/**
 * 更新dom组件
 * 如果fiber没有dom节点并且type属性不是函数，则为fiber创建dom节点
 * 内部进行协调fiber节点（reconciler）
 * @param {*} fiber
 * @returns undefined
 */
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}
/**
 * reconciler，React的协调阶段
 * 1.为element子元素创建fibers，并建立子节点之间的兄弟关系
 * 2.将创建的子fibers追加到wipFiber
 * @param {*} wipFiber 工作中的fiber节点
 * @param {*} elements 工作中的fiber节点的children
 * @returns undefined
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];

    let newFiber = null;
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      };
    }
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      };
    }
    // 如果需要删除的，那么只需要给老的fiber节点追加标记，并不会在新的fiber树中创建这个节点
    // 因此需要把删除操作push到删除队列中
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}
const Didact = {
  createElement,
  render,
  useState,
};

/**
 * 添加如下注释,jsx会使用正确的解析方式将Didact.createElement函数替换React.createElement
 * 保证jsx正常解析
 */
/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const container = document.getElementById('root');

// demo1
const updateValue = (e) => {
  rerender(e.target.value);
};
const deleteElement = () => {
  rerender('world', true);
};

const rerender = (value, isDelete) => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
      {!isDelete ? <p onClick={() => deleteElement()}>点击删除</p> : null}
    </div>
  );
  Didact.render(element, container);
};

rerender('World');

// demo2
// function Counter() {
//   const [state, setState] = Didact.useState(0);
//   return <h1 onClick={() => setState((c) => c + 1)}>Count:{state}</h1>;
// }
// const element = <Counter />;
// Didact.render(element, container);
