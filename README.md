#About
个人平时练习写的一些JS代码，交流学习使用^_^
初学水平，多多包涵

##Animation
+ createOpacityAnimation
 用来创建透明度动画的函数，返回值是一个closure
 * Params
 1. object: any
 动画作用的对象
 2. time: number
 动画的持续时间
 3. intervel: number
 动画函数每次循环执行的间隔
 * Return
 (show :boolean, startHandler :Function, completeHander :Function) => void
 1. show: boolean
 表示是透明度由0-1的动画或透明度由1-0的动画
 2. startHandler: Function
 动画执行之前的操作
 3. completeHandler: Function
 动画执行完成后的操作
 4. Retrun: void
