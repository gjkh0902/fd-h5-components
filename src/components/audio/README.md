# Audio 音频播放组件

可以对既有音频 url 进行播放，可以控制的有：播放、暂停、快进、下载

其中用到了饿了么的 UI 组件有：`el-slider`，后续需要再做一个滑块组件替换此组件

##基本参数：

| 参数     | 类型               | 默认值  | 说明                             |
| -------- | ------------------ | ------- | -------------------------------- |
| url      | String             | `""`    | 音频文件 URL                     |
| autoplay | Boolean            | `false` | 音频加载完成时自动播放           |
| volume   | String \|\| Number | `100`   | 音频播放的音量，范围：[0-100]    |
| speeds   | Number             | `1`     | 音频播放速率：范围：[1, 1.5, 2]  |
| controls | String             | `""`    | 禁用的播放控件，多个值之间以空格分割，范围如下表 |
| onPlay   | Function           | `null`  | 音频播放后的回调函数             |
| onError  | Function           | `null`  | 发生错误后的回调函数             |

参数 controls 取值范围：

| 值             | 描述         |
| -------------- | ------------ |
| noDownload     | 不显示下载   |
| noMuted        | 不显示静音   |
| noVolume       | 不显示音量条 |
| noProcess      | 不显示进度条 |
| onlyOnePlaying | 只能播放一个 |
| noSpeed        | 不要快进按钮 |

##使用：

_导入_

```javascript
import { VueAudio } from 'components'
```

_引入标签_

```vue
<vue-audio ref="Audio"
    class="aaaaaaa"
    :url="audio_url"
    :speeds="audio_speeds"
    :volume="audio_volume"
    :onError="onError"
    controls="onlyOnePlaying"
></vue-audio>
```

_设置参数_

```javascript
data() {
    return {
        audio_url: 'sdsf.mp3', // 音频URL
        audio_speeds: 1, // 设置播放速度
        audio_volume: 100, // 设置加载时的声音大小
        onlyOnePlaying: false // 只能播放一个
    }
}
```

_函数调用_

```javascript
// 播放
this.$refs.Audio.audioPlay()
// 暂停
this.$refs.Audio.audioPause()
// 停止
this.$refs.Audio.audioStop()
```
