<style lang="stylus" scoped>
    @import '../../assets/css/common.styl';
    @import '../../stylus/upload.styl';
</style>

<template>
    <section class="upload_wrap">
    <!-- 头部导航条 -->
        <head-bar>
            <div slot="middle" >
                <span class="upload_title">{{title}}</span>
            </div>
            <a @click="clearUp" slot="right" >
                <div class="upload_clear">
                   <span>{{clear}}</span>
                </div>                
            </a>
        </head-bar>  
        <main class="upload_page"> 
            <ul>
                <li flex="" class="border border-all">
                    <span flex-box="0" class="upload_info">选择频道</span>
                    <select  flex-box="1" class="upload_select" v-model="selectChannel" >
                        <option disabled="disabled" value>请选择</option>
                        <option :value="index" v-for="(select,index) in CONST.SUBSCRIBE_TYPE" >{{select}}</option>
                    </select>
                    <i class="down_triangle"></i>
                </li>
                <li flex=""  class="border border-all">
                    <span flex-box="0" class="upload_info">输入标题</span>
                    <input type="text"  class="upload_text" flex-box="1" placeholder="限制20个字" v-model="inputText">
                </li>
            </ul>
            <div class="upload_description border border-all">
                <p class="upload_description_title border border-bottom">输入内容</p>
                <textarea placeholder="请填写内容" ref="textNode" @keyup="cal" v-model="content"></textarea>
            </div>
            <div class="remainCount">
                <span class="numCor" :class="{redCor : tooLong}">{{remain}}</span>
            </div>

            <section class="upload_attachment border border-all">
                <span class="attachment_title border-bottom border">点击上传图片</span>
                <div class="weui_uploader_bd attachment_list" ref="wrap">
                    <div v-if="previewImgArr.length > 0">
                         <div class="img_thumbnail" v-for="(item, index) in previewImgArr">
                            <div class="img_wrap">
                                <img :src="item">
                            </div>
                            <!-- <div class="img_thumbnail_mask"></div> -->
                            <div class="img_remove" @click="delImage(index)">x</div>
                        </div>
                    </div>
                   
                    <div class="weui_uploader_input_wrp weui_uploader_status" >
                        <input class="uploadInput" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"  @change="onFileChange" >
                    </div>
                </div>
                
            </section>

            <button class="mint-button mint-button--primary mint-button--large" @click="uploadForm">
                <label class="mint-button-text">上   传</label>
            </button>

        </main>
    </section>        
</template>

<script>
    import headBar from '../common/head';
    import Imgx from '../../lib/imgUpload';
    import CONST from "../../common/constant";
    import { Toast  } from 'mint-ui';

    export default {
        data() {
            return {
                title : '我要上传',
                clear : '清空',
                remain : '剩余400字',
                tooLong : false,
                selectChannel : '',
                inputText : '',
                content : '',
                previewImgArr : [],
                uploadImgArr : [],
                hasUpload : true,
                CONST : CONST,
                maxSize : 200 * 1024 * 1,
            }
        },
        created() {
            this.$store.dispatch('updateAllLoad', false)
        },
        components : {
            headBar,            
            Toast,
        },
        computed : {
            
        },
        methods : {             
            clearUp() {
                this.previewImgArr = [];
                this.selectChannel =
                this.inputText =
                this.content = ''
            },   
            cal() {
                let len = this.$refs.textNode.value.toString().length;
                const LARGE = 390,MAX = 400;
                if(len < LARGE){
                    this.remain = `剩余${parseInt(MAX - len, 10)}字`
                    this.tooLong = false
                }else if(LARGE <= len && len < MAX){
                    this.remain = `剩余${parseInt(MAX - len, 10)}字`
                    this.tooLong = true
                }else if(len > MAX){
                    this.remain = '输入无效'
                    this.$refs.textNode.value = this.$refs.textNode.value.slice(0,MAX)
                }                
            },           

            uploadForm() {

            },

            delImage(index) {
                this.previewImgArr.splice(index,1)
            },
            onFileChange (e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                this.createImage(files)
            },
            createImage(files) {
                if(!this.hasUpload){
                    return;
                }

                let _this = this,
                    reader = null,
                    len = files.length
                    for (var i = 0; i < len; i++) {
                        let file = files[i],
                            type = files[i].type,
                            name = files[i].name,
                            size = files[i].size;
                            reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = function (e) {
                                let Img = new Image(),
                                    result = e.target.result;
                                    Img.src = result;

                                // 处理缩略图显示
                                _this.previewImgArr.push(result);
                                
                                // 执行压缩工作
                                if( size > _this.maxSize ){
                                    // 返回的result就是待上传的base64图片信息
                                    result = _this.compress(Img);         
                                }

                                // 开始上传
                                _this.up(result);
                            }
                    }
            },

            compress(img) {
                var initSize = img.src.length;
                var width = img.width;
                var height = img.height;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext('2d');

                  //  瓦片canvas
                  var tCanvas = document.createElement("canvas");
                  var tctx = tCanvas.getContext("2d");

                // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                var ratio; // 压缩比
                if ((ratio = width * height / 4000000)>1) {
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                }else {
                    ratio = 1;
                }

                canvas.width = width;
                canvas.height = height;

                // 铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                //如果图片像素大于100万则使用瓦片绘制
                var count;
                if ((count = width * height / 1000000) > 1) {
                    count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

                //计算每块瓦片的宽和高
                    var nw = ~~(width / count);
                    var nh = ~~(height / count);

                    tCanvas.width = nw;
                    tCanvas.height = nh;

                    for (var i = 0; i < count; i++) {
                        for (var j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }

                //进行最小压缩
                var ndata = canvas.toDataURL("image/jpeg", 0.1);

                console.log("压缩前：" + initSize);
                console.log("压缩后：" + ndata.length);
                console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

                return ndata;
            },

            up() {
                alert('压缩完毕开始上传')
                // 把this.hasUpload = false;当一张上传完毕，设为true;
            }

        },
        mounted() {
        }
    }
</script>
