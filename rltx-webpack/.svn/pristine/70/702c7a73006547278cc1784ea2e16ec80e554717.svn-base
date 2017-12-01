<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" size="large">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'eleDialog',
    props: {
      title: {
        type: String,
        'default': 'Dialog'
      }
    },
    data() {
      return {
        dialogVisible: false,
        pending: false
      };
    },
    methods: {
      child() {
        return this.$children[0].$children[2];
      },
      waiting() {
        this.pending = true;
      },
      open() {
        this.dialogVisible = true;
        this.$nextTick(() => {
//          console.log('dialog open', this.$children.length, this.$children[0].$children.length);
          this.child().$on('done', this.childDone);
        });
      },
      close() {
        this.dialogVisible = false;
        this.child().$off('done', this.childDone);
      },
      submit() {
        this.child().$emit('submit', this);
        if (!this.pending) {
          this.close();
        } else {
          this.pending = true;
        }
      },
      cancel() {
        this.child().$emit('cancel', this);
        if (!this.pending) {
          this.close();
        } else {
          this.pending = true;
        }
      },
      done(recursive, event, params) {
        if (recursive) {
          this.$emit(event, params, this);
        }
        this.close();
      },
      childDone(recursive, params) {
//        console.log('child done', params);
        if (recursive) {
          this.$emit('done', params, this);
        }
      }
    }
  };
</script>
