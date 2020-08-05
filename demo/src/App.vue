<template>
  <div id="app">
      <h1>BosClient.putObjectFromBlob()</h1>
      <div>
        <input type="file" @change="handleFileChange" :disabled="isUploading" />
        <button @click="handleUploadButtonClick" :disabled="!file || isUploading">Upload</button>
        <button @click="handleCancelButtonClick" v-if="file && isUploading">Cancel</button>
      </div>
      <div class="loading" v-if="isUploading">上传中 {{ progressText }}</div>
      <div class="error" v-if="isFail">{{ error }}</div>
      <div class="success" v-if="isSuccess">上传成功!
        <a :href="url" target="_blank">打开</a>
      </div>
  </div>
</template>

<script>
import {nanoid} from 'nanoid';
import {BosClient} from '../../index';

const ak = process.env.BCE_AK;
const sk = process.env.BCE_SK;
const sessionToken = process.env.BCE_ST;

// const BosClient = window.baidubce.sdk.BosClient;
const bucket = process.env.BOS_BUCKET;

export default {
  name: 'App',
  data() {
    return {
      file: null,
      status: 0,
      error: '',
      progress: 0,
    }
  },
  computed: {
    isUploading() {
      return this.status === 1;
    },
    isFail() {
      return this.status === 3;
    },
    isSuccess() {
      return this.status === 2;
    },
    progressText() {
      return Math.round(this.progress * 100) + '%';
    }
  },
  methods: {
    handleFileChange(evt) {
      this.file = evt.target.files[0];
    },
    async handleUploadButtonClick() {
      let ext = getExt(this.file.name);
      let key = `bce-bos-lite-test/${nanoid()}${ext}`;
      this.status = 1;
      try {
        await this.client.putObjectFromBlob(bucket, key, this.file, {
          'Content-Type': getContentType(ext)
        });
      }
      catch (err) {
        this.status = 3;
        this.error = '上传失败：' + err.message;
        console.log(err);
        return;
      }
      this.status = 2;
      this.url = this.client.generateUrl(bucket, key);
    },
    handleClientProgress({loaded, total}) {
      this.progress = loaded / total;
    },
    handleCancelButtonClick() {
      if (this.client.cancelRequest) {
        this.client.cancelRequest('User cancelled uploading');
      }
    },
  },
  mounted() {
    const client = new BosClient({
      sessionToken,
      endpoint: 'https://bj.bcebos.com',
      credentials: {ak, sk},
    });
    client.on('progress', this.handleClientProgress.bind(this));
    this.client = client;
  },
  beforeDestroy() {
    this.client.off('progress');
    if (this.cancelRequest) {
      this.cancelRequest();
    }
  }
}

function getExt(name) {
  let i = name.lastIndexOf('.');
  if (i < 0) {
    return '';
  }
  return name.substring(i);
}

function getContentType(ext) {
  if (['.jpeg', '.jpg', '.png', '.webp', '.gif'].includes(ext)) {
    return `image/${ext.substring(1)}`;
  }
  if (['.mp4', '.mov'].includes(ext)) {
    return `video/${ext.substring(1)}`;
  }
  if (['.mp3', '.m4a', '.opus'].includes(ext)) {
    return `audio/${ext.substring(1)}`;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app > div {
  margin: 20px 0;
}

h1 {
  font-family: monospace;
  font-size: 1.5em;
  font-weight: normal;
}

.error {
  color: red;
}
.success {
  color: green;
}
</style>
