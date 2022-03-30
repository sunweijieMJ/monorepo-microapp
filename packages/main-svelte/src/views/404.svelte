<script>
  import { i18n } from '@/plugin';
</script>
<div class="not-found">
  <h2 class="logo">
    <svg class="icon" aria-hidden="true" width="60px" height="60px">
      <use xlink:href="#iconLogo" />
    </svg>
  </h2>
  <div class="container">
    <div class="box">
      <img class="img" src="/src/assets/image/404.png" alt="" />
      <h4 class="title">{ i18n.t('Main404.t1') }</h4>
      <p class="desc">{ i18n.t('Main404.t2') }</p>
      <a class="back" href="/">
        <span class="text">{ i18n.t('Main404.t3') }</span>
        <i class="iconfont iconarrow_right"></i>
      </a>
    </div>
  </div>
</div>
<style lang="scss" scoped>
  .not-found {
    background: url('/src/assets/image/login_bg1.png') left top no-repeat;
    background-color: #f6f7fb;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;

    .logo {
      left: 32px;
      position: absolute;
      top: 34px;
    }

    .container {
      background: url('/src/assets/image/login_bg2.png') right bottom no-repeat;
      background-color: #fff;
      border-radius: 10px 0 0;
      flex: 1;
      margin: 140px 0 0 120px;

      .box {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: 160px auto 0;
        width: 363px;
      }

      .img {
        width: 363px;
      }

      .title {
        color: #f1b7d0;
        font-size: 36px;
        font-weight: 500;
        line-height: 44px;
        margin-top: 28px;
      }

      .desc {
        color: #909297;
        font-size: 20px;
        line-height: 24px;
        margin-top: 12px;
      }

      .back {
        align-items: center;
        display: inline-flex;
        height: 20px;
        margin-top: 50px;

        .text {
          color: #909297;
          font-size: 12px;
          line-height: 1;
        }

        .iconfont {
          color: #909297;
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
