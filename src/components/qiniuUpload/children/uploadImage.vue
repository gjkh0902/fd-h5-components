<template>
	<div class="wrap" ref="$wrap">
		<div class="bd">
			<div class="upload-box">
				<div class="upload-conf">
					<!-- <div class="field">
                        <label>是否多选</label>
                        <el-switch
                            v-model="multiSelection"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="val => setOption('multi_selection', val)">
                        </el-switch>
                    </div> -->
					<!-- <div class="field"> -->
					<mt-cell :title="`自动生成文件名`">
						<!-- <label>自动生成文件名</label> -->
						<mt-switch v-model="uniqueNames" @change="changeUniqueNames"></mt-switch>
						<!-- <el-switch
                            v-model="uniqueNames"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="val => setOption('unique_names', val)">
                        </el-switch> -->
					</mt-cell>
					<!-- </div> -->
					<!-- <div class="field"> -->
					<mt-cell title="文件最大体积(m)">
						<!-- <label>文件最大体积(m)</label> -->
						<mt-field
							placeholder="单文件最大体积"
							type="number"
							:value.sync="maxFileSize"
							:min="0.01"
							:max="5"
							:precision="2"
							:step="0.01"
							:disableClear="!0"
							@change="val => setOption('max_file_size', `${val}mb`)"
						></mt-field>
						<!-- <el-input-number
                            v-model="maxFileSize"
                            @change="val => setOption('max_file_size', `${val}mb`)"
                            :min="0.01"
                            :max="5"
                            :precision="2"
                            :step="0.01"
                            label="单文件最大体积">
                        </el-input-number> -->
					</mt-cell>
					<!-- </div> -->
					<!-- <div class="field"> -->
					<mt-cell title="文件最大数量">
						<!-- <label>文件最大数量</label> -->
						<mt-field
							placeholder="文件最大数量"
							type="number"
							:value.sync="maxFiles"
							:disableClear="!0"
							@change="val => setOption('max_files', val)"
						></mt-field>
						<!-- <el-input-number
                            v-model="maxFiles"
                            @change="val => setOption('max_files', val)"
                            :min="1"
                            :max="10"
                            label="文件最大数量">
                        </el-input-number> -->
					</mt-cell>
					<!-- </div> -->
				</div>
				<button class="btn-upload" id="upload">
					<div v-if="uploadStatus === 2 && uploadProgressText > 0" class="percent">
						<span :style="{ width: `${uploadProgressText}%` }"
							><em>{{ uploadProgressText }} %</em></span
						>
					</div>
					<span v-else>上传</span>
				</button>
			</div>
			<aside class="aside" ref="$aside">
				<h3 class="title" ref="$title">已上传的图片</h3>
				<div class="log-wrap">
					<ul class="log-list">
						<li class="item" v-for="(item, index) in fileName" :key="index">
							<img :src="item.src" />{{ item.name }}
						</li>
					</ul>
				</div>
			</aside>
		</div>
	</div>
</template>
<script>
import Vue from "vue"
import { Toast, Cell, Switch, Field } from "mint-ui"
import { QNUploader } from "mk-libs";
import { fetchUploadToken } from "@service/uploadActions"
// import shuffle from '@util/shuffle';


Vue.component(Cell.name, Cell)
Vue.component(Switch.name, Switch)
Vue.component(Field.name, Field)

// const ary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0];

export default {
	name: "QNUploader-image",
	props: [],
	data() {
		return {
			uploading: !1, // 上传状态，true表示正在上传
			// uploaded: !1,                       // 上传是否完成
			uploadFilePlacehold: "",
			fileName: [], // 原文件全名，带后缀
			fileRealName: "", // 原文件名，不带后缀
			fileDownloadName: "", // 上传后的文件名
			extName: "", // 后缀名
			uploader: null, // 上传对象
			uploadProgressText: 0, // 上传进度数据
			uploadErrorText: "", // 上传错误信息
			uploadStatus: -1, // 上传状态，-1：未上传，初始值；0：上传失败；1：上传成功；2：正在上传中

			logHeight: 0,
			multiSelection: !0, // 是否多选
			uniqueNames: !0, // 是否自动生成文件名
			maxFileSize: "2", // 文件大小限制
			maxFiles: "3" // 最大上传文件数
		}
	},
	components: {},

	computed: {},
	// mixins: [mixins],
	created() {},
	mounted() {
		this.uploader = QNUploader({
			browse_button: "upload", // 上传选择的点选按钮，可以是id或者元素本身，必需
			domain: "http://test001.pnlyy.com", // bucket域名，下载资源时用到，必需
			fetch_upload_token: this.fetchUploadToken, // 获取上传token方法
			// file_type:              'image',                          // 上传文件类型,默认为图片
			unique_names: this.uniqueNames, // 是否开启自动文件名
			// key_func:               function (file) { return shuffle(ary).join(shuffle(ary)[0]) },       // 自定义文件名方法
			multi_selection: this.multiSelection, // 是否多选
			max_file_size: this.maxFileSize, // 文件上传大小限制
			fileFiltered: this.fileFiltered, // 文件添加前事件
			filesAdded: this.filesAdded, // 文件添加后事件
			beforeUpload: this.beforeUpload, // 上传前事件
			uploadProgress: this.fileUploadProgress, // 上传进行中
			fileUploaded: this.fileUploaded, // 上传完事件
			uploadFail: this.fileUploadFail, // 上传失败事件
			max_files: this.maxFiles // 最大上传数
		})
		// this.$nextTick(() => {
		//     this.logHeight = this.$refs.$aside.offsetHeight - this.$refs.$title.offsetHeight;
		//     console.log(this.$refs.$wrap.offsetHeight, this.$refs.$title.offsetHeight)
		// });
	},
	methods: {
		/**
		 * @desc    获取七牛token方法，如成功会执行七牛设置token并开始七牛上传流程
		 * @param   {Object}     up     七牛上传对象
		 * @param   {Function}    next    执行后续上传流程
		 */
		fetchUploadToken(up, next) {
			// 这里是获取上传七牛token的业务，业务逻辑交给开发者处理，
			fetchUploadToken()
				.then(({ code, data, msg }) => {
					if (code === 200) {
						const items = data.items || {}
						if (items && typeof items.up_token === "string" && items.up_token.trim()) {
							// 传入token，并执行后续上传流程
							next(items.up_token)
						} else {
							console.warn(`上传token不存在`)
						}
					} else {
						console.warn(msg)
					}
				})
				.catch(err => {
					console.warn(`上传token获取失败, ${err}`)
				})
		},

		/**
		 * @desc    文件添加前，一般对自定义文件名及文件类型校验
		 * @param  {[type]}     up      七牛上传对象
		 * @param  {[type]}     file    上传文件
		 * @param   {Object}    error    当前事件错误信息
		 */
		fileFiltered(up, file, error) {
			if (error) {
				Toast({ message: error.msg })
				this.uploadStatus = 0
				return
			}
			// 没有错误信息就执行后续操作
			// do something...
		},
		/**
		 * @desc 文件添加后
		 * @param   {Object}    up      七牛上传对象
		 * @param   {Object}    files    上传文件列表
		 * @param   {Object}    error    当前事件错误信息
		 */
		filesAdded(up, files, error) {
			if (error) {
				Toast({ message: error.msg })
				this.uploadStatus = 0
				return
			}
			// 没有错误信息就执行后续操作
			// do something...
		},
		/**
		 * @desc 上传前事件
		 * @param   {Object}    up      七牛上传对象
		 * @param   {Object}    file    上传文件
		 * @param   {Object}   error     当前事件错误信息
		 */
		beforeUpload(up, file, error) {
			if (error) {
				Toast({ message: error.msg })
				this.uploadStatus = 0
				return
			}
			// 没有错误信息就执行后续操作
			// do something...
		},
		/**
		 * @desc 文件上传进行中
		 * @param   {Object}    up      七牛上传对象
		 * @param   {Object}    file    上传文件
		 */
		fileUploadProgress(up, file) {
			this.uploadStatus = 2
			this.uploadProgressText = file.percent
		},
		/**
		 * @desc 文件上传成功
		 * @param {Object} up   七牛上传对象
		 * @param {Object} file   上传文件
		 * @param {Object} info   上传信息
		 */
		fileUploaded(up, file, info) {
			let fileFullName = file.name
			this.fileName.unshift({
				name: info.key,
				src: `http://test001.pnlyy.com/${info.key}`
			})
			this.uploadStatus = 1
			Toast({ message: "文件上传成功" })
		},
		/**
		 * @desc 文件上传错误回调
		 * @param {Object} err   上传错误信息
		 * @param {Object}  up  上传对象
		 */
		fileUploadFail(up, err) {
			this.uploadStatus = 0
			this.uploadProgressText = "0"
			Toast({ message: err.msg })
		},
		/**
		 * @desc 文件上传完成（不管成功与失败）
		 */
		fileUploadComplete(up) {
			// complete todo
			Toast({ message: "文件上传结束" })
		},

		changeUniqueNames() {
			this.setOption("unique_names", this.uniqueNames)
		},
		/**
		 * @desc    更新上传配置
		 * @param {String} option 配置属性
		 * @param {String} value  对应的属性值
		 */
		setOption(option, value) {
			this.uploader && this.uploader.setOption(option, value)
			// this.uploader && (this.uploader.destroy());console.log(this.uploader)
			// this.uploader = QNUploader({ ...{
			//     browse_button:          'upload',                           // 上传选择的点选按钮，可以是id或者元素本身，必需
			//     domain:                 'http://test001.pnlyy.com',         // bucket域名，下载资源时用到，必需
			//     fetch_upload_token:     this.fetchUploadToken,              // 获取上传token方法
			//     // file_type:              'image',                          // 上传文件类型,默认为图片
			//     unique_names:           this.uniqueNames,                            // 是否开启自动文件名
			//     key_func:               function () { return shuffle(ary).join(shuffle(ary)[0]) },       // 自定义文件名方法
			//     multi_selection:        this.multiSelection,                                // 是否多选
			//     max_file_size:          '50mb',                          // 文件上传大小限制
			//     fileFiltered:           this.fileFiltered,                  // 文件添加前事件
			//     filesAdded:             this.filesAdded,                    // 文件添加后事件
			//     beforeUpload:           this.beforeUpload,                  // 上传前事件
			//     uploadProgress:         this.fileUploadProgress,            // 上传进行中
			//     fileUploaded:           this.fileUploaded,                  // 上传完事件
			//     uploadFail:             this.fileUploadFail,                // 上传失败事件
			// }, [option]: value } );
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../assets/css/mixin.less";
.wrap {
	.fj();
	.flex-align(flex-start);
	margin: 0.2667rem 0 0;
	// .wh();
	height: calc(~"100% - 1.6rem");
	.bd {
		.wh();
		// background-color: #fff;
		// box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		.upload-box {
			.fj();
			.flex-direction(column);
			padding: 0.2667rem;
			.wh(100%; 5.8667rem;);
			background-color: #fff;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		}
		.aside {
			// .fj(flex-start);
			// .box-flex(1);
			// .flex-align(flex-start);
			margin: 0.2667rem 0 0;
			padding: 0.4267rem 0.4267rem 0.2667rem;
			height: calc(~"100% - 6rem");
			background-color: #fff;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
			overflow: hidden;
			.title {
				padding: 0 0 0.2667rem;
				line-height: 0.5333rem;
			}
			.log-wrap {
				height: calc(~"100% - .8rem");
				overflow-y: auto;
			}
			.log-list {
				.wh();
				.item {
					// .fj();
					position: relative;
					// margin: 0 0 .32rem;
					padding: 0.2667rem 0 0.2667rem 2.1333rem;
					line-height: 0.5333rem;
					height: 2.1333rem;
					word-wrap: break-word;
					word-break: break-all;
					border-top: #ddd solid 1px;
					img {
						position: absolute;
						left: 0.2667rem;
						top: 0.2667rem;
						.wh(1.6rem; 1.6rem;);
					}
					a {
						color: #378bf2;
					}
					a:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
}

.upload-conf {
	.wh(100%; auto;);
	.field {
		.fj(space-between);
		margin: 0 0 0.2667rem;
	}
}

.btn-upload {
	margin: 0.5333rem 0 0;
	width: 3.2rem;
	height: 1.0667rem;

	background-color: #4e86cc;
	border-radius: 4px;
	font-size: 0.4267rem;
	color: #fff;
	span {
		display: block;
		.wh(100%; 1.0667rem);
		line-height: 1.0667rem;
		border-radius: 0.1067rem;
	}
	.percent {
		// margin: 0 .25*8/15rem 0 0;
		font-style: normal;
		font-weight: 500;
		span {
			background-color: #26c28e;

			em {
				.center();
				color: #fff;
				font-weight: 500;
			}
		}
	}
}
.upload-info {
	margin: 0 0 5333rem;
	text-align: center;
}
</style>
