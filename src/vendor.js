/**
 * 只用这个import “three”的syntax
 * 相当于把dependency都import到vendor这里
 * 因为最后script tag都在html上，所以main bundle也能access three？
 *
 * 但是还有个问题？？！！！！
 * 如果在main bundle里import three了，那three是不是还是要include到main里？ 这样感觉没有很大意义啊
 *
 */
import 'three';

console.log('hello from vendor');
