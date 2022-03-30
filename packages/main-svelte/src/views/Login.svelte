<div class="login">
  <h2 class="logo">
    <svg class="icon" aria-hidden="true" width="60px" height="60px">
      <use xlink:href="#iconLogo"></use>
    </svg>
  </h2>
  <form class="login-form" onsubmit="return false">
    <h3 class="title">{ i18n.t('MainLogin.t1') }</h3>
    <div class="form-item account">
      <label class="form-item-label" for="login-form-account"
        >{ i18n.t('MainLogin.t2') }</label
      >
      <input
        class="form-item-input"
        id="login-form-account"
        bind:value="{loginForm.account}"
        maxlength="50"
      />
      <p class="form-item-error"></p>
    </div>
    <div class="container">
      <div class="form-item password">
        <label class="form-item-label" for="login-form-password"
          >{ i18n.t('MainLogin.t3') }</label
        >
        <input
          class="form-item-input"
          id="login-form-password"
          bind:value="{loginForm.password}"
          type="password"
          autocomplete
          maxlength="50"
        />
        <p class="form-item-error"></p>
      </div>
      <div class="form-item code">
        <label class="form-item-label" for="login-form-code"
          >{ i18n.t('MainLogin.t4') }</label
        >
        <input
          class="form-item-input"
          id="login-form-code"
          bind:value="{loginForm.captchaCode}"
          maxlength="4"
        />
        <p class="form-item-error"></p>
        <img
          class="graphics"
          src="{captchaImage}"
          alt=""
          on:click="{getGraphicCode}"
        />
      </div>
      <button type="submit" class="submit" on:click="{handleLogin}">
        <svg class="icon default" aria-hidden="true" width="80px" height="60px">
          <use xlink:href="#iconlogin_btn"></use>
        </svg>
        <svg class="icon hover" aria-hidden="true" width="80px" height="60px">
          <use xlink:href="#iconlogin_btn_hover"></use>
        </svg>
      </button>
    </div>
  </form>
</div>
<script lang="ts">
  import { onMount } from 'svelte';
  import md5 from 'js-md5';
  import { basicApi } from '@/api';
  import storage from '@/utils/storage';
  import { i18n } from '@/plugin';
  import { queryParse } from '@/utils/tools';

  const loginRules = {
    account: [{ required: true, message: ' ', trigger: 'blur' }],
    password: [{ required: true, message: ' ', trigger: 'blur' }],
    captchaCode: [{ required: true, message: ' ', trigger: 'blur' }],
  };

  let captchaImage = '';

  const loginForm = {
    account: '',
    password: '',
    captchaCode: '',
    captchaCodeToken: '',
    autologin: true,
  };

  // 获取图形验证码
  const getGraphicCode = async () => {
    await basicApi.getGraphicCode().then((res) => {
      if (res.status) {
        captchaImage = res.data.imageBase;
        loginForm.captchaCodeToken = res.data.captchaCodeToken;
      }
    });
  };

  // 处理登录
  const handleLogin = async () => {
    await basicApi
      .authLogin({
        account: loginForm.account,
        password: md5(loginForm.password),
        captchaCode: loginForm.captchaCode,
        captchaCodeToken: loginForm.captchaCodeToken,
      })
      .then((res) => {
        if (res.status) {
          if (loginForm.autologin) {
            storage('localstorage').set('token', res.data.token);
          } else {
            storage().set('token', res.data.token);
          }
          const redirect = queryParse(window.location.search).redirect ?? '/';

          window.location.href = decodeURIComponent(redirect);
          // this.$message({ type: 'success', message: `${this.$t('MainLogin.t111')}` });
        } else {
          getGraphicCode();
        }
      });

    return false;
  };

  onMount(async () => {
    getGraphicCode();
  });
</script>
<style lang="scss">
  .login {
    background: url('/src/assets/image/login_bg1.png') left top no-repeat;
    background-color: #f6f7fb;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;

    .logo {
      left: 32px;
      position: absolute;
      top: 34px;
    }

    .login-form {
      background: url('/src/assets/image/login_bg2.png') right bottom no-repeat;
      background-color: #fff;
      border-radius: 10px 0 0;
      box-sizing: border-box;
      flex: 1;
      margin: 140px 0 0 120px;
      padding: 180px 0 0 150px;

      .title {
        color: #1c1980;
        font-size: 96px;
        font-weight: 600;
        line-height: 1;
      }

      .container {
        align-items: flex-end;
        display: flex;

        .submit {
          background-color: transparent;
          cursor: pointer;
          margin-left: 60px;

          .hover {
            display: none;
          }

          &:hover {
            .default {
              display: none;
            }

            .hover {
              display: inline;
            }
          }
        }
      }

      .form-item {
        align-items: center;
        border-bottom: 1px solid #e8e9ea;
        display: flex;
        height: 40px;
        padding: 8px 0;
        position: relative;

        .form-item-label {
          color: #1c1980;
          font-size: 12px;
          font-weight: bold;
          height: 40px;
          line-height: 40px;
          padding: 0;
          width: 90px;
        }

        .form-item-error {
          bottom: -9px;
          color: #b95881;
          font-size: 12px;
          left: 0;
          line-height: 1.5;
          position: absolute;
          transform: translateY(100%);
          width: 100%;
        }

        .form-item-input {
          border: 0;
          color: #222530;
          flex: 1;
          font-size: 12px;
          font-weight: 400;
          height: 40px;
          padding: 0;

          &::placeholder {
            color: #222530;
            font-size: 12px;
            font-weight: 400;
          }
        }

        &.account {
          margin: 56px 0 40px;
          width: 490px;
        }

        &.password {
          margin: 0 0 23px;
          width: 360px;
        }

        &.code {
          margin: 0 0 23px 37px;
          width: 360px;

          .form-item-label {
            width: 110px;
          }

          .graphics {
            background-color: #f4f4f4;
            cursor: pointer;
            height: 40px;
            margin: 0 2px 0 10px;
            width: 120px;
          }
        }

        &.is-required {
          border-color: #1c1980;

          .form-item-label {
            color: #1c1980;
          }

          .form-item-error {
            color: #1c1980;
          }
        }

        &.is-error {
          border-color: #b95881;

          .form-item-label {
            color: #b95881;
          }

          .form-item-error {
            color: #b95881;
          }
        }
      }
    }
  }
</style>
